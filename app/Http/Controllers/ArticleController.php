<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Tag;
use App\Traits\HandlesErrors;
use App\Http\Requests\ArticleRequest;
use App\Services\ArticleService;
use Illuminate\Http\Request;
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
        $articles = Article::query()
            ->when(auth()->guest(), function ($query) {
                $query->where('status', 'published');
            })
            ->with(['user', 'tags'])
            ->latest()
            ->paginate(12);

        return Inertia::render('Articles/Index', [
            'articles' => $articles
        ]);
    }

    public function show(Article $article): Response
    {
        if ($article->status !== 'published' && auth()->guest()) {
            abort(404);
        }

        $article->load(['user', 'tags']);

        return Inertia::render('Articles/Show', [
            'article' => $article
        ]);
    }

    public function adminIndex(): Response
    {
        $articles = Article::with(['user', 'tags'])
            ->latest()
            ->paginate(12);

        return Inertia::render('Admin/Articles/Index', [
            'articles' => $articles
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Articles/Create', [
            'tags' => Tag::all()
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

            return response()->json([
                'message' => 'Статья успешно создана',
                'article' => $article
            ]);
        } catch (\Throwable $e) {
            return $this->handleError($e);
        }
    }

    public function edit(Article $article): Response
    {
        return Inertia::render('Admin/Articles/Edit', [
            'article' => $article->load('tags'),
            'tags' => Tag::all()
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

            return response()->json([
                'message' => 'Статья успешно обновлена',
                'article' => $article
            ]);
        } catch (\Throwable $e) {
            return $this->handleError($e);
        }
    }

    public function destroy(Article $article)
    {
        try {
            if ($article->image_path) {
                Storage::disk('public')->delete($article->image_path);
            }

            $this->articleService->deleteArticle($article);

            return response()->json([
                'message' => 'Статья успешно удалена'
            ]);
        } catch (\Throwable $e) {
            return $this->handleError($e);
        }
    }
} 