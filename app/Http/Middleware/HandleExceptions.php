<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Traits\HandlesErrors;
use Throwable;

class HandleExceptions
{
    use HandlesErrors;

    public function handle(Request $request, Closure $next)
    {
        try {
            return $next($request);
        } catch (Throwable $e) {
            return $this->handleError($e);
        }
    }
} 