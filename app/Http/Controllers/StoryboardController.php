<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Prompt;
use App\Services\StoryboardGeneratorService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoryboardController extends Controller
{
    /**
     * Generate storyboard for a prompt.
     */
    public function store(Request $request, StoryboardGeneratorService $storyboardGenerator)
    {
        $request->validate([
            'prompt_id' => 'required|exists:prompts,id',
        ]);

        $prompt = Prompt::findOrFail($request->prompt_id);
        
        // Ensure user can only generate storyboards for their own prompts
        if ($prompt->user_id !== auth()->id()) {
            abort(403);
        }

        try {
            $storyboardImages = $storyboardGenerator->generateFromPrompt($prompt);
            
            return Inertia::render('storyboard/show', [
                'prompt' => $prompt,
                'images' => $storyboardImages,
            ]);
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to generate storyboard: ' . $e->getMessage());
        }
    }

    /**
     * Show storyboard for a prompt.
     */
    public function show(Prompt $prompt)
    {
        // Ensure user can only view storyboards for their own prompts
        if ($prompt->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('storyboard/show', [
            'prompt' => $prompt,
            'images' => [], // Would load from cache/database in real implementation
        ]);
    }
}