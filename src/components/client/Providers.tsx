"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { BASE_CURRENCY, type RatesPayload } from "@/lib/currency/types";

/* ------------------------------------------------------------------ cart */
export interface CartLine {
  productId: string;
  variantId: string;
  qty: number;
}

interface CartApi {
  lines: CartLine[];
  /** False until the saved cart has been read, so server and first client render match. */
  ready: boolean;
  count: number;
  add: (productId: string, variantId: string, qty: number) => void;
  setQty: (productId: string, variantId: string, qty: number) => void;
  remove: (productId: string, variantId: string) => void;
  clear: () => void;
}

const CART_KEY = "nv_cart_v1";
const MAX_LINES = 30;
const MAX_QTY = 50;
const CartContext = createContext<CartApi | null>(null);

function validLine(l: unknown): l is CartLine {
  if (!l || typeof l !== "object") return false;
  const { productId, variantId, qty } = l as Record<string, unknown>;
  return typeof productId === "string" && typeof variantId === "string" && Number.isInteger(qty) && (qty as number) >= 1 && (qty as number) <= MAX_QTY;
}

function readCart(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(validLine).slice(0, MAX_LINES) : [];
  } catch {
    return [];
  }
}

function writeCart(lines: CartLine[]) {
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  } catch {
    /* storage unavailable: the cart still works for this page view */
  }
}

/* -------------------------------------------------------------- currency */
type RatesStatus = "idle" | "loading" | "ready" | "error";

interface CurrencyApi {
  locale: Locale;
  labels: Dictionary["currency"];
  currency: string;
  setCurrency: (code: string) => void;
  rates: RatesPayload | null;
  status: RatesStatus;
  ensureRates: (force?: boolean) => void;
}

const CUR_KEY = "nv_currency";
const CurrencyContext = createContext<CurrencyApi | null>(null);

export function Providers({
  locale,
  currencyLabels,
  children,
}: {
  locale: Locale;
  currencyLabels: Dictionary["currency"];
  children: ReactNode;
}) {
  /* cart */
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(readCart());
    setReady(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_KEY) setLines(readCart());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const commit = useCallback((next: CartLine[]) => {
    setLines(next);
    writeCart(next);
  }, []);

  const cart = useMemo<CartApi>(
    () => ({
      lines,
      ready,
      count: lines.reduce((n, l) => n + l.qty, 0),
      add: (productId, variantId, qty) => {
        const current = readCart();
        const i = current.findIndex((l) => l.productId === productId && l.variantId === variantId);
        if (i >= 0) current[i] = { ...current[i], qty: Math.min(MAX_QTY, current[i].qty + qty) };
        else if (current.length < MAX_LINES) current.push({ productId, variantId, qty: Math.min(MAX_QTY, qty) });
        commit(current);
      },
      setQty: (productId, variantId, qty) =>
        commit(lines.map((l) => (l.productId === productId && l.variantId === variantId ? { ...l, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : l))),
      remove: (productId, variantId) => commit(lines.filter((l) => !(l.productId === productId && l.variantId === variantId))),
      clear: () => commit([]),
    }),
    [lines, ready, commit],
  );

  /* currency */
  const [currency, setCurrencyState] = useState(BASE_CURRENCY);
  const [rates, setRates] = useState<RatesPayload | null>(null);
  const [status, setStatus] = useState<RatesStatus>("idle");
  const inflight = useRef(false);

  const ensureRates = useCallback((force = false) => {
    if (inflight.current) return;
    if (!force && status === "ready") return;
    inflight.current = true;
    setStatus("loading");
    fetch("/api/rates", { headers: { accept: "application/json" } })
      .then(async (res) => {
        const json = await res.json().catch(() => null);
        if (res.ok && json?.ok && json.rates) {
          setRates(json as RatesPayload);
          setStatus("ready");
        } else {
          setStatus(rates ? "ready" : "error");
        }
      })
      .catch(() => setStatus(rates ? "ready" : "error"))
      .finally(() => {
        inflight.current = false;
      });
  }, [status, rates]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CUR_KEY);
      if (saved && /^[A-Z]{3}$/.test(saved) && saved !== BASE_CURRENCY) {
        setCurrencyState(saved);
        ensureRates();
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCurrency = useCallback(
    (code: string) => {
      setCurrencyState(code);
      try {
        window.localStorage.setItem(CUR_KEY, code);
      } catch {
        /* ignore */
      }
      if (code !== BASE_CURRENCY) ensureRates();
    },
    [ensureRates],
  );

  const money = useMemo<CurrencyApi>(
    () => ({ locale, labels: currencyLabels, currency, setCurrency, rates, status, ensureRates }),
    [locale, currencyLabels, currency, setCurrency, rates, status, ensureRates],
  );

  return (
    <CurrencyContext.Provider value={money}>
      <CartContext.Provider value={cart}>{children}</CartContext.Provider>
    </CurrencyContext.Provider>
  );
}

export function useCart(): CartApi {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be used inside <Providers>");
  return c;
}

export function useCurrency(): CurrencyApi {
  const c = useContext(CurrencyContext);
  if (!c) throw new Error("useCurrency must be used inside <Providers>");
  return c;
}
