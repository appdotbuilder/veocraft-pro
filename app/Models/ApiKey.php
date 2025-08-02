<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ApiKey
 *
 * @property int $id
 * @property int $developer_profile_id
 * @property string|null $text_llm_key
 * @property string|null $image_gen_key
 * @property string|null $image_vision_key
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\DeveloperProfile $developerProfile
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ApiKey newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ApiKey newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ApiKey query()
 * @method static \Illuminate\Database\Eloquent\Builder|ApiKey whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApiKey whereDeveloperProfileId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApiKey whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApiKey whereImageGenKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApiKey whereImageVisionKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApiKey whereTextLlmKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApiKey whereUpdatedAt($value)
 * @method static \Database\Factories\ApiKeyFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ApiKey extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'developer_profile_id',
        'text_llm_key',
        'image_gen_key',
        'image_vision_key',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'text_llm_key' => 'encrypted',
        'image_gen_key' => 'encrypted',
        'image_vision_key' => 'encrypted',
    ];

    /**
     * Get the developer profile that owns the API keys.
     */
    public function developerProfile(): BelongsTo
    {
        return $this->belongsTo(DeveloperProfile::class);
    }
}