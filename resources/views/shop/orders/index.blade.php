@extends('layouts.shop')

@section('title', 'Mes commandes')

@section('content')
    <h1 style="font-size:28px; font-weight:700; margin-bottom:16px;">Mes commandes</h1>

    @if($orders->count() === 0)
        <p>Aucune commande pour le moment.</p>
    @else
        <div style="background:white; padding:16px; border-radius:10px;">
            <table style="width:100%; border-collapse:collapse;">
                <thead>
                    <tr style="background:#f3f4f6;">
                        <th style="text-align:left; padding:8px; border:1px solid #e5e7eb;">#</th>
                        <th style="text-align:left; padding:8px; border:1px solid #e5e7eb;">Date</th>
                        <th style="text-align:left; padding:8px; border:1px solid #e5e7eb;">Total</th>
                        <th style="text-align:left; padding:8px; border:1px solid #e5e7eb;">Statut</th>
                        <th style="text-align:left; padding:8px; border:1px solid #e5e7eb;">Action</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($orders as $order)
                        <tr>
                            <td style="padding:8px; border:1px solid #e5e7eb;">{{ $order->id }}</td>
                            <td style="padding:8px; border:1px solid #e5e7eb;">{{ $order->created_at->format('d/m/Y H:i') }}</td>
                            <td style="padding:8px; border:1px solid #e5e7eb;">{{ number_format($order->total, 0, ',', ' ') }} F</td>
                            <td style="padding:8px; border:1px solid #e5e7eb;">{{ $order->status }}</td>
                            <td style="padding:8px; border:1px solid #e5e7eb;">
                                <a href="{{ route('orders.show', $order) }}" style="text-decoration:underline;">
                                    Détails
                                </a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

            <div style="margin-top:12px;">
                {{ $orders->links() }}
            </div>
        </div>
    @endif
@endsection
