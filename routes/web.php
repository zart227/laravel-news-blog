<?php

use App\Http\Controllers\Web\ArticleController;
use App\Http\Controllers\Web\TagController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\StatisticsController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\WebSocketTestController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Публичные маршруты
Route::get('/', [ArticleController::class, 'index'])->name('home');
Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
Route::get('/articles/{article:slug}', [ArticleController::class, 'show'])->name('articles.show');
Route::get('/tags', [TagController::class, 'index'])->name('tags.index');
Route::get('/tags/{tag:slug}', [TagController::class, 'show'])->name('tags.show');

// Маршруты аутентификации
Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
    
    Route::get('/auth-test', function () {
        return Inertia::render('Auth/Test');
    })->name('auth.test');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::put('/password', [ProfileController::class, 'updatePassword'])->name('password.update');

    // Маршруты для администраторов
    Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
        // Панель администратора
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

        // Статьи
        Route::middleware(['can:articles.view'])->group(function () {
            Route::get('/articles', [ArticleController::class, 'adminIndex'])->name('admin.articles.index');
        });

        Route::middleware(['can:articles.create'])->group(function () {
            Route::get('/articles/create', [ArticleController::class, 'create'])->name('admin.articles.create');
            Route::post('/articles', [ArticleController::class, 'store'])->name('admin.articles.store');
        });

        Route::middleware(['can:articles.update'])->group(function () {
            Route::get('/articles/{article}/edit', [ArticleController::class, 'edit'])->name('admin.articles.edit');
            Route::put('/articles/{article}', [ArticleController::class, 'update'])->name('admin.articles.update');
        });

        Route::middleware(['can:articles.delete'])->delete('/articles/{article}', [ArticleController::class, 'destroy'])->name('admin.articles.destroy');
        
        // Теги
        Route::middleware(['can:tags.view'])->group(function () {
            Route::get('/tags', [TagController::class, 'adminIndex'])->name('admin.tags.index');
        });

        Route::middleware(['can:tags.create'])->group(function () {
            Route::get('/tags/create', [TagController::class, 'create'])->name('admin.tags.create');
            Route::post('/tags', [TagController::class, 'store'])->name('admin.tags.store');
        });

        Route::middleware(['can:tags.update'])->group(function () {
            Route::get('/tags/{tag}/edit', [TagController::class, 'edit'])->name('admin.tags.edit');
            Route::put('/tags/{tag}', [TagController::class, 'update'])->name('admin.tags.update');
        });

        Route::middleware(['can:tags.delete'])->delete('/tags/{tag}', [TagController::class, 'destroy'])->name('admin.tags.destroy');

        // Статистика
        Route::middleware(['verified', 'can:statistics.view'])->get('/statistics', [StatisticsController::class, 'index'])->name('admin.statistics');
    });
});

Route::get('/websocket-test', [WebSocketTestController::class, 'index'])->name('websocket.test');
Route::post('/websocket-test/send', [WebSocketTestController::class, 'sendMessage'])->name('websocket.send');

// Fallback route для обработки 404 ошибок
Route::fallback(function () {
    return Inertia::render('Error/Error', ['status' => 404]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn () => view('dashboard'))->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/like', [LikeController::class, 'toggleLike'])->name('like.toggle');
    Route::post('/dislike', [LikeController::class, 'toggleDislike'])->name('dislike.toggle');
});
