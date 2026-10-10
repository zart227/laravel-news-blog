<?php

namespace App\Services;

use App\Models\Article;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ArticleService
{
    const CACHE_TTL = 3600; // 1 час

    public function getArticles(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        ksort($filters);
        $page = LengthAwarePaginator::resolveCurrentPage();
        $version = Cache::rememberForever('articles:version', fn () => (string) \Illuminate\Support\Str::uuid());
        $cacheKey = 'articles:'.$version.':'.hash('sha256', json_encode([$filters, $perPage, $page]));

        return Cache::remember($cacheKey, self::CACHE_TTL, function () use ($filters, $perPage, $page) {
            $query = Article::query()
                ->with(['user', 'tags'])
                ->latest();

            if (isset($filters['search'])) {
                $query->where(function ($q) use ($filters) {
                    $q->where('title', 'like', "%{$filters['search']}%")
                        ->orWhere('content', 'like', "%{$filters['search']}%");
                });
            }

            return $query->paginate($perPage, ['*'], 'page', $page);
        });
    }

    public function getArticle(int $id): ?Article
    {
        $cacheKey = 'article:'.$id;

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
                'image_path' => $data['image_path'] ?? null,
                'user_id' => auth()->id(),
                'status' => $data['status'] ?? 'draft',
            ]);

            if (isset($data['tags'])) {
                $article->tags()->sync($data['tags']);
            }

            $this->clearCache($article);

            return $article->load(['user', 'tags']);
        });
    }

    public function updateArticle(Article $article, array $data): Article
    {
        return DB::transaction(function () use ($article, $data) {
            $article->update([
                'title' => $data['title'],
                'content' => $data['content'],
                'image_path' => $data['image_path'] ?? $article->image_path,
                'status' => $data['status'] ?? $article->status,
            ]);

            if (isset($data['tags'])) {
                $article->tags()->sync($data['tags']);
            }

            $this->clearCache($article);

            return $article->load(['user', 'tags']);
        });
    }

    public function deleteArticle(Article $article): void
    {
        DB::transaction(function () use ($article) {
            $this->clearCache($article);
            $article->delete();
        });
    }

    protected function clearCache(?Article $article = null): void
    {
        Cache::forever('articles:version', (string) \Illuminate\Support\Str::uuid());
        if ($article) {
            Cache::forget('article:'.$article->id);
        }
    }
}
