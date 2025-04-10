<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\ArticleView;
use App\Models\User;
use Carbon\Carbon;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArticleViewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Очищаем существующие просмотры
        DB::table('article_views')->truncate();
        
        $faker = Faker::create();
        $users = User::all();
        $articles = Article::all();
        
        foreach ($articles as $article) {
            // Основные параметры для просмотров
            $viewsCount = rand(50, 1000); // Количество просмотров
            $uniqueViewsPercentage = $faker->numberBetween(60, 90) / 100; // Процент уникальных просмотров
            $authenticatedViewsPercentage = $faker->numberBetween(30, 70) / 100; // Процент авторизованных пользователей
            
            // Сколько всего будет авторизованных пользователей
            $authenticatedViewsCount = (int)($viewsCount * $authenticatedViewsPercentage);
            
            // Уникальные IP адреса для неавторизованных пользователей
            $uniqueIPs = [];
            for ($i = 0; $i < (int)($viewsCount * $uniqueViewsPercentage * (1 - $authenticatedViewsPercentage)); $i++) {
                $uniqueIPs[] = $faker->ipv4;
            }
            
            // Генерируем временную шкалу для просмотров
            $timeDistribution = [
                'week' => 0.4, // 40% просмотров за последнюю неделю
                'month' => 0.3, // 30% просмотров за последний месяц
                'older' => 0.3, // 30% просмотров более старые
            ];
            
            // Создаем просмотры от авторизованных пользователей
            $usedUsers = [];
            for ($i = 0; $i < $authenticatedViewsCount; $i++) {
                if (count($usedUsers) >= $users->count()) {
                    // Если уже использовали всех пользователей, создаем повторные просмотры
                    $userId = $faker->randomElement($usedUsers);
                } else {
                    // Выбираем случайного пользователя, которого еще не использовали
                    do {
                        $userId = $users->random()->id;
                    } while (in_array($userId, $usedUsers));
                    $usedUsers[] = $userId;
                }
                
                $timestamp = $this->getRandomTime($timeDistribution);
                ArticleView::create([
                    'article_id' => $article->id,
                    'user_id' => $userId,
                    'ip_address' => null,
                    'created_at' => $timestamp,
                    'updated_at' => $timestamp,
                ]);
            }
            
            // Создаем просмотры от неавторизованных пользователей
            for ($i = 0; $i < ($viewsCount - $authenticatedViewsCount); $i++) {
                $ipAddress = count($uniqueIPs) > 0 ? $faker->randomElement($uniqueIPs) : $faker->ipv4;
                $timestamp = $this->getRandomTime($timeDistribution);
                ArticleView::create([
                    'article_id' => $article->id,
                    'user_id' => null,
                    'ip_address' => $ipAddress,
                    'created_at' => $timestamp,
                    'updated_at' => $timestamp,
                ]);
            }
        }
    }
    
    /**
     * Получить случайное время просмотра на основе распределения
     */
    private function getRandomTime(array $timeDistribution): Carbon
    {
        $random = rand(1, 100) / 100;
        $cumulative = 0;
        
        foreach ($timeDistribution as $period => $probability) {
            $cumulative += $probability;
            
            if ($random <= $cumulative) {
                return match($period) {
                    'week' => now()->subMinutes(rand(0, 7 * 24 * 60)),
                    'month' => now()->subMinutes(rand(7 * 24 * 60, 30 * 24 * 60)),
                    'older' => now()->subMinutes(rand(30 * 24 * 60, 180 * 24 * 60)),
                    default => now(),
                };
            }
        }
        
        return now();
    }
} 