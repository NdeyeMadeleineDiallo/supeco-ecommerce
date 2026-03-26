<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->string('search')->toString();

        $users = User::query()
            ->withCount('orders')
            ->when($search, function ($q) use ($search) {
                $q->where(function ($qq) use ($search) {
                    $qq->where('name', 'like', "%{$search}%")
                       ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'filters' => [
                'search' => $search,
            ],
            'users' => $users,
        ]);
    }

    public function show(User $user)
    {
        $user->load([
            'orders' => function ($query) {
                $query->latest();
            }
        ]);

        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
            'orders' => $user->orders->map(function ($order) {
                return [
                    'id' => $order->id,
                    'status' => $order->status,
                    'payment_status' => $order->payment_status,
                    'payment_method' => $order->payment_method,
                    'total' => (int) $order->total,
                    'created_at' => optional($order->created_at)->format('d/m/Y H:i'),
                ];
            }),
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,' . $user->id],
        ]);

        $user->update($validated);

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'Utilisateur mis à jour avec succès.');
    }

    public function toggleStatus(User $user)
    {
        $user->update([
            'is_active' => !$user->is_active,
        ]);

        $message = $user->is_active
            ? 'Utilisateur activé avec succès.'
            : 'Utilisateur désactivé avec succès.';

        return redirect()
            ->route('admin.users.index')
            ->with('success', $message);
    }
}