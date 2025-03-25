<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ChangePasswordController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\SendPasswordResetController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::apiResource('/cars', controller: CarController::class)->middleware('auth.api');
Route::post('/cars/{car}', [CarController::class, 'update'])->middleware('auth.api');

Route::apiResource('/reservations', ReservationController::class)->middleware('auth.api');
Route::post('/signup', [AuthController::class, 'signup'])->name('signup');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', action: [AuthController::class, 'logout'])->name('logout')->middleware('auth.api');
Route::post('/sendPasswordResetLink', [SendPasswordResetController::class, 'sendEmail'])->name('logout');
Route::post('/resetPassword', [ChangePasswordController::class, 'passwordResetProcess'])->name('changePassword');


Route::get('/user', [UserController::class, 'index']);
