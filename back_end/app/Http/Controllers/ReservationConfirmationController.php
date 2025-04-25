<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
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

        // Check if final_return is an object with from/to dates
        if (
            is_array($request->input('duration')) &&
            isset($request->input('duration')['from']) &&
            isset($request->input('duration')['to'])
        ) {

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


        // Validate the request data
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


        // // Create a new rental contract
        $rentalContract = reservation_confirmation::create($validatedData);

        $reservation = Reservation::find($validatedData['reservation_id']);

        $reservation->update([
            'rental_start' => $validatedData['rental_start'],
            'rental_end' => $validatedData['rental_end'],
            'total_price' => $validatedData['final_price'],
        ]);

        return response()->json([
            'message' => 'Contrat de location ajouté avec succès',
            'data contrat' => $rentalContract,
            'reservation' => $reservation,
            'status' => 201
        ], 201);

        // Validate the request data
        // $validatedData = $request->validate([
        //     'reservation_id' => 'required|exists:strokeWidth,id',
        //     'cin' => 'required|string',
        //     'permis_number' => 'required|string',
        //     'permis_city_id' => 'required|exists:cities,id',
        //     'phone_number' => 'required|string',
        //     'address' => 'required|string',
        //     'final_return' => 'required|date',
        //     'advance' => 'required|numeric|min:0',
        //     'rest' => 'required|numeric|min:0',
        //     'total_price' => 'required|numeric|min:0',
        //     'comprehensive_insurance' => 'required|boolean',
        // ]);

        // Create a new rental contract
        // $rentalContract = reservation_confirmation::create($validatedData);

        // return response()->json([
        //     'message' => 'Contrat de location ajouté avec succès',
        //     'data' => $rentalContract
        // ], 201);
    }

    /**
     * Upload a PDF contract confirmation file.
     */
    public function uploadContractPdf(Request $request)
    {
        // Find the reservation confirmation
        $request->validate([
            'reservation_id' => 'required|exists:reservations,id',
            'contract_file' => '', // 5MB max size
        ]);

        // First check if confirmation exists
        $confirmation = reservation_confirmation::where('reservation_id', $request['reservation_id'])->first();
        
        if (!$confirmation) {
            return response()->json([
            'message' => 'Confirmation de réservation non trouvée',
            'status' => 404,
            ], 404);
        }

        // Validate the request - make sure it has a PDF file
        if ($request->hasFile('contract_file')) {
            // Get the file
            $file = $request->file('contract_file');

            // Generate a unique filename
            $filename = 'contract_' . $request->input('reservation_id') . '_' . time() . '.' . $file->getClientOriginalExtension();

            // Store the file in the storage/app/public/contracts directory
            $path = $file->storeAs('contracts', $filename, 'public');

            // Update the reservation confirmation with the file path
            $confirmation->contract_path = $path;
            $confirmation->save();

            // Update the related reservation status to confirmed
            $reservation = Reservation::find($confirmation->reservation_id);
            if ($reservation) {
            $reservation->update(['state' => 'confirmed']);
            }

            return response()->json([
            'message' => 'Fichier de contrat téléchargé avec succès',
            'file_path' => $path,
            'confirmation' => $confirmation,
            'contract_url' => url('storage/' . $path), // Ajouter l'URL complète
            'status' => 201,
            ], 201);
        }

        return response()->json([
            'message' => 'Aucun fichier trouvé',
            'status' => 400,
        ], 400);
    }

    /**
     * Get all reservation confirmations
     */
    public function getAll()
    {
        $confirmations = reservation_confirmation::with(['reservation'])->get();
        
        foreach ($confirmations as $confirmation) {
            // Ajouter l'URL complète du contrat si un chemin existe
            if ($confirmation->contract_path) {
                $confirmation->contract_url = str_replace('/api', '', url('storage/' . $confirmation->contract_path));
            }
        }
        
        return response()->json($confirmations, 200);
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
