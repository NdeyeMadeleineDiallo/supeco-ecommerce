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

const statusLabel = (status) => {
  const map = {
    nouveau: "Nouveau",
    en_cours: "En cours",
    traite: "Traité",
  };
  return map[status] || "Nouveau";
};

const statusBadgeClass = (status) => {
  switch (status) {
    case "nouveau":
      return "bg-warning text-dark";
    case "en_cours":
      return "bg-info text-dark";
    case "traite":
      return "bg-success";
    default:
      return "bg-light text-dark";
  }
};

const typeLabel = (type) => {
  const map = {
    contact: "Contact",
    devis: "Demande de devis",
  };
  return map[type] || type || "—";
};

export default function Show({ message, allowedStatuses }) {
  const { flash, errors } = usePage().props;

  const { data, setData, post, processing } = useForm({
    status: message?.status || "nouveau",
  });

  const submit = (e) => {
    e.preventDefault();
    post(`/admin/messages/${message.id}/status`);
  };

  const quickChangeStatus = (status) => {
    setData("status", status);
    post(`/admin/messages/${message.id}/status`, {
      preserveScroll: true,
      data: { status },
    });
  };

  return (
    <AdminLayout title={`Message #${message.id}`}>
      <div className="container-fluid py-4">
        {flash?.success ? <div className="alert alert-success">{flash.success}</div> : null}

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">Détail du message</h3>
          <Link className="btn btn-outline-secondary" href="/admin/messages">
            Retour
          </Link>
        </div>

        <div className="card shadow-sm border-0 mb-3">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <div className="text-muted small">Date</div>
                <div>{message.created_at || "—"}</div>
              </div>

              <div className="col-md-3">
                <div className="text-muted small">Type</div>
                <div>{typeLabel(message.type)}</div>
              </div>

              <div className="col-md-3">
                <div className="text-muted small">Statut</div>
                <div>
                  <span className={`badge ${statusBadgeClass(message.status)}`}>
                    {statusLabel(message.status)}
                  </span>
                </div>
              </div>

              <div className="col-md-3">
                <div className="text-muted small">Nom</div>
                <div>{message.name}</div>
              </div>

              <div className="col-md-4">
                <div className="text-muted small">Email</div>
                <div>{message.email || "—"}</div>
              </div>

              <div className="col-md-4">
                <div className="text-muted small">Téléphone</div>
                <div>{message.phone || "—"}</div>
              </div>

              <div className="col-md-4">
                <div className="text-muted small">Sujet</div>
                <div>{message.subject || "—"}</div>
              </div>

              <div className="col-12">
                <div className="text-muted small">Message</div>
                <div className="mt-2 p-3 bg-light rounded">
                  {message.message}
                </div>
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
                className="btn btn-outline-info btn-sm"
                onClick={() => quickChangeStatus("en_cours")}
                disabled={processing}
              >
                Marquer en cours
              </button>

              <button
                type="button"
                className="btn btn-outline-success btn-sm"
                onClick={() => quickChangeStatus("traite")}
                disabled={processing}
              >
                Marquer comme traité
              </button>

              <button
                type="button"
                className="btn btn-outline-warning btn-sm"
                onClick={() => quickChangeStatus("nouveau")}
                disabled={processing}
              >
                Remettre en nouveau
              </button>
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h5 className="mb-3">Changer le statut</h5>

            <form onSubmit={submit} className="d-flex gap-2 align-items-end flex-wrap">
              <div>
                <label className="form-label">Statut</label>
                <select
                  className="form-select"
                  value={data.status}
                  onChange={(e) => setData("status", e.target.value)}
                >
                  {(allowedStatuses || []).map((status) => (
                    <option key={status} value={status}>
                      {statusLabel(status)}
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