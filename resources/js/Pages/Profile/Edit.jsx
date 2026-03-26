import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import ShopLayout from "@/Layouts/ShopLayout";

export default function ProfileEdit({ status }) {
  const { auth } = usePage().props;
  const user = auth?.user;

  const profileForm = useForm({
    name: user?.name || "",
    email: user?.email || "",
  });

  const passwordForm = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const deleteForm = useForm({
    password: "",
  });

  const submitProfile = (e) => {
    e.preventDefault();
    profileForm.patch("/profile");
  };

  const submitPassword = (e) => {
    e.preventDefault();
    passwordForm.put("/profile/password", {
      onFinish: () => passwordForm.reset("current_password", "password", "password_confirmation"),
    });
  };

  const submitDelete = (e) => {
    e.preventDefault();

    if (!confirm("Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible.")) {
      return;
    }

    deleteForm.delete("/profile");
  };

  return (
    <>
      <Head title="Mon profil" />

      <ShopLayout title="Mon profil">
        <div style={{ background: "#f7f7f5" }}>
          <style>{`
            .profile-shell {
              max-width: 1100px;
              margin: 0 auto;
              padding: 26px 16px 42px;
            }

            .profile-head {
              margin-bottom: 18px;
            }

            .profile-title {
              margin: 0 0 8px;
              font-size: clamp(26px, 3vw, 36px);
              font-weight: 700;
              color: #080a0a;
              letter-spacing: -.02em;
            }

            .profile-subtitle {
              margin: 0;
              color: #6b7280;
              font-size: 15px;
              line-height: 1.7;
              max-width: 760px;
            }

            .profile-grid {
              display: grid;
              gap: 18px;
            }

            .profile-card {
              background: #fff;
              border: 1px solid #e5e7eb;
              border-radius: 20px;
              padding: 20px 18px;
              box-shadow: 0 12px 24px rgba(0,0,0,.04);
            }

            .profile-card-danger {
              border-color: #fecaca;
              background: linear-gradient(180deg, #fff 0%, #fff7f7 100%);
            }

            .profile-card-title {
              margin: 0 0 8px;
              font-size: 20px;
              font-weight: 700;
              color: #080a0a;
            }

            .profile-card-text {
              margin: 0 0 16px;
              color: #6b7280;
              font-size: 14px;
              line-height: 1.7;
            }

            .profile-form {
              display: grid;
              gap: 14px;
            }

            .profile-form-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
            }

            .profile-field {
              display: grid;
              gap: 7px;
            }

            .profile-label {
              font-size: 14px;
              font-weight: 700;
              color: #080a0a;
            }

            .profile-input {
              width: 100%;
              padding: 12px 14px;
              border: 1px solid #e5e7eb;
              border-radius: 14px;
              outline: none;
              transition: all .2s ease;
              font-size: 14px;
              background: #fff;
            }

            .profile-input:focus {
              border-color: rgba(254, 201, 3, .75);
              box-shadow: 0 0 0 4px rgba(254, 201, 3, .16);
            }

            .profile-error {
              color: #b91c1c;
              font-size: 13px;
            }

            .profile-row {
              display: flex;
              gap: 12px;
              align-items: center;
              flex-wrap: wrap;
            }

            .profile-status {
              font-size: 13px;
              font-weight: 700;
              color: #166534;
              background: #dcfce7;
              border: 1px solid #bbf7d0;
              padding: 8px 12px;
              border-radius: 999px;
            }

            .btn-dark-profile,
            .btn-danger-profile {
              border: none;
              border-radius: 14px;
              padding: 12px 16px;
              font-size: 14px;
              font-weight: 800;
              cursor: pointer;
              transition: all .2s ease;
            }

            .btn-dark-profile {
              background: #080a0a;
              color: #fec903;
              box-shadow: 0 10px 18px rgba(0,0,0,.08);
            }

            .btn-danger-profile {
              background: #b91c1c;
              color: white;
              box-shadow: 0 10px 18px rgba(185,28,28,.14);
            }

            .btn-dark-profile:disabled,
            .btn-danger-profile:disabled {
              opacity: .7;
              cursor: not-allowed;
            }

            @media (max-width: 760px) {
              .profile-shell {
                padding: 20px 14px 32px;
              }

              .profile-form-grid {
                grid-template-columns: 1fr;
              }
            }
          `}</style>

          <div className="profile-shell">
            <div className="profile-head">
              <h1 className="profile-title">Mon profil</h1>
              <p className="profile-subtitle">
                Gérez vos informations personnelles, mettez à jour votre mot de passe
                et sécurisez votre compte.
              </p>
            </div>

            <div className="profile-grid">
              {/* Profil */}
              <section className="profile-card">
                <h2 className="profile-card-title">Informations du profil</h2>
                <p className="profile-card-text">
                  Modifiez votre nom et votre adresse email.
                </p>

                <form onSubmit={submitProfile} className="profile-form">
                  <div className="profile-form-grid">
                    <div className="profile-field">
                      <label className="profile-label">Nom complet</label>
                      <input
                        type="text"
                        value={profileForm.data.name}
                        onChange={(e) => profileForm.setData("name", e.target.value)}
                        className="profile-input"
                        required
                      />
                      {profileForm.errors.name && (
                        <div className="profile-error">{profileForm.errors.name}</div>
                      )}
                    </div>

                    <div className="profile-field">
                      <label className="profile-label">Email</label>
                      <input
                        type="email"
                        value={profileForm.data.email}
                        onChange={(e) => profileForm.setData("email", e.target.value)}
                        className="profile-input"
                        required
                      />
                      {profileForm.errors.email && (
                        <div className="profile-error">{profileForm.errors.email}</div>
                      )}
                    </div>
                  </div>

                  <div className="profile-row">
                    <button
                      type="submit"
                      disabled={profileForm.processing}
                      className="btn-dark-profile"
                    >
                      {profileForm.processing ? "Enregistrement..." : "Enregistrer les modifications"}
                    </button>

                    {status === "profile-updated" && (
                      <span className="profile-status">Profil mis à jour</span>
                    )}
                  </div>
                </form>
              </section>

              {/* Mot de passe */}
              <section className="profile-card">
                <h2 className="profile-card-title">Modifier le mot de passe</h2>
                <p className="profile-card-text">
                  Choisissez un mot de passe fort pour mieux sécuriser votre compte.
                </p>

                <form onSubmit={submitPassword} className="profile-form">
                  <div className="profile-form-grid">
                    <div className="profile-field">
                      <label className="profile-label">Mot de passe actuel</label>
                      <input
                        type="password"
                        value={passwordForm.data.current_password}
                        onChange={(e) => passwordForm.setData("current_password", e.target.value)}
                        className="profile-input"
                        required
                      />
                      {passwordForm.errors.current_password && (
                        <div className="profile-error">{passwordForm.errors.current_password}</div>
                      )}
                    </div>

                    <div className="profile-field">
                      <label className="profile-label">Nouveau mot de passe</label>
                      <input
                        type="password"
                        value={passwordForm.data.password}
                        onChange={(e) => passwordForm.setData("password", e.target.value)}
                        className="profile-input"
                        required
                      />
                      {passwordForm.errors.password && (
                        <div className="profile-error">{passwordForm.errors.password}</div>
                      )}
                    </div>
                  </div>

                  <div className="profile-field">
                    <label className="profile-label">Confirmer le nouveau mot de passe</label>
                    <input
                      type="password"
                      value={passwordForm.data.password_confirmation}
                      onChange={(e) => passwordForm.setData("password_confirmation", e.target.value)}
                      className="profile-input"
                      required
                    />
                    {passwordForm.errors.password_confirmation && (
                      <div className="profile-error">{passwordForm.errors.password_confirmation}</div>
                    )}
                  </div>

                  <div className="profile-row">
                    <button
                      type="submit"
                      disabled={passwordForm.processing}
                      className="btn-dark-profile"
                    >
                      {passwordForm.processing ? "Mise à jour..." : "Mettre à jour le mot de passe"}
                    </button>

                    {status === "password-updated" && (
                      <span className="profile-status">Mot de passe mis à jour</span>
                    )}
                  </div>
                </form>
              </section>

              {/* Suppression */}
              <section className="profile-card profile-card-danger">
                <h2 className="profile-card-title">Supprimer le compte</h2>
                <p className="profile-card-text">
                  Cette action est définitive. Toutes vos données associées à ce compte
                  seront supprimées.
                </p>

                <form onSubmit={submitDelete} className="profile-form">
                  <div className="profile-field">
                    <label className="profile-label">Confirmez votre mot de passe</label>
                    <input
                      type="password"
                      value={deleteForm.data.password}
                      onChange={(e) => deleteForm.setData("password", e.target.value)}
                      className="profile-input"
                      required
                    />
                    {deleteForm.errors.password && (
                      <div className="profile-error">{deleteForm.errors.password}</div>
                    )}
                  </div>

                  <div className="profile-row">
                    <button
                      type="submit"
                      disabled={deleteForm.processing}
                      className="btn-danger-profile"
                    >
                      {deleteForm.processing ? "Suppression..." : "Supprimer mon compte"}
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </ShopLayout>
    </>
  );
}