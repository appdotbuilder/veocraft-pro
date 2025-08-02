<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\DeveloperProfile
 *
 * @property int $id
 * @property int $user_id
 * @property string $brand_name
 * @property string $brand_color
 * @property string|null $footer_text
 * @property string $authorization_code
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\ApiKey|null $apiKeys
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|DeveloperProfile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DeveloperProfile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DeveloperProfile query()
 * @method static \Illuminate\Database\Eloquent\Builder|DeveloperProfile whereAuthorizationCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeveloperProfile whereBrandColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeveloperProfile whereBrandName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeveloperProfile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeveloperProfile whereFooterText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeveloperProfile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeveloperProfile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeveloperProfile whereUserId($value)
 * @method static \Database\Factories\DeveloperProfileFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class DeveloperProfile extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'brand_name',
        'brand_color',
        'footer_text',
        'authorization_code',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'authorization_code' => 'encrypted',
    ];

    /**
     * Get the user that owns the developer profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the API keys for the developer profile.
     */
    public function apiKeys(): HasOne
    {
        return $this->hasOne(ApiKey::class);
    }
}