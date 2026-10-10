<?php

namespace App\Services;

use App\Models\Tag;
use Illuminate\Support\Str;

class TagService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Создать новый тег
     */
    public function createTag(array $data): Tag
    {
        $data['slug'] = Str::slug($data['name']);
        return Tag::create($data);
    }

    /**
     * Обновить существующий тег
     */
    public function updateTag(Tag $tag, array $data): Tag
    {
        $data['slug'] = Str::slug($data['name']);
        $tag->update($data);
        return $tag->fresh();
    }

    /**
     * Удалить тег
     */
    public function deleteTag(Tag $tag): bool
    {
        return $tag->delete();
    }

    /**
     * Получить все теги с количеством статей
     */
    public function getAllWithArticleCount()
    {
        return Tag::withCount('articles')->get();
    }

    /**
     * Получить тег по slug с его статьями
     */
    public function getBySlugWithArticles(string $slug)
    {
        return Tag::where('slug', $slug)
            ->with(['articles' => function ($query) {
                $query->when(auth()->guest(), function ($q) {
                    $q->where('status', 'published');
                });
            }])
            ->firstOrFail();
    }
}
