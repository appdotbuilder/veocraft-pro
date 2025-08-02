<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAssetRequest;
use App\Http\Requests\UpdateAssetRequest;
use App\Models\Asset;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetController extends Controller
{
    /**
     * Display a listing of the assets.
     */
    public function index(Request $request)
    {
        $type = $request->get('type');
        
        $query = $request->user()->assets();
        
        if ($type && in_array($type, ['character', 'object', 'product'])) {
            $query->where('type', $type);
        }
        
        $assets = $query->latest()->paginate(12);

        return Inertia::render('assets/index', [
            'assets' => $assets,
            'selectedType' => $type,
        ]);
    }

    /**
     * Show the form for creating a new asset.
     */
    public function create(Request $request)
    {
        $type = $request->get('type', 'character');
        
        return Inertia::render('assets/create', [
            'type' => $type,
        ]);
    }

    /**
     * Store a newly created asset.
     */
    public function store(StoreAssetRequest $request)
    {
        $asset = $request->user()->assets()->create($request->validated());

        return redirect()->route('assets.show', $asset)
            ->with('success', 'Asset created successfully!');
    }

    /**
     * Display the specified asset.
     */
    public function show(Asset $asset)
    {
        // Ensure user can only view their own assets
        if ($asset->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('assets/show', [
            'asset' => $asset->load('user'),
        ]);
    }

    /**
     * Show the form for editing the specified asset.
     */
    public function edit(Asset $asset)
    {
        // Ensure user can only edit their own assets
        if ($asset->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('assets/edit', [
            'asset' => $asset,
        ]);
    }

    /**
     * Update the specified asset.
     */
    public function update(UpdateAssetRequest $request, Asset $asset)
    {
        // Ensure user can only update their own assets
        if ($asset->user_id !== auth()->id()) {
            abort(403);
        }

        $asset->update($request->validated());

        return redirect()->route('assets.show', $asset)
            ->with('success', 'Asset updated successfully!');
    }

    /**
     * Remove the specified asset.
     */
    public function destroy(Asset $asset)
    {
        // Ensure user can only delete their own assets
        if ($asset->user_id !== auth()->id()) {
            abort(403);
        }

        $asset->delete();

        return redirect()->route('assets.index')
            ->with('success', 'Asset deleted successfully!');
    }
}