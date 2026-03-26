import React from "react";
import ShopLayout from "@/Layouts/ShopLayout";

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

function StoreIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M4 9.5 5.5 5h13L20 9.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M5 9.5h14v8.8a1.7 1.7 0 0 1-1.7 1.7H6.7A1.7 1.7 0 0 1 5 18.3V9.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9 20v-4h6v4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default function Locations() {
  const locations = [
    {
      title: "SUPECO – GOLF",
      img: "/images/locations/local-1.jpg",
      alt: "SUPECO - Local 1",
      address: "Rue GS389",
      country: "Dakar - Sénégal",
      hours:
        "8:00 – 21:00 : lundi au jeudi\n8:00 – 22:00 : vendredi au dimanche",
    },
    {
      title: "SUPECO – EL MANSOUR",
      img: "/images/locations/local-2.jpg",
      alt: "SUPECO - Local 2",
      address: "El Mansour",
      country: "Dakar - Sénégal",
      hours:
        "8:00 – 21:00 : lundi au jeudi\n8:00 – 22:00 : vendredi au dimanche",
    },
    {
      title: "SUPECO – GUEDIAWAYE HAMO 4",
      img: "/images/locations/local-3.png",
      alt: "SUPECO - Local 3",
      address: "À côté du foyer des jeunes de Hamo 4",
      country: "Dakar - Sénégal",
      hours:
        "8:00 – 21:00 : lundi au jeudi\n8:00 – 22:00 : vendredi au dimanche",
    },
    {
      title: "SUPECO – MBOUR",
      img: "/images/locations/local-4.jpeg",
      alt: "SUPECO - Local 4",
      address: "Route de Joal, près de la Mairie – Mbour Escale",
      country: "Mbour - Sénégal",
      hours:
        "8:00 – 21:00 : lundi au jeudi\n8:00 – 22:00 : vendredi au dimanche",
    },
    {
      title: "SUPECO – PIKINE",
      img: "/images/locations/local-5.jpg",
      alt: "SUPECO - Local 5",
      address: "Bountou Pikine, après la station Ola Energy, Sénégal",
      country: "Dakar - Sénégal",
      hours:
        "8:00 – 21:00 : lundi au jeudi\n8:00 – 22:00 : vendredi au dimanche",
    },
  ];

  return (
    <ShopLayout title="Nos implantations – SUPECO">
      <div style={{ background: "#f7f7f5" }}>
        <style>{`
          .locations-shell {
            max-width: 1220px;
            margin: 0 auto;
            padding: 26px 18px 46px;
          }

          .locations-hero {
            position: relative;
            overflow: hidden;
            border-radius: 30px;
            background: linear-gradient(135deg, #080a0a 0%, #181818 55%, #2a2a2a 100%);
            color: #fff;
            padding: 34px 28px;
            box-shadow: 0 22px 42px rgba(0,0,0,.14);
            margin-bottom: 34px;
          }

          .locations-hero::before {
            content: "";
            position: absolute;
            width: 260px;
            height: 260px;
            border-radius: 50%;
            background: rgba(254, 201, 3, .16);
            top: -90px;
            right: -70px;
          }

          .locations-hero::after {
            content: "";
            position: absolute;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: rgba(254, 201, 3, .10);
            bottom: -45px;
            left: -30px;
          }

          .locations-hero-inner {
            position: relative;
            z-index: 1;
            max-width: 820px;
          }

          .locations-kicker {
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

          .locations-title {
            margin: 0 0 12px;
            font-size: clamp(22px, 3vw, 34px);
            line-height: 1.12;
            font-weight: 700;
            letter-spacing: -.02em;
          }

          .locations-text {
            margin: 0;
            max-width: 720px;
            color: rgba(255,255,255,.87);
            line-height: 1.75;
            font-size: 15px;
          }

          .locations-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-top: 24px;
            max-width: 760px;
          }

          .locations-stat {
            background: rgba(255,255,255,.06);
            border: 1px solid rgba(255,255,255,.08);
            border-radius: 18px;
            padding: 16px 16px;
            backdrop-filter: blur(4px);
          }

          .locations-stat-value {
            color: #fec903;
            font-size: 24px;
            font-weight: 800;
            line-height: 1;
            margin-bottom: 6px;
          }

          .locations-stat-label {
            color: rgba(255,255,255,.86);
            font-size: 13px;
            line-height: 1.5;
          }

          .section-head {
            text-align: center;
            margin-bottom: 26px;
          }

          .section-title {
            margin: 0;
            color: #080a0a;
            font-size: clamp(26px, 3vw, 36px);
            font-weight: 700;
            letter-spacing: -.02em;
          }

          .section-subtitle {
            margin: 10px auto 0;
            max-width: 760px;
            color: #5d6470;
            line-height: 1.7;
            font-size: 15px;
          }

          .loc-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }

          .loc-card {
            background: #fff;
            border: 1px solid rgba(8,10,10,.06);
            border-radius: 24px;
            overflow: hidden;
            box-shadow:
              0 14px 30px rgba(0,0,0,.06),
              0 3px 10px rgba(0,0,0,.03);
            transition: transform .25s ease, box-shadow .25s ease;
          }

          .loc-card:hover {
            transform: translateY(-6px);
            box-shadow:
              0 24px 42px rgba(0,0,0,.10),
              0 8px 16px rgba(0,0,0,.04);
          }

          .loc-media {
            position: relative;
            height: 240px;
            overflow: hidden;
            background: #f3f4f6;
          }

          .loc-media img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform .35s ease;
          }

          .loc-card:hover .loc-media img {
            transform: scale(1.05);
          }

          .loc-badge {
            position: absolute;
            top: 16px;
            left: 16px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(8,10,10,.86);
            color: #fec903;
            border-radius: 999px;
            padding: 8px 12px;
            font-size: 12px;
            font-weight: 800;
          }

          .loc-body {
            padding: 20px 18px 20px;
          }

          .loc-title {
            margin: 0 0 14px;
            color: #080a0a;
            font-size: 20px;
            line-height: 1.25;
            font-weight: 700;
          }

          .loc-info-stack {
            display: grid;
            gap: 12px;
          }

          .loc-info {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            color: #47505d;
            font-size: 14px;
            line-height: 1.65;
          }

          .loc-info-icon {
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

          .loc-label {
            color: #080a0a;
            font-weight: 700;
            display: block;
            margin-bottom: 2px;
          }

          .hours-lines {
            white-space: pre-line;
          }

          .locations-cta {
            margin-top: 36px;
            background: #fff;
            border: 1px solid rgba(8,10,10,.06);
            border-radius: 28px;
            padding: 28px 24px;
            box-shadow:
              0 14px 30px rgba(0,0,0,.05),
              0 3px 10px rgba(0,0,0,.03);
            display: grid;
            grid-template-columns: 1.3fr .8fr;
            gap: 24px;
            align-items: center;
          }

          .locations-cta-title {
            margin: 0 0 10px;
            color: #080a0a;
            font-size: clamp(24px, 3vw, 34px);
            font-weight: 700;
            line-height: 1.1;
          }

          .locations-cta-text {
            margin: 0;
            color: #5c6470;
            line-height: 1.75;
            font-size: 15px;
            max-width: 700px;
          }

          .locations-cta-side {
            background: linear-gradient(135deg, #080a0a 0%, #1d1d1d 100%);
            border-radius: 22px;
            padding: 22px 20px;
            color: #fff;
            box-shadow: 0 18px 34px rgba(0,0,0,.12);
          }

          .locations-cta-side-title {
            margin: 0 0 10px;
            color: #fec903;
            font-size: 18px;
            font-weight: 800;
          }

          .locations-cta-points {
            display: grid;
            gap: 10px;
          }

          .locations-cta-point {
            display: flex;
            gap: 10px;
            align-items: flex-start;
            font-size: 14px;
            line-height: 1.6;
            color: rgba(255,255,255,.9);
          }

          .locations-check {
            width: 22px;
            height: 22px;
            min-width: 22px;
            border-radius: 50%;
            background: #fec903;
            color: #080a0a;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 900;
            margin-top: 1px;
          }

          @media (max-width: 1100px) {
            .loc-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .locations-cta {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 820px) {
            .locations-stats {
              grid-template-columns: 1fr;
              max-width: 100%;
            }
          }

          @media (max-width: 700px) {
            .locations-shell {
              padding: 20px 14px 34px;
            }

            .loc-grid {
              grid-template-columns: 1fr;
            }

            .loc-media {
              height: 220px;
            }

            .locations-hero {
              padding: 26px 18px;
              border-radius: 22px;
            }

            .locations-cta {
              padding: 22px 18px;
              border-radius: 22px;
            }
          }
        `}</style>

        <div className="locations-shell">
          <section className="locations-hero">
            <div className="locations-hero-inner">
              <div className="locations-kicker">Nos implantations SUPECO</div>

              <h1 className="locations-title">
                Retrouvez nos points de vente et repérez le local le plus proche.
              </h1>

              <p className="locations-text">
                SUPECO est présent à travers plusieurs zones stratégiques pour
                offrir une expérience d’achat de proximité, pratique et accessible.
                Consultez nos implantations, nos adresses et nos horaires
                d’ouverture pour mieux planifier vos courses.
              </p>

              <div className="locations-stats">
                <div className="locations-stat">
                  <div className="locations-stat-value">{locations.length}</div>
                  <div className="locations-stat-label">
                    implantations actuellement mises en avant
                  </div>
                </div>

                <div className="locations-stat">
                  <div className="locations-stat-value">Dakar et Mbour</div>
                  <div className="locations-stat-label">
                    zones principales de couverture actuelle
                  </div>
                </div>

                <div className="locations-stat">
                  <div className="locations-stat-value">7j/7</div>
                  <div className="locations-stat-label">
                    amplitude horaire pensée pour le quotidien
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="section-head">
              <h2 className="section-title">Nos locaux au Sénégal</h2>
              <p className="section-subtitle">
                Découvrez les différents emplacements SUPECO et consultez les
                informations pratiques utiles pour vos visites.
              </p>
            </div>

            <div className="loc-grid">
              {locations.map((loc, idx) => (
                <div key={idx} className="loc-card">
                  <div className="loc-media">
                    <img src={loc.img} alt={loc.alt} />
                    <div className="loc-badge">
                      <StoreIcon />
                      Point de vente
                    </div>
                  </div>

                  <div className="loc-body">
                    <h3 className="loc-title">{loc.title}</h3>

                    <div className="loc-info-stack">
                      <div className="loc-info">
                        <span className="loc-info-icon">
                          <PinIcon />
                        </span>
                        <div>
                          <span className="loc-label">Adresse</span>
                          <span>{loc.address}</span>
                        </div>
                      </div>

                      <div className="loc-info">
                        <span className="loc-info-icon">
                          <StoreIcon />
                        </span>
                        <div>
                          <span className="loc-label">Zone</span>
                          <span>{loc.country}</span>
                        </div>
                      </div>

                      <div className="loc-info">
                        <span className="loc-info-icon">
                          <ClockIcon />
                        </span>
                        <div>
                          <span className="loc-label">Horaires d’ouverture</span>
                          <span className="hours-lines">{loc.hours}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="locations-cta">
              <div>
                <h2 className="locations-cta-title">
                  Une présence locale pour faciliter vos achats
                </h2>
                <p className="locations-cta-text">
                  Grâce à nos implantations, SUPECO renforce la proximité avec ses
                  clients et facilite l’accès à une offre claire, pratique et
                  adaptée aux besoins du quotidien. Chaque local est pensé pour
                  offrir une expérience simple, fluide et rassurante.
                </p>
              </div>

              <div className="locations-cta-side">
                <h3 className="locations-cta-side-title">Ce que vous trouvez</h3>

                <div className="locations-cta-points">
                  <div className="locations-cta-point">
                    <span className="locations-check">✓</span>
                    <span>Des emplacements faciles à identifier</span>
                  </div>

                  <div className="locations-cta-point">
                    <span className="locations-check">✓</span>
                    <span>Des horaires adaptés au rythme des clients</span>
                  </div>

                  <div className="locations-cta-point">
                    <span className="locations-check">✓</span>
                    <span>Une présence cohérente avec l’expérience SUPECO</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ShopLayout>
  );
}