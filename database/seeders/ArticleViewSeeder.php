<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Services\ViewTracker;
use Carbon\CarbonImmutable;
use Illuminate\Database\Seeder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;

class ArticleViewSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['article_view_events', 'article_view_daily', 'statistics'] as $name) {
            DB::connection('mongodb')->getCollection($name)->deleteMany([]);
        }
        $this->callSilentStatisticsIndexes();
        Event::fakeFor(function () {
            foreach (Article::all() as $article) {
                for ($i = 0; $i < 30; $i++) {
                    $request = Request::create('/', 'GET', [], [], [], [
                        'REMOTE_ADDR' => '192.0.2.'.($i % 10 + 1),
                        'HTTP_USER_AGENT' => $i % 2 ? 'Chrome/123.0' : 'Firefox/125.0',
                        'HTTP_REFERER' => 'https://example.org/news',
                    ]);
                    app(ViewTracker::class)->track($article, $request,
                        CarbonImmutable::now()->subDays($i % 14));
                }
            }
        });
    }

    private function callSilentStatisticsIndexes(): void
    {
        \Illuminate\Support\Facades\Artisan::call('statistics:index');
    }
}
