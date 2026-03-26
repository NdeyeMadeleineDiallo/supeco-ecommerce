import React, { useMemo } from "react";
import { useForm, usePage } from "@inertiajs/react";
import ShopLayout from "@/Layouts/ShopLayout";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v9A1.5 1.5 0 0 1 18.5 18h-13A1.5 1.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m5 8 7 5 7-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M7.8 4h2.1c.4 0 .8.3.9.7l.6 2.7c.1.4-.1.9-.5 1.1l-1.3.8a13 13 0 0 0 5 5l.8-1.3c.2-.4.7-.6 1.1-.5l2.7.6c.4.1.7.5.7.9v2.1c0 .5-.4 1-.9 1A15.1 15.1 0 0 1 6.8 4.9c0-.5.4-.9 1-.9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M12 21s6-5.7 6-11a6 6 0 1 0-12 0c0 5.3 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 7.8v4.6l3 1.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Contact() {
  const { props } = usePage();

  const errorsObj = props?.errors ?? {};
  const errorsList = useMemo(() => Object.values(errorsObj).filter(Boolean), [errorsObj]);

  const contactForm = useForm({
    type: "contact",
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const devisForm = useForm({
    type: "devis",
    name: "",
    phone: "",
    subject: "Demande devis / rappel",
    message: "",
  });

  const submitContact = (e) => {
    e.preventDefault();
    contactForm.post("/contact/envoyer", { preserveScroll: true });
  };

  const submitDevis = (e) => {
    e.preventDefault();
    devisForm.post("/contact/envoyer", { preserveScroll: true });
  };

  return (
    <ShopLayout title="Contact – SUPECO">
      <div style={{ background: "#f7f7f5" }}>
        <style>{`
          .contact-shell {
            max-width: 1220px;
            margin: 0 auto;
            padding: 26px 18px 46px;
          }

          .contact-hero {
            position: relative;
            overflow: hidden;
            border-radius: 30px;
            background: linear-gradient(135deg, #080a0a 0%, #181818 55%, #2a2a2a 100%);
            color: #fff;
            padding: 34px 28px;
            box-shadow: 0 22px 42px rgba(0,0,0,.14);
            margin-bottom: 28px;
          }

          .contact-hero::before {
            content: "";
            position: absolute;
            width: 260px;
            height: 260px;
            border-radius: 50%;
            background: rgba(254, 201, 3, .16);
            top: -90px;
            right: -70px;
          }

          .contact-hero::after {
            content: "";
            position: absolute;
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background: rgba(254, 201, 3, .10);
            bottom: -45px;
            left: -25px;
          }

          .contact-hero-inner {
            position: relative;
            z-index: 1;
            max-width: 820px;
          }

          .contact-kicker {
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
            margin-bottom: 14px;
          }

          .contact-title {
            margin: 0 0 12px;
            font-size: clamp(24px, 3vw, 36px);
            line-height: 1.12;
            font-weight: 700;
            letter-spacing: -.02em;
          }

          .contact-text {
            margin: 0;
            max-width: 720px;
            color: rgba(255,255,255,.88);
            line-height: 1.75;
            font-size: 15px;
          }

          .alert-box {
            background: #fee2e2;
            padding: 14px 16px;
            border-radius: 16px;
            margin-bottom: 18px;
            border: 1px solid #fecaca;
            color: #7f1d1d;
            box-shadow: 0 10px 18px rgba(0,0,0,.03);
          }

          .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            align-items: start;
          }

          .contact-card {
            background: #fff;
            border: 1px solid rgba(8,10,10,.06);
            border-radius: 24px;
            padding: 22px 20px;
            box-shadow:
              0 14px 30px rgba(0,0,0,.05),
              0 3px 10px rgba(0,0,0,.03);
          }

          .contact-card-head {
            margin-bottom: 18px;
          }

          .contact-card-kicker {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #fff7cf;
            color: #080a0a;
            border: 1px solid rgba(254, 201, 3, .38);
            border-radius: 999px;
            padding: 7px 12px;
            font-size: 12px;
            font-weight: 800;
            margin-bottom: 12px;
          }

          .contact-card-title {
            margin: 0 0 8px;
            color: #080a0a;
            font-size: 22px;
            line-height: 1.2;
            font-weight: 700;
          }

          .contact-card-text {
            margin: 0;
            color: #5b6470;
            line-height: 1.7;
            font-size: 14px;
          }

          .form-grid {
            display: grid;
            gap: 14px;
          }

          .field-wrap {
            display: grid;
            gap: 7px;
          }

          .field-label {
            font-size: 14px;
            font-weight: 700;
            color: #080a0a;
          }

          .contact-input,
          .contact-textarea {
            width: 100%;
            border: 1px solid #e5e7eb;
            border-radius: 14px;
            background: #fff;
            color: #080a0a;
            outline: none;
            transition: all .2s ease;
            font-size: 14px;
          }

          .contact-input {
            padding: 12px 14px;
          }

          .contact-textarea {
            padding: 12px 14px;
            resize: vertical;
            min-height: 140px;
          }

          .contact-input:focus,
          .contact-textarea:focus {
            border-color: rgba(254, 201, 3, .75);
            box-shadow: 0 0 0 4px rgba(254, 201, 3, .16);
          }

          .btn-contact-dark,
          .btn-contact-yellow {
            border: none;
            border-radius: 14px;
            padding: 13px 16px;
            font-size: 14px;
            font-weight: 800;
            cursor: pointer;
            transition: transform .2s ease, opacity .2s ease, box-shadow .2s ease;
          }

          .btn-contact-dark {
            background: #080a0a;
            color: #fec903;
            box-shadow: 0 10px 18px rgba(0,0,0,.10);
          }

          .btn-contact-yellow {
            background: #fec903;
            color: #080a0a;
            box-shadow: 0 10px 18px rgba(254, 201, 3, .18);
          }

          .btn-contact-dark:hover,
          .btn-contact-yellow:hover {
            transform: translateY(-1px);
          }

          .btn-contact-dark:disabled,
          .btn-contact-yellow:disabled {
            opacity: .7;
            cursor: not-allowed;
          }

          .contact-info-box {
            margin-top: 18px;
            background: linear-gradient(135deg, #fffdf2 0%, #f8fafc 100%);
            border-radius: 18px;
            border: 1px dashed #e5e7eb;
            padding: 18px 16px;
          }

          .contact-info-title {
            margin: 0 0 14px;
            color: #080a0a;
            font-size: 18px;
            font-weight: 700;
          }

          .contact-info-list {
            display: grid;
            gap: 12px;
          }

          .contact-info-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            color: #4b5563;
            font-size: 14px;
            line-height: 1.65;
          }

          .contact-info-icon {
            width: 36px;
            height: 36px;
            min-width: 36px;
            border-radius: 12px;
            background: linear-gradient(135deg, #fff5bf 0%, #fec903 100%);
            color: #080a0a;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 18px rgba(254, 201, 3, .20);
            margin-top: 1px;
          }

          .contact-info-label {
            color: #080a0a;
            font-weight: 700;
            display: block;
            margin-bottom: 2px;
          }

          @media (max-width: 900px) {
            .contact-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 700px) {
            .contact-shell {
              padding: 20px 14px 34px;
            }

            .contact-hero {
              padding: 26px 18px;
              border-radius: 22px;
            }

            .contact-card {
              padding: 20px 16px;
              border-radius: 20px;
            }
          }
        `}</style>

        <div className="contact-shell">
          <section className="contact-hero">
            <div className="contact-hero-inner">
              <div className="contact-kicker">Contactez SUPECO</div>
              <h1 className="contact-title">
                Une question, un besoin ou une demande particulière ?
              </h1>
              <p className="contact-text">
                Écrivez-nous directement via l’un des formulaires ci-dessous.
                Que ce soit pour un contact général ou une demande de devis /
                rappel, nous vous répondons avec attention dans les meilleurs
                délais.
              </p>
            </div>
          </section>

          {errorsList.length > 0 ? (
            <div className="alert-box">
              <strong>Veuillez corriger :</strong>
              <ul style={{ margin: "8px 0 0 16px" }}>
                {errorsList.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-card-head">
                <div className="contact-card-kicker">Formulaire principal</div>
                <h2 className="contact-card-title">Contact général</h2>
                <p className="contact-card-text">
                  Utilisez ce formulaire pour toute question, demande
                  d’information ou prise de contact avec SUPECO.
                </p>
              </div>

              <form onSubmit={submitContact}>
                <div className="form-grid">
                  <div className="field-wrap">
                    <label className="field-label">Nom *</label>
                    <input
                      required
                      value={contactForm.data.name}
                      onChange={(e) => contactForm.setData("name", e.target.value)}
                      className="contact-input"
                    />
                  </div>

                  <div className="field-wrap">
                    <label className="field-label">Email</label>
                    <input
                      type="email"
                      value={contactForm.data.email}
                      onChange={(e) => contactForm.setData("email", e.target.value)}
                      className="contact-input"
                    />
                  </div>

                  <div className="field-wrap">
                    <label className="field-label">Objet</label>
                    <input
                      value={contactForm.data.subject}
                      onChange={(e) => contactForm.setData("subject", e.target.value)}
                      className="contact-input"
                    />
                  </div>

                  <div className="field-wrap">
                    <label className="field-label">Message *</label>
                    <textarea
                      rows={6}
                      required
                      value={contactForm.data.message}
                      onChange={(e) => contactForm.setData("message", e.target.value)}
                      className="contact-textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactForm.processing}
                    className="btn-contact-dark"
                  >
                    {contactForm.processing ? "Envoi..." : "Envoyer"}
                  </button>
                </div>
              </form>
            </div>

            <div className="contact-card">
              <div className="contact-card-head">
                <div className="contact-card-kicker">Assistance rapide</div>
                <h2 className="contact-card-title">Demande de devis / rappel</h2>
                <p className="contact-card-text">
                  Laissez votre numéro et quelques précisions : notre équipe peut
                  vous recontacter pour mieux vous orienter.
                </p>
              </div>

              <form onSubmit={submitDevis}>
                <div className="form-grid">
                  <div className="field-wrap">
                    <label className="field-label">Nom *</label>
                    <input
                      required
                      value={devisForm.data.name}
                      onChange={(e) => devisForm.setData("name", e.target.value)}
                      className="contact-input"
                    />
                  </div>

                  <div className="field-wrap">
                    <label className="field-label">Téléphone *</label>
                    <input
                      required
                      value={devisForm.data.phone}
                      onChange={(e) => devisForm.setData("phone", e.target.value)}
                      className="contact-input"
                    />
                  </div>

                  <div className="field-wrap">
                    <label className="field-label">Message *</label>
                    <textarea
                      rows={6}
                      required
                      placeholder="Ex : Je veux un devis pour … / Merci de me rappeler …"
                      value={devisForm.data.message}
                      onChange={(e) => devisForm.setData("message", e.target.value)}
                      className="contact-textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={devisForm.processing}
                    className="btn-contact-yellow"
                  >
                    {devisForm.processing ? "Envoi..." : "Envoyer la demande"}
                  </button>
                </div>
              </form>

              <div className="contact-info-box">
                <h3 className="contact-info-title">Infos SUPECO</h3>

                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <span className="contact-info-icon">
                      <PinIcon />
                    </span>
                    <div>
                      <span className="contact-info-label">Adresse</span>
                      <span>Dakar, Sénégal</span>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <span className="contact-info-icon">
                      <PhoneIcon />
                    </span>
                    <div>
                      <span className="contact-info-label">Téléphone</span>
                      <span>+221 33 946 19 02</span>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <span className="contact-info-icon">
                      <MailIcon />
                    </span>
                    <div>
                      <span className="contact-info-label">Email</span>
                      <span>contact@supeco.sn</span>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <span className="contact-info-icon">
                      <ClockIcon />
                    </span>
                    <div>
                      <span className="contact-info-label">Horaires</span>
                      <span>Lun–Sam, 08h–20h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
}