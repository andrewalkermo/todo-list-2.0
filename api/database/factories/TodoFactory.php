<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TodoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'content' => $this->faker->sentence,
            'completed' => $this->faker->boolean,
            'order' => $this->faker->numberBetween(0, 100),
        ];
    }
}
