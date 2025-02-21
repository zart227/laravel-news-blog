<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\ArticleViewController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\StatisticsController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    // Публичные роуты с кастомным rate limiting
    Route::middleware(['custom.throttle'])->group(function () {
        Route::get('articles', [ArticleController::class, 'index']);
        Route::get('articles/{article}', [ArticleController::class, 'show']);
        Route::get('articles/{article}/comments', [CommentController::class, 'index']);
        Route::post('articles/{article}/views', [ArticleViewController::class, 'store']);
    });

    // Защищенные роуты
    Route::middleware(['auth:sanctum', 'custom.throttle'])->group(function () {
        // Роуты для администратора
        Route::middleware('can:admin')->group(function () {
            Route::apiResource('articles', ArticleController::class)->except(['index', 'show']);
            Route::apiResource('tags', TagController::class);
            Route::get('statistics', [StatisticsController::class, 'index']);
        });

        // Роуты для комментариев (для авторизованных пользователей)
        Route::post('articles/{article}/comments', [CommentController::class, 'store']);
        Route::patch('comments/{comment}', [CommentController::class, 'update']);
        Route::delete('comments/{comment}', [CommentController::class, 'destroy']);
    });
}); 