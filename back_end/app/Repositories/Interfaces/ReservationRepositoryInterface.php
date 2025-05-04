<?php

namespace App\Repositories\Interfaces;

use App\Models\Reservation;

interface ReservationRepositoryInterface
{
    public function getUserReservations($userId);
    public function getAllWithRelations();
    public function create(array $data);
    public function findById($id);
    public function update(Reservation $reservation, array $data);
    public function delete(Reservation $reservation);
}