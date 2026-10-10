<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class RouteSmokeTest extends TestCase
{
    public function test_route_list_resolves_every_controller(): void
    {
        $this->artisan('route:list')->assertExitCode(0);
        foreach (['profile.edit', 'profile.update', 'profile.destroy'] as $name) {
            $routes = collect(app('router')->getRoutes()->getRoutes())->where('action.as', $name);
            $this->assertCount(1, $routes);
        }
        $this->assertFalse(app('router')->has('dashboard'));
    }

    public function test_websocket_test_is_restricted_to_administrators(): void
    {
        $this->get('/websocket-test')->assertRedirect('/login');
        $this->actingAs(User::factory()->create())->get('/websocket-test')->assertForbidden();
    }

    public function test_broadcasting_defaults_to_a_driver_without_credentials(): void
    {
        $this->assertNull(config('broadcasting.default'));
        $this->assertInstanceOf(\Illuminate\Broadcasting\Broadcasters\NullBroadcaster::class, \Illuminate\Support\Facades\Broadcast::connection());
    }
}
