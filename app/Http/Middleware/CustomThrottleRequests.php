<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Cache\RateLimiter;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use RuntimeException;
use Symfony\Component\HttpFoundation\Response;

class CustomThrottleRequests
{
    protected $limiter;

    public function __construct(RateLimiter $limiter)
    {
        $this->limiter = $limiter;
    }

    public function handle(Request $request, Closure $next, $maxAttempts = 60, $decayMinutes = 1, $prefix = '')
    {
        // Определяем лимиты в зависимости от типа запроса
        $limits = $this->getRequestLimits($request);
        $maxAttempts = $limits['maxAttempts'];
        $decayMinutes = $limits['decayMinutes'];

        $key = $this->resolveRequestSignature($request, $prefix);

        if ($this->limiter->tooManyAttempts($key, $maxAttempts)) {
            throw $this->buildException($key, $maxAttempts);
        }

        $this->limiter->hit($key, $decayMinutes * 60);

        $response = $next($request);

        return $this->addHeaders(
            $response,
            $maxAttempts,
            $this->calculateRemainingAttempts($key, $maxAttempts)
        );
    }

    protected function getRequestLimits(Request $request): array
    {
        // Базовые лимиты
        $defaultLimits = [
            'maxAttempts' => 60,
            'decayMinutes' => 1
        ];

        // Особые лимиты для определенных эндпоинтов
        $endpointLimits = [
            'articles' => [
                'GET' => ['maxAttempts' => 120, 'decayMinutes' => 1],
                'POST' => ['maxAttempts' => 30, 'decayMinutes' => 1],
                'PUT' => ['maxAttempts' => 30, 'decayMinutes' => 1],
                'DELETE' => ['maxAttempts' => 20, 'decayMinutes' => 1],
            ],
            'comments' => [
                'POST' => ['maxAttempts' => 20, 'decayMinutes' => 1],
                'PUT' => ['maxAttempts' => 20, 'decayMinutes' => 1],
                'DELETE' => ['maxAttempts' => 10, 'decayMinutes' => 1],
            ],
            'views' => [
                'POST' => ['maxAttempts' => 60, 'decayMinutes' => 1],
            ],
        ];

        // Определяем тип запроса
        $path = $request->path();
        $method = $request->method();

        // Ищем соответствующие лимиты
        foreach ($endpointLimits as $endpoint => $methodLimits) {
            if (Str::contains($path, $endpoint)) {
                return $methodLimits[$method] ?? $defaultLimits;
            }
        }

        return $defaultLimits;
    }

    protected function resolveRequestSignature(Request $request, string $prefix = ''): string
    {
        if ($user = $request->user()) {
            return sha1($prefix . $user->getAuthIdentifier());
        }

        return sha1(
            $prefix .
            $request->ip() .
            '|' .
            $request->userAgent()
        );
    }

    protected function buildException($key, $maxAttempts): RuntimeException
    {
        $retryAfter = $this->limiter->availableIn($key);

        $headers = $this->getHeaders(
            $maxAttempts,
            $this->calculateRemainingAttempts($key, $maxAttempts, $retryAfter),
            $retryAfter
        );

        return new RuntimeException(
            'Too Many Attempts.',
            Response::HTTP_TOO_MANY_REQUESTS,
            $headers
        );
    }

    protected function calculateRemainingAttempts($key, $maxAttempts, $retryAfter = null)
    {
        return is_null($retryAfter)
            ? $this->limiter->retriesLeft($key, $maxAttempts)
            : 0;
    }

    protected function getHeaders($maxAttempts, $remainingAttempts, $retryAfter = null): array
    {
        $headers = [
            'X-RateLimit-Limit' => $maxAttempts,
            'X-RateLimit-Remaining' => $remainingAttempts,
        ];

        if (!is_null($retryAfter)) {
            $headers['Retry-After'] = $retryAfter;
            $headers['X-RateLimit-Reset'] = $retryAfter;
        }

        return $headers;
    }

    protected function addHeaders(Response $response, $maxAttempts, $remainingAttempts, $retryAfter = null): Response
    {
        $response->headers->add(
            $this->getHeaders($maxAttempts, $remainingAttempts, $retryAfter)
        );

        return $response;
    }
} 