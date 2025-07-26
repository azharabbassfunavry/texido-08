<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Api Routes
|--------------------------------------------------------------------------
|
| Here is where you can register api routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "api" middleware group. Now create something great!
|
*/
Route::group(['middleware' => ['localization']], function () {

    // Home Screen
    Route::get('home-screen', 'HomeScreenController@index')->name('home.index');

    // Rider Authentication
    Route::post('rider/login', 'AuthController@login');
    Route::post('rider/forgot-password', 'AuthController@forgotPassword');
    Route::post('rider/verify-token', 'AuthController@verifyRiderToken');
    Route::post('rider/register', 'AuthController@riderRegister');
    Route::post('rider/update-password', 'AuthController@updatePassword');
    Route::post('rider/social/login', 'AuthController@socialLogin');
    Route::delete('rider/deleteAccount', 'AuthController@deleteAccount');
    Route::post('rider/firebase/auth', 'AuthController@verifyFirebaseAuthToken');

    // Driver Authentication
    Route::post('driver/login', 'DriverAuthController@login');
    Route::post('driver/verify-token', 'DriverAuthController@verifyDriverToken');
    Route::post('driver/register', 'DriverAuthController@driverRegister');
    Route::post('driver/forgot-password', 'DriverAuthController@forgotPassword');
    Route::post('driver/update-password', 'DriverAuthController@updatePassword');
    Route::delete('driver/deleteAccount', 'DriverAuthController@deleteAccount');
    Route::post('driver/firebase/auth', 'DriverAuthController@verifyFirebaseAuthToken');

    // Settings
    Route::get('taxido/settings', 'SettingController@index');

    // Services
    Route::apiResource('service', 'ServiceController', ['only' => ['index', 'show']]);

    // Service Categories
    Route::apiResource('serviceCategory', 'ServiceCategoryController', ['only' => ['index', 'show']]);

    // Driver Rules
    Route::apiResource('driverRule', 'DriverRuleController', ['only' => ['index', 'show']]);

    // Vehicle Types
    Route::apiResource('vehicleType', 'VehicleTypeController', ['only' => ['index', 'show']]);

    // Nearest Drivers
    Route::post('nearest-drivers', 'DriverController@getNearestDrivers')?->name('nearest.driver.index');

    // Documents
    Route::apiResource('document', 'DocumentController', ['only' => ['index', 'show']]);

    // Zones
    Route::apiResource('zone', 'ZoneController', ['only' => ['index', 'show']]);
    Route::get('zone-by-point', 'ZoneController@getZoneIds')->name('get.zoneId');

    // Banners
    Route::apiResource('banner', 'BannerController', ['only' => ['index', 'show']]);

    Route::group(['middleware' => ['auth:sanctum'], 'as' => 'api.'], function () {


        // Ride Invoice
        Route::get('ride/invoice/{invoice_id}', 'RideController@getInvoice')->name('ride.invoice');


        // Dashboard
        Route::get('dashboard', 'DashboardController@index')->name('dashboard.index');

        // Riders
        Route::get('rider/self', 'AuthController@self');

        // Drivers
        Route::get('driver/self', 'DriverAuthController@self');
        Route::post('update/payment-account', 'DriverAuthController@updatePaymentAccount');
        Route::post('update/vehicle', 'DriverAuthController@updateVehicle');
        Route::post('update/document', 'DriverAuthController@updateDocument');

        Route::apiResource('driver', 'DriverController', ['only' => ['index']]);
        Route::post('driver/zone-update', 'DriverController@driverZone')->name('driver.zone.update');
        Route::get('driver/ambulance', 'DriverController@getAmbulance')->name('ambulance.index');

        // Fleet
        Route::get('fleet/self', 'DriverAuthController@fleetSelf');

        // Vehicle Types
        Route::post('vehicleType/locations', 'VehicleTypeController@getVehicleTypeByLocations')->name('vehicle.location');

        // Hourly Packages
        Route::apiResource('hourlyPackage', 'HourlyPackageController', ['only' => ['index', 'show']]);

        // Extra Charges
        Route::apiResource('extraCharge', 'ExtraChargeController', ['only' => ['index', 'show']]);

        // Cancellation Reasons
        Route::apiResource('cancellationReason', 'CancellationReasonController', ['only' => ['index', 'show']]);

        // Notices
        Route::apiResource('notice', 'NoticeController', ['only' => ['index', 'show']]);

        // Coupons
        Route::apiResource('coupon', 'CouponController', ['only' => ['index', 'show']]);
        Route::apiResource('rental-vehicle', 'RentalVehicleController');
        Route::put('rental-vehicle/{id}/{status}', 'RentalVehicleController@status')->middleware('can:rental_vehicle.edit');

        // Zones
        Route::apiResource('zone', 'ZoneController', ['except' => ['show', 'index']]);

        // Ride Requests
        Route::apiResource('rideRequest', 'RideRequestController', ['except' => ['show']]);
        Route::post('accept-ride-request', 'RideRequestController@accept');
        Route::post('reject-ride-request', 'RideRequestController@reject');
        Route::post('rental/rideRequest', 'RideRequestController@rental');
        Route::post('ambulance/rideRequest', 'RideRequestController@ambulance');

        // Soses
        Route::apiResource('sos', 'SOSController', ['except' => ['show', 'edit', 'update']]);
        Route::get('sos/{sos}', 'SOSController@show')->name('sos.show');

        // SOS Alerts
        Route::apiResource('sos-alert', 'SOSAlertController', ['only' => ['index', 'update', 'store']]);

        // Plans
        Route::apiResource('plan', 'PlanController', ['only' => ['index', 'show']]);
        Route::post('plan-purchase', 'PlanController@purchase')->name('plan.purchase');

        // Rides
        Route::apiResource('ride', 'RideController');
        Route::post('ride/start-ride', 'RideController@startRide')->name('ride.start')->middleware('can:ride.edit');
        Route::post('ride/payment', 'RideController@payment')->name('ride.payment')->middleware('can:ride.create');
        Route::post('ride/verify-payment', 'RideController@verifyPayment')->name('ride.verify.payment');
        Route::post('ride/verify-coupon', 'RideController@verifyCoupon')->name('ride.verify.coupon')->middleware('can:ride.create');
        Route::post('ride/verify-otp', 'RideController@verifyOtp')->name('ride.verify-otp');
        Route::post('ride/ambulance/start-ride', 'RideController@ambulanceStartRide')->name('ride.ambulance.start')->middleware('can:ride.edit');
        Route::get('ride-location/{ride}', 'RideController@getRideLocation');

        // Bids
        Route::apiResource('bid', 'BidController');

        // Rider Wallets
        Route::get('riderWallet/history', 'RiderWalletController@index')->middleware('can:rider_wallet.index');
        Route::post('rider/top-up', 'RiderWalletController@topUp');

        // Driver Wallets
        Route::get('driverWallet/history', 'DriverWalletController@index')->middleware('can:driver_wallet.index');
        Route::post('driver/withdraw-request', 'DriverWalletController@withdrawRequest')->middleware('can:withdraw_request.create');
        Route::get('driverWallet/withdraw-request', 'DriverWalletController@getWithdrawRequest')->middleware('can:withdraw_request.index');
        Route::post('driver/top-up', 'DriverWalletController@topUp');

        // Rider Reviews
        Route::apiResource('riderReview', 'RiderReviewController');

        // Driver Reviews
        Route::apiResource('driverReview', 'DriverReviewController');

        // Payment Account
        Route::apiResource('paymentAccount', 'PaymentAccountController', ['only' => ['index', 'update', 'store']]);

        // Locations
        Route::apiResource('location', 'LocationController', ['except' => ['show']]);

    });
});
