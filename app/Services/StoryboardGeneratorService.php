<?php

namespace App\Services;

use App\Models\ApiKey;
use App\Models\Prompt;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class StoryboardGeneratorService
{
    /**
     * Generate storyboard images from a prompt.
     */
    public function generateFromPrompt(Prompt $prompt): array
    {
        try {
            $apiKey = $this->getImageGenKey();
            
            if (!$apiKey) {
                return $this->getFallbackImages();
            }

            // Split prompt into scenes/paragraphs
            $scenes = $this->extractScenes($prompt->content);
            $images = [];

            foreach ($scenes as $index => $scene) {
                $imageUrl = $this->generateSceneImage($scene, $apiKey, $index);
                if ($imageUrl) {
                    $images[] = [
                        'scene' => $index + 1,
                        'description' => $scene,
                        'image_url' => $imageUrl,
                    ];
                }
            }

            return $images ?: $this->getFallbackImages();
        } catch (\Exception $e) {
            Log::error('Error generating storyboard', [
                'error' => $e->getMessage(),
                'prompt_id' => $prompt->id,
            ]);

            return $this->getFallbackImages();
        }
    }

    /**
     * Extract scenes from prompt content.
     */
    protected function extractScenes(string $content): array
    {
        // Split by double line breaks or scene markers
        $scenes = preg_split('/\n\n+|\*\*Scene \d+/', $content);
        
        // Clean up and filter scenes
        $scenes = array_filter(array_map(function($scene) {
            $scene = trim($scene);
            $scene = preg_replace('/^\*\*[^*]+\*\*/', '', $scene); // Remove markdown headers
            $scene = trim($scene);
            return strlen($scene) > 20 ? $scene : null; // Only keep substantial scenes
        }, $scenes));

        // Limit to 6 scenes maximum
        return array_slice(array_values($scenes), 0, 6);
    }

    /**
     * Generate an image for a specific scene.
     */
    protected function generateSceneImage(string $scene, string $apiKey, int $index): ?string
    {
        try {
            // Create a prompt optimized for image generation
            $imagePrompt = $this->optimizeForImageGeneration($scene);

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(60)->post('https://api.openai.com/v1/images/generations', [
                'model' => 'dall-e-3',
                'prompt' => $imagePrompt,
                'size' => '1024x1024',
                'quality' => 'standard',
                'n' => 1,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                return $data['data'][0]['url'] ?? null;
            }

            Log::warning('Image generation failed', [
                'status' => $response->status(),
                'scene' => $scene,
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('Error generating scene image', [
                'error' => $e->getMessage(),
                'scene' => $scene,
            ]);

            return null;
        }
    }

    /**
     * Optimize scene text for image generation.
     */
    protected function optimizeForImageGeneration(string $scene): string
    {
        // Extract visual elements and create a concise image prompt
        $prompt = "Cinematic storyboard frame: " . substr($scene, 0, 200);
        
        // Add style specifications
        $prompt .= ". Professional film storyboard style, clear composition, detailed lighting, high quality render.";
        
        return $prompt;
    }

    /**
     * Get the image generation API key.
     */
    protected function getImageGenKey(): ?string
    {
        $user = auth()->user();
        
        if (!$user) {
            return null;
        }

        // Try to get API key from user's developer profile
        $developerProfile = $user->developerProfile;
        
        if ($developerProfile && $developerProfile->apiKeys) {
            return $developerProfile->apiKeys->image_gen_key;
        }

        // Fallback to first available developer profile
        $apiKeys = ApiKey::whereHas('developerProfile')
            ->whereNotNull('image_gen_key')
            ->first();

        return $apiKeys?->image_gen_key;
    }

    /**
     * Get fallback placeholder images when AI is not available.
     */
    protected function getFallbackImages(): array
    {
        return [
            [
                'scene' => 1,
                'description' => 'Opening establishing shot',
                'image_url' => 'https://via.placeholder.com/512x512/1f2937/f3f4f6?text=Scene+1',
            ],
            [
                'scene' => 2,
                'description' => 'Main character introduction',
                'image_url' => 'https://via.placeholder.com/512x512/374151/f3f4f6?text=Scene+2',
            ],
            [
                'scene' => 3,
                'description' => 'Action sequence',
                'image_url' => 'https://via.placeholder.com/512x512/4b5563/f3f4f6?text=Scene+3',
            ],
            [
                'scene' => 4,
                'description' => 'Climactic moment',
                'image_url' => 'https://via.placeholder.com/512x512/6b7280/f3f4f6?text=Scene+4',
            ],
        ];
    }
}