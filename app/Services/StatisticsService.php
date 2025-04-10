<?php

namespace App\Services;

use App\Models\Statistics;
use App\Models\Article;
use Illuminate\Support\Facades\Request;

class StatisticsService
{
    public function recordView(Article $article)
    {
        $statistics = Statistics::firstOrNew(['article_id' => $article->id]);
        
        $statistics->views = ($statistics->views ?? 0) + 1;
        
        // Записываем уникальные просмотры по IP
        $ip = Request::ip();
        $uniqueViewers = $statistics->unique_viewers ?? [];
        if (!in_array($ip, $uniqueViewers)) {
            $uniqueViewers[] = $ip;
            $statistics->unique_viewers = $uniqueViewers;
            $statistics->unique_views = count($uniqueViewers);
        }

        // Записываем информацию о браузере
        $userAgent = Request::userAgent();
        $userAgents = $statistics->user_agents ?? [];
        if (!isset($userAgents[$userAgent])) {
            $userAgents[$userAgent] = 0;
        }
        $userAgents[$userAgent]++;
        $statistics->user_agents = $userAgents;

        // Записываем реферер
        $referrer = Request::header('referer');
        if ($referrer) {
            $referrers = $statistics->referrers ?? [];
            if (!isset($referrers[$referrer])) {
                $referrers[$referrer] = 0;
            }
            $referrers[$referrer]++;
            $statistics->referrers = $referrers;
        }

        $statistics->save();

        return $statistics;
    }

    public function getArticleStatistics(Article $article)
    {
        return Statistics::where('article_id', $article->id)->first();
    }

    public function getPopularArticles($limit = 10)
    {
        return Statistics::orderBy('views', 'desc')
            ->take($limit)
            ->get()
            ->map(function ($stat) {
                return [
                    'article' => Article::find($stat->article_id),
                    'statistics' => $stat
                ];
            });
    }

    public function getTotalStatistics()
    {
        return [
            'total_views' => Statistics::sum('views'),
            'total_unique_views' => Statistics::sum('unique_views'),
            'average_views_per_article' => Statistics::avg('views'),
            'most_used_browsers' => Statistics::raw(function($collection) {
                return $collection->aggregate([
                    ['$unwind' => '$user_agents'],
                    ['$group' => [
                        '_id' => '$user_agents',
                        'count' => ['$sum' => 1]
                    ]],
                    ['$sort' => ['count' => -1]],
                    ['$limit' => 5]
                ]);
            }),
            'top_referrers' => Statistics::raw(function($collection) {
                return $collection->aggregate([
                    ['$unwind' => '$referrers'],
                    ['$group' => [
                        '_id' => '$referrers',
                        'count' => ['$sum' => 1]
                    ]],
                    ['$sort' => ['count' => -1]],
                    ['$limit' => 5]
                ]);
            })
        ];
    }
} 