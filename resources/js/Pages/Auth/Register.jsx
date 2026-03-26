import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/register", {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <>
      <Head title="Créer un compte" />

      <AuthLayout
        title="Créer un compte"
        subtitle="Rejoignez SUPECO pour commander plus facilement et suivre vos achats."
      >
        <style>{`
          .auth-form {
            display: grid;
            gap: 14px;
          }

          .auth-field {
            display: grid;
            gap: 7px;
          }

          .auth-label {
            font-size: 14px;
            font-weight: 700;
            color: #080a0a;
          }

          .auth-input {
            width: 100%;
            padding: 12px 14px;
            border: 1px solid #e5e7eb;
            border-radius: 14px;
            outline: none;
            transition: all .2s ease;
            font-size: 14px;
          }

          .auth-input:focus {
            border-color: rgba(254, 201, 3, .75);
            box-shadow: 0 0 0 4px rgba(254, 201, 3, .16);
          }

          .auth-error {
            color: #b91c1c;
            font-size: 13px;
          }

          .auth-btn {
            width: 100%;
            background: #080a0a;
            color: #fec903;
            border: none;
            border-radius: 14px;
            padding: 13px 16px;
            font-size: 14px;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 10px 18px rgba(0,0,0,.08);
          }

          .auth-btn:disabled {
            opacity: .7;
            cursor: not-allowed;
          }

          .auth-btn-secondary {
            width: 100%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            background: #fff7cf;
            color: #080a0a;
            border: 1px solid rgba(254, 201, 3, .38);
            border-radius: 14px;
            padding: 12px 16px;
            font-size: 14px;
            font-weight: 800;
          }
        `}</style>

        <form onSubmit={submit} className="auth-form">
          <div className="auth-field">
            <label className="auth-label">Nom complet</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className="auth-input"
              required
              autoFocus
            />
            {errors.name && <div className="auth-error">{errors.name}</div>}
          </div>

          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              className="auth-input"
              required
            />
            {errors.email && <div className="auth-error">{errors.email}</div>}
          </div>

          <div className="auth-field">
            <label className="auth-label">Mot de passe</label>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              className="auth-input"
              required
            />
            {errors.password && <div className="auth-error">{errors.password}</div>}
          </div>

          <div className="auth-field">
            <label className="auth-label">Confirmer le mot de passe</label>
            <input
              type="password"
              value={data.password_confirmation}
              onChange={(e) => setData("password_confirmation", e.target.value)}
              className="auth-input"
              required
            />
            {errors.password_confirmation && (
              <div className="auth-error">{errors.password_confirmation}</div>
            )}
          </div>

          <button type="submit" disabled={processing} className="auth-btn">
            {processing ? "Création..." : "Créer mon compte"}
          </button>

          <Link href="/login" className="auth-btn-secondary">
            J’ai déjà un compte
          </Link>
        </form>

        <div className="auth-footer">
          Déjà inscrit ? <Link href="/login">Connectez-vous</Link>
        </div>
      </AuthLayout>
    </>
  );
}