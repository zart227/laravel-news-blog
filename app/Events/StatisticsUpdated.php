<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StatisticsUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public int $articleId, public string $type, public int $count) {}

    public function broadcastOn(): array
    {
        return [new PrivateChannel('admin.statistics')];
    }

    public function broadcastWith(): array
    {
        return ['article_id' => $this->articleId, 'type' => $this->type, 'count' => $this->count];
    }
}
