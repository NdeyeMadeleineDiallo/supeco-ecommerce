<x-app-layout>
    <x-slot name="header">
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <h2 style="font-weight:700; font-size:18px;">Commandes (Admin)</h2>
        </div>
    </x-slot>

    <div class="py-8">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

            @if (session('success'))
                <div style="margin-bottom:12px; background:#dcfce7; padding:10px; border-radius:6px; color:#166534;">
                    {{ session('success') }}
                </div>
            @endif

            <div style="background:white; padding:16px; border-radius:10px;">
                @if($orders->count() === 0)
                    <p>Aucune commande.</p>
                @else
                    <table style="width:100%; border-collapse:collapse;">
                        <thead>
                            <tr style="background:#f3f4f6;">
                                <th style="text-align:left; padding:8px; border:1px solid #e5e7eb;">#</th>
                                <th style="text-align:left; padding:8px; border:1px solid #e5e7eb;">Client</th>
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
                                    <td style="padding:8px; border:1px solid #e5e7eb;">
                                        {{ $order->user?->name }} ({{ $order->user?->email }})
                                    </td>
                                    <td style="padding:8px; border:1px solid #e5e7eb;">{{ $order->created_at->format('d/m/Y H:i') }}</td>
                                    <td style="padding:8px; border:1px solid #e5e7eb;">{{ number_format($order->total, 0, ',', ' ') }} F</td>
                                    <td style="padding:8px; border:1px solid #e5e7eb;">{{ $order->status }}</td>
                                    <td style="padding:8px; border:1px solid #e5e7eb;">
                                        <a href="{{ route('admin.orders.show', $order) }}" style="text-decoration:underline;">
                                            Voir
                                        </a>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>

                    <div style="margin-top:12px;">
                        {{ $orders->links() }}
                    </div>
                @endif
            </div>
        </div>
    </div>
</x-app-layout>
