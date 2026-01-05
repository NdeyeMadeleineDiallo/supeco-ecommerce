<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\OrderController;

use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;


/*
|--------------------------------------------------------------------------
| Routes publiques (Front SUPECO)
|--------------------------------------------------------------------------
*/

// Accueil dynamique
Route::get('/', function () {
    $products = Product::where('is_active', true)
        ->latest()
        ->take(8)
        ->get();

    return view('shop.home', compact('products'));
})->name('home');

// À propos
Route::get('/a-propos', function () {
    return view('shop.about');
})->name('about');

// Liste catégories (publique)
Route::get('/categories', function () {
    $categories = Category::orderBy('name')->get();
    return view('shop.categories', compact('categories'));
})->name('shop.categories');

// Catalogue produits (publique) + filtre catégorie via ?category=slug
Route::get('/produits', function () {
    $query = Product::where('is_active', true)->with('category');

    if (request('category')) {
        $cat = Category::where('slug', request('category'))->first();
        if ($cat) {
            $query->where('category_id', $cat->id);
        }
    }

    $products = $query->latest()->paginate(12)->withQueryString();

    return view('shop.products', compact('products'));
})->name('shop.products');


/*
|--------------------------------------------------------------------------
| Panier (session)
|--------------------------------------------------------------------------
*/
Route::post('/panier/ajouter/{product}', function (Product $product) {
    $cart = session()->get('cart', []);

    if (isset($cart[$product->id])) {
        $cart[$product->id]['quantity']++;
    } else {
        $cart[$product->id] = [
            'name'     => $product->name,
            'price'    => $product->price,
            'image'    => $product->image,
            'quantity' => 1,
        ];
    }

    session()->put('cart', $cart);

    return redirect()->back()->with('success', 'Produit ajouté au panier');
})->name('cart.add');

Route::get('/panier', function () {
    $cart = session()->get('cart', []);
    return view('shop.cart', compact('cart'));
})->name('cart.index');

Route::post('/panier/supprimer/{id}', function ($id) {
    $cart = session()->get('cart', []);
    unset($cart[$id]);
    session()->put('cart', $cart);

    return redirect()->route('cart.index')->with('success', 'Produit supprimé');
})->name('cart.remove');

Route::post('/panier/update/{id}', function ($id) {
    $cart = session()->get('cart', []);

    if (isset($cart[$id])) {
        $qty = max(1, (int) request('quantity'));
        $cart[$id]['quantity'] = $qty;
        session()->put('cart', $cart);
    }

    return redirect()->route('cart.index');
})->name('cart.update');


/*
|--------------------------------------------------------------------------
| Checkout (commande)
|--------------------------------------------------------------------------
*/
Route::post('/commander', function () {

    // Si pas connecté -> login
    if (!Auth::check()) {
        return redirect('/login');
    }

    $cart = session()->get('cart', []);
    if (empty($cart)) {
        return redirect()->route('cart.index')->with('success', 'Votre panier est vide.');
    }

    // Total
    $total = 0;
    foreach ($cart as $item) {
        $total += $item['price'] * $item['quantity'];
    }

    // Créer commande
    $order = Order::create([
        'user_id' => Auth::id(),
        'total'   => $total,
        'status'  => 'en_attente',
    ]);

    // Détails commande
    foreach ($cart as $productId => $item) {
        OrderItem::create([
            'order_id'   => $order->id,
            'product_id' => $productId,
            'quantity'   => $item['quantity'],
            'price'      => $item['price'],
        ]);
    }

    // Vider panier
    session()->forget('cart');

    return redirect('/dashboard')->with('success', 'Commande enregistrée avec succès.');
})->name('checkout');


/*
|--------------------------------------------------------------------------
| Dashboard utilisateur (Breeze)
|--------------------------------------------------------------------------
*/
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


/*
|--------------------------------------------------------------------------
| Profil utilisateur + Commandes CLIENT (10.2)
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {

    // Profil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Mes commandes (liste)
    Route::get('/mes-commandes', function () {

        $orders = Order::where('user_id', Auth::id())
            ->latest()
            ->paginate(10);

        return view('shop.orders.index', compact('orders'));
    })->name('orders.index');

    // Détails commande (sécurisé)
    Route::get('/mes-commandes/{order}', function (Order $order) {

        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        $order->load('items.product');

        return view('shop.orders.show', compact('order'));
    })->name('orders.show');
});


/*
|--------------------------------------------------------------------------
| Routes ADMIN protégées
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {

    Route::get('/', function () {
        return view('admin.dashboard');
    })->name('admin.dashboard');

    // CRUD Catégories
    Route::resource('categories', CategoryController::class);

    // CRUD Produits
    Route::resource('products', ProductController::class);

    // ✅ Gestion commandes (Admin) — déplacé ici
    Route::get('orders', [OrderController::class, 'index'])->name('admin.orders.index');
    Route::get('orders/{order}', [OrderController::class, 'show'])->name('admin.orders.show');
    Route::post('orders/{order}/status', [OrderController::class, 'updateStatus'])->name('admin.orders.status');
});


require __DIR__.'/auth.php';
