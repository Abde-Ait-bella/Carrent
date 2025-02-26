<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\ReservationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/cars', CarController::class);
Route::apiResource('/reservations', ReservationController::class);
// Route::get('/cars' , [CarController::class, 'index']);
// Route::post('/cars', [CarController::class, 'store']);
// Route::post('/cars', [CarController::class, 'store']);
// Route::put('/cars/{id}', [CarController::class, 'update']);