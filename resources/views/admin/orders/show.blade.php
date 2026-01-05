<x-app-layout>
    <x-slot name="header">
        <h2 style="font-weight:700; font-size:18px;">Commande #{{ $order->id }}</h2>
    </x-slot>

    <div class="py-8">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

            @if (session('success'))
                <div style="margin-bottom:12px; background:#dcfce7; padding:10px; border-radius:6px; color:#166534;">
                    {{ session('success') }}
                </div>
            @endif

            <div style="background:white; padding:16px; border-radius:10px; margin-bottom:14px;">
                <p><strong>Client :</strong> {{ $order->user?->name }} ({{ $order->user?->email }})</p>
                <p><strong>Date :</strong> {{ $order->created_at->format('d/m/Y H:i') }}</p>
                <p><strong>Total :</strong> {{ number_format($order->total, 0, ',', ' ') }} F</p>
                <p><strong>Statut actuel :</strong> {{ $order->status }}</p>

                <hr style="margin:12px 0;">

                <form method="POST" action="{{ route('admin.orders.status', $order) }}" style="display:flex; gap:10px; align-items:center;">
                    @csrf
                    <label for="status"><strong>Changer statut :</strong></label>
                    <select name="status" id="status" style="padding:8px; border:1px solid #e5e7eb; border-radius:6px;">
                        @foreach(['en_attente','validee','expediee','livree','annulee'] as $s)
                            <option value="{{ $s }}" @selected($order->status === $s)>{{ $s }}</option>
                        @endforeach
                    </select>
                    <button type="submit" style="background:#2563eb; color:white; padding:8px 12px; border-radius:8px; border:none;">
                        Mettre à jour
                    </button>
                </form>
            </div>

            <div style="background:white; padding:16px; border-radius:10px;">
                <h3 style="font-weight:700; margin-bottom:10px;">Articles</h3>

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
                    <a href="{{ route('admin.orders.index') }}" style="text-decoration:underline;">← Retour</a>
                </div>
            </div>

        </div>
    </div>
</x-app-layout>
