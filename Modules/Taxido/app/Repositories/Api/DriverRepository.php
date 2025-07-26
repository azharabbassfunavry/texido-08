<?php

namespace Modules\Taxido\Repositories\Api;

use Exception;
use Modules\Taxido\Models\Driver;
use Illuminate\Support\Facades\DB;
use App\Exceptions\ExceptionHandler;
use Modules\Taxido\Models\Ambulance;
use Illuminate\Database\Eloquent\Builder;
use Modules\Taxido\Http\Traits\RideTrait;
use Prettus\Repository\Eloquent\BaseRepository;

class DriverRepository extends BaseRepository
{

    use RideTrait;

    public function model()
    {
        return Driver::class;
    }

    public function driverZone($request)
    {
        DB::beginTransaction();
        try {

            $zoneIds = [];
            $isValid = false;
            $locations = $request->locations;
            if(is_array($locations)) {
                $locate = head($locations);
                if((!is_null($locate['lat']) && !is_null($locate['lng']))) {
                    $isValid = true;
                }
            }

            if($isValid) {
                $driver = getCurrentDriver();
                if ($driver) {
                    $driver->update([
                        'is_online' => $request->is_online,
                        'location' => $request->locations,
                    ]);

                    foreach ($locations as $location) {
                        $zones = getZoneByPoint($location['lat'], $location['lng']);
                        if (!$zones->isEmpty()) {
                            foreach ($zones as $zone) {
                                $zoneIds[] = $zone?->id;
                            }
                        }
                    }

                    if (!empty($zoneIds)) {
                        $driver->zones()->sync([]);
                        $driver->zones()->sync(array_unique($zoneIds));
                    }

                    DB::commit();
                    return [
                        'success' => true,
                    ];
                }
            }

            DB::rollback();
            return [
                'success' => false,
            ];

        } catch (Exception $e) {

            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getAmbulance($request)
    {
        try {

            if($request->lat && $request->lng) {
                $driverIds = $this->findNearestDrivers($request->lat, $request->lng);
                return Ambulance::whereNull('deleted_at')?->whereIn('driver_id', $driverIds)?->simplePaginate();
            }

            throw new Exception("lat and lng field is required.", 422);


        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function getNearestDrivers($request)
    {
        try {

            $zoneIds = [];
            $drivers = $this->model;
            if($request->lat && $request->lng) {
                $zones = getZoneByPoint($request->lat, $request->lng);
                if (!$zones->isEmpty()) {
                    foreach ($zones as $zone) {
                        $zoneIds[] = $zone?->id;
                    }
                }
            }

            if ($request?->service_id) {
                $drivers = $drivers?->where('service_id', $request?->service_id);
            }

            if ($request?->service_category_id) {
                $drivers = $drivers?->where('service_category_id', $request?->service_category_id);
            }

            $driverIds = $drivers?->pluck('id')?->toArray();
            if ($request?->vehicle_type_id) {
                $vehicleTypeId = $request?->vehicle_type_id;
                $drivers = $drivers?->whereHas('vehicle_info', function (Builder $vehicleInfo) use ($vehicleTypeId) {
                    $vehicleInfo->where('vehicle_type_id', $vehicleTypeId);
                });
            }

            return Ambulance::whereNull('deleted_at')?->whereIn('driver_id', $driverIds)?->simplePaginate();

        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
}
