import React, { useEffect, useRef, useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function ShopLayout({ children, title = "SUPECO" }) {
  const { props, url } = usePage();

  const cartCount = props?.cartCount ?? 0;
  const user = props?.auth?.user ?? null;
  const isAdmin = !!user?.is_admin;

  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const profileRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const isActive = (href) => {
    if (!href) return false;
    const current = (url || "/").split("?")[0];
    const target = href.split("?")[0];

    if (target === "/") return current === "/";
    return current === target || current.startsWith(target + "/");
  };

  return (
    <div
      style={{
        margin: 0,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        background: "#f8fafc",
        color: "#080a0a",
        minHeight: "100vh",
      }}
    >
      <style>{`
        .shop-header {
          background: linear-gradient(180deg, #fecc33 0%, #f7c92f 100%);
          color: #080a0a;
          position: sticky;
          top: 0;
          z-index: 50;
          box-shadow: 0 8px 22px rgba(0,0,0,.06);
          border-bottom: 1px solid rgba(8,10,10,.06);
        }

        .shop-header-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 12px 16px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 18px;
        }

        .shop-logo-link {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          color: #080a0a;
        }

        .shop-logo {
          height: 58px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        .shop-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 22px;
          flex-wrap: wrap;
        }

        .shop-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .shop-icon-btn,
        .shop-cart-btn {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(8,10,10,.06);
          transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
        }

        .shop-icon-btn {
          background: rgba(255,255,255,.24);
          backdrop-filter: blur(4px);
        }

        .shop-icon-btn:hover,
        .shop-cart-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 18px rgba(0,0,0,.08);
        }

        .shop-cart-btn {
          position: relative;
          background: #080a0a;
          text-decoration: none;
        }

        .shop-cart-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #fecc33;
          color: #080a0a;
          font-weight: 800;
          font-size: 12px;
          padding: 2px 7px;
          border-radius: 999px;
          border: 2px solid #fecc33;
          min-width: 22px;
          text-align: center;
          box-shadow: 0 6px 12px rgba(0,0,0,.08);
        }

        .shop-main {
          max-width: 1180px;
          margin: 0 auto;
          padding: 18px 16px;
        }

        .shop-flash {
          padding: 12px 14px;
          border-radius: 12px;
          margin-bottom: 12px;
          font-size: 14px;
          line-height: 1.6;
          box-shadow: 0 8px 18px rgba(0,0,0,.03);
        }

        .shop-footer {
          margin-top: 34px;
          background: linear-gradient(180deg, #080a0a 0%, #111111 100%);
          color: #fecc33;
          position: relative;
          overflow: hidden;
        }

        .shop-footer::before {
          content: "";
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: rgba(254,204,51,.08);
          top: -110px;
          right: -70px;
        }

        .shop-footer::after {
          content: "";
          position: absolute;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: rgba(254,204,51,.06);
          bottom: -60px;
          left: -40px;
        }

        .shop-footer-inner {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          margin: 0 auto;
          padding: 34px 16px 20px;
        }

        .shop-footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr 1fr;
          gap: 24px;
          align-items: start;
        }

        .shop-footer-title {
          margin: 0 0 12px;
          font-size: 15px;
          font-weight: 800;
          color: #fecc33;
        }

        .shop-footer-text {
          margin: 0;
          color: rgba(254,204,51,.88);
          line-height: 1.7;
          font-size: 14px;
        }

        .shop-footer-list {
          display: flex;
          flex-direction: column;
          gap: 9px;
          font-size: 14px;
        }

        .shop-footer-bottom {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          font-size: 13px;
          color: rgba(254,204,51,.88);
        }

        .shop-footer-divider {
          border: none;
          border-top: 1px solid rgba(254,204,51,.18);
          margin: 22px 0 16px;
        }

        .shop-socials {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .shop-social-btn {
          color: #080a0a;
          background: #fecc33;
          padding: 8px 12px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 800;
          font-size: 13px;
          transition: transform .18s ease, box-shadow .18s ease;
        }

        .shop-social-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 18px rgba(0,0,0,.14);
        }

        .profile-dropdown {
          position: absolute;
          right: 0;
          top: 54px;
          width: 315px;
          background: rgba(255,255,255,.98);
          border: 1px solid rgba(8,10,10,.08);
          border-radius: 22px;
          box-shadow: 0 20px 50px rgba(0,0,0,.16);
          z-index: 140;
          overflow: hidden;
          backdrop-filter: blur(8px);
        }

        .search-dropdown {
          position: absolute;
          right: 0;
          top: 52px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 12px;
          width: 320px;
          box-shadow: 0 12px 24px rgba(0,0,0,.12);
          z-index: 120;
        }

        @media (max-width: 980px) {
          .shop-header-inner {
            grid-template-columns: 1fr;
            justify-items: center;
            gap: 14px;
          }

          .shop-nav {
            gap: 16px;
          }

          .shop-footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .shop-logo {
            height: 52px;
          }

          .shop-nav {
            gap: 14px;
            font-size: 14px;
          }

          .shop-actions {
            gap: 8px;
          }

          .search-dropdown,
          .profile-dropdown {
            width: min(92vw, 320px);
            right: 50%;
            transform: translateX(50%);
          }

          .shop-footer-grid {
            grid-template-columns: 1fr;
          }

          .shop-footer-bottom {
            flex-direction: column;
          }
        }
      `}</style>

      <header className="shop-header">
        <div className="shop-header-inner">
          <Link href="/" className="shop-logo-link">
            <img src="/images/supeco-logo.png" alt="SUPECO" className="shop-logo" />
          </Link>

          <nav className="shop-nav">
            <NavLink href="/" active={isActive("/")}>Accueil</NavLink>
            <NavLink href="/a-propos" active={isActive("/a-propos")}>À propos</NavLink>
            <NavLink href="/nos-implantations" active={isActive("/nos-implantations")}>Nos implantations</NavLink>

            {user ? (
              <NavLink href="/mes-commandes" active={isActive("/mes-commandes")}>Commandes</NavLink>
            ) : (
              <NavLink href="/login" active={isActive("/login")}>Commandes</NavLink>
            )}

            <NavLink href="/produits" active={isActive("/produits")}>Produits</NavLink>
            <NavLink href="/contact" active={isActive("/contact")}>Contact</NavLink>
          </nav>

          <div className="shop-actions">
            <div ref={searchRef} style={{ position: "relative" }}>
              <button
                type="button"
                title="Rechercher"
                onClick={() => setSearchOpen((v) => !v)}
                className="shop-icon-btn"
                style={{ cursor: "pointer", border: "none" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#080a0a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 20, height: 20 }}
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>

              {searchOpen && (
                <div className="search-dropdown">
                  <form method="GET" action="/produits" style={{ display: "flex", gap: 8 }}>
                    <input
                      name="q"
                      placeholder="Rechercher un produit..."
                      style={{
                        flex: 1,
                        padding: "11px 12px",
                        border: "1px solid #d1d5db",
                        borderRadius: 12,
                        outline: "none",
                        fontSize: 14,
                      }}
                      autoFocus
                    />
                    <button
                      type="submit"
                      style={{
                        background: "#080a0a",
                        color: "#fecc33",
                        padding: "11px 14px",
                        borderRadius: 12,
                        border: "none",
                        cursor: "pointer",
                        fontWeight: 800,
                      }}
                    >
                      OK
                    </button>
                  </form>
                </div>
              )}
            </div>

            <Link href="/panier" title="Panier" className="shop-cart-btn">
              <span style={{ fontSize: 18, color: "#fecc33" }}>🛒</span>
              <span className="shop-cart-badge">{cartCount}</span>
            </Link>

            <div ref={profileRef} style={{ position: "relative" }}>
              {user ? (
                <>
                  <button
                    type="button"
                    title="Mon compte"
                    onClick={() => setProfileOpen((v) => !v)}
                    className="shop-icon-btn"
                    style={{ cursor: "pointer", border: "none" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#080a0a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: 20, height: 20 }}
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </button>

                  {profileOpen && (
                    <div className="profile-dropdown">
                      <div
                        style={{
                          padding: "18px 18px 16px",
                          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
                          borderBottom: "1px solid #e5e7eb",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 800,
                            fontSize: 17,
                            color: "#080a0a",
                            marginBottom: 4,
                          }}
                        >
                          {user.name}
                        </div>
                        <div
                          style={{
                            fontWeight: 500,
                            fontSize: 14,
                            color: "#667085",
                          }}
                        >
                          {user.email}
                        </div>
                      </div>

                      <div style={{ padding: 10 }}>
                        <DropdownLink href="/profile">Mon compte</DropdownLink>
                        <DropdownLink href="/mes-commandes">Mes commandes</DropdownLink>
                        {isAdmin && <DropdownLink href="/admin">Admin</DropdownLink>}
                      </div>

                      <div style={{ borderTop: "1px solid #e5e7eb" }} />

                      <div style={{ padding: 10 }}>
                        <form method="POST" action="/logout" style={{ margin: 0 }}>
                          <input type="hidden" name="_token" value={props?.csrf_token ?? ""} />
                          <button
                            type="submit"
                            style={{
                              width: "100%",
                              textAlign: "left",
                              padding: "13px 14px",
                              background: "#fff5f5",
                              border: "1px solid #fecaca",
                              borderRadius: 14,
                              cursor: "pointer",
                              color: "#dc2626",
                              fontWeight: 800,
                              fontSize: 15,
                              transition: "all .2s ease",
                            }}
                          >
                            Déconnexion
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link href="/login" title="Se connecter" className="shop-icon-btn" style={{ textDecoration: "none" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#080a0a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 20, height: 20 }}
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="shop-main">
        {props?.flash?.success ? (
          <div
            className="shop-flash"
            style={{
              background: "#dcfce7",
              border: "1px solid #bbf7d0",
              color: "#166534",
            }}
          >
            {props.flash.success}
          </div>
        ) : null}

        {props?.flash?.error ? (
          <div
            className="shop-flash"
            style={{
              background: "#fee2e2",
              border: "1px solid #fecaca",
              color: "#991b1b",
            }}
          >
            {props.flash.error}
          </div>
        ) : null}

        {children}
      </main>

      <footer className="shop-footer">
        <div className="shop-footer-inner">
          <div className="shop-footer-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <img
                  src="/images/supeco-logo.png"
                  alt="SUPECO"
                  style={{
                    height: 48,
                    width: "auto",
                    borderRadius: 10,
                    padding: 4,
                    background: "#fecc33",
                  }}
                />
              </div>
              <p className="shop-footer-text">
                Votre boutique en ligne pour des produits de qualité,
                accessibles et faciles à commander au quotidien.
              </p>
            </div>

            <div>
              <h4 className="shop-footer-title">Navigation</h4>
              <div className="shop-footer-list">
                <FooterLink href="/">Accueil</FooterLink>
                <FooterLink href="/a-propos">À propos</FooterLink>
                <FooterLink href="/produits">Produits</FooterLink>
                {user ? <FooterLink href="/mes-commandes">Mes commandes</FooterLink> : null}
                <FooterLink href="/contact">Contact</FooterLink>
              </div>
            </div>

            <div>
              <h4 className="shop-footer-title">Contact</h4>
              <div className="shop-footer-list" style={{ color: "rgba(254,204,51,.9)" }}>
                <div>Téléphone : <strong>+221 78 534 79 05</strong></div>
                <div>Email : <strong>contact@supeco.sn</strong></div>
                <div>Adresse : Dakar, Sénégal</div>
                <div>Horaires : Lun–Sam, 08h–20h</div>
              </div>
            </div>

            <div>
              <h4 className="shop-footer-title">Suivez-nous</h4>
              <div className="shop-socials">
                <a href="#" className="shop-social-btn">Facebook</a>
                <a href="#" className="shop-social-btn">Instagram</a>
                <a href="#" className="shop-social-btn">WhatsApp</a>
              </div>
              <p className="shop-footer-text" style={{ marginTop: 12 }}>
                Restez informé de nos nouveautés, promotions et disponibilités.
              </p>
            </div>
          </div>

          <hr className="shop-footer-divider" />

          <div className="shop-footer-bottom">
            <div>© {new Date().getFullYear()} SUPECO — Tous droits réservés.</div>
            <div>
              <a href="/mentions-legales" style={{ color: "#fecc33", textDecoration: "none" }}>
                Mentions légales
              </a>
              <span style={{ opacity: 0.55 }}> • </span>
              <a href="/politique-confidentialite" style={{ color: "#fecc33", textDecoration: "none" }}>
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      style={{
        color: "#080a0a",
        textDecoration: "none",
        padding: "6px 2px",
        fontWeight: 800,
        position: "relative",
        display: "inline-block",
        fontSize: 15,
      }}
    >
      <span style={{ position: "relative" }}>
        {children}
        <span
          style={{
            position: "absolute",
            left: 0,
            bottom: -8,
            height: 3,
            width: active ? "100%" : 0,
            background: "#080a0a",
            borderRadius: 999,
            transition: "width .18s ease",
          }}
        />
      </span>
    </Link>
  );
}

function DropdownLink({ href, children }) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        padding: "13px 14px",
        textDecoration: "none",
        color: "#111827",
        fontWeight: 700,
        fontSize: 15,
        borderRadius: 14,
        transition: "all .18s ease",
        background: "transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#fff7cf";
        e.currentTarget.style.color = "#080a0a";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "#111827";
      }}
    >
      {children}
    </Link>
  );
}

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      style={{
        color: "#fecc33",
        textDecoration: "none",
        opacity: 0.92,
      }}
    >
      {children}
    </Link>
  );
}