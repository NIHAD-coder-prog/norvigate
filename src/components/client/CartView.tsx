"use client";

import Link from "next/link";
import { useState } from "react";
import { InquiryForm } from "./InquiryForm";
import { Price, useConverted } from "./Price";
import { useCart } from "./Providers";
import { ProductArt } from "@/components/ProductArt";
import { Notice } from "@/components/ui";
import type { Product } from "@/data/types";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { fmt } from "@/i18n/config";
import { formatMoney } from "@/lib/format";

export interface CatalogVariant {
  id: string;
  label: string;
  priceMinor: number;
}
export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  motif: Product["motif"];
  categoryId: Product["categoryId"];
  variants: CatalogVariant[];
}

export function CartView({
  catalog,
  locale,
  dict,
  forms,
  storeHref,
  productHref,
  checkoutHref,
}: {
  catalog: CatalogProduct[];
  locale: Locale;
  dict: Dictionary["store"];
  forms: Dictionary["forms"];
  storeHref: string;
  /** Path prefix, e.g. /en/istanbul/store */
  productHref: string;
  /** Set only when live checkout is open. Otherwise the cart sends an order REQUEST (no payment). */
  checkoutHref?: string;
}) {
  const cart = useCart();
  const [done, setDone] = useState<{ id: string; n: number } | null>(null);
  const t = dict.cart;

  const rows = cart.lines.flatMap((l) => {
    const p = catalog.find((c) => c.id === l.productId);
    const v = p?.variants.find((x) => x.id === l.variantId);
    return p && v ? [{ line: l, p, v }] : [];
  });
  const stale = cart.lines.length - rows.length;
  const subtotal = rows.reduce((n, r) => n + r.v.priceMinor * r.line.qty, 0);
  const approx = useConverted(subtotal);
  const itemCount = rows.reduce((n, r) => n + r.line.qty, 0);

  if (done) {
    return (
      <div className="notice notice--success" role="status">
        <div>
          <h2>{forms.success.title}</h2>
          <p>{fmt(t.successSummary, { n: done.n })} {forms.success.body}</p>
          <p><strong>{forms.success.requestId}:</strong> <span dir="ltr" className="code-tag">{done.id}</span></p>
          <Link className="btn btn--outline btn--small" href={storeHref}>{t.browse}</Link>
        </div>
      </div>
    );
  }

  if (!cart.ready) {
    return <p role="status"><span className="spinner" aria-hidden="true" /> {t.loading}</p>;
  }

  if (rows.length === 0) {
    return (
      <div className="panel" style={{ textAlign: "center" }}>
        <h2>{t.empty}</h2>
        <p className="muted">{t.emptyHelp}</p>
        {stale > 0 ? <Notice tone="warn" role="status">{forms.errors.cart as string}</Notice> : null}
        <Link className="btn btn--primary" href={storeHref}>{t.browse}</Link>
        {stale > 0 ? (
          <p><button type="button" className="link-btn" onClick={cart.clear}>{t.clear}</button></p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="detail-grid" style={{ alignItems: "start" }}>
      <section aria-labelledby="cart-items">
        <h2 id="cart-items" className="visually-hidden">{t.title}</h2>
        {stale > 0 ? <Notice tone="warn" role="status">{forms.errors.cart as string}</Notice> : null}
        <div>
          {rows.map(({ line, p, v }) => (
            <div className="cart-line" key={`${line.productId}:${line.variantId}`}>
              <ProductArt product={p} small />
              <div className="cart-line__info">
                <h3><Link href={`${productHref}/${p.slug}`}>{p.name}</Link></h3>
                <p className="small muted" style={{ margin: 0 }}>{v.label}</p>
                <Price minor={v.priceMinor} />
              </div>
              <div className="cart-line__controls">
                <div className="qty" role="group" aria-label={`${t.lineTotal}: ${p.name}`}>
                  <button type="button" aria-label={t.decrease} onClick={() => cart.setQty(line.productId, line.variantId, line.qty - 1)} disabled={line.qty <= 1}>−</button>
                  <output aria-live="polite">{line.qty}</output>
                  <button type="button" aria-label={t.increase} onClick={() => cart.setQty(line.productId, line.variantId, line.qty + 1)}>+</button>
                </div>
                <span><span className="muted small">{t.lineTotal}: </span><strong>{formatMoney(v.priceMinor * line.qty, "TRY", locale)}</strong></span>
                <button type="button" className="link-btn" onClick={() => cart.remove(line.productId, line.variantId)}>{t.remove}</button>
              </div>
            </div>
          ))}
        </div>
        <p><button type="button" className="link-btn" onClick={cart.clear}>{t.clear}</button></p>
      </section>

      <aside aria-labelledby="cart-summary">
        <div className="panel">
          <h2 id="cart-summary">{t.summaryTitle}</h2>
          <div className="summary-row"><span>{t.items}</span><span>{itemCount}</span></div>
          <div className="summary-row"><span>{checkoutHref ? dict.live.subtotal : t.subtotal}</span><span><strong>{formatMoney(subtotal, "TRY", locale)}</strong>{approx ? <><br /><span className="small muted">≈ {approx}</span></> : null}</span></div>
          {checkoutHref ? (
            <>
              <p className="small muted">{dict.live.bannerText}</p>
              <Link className="btn btn--primary" href={checkoutHref} style={{ width: "100%" }}>{dict.live.proceed}</Link>
            </>
          ) : (
            <>
              <div className="summary-row"><span>{t.shipping}</span><span>{t.shippingValue}</span></div>
              <div className="summary-row"><span>{t.taxes}</span><span>{t.taxesValue}</span></div>
              <div className="summary-row summary-row--total"><span>{t.total}</span><span>{t.totalValue}</span></div>
              <p className="small muted">{t.summaryNote}</p>
            </>
          )}
        </div>
      </aside>

      {checkoutHref ? null : <section aria-labelledby="order-form" className="panel" style={{ gridColumn: "1 / -1" }}>
        <h2 id="order-form">{t.formTitle}</h2>
        <p className="muted">{t.formLead}</p>
        <Notice tone="warn">{t.international}</Notice>
        <InquiryForm
          kind="order"
          locale={locale}
          dict={forms}
          extra={() => ({ lines: cart.lines })}
          onSuccess={(id) => {
            setDone({ id, n: itemCount });
            cart.clear();
          }}
        />
      </section>}
    </div>
  );
}
