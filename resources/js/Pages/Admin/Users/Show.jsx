import React from "react";
import AdminLayout from "@/Layouts/AdminLayouts";
import { Link } from "@inertiajs/react";

export default function Show({ user, orders }) {
  return (
    <AdminLayout title="Détails utilisateur">
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">Utilisateur #{user.id}</h3>
          <div className="d-flex gap-2">
            <Link className="btn btn-outline-dark" href="/admin/users">
              Retour
            </Link>
            <Link className="btn btn-dark" href={`/admin/users/${user.id}/edit`}>
              Modifier
            </Link>
          </div>
        </div>

        <div className="card p-3 mb-4">
          <div className="mb-2">
            <strong>Nom :</strong> {user.name || "—"}
          </div>
          <div className="mb-2">
            <strong>Email :</strong> {user.email}
          </div>
          <div className="mb-2">
            <strong>Statut :</strong>{" "}
            {user.is_active ? (
              <span className="badge bg-success">Actif</span>
            ) : (
              <span className="badge bg-secondary">Inactif</span>
            )}
          </div>
          <div className="mb-2">
            <strong>Créé le :</strong> {new Date(user.created_at).toLocaleString()}
          </div>
          <div>
            <strong>Mis à jour :</strong> {new Date(user.updated_at).toLocaleString()}
          </div>
        </div>

        <div className="card">
          <div className="card-header bg-white">
            <strong>Historique des commandes</strong>
          </div>

          <div className="table-responsive">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th>ID commande</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th>Paiement</th>
                  <th>Méthode</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.created_at}</td>
                      <td>{order.status}</td>
                      <td>{order.payment_status}</td>
                      <td>{order.payment_method || "—"}</td>
                      <td>{order.total.toLocaleString()} FCFA</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      Aucune commande trouvée pour cet utilisateur.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}