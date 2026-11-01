import { NextResponse } from "next/server";
import { loadStoreConfig } from "@/store-live/config";
import { setMockResult } from "@/store-live/mock-provider";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** TEST-ONLY stand-in for the provider's hosted payment page. Returns 404 unless the mock provider is allowed. */
const enabled = () => {
  const c = loadStoreConfig();
  return c.provider === "mock" && c.allowMock && !c.production;
};
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function GET(request: Request) {
  if (!enabled()) return new NextResponse("Not found", { status: 404 });
  const u = new URL(request.url);
  const token = u.searchParams.get("token") || "";
  const cb = u.searchParams.get("cb") || "";
  const html = `<!doctype html><meta charset="utf-8"><title>Mock payment (test only)</title>
<body>
<h1>Mock payment page</h1><p><strong>Test only.</strong> This stands in for the provider's hosted page. No money moves.</p>
<form method="post" action="/api/store/mock-pay"><input type="hidden" name="token" value="${esc(token)}"><input type="hidden" name="cb" value="${esc(cb)}">
<button name="result" value="SUCCESS" id="pay">Pay (success)</button> <button name="result" value="FAILURE" id="fail">Fail</button></form></body>`;
  return new NextResponse(html, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
}

export async function POST(request: Request) {
  if (!enabled()) return new NextResponse("Not found", { status: 404 });
  const form = await request.formData();
  const token = String(form.get("token") || "");
  const cb = String(form.get("cb") || "");
  const result = form.get("result") === "SUCCESS" ? "SUCCESS" : "FAILURE";
  const site = (process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin).replace(/\/+$/, "");
  if (!cb.startsWith(`${site}/api/store/callback?`) || !(await setMockResult(token, result))) return new NextResponse("Bad request", { status: 400 });
  // 307 keeps the method and body, so the browser POSTs the same form (with `token`) to the callback, like iyzico does
  return NextResponse.redirect(cb, 307);
}
