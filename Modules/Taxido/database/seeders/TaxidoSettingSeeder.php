<?php

namespace Modules\Taxido\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Taxido\Models\TaxidoSetting;

class TaxidoSettingSeeder extends Seeder
{
        /**
         * Run the database seeds.
         *
         * @return void
         */
        public function run()
        {
                $values = [
                        'general' => [
                                'footer_branding_hashtag' => '#GoTaxido',
                                'footer_branding_attribution' => '❤️ Made by Pixelstrap',
                                'greetings' => [
                                        'Hello',
                                        '<p>🌈 Let’s make today productive and successful! 🏆</p>',
                                ]
                        ],
                        'ride' => [
                                'ride_request_time_driver' => 30,
                                'rental_ambulance_request_time' => 30,
                                'increase_amount_range' => 10,
                                'weight_unit' => 'kg',
                                'find_driver_time_limit' => 3,
                                'schedule_ride_request_lead_time' => 15,
                                'driver_max_online_hours' => 12,
                                'bidding_request_time_limit' => 10,
                                'min_intracity_radius' => 30000,
                                'max_bidding_fare_driver' => 10,
                                'parcel_weight_limit' => 10,
                                'country_code' => 1,
                                'distance_unit' => 'km',
                                'schedule_min_hour_limit' => 3,
                        ],
                        'activation' => [
                                'coupon_enable' => true,
                                'driver_wallet' => true,
                                'rider_wallet' => true,
                                'fleet_wallet' => true,
                                'driver_verification' => true,
                                'online_payments' => true,
                                'cash_payments' => true,
                                'ride_otp' => true,
                                'parcel_otp' => true,
                                'driver_tips' => true,
                                'referral_enable' => true,
                                'bidding' => true,
                                'force_update' => true,
                                'airport_price_enable' => true,
                                'surge_price_enable' => true,
                                'additional_minute_charge' => true,
                                'additional_distance_charge' => true,
                                'additional_weight_charge' => true,
                                'sos_enable' => true
                        ],
                        'wallet' => [
                                'wallet_denominations' => 50,
                                'tip_denominations' => 50,
                                'driver_min_wallet_balance' => 10
                        ],
                        'driver_commission' => [
                                'min_withdraw_amount' => 500,
                                'status' => false,
                                'fleet_commission_type' => 'percentage',
                                'fleet_commission_rate' => 10,
                                'ambulance_per_km_charge' => 1,
                                'ambulance_commission_type' => 'percentage',
                                'ambulance_commission_rate' => 20,
                                'ambulance_per_minute_rate' => 10,
                        ],
                        'referral' => [
                                'referral_amount' => '50',
                                'first_ride_discount' => '30',
                                'validity' => '3',
                                'interval' => 'month',
                        ],
                        'location' => [
                                'google_map_api_key' => '',
                                'map_provider' => 'google_map',
                                'radius_meter' => '3000',
                                'radius_per_second' => '10',
                        ],
                        'setting' => [
                               'driver_app_version' => env('APP_VERSION'),
                               'app_version' => env('APP_VERSION'),
                               'splash_screen_id' => getAttachmentId('splash.png'),
                               'splash_driver_screen_id' => getAttachmentId('splash_driver.png'),
                        ],
                ];

                TaxidoSetting::updateOrCreate(['taxido_values' => $values]);
        }
}
