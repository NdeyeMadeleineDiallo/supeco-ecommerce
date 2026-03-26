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

const typeLabel = (type) => {
  const map = {
    contact: "Contact",
    devis: "Devis",
  };
  return map[type] || type || "—";
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

export default function Index({ messages }) {
  return (
    <AdminLayout title="Messages">
      <div className="container-fluid py-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3 className="m-0">Messages</h3>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body">
            {!messages?.data?.length ? (
              <p className="mb-0">Aucun message pour le moment.</p>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Sujet</th>
                        <th>Statut</th>
                        <th style={{ width: 120 }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.data.map((m) => (
                        <tr key={m.id}>
                          <td className="text-muted">{m.created_at || "—"}</td>
                          <td>{typeLabel(m.type)}</td>
                          <td style={{ fontWeight: 600 }}>{m.name}</td>
                          <td>{m.email || "—"}</td>
                          <td>{m.phone || "—"}</td>
                          <td>{m.subject || "—"}</td>
                          <td>
                            <span className={`badge ${statusBadgeClass(m.status)}`}>
                              {statusLabel(m.status)}
                            </span>
                          </td>
                          <td>
                            <Link href={`/admin/messages/${m.id}`} style={btnYellow}>
                              Voir
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex flex-wrap gap-2 mt-3">
                  {messages.links?.map((l, idx) => (
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