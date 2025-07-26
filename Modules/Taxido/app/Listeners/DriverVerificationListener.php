<?php

namespace Modules\Taxido\Listeners;

use Exception;
use App\Models\User;
use Modules\Taxido\Events\CreateBidEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Modules\Taxido\Events\DriverVerificationEvent;
use Modules\Taxido\Notifications\CreateBidNotification;
use Modules\Taxido\Notifications\DriverVerifiedNotification;

class DriverVerificationListener implements ShouldQueue
{
    /**
     * Handle the event.
     *
     * @param DriverVerificationEvent $event
     */
    public function handle(DriverVerificationEvent $event): void
    {
        try {

            $driver = $event->driver;
            if ($driver) {
                $driver->notify(new DriverVerifiedNotification($driver, $event->status));
            }

        } catch (Exception $e) {

            //
        }
    }
}
