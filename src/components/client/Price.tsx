"use client";

import { formatMoney } from "@/lib/format";
import { convert, formatCurrencyAmount } from "@/lib/currency/convert";
import { BASE_CURRENCY } from "@/lib/currency/types";
import { useCurrency } from "./Providers";

/**
 * Shows the listed (sample) price in Turkish lira and, when the visitor picked another currency and real rates
 * are loaded, an indicative conversion beneath it. If rates are unavailable nothing is invented.
 */
export function Price({ minor, className }: { minor: number; className?: string }) {
  const { locale, currency, rates, status, labels } = useCurrency();
  const listed = formatMoney(minor, BASE_CURRENCY, locale);
  let approx: string | null = null;
  if (currency !== BASE_CURRENCY && status === "ready" && rates) {
    const v = convert(minor / 100, BASE_CURRENCY, currency, rates);
    if (v !== null) approx = formatCurrencyAmount(v, currency, locale);
  }
  return (
    <span className={`price ${className ?? ""}`}>
      <span>{listed}</span>
      {approx ? (
        <span className="price__approx" title={labels.indicative}>
          <span aria-hidden="true">≈ </span>
          {approx}
          <span className="visually-hidden"> ({labels.indicative})</span>
        </span>
      ) : null}
    </span>
  );
}

/** Indicative converted amount only (for totals), or null. */
export function useConverted(minor: number): string | null {
  const { locale, currency, rates, status } = useCurrency();
  if (currency === BASE_CURRENCY || status !== "ready" || !rates) return null;
  const v = convert(minor / 100, BASE_CURRENCY, currency, rates);
  return v === null ? null : formatCurrencyAmount(v, currency, locale);
}
