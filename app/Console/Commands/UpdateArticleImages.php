<?php

namespace App\Console\Commands;

use App\Models\Article;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class UpdateArticleImages extends Command
{
    protected $signature = 'articles:update-images';
    protected $description = 'Обновляет изображения для статей без них';

    public function handle()
    {
        $articles = Article::all();

        $this->info("Найдено {$articles->count()} статей для обновления изображений");

        foreach ($articles as $article) {
            $this->info("Обновляю изображение для статьи #{$article->id}");

            try {
                // Удаляем старое изображение если оно есть
                if ($article->image_path) {
                    Storage::disk('public')->delete($article->image_path);
                }

                // Загружаем случайное изображение
                $imageId = rand(1, 1000);
                $response = Http::get("https://dummyimage.com/800x600/3498db/ffffff.jpg&text=Article+{$imageId}");
                
                if ($response->successful()) {
                    // Генерируем уникальное имя файла
                    $filename = 'articles/' . uniqid() . '.jpg';
                    
                    // Сохраняем изображение
                    Storage::disk('public')->put($filename, $response->body());
                    
                    // Обновляем статью
                    $article->update(['image_path' => $filename]);
                    
                    $this->info("✓ Изображение успешно добавлено: {$filename}");
                } else {
                    $this->error("Ошибка при загрузке изображения для статьи #{$article->id}: " . $response->status());
                }
            } catch (\Exception $e) {
                $this->error("Ошибка: " . $e->getMessage());
            }
        }

        $this->info('Обновление изображений завершено');
    }
} 