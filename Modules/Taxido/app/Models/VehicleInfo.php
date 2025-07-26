<?php

namespace Modules\Taxido\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VehicleInfo extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'vehicle_info';

    /**
     * The Vehicles that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'color',
        'plate_number',
        'seat',
        'model',
        'vehicle_type_id',
        'driver_id'
    ];

    protected $casts = [
        'vehicle_type_id' => 'integer',
        'driver_id' => 'integer',
    ];

    protected $hidden = [
        'created_at',
        'deleted_at',
        'updated_at',
    ];

    /**
     * @return BelongsTo
     */
    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(VehicleType::class, 'vehicle_type_id');
    }

    /**
     * @return BelongsTo
     */
    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class, 'driver_id');
    }

    /**
     * @return BelongsTo
     */
    public function ride(): BelongsTo
    {
        return $this->belongsTo(Ride::class, 'ride_id');
    }


}
