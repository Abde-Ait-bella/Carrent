<?php

namespace App\Services;

use App\Models\Reservation;
use App\Repositories\Interfaces\ReservationConfirmationRepositoryInterface;
use App\Services\Interfaces\ReservationConfirmationServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ReservationConfirmationService implements ReservationConfirmationServiceInterface
{
    protected $confirmationRepository;

    public function __construct(ReservationConfirmationRepositoryInterface $confirmationRepository)
    {
        $this->confirmationRepository = $confirmationRepository;
    }

    public function getAllConfirmations()
    {
        $confirmations = $this->confirmationRepository->getAllWithRelations(['reservation']);
        
        foreach ($confirmations as $confirmation) {
            // Ajouter l'URL complète du contrat si un chemin existe
            if ($confirmation->contract_path) {
                $confirmation->contract_url = str_replace('/api', '', url('storage/' . $confirmation->contract_path));
            }
        }
        
        return $confirmations;
    }

    public function storeConfirmation(Request $request)
    {
        // Traitement des dates dans le format attendu
        if (is_array($request->input('duration')) && 
            isset($request->input('duration')['from']) && 
            isset($request->input('duration')['to'])) {

            // Extract the dates
            $startDate = $request->input('duration')['from'];
            $finalReturn = $request->input('duration')['to'];

            // Create a new request with the modified data
            $requestData = $request->all();
            $requestData['rental_start'] = date('Y-m-d', strtotime($startDate));
            $requestData['rental_end'] = date('Y-m-d', strtotime($finalReturn));

            // Replace the request data
            $request->replace($requestData);
        }

        // Validation des données
        $validatedData = $request->validate([
            'reservation_id' => 'required|exists:reservations,id',
            'cin' => 'required|string',
            'rental_start' => 'required|date',
            'rental_end' => 'required|date',
            'permis_number' => 'required|string',
            'permis_city_id' => 'required|exists:cities,id',
            'phone_number' => 'required|string',
            'address' => 'required|string',
            'start_date' => 'nullable|date',
            'advance' => 'required|numeric|min:0',
            'rest' => 'required|numeric|min:0',
            'final_price' => 'required|numeric|min:0',
            'comprehensive_insurance' => 'required|string',
        ]);

        // Création de la confirmation
        $rentalContract = $this->confirmationRepository->create($validatedData);

        // Mise à jour de la réservation associée
        $reservation = Reservation::find($validatedData['reservation_id']);
        $reservation->update([
            'rental_start' => $validatedData['rental_start'],
            'rental_end' => $validatedData['rental_end'],
            'total_price' => $validatedData['final_price'],
        ]);

        return [
            'message' => 'Contrat de location ajouté avec succès',
            'data_contrat' => $rentalContract,
            'reservation' => $reservation,
            'status' => 201
        ];
    }

    public function uploadContractPdf(Request $request)
    {
        // Validation de la requête
        $validated = $request->validate([
            'reservation_id' => 'required|exists:reservations,id',
            'contract_file' => '', // 5MB max size
        ]);

        // Recherche de la confirmation existante
        $confirmation = $this->confirmationRepository->findByReservationId($validated['reservation_id']);
        
        if (!$confirmation) {
            return [
                'message' => 'Confirmation de réservation non trouvée',
                'status' => 404,
            ];
        }

        // Traitement du fichier PDF
        if ($request->hasFile('contract_file')) {
            $file = $request->file('contract_file');
            $filename = 'contract_' . $validated['reservation_id'] . '_' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('contracts', $filename, 'public');

            // Mise à jour de la confirmation avec le chemin du fichier
            $confirmation = $this->confirmationRepository->update($confirmation, ['contract_path' => $path]);

            // Mise à jour du statut de la réservation
            $reservation = Reservation::find($confirmation->reservation_id);
            if ($reservation) {
                $reservation->update(['state' => 'confirmed']);
            }

            return [
                'message' => 'Fichier de contrat téléchargé avec succès',
                'file_path' => $path,
                'confirmation' => $confirmation,
                'contract_url' => url('storage/' . $path),
                'status' => 201,
            ];
        }

        return [
            'message' => 'Aucun fichier trouvé',
            'status' => 400,
        ];
    }
}