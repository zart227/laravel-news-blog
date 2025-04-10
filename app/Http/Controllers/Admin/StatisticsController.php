<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Tag;
use App\Models\User;
use App\Models\ArticleView;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class StatisticsController extends Controller
{
    public function index()
    {
        $now = Carbon::now();
        $lastMonth = $now->copy()->subMonth();

        // Получаем статистику просмотров
        $currentViews = ArticleView::whereMonth('created_at', $now->month)
            ->sum('view_count');
        $lastMonthViews = ArticleView::whereMonth('created_at', $lastMonth->month)
            ->sum('view_count');
        $viewsGrowth = $this->calculateGrowth($currentViews, $lastMonthViews);

        // Получаем статистику пользователей
        $currentUsers = User::whereMonth('created_at', $now->month)->count();
        $lastMonthUsers = User::whereMonth('created_at', $lastMonth->month)->count();
        $usersGrowth = $this->calculateGrowth($currentUsers, $lastMonthUsers);

        // Получаем статистику статей
        $currentArticles = Article::whereMonth('created_at', $now->month)->count();
        $lastMonthArticles = Article::whereMonth('created_at', $lastMonth->month)->count();
        $articlesGrowth = $this->calculateGrowth($currentArticles, $lastMonthArticles);

        // Получаем статистику тегов
        $currentTags = Tag::whereMonth('created_at', $now->month)->count();
        $lastMonthTags = Tag::whereMonth('created_at', $lastMonth->month)->count();
        $tagsGrowth = $this->calculateGrowth($currentTags, $lastMonthTags);

        // Получаем общее количество просмотров
        $totalViews = ArticleView::sum('view_count');

        return Inertia::render('Admin/Statistics/Index', [
            'statistics' => [
                'views' => [
                    'total' => $totalViews,
                    'growth' => $viewsGrowth,
                ],
                'users' => [
                    'total' => User::count(),
                    'growth' => $usersGrowth,
                ],
                'articles' => [
                    'total' => Article::count(),
                    'growth' => $articlesGrowth,
                ],
                'tags' => [
                    'total' => Tag::count(),
                    'growth' => $tagsGrowth,
                ],
            ],
            'popularArticles' => Article::select('articles.*')
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
                ])
        ]);
    }

    private function calculateGrowth(int $current, int $previous): float
    {
        if ($previous === 0) {
            return $current > 0 ? 100 : 0;
        }

        return round((($current - $previous) / $previous) * 100, 2);
    }

    public function indexOld(Request $request)
    {
        $period = $request->get('period', 'week');
        $startDate = $this->getStartDate($period);

        // Общая статистика
        $totalStats = $this->getTotalStats($startDate);
        
        // Статистика по статьям
        $articleStats = $this->getArticleStats($startDate);
        
        // Статистика по тегам
        $tagStats = $this->getTagStats();
        
        // Статистика по браузерам
        $browserStats = $this->getBrowserStats($startDate);
        
        // Источники трафика
        $referrerStats = $this->getReferrerStats($startDate);
        
        // Популярные статьи
        $popularArticles = $this->getPopularArticles($startDate);
        
        // Последние статьи
        $recentArticles = $this->getRecentArticles();

        return Inertia::render('Admin/Statistics', [
            'period' => $period,
            'totalStats' => $totalStats,
            'articleStats' => $articleStats,
            'tagStats' => $tagStats,
            'browserStats' => $browserStats,
            'referrerStats' => $referrerStats,
            'popularArticles' => $popularArticles,
            'recentArticles' => $recentArticles,
        ]);
    }

    private function getStartDate(string $period): Carbon
    {
        return match ($period) {
            'week' => now()->subWeek(),
            'month' => now()->subMonth(),
            'year' => now()->subYear(),
            default => now()->subWeek(),
        };
    }

    private function getTotalStats(Carbon $startDate): array
    {
        $viewsQuery = ArticleView::query()
            ->where('created_at', '>=', $startDate);

        return [
            'total_views' => $viewsQuery->count(),
            'unique_views' => $viewsQuery->distinct('ip', 'article_id')->count(),
            'avg_views_per_article' => round($viewsQuery->count() / Article::count(), 2),
            'total_articles' => Article::count(),
            'total_users' => User::count(),
        ];
    }

    private function getArticleStats(Carbon $startDate): array
    {
        return [
            'total' => Article::count(),
            'published' => Article::where('status', 'published')->count(),
            'draft' => Article::where('status', 'draft')->count(),
            'this_period' => Article::where('created_at', '>=', $startDate)->count(),
        ];
    }

    private function getTagStats(): array
    {
        return Tag::withCount('articles')
            ->orderByDesc('articles_count')
            ->limit(5)
            ->get()
            ->map(fn($tag) => [
                'name' => $tag->name,
                'articles_count' => $tag->articles_count,
            ])
            ->toArray();
    }

    private function getBrowserStats(Carbon $startDate): array
    {
        return ArticleView::select('browser', DB::raw('count(*) as count'))
            ->where('created_at', '>=', $startDate)
            ->groupBy('browser')
            ->orderByDesc('count')
            ->get()
            ->map(fn($stat) => [
                'browser' => $stat->browser,
                'count' => $stat->count,
            ])
            ->toArray();
    }

    private function getReferrerStats(Carbon $startDate): array
    {
        return ArticleView::select('referrer', DB::raw('count(*) as count'))
            ->where('created_at', '>=', $startDate)
            ->whereNotNull('referrer')
            ->groupBy('referrer')
            ->orderByDesc('count')
            ->limit(5)
            ->get()
            ->map(fn($stat) => [
                'referrer' => $stat->referrer,
                'count' => $stat->count,
            ])
            ->toArray();
    }

    private function getPopularArticles(Carbon $startDate): array
    {
        return Article::select('articles.*')
            ->withCount([
                'views' => fn($query) => $query->where('created_at', '>=', $startDate),
                'uniqueViews' => fn($query) => $query->where('created_at', '>=', $startDate)->distinct('ip'),
                'likes' => fn($query) => $query->where('created_at', '>=', $startDate),
                'comments' => fn($query) => $query->where('created_at', '>=', $startDate),
                'shares' => fn($query) => $query->where('created_at', '>=', $startDate),
            ])
            ->where('status', 'published')
            ->orderByDesc('views_count')
            ->limit(10)
            ->get()
            ->map(fn($article) => [
                'id' => $article->id,
                'title' => $article->title,
                'views' => $article->views_count,
                'unique_views' => $article->unique_views_count,
                'likes' => $article->likes_count,
                'comments' => $article->comments_count,
                'shares' => $article->shares_count,
            ])
            ->toArray();
    }

    private function getRecentArticles(): array
    {
        return Article::select('articles.*')
            ->withCount(['views', 'uniqueViews', 'likes', 'comments', 'shares'])
            ->where('status', 'published')
            ->orderByDesc('created_at')
            ->limit(10)
            ->get()
            ->map(fn($article) => [
                'id' => $article->id,
                'title' => $article->title,
                'created_at' => $article->created_at->format('Y-m-d H:i'),
                'views' => $article->views_count,
                'unique_views' => $article->unique_views_count,
                'likes' => $article->likes_count,
                'comments' => $article->comments_count,
                'shares' => $article->shares_count,
            ])
            ->toArray();
    }
} 