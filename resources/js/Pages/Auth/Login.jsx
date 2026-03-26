import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function Login({ status, canResetPassword = true }) {
  const { flash } = usePage().props;

  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();
    post("/login");
  };

  return (
    <>
      <Head title="Connexion" />

      <AuthLayout
        title="Connexion"
        subtitle="Connectez-vous pour accéder à votre compte et poursuivre vos achats."
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

          .auth-alert {
            margin-bottom: 14px;
            padding: 12px 14px;
            border-radius: 14px;
            font-size: 14px;
            line-height: 1.6;
          }

          .auth-alert-success {
            background: #dcfce7;
            border: 1px solid #bbf7d0;
            color: #166534;
          }

          .auth-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            flex-wrap: wrap;
          }

          .auth-check {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: #374151;
          }

          .auth-link {
            color: #080a0a;
            text-decoration: none;
            font-size: 14px;
            font-weight: 700;
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

        {(status || flash?.success) && (
          <div className="auth-alert auth-alert-success">
            {status || flash?.success}
          </div>
        )}

        <form onSubmit={submit} className="auth-form">
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              className="auth-input"
              required
              autoFocus
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

          <div className="auth-row">
            <label className="auth-check">
              <input
                type="checkbox"
                checked={data.remember}
                onChange={(e) => setData("remember", e.target.checked)}
              />
              <span>Se souvenir de moi</span>
            </label>

            {canResetPassword && (
              <Link href="/forgot-password" className="auth-link">
                Mot de passe oublié ?
              </Link>
            )}
          </div>

          <button type="submit" disabled={processing} className="auth-btn">
            {processing ? "Connexion..." : "Se connecter"}
          </button>

          <Link href="/register" className="auth-btn-secondary">
            Créer un compte
          </Link>
        </form>

        <div className="auth-footer">
          Pas encore de compte ? <Link href="/register">Inscrivez-vous</Link>
        </div>
      </AuthLayout>
    </>
  );
}