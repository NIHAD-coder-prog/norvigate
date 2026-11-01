"use client";

import { useMemo, useState } from "react";
import { Popover } from "./Popover";
import { useCurrency } from "./Providers";
import { currencyName, currencyOptions } from "@/lib/currency/convert";
import { BASE_CURRENCY, RATES_ATTRIBUTION } from "@/lib/currency/types";
import { formatDate } from "@/lib/format";
import { fmt } from "@/i18n/config";
import { normalize } from "@/lib/normalize";

/** Display-currency picker for indicative prices. Lists every currency the rate provider supplies. */
export function CurrencySwitcher() {
  const { locale, labels, currency, setCurrency, rates, status, ensureRates } = useCurrency();
  const [q, setQ] = useState("");

  const groups = useMemo(() => {
    const codes = rates ? Object.keys(rates.rates) : [BASE_CURRENCY];
    const g = currencyOptions(codes, locale);
    const nq = normalize(q);
    const match = (o: { code: string; name: string }) => !nq || normalize(`${o.code} ${o.name}`).includes(nq);
    return { popular: g.popular.filter(match), others: g.others.filter(match) };
  }, [rates, locale, q]);

  const empty = groups.popular.length + groups.others.length === 0;
  const date = rates?.providerUpdatedAt ? formatDate(rates.providerUpdatedAt, locale) : null;

  const pick = (code: string, close: HTMLElement | null) => {
    setCurrency(code);
    close?.closest("details")?.removeAttribute("open");
  };

  const renderItem = (o: { code: string; name: string }) => (
    <li key={o.code}>
      <button type="button" aria-selected={o.code === currency} onClick={(e) => pick(o.code, e.currentTarget)}>
        <span>{o.name}</span>
        <span className="code-tag">{o.code}</span>
      </button>
    </li>
  );

  return (
    <Popover
      summaryLabel={`${labels.display}: ${currency} (${currencyName(currency, locale)})`}
      summary={<span>{currency}</span>}
      onOpen={() => ensureRates()}
    >
      <h2>{labels.display}</h2>
      <p className="small muted" style={{ margin: "0 0 .6rem" }}>{labels.displayHelp}</p>

      {status === "loading" ? <p role="status" className="small"><span className="spinner" aria-hidden="true" /> {labels.loading}</p> : null}
      {status === "error" ? (
        <div role="alert">
          <p className="small" style={{ margin: "0 0 .4rem" }}><strong>{labels.unavailableTitle}.</strong> {labels.unavailableText}</p>
          <button type="button" className="link-btn" onClick={() => ensureRates(true)}>{labels.retry}</button>
        </div>
      ) : null}

      {rates ? (
        <>
          <label className="visually-hidden" htmlFor="cur-search">{labels.searchCurrency}</label>
          <input id="cur-search" className="input" type="search" placeholder={labels.searchCurrency} value={q} onChange={(e) => setQ(e.target.value)} autoComplete="off" />
          <ul className="popover__list" role="listbox" aria-label={labels.display}>
            {groups.popular.length ? <li className="popover__group" role="presentation">{labels.popular}</li> : null}
            {groups.popular.map(renderItem)}
            {groups.others.length ? <li className="popover__group" role="presentation">{labels.allCurrencies}</li> : null}
            {groups.others.map(renderItem)}
            {empty ? <li className="popover__note" style={{ padding: ".6rem" }}>{labels.noMatch}</li> : null}
          </ul>
          <p className="popover__note">
            {labels.indicative} {date ? fmt(labels.updated, { date }) + ". " : ""}
            {rates.stale && rates.fetchedAt ? fmt(labels.staleNote, { date: formatDate(rates.fetchedAt, locale) }) + " " : ""}
            <a href={RATES_ATTRIBUTION.url} target="_blank" rel="noopener noreferrer">{labels.ratesBy}</a>
          </p>
        </>
      ) : null}
    </Popover>
  );
}
