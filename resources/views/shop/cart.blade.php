@extends('layouts.shop')

@section('title', 'Panier')

@section('content')
    <h1 style="font-size:28px; font-weight:700; margin-bottom:16px;">Panier</h1>

    @if (session('success'))
        <div style="background:#dcfce7; padding:10px; border-radius:6px; margin-bottom:12px;">
            {{ session('success') }}
        </div>
    @endif

    @if(empty($cart))
        <p>Votre panier est vide.</p>
    @else
        @php $total = 0; @endphp

        <div style="background:white; padding:16px; border-radius:10px;">
            @foreach($cart as $id => $item)
                @php $total += $item['price'] * $item['quantity']; @endphp

                <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px;">
                    @if($item['image'])
                        <img src="{{ asset('storage/'.$item['image']) }}"
                             style="width:80px; height:80px; object-fit:cover; border-radius:8px;">
                    @endif

                    <div style="flex:1;">
                        <strong>{{ $item['name'] }}</strong><br>
                        {{ number_format($item['price'], 0, ',', ' ') }} F
                    </div>

                    {{-- ✅ Quantité modifiable --}}
                    <form method="POST"
                          action="{{ route('cart.update', $id) }}"
                          style="display:flex; align-items:center; gap:6px;">
                        @csrf
                        <input type="number" name="quantity" min="1"
                               value="{{ $item['quantity'] }}"
                               style="width:60px; padding:6px; border:1px solid #e5e7eb; border-radius:6px;">
                        <button type="submit"
                                style="background:#2563eb; color:white; padding:6px 10px; border-radius:6px; border:none; cursor:pointer;">
                            OK
                        </button>
                    </form>

                    <form method="POST" action="{{ route('cart.remove', $id) }}">
                        @csrf
                        <button type="submit"
                                style="background:#dc2626; color:white; padding:6px 10px; border-radius:6px; border:none;">
                            Supprimer
                        </button>
                    </form>
                </div>
            @endforeach

            <hr style="margin:12px 0;">

            <h3>Total : <strong>{{ number_format($total, 0, ',', ' ') }} F</strong></h3>

            <div style="margin-top:14px;">
                {{-- ✅ Commander (checkout) --}}
                <form method="POST" action="{{ route('checkout') }}">
                    @csrf
                    <button type="submit"
                            style="background:#16a34a; color:white; padding:10px 14px; border-radius:8px; border:none; cursor:pointer;">
                        Commander
                    </button>
                </form>
            </div>
        </div>
    @endif
@endsection
