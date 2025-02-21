<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Events\CommentCreated;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Article $article)
    {
        return response()->json(
            $article->comments()
                ->with(['user', 'replies.user'])
                ->whereNull('parent_id')
                ->latest()
                ->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Article $article)
    {
        $request->validate([
            'content' => 'required|string',
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        $comment = $article->comments()->create([
            'content' => $request->content,
            'user_id' => auth()->id(),
            'parent_id' => $request->parent_id,
        ]);

        $comment->load(['user', 'parent']);

        // Отправляем событие о новом комментарии
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
    public function update(Request $request, Comment $comment)
    {
        $this->authorize('update', $comment);

        $request->validate([
            'content' => 'required|string',
        ]);

        $comment->update([
            'content' => $request->content,
        ]);

        return response()->json($comment->load('user'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $this->authorize('delete', $comment);
        
        $comment->delete();

        return response()->json(null, 204);
    }
}
