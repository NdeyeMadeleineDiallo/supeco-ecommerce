import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token || "",
    email: email || "",
    password: "",
    password_confirmation: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post("/reset-password", {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <>
      <Head title="Réinitialiser le mot de passe" />

      <AuthLayout
        title="Nouveau mot de passe"
        subtitle="Définissez un nouveau mot de passe pour sécuriser votre compte."
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
        `}</style>

        <form onSubmit={submit} className="auth-form">
          <input type="hidden" value={data.token} readOnly />

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
            <label className="auth-label">Nouveau mot de passe</label>
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
            {processing ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
          </button>
        </form>
      </AuthLayout>
    </>
  );
}