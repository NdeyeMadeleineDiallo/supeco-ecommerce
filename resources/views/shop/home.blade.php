@extends('layouts.shop')

@section('title', 'Accueil')

@section('content')
    <h1 style="font-size:28px; font-weight:700; margin-bottom:20px;">
        Bienvenue sur SUPECO
    </h1>

    <p style="margin-bottom:30px;">
        Achetez vos produits essentiels simplement et rapidement.
    </p>

    <h2 style="font-size:20px; font-weight:600; margin-bottom:12px;">
        Produits récents
    </h2>

    <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:20px;">
        @foreach($products as $product)
            <div style="background:white; padding:12px; border-radius:8px;">
                @if($product->image)
                    <img src="{{ asset('storage/'.$product->image) }}"
                         style="width:100%; height:150px; object-fit:cover; border-radius:6px;">
                @endif

                <h3 style="font-weight:600; margin-top:10px;">
                    {{ $product->name }}
                </h3>

                <p style="color:#2563eb; font-weight:700;">
                    {{ number_format($product->price, 0, ',', ' ') }} F
                </p>
            </div>
        @endforeach
    </div>
@endsection
