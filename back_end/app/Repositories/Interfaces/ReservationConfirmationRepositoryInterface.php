<?php

namespace App\Repositories\Interfaces;

use App\Models\reservation_confirmation;

interface ReservationConfirmationRepositoryInterface
{
    public function getAll();
    public function getAllWithRelations(array $relations = []);
    public function findByReservationId($reservationId);
    public function create(array $data);
    public function update(reservation_confirmation $confirmation, array $data);
    public function delete(reservation_confirmation $confirmation);
}