import React, { useState } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const btnYellow = {
  backgroundColor: "#fecc33",
  color: "#080a0a",
  fontWeight: 800,
  borderRadius: 8,
  padding: "8px 14px",
  textDecoration: "none",
  border: "1px solid #e5e7eb",
};

export default function Edit({ product, categories }) {
  const { errors } = usePage().props;

  const { data, setData, post, processing } = useForm({
    _method: "PUT",
    category_id: product.category_id,
    name: product.name,
    description: product.description || "",
    price: product.price,
    stock: product.stock,
    image: null,
    is_active: product.is_active,
  });

  const [preview, setPreview] = useState(product.image);

  const submit = (e) => {
    e.preventDefault();
    post(`/admin/products/${product.id}`, { forceFormData: true });
  };

  return (
    <AdminLayout title="Modifier produit">
      <div className="container-fluid py-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <form onSubmit={submit} encType="multipart/form-data">
              {/* Catégorie */}
              <div className="mb-3">
                <label className="form-label">Catégorie</label>
                <select
                  className="form-select"
                  value={data.category_id}
                  onChange={(e) => setData("category_id", e.target.value)}
                  required
                >
                  <option value="">— Choisir —</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <div className="text-danger small mt-1">
                    {errors.category_id}
                  </div>
                )}
              </div>

              {/* Nom */}
              <div className="mb-3">
                <label className="form-label">Nom</label>
                <input
                  className="form-control"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  required
                />
                {errors.name && (
                  <div className="text-danger small mt-1">{errors.name}</div>
                )}
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                />
              </div>

              {/* Prix / Stock */}
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label">Prix (FCFA)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={data.price}
                    onChange={(e) => setData("price", e.target.value)}
                    min="0"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    value={data.stock}
                    onChange={(e) => setData("stock", e.target.value)}
                    min="0"
                    required
                  />
                </div>
              </div>

              {/* Image */}
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setData("image", file);
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                />
                {preview && (
                  <img
                    src={preview}
                    alt=""
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 8,
                      marginTop: 8,
                    }}
                  />
                )}
              </div>

              {/* Actif */}
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={!!data.is_active}
                  onChange={(e) => setData("is_active", e.target.checked)}
                />
                <label className="form-check-label">Produit actif</label>
              </div>

              {/* Actions */}
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  disabled={processing}
                  style={btnYellow}
                >
                  {processing ? "Mise à jour..." : "Mettre à jour"}
                </button>

                <Link
                  className="btn btn-outline-secondary"
                  href="/admin/products"
                >
                  Retour
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}