import React, { useMemo } from "react";
import { router } from "@inertiajs/react";
import ShopLayout from "@/Layouts/ShopLayout";

export default function Products({ products, categories, currentCategory, q }) {
  const items = products?.data ?? [];

  const onSearch = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    router.get(
      "/produits",
      {
        q: (form.get("q") || "").toString(),
        category: (form.get("category") || "").toString(),
      },
      { preserveScroll: true, preserveState: true }
    );
  };

  const fmt = useMemo(
    () => (n) => new Intl.NumberFormat("fr-FR").format(Number(n || 0)),
    []
  );

  return (
    <ShopLayout title="Catalogue">
      <div style={{ background: "#f7f7f5" }}>
        <style>{`
          .products-shell {
            max-width: 1220px;
            margin: 0 auto;
            padding: 24px 18px 42px;
          }

          .products-head {
            margin-bottom: 18px;
          }

          .products-title {
            margin: 0 0 8px;
            font-size: clamp(26px, 3vw, 36px);
            font-weight: 700;
            letter-spacing: -.02em;
            color: #080a0a;
          }

          .products-subtitle {
            margin: 0;
            color: #5d6470;
            font-size: 15px;
            line-height: 1.7;
            max-width: 760px;
          }

          .products-filter {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            align-items: center;
            margin-bottom: 24px;
            background: #fff;
            border: 1px solid rgba(8,10,10,.06);
            border-radius: 20px;
            padding: 14px;
            box-shadow:
              0 12px 24px rgba(0,0,0,.04),
              0 3px 8px rgba(0,0,0,.02);
          }

          .products-input,
          .products-select {
            border: 1px solid #e5e7eb;
            border-radius: 14px;
            background: #fff;
            outline: none;
            font-size: 14px;
            color: #080a0a;
            transition: all .2s ease;
          }

          .products-input {
            flex: 1 1 280px;
            padding: 12px 14px;
          }

          .products-select {
            flex: 0 0 240px;
            padding: 12px 14px;
          }

          .products-input:focus,
          .products-select:focus {
            border-color: rgba(254, 201, 3, .75);
            box-shadow: 0 0 0 4px rgba(254, 201, 3, .16);
          }

          .products-btn {
            background: #080a0a;
            color: #fec903;
            padding: 12px 16px;
            border-radius: 14px;
            border: none;
            font-weight: 800;
            cursor: pointer;
            white-space: nowrap;
            transition: transform .2s ease, box-shadow .2s ease;
            box-shadow: 0 10px 18px rgba(0,0,0,.10);
          }

          .products-btn:hover {
            transform: translateY(-1px);
          }

          .products-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 18px;
          }

          .product-card {
            background: #fff;
            border: 1px solid rgba(8,10,10,.06);
            border-radius: 22px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            min-height: 390px;
            box-shadow:
              0 12px 24px rgba(0,0,0,.05),
              0 3px 8px rgba(0,0,0,.02);
            transition: transform .25s ease, box-shadow .25s ease;
          }

          .product-card:hover {
            transform: translateY(-5px);
            box-shadow:
              0 22px 38px rgba(0,0,0,.08),
              0 8px 16px rgba(0,0,0,.04);
          }

          .product-media {
            position: relative;
            padding: 12px 12px 0;
          }

          .product-image-wrap {
            border-radius: 18px;
            overflow: hidden;
            background: linear-gradient(180deg, #fffdf2 0%, #f4f4f4 100%);
            border: 1px solid #ececec;
          }

          .product-image {
            width: 100%;
            height: 190px;
            object-fit: cover;
            display: block;
          }

          .product-placeholder {
            height: 190px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6b7280;
            font-weight: 700;
            font-size: 13px;
          }

          .product-badge {
            position: absolute;
            top: 22px;
            left: 22px;
            background: rgba(8,10,10,.88);
            color: #fec903;
            border-radius: 999px;
            padding: 7px 12px;
            font-size: 12px;
            font-weight: 800;
            box-shadow: 0 8px 18px rgba(0,0,0,.12);
          }

          .product-body {
            padding: 16px 16px 18px;
            display: flex;
            flex-direction: column;
            flex: 1;
          }

          .product-name {
            margin: 0 0 10px;
            font-size: 16px;
            font-weight: 700;
            line-height: 1.35;
            color: #080a0a;
            min-height: 44px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .product-price-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            margin-bottom: 14px;
          }

          .product-price {
            margin: 0;
            font-size: 19px;
            font-weight: 800;
            color: #080a0a;
          }

          .product-status {
            font-size: 12px;
            font-weight: 700;
            color: #5d6470;
            background: #fff8d7;
            border: 1px solid rgba(254, 201, 3, .34);
            padding: 6px 10px;
            border-radius: 999px;
          }

          .product-spacer {
            flex: 1;
          }

          .product-cart-btn {
            width: 100%;
            background: #080a0a;
            color: #fec903;
            padding: 12px 14px;
            border-radius: 14px;
            border: none;
            font-weight: 800;
            cursor: pointer;
            transition: transform .2s ease, box-shadow .2s ease;
            box-shadow: 0 10px 18px rgba(0,0,0,.10);
          }

          .product-cart-btn:hover {
            transform: translateY(-1px);
          }

          .products-empty {
            background: #fff;
            border: 1px solid rgba(8,10,10,.06);
            border-radius: 20px;
            padding: 28px 20px;
            text-align: center;
            color: #5d6470;
            box-shadow:
              0 12px 24px rgba(0,0,0,.04),
              0 3px 8px rgba(0,0,0,.02);
          }

          .pagination-wrap {
            margin-top: 22px;
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
          }

          .pagination-btn {
            padding: 9px 13px;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
            font-weight: 700;
            cursor: pointer;
            transition: all .2s ease;
          }

          .pagination-btn.active {
            background: #080a0a;
            color: #fec903;
            border-color: #080a0a;
          }

          .pagination-btn.inactive {
            background: #fff;
            color: #111827;
          }

          .pagination-btn:hover {
            transform: translateY(-1px);
          }

          @media (max-width: 1180px) {
            .products-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
          }

          @media (max-width: 900px) {
            .products-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .products-select {
              flex: 1 1 220px;
            }
          }

          @media (max-width: 640px) {
            .products-shell {
              padding: 20px 14px 34px;
            }

            .products-grid {
              grid-template-columns: 1fr;
            }

            .products-filter {
              padding: 12px;
            }

            .products-btn {
              width: 100%;
            }

            .product-image,
            .product-placeholder {
              height: 220px;
            }
          }
        `}</style>

        <div className="products-shell">
          <div className="products-head">
            <h1 className="products-title">Catalogue</h1>
            <p className="products-subtitle">
              Parcourez nos produits, filtrez par catégorie et trouvez rapidement
              ce dont vous avez besoin.
            </p>
          </div>

          <form onSubmit={onSearch} className="products-filter">
            <input
              name="q"
              defaultValue={q || ""}
              placeholder="Rechercher un produit..."
              className="products-input"
            />

            <select
              name="category"
              defaultValue={currentCategory || ""}
              className="products-select"
            >
              <option value="">Toutes catégories</option>
              {(categories || []).map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            <button type="submit" className="products-btn">
              Filtrer
            </button>
          </form>

          {items.length > 0 ? (
            <div className="products-grid">
              {items.map((p) => (
                <div key={p.id} className="product-card">
                  <div className="product-media">
                    <div className="product-badge">Produit</div>

                    <div className="product-image-wrap">
                      {!!p.image ? (
                        <img
                          src={`/storage/${p.image}`}
                          alt={p.name}
                          className="product-image"
                          loading="lazy"
                        />
                      ) : (
                        <div className="product-placeholder">
                          Image indisponible
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="product-body">
                    <div
                      className="product-name"
                      title={p.name}
                    >
                      {p.name}
                    </div>

                    <div className="product-price-row">
                      <p className="product-price">{fmt(p.price)} F CFA</p>
                      <span className="product-status">Disponible</span>
                    </div>

                    <div className="product-spacer" />

                    <button
                      onClick={() =>
                        router.post(`/panier/ajouter/${p.id}`, {}, { preserveScroll: true })
                      }
                      className="product-cart-btn"
                    >
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="products-empty">
              Aucun produit ne correspond à votre recherche.
            </div>
          )}

          <div className="pagination-wrap">
            {(products?.links || []).map((l, idx) => {
              if (!l.url) return null;
              const label = l.label.replace("&laquo;", "«").replace("&raquo;", "»");

              return (
                <button
                  key={idx}
                  onClick={() =>
                    router.visit(l.url, { preserveScroll: true, preserveState: true })
                  }
                  dangerouslySetInnerHTML={{ __html: label }}
                  className={`pagination-btn ${l.active ? "active" : "inactive"}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </ShopLayout>
  );
}