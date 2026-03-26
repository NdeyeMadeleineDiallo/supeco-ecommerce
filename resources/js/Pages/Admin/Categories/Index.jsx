import React from "react";
import { Link, router, usePage } from "@inertiajs/react";
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

export default function Index({ categories, flash }) {
  const success = flash?.success || usePage().props?.flash?.success;

  const onDelete = (id) => {
    if (!confirm("Supprimer cette catégorie ?")) return;
    router.delete(`/admin/categories/${id}`, { preserveScroll: true });
  };

  return (
    <AdminLayout title="Catégories">
      <div className="container-fluid py-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3 className="m-0">Catégories</h3>
          <Link href="/admin/categories/create" style={btnYellow}>
            + Nouvelle catégorie
          </Link>
        </div>

        {success ? <div className="alert alert-success">{success}</div> : null}

        <div className="card shadow-sm">
          <div className="card-body">
            {!categories?.data?.length ? (
              <p className="mb-0">Aucune catégorie pour le moment.</p>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-sm align-middle">
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Slug</th>
                        <th style={{ width: 200 }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.data.map((c) => (
                        <tr key={c.id}>
                          <td>{c.name}</td>
                          <td className="text-muted">{c.slug}</td>
                          <td className="d-flex gap-2">
                            <Link href={`/admin/categories/${c.id}/edit`} style={{ ...btnYellow, padding: "6px 10px", borderRadius: 6 }}>
                              Modifier
                            </Link>
                            <button
                              onClick={() => onDelete(c.id)}
                              style={{
                                backgroundColor: "#080a0a",
                                color: "#fecc33",
                                fontWeight: 700,
                                borderRadius: 6,
                                padding: "6px 10px",
                                border: "1px solid #080a0a",
                              }}
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex flex-wrap gap-2 mt-3">
                  {categories.links?.map((l, idx) => (
                    <button
                      key={idx}
                      disabled={!l.url}
                      onClick={() => l.url && router.visit(l.url)}
                      type="button"
                      style={{
                        backgroundColor: l.active ? "#fecc33" : "white",
                        color: "#080a0a",
                        border: "1px solid #e5e7eb",
                        fontWeight: 700,
                        padding: "6px 10px",
                        borderRadius: 6,
                      }}
                      dangerouslySetInnerHTML={{ __html: l.label }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}