<?php

namespace Modules\Taxido\Listeners;

use Exception;
use App\Models\SmsTemplate;
use App\Models\PushNotificationTemplate;
use Illuminate\Contracts\Queue\ShouldQueue;
use Modules\Taxido\Events\NotifyDriverDocStatusEvent;
use Modules\Taxido\Notifications\NotifyDriverDocStatusNotification;

class NotifyDriverDocStatusListener implements ShouldQueue
{
    /**
     * Handle the event.
     */
    public function handle(NotifyDriverDocStatusEvent $event): void
    {
        try {
            $driver = $event->driver;
            $document = $event->document;

            $driver->notify(new NotifyDriverDocStatusNotification($document));

            $sendTo = ('+' . $driver->country_code . $driver->phone);
            sendSMS($sendTo, $this->getSMSMessage($driver, $document));

            // Send Push
            $message = "Your document '{$document->name}' status has been updated to {$document->status}";
            $this->sendPushNotification($driver->fcm_token, $message, $driver, $document);

        } catch (Exception $e) {
           //
        }
    }

    public function getSMSMessage($driver, $document)
    {
        $locale = request()->hasHeader('Accept-Lang') ? request()->header('Accept-Lang') : app()->getLocale();
        $slug = 'driver-document-status-update';
        $content = SmsTemplate::where('slug', $slug)->first();

        if ($content) {
            $data = [
                '{{driver_name}}' => $driver->name,
                '{{document_name}}' => $document->name,
                '{{status}}' => ucfirst($document->status),
                '{{Your Company Name}}' => config('app.name')
            ];
            return str_replace(array_keys($data), array_values($data), $content->content[$locale]);
        }

        return "Your document '{$document->name}' status has been updated.";
    }

    public function sendPushNotification($token, $message, $driver, $document)
    {
        if ($token) {
            $locale = request()->hasHeader('Accept-Lang') ? request()->header('Accept-Lang') : app()->getLocale();
            $slug = 'driver-document-status-update';
            $content = PushNotificationTemplate::where('slug', $slug)->first();

            $data = [
                '{{driver_name}}' => $driver->name,
                '{{document_name}}' => $document->name,
                '{{status}}' => ucfirst($document->status),
                '{{Your Company Name}}' => config('app.name')
            ];

            $title = $content ? str_replace(array_keys($data), array_values($data), $content->title[$locale]) : 'Document Status Updated';
            $body = $content ? str_replace(array_keys($data), array_values($data), $content->content[$locale]) : $message;

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
                        'type' => 'driver_document_status',
                    ],
                ],
            ];

            pushNotification($notification);
        }
    }
}
