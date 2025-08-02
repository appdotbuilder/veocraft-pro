<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DeveloperProfile>
 */
class DeveloperProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'brand_name' => $this->faker->company() . ' Pro',
            'brand_color' => $this->faker->hexColor(),
            'footer_text' => $this->faker->sentence(),
            'authorization_code' => Str::random(32),
        ];
    }
}