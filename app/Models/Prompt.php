<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Prompt
 *
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string $content
 * @property string $mode
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Prompt newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Prompt newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Prompt query()
 * @method static \Illuminate\Database\Eloquent\Builder|Prompt whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prompt whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prompt whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prompt whereMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prompt whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prompt whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prompt whereUserId($value)
 * @method static \Database\Factories\PromptFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Prompt extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'content',
        'mode',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the prompt.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}