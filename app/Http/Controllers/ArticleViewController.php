<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Services\StatisticsService;
use Illuminate\Http\JsonResponse;

class ArticleViewController extends Controller
{
    protected $statisticsService;

    public function __construct(StatisticsService $statisticsService)
    {
        $this->statisticsService = $statisticsService;
    }

    public function store(Article $article): JsonResponse
    {
        $statistics = $this->statisticsService->recordView($article);

        return response()->json([
            'success' => true,
            'statistics' => $statistics
        ]);
    }
} 