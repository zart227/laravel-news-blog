<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use App\Http\Requests\TagRequest;
use App\Services\TagService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TagController extends Controller
{
    protected $tagService;

    public function __construct(TagService $tagService)
    {
        $this->tagService = $tagService;
    }

    public function index(): JsonResponse
    {
        $tags = Tag::withCount('articles')->get();
        return response()->json($tags);
    }

    public function show(Tag $tag): JsonResponse
    {
        $tag->load(['articles' => function ($query) {
            $query->when(auth()->guest(), function ($q) {
                $q->where('status', 'published');
            });
        }]);
        return response()->json($tag);
    }

    public function store(TagRequest $request): JsonResponse
    {
        try {
            $tag = $this->tagService->createTag($request->validated());
            return response()->json([
                'message' => 'Тег успешно создан',
                'tag' => $tag
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Ошибка при создании тега',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(TagRequest $request, Tag $tag): JsonResponse
    {
        try {
            $tag = $this->tagService->updateTag($tag, $request->validated());
            return response()->json([
                'message' => 'Тег успешно обновлен',
                'tag' => $tag
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Ошибка при обновлении тега',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Tag $tag): JsonResponse
    {
        try {
            $this->tagService->deleteTag($tag);
            return response()->json([
                'message' => 'Тег успешно удален'
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Ошибка при удалении тега',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 