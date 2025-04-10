<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Домашняя страница для авторизованных пользователей
     */
    public const HOME = '/';

    /**
     * Все связывания контейнера, которые должны быть зарегистрированы.
     *
     * @var array
     */
    public $bindings = [
        // ServerProvider::class => DigitalOceanServerProvider::class,
    ];

    /**
     * Все синглтоны контейнера, которые должны быть зарегистрированы.
     *
     * @var array
     */
    public $singletons = [
        // DowntimeNotifier::class => PingdomDowntimeNotifier::class,
    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Настройка URL для локальной среды
        if ($this->app->environment('local')) {
            URL::forceScheme('http');
            
            // Настройка Vite
            Vite::useScriptTagAttributes([
                'type' => 'module',
            ]);

            // Настройка хоста для Vite
            Vite::useBuildDirectory('build');
            Vite::useHotFile(public_path('hot'));
            Vite::useManifestFilename('manifest.json');
            
            // Принудительно устанавливаем URL для dev-сервера Vite
            config([
                'vite.configs.default.dev_server.url' => env('VITE_DEV_SERVER_URL', 'http://127.0.0.1:5173'),
                'vite.configs.default.dev_server.host' => '0.0.0.0',
            ]);
        }

        // Регистрация политик авторизации
        Gate::define('admin', function ($user) {
            return $user->role === 'admin';
        });

        // Привязка моделей к маршрутам
        Route::model('article', \App\Models\Article::class);
        Route::model('tag', \App\Models\Tag::class);
    }
}
