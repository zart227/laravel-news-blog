<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\ArticleView;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StatisticsController extends Controller
{
    public function index(Request $request)
    {
        $period = $request->get('period', 'week');
        $endDate = now();
        $startDate = $this->getStartDate($period);

        return response()->json([
            'summary' => $this->getSummaryStats(),
            'views' => $this->getViewsStats($startDate, $endDate),
            'comments' => $this->getCommentsStats($startDate, $endDate),
            'popular_articles' => $this->getPopularArticles(),
            'active_users' => $this->getActiveUsers(),
        ]);
    }

    private function getStartDate($period)
    {
        return match($period) {
            'week' => now()->subWeek(),
            'month' => now()->subMonth(),
            'year' => now()->subYear(),
            default => now()->subWeek(),
        };
    }

    private function getSummaryStats()
    {
        return [
            'total_articles' => Article::count(),
            'published_articles' => Article::where('status', 'published')->count(),
            'total_views' => ArticleView::count(),
            'total_comments' => Comment::count(),
            'unique_viewers' => ArticleView::distinct('ip_address')->count(),
        ];
    }

    private function getViewsStats($startDate, $endDate)
    {
        return ArticleView::select(
            DB::raw('DATE(viewed_at) as date'),
            DB::raw('COUNT(*) as views'),
            DB::raw('COUNT(DISTINCT ip_address) as unique_views')
        )
            ->whereBetween('viewed_at', [$startDate, $endDate])
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => $item->date,
                    'views' => $item->views,
                    'unique_views' => $item->unique_views,
                ];
            });
    }

    private function getCommentsStats($startDate, $endDate)
    {
        return Comment::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('COUNT(*) as count')
        )
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('date')
            ->orderBy('date')
            ->get();
    }

    private function getPopularArticles()
    {
        return Article::withCount(['views', 'comments'])
            ->with('user')
            ->orderByDesc('views_count')
            ->limit(5)
            ->get()
            ->map(function ($article) {
                return [
                    'id' => $article->id,
                    'title' => $article->title,
                    'author' => $article->user->name,
                    'views' => $article->views_count,
                    'comments' => $article->comments_count,
                ];
            });
    }

    private function getActiveUsers()
    {
        return Comment::select('user_id')
            ->with('user:id,name')
            ->selectRaw('COUNT(*) as comments_count')
            ->whereNotNull('user_id')
            ->groupBy('user_id')
            ->orderByDesc('comments_count')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'user' => $item->user->name,
                    'comments' => $item->comments_count,
                ];
            });
    }
} 