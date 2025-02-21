<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AdminArticleController;
use App\Models\Article;
use App\Models\Tag;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('ArticlesList');
})->name('home');

Route::get('/articles', function () {
    return Inertia::render('ArticlesList');
})->name('articles.index');

Route::get('/articles/{article}', function ($article) {
    return Inertia::render('Article', [
        'articleId' => $article
    ]);
})->name('articles.show');

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/articles', function () {
        return Inertia::render('Admin/ArticleManager', [
            'tags' => Tag::all(),
        ]);
    })->name('admin.articles');

    Route::get('/admin/articles/create', function () {
        return Inertia::render('Admin/ArticleForm', [
            'availableTags' => Tag::all(),
        ]);
    })->name('admin.articles.create');

    Route::get('/admin/articles/{article}/edit', function (Article $article) {
        return Inertia::render('Admin/ArticleForm', [
            'article' => $article->load('tags'),
            'availableTags' => Tag::all(),
        ]);
    })->name('admin.articles.edit');

    Route::get('/statistics', function () {
        return Inertia::render('Admin/Statistics');
    })->name('admin.statistics');
});
