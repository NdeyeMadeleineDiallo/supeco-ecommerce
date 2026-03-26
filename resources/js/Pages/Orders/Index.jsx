import React from "react";
import { Link } from "@inertiajs/react";
import ShopLayout from "@/Layouts/ShopLayout";

const money = (v) => new Intl.NumberFormat("fr-FR").format(Number(v || 0)) + " F CFA";

const statusLabel = (s) => {
  const map = {
    en_attente: "En attente",
    en_preparation: "En préparation",
    validee: "Validée",
    expediee: "Expédiée",
    en_livraison: "En livraison",
    livree: "Livrée",
    annulee: "Annulée",
    payee: "Payée",
  };
  return map[s] || s || "—";
};

const paymentLabel = (status) => {
  const map = {
    pending: "En attente",
    paid: "Payé",
    failed: "Échec",
  };
  return map[status] || status || "—";
};

const paymentMethodLabel = (method) => {
  const map = {
    wave: "Wave",
    om: "Orange Money",
    paypal: "PayPal",
  };
  return map[method] || method || "—";
};

const statusStyle = (s) => {
  const map = {
    en_attente: { bg: "#fff7ed", bd: "#fed7aa", col: "#9a3412" },
    en_preparation: { bg: "#eef2ff", bd: "#c7d2fe", col: "#3730a3" },
    validee: { bg: "#ecfeff", bd: "#cffafe", col: "#155e75" },
    expediee: { bg: "#eef2ff", bd: "#c7d2fe", col: "#3730a3" },
    en_livraison: { bg: "#fef9c3", bd: "#fde68a", col: "#854d0e" },
    livree: { bg: "#dcfce7", bd: "#bbf7d0", col: "#166534" },
    annulee: { bg: "#fee2e2", bd: "#fecaca", col: "#991b1b" },
    payee: { bg: "#dcfce7", bd: "#bbf7d0", col: "#166534" },
  };
  return map[s] || { bg: "#f3f4f6", bd: "#e5e7eb", col: "#111827" };
};

const paymentStyle = (s) => {
  const map = {
    pending: { bg: "#fff7ed", bd: "#fed7aa", col: "#9a3412" },
    paid: { bg: "#dcfce7", bd: "#bbf7d0", col: "#166534" },
    failed: { bg: "#fee2e2", bd: "#fecaca", col: "#991b1b" },
  };
  return map[s] || { bg: "#f3f4f6", bd: "#e5e7eb", col: "#111827" };
};

export default function OrdersIndex({ orders }) {
  const rows = orders?.data ?? [];

  return (
    <ShopLayout title="Mes commandes — SUPECO">
      <div style={{ background: "#f7f7f5" }}>
        <style>{`
          .orders-shell {
            max-width: 1120px;
            margin: 0 auto;
            padding: 24px 16px 40px;
          }

          .orders-title {
            margin: 0 0 8px;
            font-size: clamp(24px, 3vw, 34px);
            font-weight: 700;
            color: #080a0a;
            letter-spacing: -.02em;
          }

          .orders-subtitle {
            margin: 0 0 18px;
            color: #6b7280;
            font-size: 15px;
            line-height: 1.7;
          }

          .orders-card {
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 12px 24px rgba(0,0,0,.04);
          }

          .orders-card-head {
            padding: 16px 18px;
            border-bottom: 1px solid #e5e7eb;
            font-weight: 700;
            color: #080a0a;
            background: linear-gradient(180deg, #ffffff 0%, #fcfcfc 100%);
          }

          .empty-box {
            background: #fff;
            border: 1px solid #e5e7eb;
            border-radius: 18px;
            padding: 22px 18px;
            box-shadow: 0 12px 24px rgba(0,0,0,.04);
          }

          .empty-title {
            font-size: 18px;
            font-weight: 700;
            color: #080a0a;
            margin-bottom: 6px;
          }

          .empty-text {
            color: #6b7280;
            line-height: 1.7;
            margin-bottom: 14px;
          }

          .btn-products {
            background: #080a0a;
            color: #fecc33;
            padding: 10px 14px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 700;
            display: inline-block;
            box-shadow: 0 10px 18px rgba(0,0,0,.08);
          }

          .btn-products:hover {
            color: #fecc33;
          }

          .orders-table-wrap {
            width: 100%;
            overflow-x: auto;
          }

          .orders-table {
            width: 100%;
            border-collapse: collapse;
            min-width: 780px;
          }

          .orders-table thead tr {
            background: #f8fafc;
          }

          .orders-th {
            text-align: left;
            padding: 13px 14px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 13px;
            color: #475569;
            font-weight: 700;
          }

          .orders-td {
            padding: 14px;
            border-bottom: 1px solid #eef2f7;
            font-size: 14px;
            color: #1f2937;
            vertical-align: middle;
          }

          .order-id {
            font-weight: 700;
            color: #080a0a;
          }

          .order-date {
            color: #6b7280;
          }

          .status-pill {
            display: inline-block;
            padding: 7px 11px;
            border-radius: 999px;
            font-weight: 700;
            font-size: 12px;
            border: 1px solid;
            box-shadow: 0 6px 12px rgba(0,0,0,.03);
          }

          .payment-box {
            display: inline-flex;
            flex-direction: column;
            gap: 5px;
          }

          .payment-method {
            font-weight: 700;
            color: #080a0a;
          }

          .total-text {
            font-weight: 700;
            color: #080a0a;
            white-space: nowrap;
          }

          .view-btn {
            background: #080a0a;
            color: #fecc33;
            padding: 8px 12px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 700;
            display: inline-block;
            box-shadow: 0 8px 16px rgba(0,0,0,.08);
          }

          .view-btn:hover {
            color: #fecc33;
          }

          .pagination-row {
            padding: 14px 16px;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            background: #fff;
          }

          .pagination-link {
            padding: 9px 12px;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
            font-weight: 700;
            text-decoration: none;
          }

          @media (max-width: 700px) {
            .orders-shell {
              padding: 20px 14px 32px;
            }
          }
        `}</style>

        <div className="orders-shell">
          <h1 className="orders-title">Mes commandes</h1>
          <p className="orders-subtitle">
            Retrouvez ici l’historique de vos commandes, leur statut de traitement
            et les informations liées au paiement.
          </p>

          {rows.length === 0 ? (
            <div className="empty-box">
              <div className="empty-title">Aucune commande pour le moment</div>
              <div className="empty-text">
                Vous n’avez pas encore effectué d’achat. Parcourez le catalogue
                pour découvrir nos produits.
              </div>
              <Link href="/produits" className="btn-products">
                Voir les produits
              </Link>
            </div>
          ) : (
            <div className="orders-card">
              <div className="orders-card-head">Historique de vos commandes</div>

              <div className="orders-table-wrap">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th className="orders-th">Commande</th>
                      <th className="orders-th">Date</th>
                      <th className="orders-th">Statut</th>
                      <th className="orders-th">Paiement</th>
                      <th className="orders-th">Total</th>
                      <th className="orders-th">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((o) => {
                      const st = statusStyle(o.status);
                      const ps = paymentStyle(o.payment_status);

                      return (
                        <tr key={o.id}>
                          <td className="orders-td">
                            <span className="order-id">#{o.id}</span>
                          </td>

                          <td className="orders-td">
                            <span className="order-date">{o.created_at}</span>
                          </td>

                          <td className="orders-td">
                            <span
                              className="status-pill"
                              style={{
                                background: st.bg,
                                borderColor: st.bd,
                                color: st.col,
                              }}
                            >
                              {statusLabel(o.status)}
                            </span>
                          </td>

                          <td className="orders-td">
                            <div className="payment-box">
                              <span className="payment-method">
                                {paymentMethodLabel(o.payment_method)}
                              </span>
                              <span
                                className="status-pill"
                                style={{
                                  background: ps.bg,
                                  borderColor: ps.bd,
                                  color: ps.col,
                                  width: "fit-content",
                                }}
                              >
                                {paymentLabel(o.payment_status)}
                              </span>
                            </div>
                          </td>

                          <td className="orders-td">
                            <span className="total-text">{money(o.total)}</span>
                          </td>

                          <td className="orders-td">
                            <Link href={`/mes-commandes/${o.id}`} className="view-btn">
                              Voir
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="pagination-row">
                {(orders?.links || []).map((l, idx) => {
                  if (!l.url) return null;
                  const label = String(l.label).replace("&laquo;", "«").replace("&raquo;", "»");
                  const active = !!l.active;

                  return (
                    <Link
                      key={idx}
                      href={l.url}
                      preserveScroll
                      preserveState
                      className="pagination-link"
                      style={{
                        background: active ? "#080a0a" : "white",
                        color: active ? "#fecc33" : "#111827",
                        borderColor: active ? "#080a0a" : "#e5e7eb",
                      }}
                      dangerouslySetInnerHTML={{ __html: label }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </ShopLayout>
  );
}