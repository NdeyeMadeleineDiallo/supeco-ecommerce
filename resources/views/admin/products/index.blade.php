<x-app-layout>
    <x-slot name="header">
        <div style="display:flex; align-items:center; justify-content:space-between;">
            <h2 style="font-weight:700; font-size:18px;">Produits</h2>

            <a href="{{ route('products.create') }}"
               style="background:#2563eb; color:white; padding:8px 12px; border-radius:6px; text-decoration:none;">
                + Nouveau produit
            </a>
        </div>
    </x-slot>

    <div class="py-8">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

            @if (session('success'))
                <div style="margin-bottom:12px; background:#dcfce7; padding:10px; border-radius:6px; color:#166534;">
                    {{ session('success') }}
                </div>
            @endif

            <div style="background:white; padding:16px; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,.1);">

                @if($products->count() === 0)
                    <p style="margin-bottom:12px;">Aucun produit pour le moment.</p>

                    <a href="{{ route('products.create') }}"
                       style="display:inline-block; background:#2563eb; color:white; padding:10px 14px; border-radius:6px; text-decoration:none;">
                        Créer le premier produit
                    </a>
                @else
                    <table style="width:100%; border-collapse:collapse;">
                        <thead>
                            <tr style="background:#f3f4f6;">
                                <th style="text-align:left; padding:8px; border:1px solid #e5e7eb;">Image</th>
                                <th style="text-align:left; padding:8px; border:1px solid #e5e7eb;">Nom</th>
                                <th style="text-align:left; padding:8px; border:1px solid #e5e7eb;">Catégorie</th>
                                <th style="text-align:left; padding:8px; border:1px solid #e5e7eb;">Prix</th>
                                <th style="text-align:left; padding:8px; border:1px solid #e5e7eb;">Stock</th>
                                <th style="text-align:left; padding:8px; border:1px solid #e5e7eb;">Actif</th>
                                <th style="text-align:left; padding:8px; border:1px solid #e5e7eb;">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($products as $product)
                                <tr>
                                    <td style="padding:8px; border:1px solid #e5e7eb;">
                                        @if($product->image)
                                            <img src="{{ asset('storage/' . $product->image) }}" alt=""
                                                 style="width:60px; height:60px; object-fit:cover; border-radius:6px;">
                                        @else
                                            <span style="color:#6b7280;">—</span>
                                        @endif
                                    </td>
                                    <td style="padding:8px; border:1px solid #e5e7eb;">{{ $product->name }}</td>
                                    <td style="padding:8px; border:1px solid #e5e7eb;">{{ $product->category?->name }}</td>
                                    <td style="padding:8px; border:1px solid #e5e7eb;">{{ number_format($product->price, 0, ',', ' ') }} F</td>
                                    <td style="padding:8px; border:1px solid #e5e7eb;">{{ $product->stock }}</td>
                                    <td style="padding:8px; border:1px solid #e5e7eb;">
                                        @if($product->is_active)
                                            ✅
                                        @else
                                            ❌
                                        @endif
                                    </td>
                                    <td style="padding:8px; border:1px solid #e5e7eb; white-space:nowrap;">
                                        <a href="{{ route('products.edit', $product) }}"
                                           style="color:#2563eb; margin-right:12px; text-decoration:underline;">
                                            Modifier
                                        </a>

                                        <form method="POST" action="{{ route('products.destroy', $product) }}"
                                              style="display:inline;"
                                              onsubmit="return confirm('Voulez-vous vraiment supprimer ce produit ?');">
                                            @csrf
                                            @method('DELETE')

                                            <button type="submit"
                                                    style="background:#dc2626; color:white; padding:6px 10px; border-radius:6px; border:none; cursor:pointer;">
                                                Supprimer
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>

                    <div style="margin-top:12px;">
                        {{ $products->links() }}
                    </div>
                @endif
            </div>
        </div>
    </div>
</x-app-layout>
