<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::orderBy('name')
            ->paginate(10)
            ->through(fn ($c) => [
                'id' => $c->id,
                'name' => $c->name,
                'description' => $c->description,
                'created_at' => optional($c->created_at)->format('d/m/Y H:i'),
            ]);

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
            'flash' => [
                'success' => session('success'),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Categories/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:categories,name'],
            'description' => ['nullable', 'string'],
        ]);

        Category::create($validated);

        // ⚠️ URLs directes (pas route()) pour éviter Ziggy
        return redirect('/admin/categories')
            ->with('success', 'Catégorie créée avec succès.');
    }

    // (Optionnel) on ne l’utilise pas forcément en React
    public function show(Category $category)
    {
        return Inertia::render('Admin/Categories/Show', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'description' => $category->description,
                'created_at' => optional($category->created_at)->format('d/m/Y H:i'),
            ],
        ]);
    }

    public function edit(Category $category)
    {
        return Inertia::render('Admin/Categories/Edit', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'description' => $category->description,
            ],
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:categories,name,' . $category->id],
            'description' => ['nullable', 'string'],
        ]);

        $category->update($validated);

        return redirect('/admin/categories')
            ->with('success', 'Catégorie mise à jour avec succès.');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect('/admin/categories')
            ->with('success', 'Catégorie supprimée avec succès.');
    }
}