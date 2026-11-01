"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useCart } from "./Providers";
import { Notice } from "@/components/ui";
import { validateBuyer, type BuyerErrors } from "@/store-live/buyer";
import { shippingConfig } from "@/store-live/shipping-config";
import { formatMoney } from "@/lib/format";
import { fmt, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface Q { subtotalMinor: number; shippingMinor: number; totalMinor: number; weightGrams: number; etaDays: [number, number] }
type CountryOption = { code: string; label: string };

/**
 * Live checkout form. Prices shown here come from the server (/api/store/quote); the browser never computes them.
 * On submit the server creates the order, asks the payment provider for a hosted page, and we navigate there.
 * Nothing is reported as paid here: the order status page shows what the server verified.
 */
export function CheckoutForm({ locale, dict, forms, countries, identityRequired, links }: {
  locale: Locale;
  dict: Dictionary["store"];
  forms: Dictionary["forms"];
  countries: CountryOption[];
  identityRequired: boolean;
  links: { terms: string; shipping: string; cart: string };
}) {
  const t = dict.live;
  const cart = useCart();
  const [v, setV] = useState({ name: "", surname: "", email: "", phone: "", identityNumber: "", address: "", city: "", country: "", zip: "", consentSales: false, consentPreInfo: false, consentAllergen: false });
  const [errors, setErrors] = useState<BuyerErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [quote, setQuote] = useState<Q | null>(null);
  const [quoteState, setQuoteState] = useState<"idle" | "loading" | "error">("idle");
  const [quoteErr, setQuoteErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [hp, setHp] = useState("");
  const summary = useRef<HTMLDivElement>(null);
  const lines = useMemo(() => cart.lines.map((l) => ({ productId: l.productId, variantId: l.variantId, qty: l.qty })), [cart.lines]);

  useEffect(() => {
    if (!v.country || !lines.length) { setQuote(null); setQuoteState("idle"); return; }
    const ctl = new AbortController();
    setQuoteState("loading"); setQuoteErr(null);
    fetch("/api/store/quote", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ lines, country: v.country }), signal: ctl.signal })
      .then((r) => r.json())
      .then((j) => {
        if (j.ok) { setQuote(j); setQuoteState("idle"); }
        else { setQuote(null); setQuoteState("error"); setQuoteErr((t.quoteErrors as Record<string, string>)[j.error] ?? (t.serverErrors as Record<string, string>).quote); }
      })
      .catch((e) => { if (e?.name !== "AbortError") { setQuote(null); setQuoteState("error"); setQuoteErr(t.serverErrors.network); } });
    return () => ctl.abort();
  }, [v.country, lines, t]);

  const set = (k: string, val: string | boolean) => setV((x) => ({ ...x, [k]: val }));
  const err = (k: string) => (errors[k] ? (forms.errors as Record<string, string>)[errors[k]] ?? forms.errors.invalid : undefined);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setServerError(null);
    const { errors: ve } = validateBuyer(v, { shipping: shippingConfig, identityRequired });
    setErrors(ve);
    if (Object.keys(ve).length) { summary.current?.focus(); return; }
    if (!quote) { setServerError(quoteErr ?? t.chooseCountry); return; }
    setBusy(true);
    try {
      const r = await fetch("/api/store/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ lines, buyer: v, locale, company_url: hp }) });
      const j = await r.json().catch(() => ({}));
      if (j.ok && typeof j.paymentPageUrl === "string") { window.location.assign(j.paymentPageUrl); return; }
      if (j.errors) setErrors(j.errors);
      setServerError(j.quoteError ? (t.quoteErrors as Record<string, string>)[j.quoteError] : (t.serverErrors as Record<string, string>)[j.error] ?? t.serverErrors.network);
    } catch {
      setServerError(t.serverErrors.network);
    }
    setBusy(false);
  }

  const field = (k: keyof typeof t.fields, type = "text", opts: { half?: boolean; auto?: string; optional?: boolean } = {}) => (
    <div className={`field${opts.half ? "" : " field--full"}`}>
      <label className="field__label" htmlFor={`co-${k}`}>{t.fields[k]}{opts.optional ? null : <span className="field__req" aria-hidden="true"> *</span>}</label>
      <input id={`co-${k}`} className="input" type={type} name={k} value={v[k as keyof typeof v] as string} autoComplete={opts.auto} aria-invalid={errors[k] ? true : undefined} aria-describedby={errors[k] ? `co-${k}-e` : undefined}
        onChange={(e) => set(k, e.target.value)} inputMode={k === "identityNumber" ? "numeric" : undefined} />
      {errors[k] ? <p className="field__error" id={`co-${k}-e`}>{err(k)}</p> : null}
    </div>
  );

  if (!cart.ready) return <p role="status"><span className="spinner" aria-hidden="true" /> {dict.cart.loading}</p>;
  if (!lines.length) return <div className="panel"><h2>{dict.cart.empty}</h2><Link className="btn btn--primary" href={links.cart}>{dict.cart.browse}</Link></div>;

  const errKeys = Object.keys(errors);
  return (
    <form onSubmit={submit} noValidate className="detail-grid" style={{ alignItems: "start" }}>
      <div className="panel">
        {errKeys.length || serverError ? (
          <div className="error-summary" role="alert" tabIndex={-1} ref={summary}>
            <h3>{serverError ? t.errorTitle : t.summaryFix}</h3>
            {serverError ? <p>{serverError} {t.errorNothing}</p> : <ul>{errKeys.map((k) => <li key={k}><a href={`#co-${k === "consent" ? "consentSales" : k}`}>{k === "consent" ? forms.errors.consent : (t.fields as Record<string, string>)[k] ?? k}</a></li>)}</ul>}
          </div>
        ) : null}
        <h2>{t.buyerTitle}</h2>
        <div className="form-grid">
          {field("name", "text", { half: true, auto: "given-name" })}
          {field("surname", "text", { half: true, auto: "family-name" })}
          {field("email", "email", { half: true, auto: "email" })}
          {field("phone", "tel", { half: true, auto: "tel" })}
          {identityRequired || v.country === "TR" ? field("identityNumber", "text", { optional: !identityRequired }) : null}
        </div>
        {identityRequired || v.country === "TR" ? <p className="small muted">{t.identityHelp}</p> : null}
        <h2 style={{ marginBlockStart: "1.5rem" }}>{t.deliveryTitle}</h2>
        <div className="form-grid">
          <div className="field field--full">
            <label className="field__label" htmlFor="co-country">{t.fields.country}<span className="field__req" aria-hidden="true"> *</span></label>
            <select id="co-country" className="select" value={v.country} onChange={(e) => set("country", e.target.value)} aria-invalid={errors.country ? true : undefined}>
              <option value="">{forms.select}</option>
              {countries.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
            </select>
            {errors.country ? <p className="field__error">{err("country")}</p> : null}
          </div>
          {field("address", "text", { auto: "street-address" })}
          {field("city", "text", { half: true, auto: "address-level2" })}
          {field("zip", "text", { half: true, auto: "postal-code", optional: true })}
        </div>
        <div className="hp" aria-hidden="true"><label>Website<input type="text" name="company_url" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} /></label></div>
        <div style={{ display: "grid", gap: ".75rem", marginBlockStart: "1.25rem" }}>
          <label className="checkbox"><input type="checkbox" id="co-consentPreInfo" checked={v.consentPreInfo} onChange={(e) => set("consentPreInfo", e.target.checked)} /><span>{t.consentPreInfo} <Link href={links.terms}>{t.readTerms}</Link></span></label>
          <label className="checkbox"><input type="checkbox" id="co-consentSales" checked={v.consentSales} onChange={(e) => set("consentSales", e.target.checked)} /><span>{t.consentSales} <Link href={links.shipping}>{t.readShipping}</Link></span></label>
          <label className="checkbox"><input type="checkbox" id="co-consentAllergen" checked={v.consentAllergen} onChange={(e) => set("consentAllergen", e.target.checked)} /><span>{t.consentAllergen}</span></label>
          {errors.consent ? <p className="field__error">{forms.errors.consent}</p> : null}
        </div>
      </div>

      <aside className="panel" aria-labelledby="co-summary">
        <h2 id="co-summary">{t.summaryTitle}</h2>
        {!v.country ? <p className="muted">{t.chooseCountry}</p> : null}
        {quoteState === "loading" ? <p role="status"><span className="spinner" aria-hidden="true" /> {t.calculating}</p> : null}
        {quoteState === "error" && quoteErr ? <Notice tone="error" role="alert">{quoteErr}</Notice> : null}
        {quote ? (
          <div aria-live="polite">
            <div className="summary-row"><span>{t.subtotal}</span><span>{formatMoney(quote.subtotalMinor, "TRY", locale)}</span></div>
            <div className="summary-row"><span>{t.shipping}</span><span>{formatMoney(quote.shippingMinor, "TRY", locale)}</span></div>
            <div className="summary-row summary-row--total"><span>{t.total}</span><span>{formatMoney(quote.totalMinor, "TRY", locale)}</span></div>
            <p className="small muted">{fmt(t.eta, { min: quote.etaDays[0], max: quote.etaDays[1] })}</p>
          </div>
        ) : null}
        <button type="submit" className="btn btn--primary" disabled={busy || !quote} style={{ width: "100%", marginBlockStart: "1rem" }}>{busy ? t.paying : t.pay}</button>
        <p className="small muted" style={{ marginBlockStart: ".75rem" }}>{t.payNote}</p>
      </aside>
    </form>
  );
}
