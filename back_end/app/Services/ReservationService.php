<?php

namespace App\Services;

use App\Http\Requests\ReservationRequest;
use App\Models\Reservation;
use App\Models\User;
use App\Repositories\Interfaces\ReservationRepositoryInterface;
use App\Services\Interfaces\ReservationServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationService implements ReservationServiceInterface
{
    protected $reservationRepository;

    public function __construct(ReservationRepositoryInterface $reservationRepository)
    {
        $this->reservationRepository = $reservationRepository;
    }

    public function getUserReservations()
    {
        $user = Auth::user();
        return $this->reservationRepository->getUserReservations($user->id);
    }

    public function getAllReservations()
    {
        return $this->reservationRepository->getAllWithRelations();
    }

    public function storeReservation($request)
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
                    'email' => $user->email,
                    'password' => $user->password, // mot de passe de l'utilisateur existant
                ];
            }
    
            // Authentifier et récupérer le token
            $token = Auth::attempt($credentials);
    
            if (!$token) {
                return [
                    'status' => 'error',
                    'message' => 'Identifiants incorrects.',
                    'code' => $credentials
                ];
            }
        } else {
            // L'utilisateur est déjà connecté, donc pas besoin de créer un token
            $token = auth()->refresh(); // ou utiliser un token existant si dispo
        }
    
        // Maintenant, l'utilisateur est connecté
        $validated = $request->validated();
        $validated['user_id'] = Auth::id();
    
        $validated['total_price'] = $this->calculateTotalPrice(
            $validated['rental_start'],
            $validated['rental_end'],
            $validated['daily_rate']
        );
    
        // Créer la réservation
        $reservation = $this->reservationRepository->create($validated);
    
        return [
            'reservation' => $reservation,
            'status' => 201,
            'user' => Auth::user(),
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ],
            'code' => 201
        ];
    }

    public function showReservation(Reservation $reservation)
    {
        // Logique pour afficher une réservation
        return $reservation->load(['user', 'car']);
    }

    public function updateReservation(Request $request, Reservation $reservation)
    {
        // Logique pour mettre à jour une réservation
        $data = $request->validated();
        
        if (isset($data['rental_start']) && isset($data['rental_end']) && isset($data['daily_rate'])) {
            $data['total_price'] = $this->calculateTotalPrice(
                $data['rental_start'],
                $data['rental_end'],
                $data['daily_rate']
            );
        }
        
        return $this->reservationRepository->update($reservation, $data);
    }

    public function deleteReservation(Reservation $reservation)
    {
        // Logique pour supprimer une réservation
        return $this->reservationRepository->delete($reservation);
    }
    
    public function calculateTotalPrice($rentalStart, $rentalEnd, $dailyRate)
    {
        $startDate = new \DateTime($rentalStart);
        $endDate = new \DateTime($rentalEnd);
        $days = $startDate->diff($endDate)->days;
        
        return $days * $dailyRate;
    }
}