import React, { useMemo, useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import ShopLayout from "@/Layouts/ShopLayout";

export default function Checkout({ cart, total, ref, waveNumber, omNumber }) {
  const [method, setMethod] = useState("wave");

  const { data, setData, post, processing, errors } = useForm({
    shipping_name: "",
    shipping_phone: "",
    shipping_city: "",
    shipping_address: "",
    shipping_note: "",
    payment_method: "wave",
    payment_ref: "",
    wave_tx: "",
    om_tx: "",
  });

  const payTo = useMemo(
    () => (method === "om" ? omNumber : waveNumber),
    [method, waveNumber, omNumber]
  );

  const onPaid = () => {
    const tx = method === "om" ? data.om_tx : data.wave_tx;
    if (!tx || !tx.trim()) {
      alert("Merci de renseigner le numéro de transaction.");
      return;
    }

    setData("payment_method", method);
    setData("payment_ref", `${ref} | TX:${tx.trim()}`);

    post("/checkout");
  };

  return (
    <ShopLayout>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: 16,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 12,
            color: "#080a0a",
          }}
        >
          Paiement & Livraison
        </h1>

        {Object.keys(errors).length > 0 && (
          <div
            style={{
              background: "#fee2e2",
              border: "1px solid #fecaca",
              padding: 12,
              borderRadius: 12,
              marginBottom: 14,
            }}
          >
            <strong>Corrige ces champs :</strong>
            <ul style={{ margin: "8px 0 0 18px" }}>
              {Object.values(errors).map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="checkout-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: 16 }}>
          {/* COLONNE GAUCHE */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Badges confiance */}
            <div className="trust-badges" style={{ display: "flex", gap: 10, alignItems: "stretch" }}>
              <Badge
                icon="🔒"
                title="Paiement sécurisé"
                sub="Infos protégées"
                bg="#f8fafc"
                bd="#e2e8f0"
                col="#0f172a"
              />
              <Badge
                icon="✅"
                title="Confirmation rapide"
                sub="Validation rapide"
                bg="#f8fafc"
                bd="#e2e8f0"
                col="#0f172a"
              />
              <Badge
                icon="📦"
                title="Livraison locale"
                sub="Dakar & Mbour"
                bg="#f8fafc"
                bd="#e2e8f0"
                col="#0f172a"
              />
            </div>

            {/* Récapitulatif */}
            <Card title="Récapitulatif">
              <div style={{ fontSize: 14 }}>
                {(cart || []).map((it, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 10,
                      marginBottom: 10,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: "#080a0a" }}>{it.name}</div>
                      <div style={{ color: "#6b7280", fontSize: 12 }}>Qté: {it.quantity}</div>
                    </div>
                    <div style={{ fontWeight: 800, color: "#080a0a" }}>
                      {new Intl.NumberFormat("fr-FR").format(it.price * it.quantity)} F
                    </div>
                  </div>
                ))}
              </div>

              <hr style={{ margin: "14px 0", border: "none", borderTop: "1px solid #e5e7eb" }} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 800,
                  fontSize: 16,
                  color: "#080a0a",
                }}
              >
                <span>Total</span>
                <span>{new Intl.NumberFormat("fr-FR").format(total)} F</span>
              </div>

              <div style={{ marginTop: 12 }}>
                <Link href="/panier" style={{ textDecoration: "underline", color: "#080a0a" }}>
                  ← Retour au panier
                </Link>
              </div>
            </Card>

            {/* Livraison */}
            <Card title="Informations de livraison">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field
                  label="Nom complet *"
                  value={data.shipping_name}
                  onChange={(v) => setData("shipping_name", v)}
                />
                <Field
                  label="Téléphone joignable *"
                  value={data.shipping_phone}
                  onChange={(v) => setData("shipping_phone", v)}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                <Field
                  label="Ville *"
                  value={data.shipping_city}
                  onChange={(v) => setData("shipping_city", v)}
                />
                <Field
                  label="Adresse (quartier + repère) *"
                  value={data.shipping_address}
                  onChange={(v) => setData("shipping_address", v)}
                />
              </div>

              <div style={{ marginTop: 12 }}>
                <label style={{ fontWeight: 700, color: "#080a0a", marginBottom: 6, display: "block" }}>
                  Note (optionnel)
                </label>
                <textarea
                  value={data.shipping_note}
                  onChange={(e) => setData("shipping_note", e.target.value)}
                  style={{
                    width: "100%",
                    padding: 12,
                    border: "1px solid #e5e7eb",
                    borderRadius: 12,
                    minHeight: 90,
                    outline: "none",
                  }}
                />
              </div>
            </Card>
          </div>

          {/* COLONNE DROITE */}
          <div
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              padding: 16,
              height: "fit-content",
              boxShadow: "0 10px 24px rgba(0,0,0,.04)",
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: "#080a0a" }}>
              Mode de paiement
            </h2>

            {/* Wave */}
            <PayCard
              active={method === "wave"}
              onClick={() => {
                setMethod("wave");
                setData("payment_method", "wave");
              }}
              logo="/images/payments/wave-logo.png"
              title="Wave"
              tag="Recommandé"
            >
              <PayInfo payTo={waveNumber} total={total} ref={ref} />
              <TxField
                label="Numéro transaction (obligatoire)"
                placeholder="Ex: WAVE-XXXX / ID transaction"
                value={data.wave_tx || ""}
                onChange={(v) => setData("wave_tx", v)}
              />
              <PaidButton onClick={onPaid} disabled={processing} />
            </PayCard>

            {/* Orange Money */}
            <PayCard
              active={method === "om"}
              onClick={() => {
                setMethod("om");
                setData("payment_method", "om");
              }}
              logo="/images/payments/orange-money.png"
              title="Orange Money"
            >
              <PayInfo payTo={omNumber} total={total} ref={ref} />
              <TxField
                label="Numéro transaction (obligatoire)"
                placeholder="Ex: OM-XXXX / ID transaction"
                value={data.om_tx || ""}
                onChange={(v) => setData("om_tx", v)}
              />
              <PaidButton onClick={onPaid} disabled={processing} />
            </PayCard>

            {/* PayPal indisponible */}
            <div
              style={{
                marginTop: 12,
                border: "1px dashed #d1d5db",
                borderRadius: 14,
                padding: 12,
                opacity: 0.78,
                background: "#fafafa",
              }}
            >
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <img
                  src="/images/payments/paypal.png"
                  alt="PayPal"
                  style={{ width: 44, height: 44, objectFit: "contain" }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#080a0a" }}>PayPal</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    Paiement PayPal bientôt disponible
                  </div>
                </div>
                <button
                  disabled
                  style={{
                    background: "#e5e7eb",
                    color: "#6b7280",
                    padding: "8px 10px",
                    borderRadius: 12,
                    border: "none",
                    fontWeight: 700,
                    cursor: "not-allowed",
                  }}
                >
                  Indisponible
                </button>
              </div>
            </div>

            <div style={{ marginTop: 12, fontSize: 12, color: "#6b7280" }}>
              Paiement sélectionné :{" "}
              <strong>{method === "om" ? "Orange Money" : "Wave"}</strong> — Payer au :{" "}
              <strong>{payTo}</strong>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 980px) {
            .checkout-grid {
              grid-template-columns: 1fr !important;
            }
            .trust-badges {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    </ShopLayout>
  );
}

function Card({ title, children }) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 16,
        boxShadow: "0 10px 24px rgba(0,0,0,.04)",
      }}
    >
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: "#080a0a" }}>{title}</h2>
      {children}
    </div>
  );
}

function Badge({ icon, title, sub, bg, bd, col }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        background: bg,
        border: `1px solid ${bd}`,
        padding: "12px 12px",
        borderRadius: 14,
        display: "flex",
        gap: 10,
        alignItems: "center",
        boxShadow: "0 10px 18px rgba(0,0,0,.04)",
        transition: "transform .2s ease, box-shadow .2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 14px 24px rgba(0,0,0,.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 10px 18px rgba(0,0,0,.04)";
      }}
    >
      <span
        style={{
          fontSize: 18,
          width: 38,
          height: 38,
          minWidth: 38,
          borderRadius: 12,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff7cf",
          boxShadow: "inset 0 0 0 1px rgba(254, 201, 3, .25)",
        }}
      >
        {icon}
      </span>

      <div style={{ lineHeight: 1.2 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#080a0a" }}>{title}</div>
        <div style={{ fontSize: 11, color: col, marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label style={{ fontWeight: 700, color: "#080a0a", marginBottom: 6, display: "block" }}>
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: 11,
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          outline: "none",
        }}
      />
    </div>
  );
}

function PayCard({ active, onClick, logo, title, tag, children }) {
  return (
    <div
      onClick={onClick}
      style={{
        border: active ? "2px solid #080a0a" : "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 12,
        cursor: "pointer",
        marginBottom: 12,
        boxShadow: active ? "0 12px 26px rgba(0,0,0,.08)" : "0 6px 16px rgba(0,0,0,.03)",
        transition: "all .2s ease",
        background: "#fff",
      }}
    >
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <img src={logo} alt={title} style={{ width: 46, height: 46, objectFit: "contain" }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#080a0a" }}>{title}</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>Paiement mobile (manuel)</div>
        </div>
        {tag ? (
          <span
            style={{
              fontWeight: 700,
              background: "#fecc33",
              color: "#080a0a",
              padding: "6px 10px",
              borderRadius: 999,
              fontSize: 12,
            }}
          >
            {tag}
          </span>
        ) : null}
      </div>

      <div
        style={{
          marginTop: 12,
          background: "#f8fafc",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 10,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function PayInfo({ payTo, total, ref }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 13 }}>
        <div>
          <strong>Payer au :</strong> {payTo}
        </div>
        <div>
          <strong>Montant :</strong> {new Intl.NumberFormat("fr-FR").format(total)} F
        </div>
      </div>
      <div style={{ marginTop: 6, fontSize: 13 }}>
        <strong>Référence :</strong> {ref}
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>
        Après paiement, clique “J’ai payé” pour enregistrer ta commande.
      </div>
    </>
  );
}

function TxField({ label, placeholder, value, onChange }) {
  return (
    <div style={{ marginTop: 10 }}>
      <label style={{ fontWeight: 700, fontSize: 13, color: "#080a0a", marginBottom: 6, display: "block" }}>
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: 11,
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          outline: "none",
        }}
      />
    </div>
  );
}

function PaidButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        marginTop: 10,
        background: "#080a0a",
        color: "#fecc33",
        padding: "11px 12px",
        borderRadius: 12,
        border: "none",
        fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.7 : 1,
        boxShadow: "0 10px 18px rgba(0,0,0,.08)",
      }}
    >
      J’ai payé
    </button>
  );
}