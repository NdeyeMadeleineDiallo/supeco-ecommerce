import React, { useMemo, useState } from "react";
import { Link, router } from "@inertiajs/react";
import ShopLayout from "@/Layouts/ShopLayout";

export default function Cart({ cart = [], total = 0 }) {
  const items = useMemo(() => (Array.isArray(cart) ? cart : Object.values(cart || {})), [cart]);

  const [loadingId, setLoadingId] = useState(null);

  const money = (n) => new Intl.NumberFormat("fr-FR").format(Number(n || 0));

  const updateQty = (id, qty) => {
    const q = Math.max(1, Number(qty || 1));
    setLoadingId(id);
    router.post(`/panier/update/${id}`, { quantity: q }, { preserveScroll: true, onFinish: () => setLoadingId(null) });
  };

  const remove = (id) => {
    if (!confirm("Supprimer ce produit du panier ?")) return;
    setLoadingId(id);
    router.post(`/panier/supprimer/${id}`, {}, { preserveScroll: true, onFinish: () => setLoadingId(null) });
  };

  return (
    <ShopLayout>
      <div style={{ padding: 16, maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 10, flexWrap: "wrap" }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0 }}>Panier</h1>
          <Link href="/produits" style={{ textDecoration: "underline", fontWeight: 800 }}>
            Continuer mes achats
          </Link>
        </div>

        {items.length === 0 ? (
          <div style={{ marginTop: 16, background: "white", border: "1px solid #e5e7eb", borderRadius: 14, padding: 16 }}>
            <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 6 }}>Votre panier est vide.</div>
            <div style={{ color: "#6b7280" }}>Ajoutez des produits et revenez ici.</div>
            <div style={{ marginTop: 12 }}>
              <Link
                href="/produits"
                style={{
                  display: "inline-block",
                  background: "#080a0a",
                  color: "#fecc33",
                  padding: "10px 14px",
                  borderRadius: 12,
                  textDecoration: "none",
                  fontWeight: 900,
                }}
              >
                Voir le catalogue
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 16, marginTop: 16 }}>
            {/* LISTE */}
            <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: 14, borderBottom: "1px solid #e5e7eb", fontWeight: 900 }}>Articles</div>

              <div>
                {items.map((it, idx) => {
                  const id = it.id;
                  const sub = Number(it.price || 0) * Number(it.quantity || 1);
                  const disabled = loadingId === id;

                  return (
                    <div key={id} style={{ display: "grid", gridTemplateColumns: "90px 1fr 220px", gap: 12, padding: 14, borderTop: idx === 0 ? "none" : "1px solid #f1f5f9" }}>
                      {/* Image */}
                      <div style={{ width: 90, height: 70, borderRadius: 12, overflow: "hidden", background: "#f3f4f6", border: "1px solid #e5e7eb" }}>
                        {it.image ? (
                          <img src={`/storage/${it.image}`} alt={it.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280" }}>—</div>
                        )}
                      </div>

                      {/* Infos */}
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 900, fontSize: 16, lineHeight: 1.2, marginBottom: 4 }}>{it.name}</div>
                        <div style={{ color: "#6b7280", fontSize: 13 }}>
                          Prix : <strong style={{ color: "#111" }}>{money(it.price)} F</strong>
                        </div>
                        <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <button
                            onClick={() => remove(id)}
                            disabled={disabled}
                            style={{
                              background: "transparent",
                              border: "1px solid #e5e7eb",
                              padding: "8px 10px",
                              borderRadius: 12,
                              cursor: disabled ? "not-allowed" : "pointer",
                              fontWeight: 900,
                              color: "#dc2626",
                            }}
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>

                      {/* Qty + Subtotal */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "end", gap: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <button
                            type="button"
                            disabled={disabled || Number(it.quantity) <= 1}
                            onClick={() => updateQty(id, Number(it.quantity) - 1)}
                            style={qtyBtn(disabled || Number(it.quantity) <= 1)}
                          >
                            −
                          </button>

                          <input
                            value={it.quantity}
                            onChange={(e) => updateQty(id, e.target.value)}
                            disabled={disabled}
                            style={{
                              width: 70,
                              textAlign: "center",
                              padding: "10px 10px",
                              border: "1px solid #e5e7eb",
                              borderRadius: 12,
                              fontWeight: 900,
                              outline: "none",
                            }}
                          />

                          <button
                            type="button"
                            disabled={disabled}
                            onClick={() => updateQty(id, Number(it.quantity) + 1)}
                            style={qtyBtn(disabled)}
                          >
                            +
                          </button>
                        </div>

                        <div style={{ fontWeight: 900 }}>
                          Sous-total : <span>{money(sub)} F</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RESUME */}
            <div style={{ height: "fit-content", background: "white", border: "1px solid #e5e7eb", borderRadius: 14, padding: 16 }}>
              <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 10 }}>Résumé</div>

              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 8, fontSize: 14 }}>
                <span style={{ color: "#6b7280" }}>Articles</span>
                <strong>{items.reduce((a, b) => a + Number(b.quantity || 0), 0)}</strong>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 12, fontSize: 14 }}>
                <span style={{ color: "#6b7280" }}>Total</span>
                <strong style={{ fontSize: 18 }}>{money(total)} F</strong>
              </div>

              <Link
                href="/checkout"
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  background: "#080a0a",
                  color: "#fecc33",
                  padding: "12px 14px",
                  borderRadius: 12,
                  textDecoration: "none",
                  fontWeight: 900,
                }}
              >
                Passer au paiement
              </Link>

              <div style={{ marginTop: 10, fontSize: 12, color: "#6b7280" }}>
                Livraison locale (Dakar + environs). Paiement Wave / Orange Money.
              </div>
            </div>
          </div>
        )}
      </div>
    </ShopLayout>
  );
}

function qtyBtn(disabled) {
  return {
    width: 40,
    height: 40,
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: disabled ? "#f3f4f6" : "white",
    fontWeight: 900,
    cursor: disabled ? "not-allowed" : "pointer",
  };
}
