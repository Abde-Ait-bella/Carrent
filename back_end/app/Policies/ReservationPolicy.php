<?php

namespace App\Policies;

use App\Models\Reservation;
use App\Models\User;
use Illuminate\Auth\Access\HandlerResponse;
use Illuminate\Auth\Access\Response;

class ReservationPolicy
{
    /**
     * Determine whether the user can view their own reservations.
     */
    public function viewOwn(User $user): Response
    {
        return $user->user_role === 'user' 
            ? Response::allow()
            : Response::deny('You must be a regular user to view your reservations.');
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        return $user->user_role === 'admin'
            ? Response::allow()
            : Response::deny('You do not have permission to view all reservations.');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Reservation $reservation): Response
    {
        return ($user->id === $reservation->user_id || $user->role === 'admin')
            ? Response::allow()
            : Response::deny('You do not have permission to view this reservation.');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return $user->role === 'user'
            ? Response::allow()
            : Response::deny('Only regular users can create reservations.');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Reservation $reservation): Response
    {
        return ($user->role === 'admin' || ($user->id === $reservation->user_id && $reservation->state === 'pending'))
            ? Response::allow()
            : Response::deny('You do not have permission to update this reservation.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Reservation $reservation): Response
    {
        return ($user->role === 'admin' || ($user->id === $reservation->user_id && $reservation->state === 'pending'))
            ? Response::allow()
            : Response::deny('You do not have permission to delete this reservation.');
    }
}
