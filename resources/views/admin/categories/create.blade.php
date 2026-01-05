<x-app-layout>
    <x-slot name="header">
        <h2 style="font-weight:700; font-size:18px;">
            Nouvelle catégorie
        </h2>
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

                <form method="POST" action="{{ route('categories.store') }}">
                    @csrf

                    <div style="margin-bottom:12px;">
                        <label style="display:block; margin-bottom:6px;">Nom</label>
                        <input
                            type="text"
                            name="name"
                            value="{{ old('name') }}"
                            required
                            style="width:100%; border:1px solid #e5e7eb; padding:10px; border-radius:6px;"
                            placeholder="Ex : Maraîchage"
                        >
                    </div>

                    <div style="margin-bottom:12px;">
                        <label style="display:block; margin-bottom:6px;">Description (optionnel)</label>
                        <textarea
                            name="description"
                            rows="4"
                            style="width:100%; border:1px solid #e5e7eb; padding:10px; border-radius:6px;"
                            placeholder="Décris brièvement la catégorie"
                        >{{ old('description') }}</textarea>
                    </div>

                    <div style="display:flex; gap:10px; align-items:center;">
                        <!-- ✅ Bouton Enregistrer -->
                        <button
                            type="submit"
                            style="background:#16a34a; color:white; padding:10px 14px; border-radius:6px; border:none; cursor:pointer;">
                            Enregistrer
                        </button>

                        <a
                            href="{{ route('categories.index') }}"
                            style="padding:10px 14px; border-radius:6px; border:1px solid #e5e7eb; text-decoration:none;">
                            Retour
                        </a>
                    </div>
                </form>

            </div>
        </div>
    </div>
</x-app-layout>
