<?php

namespace Modules\Taxido\Listeners;

use Exception;
use App\Models\User;
use App\Enums\RoleEnum;
use App\Models\SmsTemplate;
use App\Models\PushNotificationTemplate;
use Illuminate\Contracts\Queue\ShouldQueue;
use Modules\Taxido\Events\CreateFleetWithdrawRequestEvent;
use Modules\Taxido\Notifications\CreateFleetWithdrawRequestNotification;

class CreateFleetWithdrawRequestListener implements ShouldQueue
{
    /**
     * Handle the event.
     */
    public function handle(CreateFleetWithdrawRequestEvent $event)
    {
        try {
            $admin = User::role(RoleEnum::ADMIN)->first();
            if (isset($admin)) {
                $admin->notify(new CreateFleetWithdrawRequestNotification($event->fleetWithdrawRequest));
                $sendTo = ('+'.$admin?->country_code.$admin?->phone);
                sendSMS($sendTo, $this->getSMSMessage($event));
                $message = "A New Fleet Withdraw Request Has Been Created";
                $this->sendPushNotification($admin->fcm_token, $message, $event);
            }
        } catch (Exception $e) {
            // Log the exception if needed
        }
    }

    public function getSMSMessage($event)
    {
        $locale = request()->hasHeader('Accept-Lang') ? request()->header('Accept-Lang') : app()->getLocale();
        $slug = 'create-fleet-withdraw-request-admin';
        $content = SmsTemplate::where('slug', $slug)->first();
        $fleetManager = User::where('id', $event->fleetWithdrawRequest->fleet_manager_id)->first();

        if ($content) {
            $data = [
                '{{fleet_manager_name}}' => $fleetManager?->name,
                '{{amount}}' => $event->fleetWithdrawRequest?->amount,
            ];
            $message = str_replace(array_keys($data), array_values($data), $content?->content[$locale]);
        } else {
            $message = "A new Fleet Withdraw Request has been created.";
        }

        return $message;
    }

    public function sendPushNotification($token, $message, $event)
    {
        if ($token) {
            $locale = request()->hasHeader('Accept-Lang') ? request()->header('Accept-Lang') : app()->getLocale();
            $slug = 'create-fleet-withdraw-request-admin';
            $fleetManager = User::where('id', $event->fleetWithdrawRequest->fleet_manager_id)->first();
            $content = PushNotificationTemplate::where('slug', $slug)->first();

            if ($content) {
                $data = [
                    '{{fleet_manager_name}}' => $fleetManager?->name,
                    '{{amount}}' => $event->fleetWithdrawRequest?->amount,
                ];
                $title = str_replace(array_keys($data), array_values($data), $content->title[$locale]);
                $body = str_replace(array_keys($data), array_values($data), $content->content[$locale]);
            } else {
                $title = "New Fleet Withdraw Request Created";
                $body = $message;
            }

            $notification = [
                'message' => [
                    'token' => $token,
                    'notification' => [
                        'title' => $title,
                        'body' => $body,
                        'image' => '',
                    ],
                    'data' => [
                        'click_action' => 'FLUTTER_NOTIFICATION_CLICK',
                        'type' => 'fleet_withdraw_request',
                    ],
                ],
            ];

            pushNotification($notification);
        }
    }
}