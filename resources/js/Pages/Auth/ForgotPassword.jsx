import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/forgot-password");
  };

  return (
    <>
      <Head title="Mot de passe oublié" />

      <AuthLayout
        title="Mot de passe oublié"
        subtitle="Saisissez votre adresse email. Nous vous enverrons un lien pour réinitialiser votre mot de passe."
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

        {status && (
          <div className="auth-alert auth-alert-success">
            {status}
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

          <button type="submit" disabled={processing} className="auth-btn">
            {processing ? "Envoi..." : "Envoyer le lien de réinitialisation"}
          </button>

          <Link href="/login" className="auth-btn-secondary">
            Retour à la connexion
          </Link>
        </form>
      </AuthLayout>
    </>
  );
}