<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user(); // null si pas connecté

        if (!$user || !$user->is_admin) {
            abort(403, "Accès réservé à l’administrateur");
        }

        return $next($request);
    }
}
