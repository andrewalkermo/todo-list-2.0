<?php

namespace Database\Factories;

use App\Models\Todo;
use Illuminate\Database\Eloquent\Factories\Factory;

class TodoListFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
        ];
    }

    public function configure(): TodoListFactory
    {
        return $this->afterCreating(function ($todoList) {
            Todo::factory()
                ->count($this->faker->numberBetween(1, 10))
                ->for($todoList)
                ->sequence(function ($sequence) {
                    return [
                        'order' => $sequence->index,
                    ];
                })
                ->create();
        });
    }

}
