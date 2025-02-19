<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\ArticleView;
use App\Models\Comment;
use App\Models\Tag;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Создаем администратора
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Создаем обычного пользователя
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);

        // Создаем теги
        $tags = [
            ['name' => 'Технологии', 'slug' => 'technologies'],
            ['name' => 'Новости', 'slug' => 'news'],
            ['name' => 'Туториалы', 'slug' => 'tutorials'],
            ['name' => 'Разработка', 'slug' => 'development'],
        ];

        foreach ($tags as $tag) {
            Tag::create($tag);
        }

        // Создаем статьи
        Article::factory()
            ->count(10)
            ->sequence(fn ($sequence) => ['user_id' => $admin->id])
            ->create()
            ->each(function ($article) use ($user, $admin) {
                // Привязываем случайные теги
                $article->tags()->attach(
                    Tag::inRandomOrder()->limit(rand(1, 3))->get()
                );

                // Создаем комментарии
                Comment::factory()
                    ->count(rand(2, 5))
                    ->sequence(fn ($sequence) => ['user_id' => $user->id])
                    ->create(['article_id' => $article->id])
                    ->each(function ($comment) use ($admin, $article) {
                        // Добавляем ответы на комментарии
                        if (rand(0, 1)) {
                            Comment::factory()
                                ->count(rand(1, 2))
                                ->sequence(fn ($sequence) => ['user_id' => $admin->id])
                                ->create([
                                    'article_id' => $article->id,
                                    'parent_id' => $comment->id,
                                ]);
                        }
                    });

                // Создаем просмотры
                ArticleView::factory()
                    ->count(rand(10, 50))
                    ->create(['article_id' => $article->id]);
            });
    }
}
