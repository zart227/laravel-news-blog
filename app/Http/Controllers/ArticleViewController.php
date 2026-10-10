<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Services\ViewTracker;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArticleViewController extends Controller
{
    public function store(Article $article, Request $request, ViewTracker $tracker): JsonResponse
    {
        abort_if($article->status !== 'published' && ! $request->user(), 404);

        return response()->json(['success' => true, 'statistics' => $tracker->track($article, $request)]);
    }
}
