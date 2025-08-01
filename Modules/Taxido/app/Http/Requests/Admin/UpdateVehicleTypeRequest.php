<?php

namespace Modules\Taxido\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVehicleTypeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $id = $this->route('vehicleType') ? $this->route('vehicleType')?->id : $this?->id;
        return [
            'name'  => ['string', 'max:255', 'unique:vehicle_types,name,' .$id. ',id,deleted_at,NULL'],
            'zones[]' => ['nullable','exists:zones,id,deleted_at,NULL'],
            'services[]' => ['nullable','exists:services,id,deleted_at,NULL'],
            'serviceCategories[]' => ['nullable','exists:service_categories,id,deleted_at,NULL'],
            'status' => ['required','min:0','max:1'],
        ];
    }
}
