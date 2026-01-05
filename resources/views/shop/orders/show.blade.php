@extends('layouts.shop')

@section('title', 'Détails commande')

@section('content')
    <h1 style="font-size:28px; font-weight:700; margin-bottom:16px;">
        Commande #{{ $order->id }}
    </h1>

    <div style="background:white; padding:16px; border-radius:10px; margin-bottom:14px;">
        <p><strong>Date :</strong> {{ $order->created_at->format('d/m/Y H:i') }}</p>
        <p><strong>Statut :</strong> {{ $order->status }}</p>
        <p><strong>Total :</strong> {{ number_format($order->total, 0, ',', ' ') }} F</p>
    </div>

    <div style="background:white; padding:16px; border-radius:10px;">
        <h3 style="font-weight:700; margin-bottom:10px;">Produits</h3>

        <table style="width:100%; border-collapse:collapse;">
            <thead>
                <tr style="background:#f3f4f6;">
                    <th style="text-align:left; padding:8px; border:1px solid #e5e7eb;">Produit</th>
                    <th style="text-align:left; padding:8px; border:1px solid #e5e7eb;">Prix</th>
                    <th style="text-align:left; padding:8px; border:1px solid #e5e7eb;">Quantité</th>
                    <th style="text-align:left; padding:8px; border:1px solid #e5e7eb;">Sous-total</th>
                </tr>
            </thead>
            <tbody>
                @foreach($order->items as $item)
                    <tr>
                        <td style="padding:8px; border:1px solid #e5e7eb;">
                            {{ $item->product?->name ?? 'Produit supprimé' }}
                        </td>
                        <td style="padding:8px; border:1px solid #e5e7eb;">
                            {{ number_format($item->price, 0, ',', ' ') }} F
                        </td>
                        <td style="padding:8px; border:1px solid #e5e7eb;">
                            {{ $item->quantity }}
                        </td>
                        <td style="padding:8px; border:1px solid #e5e7eb;">
                            {{ number_format($item->price * $item->quantity, 0, ',', ' ') }} F
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <div style="margin-top:12px;">
            <a href="{{ route('orders.index') }}" style="text-decoration:underline;">← Retour</a>
        </div>
    </div>
@endsection
