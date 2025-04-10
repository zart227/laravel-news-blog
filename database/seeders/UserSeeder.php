<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Создаем администратора
        if (!User::where('email', 'admin@example.com')->exists()) {
            User::factory()->create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'role' => UserRole::ADMIN,
            ]);
        }

        // Создаем обычных пользователей только если их меньше 5
        $userCount = User::where('role', UserRole::USER->value)->count();
        if ($userCount < 5) {
            User::factory(5 - $userCount)->create([
                'role' => UserRole::USER,
            ]);
        }
    }
} 