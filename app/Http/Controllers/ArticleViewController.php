<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleView;
use App\Http\Requests\ArticleViewRequest;
use App\Events\StatisticsUpdated;
use App\Traits\HandlesErrors;

class ArticleViewController extends Controller
{
    use HandlesErrors;

    public function store(ArticleViewRequest $request, Article $article)
    {
        try {
            $validated = $request->validated();

            // Проверяем, не просматривал ли пользователь статью в последние 24 часа
            $existingView = ArticleView::where('article_id', $article->id)
                ->where('ip_address', $validated['ip_address'])
                ->where('viewed_at', '>', now()->subDay())
                ->when($validated['user_id'], function ($query) use ($validated) {
                    return $query->orWhere('user_id', $validated['user_id']);
                })
                ->first();

            if (!$existingView) {
                ArticleView::create([
                    'article_id' => $article->id,
                    'user_id' => $validated['user_id'],
                    'ip_address' => $validated['ip_address'],
                    'viewed_at' => now(),
                ]);

                // Отправляем событие об обновлении статистики
                $viewsCount = $article->views()->count();
                broadcast(new StatisticsUpdated($article->id, 'views', $viewsCount));
            }

            return response()->json([
                'message' => 'Просмотр статьи зарегистрирован',
                'views_count' => $article->views()->count()
            ]);
        } catch (\Throwable $e) {
            return $this->handleError($e);
        }
    }
} 