<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class ForceHttps
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (App::environment(['staging', 'production']) && $_SERVER["HTTP_X_FORWARDED_PROTO"] != 'https') {
            return redirect()->secure($request->getRequestUri());
        }
        return $next($request);
    }
}