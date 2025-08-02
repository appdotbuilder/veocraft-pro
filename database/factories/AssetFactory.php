<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Asset>
 */
class AssetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['character', 'object', 'product'];
        $type = $this->faker->randomElement($types);
        
        return [
            'user_id' => User::factory(),
            'name' => $this->generateAssetName($type),
            'type' => $type,
            'description' => $this->generateAssetDescription($type),
        ];
    }

    /**
     * Generate asset name based on type.
     */
    protected function generateAssetName(string $type): string
    {
        switch ($type) {
            case 'character':
                $names = ['Sarah the CEO', 'Mike the Developer', 'Anna the Designer', 'John the Athlete', 'Emma the Student'];
                return $this->faker->randomElement($names);
            case 'object':
                $objects = ['Modern Laptop', 'Coffee Mug', 'Smartphone', 'Wireless Headphones', 'Office Chair'];
                return $this->faker->randomElement($objects);
            case 'product':
                $products = ['Energy Drink', 'Fitness Tracker', 'Organic Soap', 'Premium Coffee', 'Smart Watch'];
                return $this->faker->randomElement($products);
            default:
                return $this->faker->word();
        }
    }

    /**
     * Generate asset description based on type.
     */
    protected function generateAssetDescription(string $type): string
    {
        switch ($type) {
            case 'character':
                return "Professional appearance with modern business attire. Confident demeanor and approachable personality. " .
                       "Age: " . $this->faker->numberBetween(25, 45) . ". " .
                       "Background: " . $this->faker->jobTitle() . " with expertise in " . $this->faker->word() . ". " .
                       "Key traits: Charismatic, knowledgeable, and trustworthy.";
            case 'object':
                return "High-quality " . strtolower($this->faker->colorName()) . " finish with sleek, modern design. " .
                       "Dimensions: " . $this->faker->numberBetween(10, 50) . "cm x " . $this->faker->numberBetween(10, 50) . "cm. " .
                       "Material: Premium " . $this->faker->randomElement(['aluminum', 'plastic', 'wood', 'glass']) . ". " .
                       "Style: Minimalist and contemporary, perfect for professional settings.";
            case 'product':
                return "Premium " . strtolower($this->faker->word()) . " designed for " . $this->faker->randomElement(['professionals', 'athletes', 'students', 'families']) . ". " .
                       "Key features: " . $this->faker->sentence() . " " .
                       "Benefits: Improves " . $this->faker->randomElement(['productivity', 'health', 'lifestyle', 'performance']) . ". " .
                       "Target market: " . $this->faker->randomElement(['18-35 years', '25-45 years', '30-50 years']) . ".";
            default:
                return $this->faker->paragraph();
        }
    }

    /**
     * Indicate that the asset is a character.
     */
    public function character(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'character',
            'name' => $this->generateAssetName('character'),
            'description' => $this->generateAssetDescription('character'),
        ]);
    }

    /**
     * Indicate that the asset is an object.
     */
    public function object(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'object',
            'name' => $this->generateAssetName('object'),
            'description' => $this->generateAssetDescription('object'),
        ]);
    }

    /**
     * Indicate that the asset is a product.
     */
    public function product(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'product',
            'name' => $this->generateAssetName('product'),
            'description' => $this->generateAssetDescription('product'),
        ]);
    }
}