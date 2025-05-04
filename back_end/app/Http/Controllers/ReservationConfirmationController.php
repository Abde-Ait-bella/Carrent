<?php

namespace App\Http\Controllers;

use App\Models\reservation_confirmation;
use App\Services\Interfaces\ReservationConfirmationServiceInterface;
use Illuminate\Http\Request;

class ReservationConfirmationController extends Controller
{
    protected $confirmationService;

    public function __construct(ReservationConfirmationServiceInterface $confirmationService)
    {
        $this->confirmationService = $confirmationService;
    }

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
        $result = $this->confirmationService->storeConfirmation($request);
        
        return response()->json([
            'message' => $result['message'],
            'data contrat' => $result['data_contrat'],
            'reservation' => $result['reservation'],
            'status' => $result['status']
        ], $result['status']);
    }

    /**
     * Upload a PDF contract confirmation file.
     */
    public function uploadContractPdf(Request $request)
    {
        $result = $this->confirmationService->uploadContractPdf($request);
        
        return response()->json($result, $result['status']);
    }

    /**
     * Get all reservation confirmations
     */
    public function getAll()
    {
        $confirmations = $this->confirmationService->getAllConfirmations();
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
