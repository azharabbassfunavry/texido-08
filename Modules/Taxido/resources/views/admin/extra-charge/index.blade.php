@extends('admin.layouts.master')
@section('title', __('taxido::static.extra_charges.extra_charges'))
@section('content')
<div class="contentbox">
    <div class="inside">
        <div class="contentbox-title">
            <div class="contentbox-subtitle">
                <h3>{{ __('taxido::static.extra_charges.extra_charges') }}</h3>
                @can('extra_charge.create')
                <button class="add-spinner btn btn-outline" data-url="{{ route('admin.extra-charge.create') }}">
                    <i class="ri-add-line"></i> {{ __('taxido::static.extra_charges.add_new') }}
                </button>
                @endcan
            </div>
        </div>
        <div class="extraCharge-table">
            <x-table
                :columns="$tableConfig['columns']"
                :data="$tableConfig['data']"
                :filters="$tableConfig['filters']"
                :actions="$tableConfig['actions']"
                :total="$tableConfig['total']"
                :bulkactions="$tableConfig['bulkactions']"
                :search="true">
            </x-table>
        </div>
    </div>
</div>
@endsection