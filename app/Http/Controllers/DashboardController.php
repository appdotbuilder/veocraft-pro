<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use App\Models\Prompt;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get user's recent prompts and assets
        $recentPrompts = $user->prompts()
            ->latest()
            ->take(5)
            ->get(['id', 'title', 'mode', 'created_at']);
            
        $recentAssets = $user->assets()
            ->latest()
            ->take(5)
            ->get(['id', 'name', 'type', 'created_at']);
            
        $stats = [
            'total_prompts' => $user->prompts()->count(),
            'total_assets' => $user->assets()->count(),
            'satset_prompts' => $user->prompts()->where('mode', 'satset')->count(),
            'manual_prompts' => $user->prompts()->where('mode', 'manual')->count(),
        ];

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentPrompts' => $recentPrompts,
            'recentAssets' => $recentAssets,
        ]);
    }
}