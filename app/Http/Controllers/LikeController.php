<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function toggleLike(Request $request): JsonResponse
    {
        $model = $this->getModel($request->type, $request->id);
        $userId = auth()->id();

        if ($model->isLikedBy($userId)) {
            $model->unlike($userId);
            $action = 'unliked';
        } else {
            if ($model->isDislikedBy($userId)) {
                $model->unlike($userId);
            }
            $model->like($userId);
            $action = 'liked';
        }

        return response()->json([
            'action' => $action,
            'likes_count' => $model->likes()->count(),
            'dislikes_count' => $model->dislikes()->count(),
        ]);
    }

    public function toggleDislike(Request $request): JsonResponse
    {
        $model = $this->getModel($request->type, $request->id);
        $userId = auth()->id();

        if ($model->isDislikedBy($userId)) {
            $model->unlike($userId);
            $action = 'undisliked';
        } else {
            if ($model->isLikedBy($userId)) {
                $model->unlike($userId);
            }
            $model->dislike($userId);
            $action = 'disliked';
        }

        return response()->json([
            'action' => $action,
            'likes_count' => $model->likes()->count(),
            'dislikes_count' => $model->dislikes()->count(),
        ]);
    }

    private function getModel(string $type, int $id): Article|Comment
    {
        return match ($type) {
            'article' => Article::findOrFail($id),
            'comment' => Comment::findOrFail($id),
            default => throw new \InvalidArgumentException('Invalid model type'),
        };
    }
} 