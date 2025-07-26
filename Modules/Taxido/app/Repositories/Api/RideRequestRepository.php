<?php

namespace Modules\Taxido\Repositories\Api;

use Exception;
use App\Enums\RoleEnum;
use Modules\Taxido\Models\Ride;
use Illuminate\Support\Facades\DB;
use Modules\Taxido\Models\Ambulance;
use App\Exceptions\ExceptionHandler;
use Modules\Taxido\Models\RideRequest;
use Modules\Taxido\Enums\ServicesEnum;
use Modules\Taxido\Enums\RideStatusEnum;
use Modules\Taxido\Models\RentalVehicle;
use Modules\Taxido\Events\RideRequestEvent;
use Modules\Taxido\Enums\ServiceCategoryEnum;
use Prettus\Repository\Eloquent\BaseRepository;
use Modules\Taxido\Http\Traits\RideRequestTrait;
use Modules\Taxido\Enums\RoleEnum as EnumsRoleEnum;
use Modules\Taxido\Http\Resources\Drivers\RideRequestResource;

class RideRequestRepository extends BaseRepository
{
    use RideRequestTrait;

    public function model()
    {
        return RideRequest::class;
    }

    public function store($request)
    {
        try {

            $request->merge(['current_time' => $request?->current_time ?? now(env('APP_TIMEZONE'))?->format('H:i:s')]);
            return $this->createCabRideRequest($request);

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $roleName = getCurrentRoleName();
            $rideRequest = $this->model->FindOrFail($id);
            if ($roleName != RoleEnum::ADMIN && $roleName != EnumsRoleEnum::DRIVER) {
                if ($rideRequest?->created_by_id != getCurrentUserId()) {
                    throw new Exception(__('taxido::static.rides.update_permission'), 400);
                }
            }

            if (isset($request['drivers'])) {
                $rideRequest->drivers()->sync($request['drivers']);
                $rideRequest->drivers;
            }

            if (isset($request['status'])) {
                if ($request['status'] == RideStatusEnum::CANCELLED) {
                    $response = $this->fireStoreGetDocument("ride_requests", $rideRequest?->id);
                    if (is_array($response)) {
                        if (empty($response)) {
                            throw new Exception(__('taxido::static.rides.ride_request_not_found'), 400);
                        }

                        $subCollections = $this->fireStoreListSubCollections("ride_requests", $rideRequest?->id) ?? [];
                        if (is_array($subCollections)) {
                            foreach ($subCollections as $collection) {
                                if ($collection == 'instantRide') {
                                    $response = $this->fireStoreGetDocument("ride_requests/{$rideRequest?->id}/instantRide", $rideRequest?->id);
                                    $currentDriverId = $response['current_driver_id'] ?? null;
                                    if ($currentDriverId) {
                                        $updateData = [
                                            'status' => RideStatusEnum::CANCELLED,
                                            'queue_driver_id' => null,
                                            'eligible_driver_ids' => null,
                                            'rejected_driver_ids' => null,
                                            'current_driver_id' => $currentDriverId,
                                        ];

                                        $this->fireStoreDeleteDocument('driver_ride_requests', $currentDriverId);
                                        $this->fireStoreUpdateDocument("ride_requests/{$rideRequest?->id}/instantRide", $rideRequest?->id, $updateData, true);
                                    }
                                } elseif ($collection == 'ambulance_requests') {
                                    $updateData = [
                                        'status' => RideStatusEnum::CANCELLED,
                                    ];

                                    $response = $this->fireStoreGetDocument("ride_requests/{$rideRequest?->id}/ambulance_requests", $rideRequest?->id);
                                    $currentDriverId = $response['driver_id'] ?? null;
                                    if ($currentDriverId) {
                                        $this->fireStoreDeleteDocument('driver_ride_requests', $currentDriverId);
                                        $this->fireStoreUpdateDocument("ride_requests/{$rideRequest?->id}/ambulance_requests", $rideRequest?->id, $updateData, true);
                                    }
                                } elseif ($collection == 'rental_requests') {
                                    $updateData = [
                                        'status' => RideStatusEnum::CANCELLED,
                                    ];

                                    $response = $this->fireStoreGetDocument("ride_requests/{$rideRequest?->id}/rental_requests", $rideRequest?->id);
                                    $currentDriverId = $response['driver_id'] ?? null;
                                    if ($currentDriverId) {
                                        $this->fireStoreDeleteDocument('driver_ride_requests', $currentDriverId);
                                        $this->fireStoreUpdateDocument("ride_requests/{$rideRequest?->id}/rental_requests", $rideRequest?->id, $updateData, true);
                                    }
                                } elseif ($collection == 'bids') {
                                    $updateData = [
                                        'status' => RideStatusEnum::CANCELLED,
                                    ];

                                    $response = $this->fireStoreGetDocument("ride_requests", $rideRequest?->id);
                                    $driverIds = $response['driverIds'] ?? [];
                                    if ($driverIds) {
                                        if (!empty($driverIds)) {
                                            foreach ($driverIds as $driverId) {
                                                $this->fireStoreDeleteDocument('driver_ride_requests', $driverId);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                $rideRequest?->ride_status_activities()?->create([
                    'status' => $request['status'],
                    'changed_at' => now(),
                ]);
            }

            DB::commit();
            return response()?->json(['id' => $rideRequest?->id]);

        } catch (Exception $e) {

            DB::rollBack();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function destroy($id)
    {
        try {

            return $this->model->findOrFail($id)->destroy($id);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function accept($request)
    {
        try {

            $driver = getCurrentDriver();
            if ($driver) {
                return $this->createRide($request);
            }

            throw new Exception(__('taxido::static.rides.only_driver_can_accept_ride_request_directly'), 400);

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function reject($request)
    {
        DB::beginTransaction();
        try {

            $driver = getCurrentDriver();
            $ride_request_id = $request->ride_request_id;
            if (!$driver || !$ride_request_id) {
                throw new Exception(__('taxido::static.rides.invalid_request'), 400);
            }

            $rideRequest = RideRequest::findOrFail($ride_request_id);
            $fireStoreRide = $this->fireStoreGetDocument("ride_requests", $ride_request_id);
            if (empty($fireStoreRide)) {
                throw new Exception(__('taxido::static.rides.ride_request_not_found'), 404);
            }

            $subCollection = null;
            $serviceType = $rideRequest?->service?->type ?? getServiceById($rideRequest->service_id)?->type;
            $serviceCategoryType = $rideRequest?->service_category?->type ?? getServiceCategoryById($rideRequest->service_category_id)?->type;

            if ($serviceType == ServicesEnum::CAB || $serviceType == ServicesEnum::FREIGHT || $serviceType == ServicesEnum::PARCEL) {
                if ($serviceCategoryType == ServiceCategoryEnum::RENTAL) {
                    $subCollection = 'rental_requests';
                } else {
                    $subCollection = 'instantRide';
                }
            } elseif ($serviceType == ServicesEnum::AMBULANCE) {
                $subCollection = 'ambulance_requests';
            } else {
                throw new Exception(__('taxido::static.rides.invalid_service_type'), 400);
            }

            $subCollectionPath = "ride_requests/{$ride_request_id}/{$subCollection}";
            $subCollectionDoc = $this->fireStoreGetDocument($subCollectionPath, $ride_request_id);
            if (empty($subCollectionDoc)) {
                throw new Exception(__('taxido::static.rides.ride_request_not_found'), 404);
            }

            $driver_id = $subCollection == 'instantRide' ? ($subCollectionDoc['current_driver_id'] ?? null) : ($subCollectionDoc['driver_id'] ?? null);
            if (empty($subCollectionDoc) || $driver_id != $driver->id) {
                throw new Exception(__('taxido::static.rides.unauthorized_rejection'), 403);
            }

            if ($subCollection == 'instantRide') {
                $eligibleDriverIds = $subCollectionDoc['eligible_driver_ids'] ?? [];
                $queueDriverIds = $subCollectionDoc['queue_driver_id'] ?? [];
                $rejectedDriverIds = $subCollectionDoc['rejected_driver_ids'] ?? [];
                $rejectedDriverIds[] = $driver->id;
                $this->fireStoreDeleteDocument('driver_ride_requests', $driver->id);
                $idleDrivers = $this->getIdleDrivers($eligibleDriverIds, $queueDriverIds);
                if (isset($idleDrivers['current_driver_id'])) {
                    $updateData = [
                        'status' => 'pending',
                        'eligible_driver_ids' => $idleDrivers['eligible_driver_ids'],
                        'queue_driver_id' => $idleDrivers['queue_driver_id'],
                        'rejected_driver_ids' => $rejectedDriverIds,
                        'current_driver_id' => $idleDrivers['current_driver_id'],
                    ];

                    $this->fireStoreUpdateDocument($subCollectionPath, $ride_request_id, $updateData, true);
                    $payload = [
                        'ride_requests' => [[
                            'id' => (string) $ride_request_id,
                            'driver_id' => (string) $idleDrivers['current_driver_id'],
                        ]]
                    ];

                    $this->fireStoreAddDocument('driver_ride_requests', $payload, $idleDrivers['current_driver_id']);
                } else {
                    $updateData = [
                        'status' => RideStatusEnum::CANCELLED,
                        'eligible_driver_ids' => null,
                        'queue_driver_id' => null,
                        'rejected_driver_ids' => $rejectedDriverIds,
                        'current_driver_id' => null,
                    ];

                    $this->fireStoreUpdateDocument($subCollectionPath, $ride_request_id, $updateData, true);
                    $rideRequest->ride_status_activities()->create([
                        'status' => RideStatusEnum::CANCELLED,
                        'changed_at' => now(),
                    ]);
                }
            } else {
                $updateData = [
                    'status' => RideStatusEnum::CANCELLED,
                    'driver_id' => $subCollectionDoc['driver_id'],
                ];

                $this->fireStoreDeleteDocument('driver_ride_requests', $driver->id);
                $this->fireStoreUpdateDocument($subCollectionPath, $ride_request_id, $updateData, true);
                $rideRequest->ride_status_activities()->create([
                    'status' => RideStatusEnum::CANCELLED,
                    'changed_at' => now(),
                ]);
            }

            DB::commit();
            return response()->json([
                'message' => __('taxido::static.rides.ride_rejected_successfully'),
                'ride_request_id' => $ride_request_id
            ]);

        } catch (Exception $e) {
            DB::rollBack();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function rental($request)
    {
        DB::beginTransaction();
        try {

            if ($this->verifyVehicleType($request)) {
                $rider_id = $request->rider_id ?? getCurrentUserId();
                if ($this->verifyRideWalletBalance($rider_id)) {
                    $formattedLocations = $request->locations;
                    $no_of_days = (int) $this->getNoOfDaysAttribute($request->start_time, $request->end_time);
                    $request->no_of_days = $no_of_days;
                    $rentalVehicle = RentalVehicle::findOrFail($request->rental_vehicle_id);
                    $symbol = $rentalVehicle?->zone?->currency?->symbol ?? getDefaultCurrencySymbol();
                    $charges = $this->calRentalVehicleCharges($request, $rentalVehicle);
                    $rideRequest = $this->model->create([
                        'rider_id' => $rider_id,
                        'ride_number' => 100000 + ((RideRequest::max('id') + 1) + Ride::max('id') + 1),
                        'payment_method' => $request->payment_method,
                        'vehicle_type_id' => $request->vehicle_type_id,
                        'service_id' => $request->service_id,
                        'service_category_id' => $request->service_category_id,
                        'rider' => $request->new_rider ?? getCurrentRider(),
                        'description' => $request->description,
                        'locations' => $formattedLocations,
                        'location_coordinates' => $request->location_coordinates,
                        'is_with_driver' => $request?->is_with_driver,
                        'start_time' => $request->start_time,
                        'end_time' => $request->end_time,
                        'currency_symbol' => $symbol,
                        'rental_vehicle_id' => $request->rental_vehicle_id,
                        'no_of_days' => $no_of_days,
                        'driver_per_day_charge' => $charges['driver_per_day_charge'] ?? 0,
                        'vehicle_per_day_charge' => $charges['vehicle_per_day_charge'] ?? 0,
                        'driver_rent' => $charges['driver_rent'] ?? 0,
                        'vehicle_rent' => $charges['vehicle_rent'] ?? 0,
                        'platform_fee' => $charges['platform_fee'] ?? 0,
                        'tax' => $charges['tax'] ?? 0,
                        'total' => $charges['total'] ?? 0,
                        'sub_total' => $charges['sub_total'] ?? 0,
                        'commission' => $charges['commission'] ?? 0,
                        'driver_commission' => $charges['driver_commission'] ?? 0,
                    ]);

                    $zones = [];
                    if (!is_array($request->location_coordinates)) {
                        throw new Exception(__('taxido::static.rides.location_coordinates_not_array'), 400);
                    }

                    if (count($request->location_coordinates ?? [])) {
                        $coordinate = head($request->location_coordinates);
                        $zones = getZoneByPoint($coordinate['lat'], $coordinate['lng'])?->pluck('id')?->toArray();
                        if (!count($zones)) {
                            throw new Exception(__('taxido::static.rides.ride_requests_not_accepted'), 400);
                        }
                        $rideRequest?->zones()?->attach($zones);
                    }

                    $driver_id = $rideRequest?->rental_vehicle?->driver_id;
                    $rideRequest?->drivers()?->attach([$driver_id]);
                    $driverIds = [$driver_id];

                    DB::commit();
                    dispatch(fn() => event(new RideRequestEvent($rideRequest)))->afterResponse();

                    $rideRequest?->ride_status_activities()?->create([
                        'status' => RideStatusEnum::REQUESTED,
                        'changed_at' => now(),
                    ]);

                    $rideRequestFireStoreFields = new RideRequestResource($rideRequest);
                    $data = $rideRequestFireStoreFields?->toArray(request());
                    $this->addRideRequestFireStore($data, $driverIds);

                    return response()->json(['id' => $rideRequest?->id, 'data' => new RideRequestResource($rideRequest), 'drivers' => $driver_id]);
                }
            }
        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function ambulance($request)
    {
        DB::beginTransaction();
        $tax = 0;
        $total = 0;
        $subTotal = 0;
        $commission = 0;
        $driverIds = [];
        $driverCommission = 0;
        $additional_min_charge = 0;
        $ambulance_per_dist_charge = 0;
        $platform_fee = (float) getPlatformFee();
        $rider_id = $request->rider_id ?? getCurrentUserId();
        $ambulance = Ambulance::select('id', 'driver_id')?->with(['driver' => function ($query) {
            $query->select('id', 'location');
        }])->find($request->ambulance_id);

        $driverTrack = $this->fireStoreGetDocument('driverTrack', $ambulance->driver_id);
        if (!$driverTrack) {
            throw new Exception(__('taxido::static.rides.ambulance_not_found'), 400);
        }

        $location_coordinates = $request->location_coordinates;
        if (!$driverTrack['lng'] || !$driverTrack['lat']) {
            throw new Exception(__('taxido::static.rides.ambulance_location_not_found'), 400);
        }

        if (!$driverTrack['is_online']) {
            throw new Exception(__('taxido::static.rides.driver_is_offline'), 400);
        }

        $destination[] = [
            'lat' => $driverTrack['lat'],
            'lng' => $driverTrack['lng']
        ];

        $ride_locations = array_merge($location_coordinates, $destination);
        $zoneRideDistance = $this->getZoneRideDistance($ride_locations);
        $resDistance = $zoneRideDistance?->ride_distance;
        $duration =  $resDistance['duration'] ?? '0';
        $totalDuration = (int) filter_var($duration, FILTER_SANITIZE_NUMBER_INT) ?? 0;
        if (!$resDistance) {
            throw new Exception(__('taxido::static.rides.distance_not_found'), 400);
        }

        $settings = getTaxidoSettings();
        $ambulance_per_dist_charge = $settings['driver_commission']['ambulance_per_km_charge'];
        if ($ambulance_per_dist_charge <= 0 || !$ambulance_per_dist_charge) {
            $ambulance_per_dist_charge = 1;
        }

        $ambulance_per_minute_charge = $settings['driver_commission']['ambulance_per_minute_charge'];
        if ($totalDuration && $ambulance_per_minute_charge) {
            $additional_min_charge = $totalDuration * $ambulance_per_minute_charge;
        }

        $rideFare = (($resDistance['distance_value'] ?? 0) * $ambulance_per_dist_charge);
        $subTotal = $rideFare + $additional_min_charge;
        $commissionType =  $settings['driver_commission']['ambulance_commission_type'] ?? 'fixed';
        $commissionRate =  $settings['driver_commission']['ambulance_commission_rate'] ?? 0;
        if ($commissionType == 'percentage') {
            if ($commissionRate) {
                $commission = (($subTotal * $commissionRate) / 100);
            }
        }

        $driverIds = [$ambulance?->driver_id];
        $total = $subTotal + $tax + $commission + $platform_fee;
        $driverCommission = $subTotal - $commission;
        $symbol = $zoneRideDistance?->zone?->currency?->symbol;
        $rideRequest = $this->model->create([
            'ride_number' => 100000 + ((RideRequest::max('id') + 1) + Ride::max('id') + 1),
            'rider_id' => $rider_id,
            'ambulance_id' => $request->ambulance_id,
            'service_id' => $request->service_id,
            'rider' => $request->new_rider ?? getCurrentRider(),
            'ride_fare' => $rideFare,
            'additional_minute_charge' => $additional_min_charge,
            'duration' => $duration,
            'description' => $request->description,
            'locations' => $request?->locations,
            'location_coordinates' => $ride_locations,
            'currency_symbol' => $symbol,
            'distance' => $resDistance['distance_value'] ?? 0,
            'distance_unit' => $resDistance['distance_unit'] ?? null,
            'tax' => number_format($tax ?? 0, 2),
            'platform_fee' => number_format($platform_fee ?? 0, 2),
            'sub_total' => number_format($subTotal ?? 0, 2),
            'total' => number_format($total ?? 0, 2),
            'commission' => number_format($commission ?? 0, 2),
            'driver_commission' => number_format($driverCommission ?? 0, 2),
        ]);

        if (!is_array($request->location_coordinates)) {
            throw new Exception(__('taxido::static.rides.location_coordinates_not_array'), 400);
        }

        $coordinate = head($request->location_coordinates);
        $zones = getZoneByPoint($coordinate['lat'], $coordinate['lng'])?->pluck('id')?->toArray();
        $rideRequest?->zones()?->attach($zones);
        $rideRequest?->drivers()?->attach($driverIds);
        $rideRequest?->ride_status_activities()?->create([
            'status' => RideStatusEnum::REQUESTED,
            'changed_at' => now(),
        ]);

        DB::commit();
        $rideRequest = $rideRequest->refresh();
        dispatch(fn() => event(new RideRequestEvent($rideRequest)))->afterResponse();

        $rideRequestFireStoreFields = new RideRequestResource($rideRequest);
        $data = $rideRequestFireStoreFields?->toArray(request());
        $this->addRideRequestFireStore($data, $driverIds);

        return response()->json(['id' => $rideRequest?->id, 'data' => new RideRequestResource($rideRequest), 'drivers' => $ambulance?->driver_id]);

        try {
        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
