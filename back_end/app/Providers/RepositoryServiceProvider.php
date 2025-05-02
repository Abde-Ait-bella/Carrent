<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\CarRepositoryInterface;
use App\Repositories\CarRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(CarRepositoryInterface::class, CarRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}