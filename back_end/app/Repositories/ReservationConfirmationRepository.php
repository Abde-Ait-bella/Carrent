<?php

namespace App\Repositories;

use App\Models\reservation_confirmation;
use App\Repositories\Interfaces\ReservationConfirmationRepositoryInterface;

class ReservationConfirmationRepository implements ReservationConfirmationRepositoryInterface
{
    public function getAll()
    {
        return reservation_confirmation::all();
    }
    
    public function getAllWithRelations(array $relations = [])
    {
        return reservation_confirmation::with($relations)->get();
    }
    
    public function findByReservationId($reservationId)
    {
        return reservation_confirmation::where('reservation_id', $reservationId)->first();
    }
    
    public function create(array $data)
    {
        return reservation_confirmation::create($data);
    }
    
    public function update(reservation_confirmation $confirmation, array $data)
    {
        $confirmation->update($data);
        return $confirmation;
    }
    
    public function delete(reservation_confirmation $confirmation)
    {
        return $confirmation->delete();
    }
}