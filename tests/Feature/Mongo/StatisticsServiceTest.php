<?php

namespace Tests\Feature\Mongo;

use App\Models\Article;
use App\Models\Comment;
use App\Services\StatisticsService;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\DB;
use MongoDB\BSON\UTCDateTime;
use PHPUnit\Framework\Attributes\Group;
use Tests\Support\MongoQueryCounter;
use Tests\Support\UsesMongo;
use Tests\TestCase;

#[Group('mongo')]
class StatisticsServiceTest extends TestCase
{
    use UsesMongo { tearDown as private tearDownMongo; }

    protected function setUp(): void
    {
        parent::setUp();
        $this->prepareMongo();
        CarbonImmutable::setTestNow(CarbonImmutable::parse('2025-03-10 12:00:00', 'Europe/Moscow'));
    }

    protected function tearDown(): void
    {
        CarbonImmutable::setTestNow();
        $this->tearDownMongo();
    }

    private function event(string $date, string $ip): void
    {
        DB::connection('mongodb')->getCollection('article_view_events')->insertOne([
            'article_id' => 1, 'ip_hash' => $ip,
            'viewed_at' => new UTCDateTime(CarbonImmutable::parse($date, 'UTC')),
        ]);
    }

    public function test_activity_fills_gaps_and_merges_sql_comments_in_moscow_timezone(): void
    {
        $this->event('2025-03-04 21:01:00', 'one'); // March 5 in Moscow.
        $this->event('2025-03-05 08:00:00', 'one');
        $this->event('2025-03-05 09:00:00', 'two');
        $this->event('2025-03-03 20:59:59', 'outside');
        $this->event('2025-03-10 21:00:00', 'future');
        Comment::factory()->create(['created_at' => '2025-03-04 21:30:00']);
        Comment::factory()->create(['created_at' => '2025-03-06 10:00:00']);
        $rows = app(StatisticsService::class)->getActivity('week');
        $this->assertCount(7, $rows);
        $days = collect($rows)->keyBy('date');
        $this->assertSame(['date' => '2025-03-05', 'views' => 3, 'unique_views' => 2, 'comments' => 1], $days['2025-03-05']);
        $this->assertSame(1, $days['2025-03-06']['comments']);
        $this->assertSame(['date' => '2025-03-07', 'views' => 0, 'unique_views' => 0, 'comments' => 0], $days['2025-03-07']);
        $summary = app(StatisticsService::class)->getSummary('week');
        $this->assertSame(3, $summary['total_views']);
        $this->assertSame(2, $summary['unique_viewers']);
        $this->assertSame(2, $summary['total_comments']);
    }

    public function test_year_uses_monday_weeks_for_both_databases(): void
    {
        $this->event('2025-03-04 21:01:00', 'one');
        $this->event('2025-03-06 10:00:00', 'one');
        Comment::factory()->create(['created_at' => '2025-03-04 21:30:00']);
        $rows = collect(app(StatisticsService::class)->getActivity('year'))->keyBy('date');
        $this->assertSame(2, $rows['2025-03-03']['views']);
        $this->assertSame(1, $rows['2025-03-03']['unique_views']);
        $this->assertSame(1, $rows['2025-03-03']['comments']);
        $this->assertGreaterThanOrEqual(52, $rows->count());
    }

    public function test_month_has_a_complete_zero_filled_series(): void
    {
        $rows = app(StatisticsService::class)->getActivity('month');
        $this->assertSame('2025-02-11', $rows[0]['date']);
        $this->assertSame('2025-03-10', end($rows)['date']);
        $this->assertCount(28, $rows);
        $this->assertSame(0, array_sum(array_column($rows, 'views')));
    }

    public function test_browser_and_referrer_ranking_sums_bucket_counts(): void
    {
        $collection = DB::connection('mongodb')->getCollection('statistics');
        $collection->insertMany([
            ['article_id' => 1, 'user_agents' => [['name' => 'Chrome', 'count' => 9], ['name' => 'Firefox', 'count' => 4]],
                'referrers' => [['name' => 'news.example.com', 'count' => 7]]],
            ['article_id' => 2, 'user_agents' => [['name' => 'Chrome', 'count' => 3]],
                'referrers' => [['name' => 'news.example.com', 'count' => 2]]],
            ['article_id' => 3, 'user_agents' => ['Chrome' => 2], 'referrers' => ['legacy.example.com' => 1]],
        ]);
        $service = app(StatisticsService::class);
        $this->assertEquals(['name' => 'Chrome', 'count' => 14], $service->getTop('user_agents')[0]);
        $this->assertEquals(['name' => 'news.example.com', 'count' => 9], $service->getTop('referrers')[0]);
    }

    public function test_admin_api_combines_real_mongo_events_and_sql_content(): void
    {
        $article = Article::factory()->create();
        $user = \App\Models\User::factory()->create(['role' => \App\Enums\UserRole::ADMIN]);
        $this->event('2025-03-05 10:00:00', 'viewer');
        Comment::factory()->create(['article_id' => $article->id, 'created_at' => '2025-03-05 10:00:00']);
        $like = \App\Models\Like::create([
            'user_id' => $user->id, 'likeable_type' => Article::class, 'likeable_id' => $article->id,
            'is_dislike' => false, 'created_at' => '2025-03-05 10:00:00',
        ]);
        $like->forceFill(['created_at' => '2025-03-05 10:00:00'])->save();
        $this->actingAs($user)->getJson('/api/statistics?period=week')->assertOk()
            ->assertJsonPath('summary.total_views', 1)->assertJsonPath('summary.unique_viewers', 1)
            ->assertJsonPath('summary.total_likes', 1)->assertJsonPath('summary.total_comments', 1)
            ->assertJsonCount(7, 'activity')->assertJsonStructure(['summary', 'activity', 'popular']);
    }

    public function test_popular_articles_and_card_counts_use_fixed_query_counts(): void
    {
        $articles = Article::factory()->count(5)->create();
        foreach ($articles as $i => $article) {
            DB::connection('mongodb')->getCollection('statistics')->insertOne([
                'article_id' => $article->id, 'views' => $i + 1, 'unique_views' => 1,
            ]);
        }
        $counter = new MongoQueryCounter;
        \MongoDB\Driver\Monitoring\addSubscriber($counter);
        DB::connection()->enableQueryLog();
        DB::connection()->flushQueryLog();
        try {
            $popular = app(StatisticsService::class)->getPopularArticles(5);
            $this->assertCount(5, $popular);
            $this->assertSame(5, $popular[0]['views']);
            $this->assertSame(1, $counter->queries);
            $this->assertCount(1, DB::connection()->getQueryLog());
            $counter->queries = 0;
            app(StatisticsService::class)->attachViewCounts($articles);
            $this->assertSame(1, $counter->queries);
        } finally {
            \MongoDB\Driver\Monitoring\removeSubscriber($counter);
            DB::connection()->disableQueryLog();
        }
    }
}
