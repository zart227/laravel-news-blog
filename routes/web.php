<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Models\Article;
use App\Models\Tag;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Маршруты аутентификации
Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});

// Публичные маршруты
Route::get('/', [ArticleController::class, 'index'])->name('articles.index');
Route::get('/articles/{article}', [ArticleController::class, 'show'])->name('articles.show');
Route::get('/tags', [TagController::class, 'index'])->name('tags.index');
Route::get('/tags/{tag}', [TagController::class, 'show'])->name('tags.show');

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/articles', [ArticleController::class, 'adminIndex'])->name('admin.articles');
    Route::get('/admin/articles/create', [ArticleController::class, 'create'])->name('admin.articles.create');
    Route::post('/admin/articles', [ArticleController::class, 'store'])->name('admin.articles.store');
    Route::get('/admin/articles/{article}/edit', [ArticleController::class, 'edit'])->name('admin.articles.edit');
    Route::put('/admin/articles/{article}', [ArticleController::class, 'update'])->name('admin.articles.update');
    Route::delete('/admin/articles/{article}', [ArticleController::class, 'destroy'])->name('admin.articles.destroy');

    Route::get('/admin/statistics', [StatisticsController::class, 'index'])->name('admin.statistics');
});
