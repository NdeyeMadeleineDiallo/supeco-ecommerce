import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";

export default function Index({ users, filters }) {
  const [search, setSearch] = React.useState(filters?.search || "");

  const submit = (e) => {
    e.preventDefault();
    router.get("/admin/users", { search }, { preserveState: true });
  };

  const toggleStatus = (userId) => {
    router.post(`/admin/users/${userId}/toggle-status`);
  };

  return (
    <AdminLayout title="Utilisateurs">
      <div className="container py-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3 className="m-0">Utilisateurs</h3>
        </div>

        <form onSubmit={submit} className="d-flex gap-2 mb-3">
          <input
            className="form-control"
            placeholder="Rechercher par nom ou email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-dark" type="submit">
            Rechercher
          </button>
        </form>

        <div className="card">
          <div className="table-responsive">
            <table className="table mb-0 align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Statut</th>
                  <th>Commandes</th>
                  <th>Créé le</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.data.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name || "—"}</td>
                    <td>{u.email}</td>
                    <td>
                      {u.is_active ? (
                        <span className="badge bg-success">Actif</span>
                      ) : (
                        <span className="badge bg-secondary">Inactif</span>
                      )}
                    </td>
                    <td>{u.orders_count ?? 0}</td>
                    <td>{new Date(u.created_at).toLocaleDateString()}</td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2 flex-wrap">
                        <Link
                          className="btn btn-sm btn-outline-dark"
                          href={`/admin/users/${u.id}`}
                        >
                          Voir
                        </Link>

                        <Link
                          className="btn btn-sm btn-dark"
                          href={`/admin/users/${u.id}/edit`}
                        >
                          Modifier
                        </Link>

                        <button
                          type="button"
                          className={`btn btn-sm ${u.is_active ? "btn-outline-danger" : "btn-outline-success"}`}
                          onClick={() => toggleStatus(u.id)}
                        >
                          {u.is_active ? "Désactiver" : "Activer"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {users.data.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      Aucun utilisateur trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3">
          {users.links?.map((l, idx) => (
            <button
              key={idx}
              className={`btn btn-sm ${l.active ? "btn-dark" : "btn-outline-dark"}`}
              disabled={!l.url}
              onClick={() => l.url && router.get(l.url)}
              dangerouslySetInnerHTML={{ __html: l.label }}
            />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}