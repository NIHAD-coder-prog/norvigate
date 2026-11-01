import type { Product } from "@/data/types";
import type { ShippingConfig, ShippingZone } from "./shipping-config";

export type QuoteError = "empty" | "badLine" | "unknownProduct" | "notForSale" | "destination" | "tooHeavy";

export interface QuoteLine {
  productId: string;
  variantId: string;
  qty: number;
  name: string;
  variant: string;
  unitMinor: number;
  weightGrams: number;
}

export interface Quote {
  lines: QuoteLine[];
  weightGrams: number;
  subtotalMinor: number;
  shippingMinor: number;
  totalMinor: number;
  currency: "TRY";
  zoneId: string;
  etaDays: [number, number];
}

export function zoneFor(shipping: ShippingConfig, country: string): ShippingZone | undefined {
  const c = country.toUpperCase();
  return shipping.zones.find((z) => z.countries.includes(c));
}

export function shippableCountries(shipping: ShippingConfig): string[] {
  return shipping.zones.flatMap((z) => z.countries);
}

/** A product can be shipped to a country only when an explicit rule (or the "*" rule) says "enabled". Explicit rules win. */
export function destinationEnabled(product: Product, country: string): boolean {
  const c = country.toUpperCase();
  const rule = product.shipping.destinations.find((r) => r.country === c) ?? product.shipping.destinations.find((r) => r.country === "*");
  return rule?.status === "enabled";
}

export function shippingFor(zone: ShippingZone, weightGrams: number, packagingGrams: number): number | null {
  const w = weightGrams + packagingGrams;
  if (w > zone.maxGrams) return null;
  const band = zone.bands.find((b) => w <= b.upToGrams);
  if (band) return band.priceMinor;
  const last = zone.bands[zone.bands.length - 1];
  const extraKg = Math.ceil((w - last.upToGrams) / 1000);
  return last.priceMinor + extraKg * zone.perExtraKgMinor;
}

/**
 * Prices, weights and shipping are ALWAYS computed here from the catalogue. Nothing the browser sends (names, prices,
 * weights, shipping) is trusted: only product id, variant id and quantity are read from it.
 */
export function quote(
  input: { lines: unknown; country: string },
  ctx: { products: Product[]; shipping: ShippingConfig; allowSample: boolean },
): { ok: true; quote: Quote } | { ok: false; error: QuoteError } {
  const raw = input.lines;
  if (!Array.isArray(raw) || raw.length === 0) return { ok: false, error: "empty" };
  if (raw.length > 30) return { ok: false, error: "badLine" };
  const zone = zoneFor(ctx.shipping, input.country);
  if (!zone) return { ok: false, error: "destination" };

  const lines: QuoteLine[] = [];
  const seen = new Set<string>();
  for (const l of raw) {
    if (!l || typeof l !== "object") return { ok: false, error: "badLine" };
    const { productId, variantId, qty } = l as Record<string, unknown>;
    if (typeof productId !== "string" || typeof variantId !== "string" || typeof qty !== "number") return { ok: false, error: "badLine" };
    if (!Number.isInteger(qty) || qty < 1 || qty > 50) return { ok: false, error: "badLine" };
    const key = `${productId}:${variantId}`;
    if (seen.has(key)) return { ok: false, error: "badLine" };
    seen.add(key);
    const p = ctx.products.find((x) => x.id === productId);
    const v = p?.variants.find((x) => x.id === variantId);
    if (!p || !v) return { ok: false, error: "unknownProduct" };
    if (p.dataStatus !== "verified" && !ctx.allowSample) return { ok: false, error: "notForSale" };
    if (!destinationEnabled(p, input.country)) return { ok: false, error: "destination" };
    if (!Number.isInteger(v.priceMinor) || v.priceMinor <= 0 || !(v.weightGrams > 0)) return { ok: false, error: "notForSale" };
    lines.push({ productId, variantId, qty, name: p.name.en, variant: v.label.en, unitMinor: v.priceMinor, weightGrams: v.weightGrams });
  }

  const weightGrams = lines.reduce((n, l) => n + l.weightGrams * l.qty, 0);
  const shippingMinor = shippingFor(zone, weightGrams, ctx.shipping.packagingGrams);
  if (shippingMinor === null) return { ok: false, error: "tooHeavy" };
  const subtotalMinor = lines.reduce((n, l) => n + l.unitMinor * l.qty, 0);
  return {
    ok: true,
    quote: { lines, weightGrams: weightGrams + ctx.shipping.packagingGrams, subtotalMinor, shippingMinor, totalMinor: subtotalMinor + shippingMinor, currency: "TRY", zoneId: zone.id, etaDays: zone.etaDays },
  };
}
