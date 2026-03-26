import React from "react";
import { Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const btnYellow = {
  backgroundColor: "#fecc33",
  color: "#080a0a",
  fontWeight: 600,
  borderRadius: 8,
  padding: "6px 10px",
  textDecoration: "none",
  border: "1px solid #e5e7eb",
  display: "inline-block",
};

function formatFCFA(amount) {
  const n = Number(amount || 0);
  try {
    return new Intl.NumberFormat("fr-FR").format(n) + " F CFA";
  } catch {
    return `${n} F CFA`;
  }
}

const statusLabel = (s) => {
  const map = {
    en_attente: "En attente",
    en_preparation: "En préparation",
    validee: "Validée",
    en_livraison: "En livraison",
    expediee: "Expédiée",
    livree: "Livrée",
    annulee: "Annulée",
    payee: "Payée",
  };
  return map[s] || s || "—";
};

const paymentLabel = (s) => {
  const map = {
    pending: "En attente de paiement",
    paid: "Payé",
    failed: "Échec paiement",
  };
  return map[s] || "—";
};

const paymentMethodLabel = (method) => {
  const map = {
    wave: "Wave",
    om: "Orange Money",
    paypal: "PayPal",
  };
  return map[method] || method || "—";
};

const statusBadgeClass = (status) => {
  switch (status) {
    case "en_attente":
      return "bg-warning text-dark";
    case "en_preparation":
      return "bg-info text-dark";
    case "validee":
      return "bg-primary";
    case "en_livraison":
      return "bg-secondary";
    case "expediee":
      return "bg-dark";
    case "livree":
      return "bg-success";
    case "annulee":
      return "bg-danger";
    case "payee":
      return "bg-success";
    default:
      return "bg-light text-dark";
  }
};

const paymentBadgeClass = (status) => {
  switch (status) {
    case "paid":
      return "bg-success";
    case "pending":
      return "bg-warning text-dark";
    case "failed":
      return "bg-danger";
    default:
      return "bg-light text-dark";
  }
};

export default function Index({ orders }) {
  return (
    <AdminLayout title="Commandes">
      <div className="container-fluid py-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3 className="m-0">Commandes</h3>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body">
            {!orders?.data?.length ? (
              <p className="mb-0">Aucune commande pour le moment.</p>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Client</th>
                        <th>Total</th>
                        <th>Statut</th>
                        <th>Paiement</th>
                        <th style={{ width: 120 }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.data.map((o) => (
                        <tr key={o.id}>
                          <td style={{ fontWeight: 600 }}>#{o.id}</td>
                          <td className="text-muted">{o.created_at || "—"}</td>

                          <td>
                            {o.user ? (
                              <>
                                <div style={{ fontWeight: 600 }}>{o.user.name || "Sans nom"}</div>
                                <div className="text-muted small">{o.user.email}</div>
                              </>
                            ) : (
                              <span className="text-muted">—</span>
                            )}
                          </td>

                          <td style={{ fontWeight: 600 }}>{formatFCFA(o.total)}</td>

                          <td>
                            <span className={`badge ${statusBadgeClass(o.status)}`}>
                              {statusLabel(o.status)}
                            </span>
                          </td>

                          <td>
                            <div className="d-flex flex-column gap-1">
                              <span
                                className={`badge ${paymentBadgeClass(o.payment_status)}`}
                                style={{ width: "fit-content" }}
                              >
                                {paymentLabel(o.payment_status)}
                              </span>
                              <span className="text-muted small">
                                {paymentMethodLabel(o.payment_method)}
                              </span>
                            </div>
                          </td>

                          <td>
                            <Link href={`/admin/orders/${o.id}`} style={btnYellow}>
                              Voir
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex flex-wrap gap-2 mt-3">
                  {orders.links?.map((l, idx) => (
                    <button
                      key={idx}
                      disabled={!l.url}
                      onClick={() => l.url && router.visit(l.url)}
                      type="button"
                      style={{
                        backgroundColor: l.active ? "#fecc33" : "white",
                        color: "#080a0a",
                        border: "1px solid #e5e7eb",
                        fontWeight: 600,
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