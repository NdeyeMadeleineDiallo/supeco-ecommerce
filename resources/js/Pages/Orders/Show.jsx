import React from "react";
import { Link } from "@inertiajs/react";
import ShopLayout from "@/Layouts/ShopLayout";

const money = (v) => new Intl.NumberFormat("fr-FR").format(Number(v || 0)) + " F CFA";

const paymentMethodLabel = (method) => {
  const map = {
    wave: "Wave",
    om: "Orange Money",
    paypal: "PayPal",
  };
  return map[method] || method || "—";
};

const paymentStatusLabel = (status) => {
  const map = {
    pending: "En attente",
    paid: "Payé",
    failed: "Échec",
  };
  return map[status] || status || "En attente";
};

const paymentStatusStyle = (status) => {
  const map = {
    pending: { bg: "#fff7ed", bd: "#fed7aa", col: "#9a3412" },
    paid: { bg: "#dcfce7", bd: "#bbf7d0", col: "#166534" },
    failed: { bg: "#fee2e2", bd: "#fecaca", col: "#991b1b" },
  };
  return map[status] || { bg: "#f3f4f6", bd: "#e5e7eb", col: "#111827" };
};

export default function OrderShow({ order }) {
  const items = order?.items ?? [];
  const paySt = paymentStatusStyle(order?.payment_status);

  return (
    <ShopLayout title={`Commande #${order?.id} — SUPECO`}>
      <div style={{ background: "#f7f7f5" }}>
        <style>{`
          .order-shell {
            padding: 24px 16px 40px;
            max-width: 1120px;
            margin: 0 auto;
          }

          .order-top {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            flex-wrap: wrap;
            align-items: center;
            margin-bottom: 16px;
          }

          .order-title {
            font-size: clamp(24px, 3vw, 34px);
            font-weight: 700;
            margin: 0 0 6px;
            color: #080a0a;
            letter-spacing: -.02em;
          }

          .order-date {
            color: #6b7280;
            font-size: 14px;
          }

          .back-link {
            text-decoration: none;
            font-weight: 700;
            color: #080a0a;
            background: #fff;
            border: 1px solid #e5e7eb;
            padding: 10px 14px;
            border-radius: 12px;
            box-shadow: 0 8px 18px rgba(0,0,0,.04);
          }

          .order-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-top: 14px;
          }

          .order-card {
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 18px;
            padding: 18px;
            box-shadow: 0 12px 24px rgba(0,0,0,.04);
          }

          .order-card-wide {
            grid-column: 1 / -1;
          }

          .order-card-title {
            font-weight: 700;
            margin-bottom: 12px;
            color: #080a0a;
            font-size: 18px;
          }

          .order-info {
            display: grid;
            gap: 8px;
            color: #374151;
            font-size: 14px;
            line-height: 1.65;
          }

          .order-note {
            margin-top: 10px;
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 12px;
          }

          .pill {
            display: inline-block;
            padding: 7px 11px;
            border-radius: 999px;
            font-weight: 700;
            font-size: 12px;
            border: 1px solid;
            box-shadow: 0 6px 12px rgba(0,0,0,.03);
          }

          .order-total {
            margin-top: 10px;
            font-weight: 800;
            font-size: 18px;
            color: #080a0a;
          }

          .table-wrap {
            width: 100%;
            overflow-x: auto;
          }

          .table {
            width: 100%;
            border-collapse: collapse;
            min-width: 680px;
          }

          .table thead tr {
            background: #f8fafc;
          }

          .th {
            text-align: left;
            padding: 12px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 13px;
            color: #475569;
            font-weight: 700;
          }

          .td {
            padding: 12px;
            border-bottom: 1px solid #eef2f7;
            font-size: 14px;
            color: #1f2937;
          }

          @media (max-width: 860px) {
            .order-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 700px) {
            .order-shell {
              padding: 20px 14px 32px;
            }
          }
        `}</style>

        <div className="order-shell">
          <div className="order-top">
            <div>
              <h1 className="order-title">Commande #{order?.id}</h1>
              <div className="order-date">{order?.created_at}</div>
            </div>

            <Link href="/mes-commandes" className="back-link">
              ← Retour
            </Link>
          </div>

          <div className="order-grid">
            <div className="order-card">
              <div className="order-card-title">Livraison</div>

              <div className="order-info">
                <div><strong>Nom :</strong> {order?.shipping_name || "—"}</div>
                <div><strong>Téléphone :</strong> {order?.shipping_phone || "—"}</div>
                <div><strong>Ville :</strong> {order?.shipping_city || "—"}</div>
                <div><strong>Adresse :</strong> {order?.shipping_address || "—"}</div>
              </div>

              {order?.shipping_note ? (
                <div className="order-note">
                  <strong>Note :</strong> {order.shipping_note}
                </div>
              ) : null}
            </div>

            <div className="order-card">
              <div className="order-card-title">Paiement</div>

              <div className="order-info">
                <div>
                  <strong>Méthode :</strong> {paymentMethodLabel(order?.payment_method)}
                </div>

                <div>
                  <strong>Statut :</strong>{" "}
                  <span
                    className="pill"
                    style={{
                      background: paySt.bg,
                      borderColor: paySt.bd,
                      color: paySt.col,
                    }}
                  >
                    {paymentStatusLabel(order?.payment_status)}
                  </span>
                </div>

                <div>
                  <strong>Référence :</strong> {order?.payment_ref || "—"}
                </div>
              </div>

              <div className="order-total">
                Total : {money(order?.total)}
              </div>
            </div>

            <div className="order-card order-card-wide">
              <div className="order-card-title">Articles</div>

              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="th">Produit</th>
                      <th className="th">Prix</th>
                      <th className="th">Qté</th>
                      <th className="th">Sous-total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it, i) => (
                      <tr key={i}>
                        <td className="td">{it.name}</td>
                        <td className="td">{money(it.price)}</td>
                        <td className="td">{it.quantity}</td>
                        <td className="td">{money(it.subtotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
}