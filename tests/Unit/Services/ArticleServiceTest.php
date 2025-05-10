<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Models\Article;
use App\Models\User;
use App\Models\Tag;
use App\Services\ArticleService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;

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
    }

    public function test_it_can_get_articles_with_cache()
    {
        // Arrange
        Article::factory()->count(5)->create();
        $cacheKey = 'articles:' . md5(json_encode([]) . 10);
        
        // Act
        $articles = $this->articleService->getArticles();
        
        // Assert
        $this->assertCount(5, $articles);
        $this->assertTrue(Cache::has($cacheKey));
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
        $cacheKey = 'article:' . $article->id;
        
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
            'tags' => [$tag->id]
        ];
        
        // Act
        $article = $this->articleService->createArticle($data);
        
        // Assert
        $this->assertDatabaseHas('articles', [
            'title' => 'New Article',
            'content' => 'Article content'
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
            'tags' => [$tag->id]
        ];
        
        // Act
        $updatedArticle = $this->articleService->updateArticle($article, $data);
        
        // Assert
        $this->assertEquals('Updated Title', $updatedArticle->title);
        $this->assertEquals('Updated content', $updatedArticle->content);
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
        $cacheKey = 'article:' . $article->id;
        
        // Get article to cache it
        $this->articleService->getArticle($article->id);
        $this->assertTrue(Cache::has($cacheKey));
        
        // Act
        $this->articleService->deleteArticle($article);
        
        // Assert
        $this->assertFalse(Cache::has($cacheKey));
    }
} 