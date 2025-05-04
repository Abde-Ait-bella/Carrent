<?php

namespace App\Services\Interfaces;

use App\Models\Reservation;
use Illuminate\Http\Request;

interface ReservationServiceInterface
{
    public function getUserReservations();
    public function getAllReservations();
    public function storeReservation($request);
    public function showReservation(Reservation $reservation);
    public function updateReservation(Request $request, Reservation $reservation);
    public function deleteReservation(Reservation $reservation);
    public function calculateTotalPrice($rentalStart, $rentalEnd, $dailyRate);
}