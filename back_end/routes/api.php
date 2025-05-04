<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ChangePasswordController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReservationConfirmationController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\SendPasswordResetController;
use App\Http\Controllers\UserController;
use App\Models\reservation_confirmation;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CityController;


Route::apiResource('/cars', controller: CarController::class)->middleware('auth.api');
Route::get('/cars', [CarController::class, 'index']);
Route::get('/cars/{car}', [CarController::class, 'show']);
Route::post('/cars/{car}', [CarController::class, 'update'])->middleware('auth.api');


Route::apiResource('/payments', PaymentController::class)->middleware('auth.api');

Route::post('/signup', [AuthController::class, 'signup'])->name('signup');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', action: [AuthController::class, 'logout'])->name('logout')->middleware('auth.api');
Route::post('/sendPasswordResetLink', [SendPasswordResetController::class, 'sendEmail'])->name('logout');
Route::post('/resetPassword', [ChangePasswordController::class, 'passwordResetProcess'])->name('changePassword');

Route::get('/user', [UserController::class, 'index'])->middleware('auth.api');
Route::get('/cities', [CityController::class, 'index'])->middleware('auth.api');

Route::post('addContract', [ReservationConfirmationController::class, 'store'])->middleware('auth.api');
Route::post('uploadContract', [ReservationConfirmationController::class, 'uploadContractPdf'])->middleware('auth.api');

// Nouvel endpoint pour récupérer toutes les confirmations de réservation
Route::get('/reservation-confirmations', [ReservationConfirmationController::class, 'getAll'])->middleware('auth.api');

// Ajouter cette route avec les autres routes protégées
Route::middleware('auth:api')->group(function () {
    
    Route::put('/reservations/{reservation}', [ReservationController::class, "upadatetState"]);
    Route::apiResource('/reservations', ReservationController::class);
    Route::get('/user-reservations', [ReservationController::class, 'getUserReservations']);
    
});
Route::post('/reservations', [ReservationController::class, 'Store']);