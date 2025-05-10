<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;

class StatisticsUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $articleId;
    public $type;
    public $count;

    /**
     * Create a new event instance.
     */
    public function __construct(int $articleId, string $type, int $count)
    {
        $this->articleId = $articleId;
        $this->type = $type; // 'views' или 'comments'
        $this->count = $count;

        // Очищаем кэш статистики
        Cache::tags(['statistics'])->flush();
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('statistics'),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'article_id' => $this->articleId,
            'type' => $this->type,
            'count' => $this->count,
        ];
    }
} 