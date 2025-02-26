<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;


    protected $fillable = [
        'user_id',
        'car_id',
        'rental_start',
        'rental_end',
        'daily_rate',
        'final_price',
        'state',
    ];

        public function user()
        {
            return $this->belongsTo(User::class);
        }
    
        public function car()
        {
            return $this->belongsTo(Car::class);
        }
}
