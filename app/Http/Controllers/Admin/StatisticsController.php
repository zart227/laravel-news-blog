<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Tag;
use App\Models\User;
use App\Models\ArticleView;
use App\Models\Like;
use App\Models\Comment;
use Inertia\Inertia;

class StatisticsController extends Controller
{
    public function index()
    {
        // Получаем общую статистику
        $totalArticles = Article::count();
        $totalViews = ArticleView::sum('view_count');
        $totalLikes = Like::where('is_dislike', false)->count();
        $totalComments = Comment::count();

        // Получаем популярные статьи
        $popularArticles = Article::select('articles.*')
            ->withCount(['views', 'likes', 'comments'])
            ->orderByDesc('views_count')
            ->limit(5)
            ->get()
            ->map(fn($article) => [
                'id' => $article->id,
                'title' => $article->title,
                'views' => $article->views_count,
                'likes' => $article->likes_count,
                'comments' => $article->comments_count,
            ]);

        return Inertia::render('Admin/Statistics/Index', [
            'totalArticles' => $totalArticles,
            'totalViews' => $totalViews,
            'totalLikes' => $totalLikes,
            'totalComments' => $totalComments,
            'popularArticles' => $popularArticles
        ]);
    }
} 