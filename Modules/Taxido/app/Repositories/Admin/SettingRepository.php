<?php

namespace Modules\Taxido\Repositories\Admin;

use Exception;
use Illuminate\Support\Facades\DB;
use App\Exceptions\ExceptionHandler;
use App\Http\Traits\FireStoreTrait;
use Modules\Taxido\Models\TaxidoSetting;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;
use Prettus\Repository\Eloquent\BaseRepository;

class SettingRepository extends BaseRepository
{
    use FireStoreTrait;

    public function model()
    {
        return TaxidoSetting::class;
    }

    public function index()
    {
        $settings = getTaxidoSettings();

        $settings['setting']['splash_screen'] = getMedia($settings['setting']['splash_screen_id'] ?? null);
        $settings['setting']['driver_splash_screen'] = getMedia($settings['setting']['splash_driver_screen_id'] ?? null);

        return view('taxido::admin.taxido-setting.index', [
            'taxidosettings' => $settings,
            'id' => $this->model->pluck('id')->first(),
        ]);
    }

    public function resetRideRequest()
    {
        $rideRequests = $this->fireStoreQueryCollection('ride_requests');
        $driverRideRequest = $this->fireStoreQueryCollection('driver_ride_requests');
        foreach($rideRequests as $rideRequestDoc) {
            if(isset($rideRequestDoc['id'])) {
                $this->fireStoreDeleteDocument('ride_requests', $rideRequestDoc['id']);
            }
        }

        foreach($driverRideRequest as $driverRideRequestDoc) {
            if(isset($driverRideRequestDoc['id'])) {
                $this->fireStoreDeleteDocument('driver_ride_requests', $driverRideRequestDoc['id']);
            }
        }
    }

    public function update($request, $id)
    {
        DB::beginTransaction();
        try {

            $taxidoSettings = $this->model->findOrFail($id);
            $request = array_diff_key($request, array_flip(['_token', '_method']));
            $taxidoSettingsValue = $taxidoSettings->taxido_values;
            $request['location']['google_map_api_key'] = decryptKey($request['location']['google_map_api_key']);
            $taxidoSettings->update([
                'taxido_values' => $request,
            ]);

            if($taxidoSettingsValue['activation']['bidding'] != $request['activation']['bidding']) {
                $this->resetRideRequest();
            }

            DB::commit();
            $this->env($request);
            return to_route('admin.taxido-setting.index')->with('success', __('static.settings.update_successfully'));

        } catch (Exception $e) {
            DB::rollback();
            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

    public function env($taxido_values)
    {
        try {
            if (isset($taxido_values['location']['google_map_api_key'])){
                $google_map_api_key = $taxido_values['location']['google_map_api_key'];
                DotenvEditor::setKeys([
                    'GOOGLE_MAP_API_KEY' => $google_map_api_key,
                ]);

                DotenvEditor::save();
            }
        } catch (Exception $e) {

            throw new ExceptionHandler($e->getMessage(), $e->getCode());
        }
    }

}
