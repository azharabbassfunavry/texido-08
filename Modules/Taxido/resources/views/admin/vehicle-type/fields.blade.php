<!-- Link Swiper's CSS -->
<link rel="stylesheet" type="text/css" href="{{ asset('css/vendors/swiper-slider.css') }}">

@use('App\Models\Tax')
@use('Modules\Taxido\Models\Zone')
@use('Modules\Taxido\Models\Service')
@use('Modules\Taxido\Models\ServiceCategory')
@php
    $zones = Zone::where('status', true)?->get();
    $taxes = Tax::where('status', true)?->get(['id', 'name']);
    $services = Service::whereNot('type', 'ambulance')?->where('status', true)?->get(['id', 'name']);
    $serviceCategories = ServiceCategory::whereNull('deleted_at')?->where('status', true)->get();
    $serviceCategories = ServiceCategory::whereNull('deleted_at')?->where('status', true)->get();
@endphp
<div class="row g-xl-4 g-3">
    <div class="col-xl-8">
        <div class="left-part">
            <div class="contentbox">
                <div class="inside">
                    <div class="contentbox-title">
                        <h3>{{ isset($vehicleType) ? __('taxido::static.vehicle_types.edit') : __('taxido::static.vehicle_types.add') }}
                            ({{ request('locale', app()->getLocale()) }})
                        </h3>
                    </div>
                    @isset($vehicleType)
                        <div class="form-group row">
                            <label class="col-md-2" for="name">{{ __('taxido::static.language.languages') }}</label>
                            <div class="col-md-10">
                                <ul class="language-list">
                                    @forelse (getLanguages() as $lang)
                                        <li>
                                            <a href="{{ route(getVehicleEditRoute(), ['vehicleType' => $vehicleType->id, 'locale' => $lang->locale]) }}"
                                                class="language-switcher {{ request('locale') === $lang->locale ? 'active' : '' }}"
                                                target="_blank">
                                                <img src="{{ @$lang?->flag ?? asset('admin/images/No-image-found.jpg') }}"
                                                    alt="">
                                                {{ @$lang?->name }} ({{ @$lang?->locale }})
                                                <i class="ri-arrow-right-up-line"></i>
                                            </a>
                                        </li>
                                    @empty
                                        <li>
                                            <a href="{{ route(getVehicleEditRoute(), ['vehicle_type' => $vehicleType->id, 'locale' => Session::get('locale', 'en')]) }}"
                                                class="language-switcher active" target="blank">
                                                <img src="{{ asset('admin/images/flags/LR.png') }}" alt="">
                                                English
                                                <i class="ri-arrow-right-up-line"></i>
                                            </a>
                                        </li>
                                    @endforelse
                                </ul>
                            </div>
                        </div>
                    @endisset
                    <input type="hidden" name="locale" value="{{ request('locale') }}">
                    <div class="form-group row">
                        <label class="col-md-2"
                            for="vehicle_image_id">{{ __('taxido::static.vehicle_types.image') }}<span>
                                *</span></label>
                        <div class="col-md-10">
                            <div class="form-group">
                                <x-image :name="'vehicle_image_id'" :data="isset($vehicleType->vehicle_image)
                                    ? $vehicleType?->vehicle_image
                                    : old('vehicle_image_id')" :text="''"
                                    :multiple="false"></x-image>
                                @error('vehicle_image_id')
                                    <span class="invalid-feedback d-block" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="row g-4">
                        <div class="col-12">
                            <div class="form-group row">
                                <label class="col-md-2"
                                    for="vehicle_image_id">{{ __('taxido::static.vehicle_types.map_icon') }}<span>*</span></label>
                                <div class="col-md-10">
                                    <div class="form-group">
                                        <x-image :name="'vehicle_map_icon_id'" :data="isset($vehicleType->vehicle_map_icon)
                                            ? $vehicleType?->vehicle_map_icon
                                            : old('vehicle_map_icon_id')" :text="''"
                                            :multiple="false"></x-image>
                                        @error('vehicle_map_icon_id')
                                            <span class="invalid-feedback d-block" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                        @enderror
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group row">
                                <label class="col-md-2" for="name">{{ __('taxido::static.vehicle_types.name') }}
                                    <span> *</span></label>
                                <div class="col-md-10">
                                    <div class="position-relative">
                                        <input class="form-control" type="text" id="name" name="name"
                                            value="{{ isset($vehicleType->name) ? $vehicleType->getTranslation('name', request('locale', app()->getLocale())) : old('name') }}"
                                            placeholder="{{ __('taxido::static.vehicle_types.enter_name') }} ({{ request('locale', app()->getLocale()) }})"><i
                                            class="ri-file-copy-line copy-icon" data-target="#name"></i>
                                    </div>
                                    @error('name')
                                        <span class="invalid-feedback d-block" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group row">
                                <label class="col-md-2"
                                    for="max_seat">{{ __('taxido::static.vehicle_types.max_seat') }}
                                    <span>*</span></label>
                                <div class="col-md-10">
                                    <input class="form-control" type="number" min="1" name="max_seat"
                                        id="max_seat"
                                        placeholder="{{ __('taxido::static.vehicle_types.enter_max_seat') }}"
                                        value="{{ old('max_seat', $vehicleType->max_seat ?? '') }}">
                                    @error('max_seat')
                                        <span class="invalid-feedback d-block"><strong>{{ $message }}</strong></span>
                                    @enderror
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-4">
        <div class="p-sticky">
            <div class="contentbox">
                <div class="inside">
                    <div class="contentbox-title">
                        <h3>{{ __('taxido::static.vehicle_types.publish') }}</h3>
                    </div>
                    <div class="form-group row">
                        <div class="col-12">
                            <div class="row g-3">
                                <div class="col-12">
                                    <div class="d-flex align-items-center gap-2 icon-position">
                                        <button type="submit" name="save" class="btn btn-primary">
                                            <i class="ri-save-line text-white lh-1"></i> {{ __('static.save') }}
                                        </button>
                                        <button type="submit" name="save_and_exit"
                                            class="btn btn-primary spinner-btn">
                                            <i
                                                class="ri-expand-left-line text-white lh-1"></i>{{ __('static.save_and_exit') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contentbox">
                <div class="inside">
                    <div class="contentbox-title">
                        <h3>{{ __('static.additional_info') }}</h3>
                    </div>
                    <div class="row g-3">
                        <div class="col-xl-12">
                            <div class="form-group row">
                                <label class="col-md-2"
                                    for="all_zones">{{ __('taxido::static.vehicle_types.all_zones') }}</label>
                                <div class="col-md-10">
                                    <label class="switch">
                                        <input class="form-control" type="hidden" name="is_all_zones" value="0">
                                        <input class="form-check-input" type="checkbox" id="is_all_zones" name="is_all_zones" value="1" @checked(old('is_all_zones', $vehicleType->is_all_zones ?? true))>
                                        <span class="switch-state"></span>
                                    </label>
                                    @error('is_all_zones')
                                        <span class="invalid-feedback d-block" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row" id="zones-field" style="display: none;">
                                <label class="col-md-2"
                                    for="zones">{{ __('taxido::static.vehicle_types.zones') }}<span>
                                        *</span></label>
                                <div class="col-md-10 select-label-error">
                                    <span class="text-gray mt-1">
                                        {{ __('taxido::static.vehicle_types.no_zones_message') }}
                                        <a href="{{ @route('admin.zone.index') }}" class="text-primary">
                                            <b>{{ __('taxido::static.here') }}</b>
                                        </a>
                                    </span>
                                    <select class="form-control select-2 zone" name="zones[]" data-placeholder="{{ __('taxido::static.vehicle_types.select_zones') }}" multiple>
                                        @foreach ($zones as $index => $zone)
                                            <option value="{{ $zone->id }}"
                                                @if (@$vehicleType?->zones) @if (in_array($zone->id, $vehicleType->zones->pluck('id')->toArray()))
                                            selected @endif
                                            @elseif (old('zones.' . $index) == $zone->id) selected @endif>
                                                {{ $zone->name }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('zones')
                                        <span class="invalid-feedback d-block" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-2"
                                    for="services">{{ __('taxido::static.vehicle_types.services') }}<span>
                                        *</span></label>
                                <div class="col-md-10 select-label-error">
                                    <select class="form-control select-2" id="service_id" name="service_id" data-placeholder="{{ __('taxido::static.vehicle_types.select_services') }}">
                                        <option class="option" value="" selected></option>
                                        @foreach ($services as $index => $service)
                                            <option value="{{ $service->id }}"
                                                @if (@$vehicleType) @if ($service->id == $vehicleType->service_id) selected @endif
                                            @elseif (old('services') == $service->id) selected @endif>
                                                {{ $service->name }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('services')
                                        <span class="invalid-feedback d-block" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-2"
                                    for="serviceCategories">{{ __('taxido::static.vehicle_types.service_categories') }}<span>
                                        *</span></label>
                                <div class="col-md-10 select-label-error">
                                    @isset($vehicleType)
                                        @if ($vehicleType?->service_id)
                                            @php
                                                $serviceCategories = $serviceCategories?->where(
                                                    'service_id',
                                                    $vehicleType?->service_id,
                                                );
                                            @endphp
                                        @endif
                                    @endisset
                                    <select class="form-control select-2" id="service_category_id"
                                        name="serviceCategories[]"
                                        data-placeholder="{{ __('taxido::static.vehicle_types.select_service_categories') }}"
                                        multiple>
                                        @foreach ($serviceCategories as $index => $serviceCategory)
                                            <option value="{{ $serviceCategory?->id }}"
                                                @if (@$vehicleType?->service_categories) @if (in_array($serviceCategory?->id, $vehicleType?->service_categories->pluck('id')->toArray()))
                                            selected @endif
                                            @elseif (old('serviceCategories.' . $index) == $serviceCategory->id) selected @endif>
                                                {{ $serviceCategory->name }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('serviceCategories')
                                        <span class="invalid-feedback d-block" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-12" for="status">{{ __('taxido::static.vehicle_types.status') }}
                                </label>
                                <div class="col-12">
                                    <div class="switch-field form-control">
                                        <input value="1" type="radio" name="status" id="status_active"
                                            @checked(boolval(@$vehicleTypes?->status ?? true) == true) />
                                        <label for="status_active">{{ __('static.active') }}</label>
                                        <input value="0" type="radio" name="status" id="status_deactive"
                                            @checked(boolval(@$vehicleTypes?->status ?? true) == false) />
                                        <label for="status_deactive">{{ __('static.deactive') }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@push('scripts')
    <script>
        $(document).ready(function() {
            $('#service_id').on('change', function() {
                $('#service_category_id').empty();
                $('#service_category_id').attr('disabled', 'disabled');
                var serviceId = $(this).val();
                if (serviceId) {
                    loadServiceCategories(serviceId);
                } else {
                    $('#service_category_id').empty();
                }
            });

            function loadServiceCategories(serviceId) {
                let url = "{{ route('serviceCategory.index') }}";
                $.ajax({
                    url: url + '?service_id=' + serviceId,
                    type: "GET",
                    success: function(data) {
                        $('#service_category_id').empty();
                        $('#service_category_id').append('<option value=""></option>');
                        $.each(data.data, function(index, item) {
                            var option = new Option(item.name, item.id);
                            $('#service_category_id').append(option);
                        });
                        $('#service_category_id').removeAttr('disabled');
                    },
                    error: function(xhr, status, error) {
                        console.log("Error status: " + status);
                        console.log("Error response: " + xhr.responseText);
                        console.log("Error code: " + error);
                        $('#service_category_id').empty();
                    },
                });
            }

            // Define global jQuery function
            window.selectCommissionTypeField = function(type) {
                if (type === 'fixed') {
                    $('#currencyIcon').show();
                    $('#percentageIcon').hide();
                } else if (type === 'percentage') {
                    $('#currencyIcon').hide();
                    $('#percentageIcon').show();
                }
                $('#commission_rate_field').show();
            };

            // Attach event listener for commission type change
            $('#commission_type').on('change', function() {
                const selectedType = $(this).val();
                if (selectedType) {
                    window.selectCommissionTypeField(selectedType);
                } else {
                    $('#commission_rate_field').hide();
                }
            });

            $('#is_all_zones').on('change', function() {
                if ($(this).is(':checked')) {
                    $('#zones-field').hide();
                } else {
                    $('#zones-field').show();
                }
            });

            if (!$('#is_all_zones').is(':checked')) {
                $('#zones-field').show();
            }

            $('#vehicleTypeForm').validate({
                ignore: [],
                rules: {
                    "name": "required",
                    "service_id": "required",
                    "serviceCategories[]": "required",
                    "max_seat": {
                        required: true,
                        number: true,
                        min: 1,
                        max: 10
                    },
                    "status": "required",
                }
            });
        })
    </script>
@endpush
