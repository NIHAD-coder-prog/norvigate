import { NextResponse } from "next/server";

export function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/** Same-origin check for state-changing requests. A cross-site Origin or Sec-Fetch-Site is refused. */
export function sameOrigin(request: Request): boolean {
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin) return true; // non-browser clients; CSRF is a browser-only problem and browsers always send Origin on POST
  try {
    return !!host && new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Client key for rate limiting. Only meaningful behind a proxy that sets x-forwarded-for (the Caddy kit does). Never stored. */
export function clientKey(request: Request): string {
  return (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
}
