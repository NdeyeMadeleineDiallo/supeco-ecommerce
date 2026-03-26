import React from "react";
import { Link } from "@inertiajs/react";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f5" }}>
      <style>{`
        .auth-shell {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
        }

        .auth-brand {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #080a0a 0%, #1a1a1a 60%, #2a2a2a 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .auth-brand::before {
          content: "";
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: rgba(254, 201, 3, .14);
          top: -110px;
          right: -90px;
        }

        .auth-brand::after {
          content: "";
          position: absolute;
          width: 170px;
          height: 170px;
          border-radius: 50%;
          background: rgba(254, 201, 3, .10);
          bottom: -50px;
          left: -40px;
        }

        .auth-brand-inner {
          position: relative;
          z-index: 1;
          max-width: 500px;
        }

        .auth-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(254, 201, 3, .14);
          color: #fec903;
          border: 1px solid rgba(254, 201, 3, .22);
          border-radius: 999px;
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .auth-brand-title {
          margin: 0 0 14px;
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.05;
          font-weight: 800;
          letter-spacing: -.02em;
        }

        .auth-brand-text {
          margin: 0;
          color: rgba(255,255,255,.86);
          line-height: 1.8;
          font-size: 15px;
        }

        .auth-panel {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px 18px;
        }

        .auth-card {
          width: 100%;
          max-width: 460px;
          background: #fff;
          border: 1px solid rgba(8,10,10,.06);
          border-radius: 26px;
          padding: 28px 24px;
          box-shadow:
            0 16px 34px rgba(0,0,0,.06),
            0 4px 10px rgba(0,0,0,.03);
        }

        .auth-logo {
          display: inline-flex;
          align-items: center;
          margin-bottom: 16px;
        }

        .auth-logo img {
          height: 44px;
          object-fit: contain;
        }

        .auth-title {
          margin: 0 0 8px;
          color: #080a0a;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -.02em;
        }

        .auth-subtitle {
          margin: 0 0 18px;
          color: #6b7280;
          font-size: 14px;
          line-height: 1.7;
        }

        .auth-footer {
          margin-top: 18px;
          text-align: center;
          font-size: 14px;
          color: #6b7280;
        }

        .auth-footer a {
          color: #080a0a;
          font-weight: 700;
          text-decoration: none;
        }

        @media (max-width: 900px) {
          .auth-shell {
            grid-template-columns: 1fr;
          }

          .auth-brand {
            min-height: 260px;
            padding: 28px 20px;
          }

          .auth-panel {
            padding: 20px 14px 30px;
            margin-top: -30px;
          }

          .auth-card {
            border-radius: 22px;
          }
        }
      `}</style>

      <div className="auth-shell">
        <div className="auth-brand">
          <div className="auth-brand-inner">
            <div className="auth-kicker">Bienvenue sur SUPECO</div>
            <h1 className="auth-brand-title">
              Connectez-vous à une expérience d’achat simple et moderne.
            </h1>
            <p className="auth-brand-text">
              Accédez à votre espace personnel, suivez vos commandes et profitez
              d’une boutique en ligne claire, fluide et pensée pour votre confort.
            </p>
          </div>
        </div>

        <div className="auth-panel">
          <div className="auth-card">
            <Link href="/" className="auth-logo">
              <img src="/images/supeco-logo.png" alt="SUPECO" />
            </Link>

            <h2 className="auth-title">{title}</h2>
            {subtitle ? <p className="auth-subtitle">{subtitle}</p> : null}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}