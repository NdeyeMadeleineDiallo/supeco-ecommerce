import React, { useMemo, useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Create({ categories }) {
  const { errors } = usePage().props;

  const { data, setData, post, processing, reset } = useForm({
    category_id: "",
    name: "",
    description: "",
    price: "",
    stock: 0,
    image: null,
    is_active: true,
  });

  const [preview, setPreview] = useState(null);

  const submit = (e) => {
    e.preventDefault();

    // ✅ URL directe (pas besoin de Ziggy / route())
    post("/admin/products", {
      forceFormData: true,
      onSuccess: () => {
        reset();
        setPreview(null);
      },
    });
  };

  const hasErrors = useMemo(() => Object.keys(errors || {}).length > 0, [errors]);

  return (
    <AdminLayout title="Nouveau produit">
      <div className="card shadow-sm">
        <div className="card-body">
          {hasErrors ? (
            <div className="alert alert-danger">
              <ul className="mb-0">
                {Object.values(errors).map((msg, idx) => (
                  <li key={idx}>{msg}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <form onSubmit={submit} encType="multipart/form-data">
            {/* Catégorie */}
            <div className="mb-3">
              <label className="form-label">Catégorie</label>
              <select
                className="form-select"
                required
                value={data.category_id}
                onChange={(e) => setData("category_id", e.target.value)}
              >
                <option value="">— Choisir —</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors?.category_id ? (
                <div className="text-danger small mt-1">{errors.category_id}</div>
              ) : null}
            </div>

            {/* Nom */}
            <div className="mb-3">
              <label className="form-label">Nom</label>
              <input
                type="text"
                className="form-control"
                required
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
              />
              {errors?.name ? (
                <div className="text-danger small mt-1">{errors.name}</div>
              ) : null}
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description (optionnel)</label>
              <textarea
                className="form-control"
                rows={4}
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
              />
              {errors?.description ? (
                <div className="text-danger small mt-1">{errors.description}</div>
              ) : null}
            </div>

            {/* Prix + Stock */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Prix (FCFA)</label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  required
                  value={data.price}
                  onChange={(e) => setData("price", e.target.value)}
                />
                {errors?.price ? (
                  <div className="text-danger small mt-1">{errors.price}</div>
                ) : null}
              </div>

              <div className="col-md-6">
                <label className="form-label">Stock</label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  required
                  value={data.stock}
                  onChange={(e) => setData("stock", e.target.value)}
                />
                {errors?.stock ? (
                  <div className="text-danger small mt-1">{errors.stock}</div>
                ) : null}
              </div>
            </div>

            {/* Image */}
            <div className="mb-3">
              <label className="form-label">Image (optionnel)</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setData("image", file);

                  if (file) {
                    const url = URL.createObjectURL(file);
                    setPreview(url);
                  } else {
                    setPreview(null);
                  }
                }}
              />
              <div className="text-muted small mt-1">jpg, png, webp — max 2MB</div>
              {errors?.image ? (
                <div className="text-danger small mt-1">{errors.image}</div>
              ) : null}

              {preview ? (
                <div className="mt-2">
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8 }}
                  />
                </div>
              ) : null}
            </div>

            {/* Actif */}
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="is_active"
                checked={!!data.is_active}
                onChange={(e) => setData("is_active", e.target.checked)}
              />
              <label className="form-check-label" htmlFor="is_active">
                Produit actif
              </label>
            </div>

            {/* Actions */}
            <div className="d-flex gap-2 align-items-center">
              <button className="btn btn-success" type="submit" disabled={processing}>
                {processing ? "Enregistrement..." : "Enregistrer"}
              </button>

              {/* ✅ URL directe */}
              <Link className="btn btn-outline-secondary" href="/admin/products">
                Retour
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}