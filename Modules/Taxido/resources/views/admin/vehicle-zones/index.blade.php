@extends('admin.layouts.master')
@section('title', __('taxido::static.vehicle_type_zones.vehicle_type_zone'))
@push('css')
    <link rel="stylesheet" type="text/css" href="{{ asset('css/vendors/swiper-slider.css') }}">
@endpush

@section('content')
    <div class="contentbox">
        <div class="inside">
            <div class="contentbox-title">
                <div class="contentbox-subtitle">
                    <h3>
                        {{ __('taxido::static.vehicle_type_zones.vehicle_type_zone') }}
                        @isset($vehicleName)
                            <span class="text-primary">({{ Str::title($vehicleName) }})</span>
                        @endisset
                    </h3>
                    <button type="button" class="btn btn-calculate ms-auto" data-bs-toggle="modal"
                        data-bs-target="#fareCalculationModal">
                        <i class="ri-information-line"></i> {{ __('taxido::static.vehicle_types.calculated') }}
                    </button>
                </div>
            </div>

            <div class="vehicle-type-zone-table">
                <div class="table-main">
                    <div id="success-message" class="alert alert-success d-none"></div>
                    <div id="error-message" class="alert alert-danger d-none"></div>
                    <div class="table-responsive custom-scrollbar">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>{{__('taxido::static.vehicle_type_zones.zone_name')}}</th>
                                    <th>{{__('taxido::static.vehicle_type_zones.currency_code')}}</th>
                                    <th>{{__('taxido::static.vehicle_type_zones.distance_type')}}</th>
                                    <th>{{__('taxido::static.vehicle_type_zones.action')}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($zones as $zone)
                                    <tr>
                                        <td>{{ $zone->name }}</td>
                                        <td>{{ $zone->currency?->code ?? getDefaultCurrency()?->code }}</td>
                                        <td>{{ ucfirst($zone->distance_type) }}</td>
                                        <td>
                                            <button type="button" class="btn btn-primary set-price-btn"
                                                data-zone-id="{{ $zone->id }}" data-zone-name="{{ $zone->name }}"
                                                data-currency-symbol="{{ $zone->currency?->symbol ?? getDefaultCurrency()?->symbol }}"
                                                data-distance-type="{{ $zone->distance_type }}"
                                                data-vehicle-type-id="{{ $vehicleTypeId }}"
                                                @if (!$vehicleTypeId) disabled title="Save the vehicle type first to set zone prices" @endif>
                                                <span class="spinner-border spinner-border-sm d-none"></span>
                                                {{__('taxido::static.vehicle_type_zones.set_price')}}
                                            </button>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        @use('App\Models\Tax')
        @use('Modules\Taxido\Models\Airport')
        @use('Modules\Taxido\Models\VehicleType')
        @use('Modules\Taxido\Enums\ServicesEnum')
        @php
            $taxes = Tax::where('status', true)->get(['id', 'name']);
            $airports = Airport::where('status', true)->get(['id', 'name']);
            $vehicleType = VehicleType::find($vehicleTypeId);
        @endphp

        <!-- Price Modal -->
        <div class="modal fade set-price-modal" data-bs-backdrop="static" data-bs-keyboard="false" id="priceModal">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{__('taxido::static.vehicle_type_zones.set_price_for')}} <span id="zoneName"></span></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="priceForm" action="{{ route('admin.vehicle-type-zones.store') }}" method="POST">
                            @csrf
                            @method('POST')
                            <input type="hidden" name="zone_id" id="zoneId">
                            <input type="hidden" name="vehicle_type_id" id="vehicleTypeId">
                            <input type="hidden" name="id" id="priceId">
                            <div class="row g-sm-4 g-3">
                                <div class="col-xl-4 col-lg-6">
                                    <div class="form-group m-0">
                                        <label for="base_fare_charge" class="form-label">{{__('taxido::static.vehicle_type_zones.base_fare_charge')}}<span>
                                            *</span></label>
                                        <div class="input-group">
                                            <span
                                                class="input-group-text currency-symbol">{{ getDefaultCurrency()?->symbol ?? 'N/A' }}</span>
                                            <input type="number" class="form-control" id="base_fare_charge"
                                                name="base_fare_charge" step="0.01" required
                                                placeholder="Enter base fare charge">
                                            <span class="invalid-feedback d-none" id="base_fare_charge_error"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6">
                                    <div class="form-group m-0">
                                        <label for="base_distance" class="form-label">{{__('taxido::static.vehicle_type_zones.base_distance')}}(<i
                                                id="distanceUnit">Km</i>)<span>
                                                    *</span></label>
                                        <input type="number" class="form-control" id="base_distance" name="base_distance"
                                            step="0.01" required placeholder="Enter base distance">
                                        <span class="invalid-feedback d-none" id="base_distance_error"></span>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6">
                                    <div class="form-group m-0">
                                        <label for="per_distance_charge" class="form-label">{{__('taxido::static.vehicle_type_zones.per_distance_charge')}} (<i
                                                id="distanceUnitPrice">Km</i>)<span>*</span></label>
                                        <div class="input-group">
                                            <span
                                                class="input-group-text currency-symbol">{{ getDefaultCurrency()?->symbol ?? 'N/A' }}</span>
                                            <input type="number" class="form-control" id="per_distance_charge"
                                                name="per_distance_charge" step="0.01" required
                                                placeholder="Enter per distance charge">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6">
                                    <div class="form-group m-0">
                                        <label for="per_minute_charge" class="form-label">{{__('taxido::static.vehicle_type_zones.per_minute_charge')}}<span>
                                            *</span></label>
                                        <div class="input-group">
                                            <span
                                                class="input-group-text currency-symbol">{{ getDefaultCurrency()?->symbol ?? 'N/A' }}</span>
                                            <input type="number" class="form-control" id="per_minute_charge"
                                                name="per_minute_charge" step="0.01" required
                                                placeholder="Enter per minute charge">
                                        </div>
                                    </div>
                                </div>
                                @if (in_array($vehicleType->services?->type, [ServicesEnum::FREIGHT, ServicesEnum::PARCEL]))
                                    <div class="col-xl-4 col-lg-6">
                                        <div class="form-group m-0">
                                            <label for="per_weight_charge" class="form-label">{{__('taxido::static.vehicle_type_zones.per_weight_charge')}}</label>
                                            <div class="input-group">
                                                <span
                                                    class="input-group-text currency-symbol">{{ getDefaultCurrency()?->symbol ?? 'N/A' }}</span>
                                                <input type="number" class="form-control" id="per_weight_charge"
                                                    name="per_weight_charge" step="0.01"
                                                    placeholder="Enter per weight charge">
                                            </div>
                                        </div>
                                    </div>
                                @endif
                                <div class="col-xl-4 col-lg-6">
                                    <div class="form-group m-0">
                                        <label for="waiting_charge" class="form-label">{{__('taxido::static.vehicle_type_zones.waiting_charge')}}</label>
                                        <div class="input-group">
                                            <span
                                                class="input-group-text currency-symbol">{{ getDefaultCurrency()?->symbol ?? 'N/A' }}</span>
                                            <input type="number" class="form-control" id="waiting_charge"
                                                name="waiting_charge" step="0.01" placeholder="Enter waiting charge">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6">
                                    <div class="form-group m-0">
                                        <label for="free_waiting_time_before_start_ride" class="form-label">{{__('taxido::static.vehicle_type_zones.free_wait_time')}}</label>
                                        <input type="number" class="form-control"
                                            id="free_waiting_time_before_start_ride"
                                            name="free_waiting_time_before_start_ride" step="0.0.1"
                                            placeholder="Enter free waiting time before start">
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6">
                                    <div class="form-group m-0">
                                        <label for="free_waiting_time_after_start_ride" class="form-label">{{__('taxido::static.vehicle_type_zones.free_Wait_time_after_start_ride')}}</label>
                                        <input type="number" class="form-control"
                                            id="free_waiting_time_after_start_ride"
                                            name="free_waiting_time_after_start_ride" step="0.0.1"
                                            placeholder="Enter free waiting time after start">
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6">
                                    <div class="form-group">
                                        <label for="cancellation_charge_for_rider" class="form-label">{{__('taxido::static.vehicle_type_zones.cancellation_charge_rider')}}</label>
                                        <div class="input-group">
                                            <span
                                                class="input-group-text currency-symbol">{{ getDefaultCurrency()?->symbol ?? 'N/A' }}</span>
                                            <input type="number" class="form-control" id="cancellation_charge_for_rider"
                                                name="cancellation_charge_for_rider" step="0.01"
                                                placeholder="Enter rider cancellation charge">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6">
                                    <div class="form-group m-0">
                                        <label for="cancellation_charge_for_driver" class="form-label">{{__('taxido::static.vehicle_type_zones.cancellation_charge_driver')}}</label>
                                        <div class="input-group">
                                            <span
                                                class="input-group-text currency-symbol">{{ getDefaultCurrency()?->symbol ?? 'N/A' }}</span>
                                            <input type="number" class="form-control"
                                                id="cancellation_charge_for_driver" name="cancellation_charge_for_driver"
                                                step="0.01" placeholder="Enter driver cancellation charge">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6">
                                    <div class="form-group m-0">
                                        <label for="commission_type" class="form-label">{{__('taxido::static.vehicle_type_zones.commission_type')}}<span>
                                            *</span></label>
                                        <select class="form-select" id="commission_type" name="commission_type" required>
                                            <option value="fixed">{{__('taxido::static.vehicle_type_zones.fixed')}}</option>
                                            <option value="percentage">{{__('taxido::static.vehicle_type_zones.percentage')}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6">
                                    <div class="form-group m-0" id="commission_rate_field">
                                        <label for="commission_rate" class="form-label">{{__('taxido::static.vehicle_type_zones.commission_rate')}}<span>
                                            *</span></label>
                                        <div class="input-group" id="commission_input_group">
                                            <span class="input-group-text"
                                                id="currencyIcon">{{ getDefaultCurrency()?->symbol ?? 'N/A' }}</span>
                                            <input type="number" class="form-control" id="commission_rate"
                                                name="commission_rate" step="0.01" required
                                                placeholder="Enter commission rate">
                                            <span class="input-group-text d-none" id="percentageIcon">%</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6">
                                    <div class="form-group m-0">
                                        <label for="charge_goes_to" class="form-label">{{ __('taxido::static.vehicle_type_zones.charge_goes_to') }}</label>
                                        <select class="form-select" id="charge_goes_to" name="charge_goes_to" required>
                                            <option value="admin">{{ __('taxido::static.vehicle_type_zones.admin') }}</option>
                                            <option value="driver">{{ __('taxido::static.vehicle_type_zones.driver') }}</option>
                                            <option value="fleet">{{ __('taxido::static.vehicle_type_zones.company') }}</option>
                                        </select>
                                        <span class="invalid-feedback d-none" id="charge_goes_to_error"></span>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6">
                                    <div class="form-group m-0">
                                        <label for="is_allow_tax" class="form-label">{{__('taxido::static.vehicle_type_zones.allow_tax')}}</label>
                                        <div class="editor-space">
                                            <label class="switch">
                                                <input type="hidden" name="is_allow_tax" value="0">
                                                <input class="form-check-input" id="is_allow_tax" type="checkbox"
                                                    name="is_allow_tax" value="1">
                                                <span class="switch-state"></span>
                                            </label>
                                        </div>
                                        <span class="invalid-feedback d-none" id="is_allow_tax_error"></span>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 d-none" id="tax_selection_field">
                                    <div class="form-group m-0">
                                        <label for="tax_id" class="form-label">{{__('taxido::static.vehicle_type_zones.tax')}}</label>
                                        <div class="flex-reverse">
                                            <select class="form-select select-2" id="tax_id" name="tax_id"
                                                data-placeholder="{{ __('taxido::static.vehicle_types.select_tax') }}">
                                                <option value="">{{__('taxido::static.vehicle_type_zones.select_tax')}}</option>
                                                @foreach ($taxes as $tax)
                                                    <option value="{{ $tax->id }}">{{ $tax->name }}</option>
                                                @endforeach
                                            </select>
                                            <span class="invalid-feedback d-none" id="tax_id_error"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6">
                                    <div class="form-group m-0">
                                        <label for="is_allow_airport_charge" class="form-label">{{ __('taxido::static.vehicle_type_zones.allow_airport_charge') }}</label>
                                        <div class="editor-space">
                                            <input type="hidden" name="is_allow_airport_charge" value="0">
                                            <input class="checkbox_animated" id="is_allow_airport_charge" type="checkbox"
                                                name="is_allow_airport_charge" value="1">
                                        </div>
                                        <span class="invalid-feedback d-none" id="is_allow_airport_charge_error"></span>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 d-none" id="airport_selection_field">
                                    <div class="form-group m-0">
                                        <label for="airport_id" class="form-label">{{ __('taxido::static.vehicle_type_zones.airport_charge_rate') }}</label>
                                        <div class="input-group" id="airport_charge_rate_div">
                                            <input type="number" class="form-control" id="airport_charge_rate"
                                                name="airport_charge_rate" step="0.01" required
                                                placeholder="Enter Airport Charge rate">
                                            <span class="input-group-text d-none" id="percentageIcon">%</span>
                                        </div>
                                        <span class="invalid-feedback d-none" id="airport_id_error"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="footer">
                                <button type="button" class="btn cancel" data-bs-dismiss="modal">{{ __('taxido::static.vehicle_type_zones.close') }}</button>
                                <button type="button" class="btn btn-solid" id="savePriceBtn">{{ __('taxido::static.vehicle_type_zones.save_prices') }}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal for Detailed Fare Calculation Instructions -->
    <div class="modal fade fare-calculation-modal" id="fareCalculationModal">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="fareCalculationModalLabel">
                        Fare Calculation Instructions
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal">
                        <i class="ri-close-line"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="swiper face-calculation-slider theme-pagination">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <h5 class="modal-title">Key Fields and Usage</h5>
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Field</th>
                                                <th>Description</th>
                                                <th>Where Used</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><code>base_fare_charge</code></td>
                                                <td>Initial fixed amount charged at the start of the ride (₹20)</td>
                                                <td>Apply to cab, freight, and parcel service</td>
                                            </tr>
                                            <tr>
                                                <td><code>base_distance</code></td>
                                                <td>Initial distance included in the base fare charge (2 km)</td>
                                                <td>Apply to cab, freight, and parcel service</td>
                                            </tr>
                                            <tr>
                                                <td><code>per_distance_charge</code></td>
                                                <td>Additional cost per kilometer beyond base distance (₹5/km)</td>
                                                <td>Apply to cancel service</td>
                                            </tr>
                                            <tr>
                                                <td><code>per_minute_charge</code></td>
                                                <td>Additional cost based on ride duration (₹0.5/min)</td>
                                                <td>Apply to cab and freight service</td>
                                            </tr>
                                            <tr>
                                                <td><code>waiting_charge</code></td>
                                                <td>Cost charged for each minute the driver waits (₹1), applicable after free waiting time</td>
                                                <td>Apply to cab and freight service</td>
                                            </tr>
                                            <tr>
                                                <td><code>free_waiting_time_before_start</code></td>
                                                <td>Initial waiting period before ride starts (2 minutes) with no charge</td>
                                                <td>Apply to cab and freight service</td>
                                            </tr>
                                            <tr>
                                                <td><code>free_waiting_time_after_start</code></td>
                                                <td>Additional waiting period after ride begins (not specified) with no charge</td>
                                                <td>Apply to cab and freight service</td>
                                            </tr>
                                            <tr>
                                                <td><code>cancellation_charge_rider</code></td>
                                                <td>Fee charged to rider for cancellation (₹10)</td>
                                                <td>Apply to cancel service</td>
                                            </tr>
                                            <tr>
                                                <td><code>cancellation_charge_driver</code></td>
                                                <td>Fee charged to driver for cancellation (₹15)</td>
                                                <td>Apply to cancel service</td>
                                            </tr>
                                            <tr>
                                                <td><code>commission_type</code></td>
                                                <td>Method of commission applied to ride fare (Fixed)</td>
                                                <td>Apply to all services</td>
                                            </tr>
                                            <tr>
                                                <td><code>commission_rate</code></td>
                                                <td>Fixed commission amount taken from ride fare ($10)</td>
                                                <td>Apply to all services</td>
                                            </tr>
                                            <tr>
                                                <td><code>charge_goes_to</code></td>
                                                <td>Recipient of the commission (Rider)</td>
                                                <td>Apply to all services</td>
                                            </tr>
                                            <tr>
                                                <td><code>allow_tax</code></td>
                                                <td>Toggle to include tax in fare calculation (enabled)</td>
                                                <td>Apply to all services</td>
                                            </tr>
                                            <tr>
                                                <td><code>tax</code></td>
                                                <td>Tax rate or amount to be applied if allowed (not specified)</td>
                                                <td>Apply to all services</td>
                                            </tr>
                                            <tr>
                                                <td><code>allow_airport_charge</code></td>
                                                <td>Toggle to include airport surcharge in fare (enabled)</td>
                                                <td>Apply to cab service</td>
                                            </tr>
                                            <tr>
                                                <td><code>airport_charge_rate</code></td>
                                                <td>Additional charge for rides involving an airport (₹2)</td>
                                                <td>Apply to cab service</td>
                                            </tr>
                                            <tr>
                                                <td><code>per_weight_charge</code></td>
                                                <td>Additional cost based on weight (not specified)</td>
                                                <td>Apply to freight and parcel service</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="slider-bottom-box">
                            <div class="swiper-button-prev">
                                <i class="ri-arrow-left-s-line"></i>
                            </div>
                            <div class="swiper-button-next">
                                <i class="ri-arrow-right-s-line"></i>
                            </div>
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@push('scripts')

    <!-- Swiper JS -->
    <script src="{{ asset('js/swiper-slider/swiper.js') }}"></script>
    <script src="{{ asset('js/swiper-slider/custom-slider.js') }}"></script>

    <script>
        $(document).ready(function() {
            const $priceModal = $('#priceModal');
            const $priceForm = $('#priceForm');
            const $successMessage = $('#success-message');
            const $errorMessage = $('#error-message');
            const $saveButton = $('#savePriceBtn');
            const $closeButton = $priceModal.find('.btn-close');
            const $taxSelectionField = $('#tax_selection_field');
            const $taxIdSelect = $('#tax_id');
            const $isAllowTax = $('#is_allow_tax');
            const $isAllowAirportCharge = $('#is_allow_airport_charge');
            const $airportSelectionField = $('#airport_selection_field');

            // Handle tax toggle
            $isAllowTax.on('change', function() {
                const isTaxEnabled = $(this).is(':checked');
                $taxSelectionField.toggleClass('d-none', !isTaxEnabled);
                if (isTaxEnabled) {
                    $taxIdSelect.attr('required', 'required');
                } else {
                    $taxIdSelect.removeAttr('required');
                }
            });

            // Handle airport charge toggle
            $isAllowAirportCharge.on('change', function() {
                const isAirportChargeEnabled = $(this).is(':checked');
                $airportSelectionField.toggleClass('d-none', !isAirportChargeEnabled);
                if (isAirportChargeEnabled) {
                    $('#airport_charge_rate').attr('required', 'required');
                } else {
                    $('#airport_charge_rate').removeAttr('required');
                }
            });

            // Initialize form validation
            $('#priceForm').validate({
                ignore: [],
                rules: {
                    "base_fare_charge": {
                        required: true,
                        min: 0
                    },
                    "base_distance": {
                        required: true,
                        min: 0
                    },
                    "per_distance_charge": {
                        required: true,
                        min: 0
                    },
                    "per_minute_charge": {
                        required: true,
                        min: 0
                    },
                    "per_weight_charge": {
                        min: 0
                    },
                    "waiting_charge": {
                        min: 0
                    },
                    "free_waiting_time_before_start_ride": {
                        min: 0
                    },
                    "free_waiting_time_after_start_ride": {
                        min: 0
                    },
                    "cancellation_charge_for_rider": {
                        min: 0
                    },
                    "cancellation_charge_for_driver": {
                        min: 0
                    },
                    "commission_type": "required",
                    "commission_rate": {
                        required: true,
                        number: true,
                        min: 0
                    },
                    "charge_goes_to": "required",
                    "tax_id": {
                        required: function() {
                            return $isAllowTax.is(':checked');
                        }
                    },
                    "airport_charge_rate": {
                        required: function() {
                            return $isAllowAirportCharge.is(':checked');
                        },
                        min: 0,
                        max: 3
                    }
                },
                messages: {
                    "tax_id": {
                        required: "Please select a tax"
                    },
                    "airport_charge_rate": {
                        required: "Please enter airport charge rate"
                    }
                },
                errorPlacement: function (error, element) {
                    if (element.parent('.input-group').length) {
                        error.insertAfter(element.parent());
                    } else {
                        error.insertAfter(element);
                    }
                }
            });

            // Handle commission type change
            $('#commission_type').on('change', function() {
                const commissionType = $(this).val();
                const $currencyIcon = $('#currencyIcon');
                const $percentageIcon = $('#percentageIcon');
                if (commissionType === 'percentage') {
                    $currencyIcon.addClass('d-none');
                    $percentageIcon.removeClass('d-none');
                } else {
                    $currencyIcon.removeClass('d-none');
                    $percentageIcon.addClass('d-none');
                }
            });

            // Handle Set Price button click
            $('.set-price-btn').on('click', function() {
                const $button = $(this);
                const $spinner = $button.find('.spinner-border');
                const zoneId = $button.data('zone-id');
                const zoneName = $button.data('zone-name');
                const distanceType = $button.data('distance-type');
                const vehicleTypeId = $button.data('vehicle-type-id');
                const currencySymbol = $button.data('currency-symbol');

                if (!vehicleTypeId) {
                    toastr.warning('Please save the vehicle type first to set zone prices.');
                    return;
                }

                $spinner.removeClass('d-none');
                $button.prop('disabled', true);
                let url = "{{ url('admin/vehicle-type-zones') }}";

                $.ajax({
                    url: url+`/${vehicleTypeId}/${zoneId}`,
                    method: 'GET',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                        'Accept': 'application/json'
                    },
                    success: function(data) {
                        $spinner.addClass('d-none');
                        $button.prop('disabled', false);
                        $('#zoneName').text(zoneName);
                        $('#zoneId').val(zoneId);
                        $('#vehicleTypeId').val(vehicleTypeId);
                        $('#distanceUnit').text(distanceType === 'mile' ? 'Mile' : 'Km');
                        $('#distanceUnitPrice').text(distanceType === 'mile' ? 'Mile' : 'Km');
                        $('.currency-symbol').text(currencySymbol);

                        $priceForm[0]?.reset();
                        $('.invalid-feedback').addClass('d-none');
                        if (data?.vehicleTypeZone) {
                            $('#priceId').val(data.vehicleTypeZone.id);
                            $('#base_fare_charge').val(data.vehicleTypeZone.base_fare_charge);
                            $('#base_distance').val(data.vehicleTypeZone.base_distance);
                            $('#per_distance_charge').val(data.vehicleTypeZone
                                .per_distance_charge);
                            $('#per_minute_charge').val(data.vehicleTypeZone.per_minute_charge);
                            $('#per_weight_charge').val(data.vehicleTypeZone
                                .per_weight_charge || '');
                            $('#waiting_charge').val(data.vehicleTypeZone.waiting_charge || '');
                            $('#free_waiting_time_before_start_ride').val(data.vehicleTypeZone
                                .free_waiting_time_before_start_ride || '');
                            $('#free_waiting_time_after_start_ride').val(data.vehicleTypeZone
                                .free_waiting_time_after_start_ride || '');
                            $('#is_allow_tax').prop('checked', data.vehicleTypeZone
                                .is_allow_tax);
                            $('#tax_id').val(data.vehicleTypeZone.tax_id || '').trigger('change');
                            $('#is_allow_airport_charge').prop('checked', data.vehicleTypeZone
                                .is_allow_airport_charge);
                            $('#airport_surge_fees').val(data.vehicleTypeZone
                                .airport_surge_fees || '');
                            $('#cancellation_charge_for_rider').val(data.vehicleTypeZone
                                .cancellation_charge_for_rider || '');
                            $('#cancellation_charge_for_driver').val(data.vehicleTypeZone
                                .cancellation_charge_for_driver || '');
                            $('#charge_goes_to').val(data.vehicleTypeZone.charge_goes_to);
                            $('#commission_type').val(data.vehicleTypeZone.commission_type);
                            $('#commission_rate').val(data.vehicleTypeZone.commission_rate);
                            $('#tax_id').val(data.vehicleTypeZone.tax_id || '').trigger('change');
                            $('#airport_charge_rate').val(data.vehicleTypeZone
                                .airport_charge_rate || '');

                            // Show/hide tax field based on checkbox
                            $taxSelectionField.toggleClass('d-none', !data.vehicleTypeZone.is_allow_tax);
                            if (data.vehicleTypeZone.is_allow_tax) {
                                $taxIdSelect.attr('required', 'required');
                            } else {
                                $taxIdSelect.removeAttr('required');
                            }

                            // Show/hide airport field based on checkbox
                            $airportSelectionField.toggleClass('d-none', !data.vehicleTypeZone.is_allow_airport_charge);
                            if (data.vehicleTypeZone.is_allow_airport_charge) {
                                $('#airport_charge_rate').attr('required', 'required');
                            } else {
                                $('#airport_charge_rate').removeAttr('required');
                            }

                            $('#commission_type').trigger('change');
                        } else {
                            $('#priceId').val('');
                            $('#is_allow_tax').prop('checked', false);
                            $('#is_allow_airport_charge').prop('checked', false);
                            $taxSelectionField.addClass('d-none');
                            $airportSelectionField.addClass('d-none');
                            $taxIdSelect.removeAttr('required');
                            $('#airport_charge_rate').removeAttr('required');
                            $('#commission_type').trigger('change');
                        }

                        $('#commission_rate_field').show();
                        $priceModal.modal('show');
                    },
                    error: function(xhr) {
                        $spinner.addClass('d-none');
                        $button.prop('disabled', false);
                        toastr.error(xhr.responseJSON?.message || 'Error fetching price data.');
                    }
                });
            });

            $saveButton.on('click', function() {
                $('.invalid-feedback').addClass('d-none');
                if (!$priceForm.valid()) {
                    return;
                }

                $saveButton.html('<span class="spinner-border spinner-border-sm spinner"></span> Saving...');
                $saveButton.prop('disabled', true);
                $closeButton.prop('disabled', true);

                const priceId = $('#priceId').val();
                const url = priceId ? "{{ url('/admin/vehicle-type-zones') }}/" + priceId : "{{ url('/admin/vehicle-type-zones') }}";
                const method = priceId ? 'PUT' : 'POST';

                $.ajax({
                    url: url,
                    method: method,
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                        'Accept': 'application/json'
                    },
                    data: $priceForm.serialize(),
                    dataType: 'json',
                    success: function(data) {
                        $saveButton.html('Save Prices');
                        $saveButton.prop('disabled', false);
                        $closeButton.prop('disabled', false);
                        if (data.success) {
                            toastr.success('Price saved successfully');
                            $priceModal.modal('hide');
                            location.reload();
                        } else {
                            showErrors(data.errors);
                        }
                    },
                    error: function(xhr) {
                        $saveButton.html('Save Prices');
                        $saveButton.prop('disabled', false);
                        $closeButton.prop('disabled', false);
                        if (xhr.status === 422) {
                            showErrors(xhr.responseJSON.errors);
                        } else {
                            toastr.error(xhr.responseJSON?.message || 'Error saving price data.');
                        }
                    }
                });
            });

            function showErrors(errors) {
                $.each(errors, function(field, messages) {
                    const $errorElement = $(`#${field}_error`);
                    if ($errorElement.length) {
                        $errorElement.text(messages[0]).removeClass('d-none');
                    }
                });
            }
        });
    </script>
@endpush
