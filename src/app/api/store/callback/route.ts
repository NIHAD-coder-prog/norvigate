import { NextResponse } from "next/server";
import { isLocale } from "@/i18n/config";
import { getOrder } from "@/store-live/orders";
import { handleCallback } from "@/store-live/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Payment provider return URL. The POST body is UNTRUSTED: we only read the provider token from it, then ask the provider
 * server-side (handleCallback). The visitor is always redirected (303) to the order status page, which shows the true
 * stored status, never anything read from this request.
 */
export async function POST(request: Request) {
  const url = new URL(request.url);
  const orderId = url.searchParams.get("order") || "";
  const accessToken = url.searchParams.get("t") || "";
  let providerToken = "";
  try {
    const form = await request.formData();
    const t = form.get("token");
    if (typeof t === "string") providerToken = t;
  } catch {
    /* no usable body */
  }
  const result = await handleCallback({ orderId, accessToken, providerToken });
  const order = result.outcome === "rejected" && result.reason === "order" ? null : await getOrder(orderId);
  if (!order) return new NextResponse("Not found", { status: 404 });
  const locale = isLocale(order.locale) ? order.locale : "en";
  const dest = new URL(`/${locale}/istanbul/store/order/${order.id}`, process.env.NEXT_PUBLIC_SITE_URL || url.origin);
  dest.searchParams.set("t", accessToken);
  return NextResponse.redirect(dest, 303);
}

export async function GET() {
  return new NextResponse("Method not allowed", { status: 405 });
}
