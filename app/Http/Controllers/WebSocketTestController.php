<?php

namespace App\Http\Controllers;

use App\Events\TestEvent;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class WebSocketTestController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Debug/WebSocketTest');
    }

    public function sendMessage(): JsonResponse
    {
        $message = 'Тестовое сообщение отправлено в ' . now()->format('H:i:s');
        
        TestEvent::dispatch($message);
        
        return response()->json(['message' => 'Сообщение отправлено']);
    }
} 