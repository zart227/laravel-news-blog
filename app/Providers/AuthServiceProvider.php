<?php

namespace App\Providers;

use App\Enums\UserRole;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\Article;
use App\Policies\ArticlePolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Article::class => ArticlePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Gate::before(function ($user, $ability) {
            if ($user->isAdmin()) {
                return true;
            }
            return null;
        });

        Gate::define('admin', function ($user) {
            return $user->isAdmin();
        });

        // Определяем разрешения для всех действий
        Gate::define('articles.*', function ($user) {
            return $user->hasPermission('articles.*');
        });

        Gate::define('articles.view', function ($user) {
            return $user->hasPermission('articles.view');
        });

        Gate::define('articles.create', function ($user) {
            return $user->hasPermission('articles.create');
        });

        Gate::define('articles.update', function ($user) {
            return $user->hasPermission('articles.update');
        });

        Gate::define('articles.delete', function ($user) {
            return $user->hasPermission('articles.delete');
        });

        Gate::define('tags.*', function ($user) {
            return $user->hasPermission('tags.*');
        });

        Gate::define('tags.view', function ($user) {
            return $user->hasPermission('tags.view');
        });

        Gate::define('tags.create', function ($user) {
            return $user->hasPermission('tags.create');
        });

        Gate::define('tags.update', function ($user) {
            return $user->hasPermission('tags.update');
        });

        Gate::define('tags.delete', function ($user) {
            return $user->hasPermission('tags.delete');
        });

        Gate::define('statistics.view', function ($user) {
            return $user->hasPermission('statistics.view');
        });
    }
}
