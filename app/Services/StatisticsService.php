<?php

namespace App\Services;

use App\Models\Article;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Statistics;
use Carbon\CarbonImmutable;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use MongoDB\BSON\UTCDateTime;

class StatisticsService
{
    public const TIMEZONE = 'Europe/Moscow';

    private const TYPE_MAP = ['root' => 'array', 'document' => 'array', 'array' => 'array'];

    public static function invalidateCache(): void
    {
        foreach (['week', 'month', 'year'] as $period) {
            Cache::forget('statistics:'.$period);
        }
    }

    public function getReport(string $period = 'week'): array
    {
        return [
            'summary' => $this->getSummary($period),
            'activity' => $this->getActivity($period),
            'popular' => $this->getPopularArticles(5),
            'browsers' => $this->getTop('user_agents'),
            'referrers' => $this->getTop('referrers'),
        ];
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

    public function getPopularArticles(int $limit = 5): array
    {
        // One Mongo query and one SQL query, regardless of the number of articles.
        $stats = Statistics::orderBy('views', 'desc')->orderBy('article_id')->limit($limit)->get();
        $articles = Article::whereIn('id', $stats->pluck('article_id')->all())
            ->withCount(['likes', 'comments'])->get()->keyBy('id');

        return $stats->filter(fn ($stat) => $articles->has($stat->article_id))
            ->map(function ($stat) use ($articles) {
                $article = $articles[$stat->article_id];

                return [
                    'id' => $article->id, 'title' => $article->title, 'slug' => $article->slug,
                    'views' => (int) $stat->views, 'unique_views' => (int) $stat->unique_views,
                    'likes' => $article->likes_count, 'comments' => $article->comments_count,
                ];
            })->values()->all();
    }

    public function getTop(string $field, int $limit = 5): array
    {
        if (! in_array($field, ['user_agents', 'referrers'], true)) {
            throw new \InvalidArgumentException('Unknown statistics dimension');
        }

        // Support existing map-shaped aggregates as well as new {name, count} arrays.
        return $this->aggregate('statistics', [
            ['$project' => ['buckets' => ['$cond' => [
                ['$isArray' => '$'.$field], '$'.$field,
                ['$map' => [
                    'input' => ['$objectToArray' => ['$ifNull' => ['$'.$field, new \stdClass]]],
                    'as' => 'entry', 'in' => ['name' => '$$entry.k', 'count' => '$$entry.v'],
                ]],
            ]]]],
            ['$unwind' => '$buckets'],
            ['$group' => ['_id' => '$buckets.name', 'count' => ['$sum' => '$buckets.count']]],
            ['$sort' => ['count' => -1, '_id' => 1]],
            ['$limit' => $limit],
            ['$project' => ['_id' => 0, 'name' => '$_id', 'count' => 1]],
        ]);
    }

    public function getSummary(string $period): array
    {
        [$start, $end] = $this->range($period);
        $stats = $this->aggregate('article_view_events', [
            ['$match' => $this->dateMatch($start, $end)],
            ['$group' => ['_id' => null, 'views' => ['$sum' => 1], 'visitors' => ['$addToSet' => '$ip_hash']]],
            ['$project' => ['views' => 1, 'unique_views' => ['$size' => '$visitors']]],
        ])[0] ?? ['views' => 0, 'unique_views' => 0];

        return [
            'total_views' => (int) $stats['views'],
            'unique_viewers' => (int) $stats['unique_views'],
            'total_likes' => Like::where('is_dislike', false)
                ->where('created_at', '>=', $start->utc())->where('created_at', '<', $end->utc())->count(),
            'total_comments' => Comment::where('created_at', '>=', $start->utc())
                ->where('created_at', '<', $end->utc())->count(),
        ];
    }

    public function getActivity(string $period = 'week'): array
    {
        [$start, $end] = $this->range($period);
        $trunc = ['date' => '$viewed_at', 'unit' => $period === 'year' ? 'week' : 'day',
            'timezone' => self::TIMEZONE];
        if ($period === 'year') {
            $trunc['startOfWeek'] = 'monday';
        }
        $views = collect($this->aggregate('article_view_events', [
            ['$match' => $this->dateMatch($start, $end)],
            ['$group' => ['_id' => ['$dateTrunc' => $trunc],
                'views' => ['$sum' => 1], 'visitors' => ['$addToSet' => '$ip_hash']]],
            ['$project' => ['_id' => 0,
                'date' => ['$dateToString' => ['date' => '$_id', 'format' => '%Y-%m-%d', 'timezone' => self::TIMEZONE]],
                'views' => 1, 'unique_views' => ['$size' => '$visitors']]],
        ]))->keyBy('date');

        // SQL timestamps are stored in UTC. A fixed +03:00 offset needs no MySQL timezone tables.
        $dateSql = DB::connection()->getDriverName() === 'sqlite'
            ? "DATE(created_at, '+3 hours')" : 'DATE(DATE_ADD(created_at, INTERVAL 3 HOUR))';
        $comments = Comment::selectRaw($dateSql.' AS date, COUNT(*) AS count')
            ->where('created_at', '>=', $start->utc())->where('created_at', '<', $end->utc())
            ->groupByRaw($dateSql)->get();
        $commentCounts = [];
        foreach ($comments as $row) {
            $day = CarbonImmutable::parse($row->date, self::TIMEZONE);
            $key = ($period === 'year' ? $day->startOfWeek() : $day)->toDateString();
            $commentCounts[$key] = ($commentCounts[$key] ?? 0) + (int) $row->count;
        }

        $series = [];
        $cursor = $period === 'year' ? $start->startOfWeek() : $start;
        while ($cursor < $end) {
            $key = $cursor->toDateString();
            $series[] = [
                'date' => $key, 'views' => (int) ($views[$key]['views'] ?? 0),
                'unique_views' => (int) ($views[$key]['unique_views'] ?? 0),
                'comments' => $commentCounts[$key] ?? 0,
            ];
            $cursor = $period === 'year' ? $cursor->addWeek() : $cursor->addDay();
        }

        return $series;
    }

    public function range(string $period): array
    {
        $today = CarbonImmutable::now(self::TIMEZONE)->startOfDay();
        $start = match ($period) {
            'week' => $today->subDays(6),
            'month' => $today->subMonthNoOverflow()->addDay(),
            'year' => $today->subYearNoOverflow()->addDay(),
            default => throw new \InvalidArgumentException('Unknown reporting period'),
        };

        return [$start, $today->addDay()];
    }

    private function dateMatch(CarbonImmutable $start, CarbonImmutable $end): array
    {
        return ['viewed_at' => ['$gte' => new UTCDateTime($start), '$lt' => new UTCDateTime($end)]];
    }

    private function aggregate(string $collection, array $pipeline): array
    {
        return DB::connection('mongodb')->getCollection($collection)
            ->aggregate($pipeline, ['typeMap' => self::TYPE_MAP])->toArray();
    }
}
