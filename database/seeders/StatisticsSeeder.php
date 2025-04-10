<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\Statistics;
use App\Models\Like;
use App\Models\Comment;
use App\Models\ArticleView;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class StatisticsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Удаляем существующую статистику
        DB::connection('mongodb')->table('statistics')->delete();
        
        $faker = Faker::create();
        
        // Получаем все статьи
        $articles = Article::with(['comments', 'views'])->get();
        
        foreach ($articles as $article) {
            // Получаем реальные данные
            $totalViews = $article->views->count();
            $uniqueViews = $article->views->unique(function ($view) {
                return $view->user_id ?? $view->ip_address;
            })->count();
            
            // Получаем статистику лайков
            $likesCount = Like::where('likeable_type', Article::class)
                ->where('likeable_id', $article->id)
                ->where('is_dislike', false)
                ->count();
            
            $dislikesCount = Like::where('likeable_type', Article::class)
                ->where('likeable_id', $article->id)
                ->where('is_dislike', true)
                ->count();
            
            // Подсчет комментариев
            $commentsCount = $article->comments->count();
            
            // Генерируем данные о браузерах (условные, так как нет реальных данных)
            $browsers = [
                'Chrome' => $faker->numberBetween(40, 60),
                'Firefox' => $faker->numberBetween(20, 30),
                'Safari' => $faker->numberBetween(10, 20),
                'Edge' => $faker->numberBetween(5, 15),
                'Opera' => $faker->numberBetween(1, 5)
            ];
            
            // Генерируем данные о реферерах (условные)
            $referrers = [
                'https://google.com' => $faker->numberBetween(30, 50),
                'https://yandex.ru' => $faker->numberBetween(20, 40),
                'https://bing.com' => $faker->numberBetween(5, 15),
                'https://github.com' => $faker->numberBetween(5, 10),
                'Direct' => $faker->numberBetween(10, 30)
            ];
            
            // Создаем или обновляем статистику
            Statistics::updateOrCreate(
                ['article_id' => $article->id],
                [
                    'views' => $totalViews,
                    'unique_views' => $uniqueViews,
                    'likes' => $likesCount,
                    'dislikes' => $dislikesCount,
                    'comments_count' => $commentsCount,
                    'unique_viewers' => $article->views->pluck('ip_address')->filter()->unique()->values()->toArray(),
                    'user_agents' => $browsers,
                    'referrers' => $referrers,
                    'shares' => $faker->numberBetween(0, (int)($uniqueViews * 0.05)),
                    'created_at' => $article->created_at,
                    'updated_at' => now()
                ]
            );
        }
    }
}
