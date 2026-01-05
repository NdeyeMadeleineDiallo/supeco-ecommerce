<x-app-layout>
    <x-slot name="header">
        <h2 style="font-weight:700; font-size:18px;">Nouveau produit</h2>
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

                <form method="POST" action="{{ route('products.store') }}" enctype="multipart/form-data">
                    @csrf

                    <div style="margin-bottom:12px;">
                        <label style="display:block; margin-bottom:6px;">Catégorie</label>
                        <select name="category_id" required
                                style="width:100%; border:1px solid #e5e7eb; padding:10px; border-radius:6px;">
                            <option value="">— Choisir —</option>
                            @foreach($categories as $cat)
                                <option value="{{ $cat->id }}" @selected(old('category_id') == $cat->id)>
                                    {{ $cat->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div style="margin-bottom:12px;">
                        <label style="display:block; margin-bottom:6px;">Nom</label>
                        <input type="text" name="name" value="{{ old('name') }}" required
                               style="width:100%; border:1px solid #e5e7eb; padding:10px; border-radius:6px;">
                    </div>

                    <div style="margin-bottom:12px;">
                        <label style="display:block; margin-bottom:6px;">Description (optionnel)</label>
                        <textarea name="description" rows="4"
                                  style="width:100%; border:1px solid #e5e7eb; padding:10px; border-radius:6px;">{{ old('description') }}</textarea>
                    </div>

                    <div style="display:flex; gap:12px; margin-bottom:12px;">
                        <div style="flex:1;">
                            <label style="display:block; margin-bottom:6px;">Prix (FCFA)</label>
                            <input type="number" name="price" value="{{ old('price') }}" min="0" required
                                   style="width:100%; border:1px solid #e5e7eb; padding:10px; border-radius:6px;">
                        </div>
                        <div style="flex:1;">
                            <label style="display:block; margin-bottom:6px;">Stock</label>
                            <input type="number" name="stock" value="{{ old('stock', 0) }}" min="0" required
                                   style="width:100%; border:1px solid #e5e7eb; padding:10px; border-radius:6px;">
                        </div>
                    </div>

                    <div style="margin-bottom:12px;">
                        <label style="display:block; margin-bottom:6px;">Image (optionnel)</label>
                        <input type="file" name="image" accept="image/*">
                        <div style="color:#6b7280; font-size:12px; margin-top:4px;">jpg, png, webp — max 2MB</div>
                    </div>

                    <div style="margin-bottom:12px;">
                        <label style="display:flex; align-items:center; gap:8px;">
                            <input type="checkbox" name="is_active" @checked(old('is_active', true))>
                            <span>Produit actif</span>
                        </label>
                    </div>

                    <div style="display:flex; gap:10px; align-items:center;">
                        <button type="submit"
                                style="background:#16a34a; color:white; padding:10px 14px; border-radius:6px; border:none; cursor:pointer;">
                            Enregistrer
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
