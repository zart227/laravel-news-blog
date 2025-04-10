<?php

namespace App\Traits;

use App\Models\Like;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait Likeable
{
    public function likes(): MorphMany
    {
        return $this->morphMany(Like::class, 'likeable')->where('is_dislike', false);
    }

    public function dislikes(): MorphMany
    {
        return $this->morphMany(Like::class, 'likeable')->where('is_dislike', true);
    }

    public function allLikes(): MorphMany
    {
        return $this->morphMany(Like::class, 'likeable');
    }

    public function like(int $userId): void
    {
        $this->allLikes()->updateOrCreate(
            ['user_id' => $userId],
            ['is_dislike' => false]
        );
    }

    public function dislike(int $userId): void
    {
        $this->allLikes()->updateOrCreate(
            ['user_id' => $userId],
            ['is_dislike' => true]
        );
    }

    public function unlike(int $userId): void
    {
        $this->allLikes()->where('user_id', $userId)->delete();
    }

    public function isLikedBy(int $userId): bool
    {
        return $this->likes()->where('user_id', $userId)->exists();
    }

    public function isDislikedBy(int $userId): bool
    {
        return $this->dislikes()->where('user_id', $userId)->exists();
    }
} 