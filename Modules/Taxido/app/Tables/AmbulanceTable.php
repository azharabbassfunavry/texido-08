<?php

namespace Modules\Taxido\Tables;

use Illuminate\Http\Request;
use Modules\Taxido\Enums\RoleEnum;
use Modules\Taxido\Models\Ambulance;

class AmbulanceTable
{
    protected $ambulance;
    protected $request;

    public function __construct(Request $request)
    {
        $this->ambulance = Ambulance::query();
        $this->request = $request;
    }

    public function getAmbulances()
    {
        $ambulances = $this->ambulance->with('driver');

        $currentUserRole = getCurrentRoleName();
        $currentUserId = getCurrentUserId();

        if ($currentUserRole == RoleEnum::DRIVER) {
            return $ambulances->where('driver_id', $currentUserId);
        }

        if ($currentUserRole == RoleEnum::FLEET_MANAGER) {
            $ambulances = $ambulances->whereHas('driver', function($q) use ($currentUserId) {
                $q->where('fleet_manager_id', $currentUserId);
            });
        }

        return $ambulances;
    }

    public function getData()
    {
        $ambulances = $this->getAmbulances();

        if ($this->request->has('filter')) {
            switch ($this->request->filter) {
                case 'all':
                    $ambulances = $ambulances->whereNull('deleted_at');
                    break;
            }
        }

        if (isset($this->request->s)) {
            return $ambulances->withTrashed()
                ->where('name', 'LIKE', "%" . $this->request->s . "%")
                ->orWhere('description', 'LIKE', "%" . $this->request->s . "%")
                ->orWhereHas('driver', function($q) {
                    $q->where('name', 'LIKE', "%" . $this->request->s . "%");
                })
                ->paginate($this->request?->paginate);
        }

        if ($this->request->has('orderby') && $this->request->has('order')) {
            return $ambulances->orderBy($this->request->orderby, $this->request->order)
                ->paginate($this->request?->paginate);
        }

        return $ambulances->latest()->paginate($this->request?->paginate);
    }

    public function generate()
    {
        $ambulances = $this->getData();

        if ($this->request->has('action') && $this->request->has('ids')) {
            $this->bulkActionHandler();
        }

        $ambulances->each(function ($ambulance) {
            $ambulance->driver_name = $ambulance?->driver?->name;
            $ambulance->driver_email = isDemoModeEnabled() ? __('taxido::static.demo_mode') : ($ambulance?->driver?->email ?? null);
            $ambulance->driver_profile = $ambulance?->driver?->profile_image_id ?? null;
            $ambulance->driver_name = $ambulance->driver?->name ?? 'N/A';
            $ambulance->date = formatDateBySetting($ambulance->created_at);
        });

        $tableConfig = [
            'columns' => [
                ['title' => 'Name', 'field' => 'name', 'sortable' => true],
                ['title' => 'Driver', 'field' => 'driver_name', 'email' => 'driver_email', 'profile_image' => 'driver_profile',   'sortable' => true, 'sortField' => 'users.name', 'route' => 'admin.driver.show', 'profile_id' => 'driver_id'],
                ['title' => 'Created At', 'field' => 'date', 'sortable' => true, 'sortField' => 'created_at'],
            ],
            'data' => $ambulances,
            'actions' => [
                ['title' => 'Edit', 'route' => 'admin.ambulance.edit', 'url' => '', 'class' => 'edit', 'whenFilter' => ['all'], 'permission' => 'ambulance.edit'],
            ],
            'filters' => [
                ['title' => 'All', 'slug' => 'all', 'count' => $this->getAmbulances()->whereNull('deleted_at')->count()],
            ],
            'bulkactions' => [
                ['title' => 'Move to Trash', 'action' => 'trash', 'permission' => 'ambulance.destroy', 'whenFilter' => ['all']],
            ],
            'total' => $ambulances->count(),
        ];

        return $tableConfig;
    }

    public function bulkActionHandler()
    {
        switch ($this->request->action) {
            case 'trash':
                $this->trashHandler();
                break;
        }
    }

    public function trashHandler(): void
    {
        $this->ambulance->whereIn('id', $this->request->ids)->delete();
    }
}