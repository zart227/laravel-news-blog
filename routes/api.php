<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\ArticleViewController;
use App\Http\Controllers\StatisticsController;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;

Route::middleware(['throttle:api'])->group(function () {
    Route::get('articles', [ArticleController::class, 'index']);
    Route::get('articles/{article:slug}/comments', [CommentController::class, 'index']);
    Route::post('articles/{article:slug}/views', [ArticleViewController::class, 'store']);
});

Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
    Route::apiResource('articles', ArticleController::class)
        ->except(['index', 'show'])
        ->parameters(['article' => 'article:slug']);

    Route::middleware('can:admin')->group(function () {
        Route::apiResource('tags', TagController::class)->names([
            'index' => 'api.tags.index',
            'store' => 'api.tags.store',
            'show' => 'api.tags.show',
            'update' => 'api.tags.update',
            'destroy' => 'api.tags.destroy',
        ]);
        Route::get('statistics', [StatisticsController::class, 'index']);
    });

    Route::post('articles/{article:slug}/comments', [CommentController::class, 'store']);
    Route::patch('comments/{comment}', [CommentController::class, 'update']);
    Route::delete('comments/{comment}', [CommentController::class, 'destroy']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Настройка rate limiting
RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
});
