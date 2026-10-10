<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'content' => $this->content,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'user' => new UserResource($this->whenLoaded('user')),
            'article_id' => $this->article_id,
            'parent_id' => $this->parent_id,
            'replies' => CommentResource::collection($this->whenLoaded('replies')),
            'likes_count' => $this->likes_count ?? $this->likes()->count(),
            'dislikes_count' => $this->dislikes_count ?? $this->dislikes()->count(),
            'is_liked_by_user' => $request->user() ? $this->isLikedBy($request->user()->id) : false,
            'is_disliked_by_user' => $request->user() ? $this->isDislikedBy($request->user()->id) : false,
        ];
    }
} 