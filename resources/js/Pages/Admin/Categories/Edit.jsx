import React from "react";
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

export default function Edit({ category }) {
  const { errors } = usePage().props;

  const { data, setData, put, processing } = useForm({
    name: category?.name || "",
    description: category?.description || "",
  });

  const submit = (e) => {
    e.preventDefault();
    put(`/admin/categories/${category.id}`);
  };

  return (
    <AdminLayout title="Modifier catégorie">
      <div className="container-fluid py-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <form onSubmit={submit}>
              {/* Nom */}
              <div className="mb-3">
                <label className="form-label">Nom</label>
                <input
                  className="form-control"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  required
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
                  <div className="text-danger small mt-1">
                    {errors.description}
                  </div>
                ) : null}
              </div>

              {/* Actions */}
              <div className="d-flex gap-2 align-items-center">
                <button
                  type="submit"
                  disabled={processing}
                  style={btnYellow}
                >
                  {processing ? "Mise à jour..." : "Mettre à jour"}
                </button>

                <Link className="btn btn-outline-secondary" href="/admin/categories">
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