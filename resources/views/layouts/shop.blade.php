<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>@yield('title', 'SUPECO')</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body style="background:#f9fafb;">

    {{-- HEADER --}}
    <header style="background:#fecc33; border-bottom:2px solid #080a0a;">
        <div style="max-width:1200px; margin:auto; padding:12px; display:flex; align-items:center; justify-content:space-between;">

            {{-- Logo --}}
            <a href="/" style="display:flex; align-items:center; gap:10px; text-decoration:none;">
                <img src="{{ asset('images/supeco-logo.png') }}" alt="SUPECO" style="height:40px;">
                <strong style="color:#080a0a; font-size:18px;">SUPECO</strong>
            </a>

            {{-- Menu --}}
            <nav style="display:flex; gap:18px; align-items:center;">
                <a href="/" style="color:#080a0a;">Accueil</a>
                <a href="/a-propos" style="color:#080a0a;">À propos</a>
                <a href="/categories" style="color:#080a0a;">Catégories</a>
                <a href="/produits" style="color:#080a0a;">Produits</a>

                {{-- Recherche --}}
                <a href="/recherche" title="Rechercher">🔍</a>

                {{-- Panier --}}
                <a href="{{ route('cart.index') }}" title="Panier">🛒</a>


                {{-- Compte --}}
                @auth
    <a href="{{ route('orders.index') }}" style="color:#080a0a;">Mes commandes</a>
    <a href="{{ route('dashboard') }}" style="color:#080a0a;">Compte</a>
@else
    <a href="/login" style="color:#080a0a;">Connexion</a>
@endauth

            </nav>
        </div>
    </header>

    {{-- CONTENU --}}
    <main style="max-width:1200px; margin:auto; padding:24px;">
        @yield('content')
    </main>

    {{-- FOOTER --}}
    <footer style="background:#080a0a; color:#fecc33; padding:24px; margin-top:40px;">
        <div style="max-width:1200px; margin:auto; text-align:center;">
            <p><strong>SUPECO</strong> — Votre grande surface en ligne</p>
            <p style="font-size:14px;">© {{ date('Y') }} SUPECO · Tous droits réservés</p>
        </div>
    </footer>

</body>
</html>
