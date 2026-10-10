<?php

namespace App\Services;

use App\Models\Article;
use App\Models\Statistics;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class StatisticsService
{
    public static function invalidateCache(): void
    {
        foreach (['week', 'month', 'year'] as $period) {
            Cache::forget('statistics:'.$period);
        }
    }

    public function attachViewCounts(Collection $articles): void
    {
        if ($articles->isEmpty()) {
            return;
        }
        $counts = Statistics::whereIn('article_id', $articles->pluck('id')->map(fn ($id) => (int) $id)->all())
            ->pluck('views', 'article_id');
        foreach ($articles as $article) {
            $article->setAttribute('views_count', (int) ($counts[$article->id] ?? 0));
        }
    }

    public function getArticleStatistics(Article $article): ?Statistics
    {
        return Statistics::where('article_id', (int) $article->id)->first();
    }

}
