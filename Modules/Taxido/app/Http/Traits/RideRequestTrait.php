<?php

namespace Modules\Taxido\Http\Traits;

use Exception;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Modules\Taxido\Models\Ride;
use Modules\Taxido\Models\Rider;
use Modules\Taxido\Models\Driver;
use Illuminate\Support\Facades\DB;
use App\Http\Traits\FireStoreTrait;
use App\Exceptions\ExceptionHandler;
use Modules\Taxido\Models\RideRequest;
use Modules\Taxido\Models\VehicleType;
use Modules\Taxido\Enums\ServicesEnum;
use Modules\Taxido\Enums\RideStatusEnum;
use Illuminate\Database\Eloquent\Builder;
use Modules\Taxido\Models\VehicleTypeZone;
use Modules\Taxido\Events\RideRequestEvent;
use Modules\Taxido\Enums\ServiceCategoryEnum;
use Modules\Taxido\Enums\RoleEnum as EnumsRoleEnum;
use Modules\Taxido\Http\Resources\Drivers\RideRequestResource;

trait RideRequestTrait
{
  use BiddingTrait, RideTrait, FireStoreTrait;

  public function verifyRideWalletBalance($rider_id)
  {
    $roleName = getCurrentRoleName();
    if ($roleName == EnumsRoleEnum::RIDER) {
      $rider_id = $rider_id ?? getCurrentUserId();
    }

    $rider = Rider::findOrFail($rider_id);
    if ($rider?->wallet?->balance < 0) {
      throw new Exception(__('taxido::static.rides.negative_wallet_balance'), 400);
    }

    return true;
  }

  public function getNoOfDaysAttribute($start_date, $end_date)
  {
    if ($start_date && $end_date) {
      $start = Carbon::parse($start_date);
      $end = Carbon::parse($end_date);
      return $start->diffInDays($end);
    }
    return 0;
  }

  public function verifyVehicleType($request)
  {
    $vehicleType = VehicleType::where('id', $request->vehicle_type_id)?->whereNull('deleted_at')?->first();
    $selectedVehicleServiceIds = [$vehicleType?->service_id];

    if (!in_array($request?->service_id, $selectedVehicleServiceIds ?? [])) {
      throw new Exception(__('taxido::static.rides.service_not_allow_for_vehicle', ['vehicleType' => $vehicleType?->name]), 400);
    }

    $selectedVehicleServiceCategoryIds = $vehicleType?->service_categories()->pluck('service_category_id')?->toArray();
    if (!in_array($request?->service_category_id, $selectedVehicleServiceCategoryIds ?? [])) {
      throw new Exception(__('taxido::static.rides.category_not_allow_for_vehicle', ['vehicleType' => $vehicleType?->name]), 400);
    }

    return true;
  }


  public function getZoneRideDistance($locations)
  {
    $originLat = head($locations)['lat'];
    $originLng = head($locations)['lng'];
    $zone = getZoneByPoint($originLat, $originLng)?->first();
    $rideDistance = calculateRideDistance($locations, $zone?->distance_type) ?? null;
    if ($zone && $rideDistance) {
      return (object)['zone' => $zone, 'ride_distance' => $rideDistance];
    }

    return null;
  }

  public function findIdleDrivers($rideRequest)
  {
    try {

      $drivers = [];
      if (count($rideRequest->location_coordinates ?? [])) {
        if (
          $rideRequest?->service_category?->type != ServiceCategoryEnum::RENTAL &&
          $rideRequest?->service_category?->type != ServiceCategoryEnum::SCHEDULE
        ) {

          $coordinate = head($rideRequest->location_coordinates);
          if (isset($coordinate['lat']) && isset($coordinate['lng'])) {
            $zones = getDriverZoneByPoint($coordinate['lat'], $coordinate['lng'])?->pluck('id')?->toArray();
            if (!count($zones)) {
              throw new Exception(__('taxido::static.rides.ride_requests_not_accepted'), 400);
            }

            $rideRequest?->zones()?->attach($zones);
            $vehicleTypeId = $rideRequest->vehicle_type_id;
            $driverIds = Driver::whereNull('deleted_at')?->where('is_verified', true)?->where('service_id', $rideRequest->service_id);
            $driverIds = $driverIds->whereHas('vehicle_info', function (Builder $vehicleInfo) use ($vehicleTypeId) {
              $vehicleInfo->where('vehicle_type_id', $vehicleTypeId);
            });

            $taxidoSettings = getTaxidoSettings();
            $minWalletBalance = $taxidoSettings['wallet']['driver_min_wallet_balance'] ?? 0;
            if ($minWalletBalance) {
              $driverIds = $driverIds->whereHas('wallet', function (Builder $wallet) use ($minWalletBalance) {
                $wallet->where('balance', '>=', $minWalletBalance);
              });
            }

            if (in_array(getServiceCategoryTyeById($rideRequest->service_category_id), [ServiceCategoryEnum::RENTAL, ServiceCategoryEnum::PACKAGE])) {
              $driverIds = $driverIds?->where('service_category_id', $rideRequest->service_category_id);
            }

            $driverIds = $driverIds?->pluck('id')?->toArray() ?? [];

            $drivers = $this->findNearestDrivers($coordinate['lat'], $coordinate['lng'], $driverIds);
          }

          if (!count($drivers)) {
            throw new Exception(__('taxido::static.rides.no_driver_available'), 400);
          }

          $rideRequest?->drivers()?->attach($drivers);
        }
      }

      return $drivers;

    } catch (Exception $e) {

      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }

  public function createCabRideRequest($request)
  {
    DB::beginTransaction();
    try {
      $drivers = [];
      $cabSettings = getTaxidoSettings();
      $serviceCategory = getServiceCategoryById($request->service_category_id);
      $no_of_days = $this->getNoOfDaysAttribute($request?->start_time ?? null, $request?->end_time ?? null);
      if ($serviceCategory?->type == ServiceCategoryEnum::SCHEDULE) {
        if ($request->start_time) {
          $scheduleBufferHours =  (int) $cabSettings['ride']['schedule_min_hour_limit'] ?? null;
          if ($scheduleBufferHours) {
            $now = now();
            $requestedStartTime = Carbon::parse($request->start_time);
            $minScheduleTime = $now->copy()?->addHours($scheduleBufferHours);
            if ($requestedStartTime->lte($now)) {
              throw new Exception("Scheduled time must be in the future.", 422);
            }

            if ($requestedStartTime->lte($minScheduleTime)) {
              throw new Exception("Scheduled rides must be at least {$scheduleBufferHours} hours from now.", 422);
            }
          }
        }
      }

      if ($this->verifyVehicleType($request)) {
        $zoneRideDistance = $this->getZoneRideDistance($request->location_coordinates);
        if ($zoneRideDistance) {
          if ($zoneRideDistance?->zone?->id && $request->vehicle_type_id) {
            $vehicleTypeZone = VehicleTypeZone::where('vehicle_type_id', $request->vehicle_type_id)?->where('zone_id', $zoneRideDistance?->zone?->id)?->first();
            $rideDistance = $zoneRideDistance?->ride_distance;
            if ($vehicleTypeZone && $rideDistance) {
              if ($serviceCategory?->type == ServiceCategoryEnum::PACKAGE && $request->hourly_package_id) {
                $hourly_package_id = $request->hourly_package_id;
                $vehicle_type_id = $request->vehicle_type_id;
                $zone_id = $zoneRideDistance?->zone?->id;
                $charges = $this->calHourlyPackageVehicleTypePrice($hourly_package_id, $vehicle_type_id, $zone_id);
              } else {
                $charges = $this->calVehicleTypeZonePrice($rideDistance, $vehicleTypeZone, $request);
              }
              if ($this->verifyBiddingFairAmount($request, $charges['total'])) {
                $rider = $request?->new_rider;
                if (!$request->new_rider) {
                  $rider = getCurrentRider();
                }

                $rider_id = $rider?->id ?? ($request?->rider_id);
                if (!$rider) {
                  $rider = getRiderById($request?->rider_id);
                }

                $bid_extra_amount = 0;
                $total = $charges['total'];
                if ((int) $cabSettings['activation']['bidding']) {
                  if ($this->verifyBiddingFairAmount($request, $charges['total'])) {
                    $bidFareAmount = $request->ride_fare;
                    if ($bidFareAmount >= $charges['total']) {
                      $bid_extra_amount = number_format(($bidFareAmount - $charges['total']), 2);
                      $total = $bidFareAmount;
                    }
                  }
                }

                if ($this->verifyRideWalletBalance($rider_id)) {
                  $formattedLocations = $request->locations;
                  $symbol = $zoneRideDistance?->zone?->currency?->symbol;
                  $rideRequest = RideRequest::create([
                    'ride_number' => 100000 + ((RideRequest::max('id') + 1) + Ride::max('id') + 1),
                    'rider_id' => $rider_id,
                    'payment_method' => $request->payment_method ?? 'cash',
                    'vehicle_type_id' => $request->vehicle_type_id,
                    'service_id' => $request->service_id,
                    'service_category_id' => $request?->service_category_id,
                    'rider' => $rider,
                    'description' => $request->description,
                    'duration' => $zoneRideDistance?->ride_distance['duration'] ?? $request->duration,
                    'distance' => $zoneRideDistance?->ride_distance['distance_value'] ?? $request->distance,
                    'distance_unit' => $zoneRideDistance?->ride_distance['distance_unit'] ?? $request->distance_unit,
                    'ride_fare' => $charges['base_fare_charge'] ?? 0,
                    'additional_distance_charge' => $charges['additional_distance_charge'] ?? 0,
                    'additional_minute_charge' => $charges['additional_minute_charge'] ?? 0,
                    'additional_weight_charge' => $charges['additional_weight_charge'] ?? 0,
                    'tax' => $charges['tax'] ?? 0,
                    'commission' => $charges['commission'] ?? 0,
                    'driver_commission' => $charges['driver_commission'] ?? 0,
                    'platform_fee' => $charges['platform_fee'] ?? 0,
                    'sub_total' => ($charges['sub_total'] ?? 0),
                    'total' => $total ?? $charges['total'],
                    'locations' => $formattedLocations,
                    'currency_symbol' => $symbol,
                    'location_coordinates' => $request->location_coordinates,
                    'hourly_package_id' => $request->hourly_package_id,
                    'weight' => $request->weight,
                    'parcel_receiver' => $request->parcel_receiver,
                    'parcel_delivered_otp' => rand(1000, 9999),
                    'start_time' => $request->start_time,
                    'bid_extra_amount' =>  $bid_extra_amount,
                    'no_of_days' => $no_of_days,
                  ]);

                  if ($request->hasFile('cargo_image')) {
                    $attachment = createAttachment();
                    $attachment_id = addMedia($attachment, $request->file('cargo_image'))?->id;
                    $rideRequest->cargo_image_id = $attachment_id;
                    $rideRequest->save();
                  }

                  $zones = [];
                  if (getCurrentRoleName() != EnumsRoleEnum::RIDER) {
                    if ($request->driver_assign) {
                      if ($request->driver_assign == 'manual') {
                        if ($request->driver) {
                          $drivers[] = $request->driver;
                        }
                      }
                    }
                  }

                  DB::commit();
                  $rideRequest = $rideRequest?->refresh();
                  if (($request->driver_assign != 'manual' && !$request->driver) || $request->driver_assign == 'automatic') {
                    $drivers = $this->findIdleDrivers($rideRequest);

                  }

                  $drivers = array_unique($drivers);
                  event(new RideRequestEvent($rideRequest));
                  $rideRequestFireStoreFields = new RideRequestResource($rideRequest);



                  if ($serviceCategory?->type == ServiceCategoryEnum::SCHEDULE) {
                    $rideRequest?->ride_status_activities()?->create([
                      'status' => RideStatusEnum::SCHEDULED,
                      'changed_at' => now(),
                    ]);

                  } else {
                    $rideRequest?->ride_status_activities()?->create([
                      'status' => RideStatusEnum::REQUESTED,
                      'changed_at' => now(),
                    ]);

                    $data = $rideRequestFireStoreFields?->toArray(request());
                    $this->addRideRequestFireStore($data, $drivers);
                  }

                  return ['id' => $rideRequest?->id, 'data' => $rideRequestFireStoreFields, 'drivers' => $drivers];
                }
              }
            }
          }
        }

        throw new Exception("Ride distance not calculate, please try again.", 422);
      }

      throw new Exception("Selected vehicle type not valid.", 404);

    } catch (Exception $e) {
      DB::rollback();
      throw new ExceptionHandler($e->getMessage(), $e->getCode());
    }
  }

  public function getIdleDrivers(array $drivers, $queueDriverIds = [])
  {
    if (!count($drivers)) {
      return [
        'current_driver_id' => null,
        'eligible_driver_ids' => !empty($drivers) ? $drivers : null,
        'queue_driver_id' => !empty($queueDriverIds) ? $queueDriverIds : null,
      ];
    }

    $currentDriverId = Arr::random($drivers);
    $index = array_search($currentDriverId, $drivers);
    unset($drivers[$index]);
    $driverRideReqDoc = $this->fireStoreGetDocument('driver_ride_requests', $currentDriverId);
    if (is_array($driverRideReqDoc)) {
      if (empty($driverRideReqDoc) || !isset($driverRideReqDoc['ride_requests'])) {
        return [
          'current_driver_id' => $currentDriverId,
          'eligible_driver_ids' => !empty($drivers) ? $drivers : null,
          'queue_driver_id' => !empty($queueDriverIds) ? $queueDriverIds : null,
        ];
      }

      if (isset($driverRideReqDoc['id'])) {
        if (isset($driverRideReqDoc['ride_requests'])) {
          if (empty($driverRideReqDoc['ride_requests'])) {
            return [
              'current_driver_id' => $currentDriverId,
              'eligible_driver_ids' => !empty($drivers) ? $drivers : null,
              'queue_driver_id' => !empty($queueDriverIds) ? $queueDriverIds : null,
            ];
          }
        }
      }
    }

    $queueDriverIds[] = $currentDriverId;
    return $this->getIdleDrivers($drivers, $queueDriverIds);
  }

  public function addRideRequestFireStore($rideRequest, $drivers)
  {
    $taxidoSettings = getTaxidoSettings();
    $serviceType = getServiceTyeById($rideRequest['service_id']);
    $serviceCategoryType = getServiceCategoryTyeById($rideRequest['service_category_id']);
    $rideRequest['is_bidding'] = (string) $taxidoSettings['activation']['bidding'];
    $rideRequest['driver_ride_request_accept_time'] = (string) $taxidoSettings['ride']['ride_request_time_driver'] ?? '30';
    $rideRequest['driver_amb_rent_ride_req_time'] = (string) $taxidoSettings['ride']['rental_ambulance_request_time'] ?? '30';


    if ($serviceType == ServicesEnum::CAB || $serviceType == ServicesEnum::FREIGHT) {
      if (in_array($serviceCategoryType, [ServiceCategoryEnum::RIDE, ServiceCategoryEnum::INTERCITY, ServiceCategoryEnum::SCHEDULE])) {
        if ($taxidoSettings['activation']['bidding']) {
          $rideRequest['driverIds'] = $drivers;
          $rideRequest = $this->fireStoreAddDocument('ride_requests', $rideRequest, $rideRequest['id']);
          $payload = [
            'ride_requests' => [[
              'id' => (string) $rideRequest['id'],
              'driver_id' => $drivers,
            ]]
          ];

          foreach ($drivers as $driver) {
            $response = $this->fireStoreGetDocument('driver_ride_requests', $driver, $payload);
            if (isset($response['id'])) {
              if ($response['id'] == $driver) {
                $this->fireStoreUpdateDocument('driver_ride_requests', $driver, $payload);
              }
            } else {
              $this->fireStoreAddDocument('driver_ride_requests', $payload, $driver);
            }
          }
        } else {
          $idleDrivers = $this->getIdleDrivers($drivers);
          $subCollections = [
            [
              'name' => 'instantRide',
              'documents' => [
                [
                  'id' => $rideRequest['id'],
                  'data' => [
                    'status' => 'pending',
                    'eligible_driver_ids' => $idleDrivers['eligible_driver_ids'] ?? null,
                    'queue_driver_id' => $idleDrivers['queue_driver_id'] ?? null,
                    'rejected_driver_ids' => null,
                    'current_driver_id' => $idleDrivers['current_driver_id'] ?? null
                  ],
                ],
              ],
            ],
          ];
          $rideRequest = $this->fireStoreAddDocument('ride_requests', $rideRequest, $rideRequest['id'], $subCollections);
          $payload = [
            'ride_requests' => [[
              'id' => (string) $rideRequest['id'],
              'driver_id' => (string) ($idleDrivers['current_driver_id'] ?? null),
            ]]
          ];
            $this->fireStoreAddDocument('driver_ride_requests', $payload, $idleDrivers['current_driver_id']);
          if ($idleDrivers['current_driver_id']) {
          }
        }
      } elseif ($serviceCategoryType == ServiceCategoryEnum::RENTAL) {
        $driver_id = (string) head($drivers) ?? null;
        $subCollections = [
          [
            'name' => 'rental_requests',
            'documents' => [
              [
                'id' => $rideRequest['id'],
                'data' => [
                  'status' => 'pending',
                  'ride_id' => '',
                  'timestamp' => $rideRequest['created_at'] ?? now(),
                  'driver_id' => $driver_id,
                  'id' => $rideRequest['id'] ?? null,
                ],
              ],
            ],
          ],
        ];

        $rideRequest = $this->fireStoreAddDocument('ride_requests', $rideRequest, $rideRequest['id'], $subCollections);
        $payload = [
          'ride_requests' => [[
            'id' => (string) $rideRequest['id'],
            'driver_id' => $driver_id,
          ]]
        ];

        $this->fireStoreAddDocument('driver_ride_requests', $payload, $driver_id);
      } elseif ($serviceCategoryType == ServiceCategoryEnum::PACKAGE) {
        $idleDrivers = $this->getIdleDrivers($drivers);
        $subCollections = [
          [
            'name' => 'instantRide',
            'documents' => [
              [
                'id' => $rideRequest['id'],
                'data' => [
                  'status' => 'pending',
                  'eligible_driver_ids' => $idleDrivers['eligible_driver_ids'] ?? null,
                  'queue_driver_id' => $idleDrivers['queue_driver_id'] ?? null,
                  'rejected_driver_ids' => null,
                  'current_driver_id' => $idleDrivers['current_driver_id'] ?? null
                ],
              ],
            ],
          ],
        ];
        $rideRequest = $this->fireStoreAddDocument('ride_requests', $rideRequest, $rideRequest['id'], $subCollections);
        $payload = [
          'ride_requests' => [[
            'id' => (string) $rideRequest['id'],
            'driver_id' => (string) ($idleDrivers['current_driver_id'] ?? null),
          ]]
        ];
          $this->fireStoreAddDocument('driver_ride_requests', $payload, $idleDrivers['current_driver_id']);
        if ($idleDrivers['current_driver_id']) {
        }
      }
    } else if ($serviceType == ServicesEnum::AMBULANCE) {
      $driver_id = (string) head($drivers) ?? null;
      if ($driver_id) {
        $subCollections = [
          [
            'name' => 'ambulance_requests',
            'documents' => [
              [
                'id' => $rideRequest['id'],
                'data' => [
                  'status' => 'pending',
                  'ride_id' => '',
                  'timestamp' => $rideRequest['created_at'] ?? now(),
                  'driver_id' => $driver_id,
                  'id' => $rideRequest['id'] ?? null,
                ],
              ],
            ],
          ],
        ];

        $rideReq = $this->fireStoreAddDocument('ride_requests', $rideRequest, $rideRequest['id'], $subCollections);
        if (isset($rideReq['id'])) {
          $payload = [
            'ride_requests' => [[
              'id' => (string) $rideReq['id'],
              'driver_id' => $driver_id,
            ]]
          ];
          $this->fireStoreAddDocument('driver_ride_requests', $payload, $driver_id);
        }
      }
    } elseif ($serviceType == ServicesEnum::PARCEL) {
      $idleDrivers = $this->getIdleDrivers($drivers);
      $subCollections = [
        [
          'name' => 'instantRide',
          'documents' => [
            [
              'id' => $rideRequest['id'],
              'data' => [
                'status' => 'pending',
                'eligible_driver_ids' => $idleDrivers['eligible_driver_ids'] ?? null,
                'queue_driver_id' => $idleDrivers['queue_driver_id'] ?? null,
                'rejected_driver_ids' => null,
                'current_driver_id' => $idleDrivers['current_driver_id'] ?? null
              ],
            ],
          ],
        ],
      ];
      $rideRequest = $this->fireStoreAddDocument('ride_requests', $rideRequest, $rideRequest['id'], $subCollections);
      if (isset($rideRequest['id'])) {
        $payload = [
          'ride_requests' => [[
            'id' => (string) $rideRequest['id'],
            'driver_id' => (string) ($idleDrivers['current_driver_id'] ?? null),
          ]]
        ];
          $this->fireStoreAddDocument('driver_ride_requests', $payload, $idleDrivers['current_driver_id']);
        if ($idleDrivers['current_driver_id']) {
        }
      }
    }
    return $rideRequest;
  }
}
