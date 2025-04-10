<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use App\Http\Requests\TagRequest;
use App\Services\TagService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TagController extends Controller
{
    protected $tagService;

    public function __construct(TagService $tagService)
    {
        $this->tagService = $tagService;
    }

    public function index(): Response
    {
        $tags = Tag::withCount('articles')->get();

        return Inertia::render('Tags/Index', [
            'tags' => $tags
        ]);
    }

    public function show(Tag $tag): Response
    {
        $query = $tag->articles()
            ->when(auth()->guest(), function ($query) {
                $query->where('status', 'published');
            })
            ->with(['user', 'tags'])
            ->latest();

        $currentPage = request()->input('page', 1);
        $perPage = 12;

        // Если запрос через Inertia (частичные данные) - возвращаем только текущую страницу
        if (request()->header('X-Inertia-Partial-Data')) {
            $articles = $query->paginate($perPage);
        } else {
            // Если прямой запрос или полная загрузка страницы - загружаем все данные до текущей страницы
            $allResults = collect();
            
            for ($page = 1; $page <= $currentPage; $page++) {
                $pageResults = $query->clone()->paginate($perPage, ['*'], 'page', $page);
                $allResults = $allResults->concat($pageResults->items());
            }
            
            // Получаем общее количество для пагинации
            $total = $query->count();
            
            // Создаем пагинатор с уже загруженными данными
            $articles = new \Illuminate\Pagination\LengthAwarePaginator(
                $allResults,
                $total,
                $perPage,
                $currentPage,
                ['path' => \Illuminate\Support\Facades\Request::url()]
            );
        }

        return Inertia::render('Tags/Show', [
            'tag' => $tag,
            'articles' => $articles,
            'articlesPagination' => [
                'current_page' => $articles->currentPage(),
                'last_page' => $articles->lastPage(),
                'per_page' => $articles->perPage(),
                'total' => $articles->total(),
            ]
        ]);
    }

    public function adminIndex(): Response
    {
        $tags = Tag::withCount('articles')
            ->orderBy('name')
            ->paginate(10);

        return Inertia::render('Admin/Tags/Index', [
            'tags' => $tags
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Tags/Create');
    }

    public function store(TagRequest $request)
    {
        try {
            $tag = $this->tagService->createTag($request->validated());
            return Inertia::location(route('admin.tags.index'));
        } catch (\Throwable $e) {
            return back()->with('error', 'Ошибка при создании тега');
        }
    }

    public function edit(Tag $tag): Response
    {
        return Inertia::render('Admin/Tags/Edit', [
            'tag' => $tag
        ]);
    }

    public function update(TagRequest $request, Tag $tag)
    {
        try {
            $tag = $this->tagService->updateTag($tag, $request->validated());
            return Inertia::location(route('admin.tags.index'));
        } catch (\Throwable $e) {
            return back()->with('error', 'Ошибка при обновлении тега');
        }
    }

    public function destroy(Tag $tag)
    {
        try {
            $this->tagService->deleteTag($tag);
            return Inertia::location(route('admin.tags.index'));
        } catch (\Throwable $e) {
            return back()->with('error', 'Ошибка при удалении тега');
        }
    }
} 