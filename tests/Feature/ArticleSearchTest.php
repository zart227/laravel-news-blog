<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Services\StatisticsService;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class ArticleSearchTest extends TestCase
{
    public function test_public_search_matches_titles_and_retains_filter(): void
    {
        $this->withoutVite();
        $this->mock(StatisticsService::class, function ($mock) {
            $mock->shouldReceive('attachViewCounts')->once()->andReturnNull();
        });
        Article::factory()->create(['title' => 'Mongo guide', 'status' => 'published']);
        Article::factory()->create(['title' => 'Other story', 'content' => 'Mongo', 'status' => 'published']);
        Article::factory()->create(['title' => 'Mongo draft', 'status' => 'draft']);
        $this->get('/articles?search=Mongo')->assertOk()->assertInertia(fn (AssertableInertia $page) => $page->component('Articles/Index')->has('articles', 1)->where('articles.0.title', 'Mongo guide')
            ->where('filters.search', 'Mongo'));
    }
}
