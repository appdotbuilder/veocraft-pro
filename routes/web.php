<?php

use App\Http\Controllers\AssetController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PromptController;
use App\Http\Controllers\StoryboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Prompts
    Route::resource('prompts', PromptController::class);
    
    // Assets
    Route::resource('assets', AssetController::class);
    
    // Storyboard generation
    Route::post('/storyboard', [StoryboardController::class, 'store'])->name('storyboard.store');
    Route::get('/storyboard/{prompt}', [StoryboardController::class, 'show'])->name('storyboard.show');
});

// Super Admin routes
Route::middleware(['auth'])->prefix('superadmin')->group(function () {
    Route::get('/', function () {
        // Check role in controller or use gate
        if (!auth()->user()->isSuperAdmin()) {
            abort(403);
        }
        return Inertia::render('admin/super/dashboard');
    })->name('superadmin.dashboard');
    
    Route::get('/users', function () {
        if (!auth()->user()->isSuperAdmin()) {
            abort(403);
        }
        return Inertia::render('admin/super/users');
    })->name('superadmin.users');
});

// Developer Admin routes
Route::middleware(['auth'])->prefix('developer')->group(function () {
    Route::get('/', function () {
        if (!auth()->user()->isDeveloperAdmin()) {
            abort(403);
        }
        return Inertia::render('admin/developer/dashboard');
    })->name('developer.dashboard');
    
    Route::get('/branding', function () {
        if (!auth()->user()->isDeveloperAdmin()) {
            abort(403);
        }
        return Inertia::render('admin/developer/branding');
    })->name('developer.branding');
    
    Route::get('/api-keys', function () {
        if (!auth()->user()->isDeveloperAdmin()) {
            abort(403);
        }
        return Inertia::render('admin/developer/api-keys');
    })->name('developer.api-keys');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';