<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\User;
use App\Services\StatisticsService;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class StatisticsApiTest extends TestCase
{
    public function test_statistics_page_is_for_admins_only(): void
    {
        $this->withoutVite();
        $this->actingAs(User::factory()->create(['role' => UserRole::ADMIN]))
            ->get('/admin/statistics')->assertOk();
        $this->actingAs(User::factory()->create(['role' => UserRole::USER]))
            ->get('/admin/statistics')->assertForbidden();
    }

    public function test_api_returns_report_and_caches_each_period_without_tags(): void
    {
        Cache::flush();
        $report = ['summary' => ['total_views' => 3, 'unique_viewers' => 2, 'total_likes' => 1, 'total_comments' => 0],
            'activity' => [], 'popular' => [], 'browsers' => [], 'referrers' => []];
        $this->mock(StatisticsService::class, function ($mock) use ($report) {
            $mock->shouldReceive('getReport')->once()->with('week')->andReturn($report);
            $mock->shouldReceive('getReport')->once()->with('month')->andReturn($report);
        });
        $this->actingAs(User::factory()->create(['role' => UserRole::ADMIN]));
        $this->getJson('/api/statistics?period=week')->assertOk()->assertExactJson($report);
        $this->getJson('/api/statistics?period=week')->assertOk();
        $this->getJson('/api/statistics?period=month')->assertOk();
        $this->assertTrue(Cache::has('statistics:week'));
        StatisticsService::invalidateCache();
        $this->assertFalse(Cache::has('statistics:week'));
        $this->assertFalse(Cache::has('statistics:month'));
        $this->getJson('/api/statistics?period=other')->assertUnprocessable();
    }

    public function test_api_and_private_channel_reject_regular_users(): void
    {
        $user = User::factory()->create(['role' => UserRole::USER]);
        $this->actingAs($user)->getJson('/api/statistics')->assertForbidden();
        config(['broadcasting.default' => 'pusher']);
        require base_path('routes/channels.php');
        $this->postJson('/broadcasting/auth', ['channel_name' => 'private-admin.statistics', 'socket_id' => '1.1'])
            ->assertForbidden();
        $this->actingAs(User::factory()->create(['role' => UserRole::ADMIN]))
            ->postJson('/broadcasting/auth', ['channel_name' => 'private-admin.statistics', 'socket_id' => '1.1'])
            ->assertOk();
    }
}
