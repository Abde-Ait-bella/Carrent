<?php

namespace App\Repositories;

use App\Models\Reservation;
use App\Repositories\Interfaces\ReservationRepositoryInterface;

class ReservationRepository implements ReservationRepositoryInterface
{
    public function getUserReservations($userId)
    {
        return Reservation::with(['car'])
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getAllWithRelations()
    {
        return Reservation::with(['user', 'car'])->latest()->get();
    }

    public function create(array $data)
    {
        return Reservation::create($data);
    }

    public function findById($id)
    {
        return Reservation::find($id);
    }

    public function update(Reservation $reservation, array $data)
    {
        $reservation->update($data);
        return $reservation;
    }

    public function delete(Reservation $reservation)
    {
        return $reservation->delete();
    }
}