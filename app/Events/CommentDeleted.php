<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CommentDeleted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $commentId;
    public $articleId;

    public function __construct(int $commentId, int $articleId)
    {
        $this->commentId = $commentId;
        $this->articleId = $articleId;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('article.' . $this->articleId),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'commentId' => $this->commentId,
        ];
    }
} 