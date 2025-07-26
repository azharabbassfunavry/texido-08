<?php

namespace Modules\Taxido\Http\Resources\Fleet;

use Illuminate\Http\Request;
use App\Http\Resources\BaseResource;

class FleetSelfResource  extends BaseResource
{
    protected $showSensitiveAttributes = true;

    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public function toArray(Request $request): array
    {   
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'profile_image_url' => $this->profile_image?->original_url,
            'phone' => $this->phone,
        ];
    }
}