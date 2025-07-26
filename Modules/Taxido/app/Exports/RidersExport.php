<?php

namespace Modules\Taxido\Exports;

use Modules\Taxido\Models\Rider;
use App\Exceptions\ExceptionHandler;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class RidersExport implements FromCollection,WithMapping,WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        if (isDemoModeEnabled()) {
            throw new ExceptionHandler("This action is disabled in demo mode", 400);
        }
        
        $riders = Rider::whereNull('deleted_at')->latest('created_at');
        return $this->filter($riders, request());
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
            'password',
            'status',
        ];
    }

    public function map($rider): array
    {
        return [
            $rider->id,
            $rider->name,
            $rider->email,
            $rider->country_code,
            $rider->phone,
            $rider->profile_image?->original_url,
            $rider->password ? : null,
            $rider->status,
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
            'Name',
            'Email',
            'Country Code',
            'Phone',
            'Profile Image',
            'Password', 
            'Status',
        ];
    }

    public function filter($riders, $request)
    {
        return $riders->get();
    }

}