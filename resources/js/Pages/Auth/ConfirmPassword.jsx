import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post("/confirm-password", {
      onFinish: () => reset("password"),
    });
  };

  return (
    <>
      <Head title="Confirmer le mot de passe" />

      <AuthLayout
        title="Confirmer votre mot de passe"
        subtitle="Pour des raisons de sécurité, veuillez confirmer votre mot de passe avant de continuer."
      >
        <style>{`
          .auth-form {
            display: grid;
            gap: 14px;
          }

          .auth-text {
            color: #4b5563;
            font-size: 14px;
            line-height: 1.8;
            margin: 0;
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
          <p className="auth-text">
            Cette étape supplémentaire permet de confirmer qu’il s’agit bien de vous
            avant d’accéder à une action sensible.
          </p>

          <div className="auth-field">
            <label className="auth-label">Mot de passe</label>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              className="auth-input"
              required
              autoFocus
            />
            {errors.password && <div className="auth-error">{errors.password}</div>}
          </div>

          <button type="submit" disabled={processing} className="auth-btn">
            {processing ? "Confirmation..." : "Confirmer"}
          </button>
        </form>
      </AuthLayout>
    </>
  );
}