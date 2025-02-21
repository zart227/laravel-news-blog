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

class ArticleController extends Controller
{
    use HandlesErrors;

    protected $articleService;

    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }

    public function index(Request $request)
    {
        try {
            $filters = [];
            if ($search = $request->input('search')) {
                $filters['search'] = $search;
            }

            $articles = $this->articleService->getArticles($filters);

            if ($request->wantsJson()) {
                return response()->json($articles);
            }

            return Inertia::render('Articles/Index', [
                'articles' => $articles
            ]);
        } catch (\Throwable $e) {
            return $this->handleError($e);
        }
    }

    public function store(ArticleRequest $request)
    {
        try {
            $validated = $request->validated();

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('articles', 'public');
                $validated['image'] = $path;
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

    public function update(ArticleRequest $request, Article $article)
    {
        try {
            $validated = $request->validated();

            if ($request->hasFile('image')) {
                if ($article->image) {
                    Storage::disk('public')->delete($article->image);
                }
                $path = $request->file('image')->store('articles', 'public');
                $validated['image'] = $path;
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
            if ($article->image) {
                Storage::disk('public')->delete($article->image);
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