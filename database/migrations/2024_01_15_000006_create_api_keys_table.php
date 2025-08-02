<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('api_keys', function (Blueprint $table) {
            $table->id();
            $table->foreignId('developer_profile_id')->constrained()->onDelete('cascade');
            $table->text('text_llm_key')->nullable()->comment('Encrypted text LLM API key');
            $table->text('image_gen_key')->nullable()->comment('Encrypted image generation API key');
            $table->text('image_vision_key')->nullable()->comment('Encrypted image vision API key');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('developer_profile_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('api_keys');
    }
};