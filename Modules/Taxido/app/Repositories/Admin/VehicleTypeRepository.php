<?php

namespace Modules\Taxido\Repositories\Admin;

use Exception;
use Modules\Taxido\Models\Zone;
use Illuminate\Support\Facades\DB;
use App\Exceptions\ExceptionHandler;
use Modules\Taxido\Models\VehicleType;
use Prettus\Repository\Eloquent\BaseRepository;

class VehicleTypeRepository extends BaseRepository
{
    function model()
    {
        Zone::class;
        return VehicleType::class;
    }

    public function index($vehicleTypeTable)
    {
        if (request()['action']) {
            return redirect()->back();
        }

        return view('taxido::admin.vehicle-type.index', ['tableConfig' => $vehicleTypeTable]);
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {

            $vehicleType = $this->model->create([
                'name' => $request->name,
                'max_seat' => $request->max_seat,
                'vehicle_image_id' => $request->vehicle_image_id,
                'vehicle_map_icon_id' => $request->vehicle_map_icon_id,
                'status' => $request->status,
                'is_all_zones' => $request->is_all_zones,
                'service_id' => $request->service_id
            ]);

            if (!empty($request->zones)) {
                $vehicleType->zones()->attach($request->zones);
            }

            if (!empty($request->serviceCategories)) {
                $vehicleType->service_categories()->attach($request->serviceCategories);
            }

            $locale = $request['locale'] ?? app()->getLocale();
            $vehicleType->setTranslation('name', $locale, $request['name']);

            DB::commit();
            return to_route(getVehicleIndexRoute($request->req_service))->with('success', __('taxido::static.vehicle_types.create_successfully'));

        } catch (Exception $e) {

            DB::rollBack();

            
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $vehicleType = $this->model->FindOrFail($id);
            $locale = $request['locale'] ?? app()->getLocale();
            $vehicleType->setTranslation('name', $locale, $request['name']);
            $data = array_diff_key($request, array_flip(['name', 'locale']));
            $vehicleType->update($data);

            if (isset($request['vehicle_image_id'])) {
                $vehicleType->vehicle_image()->associate($request['vehicle_image_id']);
                $vehicleType->vehicle_image;
            }

            if (isset($request['vehicle_map_icon_id'])) {
                $vehicleType->vehicle_map_icon()->associate($request['vehicle_map_icon_id']);
                $vehicleType->vehicle_map_icon;
            }

            if (!empty($request['zones'])) {
                $vehicleType->zones()->sync([]);
                $vehicleType->zones()->sync($request['zones']);
            }

            if (!empty($request['services'])) {
                $vehicleType->services()->associate($request['services']);
            }

            if (!empty($request['serviceCategories'])) {
                $vehicleType->service_categories()->sync([]);
                $vehicleType->service_categories()->sync($request['serviceCategories']);
            }

            DB::commit();

            return to_route(getVehicleIndexRoute($request['req_service']))?->with('success', __('taxido::static.vehicle_types.update_successfully'));

        } catch (Exception $e) {

            DB::rollBack();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function destroy($id)
    {
        try {

            $vehicleType = $this->model->findOrFail($id);
            $vehicleType->destroy($id);

            return redirect()->back()->with('success', __('taxido::static.vehicle_types.delete_successfully'));
        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function status($id, $status)
    {
        try {

            $vehicleType = $this->model->findOrFail($id);
            $vehicleType->update(['status' => $status]);

            return json_encode(["resp" => $vehicleType]);
        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());

        }
    }

    public function restore($id)
    {
        try {

            $vehicleType = $this->model->onlyTrashed()->findOrFail($id);
            $vehicleType->restore();

            return redirect()->back()->with('success', __('taxido::static.vehicle_types.restore_successfully'));
        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());

        }
    }

    public function forceDelete($id)
    {
        try {

            $vehicleType = $this->model->onlyTrashed()->findOrFail($id);
            $vehicleType->forceDelete();

            return redirect()->back()->with('success', __('taxido::static.vehicle_types.permanent_delete_successfully'));
        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }
    
}
