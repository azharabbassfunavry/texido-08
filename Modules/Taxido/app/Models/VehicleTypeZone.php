<?php

namespace Modules\Taxido\Models;

use App\Models\Tax;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VehicleTypeZone extends Model
{
    protected $table = "vehicle_type_zones";

    protected $fillable = [
        'id',
        'vehicle_type_id',
        'zone_id',
        'base_fare_charge',
        'base_distance',
        'tax_id',
        'is_allow_tax',
        'per_distance_charge',
        'per_minute_charge',
        'per_weight_charge',
        'waiting_charge',
        'free_waiting_time_before_start_ride',
        'free_waiting_time_after_start_ride',
        'is_allow_airport_charge',
        'cancellation_charge_for_rider',
        'cancellation_charge_for_driver',
        'commission_type',
        'commission_rate',
        'airport_charge_rate',
        'charge_goes_to',
    ];

    protected $casts = [
        'vehicle_type_id' => 'integer',
        'zone_id' => 'integer'
    ];

    /**
     * @return BelongsTo
     */
    public function tax(): BelongsTo
    {
        return $this->belongsTo(Tax::class, 'tax_id');
    }

    /**
     * @return BelongsTo
     */
    public function zone(): BelongsTo
    {
        return $this->belongsTo(Zone::class, 'zone_id');
    }
}
