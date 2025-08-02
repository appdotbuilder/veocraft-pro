<?php

namespace Database\Seeders;

use App\Models\Asset;
use App\Models\DeveloperProfile;
use App\Models\Prompt;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a regular test user
        $testUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'role' => 'user',
        ]);

        // Create a super admin
        $superAdmin = User::factory()->superAdmin()->create([
            'name' => 'Super Admin',
            'email' => 'admin@example.com',
        ]);

        // Create a developer admin with profile
        $developerAdmin = User::factory()->developerAdmin()->create([
            'name' => 'Developer Admin',
            'email' => 'developer@example.com',
        ]);

        // Create developer profile for the developer admin
        $developerProfile = DeveloperProfile::factory()->create([
            'user_id' => $developerAdmin->id,
            'brand_name' => 'Veocraft Pro',
            'brand_color' => '#8b5cf6',
            'footer_text' => 'Powered by advanced AI technology for creative professionals.',
        ]);

        // Create API keys for the developer profile
        $developerProfile->apiKeys()->create([
            'text_llm_key' => 'demo-text-llm-key-' . bin2hex(random_bytes(16)),
            'image_gen_key' => 'demo-image-gen-key-' . bin2hex(random_bytes(16)),
            'image_vision_key' => 'demo-image-vision-key-' . bin2hex(random_bytes(16)),
        ]);

        // Create some sample prompts for the test user
        Prompt::factory()->count(5)->satset()->create(['user_id' => $testUser->id]);
        Prompt::factory()->count(3)->manual()->create(['user_id' => $testUser->id]);

        // Create some sample assets for the test user
        Asset::factory()->count(3)->character()->create(['user_id' => $testUser->id]);
        Asset::factory()->count(2)->object()->create(['user_id' => $testUser->id]);
        Asset::factory()->count(2)->product()->create(['user_id' => $testUser->id]);

        // Create additional regular users with content
        User::factory()->count(5)->create()->each(function ($user) {
            // Create prompts for each user
            Prompt::factory()->count(random_int(2, 6))->create(['user_id' => $user->id]);
            
            // Create assets for each user
            Asset::factory()->count(random_int(1, 4))->create(['user_id' => $user->id]);
        });
    }
}