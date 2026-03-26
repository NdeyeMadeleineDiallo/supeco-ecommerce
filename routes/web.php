<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\AdminUserController;

use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ContactMessage;
use Inertia\Inertia;



/*
|--------------------------------------------------------------------------
| Routes publiques (Front SUPECO)
|--------------------------------------------------------------------------
*/

// Accueil dynamique
Route::get('/', function () {
    $products = Product::where('is_active', true)
        ->latest()
        ->take(4)
        ->get(['id','name','price','image']);

    $featuredSlugs = [
        'charcuterie',
        'fruits-et-legumes',
        'boissons',
        'cremerie',
        'patisserie'
    ];

    $featuredCategories = Category::whereIn('slug', $featuredSlugs)
        ->orderByRaw("FIELD(slug, 'charcuterie','fruits-et-legumes','boissons','cremerie','patisserie')")
        ->get(['id','name','slug']);

    return Inertia::render('Home', [
        'products' => $products,
        'featuredCategories' => $featuredCategories,
    ]);
})->name('home');


// À propos
Route::get('/a-propos', function () {
    return Inertia::render('About');
})->name('about');

// Nos implantations
Route::get('/nos-implantations', function () {
    return Inertia::render('Locations');
})->name('locations');

// Liste catégories
Route::get('/categories', function () {
    $categories = Category::orderBy('name')->get();

    return Inertia::render('Categories', [
        'categories' => $categories,
    ]);
})->name('categories');

// Produits + filtre catégorie + recherche ?q=
Route::get('/produits', function () {
    $query = Product::where('is_active', true)->with('category');

    if (request('q')) {
        $q = trim(request('q'));
        $query->where('name', 'like', "%{$q}%");
    }

    $currentCategory = request('category');

    if ($currentCategory) {
        $cat = Category::where('slug', $currentCategory)->first();
        if ($cat) {
            $query->where('category_id', $cat->id);
        }
    }

    $products = $query
        ->latest()
        ->paginate(12)
        ->withQueryString();

    // on renvoie aussi les categories pour le select
    $categories = Category::orderBy('name')->get(['id','name','slug']);

    return Inertia::render('Products', [
        'products' => $products,
        'categories' => $categories,
        'currentCategory' => $currentCategory,
        'q' => request('q', ''),
    ]);
})->name('shop.products');



/*
|--------------------------------------------------------------------------
| Panier (session)
|--------------------------------------------------------------------------
*/
Route::post('/panier/ajouter/{product}', function (Product $product) {

    // ❌ Rupture de stock
    if (isset($product->stock) && (int)$product->stock <= 0) {
        return redirect()->back()->with('success', 'Produit en rupture de stock.');
    }

    $cart = session()->get('cart', []);

    // ✅ clé unique stable
    $key = (string) $product->id;

    if (isset($cart[$key])) {

        // ❌ Dépassement stock
        if (isset($product->stock) && (int)$cart[$key]['quantity'] >= (int)$product->stock) {
            return redirect()->back()->with('success', 'Stock maximum atteint pour ce produit.');
        }

        $cart[$key]['quantity'] = (int)$cart[$key]['quantity'] + 1;

    } else {

        $cart[$key] = [
            'id'       => (int) $product->id,
            'name'     => $product->name,
            'price'    => (int) $product->price,
            'image'    => $product->image,
            'quantity' => 1,
        ];
    }

    session()->put('cart', $cart);

    return redirect()->back()->with('success', 'Produit ajouté au panier');
})->name('cart.add');

Route::get('/panier', function () {
    $cart = session()->get('cart', []);

    $items = [];
    $total = 0;

    foreach ($cart as $productId => $item) {
        $item['id'] = (int) $productId; // ✅ on garde l'id
        $items[] = $item;

        $total += ((int)$item['price']) * ((int)$item['quantity']);
    }

    return Inertia::render('Cart', [
        'cart' => $items,
        'total' => $total,
    ]);
})->name('cart.index');


Route::post('/panier/supprimer/{id}', function ($id) {
    $cart = session()->get('cart', []);
    $key = (string) $id;

    unset($cart[$key]);
    session()->put('cart', $cart);

    return redirect()->route('cart.index')->with('success', 'Produit supprimé');
})->name('cart.remove');

Route::post('/panier/update/{id}', function ($id) {

    $cart = session()->get('cart', []);
    $key = (string) $id;

    if (!isset($cart[$key])) {
        return redirect()->route('cart.index')->with('error', 'Produit introuvable dans le panier.');
    }

    $qty = (int) request('quantity', 1);
    $qty = max(1, $qty);

    // ✅ vérifier stock si le produit existe encore
    $product = Product::find((int)$id);
    if ($product && isset($product->stock)) {
        $max = max(0, (int) $product->stock);

        if ($max <= 0) {
            $cart[$key]['quantity'] = 1;
            session()->put('cart', $cart);
            return redirect()->route('cart.index')->with('success', 'Produit en rupture de stock.');
        }

        if ($qty > $max) {
            $qty = $max;
        }
    }

    $cart[$key]['quantity'] = $qty;

    session()->put('cart', $cart);

    return redirect()->route('cart.index')->with('success', 'Quantité mise à jour.');
})->name('cart.update');


/*
|--------------------------------------------------------------------------
| Checkout (page + validation + succès)
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {

    // ✅ Page checkout
    Route::get('/checkout', function () {
    $cart = session()->get('cart', []);
    if (empty($cart)) {
        return redirect()->route('cart.index')->with('success', 'Votre panier est vide.');
    }

    $total = 0;
    foreach ($cart as $item) {
        $total += ((int)$item['price']) * ((int)$item['quantity']);
    }

    // Référence pro (comme tu faisais)
    $ref = 'SUPECO-' . strtoupper(substr(md5(session()->getId()), 0, 6));

    return \Inertia\Inertia::render('Checkout', [
        'cart' => array_values($cart),
        'total' => $total,
        'ref' => $ref,
        'waveNumber' => env('WAVE_NUMBER', '77 873 23 23'),
        'omNumber' => env('ORANGE_MONEY_NUMBER', '78 946 19 02'),
    ]);
})->name('checkout.form');


    // ✅ Soumission checkout -> crée la commande + redirige vers succès
    Route::post('/checkout', function () {

        $cart = session()->get('cart', []);
        if (empty($cart)) {
            return redirect()->route('cart.index')->with('success', 'Votre panier est vide.');
        }

        $data = request()->validate([
            'shipping_name'    => ['required','string','max:120'],
            'shipping_phone'   => ['required','string','max:30'],
            'shipping_city'    => ['required','string','max:80'],
            'shipping_address' => ['required','string','max:255'],
            'shipping_note'    => ['nullable','string','max:2000'],

            'payment_method'   => ['required','in:wave,om,paypal'],
            // ✅ IMPORTANT: la ref peut être longue: "SUPECO-XXXX | TX:..."
            'payment_ref'      => ['nullable','string','max:255'],
        ]);

        // ✅ total (avec quantités du panier)
        $total = 0;
        foreach ($cart as $item) {
            $total += ((int)$item['price']) * ((int)$item['quantity']);
        }

        $order = Order::create([
            'user_id'          => Auth::id(),
            'total'            => $total,
            'status'           => 'en_attente',

            'shipping_name'    => $data['shipping_name'],
            'shipping_phone'   => $data['shipping_phone'],
            'shipping_city'    => $data['shipping_city'],
            'shipping_address' => $data['shipping_address'],
            'shipping_note'    => $data['shipping_note'] ?? null,

            'payment_method'   => $data['payment_method'],
            'payment_status'   => 'pending',
            'payment_ref'      => $data['payment_ref'] ?? null,
        ]);

        foreach ($cart as $productId => $item) {
            $pid = (int) $productId;

            OrderItem::create([
                'order_id'   => $order->id,
                'product_id' => $pid,
                'quantity'   => (int) $item['quantity'],
                'price'      => (int) $item['price'],
            ]);
        }

        session()->forget('cart');

        return redirect()->route('checkout.success', $order->id)
            ->with('success', 'Commande enregistrée. Suivez les instructions de paiement.');
    })->name('checkout.submit');

    // ✅ Page succès (sécurisée)
 Route::get('/commande/succes/{order}', function (Order $order) {
    if ($order->user_id !== Auth::id()) abort(403);

    $order->load('items.product');

    return Inertia::render('CheckoutSuccess', [
        'order' => $order,
        'waveNumber' => env('WAVE_NUMBER', '77 873 23 23'),
        'omNumber' => env('ORANGE_MONEY_NUMBER', '78 946 19 02'),
    ]);
})->name('checkout.success');

});





/*
|--------------------------------------------------------------------------
| Profil + commandes client
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {

    // Profil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Mes commandes
    Route::get('/mes-commandes', function () {
    $orders = Order::where('user_id', Auth::id())
        ->latest()
        ->paginate(10)
        ->through(fn ($o) => [
            'id' => $o->id,
            'created_at' => $o->created_at?->format('d/m/Y H:i'),
            'status' => $o->status,
            'total' => (int) $o->total,
            'payment_status' => $o->payment_status,
            'payment_method' => $o->payment_method,
        ]);

    return Inertia::render('Orders/Index', [
        'orders' => $orders,
    ]);
})->name('orders.index');

    // Détails commande
    Route::get('/mes-commandes/{order}', function (Order $order) {
    if ($order->user_id !== Auth::id()) {
        abort(403);
    }

    $order->load('items.product');

    return Inertia::render('Orders/Show', [
        'order' => [
            'id' => $order->id,
            'created_at' => $order->created_at?->format('d/m/Y H:i'),
            'status' => $order->status,
            'total' => (int) $order->total,
            'payment_status' => $order->payment_status,
            'payment_method' => $order->payment_method,
            'payment_ref' => $order->payment_ref,
            'shipping_name' => $order->shipping_name,
            'shipping_phone' => $order->shipping_phone,
            'shipping_city' => $order->shipping_city,
            'shipping_address' => $order->shipping_address,
            'shipping_note' => $order->shipping_note,
            'items' => $order->items->map(fn($it) => [
                'name' => $it->product?->name ?? 'Produit supprimé',
                'price' => (int) $it->price,
                'quantity' => (int) $it->quantity,
                'subtotal' => (int) $it->price * (int) $it->quantity,
            ])->values(),
        ]
    ]);
})->name('orders.show');

    // ✅ Annuler commande
    Route::post('/mes-commandes/{order}/annuler', function (Order $order) {

        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        if ($order->status !== 'en_attente') {
            return back()->with('error', "Impossible d'annuler : commande déjà traitée.");
        }

        $order->update([
            'status' => 'annulee'
        ]);

        return back()->with('success', 'Commande annulée avec succès.');
    })->name('orders.cancel');
});


/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {

    // ✅ Messages (Admin)
    Route::get('messages', [MessageController::class, 'index'])->name('admin.messages.index');
    Route::get('messages/{message}', [MessageController::class, 'show'])->name('admin.messages.show');
    Route::post('messages/{message}/status', [MessageController::class, 'updateStatus'])->name('admin.messages.status');

    // ✅ Utilisateurs (Admin)
    Route::get('users', [AdminUserController::class, 'index'])->name('admin.users.index');
    Route::get('users/{user}', [AdminUserController::class, 'show'])->name('admin.users.show');
    Route::get('users/{user}/edit', [AdminUserController::class, 'edit'])->name('admin.users.edit');
    Route::put('users/{user}', [AdminUserController::class, 'update'])->name('admin.users.update');
    Route::post('users/{user}/toggle-status', [AdminUserController::class, 'toggleStatus'])->name('admin.users.toggle-status');

    // Dashboard admin
    Route::get('/', function () {

        $ordersCount = Order::count();
        $revenue = Order::sum('total');

        $byStatus = Order::selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        return Inertia::render('Admin/Dashboard', [
            'ordersCount' => $ordersCount,
            'revenue'     => $revenue,
            'byStatus'    => $byStatus,
        ]);

    })->name('admin.dashboard');

    // CRUD
    Route::resource('categories', CategoryController::class)->names('admin.categories');
    Route::resource('products', ProductController::class)->names('admin.products');

    // Commandes (Admin)
    Route::get('orders', [OrderController::class, 'index'])->name('admin.orders.index');
    Route::get('orders/{order}', [OrderController::class, 'show'])->name('admin.orders.show');
    Route::post('orders/{order}/status', [OrderController::class, 'updateStatus'])->name('admin.orders.status');
});


/*
|--------------------------------------------------------------------------
| Pages publiques diverses
|--------------------------------------------------------------------------
*/
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/recherche', function () {
    return Inertia::render('Search');
})->name('search');

Route::get('/mentions-legales', function () {
    return Inertia::render('Legal');
});

Route::get('/politique-confidentialite', function () {
    return Inertia::render('Privacy');
});

Route::post('/contact/envoyer', function () {

    $data = request()->validate([
        'type'    => ['required', 'in:contact,devis'],
        'name'    => ['required', 'string', 'max:120'],
        'email'   => ['nullable', 'email', 'max:190'],
        'phone'   => ['nullable', 'string', 'max:30'],
        'subject' => ['nullable', 'string', 'max:190'],
        'message' => ['required', 'string', 'max:5000'],
    ]);

    ContactMessage::create($data);

    return back()->with('success', 'Message envoyé avec succès. Nous vous répondrons rapidement.');
})->name('contact.send');

Route::get('/react-test', function () {
    return Inertia::render('Test');
});



require __DIR__.'/auth.php';
