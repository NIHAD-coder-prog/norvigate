import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, baseLang, defaultLocale, isLocale, locales } from "@/i18n/config";

/**
 * 1. Language: every page lives under /{locale}/... Requests without a valid prefix are redirected to the visitor's
 *    language: the saved choice (cookie), else the best match in Accept-Language, else English.
 * 2. Host routing: istanbul.* lands on the Istanbul gate instead of the network home page.
 * 3. Security: a fresh nonce per request and a strict Content-Security-Policy. Pages are rendered dynamically so Next
 *    can stamp the nonce on its own scripts. No third-party scripts are allowed; the only external connection is the
 *    Open-Meteo weather API (connect-src).
 */
function negotiate(request: NextRequest): string {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(saved)) return saved;

  const header = request.headers.get("accept-language") || "";
  const wanted = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((x) => x.tag && x.tag !== "*" && Number.isFinite(x.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of wanted) {
    if (isLocale(tag)) return tag;
    const base = baseLang(tag);
    const exact = locales.find((l) => l === base);
    if (exact) return exact;
    const sibling = locales.find((l) => baseLang(l) === base);
    if (sibling) return sibling;
  }
  return defaultLocale;
}

export function buildCsp(nonce: string, dev: boolean): string {
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${dev ? " 'unsafe-eval'" : ""}`,
    `style-src 'self' 'nonce-${nonce}'${dev ? " 'unsafe-inline'" : ""}`,
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self' https://api.open-meteo.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ];
  if (!dev) directives.push("upgrade-insecure-requests");
  return directives.join("; ");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  const cityHost = (request.headers.get("host") || "").toLowerCase().startsWith("istanbul.");

  const nonce = btoa(crypto.randomUUID());
  const csp = buildCsp(nonce, process.env.NODE_ENV !== "production");

  const secure = (res: NextResponse) => {
    res.headers.set("Content-Security-Policy", csp);
    return res;
  };

  if (isLocale(first)) {
    if (cityHost && pathname === `/${first}`) {
      const url = request.nextUrl.clone();
      url.pathname = `/${first}/istanbul`;
      return secure(NextResponse.redirect(url));
    }
    const headers = new Headers(request.headers);
    headers.set("x-nonce", nonce);
    headers.set("x-locale", first);
    headers.set("Content-Security-Policy", csp);
    return secure(NextResponse.next({ request: { headers } }));
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${negotiate(request)}${pathname === "/" ? (cityHost ? "/istanbul" : "") : pathname}`;
  return secure(NextResponse.redirect(url));
}

export const config = {
  // Skip Next internals, API routes, and any path with a file extension (images, fonts, robots.txt, sitemap.xml...).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
