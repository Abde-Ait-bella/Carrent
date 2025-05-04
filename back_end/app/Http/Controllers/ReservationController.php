<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationRequest;
use App\Models\Reservation;
use App\Services\Interfaces\ReservationServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    protected $reservationService;

    public function __construct(ReservationServiceInterface $reservationService)
    {
        $this->reservationService = $reservationService;
    }

    /**
     * Get reservations for the current authenticated user
     */
    public function getUserReservations()
    {
        $this->authorize('viewOwn', Reservation::class);
        $reservations = $this->reservationService->getUserReservations();
        return response()->json($reservations);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Reservation::class);
        $reservations = $this->reservationService->getAllReservations();
        return response()->json($reservations);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReservationRequest $request)
    {
        $result = $this->reservationService->storeReservation($request);
        
        if (isset($result['code']) && $result['code'] === 403) {
            return response()->json([
                'status' => $result['status'],
                'message' => $result['message']
            ], 403);
        }
        
        return response()->json([
            'reservation' => $result['reservation'],
            'status' => $result['status'],
            'user' => $result['user'],
            'authorisation' => $result['authorisation']
        ], 201);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        $this->authorize('view', $reservation);
        $reservation = $this->reservationService->showReservation($reservation);
        return response()->json($reservation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ReservationRequest $request, Reservation $reservation)
    {
        $this->authorize('update', $reservation);
        $updatedReservation = $this->reservationService->updateReservation($request, $reservation);
        return response()->json($updatedReservation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        $this->authorize('delete', $reservation);
        $this->reservationService->deleteReservation($reservation);
        return response()->json(['message' => 'Réservation supprimée avec succès'], 200);
    }
}
