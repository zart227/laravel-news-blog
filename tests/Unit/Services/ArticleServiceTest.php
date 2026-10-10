<?php

namespace Tests\Unit\Services;

use App\Models\Article;
use App\Models\Tag;
use App\Models\User;
use App\Services\ArticleService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class ArticleServiceTest extends TestCase
{
    use RefreshDatabase;

    protected ArticleService $articleService;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->articleService = app(ArticleService::class);
        $this->user = User::factory()->create();
        $this->actingAs($this->user);

        // Очищаем кэш перед каждым тестом
        Cache::flush();
    }

    public function test_it_can_get_articles_with_cache()
    {
        // Arrange
        Article::factory()->count(5)->create();

        // Act
        $articles = $this->articleService->getArticles();

        // Assert
        $this->assertCount(5, $articles);
        $cacheKey = 'articles:'.Cache::get('articles:version').':'.hash('sha256', json_encode([[], 10, 1]));
        $this->assertTrue(Cache::has($cacheKey));
    }

    public function test_filters_pages_and_page_size_have_separate_cache_entries(): void
    {
        Article::factory()->create(['title' => 'Alpha', 'content' => 'First']);
        Article::factory()->create(['title' => 'Beta', 'content' => 'Second']);
        $this->assertSame('Alpha', $this->articleService->getArticles(['search' => 'Alpha'])->first()->title);
        $this->assertSame('Beta', $this->articleService->getArticles(['search' => 'Beta'])->first()->title);
        \Illuminate\Pagination\Paginator::currentPageResolver(fn () => 1);
        $first = $this->articleService->getArticles([], 1)->first()->id;
        \Illuminate\Pagination\Paginator::currentPageResolver(fn () => 2);
        $second = $this->articleService->getArticles([], 1)->first()->id;
        $this->assertNotSame($first, $second);
        \Illuminate\Pagination\Paginator::currentPageResolver(fn () => 1);
        $this->assertCount(2, $this->articleService->getArticles([], 2));
        $version = Cache::get('articles:version');
        $this->articleService->createArticle(['title' => 'Gamma', 'content' => 'Third', 'image_path' => 'articles/test.jpg']);
        $this->assertNotSame($version, Cache::get('articles:version'));
        $this->assertCount(3, $this->articleService->getArticles());
    }

    public function test_it_can_get_articles_with_search()
    {
        // Arrange
        Article::factory()->create(['title' => 'Test Article']);
        Article::factory()->create(['title' => 'Another Article']);

        // Act
        $articles = $this->articleService->getArticles(['search' => 'Test']);

        // Assert
        $this->assertCount(1, $articles);
        $this->assertEquals('Test Article', $articles->first()->title);
    }

    public function test_it_can_get_single_article_with_cache()
    {
        // Arrange
        $article = Article::factory()->create();
        $cacheKey = 'article:'.$article->id;

        // Act
        $cachedArticle = $this->articleService->getArticle($article->id);

        // Assert
        $this->assertEquals($article->id, $cachedArticle->id);
        $this->assertTrue(Cache::has($cacheKey));
    }

    public function test_it_can_create_article()
    {
        // Arrange
        $tag = Tag::factory()->create();
        $data = [
            'title' => 'New Article',
            'content' => 'Article content',
            'image_path' => 'articles/test.jpg',
            'tags' => [$tag->id],
        ];

        // Act
        $article = $this->articleService->createArticle($data);

        // Assert
        $this->assertDatabaseHas('articles', [
            'title' => 'New Article',
            'content' => 'Article content',
            'image_path' => 'articles/test.jpg',
        ]);
        $this->assertTrue($article->tags->contains($tag));
    }

    public function test_it_can_update_article()
    {
        // Arrange
        $article = Article::factory()->create();
        $tag = Tag::factory()->create();
        $data = [
            'title' => 'Updated Title',
            'content' => 'Updated content',
            'image_path' => 'articles/updated.jpg',
            'tags' => [$tag->id],
        ];

        // Act
        $updatedArticle = $this->articleService->updateArticle($article, $data);

        // Assert
        $this->assertEquals('Updated Title', $updatedArticle->title);
        $this->assertEquals('Updated content', $updatedArticle->content);
        $this->assertEquals('articles/updated.jpg', $updatedArticle->image_path);
        $this->assertTrue($updatedArticle->tags->contains($tag));
    }

    public function test_it_can_delete_article()
    {
        // Arrange
        $article = Article::factory()->create();

        // Act
        $this->articleService->deleteArticle($article);

        // Assert
        $this->assertDatabaseMissing('articles', ['id' => $article->id]);
    }

    public function test_it_clears_cache_after_article_operations()
    {
        // Arrange
        $article = Article::factory()->create();
        $cacheKey = 'article:'.$article->id;

        // Get article to cache it
        $this->articleService->getArticle($article->id);
        $this->assertTrue(Cache::has($cacheKey));

        // Act
        $this->articleService->deleteArticle($article);

        // Assert
        $this->assertFalse(Cache::has($cacheKey));
    }
}
