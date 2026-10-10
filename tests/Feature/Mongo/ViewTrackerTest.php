<?php

namespace Tests\Feature\Mongo;

use App\Events\StatisticsUpdated;
use App\Models\Article;
use App\Models\User;
use App\Services\StatisticsService;
use App\Services\ViewTracker;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use PHPUnit\Framework\Attributes\Group;
use Tests\Support\UsesMongo;
use Tests\TestCase;

#[Group('mongo')]
class ViewTrackerTest extends TestCase
{
    use UsesMongo;

    protected function setUp(): void
    {
        parent::setUp();
        $this->prepareMongo();
        Event::fake([StatisticsUpdated::class]);
    }

    private function request(string $ip = '192.0.2.1'): Request
    {
        return Request::create('/', 'GET', [], [], [], [
            'REMOTE_ADDR' => $ip, 'HTTP_USER_AGENT' => 'Chrome/123.0.0.0 Safari/537.36',
            'HTTP_REFERER' => 'https://news.example.com/story?private=1',
        ]);
    }

    public function test_repeated_views_are_counted_once_per_viewer_per_moscow_day(): void
    {
        $article = Article::factory()->create();
        $tracker = app(ViewTracker::class);
        $at = CarbonImmutable::parse('2025-03-01 23:59:00', 'Europe/Moscow');
        $tracker->track($article, $this->request(), $at);
        $stat = $tracker->track($article, $this->request(), $at);
        $this->assertSame(['views' => 2, 'unique_views' => 1], $stat);
        $stat = $tracker->track($article, $this->request(), $at->addMinutes(2));
        $this->assertSame(['views' => 3, 'unique_views' => 2], $stat);
        $event = DB::connection('mongodb')->getCollection('article_view_events')->findOne();
        $this->assertSame(hash('sha256', '192.0.2.1'.config('app.key')), $event['ip_hash']);
        $this->assertSame('Chrome', $event['user_agent_family']);
        $this->assertSame('news.example.com', $event['referrer_host']);
        $this->assertArrayNotHasKey('ip_address', (array) $event);
        Event::assertDispatched(StatisticsUpdated::class, 3);
    }

    public function test_authenticated_viewer_is_unique_across_ip_changes(): void
    {
        $article = Article::factory()->create();
        $user = User::factory()->create();
        foreach (['192.0.2.1', '192.0.2.2'] as $ip) {
            $request = $this->request($ip);
            $request->setUserResolver(fn () => $user);
            $stat = app(ViewTracker::class)->track($article, $request);
        }
        $this->assertSame(['views' => 2, 'unique_views' => 1], $stat);
    }

    public function test_atomic_increments_and_array_buckets_preserve_all_views(): void
    {
        $article = Article::factory()->create();
        $first = new ViewTracker;
        $second = new ViewTracker;
        for ($i = 0; $i < 20; $i++) {
            ($i % 2 ? $first : $second)->track($article, $this->request());
        }
        $stat = DB::connection('mongodb')->getCollection('statistics')->findOne(['article_id' => $article->id]);
        $this->assertSame(20, $stat['views']);
        $this->assertSame(1, $stat['unique_views']);
        $this->assertSame('news.example.com', $stat['referrers'][0]['name']);
        $this->assertSame(20, $stat['referrers'][0]['count']);
        $this->assertSame(20, $stat['user_agents'][0]['count']);
        $this->assertSame(0, $article->views()->count());
        $articles = collect([$article, Article::factory()->create()]);
        app(StatisticsService::class)->attachViewCounts($articles);
        $this->assertSame(20, $articles[0]->views_count);
        $this->assertSame(0, $articles[1]->views_count);
    }

    public function test_concurrent_writers_do_not_lose_views_or_duplicate_buckets(): void
    {
        $article = Article::factory()->create();
        $processes = [];
        for ($i = 0; $i < 6; $i++) {
            $process = new \Symfony\Component\Process\Process([
                PHP_BINARY, base_path('tests/Support/view-writer.php'),
                config('database.connections.mongodb.database'), (string) $article->id,
            ], base_path());
            $process->start();
            $processes[] = $process;
        }
        foreach ($processes as $process) {
            $process->wait();
            $this->assertTrue($process->isSuccessful(), $process->getErrorOutput().$process->getOutput());
        }
        $db = DB::connection('mongodb');
        $stat = $db->getCollection('statistics')->findOne(['article_id' => $article->id]);
        $this->assertSame(60, $stat['views']);
        $this->assertSame(1, $stat['unique_views']);
        $this->assertCount(1, $stat['user_agents']);
        $this->assertSame(60, $stat['user_agents'][0]['count']);
        $this->assertCount(1, $stat['referrers']);
        $this->assertSame(60, $stat['referrers'][0]['count']);
        $this->assertSame(60, $db->getCollection('article_view_events')->countDocuments());
    }

    public function test_both_http_entry_points_use_the_same_tracker(): void
    {
        $article = Article::factory()->create(['status' => 'published']);
        $this->withoutVite();
        $this->get('/articles/'.$article->slug)->assertOk();
        $this->postJson('/api/articles/'.$article->slug.'/views')->assertOk()
            ->assertJsonPath('statistics.views', 2)->assertJsonPath('statistics.unique_views', 1);
        $this->assertSame(0, $article->views()->count());
    }
}
