<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    private array $allowedStatuses = [
        'en_attente',
        'en_preparation',
        'validee',
        'en_livraison',
        'expediee',
        'livree',
        'annulee',
        'payee',
    ];

    public function index()
    {
        $orders = Order::with('user')
            ->latest()
            ->paginate(15)
            ->through(fn ($o) => [
                'id' => $o->id,
                'created_at' => optional($o->created_at)->format('d/m/Y H:i'),

                'user' => $o->user ? [
                    'id' => $o->user->id,
                    'name' => $o->user->name,
                    'email' => $o->user->email,
                ] : null,

                'total' => (float) $o->total,
                'status' => $o->status,

                'payment_status' => $o->payment_status,
                'payment_method' => $o->payment_method,
                'payment_ref' => $o->payment_ref,
            ]);

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function show(Order $order)
    {
        $order->load(['user', 'items.product']);

        return Inertia::render('Admin/Orders/Show', [
            'order' => [
                'id' => $order->id,
                'created_at' => optional($order->created_at)->format('d/m/Y H:i'),

                'status' => $order->status,
                'total' => (float) $order->total,

                'payment_status' => $order->payment_status,
                'payment_method' => $order->payment_method,
                'payment_ref' => $order->payment_ref,

                'shipping_name' => $order->shipping_name,
                'shipping_phone' => $order->shipping_phone,
                'shipping_city' => $order->shipping_city,
                'shipping_address' => $order->shipping_address,
                'shipping_note' => $order->shipping_note,

                'user' => $order->user ? [
                    'id' => $order->user->id,
                    'name' => $order->user->name,
                    'email' => $order->user->email,
                ] : null,

                'items' => $order->items->map(fn ($it) => [
                    'id' => $it->id,
                    'product_id' => $it->product_id,
                    'name' => $it->product?->name ?? 'Produit supprimé',
                    'price' => (float) $it->price,
                    'quantity' => (int) $it->quantity,
                    'subtotal' => (float) $it->price * (int) $it->quantity,
                ])->values(),
            ],

            'allowedStatuses' => $this->allowedStatuses,
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $data = $request->validate([
            'status' => ['required', 'in:' . implode(',', $this->allowedStatuses)],
        ]);

        $newStatus = $data['status'];

        $update = [
            'status' => $newStatus,
        ];

        if (in_array($newStatus, ['validee', 'livree', 'payee'], true)) {
            $update['payment_status'] = 'paid';
        }

        if ($newStatus === 'annulee' && $order->payment_status !== 'paid') {
            $update['payment_status'] = 'failed';
        }

        $order->update($update);

        return redirect("/admin/orders/{$order->id}")
            ->with('success', 'Statut mis à jour avec succès.');
    }
}