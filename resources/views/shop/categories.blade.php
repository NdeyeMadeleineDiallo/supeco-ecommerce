@extends('layouts.shop')

@section('title', 'Catégories')

@section('content')
    <h1 style="font-size:28px; font-weight:700; margin-bottom:16px;">Catégories</h1>

    @if($categories->count() === 0)
        <p>Aucune catégorie pour le moment.</p>
    @else
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:16px;">
            @foreach($categories as $category)
                <a href="{{ route('shop.products', ['category' => $category->slug]) }}"
                   style="text-decoration:none;">
                    <div style="background:white; padding:14px; border-radius:10px; border:1px solid #e5e7eb;">
                        <h3 style="font-weight:700; color:#080a0a;">{{ $category->name }}</h3>
                        <p style="color:#6b7280; font-size:14px;">Voir les produits</p>
                    </div>
                </a>
            @endforeach
        </div>
    @endif
@endsection
