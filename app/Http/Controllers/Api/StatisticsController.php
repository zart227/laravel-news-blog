<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\StatisticsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;

class StatisticsController extends Controller
{
    public function index(Request $request, StatisticsService $service): JsonResponse
    {
        $validated = $request->validate(['period' => ['sometimes', Rule::in(['week', 'month', 'year'])]]);
        $period = $validated['period'] ?? 'week';

        return response()->json(Cache::remember('statistics:'.$period, 60,
            fn () => $service->getReport($period)));
    }
}
