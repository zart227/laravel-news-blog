<?php

namespace Tests\Feature;

use App\Events\CommentCreated;
use App\Events\CommentDeleted;
use App\Events\CommentUpdated;
use App\Events\StatisticsUpdated;
use App\Models\Article;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class InteractionsTest extends TestCase
{
    public function test_like_dislike_switch_and_toggle_return_current_json_counts(): void
    {
        $article = Article::factory()->create();
        $this->actingAs(User::factory()->create());
        $payload = ['type' => 'article', 'id' => $article->id];
        $this->postJson('/like', $payload)->assertOk()->assertJson(['action' => 'liked', 'likes_count' => 1, 'dislikes_count' => 0]);
        $this->postJson('/dislike', $payload)->assertOk()->assertJson(['action' => 'disliked', 'likes_count' => 0, 'dislikes_count' => 1]);
        $this->postJson('/dislike', $payload)->assertOk()->assertJson(['action' => 'undisliked', 'dislikes_count' => 0]);
        $this->postJson('/like', $payload)->assertOk();
        $this->postJson('/like', $payload)->assertOk()->assertJson(['action' => 'unliked', 'likes_count' => 0]);
        $comment = Comment::factory()->create();
        $this->postJson('/like', ['type' => 'comment', 'id' => $comment->id])->assertOk()->assertJsonPath('likes_count', 1);
    }

    public function test_comment_crud_events_channels_and_statistics_invalidation(): void
    {
        Event::fake([CommentCreated::class, CommentUpdated::class, CommentDeleted::class, StatisticsUpdated::class]);
        Cache::put('statistics:week', ['old' => true], 60);
        $article = Article::factory()->create(['status' => 'published']);
        $user = User::factory()->create();
        $this->actingAs($user);
        $response = $this->postJson('/api/articles/'.$article->slug.'/comments', ['content' => 'A new comment']);
        $response->assertCreated();
        $id = $response->json('id');
        $this->assertFalse(Cache::has('statistics:week'));
        Event::assertDispatched(CommentCreated::class, fn ($e) => $e->broadcastOn()[0]->name === 'article.'.$article->slug);
        Event::assertDispatched(StatisticsUpdated::class, fn ($e) => $e->type === 'comments' && $e->count === 1);
        $this->patchJson('/api/comments/'.$id, ['content' => 'Updated comment'])->assertOk()->assertJsonPath('content', 'Updated comment');
        Event::assertDispatched(CommentUpdated::class);
        $this->actingAs(User::factory()->create())->patchJson('/api/comments/'.$id, ['content' => 'Not mine'])->assertForbidden();
        $this->deleteJson('/api/comments/'.$id)->assertForbidden();
        $this->actingAs($user)->deleteJson('/api/comments/'.$id)->assertNoContent();
        $this->assertDatabaseMissing('comments', ['id' => $id]);
        Event::assertDispatched(CommentDeleted::class, fn ($e) => $e->broadcastOn()[0]->name === 'article.'.$article->slug && $e->commentId === $id);
        Event::assertDispatched(StatisticsUpdated::class, fn ($e) => $e->count === 0 && $e->broadcastOn()[0]->name === 'private-admin.statistics');
    }

    public function test_comment_reply_cannot_target_another_article(): void
    {
        Event::fake();
        $article = Article::factory()->create();
        $parent = Comment::factory()->create();
        $this->actingAs(User::factory()->create())->postJson('/api/articles/'.$article->slug.'/comments', [
            'content' => 'A reply', 'parent_id' => $parent->id,
        ])->assertUnprocessable();
    }
}
