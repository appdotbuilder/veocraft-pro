<?php

namespace App\Services;

use App\Models\ApiKey;
use App\Models\DeveloperProfile;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PromptGeneratorService
{
    /**
     * Generate a detailed prompt from a simple idea using AI.
     */
    public function generateFromIdea(string $idea): string
    {
        try {
            $apiKey = $this->getTextLlmKey();
            
            if (!$apiKey) {
                return $this->getFallbackPrompt($idea);
            }

            $systemPrompt = "You are a professional video prompt generator. Transform simple ideas into detailed, comprehensive video prompts that include:\n\n" .
                "1. Scene descriptions with specific visual details\n" .
                "2. Camera angles and shot types\n" .
                "3. Character actions and interactions\n" .
                "4. Lighting and mood specifications\n" .
                "5. Audio/soundtrack suggestions\n" .
                "6. Pacing and timing notes\n\n" .
                "Format the output as a multi-paragraph detailed prompt suitable for video production.";

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(30)->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => $systemPrompt
                    ],
                    [
                        'role' => 'user',
                        'content' => "Transform this idea into a detailed video prompt: {$idea}"
                    ]
                ],
                'max_tokens' => 1000,
                'temperature' => 0.7,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                return $data['choices'][0]['message']['content'] ?? $this->getFallbackPrompt($idea);
            }

            Log::warning('OpenAI API request failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return $this->getFallbackPrompt($idea);
        } catch (\Exception $e) {
            Log::error('Error generating prompt from idea', [
                'error' => $e->getMessage(),
                'idea' => $idea,
            ]);

            return $this->getFallbackPrompt($idea);
        }
    }

    /**
     * Get the text LLM API key for the current user/developer.
     */
    protected function getTextLlmKey(): ?string
    {
        $user = auth()->user();
        
        if (!$user) {
            return null;
        }

        // Try to get API key from user's developer profile
        $developerProfile = $user->developerProfile;
        
        if ($developerProfile && $developerProfile->apiKeys) {
            return $developerProfile->apiKeys->text_llm_key;
        }

        // Fallback to first available developer profile
        $apiKeys = ApiKey::whereHas('developerProfile')
            ->whereNotNull('text_llm_key')
            ->first();

        return $apiKeys?->text_llm_key;
    }

    /**
     * Generate a fallback detailed prompt when AI is not available.
     */
    protected function getFallbackPrompt(string $idea): string
    {
        return "**Detailed Video Prompt**\n\n" .
            "**Core Concept:** {$idea}\n\n" .
            "**Scene 1: Opening Shot**\n" .
            "- Wide establishing shot to set the context\n" .
            "- Natural lighting with warm tones\n" .
            "- Smooth camera movement introducing the main elements\n\n" .
            "**Scene 2: Main Action**\n" .
            "- Medium shots focusing on key interactions\n" .
            "- Dynamic camera angles to maintain engagement\n" .
            "- Clear character motivations and actions\n\n" .
            "**Scene 3: Detail Shots**\n" .
            "- Close-ups highlighting important details\n" .
            "- Shallow depth of field for focus\n" .
            "- Complementary color palette\n\n" .
            "**Scene 4: Resolution**\n" .
            "- Wide shot bringing everything together\n" .
            "- Satisfying conclusion to the narrative\n" .
            "- Memorable final image\n\n" .
            "**Technical Notes:**\n" .
            "- Duration: 30-60 seconds\n" .
            "- Music: Upbeat and engaging\n" .
            "- Pacing: Quick cuts with smooth transitions\n" .
            "- Call-to-action: Clear and compelling";
    }
}