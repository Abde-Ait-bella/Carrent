<?php

namespace App\Http\Controllers;

use App\Models\reservation_confirmation;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReservationConfirmationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'vehicle_id' => 'required|exists:vehicles,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'rental_price' => 'required|numeric|min:0',
            'payment_method' => 'required|string',
            'status' => 'sometimes|string|in:pending,confirmed,completed,cancelled',
            'notes' => 'nullable|string',
        ]);
        
        // Create a new rental contract
        $rentalContract = reservation_confirmation::create($validatedData);
        
        return response()->json([
            'message' => 'Contrat de location ajouté avec succès',
            'data' => $rentalContract
        ], 201);
    }
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(reservation_confirmation $reservation_confirmation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(reservation_confirmation $reservation_confirmation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, reservation_confirmation $reservation_confirmation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(reservation_confirmation $reservation_confirmation)
    {
        //
    }
}
