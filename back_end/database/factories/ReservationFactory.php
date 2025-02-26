<?php

namespace Database\Factories;

use App\Models\Car;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $rentalStart = Carbon::today()->addDays(rand(1, 30)); // Date de début aléatoire dans les 30 prochains jours
        $rentalEnd = (clone $rentalStart)->addDays(rand(1, 15)); // Date de fin entre 1 et 15 jours après

        $dailyRate = $this->faker->randomFloat(2, 50, 500); // Prix journalier entre 50 et 500
        $finalPrice = $dailyRate * $rentalStart->diffInDays($rentalEnd); // Calcul du prix final

        return [
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory()->create()->id, // Récupérer un user existant ou en créer un
            'car_id' => Car::inRandomOrder()->first()->id ?? Car::factory()->create()->id, // Récupérer une voiture existante ou en créer une
            'rental_start' => $rentalStart,
            'rental_end' => $rentalEnd,
            'daily_rate' => $dailyRate,
            'final_price' => $finalPrice,
            'state' => $this->faker->randomElement(['pending', 'confirmed', 'canceled', 'completed']),
        ];
    }
}
