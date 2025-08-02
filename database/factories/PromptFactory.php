<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Prompt>
 */
class PromptFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $modes = ['satset', 'manual'];
        $mode = $this->faker->randomElement($modes);
        
        return [
            'user_id' => User::factory(),
            'title' => $this->faker->sentence(3, true),
            'content' => $this->generatePromptContent($mode),
            'mode' => $mode,
        ];
    }

    /**
     * Generate realistic prompt content based on mode.
     */
    protected function generatePromptContent(string $mode): string
    {
        if ($mode === 'satset') {
            return $this->generateSatSetContent();
        }
        
        return $this->generateManualContent();
    }

    /**
     * Generate SatSet-style content.
     */
    protected function generateSatSetContent(): string
    {
        $concepts = [
            'A promotional video for a new energy drink targeting young athletes',
            'Tech startup announcement showcasing innovative AI features',
            'Fashion brand summer collection with vibrant colors and lifestyle shots',
            'Coffee shop commercial emphasizing artisanal brewing process',
            'Fitness app demonstration showing workout tracking features',
        ];

        return $this->faker->randomElement($concepts);
    }

    /**
     * Generate Manual-style detailed content.
     */
    protected function generateManualContent(): string
    {
        return "**Scene 1: Opening Shot**\n" .
               "Wide establishing shot of modern office space with natural lighting. Camera slowly pans across the workspace showing team collaboration.\n\n" .
               "**Scene 2: Product Focus**\n" .
               "Close-up shots of the product in action. Shallow depth of field highlighting key features. Smooth camera movements.\n\n" .
               "**Scene 3: User Testimonial**\n" .
               "Medium shot of satisfied customer speaking directly to camera. Well-lit interview setup with professional backdrop.\n\n" .
               "**Scene 4: Call to Action**\n" .
               "Dynamic montage of product benefits leading to clear call-to-action. Upbeat music building to climax.\n\n" .
               "**Technical Notes:**\n" .
               "- Duration: 30-60 seconds\n" .
               "- Music: Upbeat corporate\n" .
               "- Color palette: Modern blues and whites\n" .
               "- Target audience: Business professionals";
    }

    /**
     * Indicate that the prompt is SatSet mode.
     */
    public function satset(): static
    {
        return $this->state(fn (array $attributes) => [
            'mode' => 'satset',
            'content' => $this->generateSatSetContent(),
        ]);
    }

    /**
     * Indicate that the prompt is Manual mode.
     */
    public function manual(): static
    {
        return $this->state(fn (array $attributes) => [
            'mode' => 'manual',
            'content' => $this->generateManualContent(),
        ]);
    }
}