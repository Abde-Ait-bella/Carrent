<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class paymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "reservation_id" => $this->faker->numberBetween(1, 10),
            "payment_method" => $this->faker->randomElement(['credit_card', 'paypal', 'cash']),
            "payment_status" => $this->faker->randomElement(['pending', 'completed', 'failed']),
            "amount" => $this->faker->randomFloat(2, 10, 1000),
        ];
    }
}
