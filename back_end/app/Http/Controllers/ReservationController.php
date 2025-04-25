<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationRequest;
use App\Models\Reservation;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservations = Reservation::with(['user', 'car'])->get();
        return response()->json($reservations);
    }

    /** 
     * Show the form for creating a new resource.
     */
    public function upadatetState(Reservation $reservation, Request $request)
    {

        $reservation->state = $request->state;
        $reservation->save();
        return response()->json($request->state, 200);
        // return response()->json($reservation->load(['user', 'car']), 200);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReservationRequest $request)
    {
        // Vérifier si l'utilisateur est authentifié
        if (!Auth::check()) {
            // Tenter de connecter l'utilisateur avec les informations fournies
            $credentials = $request->only('email', 'password');
            if (!Auth::attempt($credentials)) {
                // Check if the user exists with the provided email
                $user = \App\Models\User::where('email', $request->email)->first();
                if (!$user) {
                    // User doesn't exist, create a new user
                    $user = \App\Models\User::create([
                        'email' => $request->email,
                        'password' => bcrypt('password'),
                        'name' => $request->name ?? 'New User', // Default name if not provided
                    ]);

                    // Authenticate the newly created user
                    Auth::login($user);
                } else {
                    return response()->json(['message' => 'Identifiants incorrects. Veuillez vous connecter.'], 401);
                }
            }
        }

        // Récupérer les données validées
        $validated = $request->validated();

        // Ajouter l'ID de l'utilisateur authentifié aux données de réservation
        $validated['user_id'] = Auth::id();
        // Extract rental start and end dates
        $rentalStart = new \DateTime($validated['rental_start']);
        $rentalEnd = new \DateTime($validated['rental_end']);

        // Calculate the difference in days
        $interval = $rentalStart->diff($rentalEnd);
        $days = $interval->days;

        // Add the calculated days to the validated data
        $validated['total_price'] = $days * $validated['daily_rate'];
        // Get the authenticated user
        $user = Auth::user();

        // Créer la réservation  
        $reservation = Reservation::create($validated);

        return response()->json(['reservation' => $reservation, 'status' => 201, 'user' => $user], 201); // 201 Created
    }

    /****
     * Display the specified resource.play the specified resource.
     */
    public function show(Reservation $reservation)
    {
        //
    }

    /****
     * Show the form for editing the specified resource.w the form for editing the specified resource.
     */
    public function edit(Reservation $reservation)
    {
        //
    }

    /****
     * Update the specified resource in storage.rage.
     */
    public function update(ReservationRequest $request, Reservation $reservation)
    {
        $validated = $request->validated();
        $validated = $request->validated();
        $reservation->update($validated);
        $reservation->update($validated);
        return response()->json($reservation, 204);
        ;
    }

    /****
     * Remove the specified resource from storage.ource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        $reservation->delete();
        return response()->json(['message' => 'Reservation deleted successfully']);
    }
}
