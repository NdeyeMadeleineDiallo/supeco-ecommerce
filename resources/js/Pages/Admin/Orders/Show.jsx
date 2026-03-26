import React from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const btnYellow = {
  backgroundColor: "#fecc33",
  color: "#080a0a",
  fontWeight: 600,
  borderRadius: 8,
  padding: "8px 14px",
  textDecoration: "none",
  border: "1px solid #e5e7eb",
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

export default function Show({ order, allowedStatuses }) {
  const { flash, errors } = usePage().props;

  const { data, setData, post, processing } = useForm({
    status: order?.status || "en_attente",
  });

  const submitStatus = (e) => {
    e.preventDefault();
    post(`/admin/orders/${order.id}/status`);
  };

  const quickChangeStatus = (status) => {
    setData("status", status);
    post(`/admin/orders/${order.id}/status`, {
      preserveScroll: true,
      data: { status },
    });
  };

  return (
    <AdminLayout title={`Commande #${order.id}`}>
      <div className="container-fluid py-4">
        {flash?.success ? <div className="alert alert-success">{flash.success}</div> : null}

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">Commande #{order.id}</h3>
          <Link className="btn btn-outline-secondary" href="/admin/orders">
            Retour
          </Link>
        </div>

        <div className="card shadow-sm border-0 mb-3">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <div className="text-muted small">Date</div>
                <div>{order.created_at || "—"}</div>
              </div>

              <div className="col-md-3">
                <div className="text-muted small">Statut</div>
                <div>
                  <span className={`badge ${statusBadgeClass(order.status)}`}>
                    {statusLabel(order.status)}
                  </span>
                </div>
              </div>

              <div className="col-md-3">
                <div className="text-muted small">Total</div>
                <div style={{ fontWeight: 600 }}>{formatFCFA(order.total)}</div>
              </div>

              <div className="col-md-3">
                <div className="text-muted small">Paiement</div>
                <div className="d-flex flex-column gap-1">
                  <span className={`badge ${paymentBadgeClass(order.payment_status)}`}>
                    {order.payment_status || "—"}
                  </span>
                  <span className="text-muted small">
                    {order.payment_method || "—"}
                  </span>
                </div>
              </div>

              <div className="col-md-6">
                <div className="text-muted small">Client</div>
                {order.user ? (
                  <div>
                    <span style={{ fontWeight: 600 }}>{order.user.name || "Sans nom"}</span>{" "}
                    <span className="text-muted">({order.user.email})</span>
                  </div>
                ) : (
                  <div className="text-muted">—</div>
                )}
              </div>

              <div className="col-md-6">
                <div className="text-muted small">Référence paiement</div>
                <div>{order.payment_ref || "—"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-0 mb-3">
          <div className="card-body">
            <h5 className="mb-3">Actions rapides</h5>

            <div className="d-flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={() => quickChangeStatus("validee")}
                disabled={processing}
              >
                Valider
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => quickChangeStatus("en_livraison")}
                disabled={processing}
              >
                En livraison
              </button>

              <button
                type="button"
                className="btn btn-outline-success btn-sm"
                onClick={() => quickChangeStatus("livree")}
                disabled={processing}
              >
                Marquer livrée
              </button>

              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => quickChangeStatus("annulee")}
                disabled={processing}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-0 mb-3">
          <div className="card-body">
            <h5 className="mb-3">Informations de livraison</h5>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="text-muted small">Nom</div>
                <div>{order.shipping_name}</div>
              </div>
              <div className="col-md-4">
                <div className="text-muted small">Téléphone</div>
                <div>{order.shipping_phone}</div>
              </div>
              <div className="col-md-4">
                <div className="text-muted small">Ville</div>
                <div>{order.shipping_city}</div>
              </div>
              <div className="col-12">
                <div className="text-muted small">Adresse</div>
                <div>{order.shipping_address}</div>
              </div>
              <div className="col-12">
                <div className="text-muted small">Note</div>
                <div>{order.shipping_note || "—"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-0 mb-3">
          <div className="card-body">
            <h5 className="mb-3">Produits commandés</h5>
            {!order.items?.length ? (
              <p className="mb-0">Aucun article.</p>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Prix</th>
                      <th>Quantité</th>
                      <th>Sous-total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((it) => (
                      <tr key={it.id}>
                        <td style={{ fontWeight: 600 }}>{it.name}</td>
                        <td>{formatFCFA(it.price)}</td>
                        <td>{it.quantity}</td>
                        <td style={{ fontWeight: 600 }}>{formatFCFA(it.subtotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h5 className="mb-3">Changer le statut</h5>

            <form onSubmit={submitStatus} className="d-flex gap-2 align-items-end flex-wrap">
              <div>
                <label className="form-label">Statut</label>
                <select
                  className="form-select"
                  value={data.status}
                  onChange={(e) => setData("status", e.target.value)}
                >
                  {(allowedStatuses || []).map((s) => (
                    <option key={s} value={s}>
                      {statusLabel(s)}
                    </option>
                  ))}
                </select>
                {errors?.status ? <div className="text-danger small mt-1">{errors.status}</div> : null}
              </div>

              <button type="submit" disabled={processing} style={{ ...btnYellow, height: 38 }}>
                {processing ? "Mise à jour..." : "Mettre à jour"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}