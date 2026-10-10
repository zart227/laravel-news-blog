<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Inertia\Inertia;
use Tighten\Ziggy\Ziggy;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render an exception into an HTTP response.
     */
    public function render($request, Throwable $e)
    {
        $response = parent::render($request, $e);

        if ($request->header('X-Inertia')) {
            return Inertia::render('Error/Error', [
                'status' => $response->status(),
                'message' => $e->getMessage(),
                'ziggy' => function () use ($request) {
                    return array_merge((new Ziggy)->toArray(), [
                        'location' => $request->url(),
                        'query' => $request->query(),
                    ]);
                },
            ])->toResponse($request)->setStatusCode($response->status());
        }

        return $response;
    }
} 