<?php

namespace App\Services;

use App\Models\Article;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ArticleService
{
    const CACHE_TTL = 3600; // 1 час

    public function getArticles(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $cacheKey = 'articles:' . md5(json_encode($filters) . $perPage);

        return Cache::remember($cacheKey, self::CACHE_TTL, function () use ($filters, $perPage) {
            $query = Article::query()
                ->with(['user', 'tags'])
                ->latest();

            if (isset($filters['search'])) {
                $query->where(function ($q) use ($filters) {
                    $q->where('title', 'like', "%{$filters['search']}%")
                        ->orWhere('content', 'like', "%{$filters['search']}%");
                });
            }

            return $query->paginate($perPage);
        });
    }

    public function getArticle(int $id): ?Article
    {
        $cacheKey = 'article:' . $id;

        return Cache::remember($cacheKey, self::CACHE_TTL, function () use ($id) {
            return Article::with(['user', 'tags', 'comments.user'])->findOrFail($id);
        });
    }

    public function createArticle(array $data): Article
    {
        return DB::transaction(function () use ($data) {
            $article = Article::create([
                'title' => $data['title'],
                'content' => $data['content'],
                'image' => $data['image'] ?? null,
                'user_id' => auth()->id()
            ]);

            if (isset($data['tags'])) {
                $article->tags()->sync($data['tags']);
            }

            $this->clearArticlesCache();

            return $article->load(['user', 'tags']);
        });
    }

    public function updateArticle(Article $article, array $data): Article
    {
        return DB::transaction(function () use ($article, $data) {
            $article->update([
                'title' => $data['title'],
                'content' => $data['content'],
                'image' => $data['image'] ?? $article->image,
            ]);

            if (isset($data['tags'])) {
                $article->tags()->sync($data['tags']);
            }

            $this->clearArticleCache($article->id);
            $this->clearArticlesCache();

            return $article->load(['user', 'tags']);
        });
    }

    public function deleteArticle(Article $article): void
    {
        DB::transaction(function () use ($article) {
            $article->delete();
            $this->clearArticleCache($article->id);
            $this->clearArticlesCache();
        });
    }

    protected function clearArticleCache(int $id): void
    {
        Cache::forget('article:' . $id);
    }

    protected function clearArticlesCache(): void
    {
        $keys = Cache::get('article_cache_keys', []);
        foreach ($keys as $key) {
            if (strpos($key, 'articles:') === 0) {
                Cache::forget($key);
            }
        }
    }
} 