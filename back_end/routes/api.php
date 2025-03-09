<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ReservationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::apiResource('/cars', CarController::class)->middleware('auth.api')   ;
Route::apiResource('/reservations', ReservationController::class)->middleware('auth.api');
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth.api');

// Route::get('/cars' , [CarController::class, 'index']);
// Route::post('/cars', [CarController::class, 'store']);
// Route::post('/cars', [CarController::class, 'store']);
// Route::put('/cars/{id}', [CarController::class, 'update']);