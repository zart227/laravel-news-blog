<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;
use Throwable;

trait HandlesErrors
{
    /**
     * Обработка ошибок и возврат JSON ответа
     */
    protected function handleError(Throwable $e)
    {
        Log::error($e->getMessage(), [
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'trace' => $e->getTraceAsString()
        ]);

        $response = [
            'success' => false,
            'message' => 'Произошла ошибка при обработке запроса'
        ];

        if (config('app.debug')) {
            $response['debug'] = [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ];
        }

        $statusCode = 500;

        switch (true) {
            case $e instanceof ValidationException:
                $response['message'] = 'Ошибка валидации';
                $response['errors'] = $e->errors();
                $statusCode = 422;
                break;

            case $e instanceof ModelNotFoundException:
            case $e instanceof NotFoundHttpException:
                $response['message'] = 'Запрашиваемый ресурс не найден';
                $statusCode = 404;
                break;

            case $e instanceof AuthorizationException:
                $response['message'] = 'У вас нет прав для выполнения этого действия';
                $statusCode = 403;
                break;

            case $e instanceof QueryException:
                $response['message'] = 'Ошибка при работе с базой данных';
                if (config('app.debug')) {
                    $response['debug']['sql'] = $e->getSql();
                    $response['debug']['bindings'] = $e->getBindings();
                }
                break;
        }

        if (request()->wantsJson()) {
            return response()->json($response, $statusCode);
        }

        return back()->with('error', $response['message']);
    }
} 