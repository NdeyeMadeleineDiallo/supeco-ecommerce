import React from "react";
import { Link, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const btnYellow = {
  backgroundColor: "#fecc33",
  color: "#080a0a",
  fontWeight: 800,
  borderRadius: 8,
  padding: "6px 10px",
  textDecoration: "none",
  border: "1px solid #e5e7eb",
  display: "inline-block",
};

const btnDanger = {
  backgroundColor: "#080a0a",
  color: "#fecc33",
  fontWeight: 700,
  borderRadius: 6,
  padding: "6px 10px",
  border: "1px solid #080a0a",
};

function formatFCFA(amount) {
  const n = Number(amount || 0);
  try {
    return new Intl.NumberFormat("fr-FR").format(n) + " F";
  } catch {
    return `${n} F`;
  }
}

export default function Index({ products, flash }) {
  const success = flash?.success || usePage().props?.flash?.success;

  const onDelete = (id) => {
    if (!confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    router.delete(`/admin/products/${id}`, { preserveScroll: true });
  };

  return (
    <AdminLayout title="Produits">
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">Produits</h3>
          <Link href="/admin/products/create" style={btnYellow}>
            + Nouveau produit
          </Link>
        </div>

        {success && <div className="alert alert-success">{success}</div>}

        <div className="card shadow-sm">
          <div className="card-body">
            {!products?.data?.length ? (
              <p>Aucun produit pour le moment.</p>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-sm align-middle">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Nom</th>
                        <th>Catégorie</th>
                        <th>Prix</th>
                        <th>Stock</th>
                        <th>Actif</th>
                        <th style={{ width: 220 }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.data.map((p) => (
                        <tr key={p.id}>
                          <td>
                            {p.image ? (
                              <img
                                src={p.image}
                                alt=""
                                style={{
                                  width: 60,
                                  height: 60,
                                  objectFit: "cover",
                                  borderRadius: 8,
                                }}
                              />
                            ) : (
                              <span className="text-muted">—</span>
                            )}
                          </td>

                          <td style={{ fontWeight: 800 }}>{p.name}</td>

                          <td>{p.category?.name || "—"}</td>

                          <td style={{ fontWeight: 700 }}>
                            {formatFCFA(p.price)}
                          </td>

                          <td>{p.stock}</td>

                          <td>{p.is_active ? "✅" : "❌"}</td>

                          <td className="d-flex gap-2">
                            <Link
                              href={`/admin/products/${p.id}/edit`}
                              style={btnYellow}
                            >
                              Modifier
                            </Link>

                            <button
                              onClick={() => onDelete(p.id)}
                              style={btnDanger}
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="d-flex gap-2 mt-3 flex-wrap">
                  {products.links?.map((l, i) => (
                    <button
                      key={i}
                      disabled={!l.url}
                      onClick={() => l.url && router.visit(l.url)}
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