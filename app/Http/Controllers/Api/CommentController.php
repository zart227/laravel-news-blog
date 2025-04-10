<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Comment;
use App\Events\CommentCreated;
use App\Events\CommentUpdated;
use App\Events\CommentDeleted;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Article $article): JsonResponse
    {
        try {
            if (!$article->exists) {
                return response()->json(['message' => 'Статья не найдена'], 404);
            }

            $comments = $article->comments()
                ->with(['user:id,name', 'replies.user:id,name', 'replies.replies.user:id,name'])
                ->whereNull('parent_id')
                ->latest()
                ->get();

            return response()->json($comments);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Ошибка при загрузке комментариев',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Article $article): JsonResponse
    {
        $validated = $request->validate([
            'content' => 'required|string|min:3|max:1000',
            'parent_id' => 'nullable|exists:comments,id'
        ]);

        $comment = $article->comments()->create([
            'content' => $validated['content'],
            'user_id' => auth()->id(),
            'parent_id' => $validated['parent_id'] ?? null,
        ]);

        $comment->load(['user', 'parent.user']);

        broadcast(new CommentCreated($comment))->toOthers();

        return response()->json($comment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment): JsonResponse
    {
        $this->authorize('update', $comment);

        $validated = $request->validate([
            'content' => 'required|string|min:3|max:1000',
        ]);

        $comment->update($validated);
        $comment->load(['user', 'parent.user']);

        broadcast(new CommentUpdated($comment))->toOthers();

        return response()->json($comment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment): JsonResponse
    {
        $this->authorize('delete', $comment);

        $articleId = $comment->article_id;
        $commentId = $comment->id;

        $comment->delete();

        broadcast(new CommentDeleted($commentId, $articleId))->toOthers();

        return response()->json(null, 204);
    }
}
