import "server-only";
import { collections } from "@/data";
import type { DynamicSource } from "./forms";

/** Allowed values for data-driven form selects. Server side. */
export function getDynamicOptions(): Record<DynamicSource, string[]> {
  return {
    providerCategories: collections.providerCategories.map((c) => c.id),
    travelServices: collections.travelServices.map((s) => s.slug),
  };
}

export interface OrderLineInput {
  productId: string;
  variantId: string;
  qty: number;
}

export interface StoredOrderLine extends OrderLineInput {
  name: string;
  variant: string;
  /** Snapshot of SAMPLE data at request time. Not a quote. */
  samplePriceMinor: number;
  currency: string;
}

/** Validates order lines against the catalogue and returns trusted snapshots (names and prices come from the server). */
export function resolveOrderLines(lines: unknown): { ok: true; lines: StoredOrderLine[] } | { ok: false } {
  if (!Array.isArray(lines) || lines.length === 0 || lines.length > 30) return { ok: false };
  const out: StoredOrderLine[] = [];
  const seen = new Set<string>();
  for (const l of lines) {
    if (!l || typeof l !== "object") return { ok: false };
    const { productId, variantId, qty } = l as Record<string, unknown>;
    if (typeof productId !== "string" || typeof variantId !== "string" || typeof qty !== "number") return { ok: false };
    if (!Number.isInteger(qty) || qty < 1 || qty > 50) return { ok: false };
    const key = `${productId}:${variantId}`;
    if (seen.has(key)) return { ok: false };
    seen.add(key);
    const p = collections.products.find((x) => x.id === productId);
    const v = p?.variants.find((x) => x.id === variantId);
    if (!p || !v) return { ok: false };
    out.push({
      productId,
      variantId,
      qty,
      name: p.name.en,
      variant: v.label.en,
      samplePriceMinor: v.priceMinor,
      currency: v.currency,
    });
  }
  return { ok: true, lines: out };
}
