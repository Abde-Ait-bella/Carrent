<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class reservation_confirmation extends Model
{
    /** @use HasFactory<\Database\Factories\ReservationConfirmationFactory> */
    use HasFactory;

    protected $fillable = [
        'reservation_id',
        'cin',
        'permis_number',
        'permis_city_id',
        'phone_number',
        'address',
        'final_return',
        'advance',
        'rest',
        'total_price',
        'comprehensive_insurance',
        'contract_path'
    ];
}
