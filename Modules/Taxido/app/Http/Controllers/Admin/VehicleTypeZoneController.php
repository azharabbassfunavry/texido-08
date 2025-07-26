<?php

namespace Modules\Taxido\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Modules\Taxido\Models\Zone;
use App\Http\Controllers\Controller;
use Modules\Taxido\Models\VehicleType;
use Modules\Taxido\Models\VehicleTypeZone;
use Modules\Taxido\Repositories\Admin\VehicleTypeZoneRepository;

class VehicleTypeZoneController extends Controller
{
    public $repository;

    /**
     * Display a listing of the resource.
     */
    public function __construct(VehicleTypeZoneRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index($vehicleTypeId)
    {
        $vehicleType = VehicleType::findOrFail($vehicleTypeId);
        return view('taxido::admin.vehicle-zones.index', ['vehicleTypeZones' => VehicleTypeZone::where('vehicle_type_id', $vehicleTypeId)->get(), 'vehicleTypeId' => $vehicleTypeId,  'vehicleName' => $vehicleType->name,'zones' => Zone::all()]);
    }

    public function vehicleZonePriceIndex($vehicleTypeId, $zoneId)
    {
        return $this->repository->vehicleZonePriceIndex($vehicleTypeId, $zoneId);
    }

    public function vehicleZonePriceShow($vehicleTypeId, $zoneId)
    {
        return $this->repository->vehicleZonePriceShow($vehicleTypeId, $zoneId);
    }

    public function vehicleZonePriceStore(Request $request)
    {
        return $this->repository->vehicleZonePriceStore($request);
    }

    public function vehicleZonePriceUpdate(Request $request, VehicleTypeZone $vehicleTypeZone)
    {
        return $this->repository->vehicleZonePriceUpdate($request, $vehicleTypeZone);
    }  
}
