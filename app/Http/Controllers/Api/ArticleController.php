<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
class ArticleController extends Controller
{
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
    public function index(Request $request)
    {
        $articles = Article::with(['user', 'tags'])
            ->when(auth()->user()?->role !== 'admin', function ($query) {
                $query->where('status', 'published');
            })
            ->when($request->filled('search'), function ($query) use ($request) {
                $query->where('title', 'like', '%' . $request->search . '%');
            })
            ->when($request->filled('status'), function ($query) use ($request) {
                $query->where('status', $request->status);
            })
            ->when($request->filled('tag'), function ($query) use ($request) {
                $query->whereHas('tags', function ($query) use ($request) {
                    $query->where('tags.id', $request->tag);
                });
            })
            ->latest()
            ->paginate(10);

        return response()->json($articles);
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
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'required|image|max:2048',
            'tags' => 'array',
            'tags.*' => 'exists:tags,id',
            'status' => 'required|in:draft,published',
        ]);

        $imagePath = $request->file('image')->store('articles', 'public');

        $article = Article::create([
            'title' => $request->title,
            'content' => $request->content,
            'image_path' => $imagePath,
            'status' => $request->status,
            'user_id' => auth()->id(),
        ]);

        if ($request->has('tags')) {
            $article->tags()->attach($request->tags);
        }

        return response()->json($article->load(['user', 'tags']), 201);
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
        if ($article->status === 'draft' && auth()->user()?->role !== 'admin') {
            abort(404);
        }

        return response()->json($article->load(['user', 'tags', 'comments.user', 'comments.replies.user']));
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
    public function update(Request $request, Article $article)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'tags' => 'array',
            'tags.*' => 'exists:tags,id',
            'status' => 'required|in:draft,published',
        ]);

        if ($request->hasFile('image')) {
            // Удаляем старое изображение
            if ($article->image_path) {
                Storage::disk('public')->delete($article->image_path);
            }
            $imagePath = $request->file('image')->store('articles', 'public');
            $article->image_path = $imagePath;
        }

        $article->update([
            'title' => $request->title,
            'content' => $request->content,
            'status' => $request->status,
        ]);

        if ($request->has('tags')) {
            $article->tags()->sync($request->tags);
        }

        return response()->json($article->load(['user', 'tags']));
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
        if ($article->image_path) {
            Storage::disk('public')->delete($article->image_path);
        }
        
        $article->delete();

        return response()->json(null, 204);
    }
}
