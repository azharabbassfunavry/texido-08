<?php

namespace Modules\Taxido\Exports;

use Modules\Taxido\Models\Driver;
use App\Exceptions\ExceptionHandler;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;
use Modules\Taxido\Enums\RoleEnum;

class DriversExport implements FromCollection, WithMapping, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        if (isDemoModeEnabled()) {
            throw new ExceptionHandler("This action is disabled in demo mode", 400);
        }

        $drivers = Driver::whereNull('deleted_at')->latest('created_at');
        return $this->filter($drivers, request());
    }

    /**
     * Specify the columns for the export.
     *
     * @return array
     */
    public function columns(): array
    {
        return [
            'id',
            'name',
            'email',
            'country_code',
            'phone',
            'profile_image_id',
            'is_online',
            'is_on_ride',
            'location',
            'status',
        ];
    }

    public function map($driver): array
    {
        return [
            $driver->id,
            $driver->email,
            $driver->country_code,
            $driver->phone,
            $driver->profile_image?->original_url,
            $driver->is_online,
            $driver->is_on_ride,
            $driver->location,
            $driver->status,
        ];
    }

    /**
     * Get the headings for the export file.
     *
     * @return array
     */
    public function headings(): array
    {
        return [
            'ID',
            'Email',
            'Country Code',
            'Phone',
            'Profile Image',
            'Is Online',
            'Is On Ride',
            'Location',
            'Status',
        ];
    }

    public function filter($drivers, $request)
    {
        $currentUserRole = getCurrentRoleName();
        $currentUserId = getCurrentUserId();

        if ($currentUserRole == RoleEnum::FLEET_MANAGER) {
            $drivers = $drivers->where('fleet_manager_id', $currentUserId);
        }

        if ($currentUserRole == RoleEnum::DRIVER) {
            $drivers = $drivers->where('driver_id', $currentUserId);
        }

        if ($currentUserRole == RoleEnum::DISPATCHER) {
            $drivers = $drivers->whereHas('zones', function ($q) {
                $q->whereHas('dispatchers', function ($q) {
                    $q->where('dispatcher_id', getCurrentUserId());
                });
            });
        }
        
        return $drivers->get();
    }
}
