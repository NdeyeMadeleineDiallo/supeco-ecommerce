import React from "react";
import { Link } from "@inertiajs/react";
import ShopLayout from "@/Layouts/ShopLayout";

export default function CheckoutSuccess({ order, waveNumber, omNumber }) {
  const money = (n) => new Intl.NumberFormat("fr-FR").format(Number(n || 0));

  const payLabel =
    order?.payment_method === "om"
      ? "Orange Money"
      : order?.payment_method === "paypal"
      ? "PayPal"
      : "Wave";

  const statusLabel = (() => {
    const st = order?.status || "en_attente";
    if (st === "validee") return "Validée";
    if (st === "expediee") return "Expédiée";
    if (st === "livree") return "Livrée";
    if (st === "annulee") return "Annulée";
    return "En attente";
  })();

  const isWave = order?.payment_method === "wave";
  const isOm = order?.payment_method === "om";
  const payTo = isOm ? omNumber : waveNumber;

  return (
    <ShopLayout>
      <div
        style={{
          padding: 16,
          maxWidth: 1100,
          margin: "0 auto",
          background: "#f7f7f5",
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 10,
            color: "#080a0a",
          }}
        >
          ✅ Commande enregistrée
        </h1>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
          <Pill label={`Statut : ${statusLabel}`} />
          <Pill label={`Paiement : ${payLabel}`} tone="info" />
          <Pill label={`Total : ${money(order?.total)} F`} tone="default" />
        </div>

        <div className="success-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 16 }}>
          {/* GAUCHE */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card title="Instructions de paiement">
              {isWave || isOm ? (
                <div
                  style={{
                    background: "#fffaf0",
                    border: "1px solid #fde68a",
                    padding: 14,
                    borderRadius: 14,
                    boxShadow: "0 10px 20px rgba(0,0,0,.04)",
                  }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                    <img
                      src={isOm ? "/images/payments/orange-money.png" : "/images/payments/wave-logo.png"}
                      alt={payLabel}
                      style={{ width: 42, height: 42, objectFit: "contain" }}
                    />
                    <div style={{ fontWeight: 700, fontSize: 16, color: "#080a0a" }}>{payLabel}</div>
                  </div>

                  <div style={{ fontSize: 14, lineHeight: 1.7, color: "#374151" }}>
                    <div>
                      <strong>Payer au :</strong> {payTo}
                    </div>
                    <div>
                      <strong>Montant :</strong> {money(order?.total)} F
                    </div>
                    <div>
                      <strong>Référence :</strong> {order?.payment_ref || "—"}
                    </div>
                  </div>

                  <div style={{ marginTop: 10, fontSize: 12, color: "#6b7280" }}>
                    Une fois le paiement effectué, garde ton reçu. Notre équipe validera la commande dès réception.
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    padding: 14,
                    borderRadius: 14,
                    boxShadow: "0 10px 20px rgba(0,0,0,.04)",
                  }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                    <img
                      src="/images/payments/paypal.png"
                      alt="PayPal"
                      style={{ width: 42, height: 42, objectFit: "contain" }}
                    />
                    <div style={{ fontWeight: 700, fontSize: 16, color: "#080a0a" }}>PayPal</div>
                  </div>

                  <div style={{ fontSize: 14, lineHeight: 1.7, color: "#374151" }}>
                    <div>
                      <strong>Transaction :</strong> {order?.payment_ref || "—"}
                    </div>
                    <div>
                      <strong>Montant :</strong> {money(order?.total)} F
                    </div>
                  </div>
                </div>
              )}
            </Card>

            <Card title="Livraison">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  fontSize: 14,
                  color: "#374151",
                }}
              >
                <div>
                  <strong style={{ color: "#080a0a" }}>Nom :</strong> {order?.shipping_name || "—"}
                </div>
                <div>
                  <strong style={{ color: "#080a0a" }}>Téléphone :</strong> {order?.shipping_phone || "—"}
                </div>
                <div>
                  <strong style={{ color: "#080a0a" }}>Ville :</strong> {order?.shipping_city || "—"}
                </div>
                <div>
                  <strong style={{ color: "#080a0a" }}>Adresse :</strong> {order?.shipping_address || "—"}
                </div>
              </div>

              {order?.shipping_note ? (
                <div
                  style={{
                    marginTop: 12,
                    fontSize: 14,
                    color: "#374151",
                    background: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: 12,
                    padding: 12,
                  }}
                >
                  <strong style={{ color: "#080a0a" }}>Note :</strong> {order.shipping_note}
                </div>
              ) : null}
            </Card>
          </div>

          {/* DROITE */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card title="Récapitulatif">
              <div style={{ fontSize: 14 }}>
                {(order?.items || []).map((it, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 10,
                      marginBottom: 10,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: "#080a0a" }}>
                        {it?.product?.name || "Produit"}
                      </div>
                      <div style={{ color: "#6b7280", fontSize: 12 }}>Qté: {it?.quantity}</div>
                    </div>
                    <div style={{ fontWeight: 800, color: "#080a0a" }}>
                      {money(Number(it?.price || 0) * Number(it?.quantity || 0))} F
                    </div>
                  </div>
                ))}
              </div>

              <hr style={{ margin: "14px 0", border: "none", borderTop: "1px solid #e5e7eb" }} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 800,
                  fontSize: 16,
                  color: "#080a0a",
                }}
              >
                <span>Total</span>
                <span>{money(order?.total)} F</span>
              </div>

              <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href={`/mes-commandes/${order?.id}`} style={btnPrimary}>
                  Voir ma commande
                </Link>
                <Link href="/produits" style={btnGhost}>
                  Continuer mes achats
                </Link>
              </div>
            </Card>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .success-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </ShopLayout>
  );
}

function Card({ title, children }) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 16,
        boxShadow: "0 10px 24px rgba(0,0,0,.04)",
      }}
    >
      <h2
        style={{
          fontSize: 18,
          fontWeight: 700,
          margin: "0 0 10px",
          color: "#080a0a",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function Pill({ label, tone = "warning" }) {
  const style = pillStyles[tone] || pillStyles.warning;

  return (
    <div
      style={{
        padding: "8px 12px",
        borderRadius: 999,
        fontWeight: 700,
        fontSize: 13,
        boxShadow: "0 6px 14px rgba(0,0,0,.04)",
        ...style,
      }}
    >
      {label}
    </div>
  );
}

const pillStyles = {
  success: {
    background: "#dcfce7",
    border: "1px solid #bbf7d0",
    color: "#166534",
  },
  warning: {
    background: "#fff7ed",
    border: "1px solid #fed7aa",
    color: "#9a3412",
  },
  info: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    color: "#1d4ed8",
  },
  default: {
    background: "#f3f4f6",
    border: "1px solid #e5e7eb",
    color: "#111827",
  },
};

const btnPrimary = {
  background: "#080a0a",
  color: "#fecc33",
  padding: "10px 14px",
  borderRadius: 12,
  textDecoration: "none",
  fontWeight: 700,
  boxShadow: "0 10px 18px rgba(0,0,0,.08)",
};

const btnGhost = {
  background: "#f3f4f6",
  color: "#111827",
  padding: "10px 14px",
  borderRadius: 12,
  textDecoration: "none",
  fontWeight: 700,
  border: "1px solid #e5e7eb",
};