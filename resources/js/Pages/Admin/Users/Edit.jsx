import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";

export default function Edit({ user }) {
  const { data, setData, put, processing, errors } = useForm({
    name: user.name || "",
    email: user.email || "",
  });

  const submit = (e) => {
    e.preventDefault();
    put(`/admin/users/${user.id}`);
  };

  return (
    <AdminLayout title="Modifier utilisateur">
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">Modifier utilisateur #{user.id}</h3>
          <Link className="btn btn-outline-dark" href={`/admin/users/${user.id}`}>
            Annuler
          </Link>
        </div>

        <div className="card p-3">
          <form onSubmit={submit} className="d-grid gap-3">
            <div>
              <label className="form-label">Nom</label>
              <input
                className="form-control"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
              />
              {errors.name && <div className="text-danger mt-1">{errors.name}</div>}
            </div>

            <div>
              <label className="form-label">Email</label>
              <input
                className="form-control"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
              />
              {errors.email && <div className="text-danger mt-1">{errors.email}</div>}
            </div>

            <button className="btn btn-dark" disabled={processing}>
              {processing ? "Enregistrement..." : "Enregistrer"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}