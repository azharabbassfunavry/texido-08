<?php

namespace Modules\Taxido\Listeners;

use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Modules\Taxido\Events\SOSAlertEvent;
use Modules\Taxido\Notifications\SOSAlertNotification;

class SOSAlertListener implements ShouldQueue
{
    public function handle(SOSAlertEvent $event): void
    {
        $user = User::find($event->ride->user_id);
        if ($user) {
            $user->notify(new SOSAlertNotification($event->ride, $event->sos));
        }

        $admins = User::whereHas('roles', fn($q) => $q->where('name', 'admin'))->get();
        foreach ($admins as $admin) {
            $admin->notify(new SOSAlertNotification($event->ride, $event->sos));
        }

        
    }
}
