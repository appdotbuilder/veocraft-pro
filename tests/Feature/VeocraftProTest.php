<?php

namespace Tests\Feature;

use App\Models\Asset;
use App\Models\Prompt;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VeocraftProTest extends TestCase
{
    use RefreshDatabase;

    public function test_welcome_page_displays_veocraft_pro_content(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('welcome')
        );
    }

    public function test_dashboard_requires_authentication(): void
    {
        $response = $this->get('/dashboard');

        $response->assertRedirect('/login');
    }

    public function test_authenticated_user_can_access_dashboard(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('dashboard')
                ->has('stats')
        );
    }

    public function test_user_can_create_satset_prompt(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/prompts', [
            'title' => 'Test Energy Drink Commercial',
            'content' => 'A promotional video for a new energy drink',
            'mode' => 'satset',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('prompts', [
            'title' => 'Test Energy Drink Commercial',
            'mode' => 'satset',
            'user_id' => $user->id,
        ]);
    }

    public function test_user_can_create_manual_prompt(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/prompts', [
            'title' => 'Manual Video Prompt',
            'content' => 'Scene 1: Opening shot with dramatic lighting...',
            'mode' => 'manual',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('prompts', [
            'title' => 'Manual Video Prompt',
            'mode' => 'manual',
            'user_id' => $user->id,
        ]);
    }

    public function test_user_can_create_character_asset(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/assets', [
            'name' => 'Sarah the CEO',
            'type' => 'character',
            'description' => 'Professional business leader with confident demeanor',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('assets', [
            'name' => 'Sarah the CEO',
            'type' => 'character',
            'user_id' => $user->id,
        ]);
    }

    public function test_user_can_view_their_prompts(): void
    {
        $user = User::factory()->create();
        $prompt = Prompt::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get('/prompts');

        $response->assertStatus(200);
        $response->assertSee($prompt->title);
    }

    public function test_user_can_view_their_assets(): void
    {
        $user = User::factory()->create();
        $asset = Asset::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get('/assets');

        $response->assertStatus(200);
        $response->assertSee($asset->name);
    }

    public function test_user_cannot_view_other_users_prompts(): void
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $prompt = Prompt::factory()->create(['user_id' => $user2->id]);

        $response = $this->actingAs($user1)->get("/prompts/{$prompt->id}");

        $response->assertStatus(403);
    }

    public function test_super_admin_can_access_admin_dashboard(): void
    {
        $superAdmin = User::factory()->superAdmin()->create();

        $response = $this->actingAs($superAdmin)->get('/superadmin');

        $response->assertStatus(200);
    }

    public function test_regular_user_cannot_access_admin_dashboard(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/superadmin');

        $response->assertStatus(403);
    }

    public function test_developer_admin_can_access_developer_dashboard(): void
    {
        $developerAdmin = User::factory()->developerAdmin()->create();

        $response = $this->actingAs($developerAdmin)->get('/developer');

        $response->assertStatus(200);
    }

    public function test_dashboard_shows_user_stats(): void
    {
        $user = User::factory()->create();
        
        // Create some test data
        Prompt::factory()->count(3)->create(['user_id' => $user->id, 'mode' => 'satset']);
        Prompt::factory()->count(2)->create(['user_id' => $user->id, 'mode' => 'manual']);
        Asset::factory()->count(4)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
        // Check that the dashboard displays the correct stats
        $response->assertInertia(fn ($page) => 
            $page->has('stats')
                ->where('stats.total_prompts', 5)
                ->where('stats.total_assets', 4)
                ->where('stats.satset_prompts', 3)
                ->where('stats.manual_prompts', 2)
        );
    }
}