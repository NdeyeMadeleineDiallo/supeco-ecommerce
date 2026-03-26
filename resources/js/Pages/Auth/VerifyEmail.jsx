import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function VerifyEmail({ status }) {
  const { post, processing } = useForm({});

  const submit = (e) => {
    e.preventDefault();
    post("/email/verification-notification");
  };

  return (
    <>
      <Head title="Vérification de l’email" />

      <AuthLayout
        title="Vérifiez votre adresse email"
        subtitle="Avant de continuer, merci de confirmer votre adresse email via le lien que nous vous avons envoyé."
      >
        <style>{`
          .verify-wrap {
            display: grid;
            gap: 16px;
          }

          .verify-text {
            color: #4b5563;
            font-size: 14px;
            line-height: 1.8;
            margin: 0;
          }

          .verify-alert {
            padding: 12px 14px;
            border-radius: 14px;
            font-size: 14px;
            line-height: 1.6;
            background: #dcfce7;
            border: 1px solid #bbf7d0;
            color: #166534;
          }

          .verify-btn {
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

          .verify-btn:disabled {
            opacity: .7;
            cursor: not-allowed;
          }

          .verify-link {
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
            width: 100%;
          }
        `}</style>

        <div className="verify-wrap">
          <p className="verify-text">
            Merci pour votre inscription. Un email de vérification vous a été
            envoyé. Cliquez sur le lien reçu pour activer votre compte.
          </p>

          {status === "verification-link-sent" && (
            <div className="verify-alert">
              Un nouveau lien de vérification vient d’être envoyé à votre adresse email.
            </div>
          )}

          <form onSubmit={submit}>
            <button type="submit" disabled={processing} className="verify-btn">
              {processing ? "Envoi..." : "Renvoyer l’email de vérification"}
            </button>
          </form>

          <Link href="/" className="verify-link">
            Retour à l’accueil
          </Link>
        </div>
      </AuthLayout>
    </>
  );
}