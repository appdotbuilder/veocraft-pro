<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePromptRequest;
use App\Http\Requests\UpdatePromptRequest;
use App\Models\Prompt;
use App\Services\PromptGeneratorService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromptController extends Controller
{
    /**
     * Display a listing of the prompts.
     */
    public function index(Request $request)
    {
        $prompts = $request->user()->prompts()
            ->latest()
            ->paginate(12);

        return Inertia::render('prompts/index', [
            'prompts' => $prompts,
        ]);
    }

    /**
     * Show the form for creating a new prompt.
     */
    public function create(Request $request)
    {
        $mode = $request->get('mode', 'satset');
        
        return Inertia::render('prompts/create', [
            'mode' => $mode,
        ]);
    }

    /**
     * Store a newly created prompt.
     */
    public function store(StorePromptRequest $request, PromptGeneratorService $promptGenerator)
    {
        $validated = $request->validated();
        
        // If SatSet mode, generate detailed prompt from simple idea
        if ($validated['mode'] === 'satset') {
            $generatedContent = $promptGenerator->generateFromIdea($validated['content']);
            $validated['content'] = $generatedContent;
        }
        
        $prompt = $request->user()->prompts()->create($validated);

        return redirect()->route('prompts.show', $prompt)
            ->with('success', 'Prompt created successfully!');
    }

    /**
     * Display the specified prompt.
     */
    public function show(Prompt $prompt)
    {
        // Ensure user can only view their own prompts
        if ($prompt->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('prompts/show', [
            'prompt' => $prompt->load('user'),
        ]);
    }

    /**
     * Show the form for editing the specified prompt.
     */
    public function edit(Prompt $prompt)
    {
        // Ensure user can only edit their own prompts
        if ($prompt->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('prompts/edit', [
            'prompt' => $prompt,
        ]);
    }

    /**
     * Update the specified prompt.
     */
    public function update(UpdatePromptRequest $request, Prompt $prompt)
    {
        // Ensure user can only update their own prompts
        if ($prompt->user_id !== auth()->id()) {
            abort(403);
        }

        $prompt->update($request->validated());

        return redirect()->route('prompts.show', $prompt)
            ->with('success', 'Prompt updated successfully!');
    }

    /**
     * Remove the specified prompt.
     */
    public function destroy(Prompt $prompt)
    {
        // Ensure user can only delete their own prompts
        if ($prompt->user_id !== auth()->id()) {
            abort(403);
        }

        $prompt->delete();

        return redirect()->route('prompts.index')
            ->with('success', 'Prompt deleted successfully!');
    }
}