<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $cart = session('cart', []);
        $cartCount = collect($cart)->sum('quantity');

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],

            // ✅ Badge panier partout
            'cartCount' => $cartCount,

            // ✅ Flash messages (success/error)
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],

            // ✅ CSRF token (utile pour logout form si tu gardes un <form>)
            'csrf_token' => csrf_token(),
        ]);
    }
}
