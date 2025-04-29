<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationRequest;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class ReservationController extends Controller
{
    /**
     * Get reservations for the current authenticated user
     */
    public function getUserReservations()
    {
        $this->authorize('viewOwn', Reservation::class);

        $user = Auth::user();

        $reservations = Reservation::with(['car'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($reservations);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Reservation::class);

        // Récupérer toutes les réservations (pour admin)
        $reservations = Reservation::with(['user', 'car'])->latest()->get();

        return response()->json($reservations);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReservationRequest $request)
    {
        // Vérifier si l'utilisateur est connecté
        if (!Auth::check()) {
            // Chercher user par email
            $user = User::where('email', $request->email)->first();
    
            if (!$user) {
                // Créer un nouvel utilisateur
                $user = User::create([
                    'email' => $request->email,
                    'password' => bcrypt('password'), // mot de passe temporaire
                    'name' => $request->name ?? 'New User',
                ]);
    
                $credentials = [
                    'email' => $request->email,
                    'password' => 'password', // parce qu'on a mis bcrypt('password')
                ];
            } else {
                // Utilisateur existe, on doit utiliser le mot de passe fourni par le formulaire
                $credentials = [
                    'email' => $request->email,
                    'password' => $request->password,
                ];
            }
    
            // Authentifier et récupérer le token
            $token = Auth::attempt($credentials);
    
            if (!$token) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Identifiants incorrects.',
                ], 403);
            }
        } else {
            // L'utilisateur est déjà connecté, donc pas besoin de créer un token
            $token = auth()->refresh(); // ou utiliser un token existant si dispo
        }
    
        // Maintenant, l'utilisateur est connecté
        $validated = $request->validated();
        $validated['user_id'] = Auth::id();
    
        $rentalStart = new \DateTime($validated['rental_start']);
        $rentalEnd = new \DateTime($validated['rental_end']);
    
        $days = $rentalStart->diff($rentalEnd)->days;
    
        $validated['total_price'] = $days * $validated['daily_rate'];
    
        // Créer la réservation
        $reservation = Reservation::create($validated);
    
        return response()->json([
            'reservation' => $reservation,
            'status' => 201,
            'user' => Auth::user(),
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ], 201);
    }
    
    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        // $this->authorize('view', $reservation);

        // return response()->json($reservation->load(['user', 'car']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reservation $reservation)
    {
        // $this->authorize('update', $reservation);

        // Logique pour mettre à jour une réservation
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        // $this->authorize('delete', $reservation);

        // Logique pour supprimer une réservation
    }
}
