import { json, sameOrigin, clientKey } from "@/lib/http";
import { rateLimited } from "@/lib/rate-limit";
import { quote } from "@/store-live/pricing";
import { readiness, sellableProducts, activeShipping, storeConfig } from "@/store-live/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Server-computed price, weight and shipping for the cart and destination. The browser only displays it. */
export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ ok: false, error: "forbidden" }, 403);
  if (rateLimited(`quote:${clientKey(request)}`, 60, 10 * 60 * 1000)) return json({ ok: false, error: "rateLimited" }, 429);
  let body: { lines?: unknown; country?: unknown };
  try { body = JSON.parse(await request.text()); } catch { return json({ ok: false, error: "badRequest" }, 400); }
  const config = storeConfig();
  if (!readiness(config).ready) return json({ ok: false, error: "closed" }, 409);
  const country = typeof body.country === "string" ? body.country : "";
  const q = quote({ lines: body.lines, country }, { products: sellableProducts(config), shipping: activeShipping(config), allowSample: config.allowSample && !config.production });
  if (!q.ok) return json({ ok: false, error: q.error }, 422);
  const { subtotalMinor, shippingMinor, totalMinor, weightGrams, etaDays, currency } = q.quote;
  return json({ ok: true, subtotalMinor, shippingMinor, totalMinor, weightGrams, etaDays, currency });
}
