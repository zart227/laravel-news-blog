<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StatisticsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Statistics', [
            'statistics' => [
                'totalArticles' => Article::count(),
                'publishedArticles' => Article::where('status', 'published')->count(),
                'draftArticles' => Article::where('status', 'draft')->count(),
                'totalTags' => Tag::count(),
                'totalUsers' => User::count(),
                'popularTags' => Tag::withCount('articles')
                    ->orderByDesc('articles_count')
                    ->take(5)
                    ->get(),
                'recentArticles' => Article::with('author')
                    ->latest()
                    ->take(5)
                    ->get()
            ]
        ]);
    }
} 