<?php

namespace App\Services\Interfaces;

use App\Models\reservation_confirmation;
use Illuminate\Http\Request;

interface ReservationConfirmationServiceInterface
{
    public function getAllConfirmations();
    public function storeConfirmation(Request $request);
    public function uploadContractPdf(Request $request);
}