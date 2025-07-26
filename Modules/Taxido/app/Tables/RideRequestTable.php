<?php

namespace Modules\Taxido\Tables;

use App\Models\Currency;
use Illuminate\Http\Request;
use Modules\Taxido\Enums\RoleEnum;
use Modules\Taxido\Models\RideRequest;
use Modules\Taxido\Enums\ServicesEnum;

class RideRequestTable
{
    protected $rideRequest;

    protected $request;

    protected $sortableColumns = [
        'rider.name',
        'driver.name',
        'service.name',
        'service_category.name',
        'ride_fare',
        'created_at',
    ];

    public function __construct(Request $request)
    {
        $this->rideRequest = RideRequest::query();
        $this->request = $request;
    }

    public function getRideRequests($applyRoleFilter = true)
    {
        $rideRequests = $this->rideRequest->newQuery();
        $roleName = getCurrentRoleName();

        if ($applyRoleFilter) {
            if ($roleName == RoleEnum::DRIVER) {
                $currentUserId = getCurrentUserId();
                $rideRequests = $rideRequests->whereHas('drivers', function($query) use ($currentUserId) {
                    $query->where('driver_id', $currentUserId);
                });
            }

            if ($roleName == RoleEnum::FLEET_MANAGER) {
                $fleetManagerId = getCurrentUserId();
                $rideRequests = $rideRequests->whereHas('drivers', function ($query) use ($fleetManagerId) {
                    $query->where('fleet_manager_id', $fleetManagerId);
                });
            }

            if ($roleName == RoleEnum::DISPATCHER) {
                $rideRequests = $rideRequests->whereHas('zones', function ($q) {
                    $q->whereHas('dispatchers', function ($q) {
                        $q->where('dispatcher_id', getCurrentUserId());
                    });
                });
            }
        }

        return $rideRequests;
    }

    public function getData()
    {
        $rideRequests = $this->getRideRequests();

        if ($this->request->has('filter') && $this->request->get('filter') !== 'all') {
            $rideRequests = $rideRequests->where('ride_requests.service_id', getServiceIdBySlug($this->request->get('filter')));
        }

        $rideRequests = $rideRequests->whereNull('ride_requests.deleted_at');

        if ($this->request->has('s')) {
            $rideRequests = $rideRequests->withTrashed()
                ->where(function ($query) {
                    $query->where('ride_number', 'LIKE', '%' . $this->request->s . '%')
                          ->orWhere('ride_fare', 'LIKE', '%' . $this->request->s . '%');
                });
        }

        $rideRequests = $this->sorting($rideRequests);

        return $rideRequests->latest()->paginate($this->request->paginate ?? 15);
    }

    public function generate()
    {
        $rideRequests = $this->getData();
        $currencyCode = session('currency', getDefaultCurrencyCode());
        $currencySymbol = Currency::where('code', $currencyCode)->value('symbol') ?? getDefaultCurrencySymbol();

        $rideRequests->each(function ($rideRequest) use ($currencySymbol, $currencyCode) {
            $convertedTotal = currencyConvert($currencyCode, $rideRequest->total);
            $rideRequest->formatted_total = ($rideRequest->currency_symbol ?? $currencySymbol) . number_format($convertedTotal, 2);
            $rideRequest->date = formatDateBySetting($rideRequest->created_at);
            $rideRequest->ride_numb = '#' .($rideRequest->ride_number ?? 'N/A');

            $rider = is_string($rideRequest->rider) ? json_decode($rideRequest->rider, true) : $rideRequest->rider;
            $rider = is_array($rider) ? $rider : [];

            $rideRequest->rider_name = $rider['name'] ?? null;
            $rideRequest->rider_email = isDemoModeEnabled() ? __('taxido::static.demo_mode') : ($rider['email'] ?? null);
            $rideRequest->rider_profile = $rider['profile_image_id'] ?? null;

            $rideRequest->driver_name = $rideRequest->driver?->name;
            $rideRequest->driver_email = isDemoModeEnabled() ? __('taxido::static.demo_mode') : ($rideRequest->driver?->email ?? null);
            $rideRequest->driver_profile = $rideRequest->driver?->profile_image_id ?? null;
            $rideRequest->service = $rideRequest->service?->name;
            $rideRequest->service_category = $rideRequest->service_category?->name ?? 'N/A';

            $rideRequest->payment_method = ucfirst($rideRequest->payment_method);
            $rideRequest->status = ucfirst($rideRequest?->ride_status_activities()?->latest()->first()?->status ?? 'N/A');
        });

        $baseQuery = $this->getRideRequests()->whereNull('ride_requests.deleted_at');

        $tableConfig = [
            'columns' => [
                ['title' => 'Ride Number', 'field' => 'ride_numb', 'sortable' => true, 'sortField' => 'ride_number', 'type' => 'badge', 'badge_type' => 'light'],
                ['title' => 'Rider', 'field' => 'rider_name', 'route' => 'admin.rider.show', 'email' => 'rider_email', 'profile_image' => 'rider_profile', 'sortable' => true, 'profile_id' => 'rider_id', 'sortField' => 'rider.name'],
                ['title' => 'Service', 'field' => 'service', 'sortable' => true, 'sortField' => 'service.name'],
                ['title' => 'Service Category', 'field' => 'service_category', 'sortable' => true, 'sortField' => 'service_category.name'],
                ['title' => 'Total', 'field' => 'formatted_total', 'sortable' => true, 'sortField' => 'ride_fare'],
                ['title' => 'Created At', 'field' => 'date', 'sortable' => true, 'sortField' => 'created_at'],
                ['title' => 'Action', 'type' => 'action', 'permission' => ['ride_request.index'], 'sortable' => false],
            ],
            'data' => $rideRequests,
            'actions' => [],
            'filters' => [
                ['title' => 'All', 'slug' => 'all', 'count' => (clone $baseQuery)->count()],
                ['title' => ucfirst(ServicesEnum::CAB), 'slug' => ServicesEnum::CAB, 'count' => (clone $baseQuery)->where('service_id', getServiceIdBySlug(ServicesEnum::CAB))->count()],
                ['title' => ucfirst(ServicesEnum::PARCEL), 'slug' => ServicesEnum::PARCEL, 'count' => (clone $baseQuery)->where('service_id', getServiceIdBySlug(ServicesEnum::PARCEL))->count()],
                ['title' => ucfirst(ServicesEnum::FREIGHT), 'slug' => ServicesEnum::FREIGHT, 'count' => (clone $baseQuery)->where('service_id', getServiceIdBySlug(ServicesEnum::FREIGHT))->count()],
                ['title' => ucfirst(ServicesEnum::AMBULANCE), 'slug' => ServicesEnum::AMBULANCE, 'count' => (clone $baseQuery)->where('service_id', getServiceIdBySlug(ServicesEnum::AMBULANCE))->count()],
            ],
            'bulkactions' => [
                ['whenFilter' => ['all']],
            ],
            'actionButtons' => [
                ['icon' => 'ri-eye-line', 'permission' => 'ride_request.index', 'route' => 'admin.ride-request.details', 'field' => 'id', 'class' => 'dark-icon-box', 'tooltip' => 'Ride Request details'],
            ],
            'total' => $rideRequests->total(),
        ];

        return $tableConfig;
    }

    public function sorting($rideRequests)
    {
        if ($this->request->has('orderby') && $this->request->has('order')) {
            $orderby = $this->request->get('orderby');
            $order = strtolower($this->request->get('order')) === 'asc' ? 'asc' : 'desc';

            if ($this->isSortable($orderby)) {
                if (str_contains($orderby, '.')) {
                    $parts = explode('.', $orderby);
                    $relation = $parts[0];
                    $column = $parts[1];

                    switch ($relation) {
                        case 'rider':
                            $rideRequests = $rideRequests->join('users as rider_users', 'ride_requests.rider_id', '=', 'rider_users.id')
                                ->select('ride_requests.*', 'rider_users.name as name')
                                ->orderBy("rider_users.$column", $order);
                            break;

                        case 'driver':
                            $rideRequests = $rideRequests->leftJoin('users as driver_users', 'ride_requests.assigned_driver_id', '=', 'driver_users.id')
                                ->select('ride_requests.*', 'driver_users.name as driver_name')
                                ->orderBy("driver_users.$column", $order);
                            break;

                        case 'service':
                            $rideRequests = $rideRequests->join('services', 'ride_requests.service_id', '=', 'services.id')
                                ->select('ride_requests.*', 'services.name as service_name')
                                ->orderBy("services.$column", $order);
                            break;

                        case 'service_category':
                            $rideRequests = $rideRequests->leftJoin('service_categories', 'ride_requests.service_category_id', '=', 'service_categories.id')
                                ->select('ride_requests.*', 'service_categories.name as service_category_name')
                                ->orderBy("service_categories.$column", $order);
                            break;
                    }
                } else {
                    $rideRequests = $rideRequests->orderBy($orderby, $order);
                }
            }
        }

        return $rideRequests;
    }

    protected function isSortable($column)
    {
        return in_array($column, $this->sortableColumns);
    }
}
