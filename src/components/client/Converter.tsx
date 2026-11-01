"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/ui";
import { useCurrency } from "./Providers";
import { convert, currencyName, currencyOptions, formatCurrencyAmount, formatRate, rateBetween } from "@/lib/currency/convert";
import { RATES_ATTRIBUTION } from "@/lib/currency/types";
import { formatDate } from "@/lib/format";
import { fmt } from "@/i18n/config";

export function Converter() {
  const { locale, labels, rates, status, ensureRates } = useCurrency();
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("TRY");

  useEffect(() => {
    ensureRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const codes = useMemo(() => (rates ? Object.keys(rates.rates) : []), [rates]);
  const groups = useMemo(() => currencyOptions(codes, locale), [codes, locale]);

  if (status === "loading" || status === "idle") {
    return <p role="status"><span className="spinner" aria-hidden="true" /> {labels.loading}</p>;
  }
  if (!rates) {
    return (
      <div className="notice notice--error" role="alert">
        <Icon name="alert" />
        <div>
          <h2>{labels.unavailableTitle}</h2>
          <p>{labels.unavailableText}</p>
          <button type="button" className="btn btn--outline btn--small" onClick={() => ensureRates(true)}>{labels.retry}</button>
        </div>
      </div>
    );
  }

  const n = Number(amount.replace(",", "."));
  const valid = amount.trim() !== "" && Number.isFinite(n) && n >= 0;
  const result = valid ? convert(n, from, to, rates) : null;
  const unit = rateBetween(from, to, rates);
  const missing = [from, to].find((c) => rates.rates[c] === undefined);

  const options = (
    <>
      <optgroup label={labels.popular}>
        {groups.popular.map((o) => <option key={o.code} value={o.code}>{o.code} · {o.name}</option>)}
      </optgroup>
      <optgroup label={labels.allCurrencies}>
        {groups.others.map((o) => <option key={o.code} value={o.code}>{o.code} · {o.name}</option>)}
      </optgroup>
    </>
  );

  return (
    <div className="converter">
      <div className="converter__row">
        <div className="field">
          <label className="field__label" htmlFor="cv-amount">{labels.amount}</label>
          <input id="cv-amount" className="input" dir="ltr" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} aria-invalid={!valid ? true : undefined} />
        </div>
      </div>
      <div className="converter__row">
        <div className="field">
          <label className="field__label" htmlFor="cv-from">{labels.from}</label>
          <select id="cv-from" className="select" value={from} onChange={(e) => setFrom(e.target.value)}>{options}</select>
        </div>
        <button type="button" className="btn btn--outline swap" aria-label={labels.swap} onClick={() => { setFrom(to); setTo(from); }}>
          <Icon name="swap" />
        </button>
        <div className="field">
          <label className="field__label" htmlFor="cv-to">{labels.to}</label>
          <select id="cv-to" className="select" value={to} onChange={(e) => setTo(e.target.value)}>{options}</select>
        </div>
      </div>

      <div className="panel" aria-live="polite">
        <p className="small muted" style={{ margin: 0 }}>{labels.result}</p>
        {missing ? (
          <p>{fmt(labels.notSupported, { code: missing })}</p>
        ) : result !== null ? (
          <>
            <p className="converter__result" dir="auto">
              {formatCurrencyAmount(n, from, locale)} = {formatCurrencyAmount(result, to, locale)}
            </p>
            {unit !== null ? (
              <p className="small" dir="auto">{fmt(labels.rateLine, { from, to, rate: formatRate(unit, locale) })} <span className="muted">({currencyName(from, locale)} → {currencyName(to, locale)})</span></p>
            ) : null}
          </>
        ) : (
          <p>{(labels as Record<string, string>).amount}</p>
        )}
      </div>

      <p className="small muted">
        {labels.daily} {rates.providerUpdatedAt ? fmt(labels.updated, { date: formatDate(rates.providerUpdatedAt, locale) }) + ". " : ""}
        {rates.stale ? fmt(labels.staleNote, { date: formatDate(rates.fetchedAt, locale) }) + " " : ""}
        {labels.disclaimer}{" "}
        <a href={RATES_ATTRIBUTION.url} target="_blank" rel="noopener noreferrer">{labels.ratesBy}</a>
      </p>
    </div>
  );
}
