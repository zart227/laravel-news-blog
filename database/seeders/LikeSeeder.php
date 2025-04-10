<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Comment;
use App\Models\Like;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LikeSeeder extends Seeder
{
    public function run(): void
    {
        // Очищаем существующие лайки
        DB::table('likes')->truncate();
        
        $users = User::all();
        $articles = Article::all();
        $comments = Comment::all();

        // Лайки для статей
        foreach ($articles as $article) {
            // Количество пользователей, которые взаимодействуют со статьей (лайки + дизлайки)
            $interactionsCount = rand(max(5, $users->count() / 10), min($users->count(), 50));
            $randomUsers = $users->random($interactionsCount);
            
            // Процент дизлайков (10-30%)
            $dislikePercentage = rand(10, 30) / 100;
            
            foreach ($randomUsers as $user) {
                Like::create([
                    'user_id' => $user->id,
                    'likeable_id' => $article->id,
                    'likeable_type' => Article::class,
                    'is_dislike' => rand(1, 100) <= ($dislikePercentage * 100),
                    'created_at' => now()->subMinutes(rand(0, 30 * 24 * 60)), // За последние 30 дней
                ]);
            }
        }

        // Лайки для комментариев с некоторыми отрицательными рейтингами
        foreach ($comments as $comment) {
            // 15% комментариев с отрицательным рейтингом
            $negativeRating = rand(1, 100) <= 15;
            
            // Количество взаимодействий для комментария
            $interactionsCount = rand(3, min(20, $users->count() / 2));
            $randomUsers = $users->random($interactionsCount);
            
            if ($negativeRating) {
                // Для комментариев с отрицательным рейтингом большинство реакций - дизлайки (60-80%)
                $dislikePercentage = rand(60, 80) / 100;
            } else {
                // Для обычных комментариев дизлайки составляют 5-25%
                $dislikePercentage = rand(5, 25) / 100;
            }
            
            foreach ($randomUsers as $user) {
                Like::create([
                    'user_id' => $user->id,
                    'likeable_id' => $comment->id,
                    'likeable_type' => Comment::class,
                    'is_dislike' => rand(1, 100) <= ($dislikePercentage * 100),
                    'created_at' => now()->subMinutes(rand(0, 30 * 24 * 60)), // За последние 30 дней
                ]);
            }
        }
    }
} 