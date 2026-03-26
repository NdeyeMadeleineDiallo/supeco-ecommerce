import React, { useMemo } from "react";
import { Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

function formatFCFA(amount) {
  const n = Number(amount || 0);
  try {
    return new Intl.NumberFormat("fr-FR").format(n) + " F";
  } catch {
    return `${n} F`;
  }
}

export default function Dashboard({ ordersCount = 0, revenue = 0, byStatus = {} }) {
  const statusLabels = useMemo(
    () => ({
      en_attente: "En attente",
      en_cours: "En cours",
      livree: "Livrée",
      annulee: "Annulée",
    }),
    []
  );

  const statusEntries = useMemo(() => {
    if (!byStatus) return [];
    // byStatus peut être un objet {key: value} ou autre selon Laravel
    return Object.entries(byStatus);
  }, [byStatus]);

  return (
    <AdminLayout title="">
      {/* Bannière admin FULL WIDTH */}
      {/* Bannière admin FULL WIDTH – collée au header */}
<div
  style={{
    width: "100vw",
    marginLeft: "calc(-50vw + 50%)",
    marginTop: 0,        // collée au header
    marginBottom: 32,
  }}
>
  <img
    src="/images/admin-banner.png"
    alt="Bannière administration SUPECO"
    style={{
      width: "100%",
      height: 250,       // 🔥 augmente ici (260–340 selon goût)
      objectFit: "cover",
      display: "block",
    }}
  />
</div>
<div style={{ marginTop: -24 }} />

      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
          gap: 14,
          marginBottom: 16,
        }}
      >
        <div style={{ background: "white", padding: 16, borderRadius: 14, border: "1px solid #e5e7eb" }}>
          <div style={{ color: "#6b7280", fontSize: 13, fontWeight: 700 }}>Total commandes</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#080a0a" }}>{ordersCount ?? 0}</div>
        </div>

        <div style={{ background: "white", padding: 16, borderRadius: 14, border: "1px solid #e5e7eb" }}>
          <div style={{ color: "#6b7280", fontSize: 13, fontWeight: 700 }}>Chiffre d’affaires</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#080a0a" }}>
            {formatFCFA(revenue)}
          </div>
        </div>

        <div style={{ background: "white", padding: 16, borderRadius: 14, border: "1px solid #e5e7eb" }}>
          <div style={{ color: "#6b7280", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Statuts</div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {statusEntries.length > 0 ? (
              statusEntries.map(([status, total]) => (
                <span
                  key={status}
                  style={{
                    background: "#f3f4f6",
                    border: "1px solid #e5e7eb",
                    padding: "6px 10px",
                    borderRadius: 999,
                    fontWeight: 800,
                    color: "#080a0a",
                    fontSize: 12,
                  }}
                >
                  {(statusLabels[status] ?? status)} : {total}
                </span>
              ))
            ) : (
              <span style={{ color: "#6b7280", fontSize: 13 }}>Aucun statut pour le moment.</span>
            )}
          </div>
        </div>
      </div>

      {/* Accès rapide */}
      <div style={{ background: "white", padding: 16, borderRadius: 14, border: "1px solid #e5e7eb" }}>
        <h3 style={{ fontSize: 16, fontWeight: 900, color: "#080a0a", margin: "0 0 12px" }}>
          Accès rapide
        </h3>

        <div className="admin-quick-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {/* Commandes */}
          <Link
            href="/admin/orders"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: 14,
              borderRadius: 14,
              border: "1px solid #e5e7eb",
              textDecoration: "none",
              background: "#fecc33",
              color: "#080a0a",
            }}
          >
            <div style={{ fontSize: 24 }}>🧾</div>
            <div>
              <div style={{ fontWeight: 900 }}>Voir commandes</div>
              <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.85 }}>Gérer les statuts</div>
            </div>
          </Link>

          {/* Produits */}
          <Link
            href="/admin/products"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: 14,
              borderRadius: 14,
              border: "1px solid #e5e7eb",
              textDecoration: "none",
              background: "#fecc33",
              color: "#080a0a",
            }}
          >
            <div style={{ fontSize: 24 }}>📦</div>
            <div>
              <div style={{ fontWeight: 900 }}>Gérer produits</div>
              <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.85 }}>Ajout / stock / prix</div>
            </div>
          </Link>

          {/* Catégories */}
          <Link
            href="/admin/categories"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: 14,
              borderRadius: 14,
              border: "1px solid #e5e7eb",
              textDecoration: "none",
              background: "#fecc33",
              color: "#080a0a",
            }}
          >
            <div style={{ fontSize: 24 }}>🗂️</div>
            <div>
              <div style={{ fontWeight: 900 }}>Gérer catégories</div>
              <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.85 }}>Organisation boutique</div>
            </div>
          </Link>

          {/* Messages */}
          <Link
            href="/admin/messages"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: 14,
              borderRadius: 14,
              border: "1px solid #e5e7eb",
              textDecoration: "none",
              background: "#fecc33",
              color: "#080a0a",
            }}
          >
            <div style={{ fontSize: 24 }}>💬</div>
            <div>
              <div style={{ fontWeight: 900 }}>Messages</div>
              <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.85 }}>Demandes contact</div>
            </div>
          </Link>
        </div>

        {/* Responsive : propre, sans JS */}
        <style>{`
          @media (max-width: 1024px) {
            .admin-quick-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 640px) {
            .admin-quick-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </AdminLayout>
  );
}