import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function AdminLayout({ title = "Administration SUPECO", children }) {
  const page = usePage();
  const { auth, flash } = page.props;
  const currentUrl = page.url;

  const isActive = (path) => currentUrl === path || currentUrl.startsWith(path + "/");

  const navItemStyle = (active) => ({
    color: "#111827",
    fontWeight: 700,
    fontSize: 15,
    padding: "8px 10px",
    borderRadius: 10,
    textDecoration: "none",
    whiteSpace: "nowrap",
    backgroundColor: active ? "rgba(17, 24, 39, 0.08)" : "transparent",
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9fa" }}>
      <header
        style={{
          backgroundColor: "#fecc33",
          color: "#111827",
          padding: "10px 0",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div className="container">
          {/* ✅ Grid simple : gauche (logo+texte), centre (menu), droite (user+logout) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "260px 1fr 260px",
              alignItems: "center",
              gap: 10,
            }}
          >
            {/* ✅ Gauche : logo + texte en dessous */}
            <Link
              href="/admin"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 2,
                color: "#111827",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img
                  src="/images/supeco-logo.png"
                  alt="SUPECO"
                  style={{ height: 38, objectFit: "contain", display: "block" }}
                />
              </div>

              <span style={{ fontSize: 13, fontWeight: 600, opacity: 0.9 }}>
                Tableau de bord Administrateur
              </span>
            </Link>

            {/* ✅ Centre : menu centré */}
            <nav style={{ overflow: "hidden" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  flexWrap: "nowrap",
                  overflowX: "auto",
                  scrollbarWidth: "thin",
                  padding: "2px 0",
                }}
              >
                <Link href="/admin/categories" style={navItemStyle(isActive("/admin/categories"))}>
                  Catégories
                </Link>
                <Link href="/admin/products" style={navItemStyle(isActive("/admin/products"))}>
                  Produits
                </Link>
                <Link href="/admin/orders" style={navItemStyle(isActive("/admin/orders"))}>
                  Commandes
                </Link>
                <Link href="/admin/messages" style={navItemStyle(isActive("/admin/messages"))}>
                  Messages
                </Link>
                <Link href="/admin/users" style={navItemStyle(isActive("/admin/users"))}>
                  Utilisateurs
                </Link>
              </div>
            </nav>

            {/* ✅ Droite : compte + bouton tout à droite */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 10,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 600, opacity: 0.9 }}>
                {auth?.user?.email || "—"}
              </span>

              <Link
                href="/logout"
                method="post"
                as="button"
                className="btn btn-sm"
                style={{
                  backgroundColor: "rgba(17, 24, 39, 0.9)",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 10,
                  padding: "7px 10px",
                  border: "none",
                  whiteSpace: "nowrap",
                  fontSize: 14,
                }}
              >
                Déconnexion
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ✅ Flash collé au navbar */}
      {(flash?.success || flash?.error) && (
        <div className="container" style={{ marginTop: 0 }}>
          <div style={{ paddingTop: 10 }}>
            {flash?.success && <div className="alert alert-success mb-2">{flash.success}</div>}
            {flash?.error && <div className="alert alert-danger mb-2">{flash.error}</div>}
          </div>
        </div>
      )}

      <main style={{ paddingTop: 0 }}>{children}</main>
    </div>
  );
}