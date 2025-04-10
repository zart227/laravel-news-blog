<?php

namespace App\Policies;

use App\Models\Article;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ArticlePolicy
{
    use HandlesAuthorization;

    public function viewAny(?User $user): bool
    {
        return true; // Разрешаем всем просматривать список статей
    }

    public function view(?User $user, Article $article): bool
    {
        if ($article->status === 'published') {
            return true;
        }

        return $user && ($user->isAdmin() || $article->user_id === $user->id);
    }

    public function create(User $user): bool
    {
        return $user->hasPermission('articles.create');
    }

    public function update(User $user, Article $article): bool
    {
        return $user->hasPermission('articles.update') &&
            ($user->isAdmin() || $article->user_id === $user->id);
    }

    public function delete(User $user, Article $article): bool
    {
        return $user->hasPermission('articles.delete') &&
            ($user->isAdmin() || $article->user_id === $user->id);
    }

    public function restore(User $user, Article $article): bool
    {
        return $user->isAdmin();
    }

    public function forceDelete(User $user, Article $article): bool
    {
        return $user->isAdmin();
    }

    public function comment(User $user, Article $article): bool
    {
        return $user->hasPermission('articles.comment');
    }
} 