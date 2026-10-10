<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\ArticleRequest;
use App\Models\Article;
use App\Models\Tag;
use App\Services\ArticleService;
use App\Services\StatisticsService;
use App\Services\ViewTracker;
use App\Traits\HandlesErrors;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    use HandlesErrors;

    protected $articleService;

    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }

    public function index(): Response
    {
        $query = Article::query()
            ->when(auth()->guest(), function ($query) {
                $query->where('status', 'published');
            })
            ->withCount(['likes', 'dislikes', 'comments'])
            ->with(['user', 'tags'])
            ->latest();

        $currentPage = max(1, (int) request()->input('page', 1));
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

        app(StatisticsService::class)->attachViewCounts(collect($articles->items()));

        return Inertia::render('Articles/Index', [
            'articles' => $articles->items(),
            'articlesPagination' => [
                'current_page' => $articles->currentPage(),
                'last_page' => $articles->lastPage(),
                'per_page' => $articles->perPage(),
                'total' => $articles->total(),
            ],
        ]);
    }

    public function show(Article $article): Response
    {
        if ($article->status !== 'published' && auth()->guest()) {
            abort(404);
        }

        $statistics = app(ViewTracker::class)->track($article, request());

        $article->load([
            'user:id,name',
            'tags',
            'comments' => function ($query) {
                $query->whereNull('parent_id')
                    ->withCount(['likes', 'dislikes'])
                    ->with([
                        'user:id,name',
                        'replies' => function ($query) {
                            $query->withCount(['likes', 'dislikes'])
                                ->with('user:id,name');
                        },
                    ]);
            },
        ])->loadCount(['likes', 'dislikes']);
        $article->setAttribute('views_count', $statistics['views']);

        // Получаем общее количество комментариев (включая вложенные) одним запросом
        $totalComments = $article->comments()
            ->selectRaw('COUNT(*) as total')
            ->first()
            ->total;

        return Inertia::render('Articles/Show', [
            'article' => $article,
            'comments' => $article->comments,
            'totalComments' => $totalComments,
        ]);
    }

    public function adminIndex(): Response
    {
        $articles = Article::with(['user', 'tags'])
            ->latest()
            ->paginate(12);

        return Inertia::render('Admin/Articles/Index', [
            'articles' => $articles,
            'tags' => Tag::all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Articles/Create', [
            'tags' => Tag::all(),
        ]);
    }

    public function store(ArticleRequest $request)
    {
        try {
            $validated = $request->validated();

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('articles', 'public');
                $validated['image_path'] = $path;
            }

            $article = $this->articleService->createArticle($validated);

            return Inertia::location(route('admin.articles.index'));
        } catch (\Throwable $e) {
            return back()->with('error', 'Ошибка при создании статьи');
        }
    }

    public function edit(Article $article): Response
    {
        return Inertia::render('Admin/Articles/Edit', [
            'article' => $article->load('tags'),
            'tags' => Tag::all(),
        ]);
    }

    public function update(ArticleRequest $request, Article $article)
    {
        try {
            $validated = $request->validated();

            if ($request->hasFile('image')) {
                if ($article->image_path) {
                    Storage::disk('public')->delete($article->image_path);
                }
                $path = $request->file('image')->store('articles', 'public');
                $validated['image_path'] = $path;
            }

            $article = $this->articleService->updateArticle($article, $validated);

            return Inertia::location(route('admin.articles.index'));
        } catch (\Throwable $e) {
            return back()->with('error', 'Ошибка при обновлении статьи');
        }
    }

    public function destroy(Article $article)
    {
        try {
            if ($article->image_path) {
                Storage::disk('public')->delete($article->image_path);
            }

            $this->articleService->deleteArticle($article);

            return Inertia::location(route('admin.articles.index'));
        } catch (\Throwable $e) {
            return back()->with('error', 'Ошибка при удалении статьи');
        }
    }
}
