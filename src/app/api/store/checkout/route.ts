import { json, sameOrigin, clientKey } from "@/lib/http";
import { rateLimited } from "@/lib/rate-limit";
import { isLocale } from "@/i18n/config";
import { startCheckout } from "@/store-live/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = 32 * 1024;

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ ok: false, error: "forbidden" }, 403);
  if (!(request.headers.get("content-type") || "").includes("application/json")) return json({ ok: false, error: "unsupported" }, 415);
  const ip = clientKey(request);
  if (rateLimited(`checkout:${ip}`, 10, 10 * 60 * 1000)) return json({ ok: false, error: "rateLimited" }, 429);
  const text = await request.text();
  if (text.length > MAX) return json({ ok: false, error: "tooLarge" }, 413);
  let body: { lines?: unknown; buyer?: unknown; locale?: unknown; company_url?: unknown };
  try { body = JSON.parse(text); } catch { return json({ ok: false, error: "badRequest" }, 400); }
  if (typeof body.company_url === "string" && body.company_url.trim()) return json({ ok: false, error: "badRequest" }, 400);
  const buyer = body.buyer && typeof body.buyer === "object" && !Array.isArray(body.buyer) ? (body.buyer as Record<string, unknown>) : {};
  const locale = typeof body.locale === "string" && isLocale(body.locale) ? body.locale : "en";

  const r = await startCheckout({ lines: body.lines, buyer, locale }, { clientIp: ip === "local" ? undefined : ip });
  if (!r.ok) {
    const status = r.error === "closed" ? 409 : r.error === "provider" ? 502 : 422;
    return json({ ok: false, error: r.error, errors: r.errors, quoteError: r.quoteError }, status);
  }
  // The access token is NOT returned: it travels only inside the callback URL given to the provider.
  return json({ ok: true, orderId: r.orderId, paymentPageUrl: r.paymentPageUrl });
}

export async function GET() {
  return json({ ok: false, error: "methodNotAllowed" }, 405);
}
