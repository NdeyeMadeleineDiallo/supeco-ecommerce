import React from "react";
import { Link } from "@inertiajs/react";
import ShopLayout from "@/Layouts/ShopLayout";

export default function About() {
  return (
    <ShopLayout title="À propos – SUPECO">
      <div style={{ background: "#f7f7f5" }}>
        <style>{`
          .about-shell {
            max-width: 1180px;
            margin: 0 auto;
            padding: 28px 18px 48px;
          }

          .about-hero {
            display: grid;
            grid-template-columns: 1.05fr 0.95fr;
            gap: 28px;
            align-items: center;
            margin-bottom: 42px;
          }

          .about-hero-media {
            position: relative;
            border-radius: 28px;
            overflow: hidden;
            box-shadow: 0 20px 42px rgba(0,0,0,.10);
            min-height: 420px;
            background: #111;
          }

          .about-hero-media img {
            width: 100%;
            height: 100%;
            min-height: 420px;
            object-fit: cover;
            display: block;
          }

          .about-hero-media::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(0,0,0,.04) 0%, rgba(0,0,0,.18) 100%);
          }

          .about-card {
            background: #fff;
            border: 1px solid rgba(8,10,10,.06);
            border-radius: 28px;
            padding: 30px 28px;
            box-shadow:
              0 14px 30px rgba(0,0,0,.06),
              0 4px 10px rgba(0,0,0,.03);
            position: relative;
            overflow: hidden;
          }

          .about-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 7px;
            background: linear-gradient(90deg, #fec903 0%, #080a0a 100%);
          }

          .about-kicker {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #fff7cf;
            color: #080a0a;
            border: 1px solid rgba(254, 201, 3, .45);
            border-radius: 999px;
            padding: 8px 14px;
            font-size: 13px;
            font-weight: 800;
            margin-bottom: 16px;
          }

          .about-title {
            margin: 0 0 14px;
            color: #080a0a;
            font-size: clamp(24px, 3vw, 36px);
            line-height: 1.12;
            font-weight: 700;
            letter-spacing: -.02em;
          }

          .about-text {
            margin: 0 0 14px;
            color: #4b5563;
            line-height: 1.8;
            font-size: 15px;
          }

          .about-actions {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-top: 20px;
          }

          .btn-primary-about,
          .btn-secondary-about {
            text-decoration: none;
            border-radius: 14px;
            padding: 12px 18px;
            font-size: 14px;
            font-weight: 800;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: all .2s ease;
          }

          .btn-primary-about {
            background: #080a0a;
            color: #fec903;
          }

          .btn-primary-about:hover {
            color: #fec903;
            transform: translateY(-1px);
          }

          .btn-secondary-about {
            background: #fff7cf;
            color: #080a0a;
            border: 1px solid rgba(254, 201, 3, .38);
          }

          .btn-secondary-about:hover {
            color: #080a0a;
            transform: translateY(-1px);
          }

          .section-block {
            margin-top: 54px;
          }

          .section-head {
            text-align: center;
            margin-bottom: 28px;
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

          .mvv-stack {
            display: grid;
            gap: 24px;
          }

          .mvv-card {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            align-items: center;
            background: #fff;
            border: 1px solid rgba(8,10,10,.06);
            border-radius: 26px;
            padding: 18px;
            box-shadow:
              0 14px 30px rgba(0,0,0,.05),
              0 3px 10px rgba(0,0,0,.03);
          }

          .mvv-card.reverse .mvv-media {
            order: 1;
          }

          .mvv-card.reverse .mvv-content {
            order: 2;
          }

          .mvv-media {
            border-radius: 22px;
            overflow: hidden;
            min-height: 280px;
            background: #f3f4f6;
          }

          .mvv-media img {
            width: 100%;
            height: 100%;
            min-height: 280px;
            object-fit: cover;
            display: block;
          }

          .mvv-content {
            padding: 6px 10px;
          }

          .mvv-icon {
            width: 54px;
            height: 54px;
            border-radius: 16px;
            background: linear-gradient(135deg, #fff5bf 0%, #fec903 100%);
            color: #080a0a;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 0 10px 18px rgba(254, 201, 3, .22);
            margin-bottom: 14px;
          }

          .mvv-title {
            margin: 0 0 12px;
            color: #080a0a;
            font-size: 24px;
            font-weight: 700;
          }

          .mvv-text {
            margin: 0;
            color: #4b5563;
            line-height: 1.85;
            font-size: 15px;
          }

          .why-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
          }

          .why-card {
            background: #fff;
            border: 1px solid rgba(8,10,10,.06);
            border-radius: 22px;
            padding: 24px 18px 22px;
            box-shadow:
              0 12px 26px rgba(0,0,0,.05),
              0 3px 8px rgba(0,0,0,.03);
            text-align: center;
            transition: transform .22s ease, box-shadow .22s ease;
          }

          .why-card:hover {
            transform: translateY(-5px);
            box-shadow:
              0 22px 40px rgba(0,0,0,.08),
              0 6px 12px rgba(0,0,0,.04);
          }

          .why-icon {
            width: 58px;
            height: 58px;
            border-radius: 16px;
            background: linear-gradient(135deg, #fff5bf 0%, #fec903 100%);
            color: #080a0a;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin-bottom: 14px;
            box-shadow: 0 8px 18px rgba(254, 201, 3, .22);
          }

          .why-title {
            margin: 0 0 10px;
            color: #080a0a;
            font-size: 17px;
            font-weight: 700;
          }

          .why-text {
            margin: 0;
            color: #5b6470;
            line-height: 1.75;
            font-size: 14px;
          }

          .cta-about {
            margin-top: 36px;
            position: relative;
            overflow: hidden;
            border-radius: 28px;
            background: linear-gradient(135deg, #080a0a 0%, #151515 55%, #2c2c2c 100%);
            color: #fff;
            padding: 32px 28px;
            box-shadow: 0 20px 40px rgba(0,0,0,.15);
          }

          .cta-about::before {
            content: "";
            position: absolute;
            width: 220px;
            height: 220px;
            border-radius: 50%;
            background: rgba(254, 201, 3, .16);
            top: -70px;
            right: -50px;
          }

          .cta-about::after {
            content: "";
            position: absolute;
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background: rgba(254, 201, 3, .10);
            bottom: -50px;
            left: -30px;
          }

          .cta-about-inner {
            position: relative;
            z-index: 1;
            text-align: center;
            max-width: 860px;
            margin: 0 auto;
          }

          .cta-about-title {
            margin: 0 0 12px;
            font-size: clamp(28px, 4vw, 42px);
            line-height: 1.08;
            font-weight: 800;
            letter-spacing: -.02em;
          }

          .cta-about-text {
            margin: 0 auto;
            max-width: 720px;
            color: rgba(255,255,255,.88);
            line-height: 1.75;
            font-size: 15px;
          }

          .cta-about-actions {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
          }

          @media (max-width: 980px) {
            .about-hero {
              grid-template-columns: 1fr;
            }

            .mvv-card,
            .mvv-card.reverse {
              grid-template-columns: 1fr;
            }

            .mvv-card.reverse .mvv-media,
            .mvv-card.reverse .mvv-content {
              order: initial;
            }

            .why-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (max-width: 640px) {
            .about-shell {
              padding: 20px 14px 34px;
            }

            .about-card {
              padding: 24px 18px;
              border-radius: 22px;
            }

            .about-hero-media,
            .about-hero-media img {
              min-height: 280px;
            }

            .why-grid {
              grid-template-columns: 1fr;
            }

            .about-actions,
            .cta-about-actions {
              flex-direction: column;
            }

            .btn-primary-about,
            .btn-secondary-about {
              width: 100%;
            }
          }
        `}</style>

        <div className="about-shell">
          <section className="about-hero">
            <div className="about-hero-media">
              <img src="/images/about-supeco.png" alt="À propos SUPECO" />
            </div>

            <div className="about-card">
              <div className="about-kicker">À propos de SUPECO</div>

              <h1 className="about-title">
                Une expérience d’achat simple, rapide et pensée pour le quotidien.
              </h1>

              <p className="about-text">
                <strong>SUPECO</strong> est une plateforme de vente en ligne conçue
                pour faciliter l’accès à des produits de qualité à des prix
                accessibles.
              </p>

              <p className="about-text">
                Notre objectif est de proposer une expérience d’achat fluide,
                rassurante et moderne, avec des produits soigneusement sélectionnés
                et une navigation claire pour tous les utilisateurs.
              </p>

              <p className="about-text">
                Grâce à SUPECO, les clients peuvent consulter les produits,
                commander en quelques clics et suivre facilement leurs commandes
                depuis leur espace personnel.
              </p>

              <p className="about-text" style={{ marginBottom: 0 }}>
                SUPECO s’inscrit dans une démarche de modernisation du commerce en
                ligne et de satisfaction client durable.
              </p>

              <div className="about-actions">
                <Link href="/produits" className="btn-primary-about">
                  Découvrir nos produits
                </Link>
                <Link href="/contact" className="btn-secondary-about">
                  Nous contacter
                </Link>
              </div>
            </div>
          </section>

          <section className="section-block">
            <div className="section-head">
              <h2 className="section-title">Notre mission, notre vision et nos valeurs</h2>
              <p className="section-subtitle">
                SUPECO repose sur une ambition claire : offrir une solution moderne,
                utile et fiable pour simplifier les achats du quotidien.
              </p>
            </div>

            <div className="mvv-stack">
              <div className="mvv-card">
                <div className="mvv-content">
                  <div className="mvv-icon">🎯</div>
                  <h3 className="mvv-title">Notre mission</h3>
                  <p className="mvv-text">
                    Offrir une plateforme de vente en ligne simple, accessible et
                    fiable, permettant aux clients d’acheter des produits essentiels
                    de qualité en toute confiance, avec une expérience fluide,
                    pratique et sécurisée.
                  </p>
                </div>

                <div className="mvv-media">
                  <img src="/images/mission.png" alt="Mission SUPECO" />
                </div>
              </div>

              <div className="mvv-card reverse">
                <div className="mvv-media">
                  <img src="/images/vision.png" alt="Vision SUPECO" />
                </div>

                <div className="mvv-content">
                  <div className="mvv-icon">🚀</div>
                  <h3 className="mvv-title">Notre vision</h3>
                  <p className="mvv-text">
                    Devenir une référence du e-commerce local en proposant une
                    solution rapide, moderne et adaptée aux nouvelles habitudes de
                    consommation, tout en contribuant au développement économique
                    local.
                  </p>
                </div>
              </div>

              <div className="mvv-card">
                <div className="mvv-content">
                  <div className="mvv-icon">💡</div>
                  <h3 className="mvv-title">Nos valeurs</h3>
                  <p className="mvv-text">
                    Qualité des produits, transparence dans les transactions,
                    respect du client, responsabilité, innovation continue et
                    engagement pour un service fiable, clair et durable.
                  </p>
                </div>

                <div className="mvv-media">
                  <img src="/images/valeurs.png" alt="Valeurs SUPECO" />
                </div>
              </div>
            </div>
          </section>

          <section className="section-block">
            <div className="section-head">
              <h2 className="section-title">Pourquoi choisir SUPECO ?</h2>
              <p className="section-subtitle">
                SUPECO a été pensé pour offrir une expérience d’achat simple,
                rapide et fiable, avec un environnement moderne et rassurant.
              </p>
            </div>

            <div className="why-grid">
              <WhyCard icon="✅" title="Produits sélectionnés">
                Une offre claire et organisée par catégories pour trouver
                rapidement ce dont vous avez besoin.
              </WhyCard>

              <WhyCard icon="🛒" title="Achat simple">
                Ajout au panier en un clic, mise à jour des quantités et
                validation rapide de la commande.
              </WhyCard>

              <WhyCard icon="📦" title="Suivi des commandes">
                Un espace client permet de consulter l’historique et les détails
                de vos commandes à tout moment.
              </WhyCard>

              <WhyCard icon="🔒" title="Sécurité & fiabilité">
                Comptes sécurisés, accès protégés et gestion structurée des
                produits, messages et commandes.
              </WhyCard>
            </div>

            <div className="cta-about">
              <div className="cta-about-inner">
                <h2 className="cta-about-title">
                  Découvrez une autre façon de faire vos achats en ligne.
                </h2>

                <p className="cta-about-text">
                  Avec SUPECO, vous bénéficiez d’une boutique claire, moderne et
                  agréable à utiliser, conçue pour vous faire gagner du temps tout
                  en gardant l’essentiel : simplicité, confiance et accessibilité.
                </p>

                <div className="cta-about-actions">
                  <Link href="/produits" className="btn-primary-about">
                    Découvrir nos produits
                  </Link>
                  <Link href="/nos-implantations" className="btn-secondary-about">
                    Voir nos implantations
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ShopLayout>
  );
}

function WhyCard({ icon, title, children }) {
  return (
    <div className="why-card">
      <div className="why-icon">{icon}</div>
      <h3 className="why-title">{title}</h3>
      <p className="why-text">{children}</p>
    </div>
  );
}