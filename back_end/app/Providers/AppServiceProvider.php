<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Interfaces\CarRepositoryInterface;
use App\Repositories\CarRepository;
use App\Repositories\Interfaces\ReservationRepositoryInterface;
use App\Repositories\ReservationRepository;
use App\Repositories\Interfaces\ReservationConfirmationRepositoryInterface;
use App\Repositories\ReservationConfirmationRepository;
use App\Services\Interfaces\ReservationServiceInterface;
use App\Services\ReservationService;
use App\Services\Interfaces\ReservationConfirmationServiceInterface;
use App\Services\ReservationConfirmationService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(CarRepositoryInterface::class, CarRepository::class);
        
        // Reservation bindings
        $this->app->bind(ReservationRepositoryInterface::class, ReservationRepository::class);
        $this->app->bind(ReservationServiceInterface::class, ReservationService::class);
        
        // Reservation Confirmation bindings
        $this->app->bind(ReservationConfirmationRepositoryInterface::class, ReservationConfirmationRepository::class);
        $this->app->bind(ReservationConfirmationServiceInterface::class, ReservationConfirmationService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
