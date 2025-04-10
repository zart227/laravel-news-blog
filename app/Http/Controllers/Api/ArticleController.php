<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Tag;
use App\Traits\HandlesErrors;
use App\Http\Requests\ArticleRequest;
use App\Services\ArticleService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="Laravel News Blog API",
 *     description="API для новостного блога на Laravel",
 *     @OA\Contact(
 *         email="admin@example.com"
 *     )
 * )
 */

/**
 * @OA\Tag(
 *     name="Articles",
 *     description="API эндпоинты для работы со статьями"
 * )
 */
class ArticleController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests, HandlesErrors;

    protected $articleService;

    public function __construct(ArticleService $articleService)
    {
        $this->authorizeResource(Article::class, 'article');
        $this->articleService = $articleService;
    }

    /**
     * @OA\Get(
     *     path="/api/articles",
     *     tags={"Articles"},
     *     summary="Получить список статей",
     *     @OA\Parameter(
     *         name="search",
     *         in="query",
     *         description="Поиск по заголовку",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="status",
     *         in="query",
     *         description="Фильтр по статусу (draft/published)",
     *         required=false,
     *         @OA\Schema(type="string", enum={"draft", "published"})
     *     ),
     *     @OA\Parameter(
     *         name="tag",
     *         in="query",
     *         description="Фильтр по ID тега",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Успешный ответ",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="array",
     *                 @OA\Items(ref="#/components/schemas/Article")
     *             ),
     *             @OA\Property(property="links", type="object"),
     *             @OA\Property(property="meta", type="object")
     *         )
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        try {
            $articles = Article::query()
                ->when(auth()->guest(), function ($query) {
                    $query->where('status', 'published');
                })
                ->with(['user', 'tags'])
                ->latest()
                ->paginate(12);

            return response()->json([
                'data' => $articles->items(),
                'links' => $articles->linkCollection()->map(function ($link) {
                    return [
                        'url' => $link['url'],
                        'label' => $link['label'],
                        'active' => $link['active']
                    ];
                })->values()->all(),
                'meta' => [
                    'current_page' => $articles->currentPage(),
                    'from' => $articles->firstItem(),
                    'last_page' => $articles->lastPage(),
                    'path' => $articles->path(),
                    'per_page' => $articles->perPage(),
                    'to' => $articles->lastItem(),
                    'total' => $articles->total(),
                ]
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Ошибка при загрузке статей',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/articles",
     *     tags={"Articles"},
     *     summary="Создать новую статью",
     *     security={{"sanctum": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/ArticleRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Статья успешно создана",
     *         @OA\JsonContent(ref="#/components/schemas/Article")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Ошибка валидации"
     *     )
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/articles/{article}",
     *     tags={"Articles"},
     *     summary="Получить детали статьи",
     *     @OA\Parameter(
     *         name="article",
     *         in="path",
     *         description="ID статьи",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Успешный ответ",
     *         @OA\JsonContent(ref="#/components/schemas/Article")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Статья не найдена"
     *     )
     * )
     */
    public function show(Article $article)
    {
        if ($article->status !== 'published' && auth()->guest()) {
            abort(404);
        }

        $article->load(['user:id,name', 'tags']);

        return response()->json($article);
    }

    /**
     * @OA\Put(
     *     path="/api/articles/{article}",
     *     tags={"Articles"},
     *     summary="Обновить статью",
     *     security={{"sanctum": {}}},
     *     @OA\Parameter(
     *         name="article",
     *         in="path",
     *         description="ID статьи",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/ArticleRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Статья успешно обновлена",
     *         @OA\JsonContent(ref="#/components/schemas/Article")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Статья не найдена"
     *     )
     * )
     */
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

    /**
     * @OA\Delete(
     *     path="/api/articles/{article}",
     *     tags={"Articles"},
     *     summary="Удалить статью",
     *     security={{"sanctum": {}}},
     *     @OA\Parameter(
     *         name="article",
     *         in="path",
     *         description="ID статьи",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Статья успешно удалена"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Статья не найдена"
     *     )
     * )
     */
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
