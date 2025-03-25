<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Car>
 */
class CarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'brand' => $this->faker->word(),
            'model' => $this->faker->word(),
            'registration_number' => $this->faker->unique()->bothify('??###'),
            'year' => $this->faker->year(),
            'color' => $this->faker->safeColorName(),
            'engine' => $this->faker->word(),
            'image' => 'cars/default.jpg', // Vous pouvez modifier pour utiliser une image dynamique
            'quantity' => $this->faker->numberBetween(1, 10),
            'mileage' => $this->faker->numberBetween(5000, 20000),
            'resduce' => $this->faker->numberBetween(1, 10),
            'stars' => $this->faker->numberBetween(1, 5),
            'price_per_day' => $this->faker->randomFloat(2, 20, 100),
            'status' => $this->faker->randomElement(['disponible', 'reserve', 'loue', 'maintenance']),
            'description' => $this->faker->sentence(),
        ];
    }
}
