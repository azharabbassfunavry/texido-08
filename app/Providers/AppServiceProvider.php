<?php

namespace App\Providers;

use App\Facades\WMenu;
use App\Models\Plugin;
use App\Services\WidgetManager;
use App\Observers\PluginObserver;
use App\Services\BadgeResolver;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\Facades\Translatable;
use Illuminate\Http\Resources\Json\JsonResource;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register()
    {
        $this->app->bind('Menu', function () {
            return new WMenu();
        });

        $this->app->singleton(WidgetManager::class, function () {
            return new WidgetManager();
        });

        $this->app->singleton(BadgeResolver::class, function () {
            return new BadgeResolver();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Paginator::useBootstrap();
        Plugin::observe(PluginObserver::class);
        Translatable::fallback(fallbackAny: true,);
        JsonResource::withoutWrapping();
        Model::automaticallyEagerLoadRelationships();
    }
}
