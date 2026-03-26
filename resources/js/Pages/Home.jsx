import React from "react";
import { Link } from "@inertiajs/react";
import ShopLayout from "@/Layouts/ShopLayout";

function MeatIcon() {
  return (
    <svg viewBox="0 0 64 64" width="34" height="34" fill="none">
      <path
        d="M24 18c-9 0-16 7.2-16 16.1C8 45.2 16.7 54 27.5 54c4.3 0 8.1-1.4 11.2-3.8 2.4-1.9 5-2.8 7.9-2.8 6.2 0 11.4-5.1 11.4-11.4 0-7.7-6.3-14-14-14-2.5 0-4.8.6-6.9 1.8-2.4 1.3-4.9 2-7.1 2H24Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="33" r="3.5" fill="currentColor" />
    </svg>
  );
}

function VegetableIcon() {
  return (
    <svg viewBox="0 0 64 64" width="34" height="34" fill="none">
      <path
        d="M33 54c11 0 19-8.4 19-20 0-8.6-5.9-16.5-14.6-19.1C24.1 11 15 20.5 15 32.4 15 44.4 23.1 54 33 54Z"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M33 22c1.2-5.8 5.1-9.9 10.9-12M33 22c-5.7-1-10.4-4.3-13.2-9.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M25 31c3.3 1.6 6.7 2.5 10.7 2.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DrinkIcon() {
  return (
    <svg viewBox="0 0 64 64" width="34" height="34" fill="none">
      <path
        d="M22 12h20l-2.6 13v18a5 5 0 0 1-5 5h-4.8a5 5 0 0 1-5-5V25L22 12Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M27 12V8m10 4V8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M25 25h14"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DairyIcon() {
  return (
    <svg viewBox="0 0 64 64" width="34" height="34" fill="none">
      <path
        d="M25 10h14l7 12v21a5 5 0 0 1-5 5H23a5 5 0 0 1-5-5V22l7-12Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M25 10V7h14v3" stroke="currentColor" strokeWidth="3" />
      <path
        d="M24 24h16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BakeryIcon() {
  return (
    <svg viewBox="0 0 64 64" width="34" height="34" fill="none">
      <path
        d="M14 34c0-10.4 8-18 18-18s18 7.6 18 18v5a9 9 0 0 1-9 9H23a9 9 0 0 1-9-9v-5Z"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M22 25c1-2.3 3-4 5.6-4.9M32 20c1.5-2.4 4-4 6.9-4.2M42 23c1.2-1.6 2.7-2.8 4.6-3.4"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M16 36h32"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DefaultIcon() {
  return (
    <svg viewBox="0 0 64 64" width="34" height="34" fill="none">
      <path
        d="M18 24h28l-2.6 20a5 5 0 0 1-5 4H25.6a5 5 0 0 1-5-4L18 24Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M25 24a7 7 0 1 1 14 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function getCategoryIcon(slug) {
  const icons = {
    charcuterie: <MeatIcon />,
    "fruits-et-legumes": <VegetableIcon />,
    boissons: <DrinkIcon />,
    cremerie: <DairyIcon />,
    patisserie: <BakeryIcon />,
  };

  return icons[slug] || <DefaultIcon />;
}

function formatPrice(price) {
  return `${Number(price || 0).toLocaleString("fr-FR")} F CFA`;
}

export default function Home({ products = [], featuredCategories = [] }) {
  return (
    <ShopLayout title="Accueil">
      <div style={{ background: "#f7f7f5" }}>
        <style>{`
          .home-shell {
            max-width: 1240px;
            margin: 0 auto;
            padding: 0 18px 40px;
          }

          .hero-full {
            width: 99.4vw;
            margin-left: calc(-50vw + 50%);
            margin-top: -18px;
            position: relative;
            overflow: hidden;
            background: #080a0a;
          }

          .hero-image {
            width: 100%;
            height: clamp(220px, 30vw, 420px);
            object-fit: cover;
            display: block;
          }

          .hero-overlay-min {
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, rgba(8,10,10,.08) 0%, rgba(8,10,10,.05) 40%, rgba(8,10,10,.12) 100%);
          }

          .hero-btn-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end; /* 👈 descend le bouton */
  justify-content: flex-end;
  padding-right: 18%;
  padding-bottom: 30px; /* 👈 ajuste la hauteur sous le texte */
}

          .hero-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            background: #fec903;
            color: #080a0a;
            font-weight: 800;
            font-size: 15px;
            padding: 13px 22px;
            border-radius: 999px;
            box-shadow: 0 14px 28px rgba(0,0,0,.18);
            border: 1px solid rgba(0,0,0,.08);
            transition: transform .2s ease, box-shadow .2s ease;
          }

          .hero-btn:hover {
            color: #080a0a;
            transform: translateY(-2px);
            box-shadow: 0 18px 34px rgba(0,0,0,.22);
          }

          .section {
            margin-top: 34px;
          }

          .section-categories {
            margin-top: 26px;
          }

          .section-products {
            margin-top: 64px;
          }

          .section-head {
            text-align: center;
            margin-bottom: 20px;
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
            color: #5b5f65;
            max-width: 700px;
            line-height: 1.6;
            font-size: 15px;
          }

          .category-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 18px;
          }

          .category-card {
            position: relative;
            display: block;
            text-decoration: none;
            color: #080a0a;
            background: #fff;
            border-radius: 22px;
            padding: 22px 18px 20px;
            border: 1px solid rgba(8,10,10,.06);
            box-shadow:
              0 10px 24px rgba(0,0,0,.06),
              0 2px 6px rgba(0,0,0,.03);
            transition: transform .25s ease, box-shadow .25s ease;
            overflow: hidden;
            min-height: 190px;
            text-align: center;
          }

          .category-card:hover {
            transform: translateY(-6px);
            box-shadow:
              0 22px 40px rgba(0,0,0,.10),
              0 6px 14px rgba(0,0,0,.05);
          }

          .category-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, #fec903 0%, #080a0a 100%);
          }

          .category-icon-wrap {
            width: 66px;
            height: 66px;
            border-radius: 18px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #fff5bf 0%, #fec903 100%);
            color: #080a0a;
            box-shadow: 0 8px 18px rgba(254, 201, 3, .22);
            margin: 0 auto 16px;
          }

          .category-name {
            margin: 0 0 8px;
            font-size: 19px;
            font-weight: 700;
            line-height: 1.25;
          }

          .category-text {
            margin: 0;
            font-size: 14px;
            color: #5f6570;
            line-height: 1.6;
          }

          .category-arrow {
            margin-top: 14px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #080a0a;
            font-weight: 700;
            font-size: 14px;
          }

          .products-wrap {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 22px;
          }

          .product-card {
            background: #fff;
            border-radius: 24px;
            overflow: hidden;
            border: 1px solid rgba(8,10,10,.06);
            box-shadow:
              0 12px 26px rgba(0,0,0,.06),
              0 3px 8px rgba(0,0,0,.03);
            transition: transform .25s ease, box-shadow .25s ease;
          }

          .product-card:hover {
            transform: translateY(-6px);
            box-shadow:
              0 24px 42px rgba(0,0,0,.10),
              0 8px 18px rgba(0,0,0,.05);
          }

          .product-media {
            position: relative;
            background: linear-gradient(180deg, #fffdf2 0%, #f5f5f5 100%);
            padding: 12px;
          }

          .product-badge {
            position: absolute;
            top: 18px;
            left: 18px;
            background: rgba(8,10,10,.86);
            color: #fec903;
            font-size: 12px;
            font-weight: 800;
            padding: 7px 12px;
            border-radius: 999px;
            z-index: 2;
          }

          .product-image {
            width: 100%;
            height: 220px;
            object-fit: cover;
            display: block;
            border-radius: 18px;
          }

          .product-image-placeholder {
            width: 100%;
            height: 220px;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #fff5bf 0%, #f3f4f6 100%);
            color: #424750;
            font-weight: 700;
          }

          .product-body {
            padding: 18px 18px 20px;
          }

          .product-name {
            margin: 0 0 10px;
            color: #080a0a;
            font-size: 18px;
            font-weight: 700;
            line-height: 1.35;
            min-height: 48px;
          }

          .product-meta {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            margin-bottom: 14px;
          }

          .product-price {
            margin: 0;
            font-size: 21px;
            font-weight: 800;
            color: #080a0a;
          }

          .product-note {
            color: #5f6570;
            font-size: 13px;
            font-weight: 600;
          }

          .product-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          }

          .btn-dark-home,
          .btn-light-home {
            text-decoration: none;
            border-radius: 12px;
            padding: 11px 14px;
            font-size: 14px;
            font-weight: 700;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: all .2s ease;
          }

          .btn-dark-home {
            background: #080a0a;
            color: #fec903;
          }

          .btn-dark-home:hover {
            color: #fec903;
            transform: translateY(-1px);
          }

          .btn-light-home {
            background: #fff7cf;
            color: #080a0a;
            border: 1px solid rgba(254, 201, 3, .35);
          }

          .btn-light-home:hover {
            color: #080a0a;
            transform: translateY(-1px);
          }

          .cta-block {
            margin-top: 38px;
            position: relative;
            overflow: hidden;
            border-radius: 28px;
            background: linear-gradient(135deg, #080a0a 0%, #151515 55%, #2a2a2a 100%);
            padding: 34px 30px;
            color: white;
            box-shadow: 0 20px 40px rgba(0,0,0,.16);
          }

          .cta-block::before {
            content: "";
            position: absolute;
            width: 240px;
            height: 240px;
            border-radius: 50%;
            background: rgba(254, 201, 3, .18);
            top: -80px;
            right: -70px;
          }

          .cta-block::after {
            content: "";
            position: absolute;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: rgba(254, 201, 3, .10);
            bottom: -55px;
            left: -40px;
          }

          .cta-inner {
            position: relative;
            z-index: 1;
            display: grid;
            grid-template-columns: 1.3fr .9fr;
            gap: 24px;
            align-items: center;
          }

          .cta-mini {
            display: inline-flex;
            align-items: center;
            background: rgba(254, 201, 3, .16);
            border: 1px solid rgba(254, 201, 3, .24);
            color: #fec903;
            border-radius: 999px;
            padding: 8px 14px;
            font-size: 13px;
            font-weight: 800;
            margin-bottom: 14px;
          }

          .cta-title {
            margin: 0 0 12px;
            font-size: clamp(28px, 3.5vw, 40px);
            line-height: 1.06;
            font-weight: 800;
            letter-spacing: -.02em;
          }

          .cta-text {
            margin: 0;
            color: rgba(255,255,255,.86);
            line-height: 1.7;
            font-size: 15px;
            max-width: 640px;
          }

          .cta-side {
            background: rgba(255,255,255,.05);
            border: 1px solid rgba(255,255,255,.08);
            backdrop-filter: blur(4px);
            border-radius: 22px;
            padding: 22px 20px;
          }

          .cta-points {
            display: grid;
            gap: 12px;
            margin-bottom: 18px;
          }

          .cta-point {
            display: flex;
            align-items: start;
            gap: 10px;
            color: rgba(255,255,255,.92);
            font-size: 14px;
            line-height: 1.5;
          }

          .cta-check {
            width: 24px;
            height: 24px;
            min-width: 24px;
            border-radius: 50%;
            background: #fec903;
            color: #080a0a;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            margin-top: 1px;
          }

          .cta-actions {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-top: 18px;
          }

          .cta-btn-yellow,
          .cta-btn-outline {
            text-decoration: none;
            border-radius: 14px;
            padding: 12px 16px;
            font-size: 14px;
            font-weight: 800;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: all .2s ease;
          }

          .cta-btn-yellow {
            background: #fec903;
            color: #080a0a;
          }

          .cta-btn-yellow:hover {
            color: #080a0a;
            transform: translateY(-1px);
          }

          .cta-btn-outline {
            color: white;
            border: 1px solid rgba(255,255,255,.18);
            background: rgba(255,255,255,.06);
          }

          .cta-btn-outline:hover {
            color: white;
            transform: translateY(-1px);
          }

          @media (max-width: 1100px) {
            .category-grid {
              grid-template-columns: repeat(3, 1fr);
            }

            .cta-inner {
              grid-template-columns: 1fr;
            }

            .hero-btn-wrap {
              padding-right: 12%;
            }
          }

          @media (max-width: 768px) {
            .home-shell {
              padding: 0 14px 30px;
            }

            .hero-full {
              margin-top: -22px;
            }

            .hero-btn-wrap {
              padding-right: 0;
              justify-content: center;
              align-items: end;
              padding-bottom: 16px;
            }

            .category-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 14px;
            }

            .products-wrap {
              grid-template-columns: 1fr 1fr;
              gap: 14px;
            }

            .product-image,
            .product-image-placeholder {
              height: 180px;
            }

            .cta-block {
              padding: 26px 18px;
              border-radius: 22px;
            }

            .section-products {
              margin-top: 46px;
            }
          }

          @media (max-width: 560px) {
            .category-grid,
            .products-wrap {
              grid-template-columns: 1fr;
            }

            .product-actions,
            .cta-actions {
              flex-direction: column;
            }

            .btn-dark-home,
            .btn-light-home,
            .cta-btn-yellow,
            .cta-btn-outline,
            .hero-btn {
              width: 100%;
            }
          }
        `}</style>

        <div className="hero-full">
          <img
            src="/images/banner-supeco.png"
            alt="Bannière SUPECO"
            className="hero-image"
          />
          <div className="hero-overlay-min" />
          <div className="hero-btn-wrap">
            <Link href="/produits" className="hero-btn">
              Voir le catalogue
            </Link>
          </div>
        </div>

        <div className="home-shell">
          <section className="section section-categories">
            <div className="section-head">
              <h2 className="section-title">Acheter par catégorie</h2>
              <p className="section-subtitle">
                Explorez rapidement les rayons principaux et accédez en un clic aux produits qui vous intéressent.
              </p>
            </div>

            <div className="category-grid">
              {featuredCategories.map((cat) => (
                <Link
                  key={cat.id ?? cat.slug}
                  href={`/produits?category=${encodeURIComponent(cat.slug)}`}
                  className="category-card"
                >
                  <div className="category-icon-wrap">
                    {getCategoryIcon(cat.slug)}
                  </div>

                  <h3 className="category-name">{cat.name}</h3>

                  <p className="category-text">
                    Découvrez la sélection {cat.name.toLowerCase()} disponible dans notre boutique.
                  </p>

                  <div className="category-arrow">
                    Explorer <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="section section-products">
            <div className="section-head">
              <h2 className="section-title">Produits récents</h2>
              <p className="section-subtitle">
                Une mise en avant élégante de vos produits pour donner envie d’acheter dès la page d’accueil.
              </p>
            </div>

            <div className="products-wrap">
              {products.map((p) => (
                <div key={p.id} className="product-card">
                  <div className="product-media">
                    <div className="product-badge">Nouveau</div>

                    {p.image ? (
                      <img
                        src={`/storage/${p.image}`}
                        alt={p.name}
                        className="product-image"
                      />
                    ) : (
                      <div className="product-image-placeholder">
                        Image produit
                      </div>
                    )}
                  </div>

                  <div className="product-body">
                    <h3 className="product-name">{p.name}</h3>

                    <div className="product-meta">
                      <p className="product-price">{formatPrice(p.price)}</p>
                      <span className="product-note">Disponible</span>
                    </div>

                    <div className="product-actions">
                      <Link href="/produits" className="btn-dark-home">
                        Voir le catalogue
                      </Link>
                      <Link
                        href={`/produits?q=${encodeURIComponent(p.name)}`}
                        className="btn-light-home"
                      >
                        Similaires
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="cta-block">
            <div className="cta-inner">
              <div>
                <div className="cta-mini">SUPECO • Boutique moderne</div>

                <h2 className="cta-title">
                  Faites vos courses plus facilement, plus vite et avec plus de confort.
                </h2>

                <p className="cta-text">
                  Profitez d’une boutique claire, rassurante et agréable à parcourir. Accédez à vos catégories, repérez rapidement les produits essentiels et passez à l’action en quelques clics.
                </p>

                <div className="cta-actions">
                  <Link href="/produits" className="cta-btn-yellow">
                    Commencer mes achats
                  </Link>
                  <Link href="/contact" className="cta-btn-outline">
                    Nous contacter
                  </Link>
                </div>
              </div>

              <div className="cta-side">
                <div className="cta-points">
                  <div className="cta-point">
                    <span className="cta-check">✓</span>
                    <span>Navigation simple et rapide entre les rayons principaux.</span>
                  </div>

                  <div className="cta-point">
                    <span className="cta-check">✓</span>
                    <span>Mise en avant claire des produits récents et disponibles.</span>
                  </div>

                  <div className="cta-point">
                    <span className="cta-check">✓</span>
                    <span>Expérience visuelle moderne alignée avec les couleurs SUPECO.</span>
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