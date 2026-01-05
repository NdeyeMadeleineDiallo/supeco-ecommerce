<x-app-layout>
    <x-slot name="header">
        <h2 style="font-weight:700; font-size:18px;">Modifier produit</h2>
    </x-slot>

    <div class="py-8">
        <div class="max-w-3xl mx-auto sm:px-6 lg:px-8">
            <div style="background:white; padding:16px; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,.1);">

                @if ($errors->any())
                    <div style="margin-bottom:12px; background:#fee2e2; padding:10px; border-radius:6px; color:#991b1b;">
                        <ul style="margin:0; padding-left:18px;">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <form method="POST" action="{{ route('products.update', $product) }}" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')

                    <div style="margin-bottom:12px;">
                        <label style="display:block; margin-bottom:6px;">Catégorie</label>
                        <select name="category_id" required
                                style="width:100%; border:1px solid #e5e7eb; padding:10px; border-radius:6px;">
                            @foreach($categories as $cat)
                                <option value="{{ $cat->id }}" @selected(old('category_id', $product->category_id) == $cat->id)>
                                    {{ $cat->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div style="margin-bottom:12px;">
                        <label style="display:block; margin-bottom:6px;">Nom</label>
                        <input type="text" name="name" value="{{ old('name', $product->name) }}" required
                               style="width:100%; border:1px solid #e5e7eb; padding:10px; border-radius:6px;">
                    </div>

                    <div style="margin-bottom:12px;">
                        <label style="display:block; margin-bottom:6px;">Description (optionnel)</label>
                        <textarea name="description" rows="4"
                                  style="width:100%; border:1px solid #e5e7eb; padding:10px; border-radius:6px;">{{ old('description', $product->description) }}</textarea>
                    </div>

                    <div style="display:flex; gap:12px; margin-bottom:12px;">
                        <div style="flex:1;">
                            <label style="display:block; margin-bottom:6px;">Prix (FCFA)</label>
                            <input type="number" name="price" value="{{ old('price', $product->price) }}" min="0" required
                                   style="width:100%; border:1px solid #e5e7eb; padding:10px; border-radius:6px;">
                        </div>
                        <div style="flex:1;">
                            <label style="display:block; margin-bottom:6px;">Stock</label>
                            <input type="number" name="stock" value="{{ old('stock', $product->stock) }}" min="0" required
                                   style="width:100%; border:1px solid #e5e7eb; padding:10px; border-radius:6px;">
                        </div>
                    </div>

                    <div style="margin-bottom:12px;">
                        <label style="display:block; margin-bottom:6px;">Image (optionnel)</label>

                        @if($product->image)
                            <div style="margin-bottom:8px;">
                                <img src="{{ asset('storage/' . $product->image) }}" alt=""
                                     style="width:120px; height:120px; object-fit:cover; border-radius:8px;">
                            </div>
                        @endif

                        <input type="file" name="image" accept="image/*">
                        <div style="color:#6b7280; font-size:12px; margin-top:4px;">jpg, png, webp — max 2MB</div>
                    </div>

                    <div style="margin-bottom:12px;">
                        <label style="display:flex; align-items:center; gap:8px;">
                            <input type="checkbox" name="is_active" @checked(old('is_active', $product->is_active))>
                            <span>Produit actif</span>
                        </label>
                    </div>

                    <div style="display:flex; gap:10px; align-items:center;">
                        <button type="submit"
                                style="background:#2563eb; color:white; padding:10px 14px; border-radius:6px; border:none; cursor:pointer;">
                            Mettre à jour
                        </button>

                        <a href="{{ route('products.index') }}"
                           style="padding:10px 14px; border-radius:6px; border:1px solid #e5e7eb; text-decoration:none;">
                            Retour
                        </a>
                    </div>
                </form>

            </div>
        </div>
    </div>
</x-app-layout>
