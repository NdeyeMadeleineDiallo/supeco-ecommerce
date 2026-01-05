@extends('layouts.shop')

@section('title', 'Produits')

@section('content')
    <h1 style="font-size:28px; font-weight:700; margin-bottom:16px;">Catalogue</h1>

    @if(request('category'))
        <p style="margin-bottom:12px; color:#6b7280;">
            Filtre catégorie : <strong>{{ request('category') }}</strong>
            — <a href="{{ route('shop.products') }}" style="text-decoration:underline;">retirer filtre</a>
        </p>
    @endif

    @if($products->count() === 0)
        <p>Aucun produit disponible.</p>
    @else
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:16px;">
            @foreach($products as $product)
                <div style="background:white; padding:12px; border-radius:10px; border:1px solid #e5e7eb;">
                    @if($product->image)
                        <img src="{{ asset('storage/'.$product->image) }}"
                             style="width:100%; height:150px; object-fit:cover; border-radius:8px; margin-bottom:10px;">
                    @endif

                    <h3 style="font-weight:700; margin-bottom:4px;">{{ $product->name }}</h3>
                    <p style="color:#6b7280; font-size:14px; margin-bottom:8px;">
                        {{ $product->category?->name }}
                    </p>

                    <p style="font-weight:800; color:#080a0a; margin-bottom:10px;">
                        {{ number_format($product->price, 0, ',', ' ') }} F
                    </p>

                    <form method="POST" action="{{ route('cart.add', $product) }}">
    @csrf
    <button type="submit"
            style="background:#080a0a; color:#fecc33; padding:8px 10px; border-radius:8px; border:none; cursor:pointer;">
        Ajouter au panier
    </button>
</form>

                </div>
            @endforeach
        </div>

        <div style="margin-top:14px;">
            {{ $products->links() }}
        </div>
    @endif
@endsection
