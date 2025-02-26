<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    /** @use HasFactory<\Database\Factories\CarFactory> */
    use HasFactory;

    protected $fillable = [
        'brand', 'model', 'registration_number', 'year', 'color',
        'engine', 'image', 'quantity', 'mileage', 'resduce',
        'stars', 'price_per_day', 'status', 'description'
    ];
}
