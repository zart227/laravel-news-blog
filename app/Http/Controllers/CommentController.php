<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Article;
use App\Traits\HandlesErrors;
use App\Http\Requests\CommentRequest;
use App\Events\CommentCreated;
use App\Events\CommentUpdated;
use App\Events\CommentDeleted;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    use HandlesErrors;

    public function store(CommentRequest $request, Article $article)
    {
        try {
            $validated = $request->validated();

            $comment = $article->comments()->create([
                'content' => $validated['content'],
                'user_id' => auth()->id(),
                'parent_id' => $validated['parent_id'] ?? null,
            ]);

            $comment->load('user');
            broadcast(new CommentCreated($comment))->toOthers();

            return response()->json([
                'message' => 'Комментарий успешно добавлен',
                'comment' => $comment
            ]);
        } catch (\Throwable $e) {
            return $this->handleError($e);
        }
    }

    public function update(CommentRequest $request, Comment $comment)
    {
        try {
            $this->authorize('update', $comment);

            $validated = $request->validated();

            $comment->update([
                'content' => $validated['content']
            ]);

            $comment->load('user');
            broadcast(new CommentUpdated($comment))->toOthers();

            return response()->json([
                'message' => 'Комментарий успешно обновлен',
                'comment' => $comment
            ]);
        } catch (\Throwable $e) {
            return $this->handleError($e);
        }
    }

    public function destroy(Comment $comment)
    {
        try {
            $this->authorize('delete', $comment);

            $articleId = $comment->article_id;
            $commentId = $comment->id;

            $comment->delete();

            broadcast(new CommentDeleted($commentId, $articleId))->toOthers();

            return response()->json([
                'message' => 'Комментарий успешно удален'
            ]);
        } catch (\Throwable $e) {
            return $this->handleError($e);
        }
    }
} 