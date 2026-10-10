<?php

namespace App\Services;

use App\Events\StatisticsUpdated;
use App\Models\Article;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use MongoDB\BSON\UTCDateTime;
use MongoDB\Collection;
use MongoDB\Driver\Exception\BulkWriteException;

class ViewTracker
{
    public function track(Article $article, Request $request, ?CarbonImmutable $at = null): array
    {
        $at ??= CarbonImmutable::now('Europe/Moscow');
        $ipHash = hash('sha256', $request->ip().config('app.key'));
        $viewer = $request->user() ? 'user:'.$request->user()->id : 'ip:'.$ipHash;
        $browser = $this->browserFamily($request->userAgent() ?? '');
        $host = parse_url($request->header('referer', ''), PHP_URL_HOST);
        $host = is_string($host) ? strtolower($host) : null;
        $date = new UTCDateTime($at);
        $articleId = (int) $article->id;

        $db = DB::connection('mongodb');
        $db->getCollection('article_view_events')->insertOne([
            'article_id' => $articleId,
            'user_id' => $request->user()?->id,
            'ip_hash' => $ipHash,
            'user_agent_family' => $browser,
            'referrer_host' => $host,
            'viewed_at' => $date,
        ]);

        // The unique _id makes the daily claim safe under concurrent requests.
        $daily = $db->getCollection('article_view_daily');
        $key = hash('sha256', $articleId.'|'.$at->setTimezone('Europe/Moscow')->toDateString().'|'.$viewer);
        try {
            $claim = $daily->updateOne(['_id' => $key], ['$setOnInsert' => [
                'article_id' => $articleId, 'viewed_at' => $date,
            ]], ['upsert' => true]);
            $unique = $claim->getUpsertedCount();
        } catch (BulkWriteException $e) {
            if ($e->getCode() !== 11000) {
                throw $e;
            }
            $unique = 0;
        }

        $collection = $db->getCollection('statistics');
        $update = [
            '$inc' => ['views' => 1, 'unique_views' => $unique],
            '$set' => ['updated_at' => $date],
            '$setOnInsert' => [
                '_id' => 'article:'.$articleId, 'article_id' => $articleId,
                'created_at' => $date, 'user_agents' => [], 'referrers' => [],
            ],
        ];
        try {
            $collection->updateOne(['article_id' => $articleId], $update, ['upsert' => true]);
        } catch (BulkWriteException $e) {
            if ($e->getCode() !== 11000) {
                throw $e;
            }
            // Another request created the aggregate; retry the same increment.
            unset($update['$setOnInsert']);
            $collection->updateOne(['article_id' => $articleId], $update);
        }
        $this->incrementBucket($collection, $articleId, 'user_agents', $browser);
        if ($host !== null) {
            $this->incrementBucket($collection, $articleId, 'referrers', $host);
        }

        $stat = $collection->findOne(['article_id' => $articleId]);
        StatisticsService::invalidateCache();
        StatisticsUpdated::dispatch($articleId, 'views', (int) $stat['views']);

        return ['views' => (int) $stat['views'], 'unique_views' => (int) $stat['unique_views']];
    }

    private function incrementBucket(Collection $collection, int $id, string $field, string $name): void
    {
        $filter = ['article_id' => $id, $field.'.name' => $name];
        $update = ['$inc' => [$field.'.$.count' => 1]];
        if ($collection->updateOne($filter, $update)->getMatchedCount() === 0) {
            $insert = $collection->updateOne(
                ['article_id' => $id, $field.'.name' => ['$ne' => $name]],
                ['$push' => [$field => ['name' => $name, 'count' => 1]]],
            );
            if ($insert->getMatchedCount() === 0) {
                // A concurrent request inserted this bucket between the two updates.
                $collection->updateOne($filter, $update);
            }
        }
    }

    public function browserFamily(string $agent): string
    {
        foreach (['Edge' => '/Edg(e|A|iOS)?\//i', 'Opera' => '/(OPR|Opera)\//i',
            'Firefox' => '/(Firefox|FxiOS)\//i', 'Chrome' => '/(Chrome|CriOS)\//i',
            'Safari' => '/Safari\//i'] as $family => $pattern) {
            if (preg_match($pattern, $agent)) {
                return $family;
            }
        }

        return 'Other';
    }
}
