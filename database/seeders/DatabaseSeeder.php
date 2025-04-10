<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\ArticleView;
use App\Models\Comment;
use App\Models\Tag;
use App\Models\User;
use App\Enums\UserRole;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Очищаем папку с картинками статей
        Storage::disk('public')->deleteDirectory('articles');
        Storage::disk('public')->makeDirectory('articles');

        // Создаем пользователей с разными ролями
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => UserRole::ADMIN
        ]);

        $admins = User::factory(3)->create(['role' => UserRole::ADMIN]);
        $users = User::factory(20)->create(['role' => UserRole::USER]);

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

        // Создаем статьи от имени администраторов
        $articles = collect();
        foreach ($admins as $admin) {
            $adminArticles = Article::factory(rand(3, 7))
                ->create(['user_id' => $admin->id]);
            $articles = $articles->concat($adminArticles);
        }

        // Создаем комментарии к статьям
        $articles->each(function ($article) use ($users) {
            // Перемешиваем пользователей для каждой статьи
            $shuffledUsers = $users->shuffle();
            $userIndex = 0;

            // Создаем корневые комментарии
            $rootComments = collect();
            $commentsCount = rand(3, 8);
            
            for ($i = 0; $i < $commentsCount; $i++) {
                $comment = Comment::factory()->forArticle($article)->create([
                    'user_id' => $shuffledUsers[$userIndex % $users->count()]->id
                ]);
                $rootComments->push($comment);
                $userIndex++;
            }

            // Для каждого корневого комментария создаем ветку ответов
            $rootComments->each(function ($comment) use ($shuffledUsers, &$userIndex, $users) {
                // Первый уровень ответов
                $replies = collect();
                $repliesCount = rand(1, 3);
                
                for ($i = 0; $i < $repliesCount; $i++) {
                    $reply = Comment::factory()->asReply($comment)->create([
                        'user_id' => $shuffledUsers[$userIndex % $users->count()]->id
                    ]);
                    $replies->push($reply);
                    $userIndex++;
                }

                // Второй уровень ответов
                $replies->each(function ($reply) use ($shuffledUsers, &$userIndex, $users) {
                    $nestedRepliesCount = rand(0, 2);
                    
                    for ($i = 0; $i < $nestedRepliesCount; $i++) {
                        Comment::factory()->asReply($reply)->create([
                            'user_id' => $shuffledUsers[$userIndex % $users->count()]->id
                        ]);
                        $userIndex++;
                    }
                });
            });
        });

        // Теперь запускаем остальные сидеры в правильном порядке
        $this->call([
            UserSeeder::class,        // Дополнительные пользователи
            ArticleViewSeeder::class, // Просмотры статей
            LikeSeeder::class,        // Лайки и дизлайки
            StatisticsSeeder::class,  // Статистика в MongoDB на основе просмотров и лайков
        ]);
    }
}
