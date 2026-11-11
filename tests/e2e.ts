/**
 * End-to-end tests in a real browser (Chromium via Playwright).
 *   npm run build && npm run test:e2e
 * Starts its own servers on free ports with a throw-away data folder:
 *   A) the PRODUCTION build (`next start`)  : every page x 5 languages x 3 widths, 404s, security headers, forms, API guards
 *   B) a DEV server with the store in test mode (mock payment provider, fake seller/product): the full checkout path
 * Needs: `npx playwright install chromium` once. Live weather, live rates and the real iyzico sandbox are NOT reachable from CI.
 * Writes tests/e2e-report.json.
 */
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import http from "node:http";
import { spawn, type ChildProcess } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { collections } from "../src/data";
import { formSpecs, type FormKind } from "../src/lib/forms";

const LOCALES = ["en", "tr", "ar", "es", "fr"] as const;
const WIDTHS = [390, 768, 1440] as const;
const PORT_A = 3100;
const PORT_B = 3200;
const dataA = mkdtempSync(path.join(tmpdir(), "nv-e2e-a-"));
const dataB = mkdtempSync(path.join(tmpdir(), "nv-e2e-b-"));

const results: { name: string; ok: boolean; detail?: string }[] = [];
function check(name: string, ok: boolean, detail = "") {
  results.push({ name, ok, detail: ok ? undefined : detail });
  if (!ok) console.log(`  FAIL ${name} ${detail}`);
}

const procs: ChildProcess[] = [];
function start(cmd: string, args: string[], env: Record<string, string>): ChildProcess {
  const p = spawn(cmd, args, { env: { ...process.env, ...env }, stdio: ["ignore", "pipe", "pipe"], detached: true });
  p.stdout?.on("data", () => undefined);
  p.stderr?.on("data", () => undefined);
  procs.push(p);
  return p;
}
async function waitFor(url: string, ms = 120000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    try { const r = await fetch(url); if (r.status < 500) return; } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`server did not start: ${url}`);
}

const staticPaths = ["", "/cities", "/about", "/contact", "/privacy", "/terms", "/cookies", "/currency",
  "/istanbul", "/istanbul/services", "/istanbul/experiences", "/istanbul/travel", "/istanbul/flights", "/istanbul/hotels",
  "/istanbul/translation", "/istanbul/tools", "/istanbul/guide", "/istanbul/premium", "/istanbul/store", "/istanbul/store/cart",
  "/istanbul/store/terms", "/istanbul/store/shipping-returns", "/istanbul/faq", "/istanbul/search", "/istanbul/search?q=translation",
  "/istanbul/list-your-business"];
const dynamicPaths = [
  `/istanbul/services/${collections.providers[0].slug}`,
  `/istanbul/travel/${collections.travelServices[0].slug}`,
  `/istanbul/store/${collections.products[0].slug}`,
];

/** Console messages that are expected in a sandbox with no internet. Anything else counts as an error.
 * /api/rates returns 503 here (no live Exchange Rate API in sandbox) — this shows as a fetch error in
 * the /currency page. It is expected; the page handles it gracefully and shows an honest error state. */
/** The inline-style CSP message comes from the Next DEV server (server B only); the production server (A) never emits it across the whole page matrix. */
const ignorable = (t: string) => /open-meteo|api\/rates|_rsc=.*ERR_ABORTED|Failed to load resource: the server responded with a status of 503|Applying inline style violates the following Content Security Policy|ERR_(NAME_NOT_RESOLVED|INTERNET_DISCONNECTED|CONNECTION|TUNNEL|PROXY)|Failed to load resource.*(open-meteo|api\/rates|net::)/i.test(t);
/** Response failures that are expected in a no-internet sandbox. */
const ignorableResponse = (url: string, status: number) =>
  (url.includes("/api/rates") && status === 503) ||
  url.includes("open-meteo.com");

async function newPage(ctx: BrowserContext, errors: string[]) {
  const page = await ctx.newPage();
  page.on("console", (m) => { if (m.type() === "error" && !ignorable(m.text())) errors.push(`console: ${m.text()}`); });
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("requestfailed", (req) => {
    const url = req.url(); const err = req.failure()?.errorText ?? "";
    if (err.includes("ERR_ABORTED") && url.includes("_rsc=")) return; // Next prefetch cancelled by navigation: benign
    if (!ignorable(url) && !ignorable(err)) errors.push(`netfail: ${url.slice(0, 80)} ${err}`);
  });
  page.on("response", (resp) => {
    if (!resp.ok() && !ignorableResponse(resp.url(), resp.status())) {
      // Only flag non-expected non-ok responses from our own origin (asset failures etc.)
      const url = resp.url();
      if (url.includes("localhost") && resp.status() >= 500) errors.push(`response ${resp.status()}: ${url.slice(0, 80)}`);
    }
  });
  return page;
}

async function pageMatrix(browser: Browser, base: string) {
  console.log("A1  page matrix");
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    for (const l of LOCALES) {
      for (const p of [...staticPaths, ...dynamicPaths]) {
        const errors: string[] = [];
        const page = await newPage(ctx, errors);
        const url = `${base}/${l}${p}`;
        const res = await page.goto(url, { waitUntil: "load" }).catch((e) => { errors.push(String(e)); return null; });
        await page.waitForTimeout(150);
        const info = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth - window.innerWidth,
          h1: document.querySelectorAll("h1").length,
          main: !!document.querySelector("main"),
          lang: document.documentElement.lang,
          dir: document.documentElement.dir,
          noAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length,
          emptyBtn: [...document.querySelectorAll("button")].filter((b) => !(b.textContent || "").trim() && !b.getAttribute("aria-label") && !b.getAttribute("title") && !b.querySelector("[aria-label]")).length,
          title: document.title,
        })).catch(() => null);
        const tag = `${width}px ${l}${p || "/"}`;
        check(`status 200 ${tag}`, res?.status() === 200, `got ${res?.status()}`);
        if (info) {
          check(`no horizontal overflow ${tag}`, info.overflow <= 1, `overflow ${info.overflow}px`);
          check(`one h1 + main ${tag}`, info.h1 === 1 && info.main, `h1=${info.h1} main=${info.main}`);
          check(`lang/dir ${tag}`, info.lang.startsWith(l) && info.dir === (l === "ar" ? "rtl" : "ltr"), `${info.lang}/${info.dir}`);
          check(`images have alt ${tag}`, info.noAlt === 0, `${info.noAlt} without alt`);
          check(`buttons have names ${tag}`, info.emptyBtn === 0, `${info.emptyBtn} unnamed`);
          check(`title present ${tag}`, info.title.length > 3);
        }
        check(`no console errors ${tag}`, errors.length === 0, errors.slice(0, 2).join(" | "));
        await page.close();
      }
    }
    await ctx.close();
  }
}

async function http404AndHeaders(base: string) {
  console.log("A2  404s and security headers");
  for (const p of ["/en/nope", "/en/istanbul/services/zzz", "/ar/xyz/abc", "/tr/istanbul/store/zzz", "/xx", "/es/istanbul/travel/none"]) {
    const r = await fetch(base + p); // follows the language redirect, the final page must be a real 404
    check(`real 404 ${p}`, r.status === 404, `got ${r.status}`);
  }
  const r = await fetch(`${base}/en`);
  const csp = r.headers.get("content-security-policy") || "";
  const nonce = /'nonce-([^']+)'/.exec(csp)?.[1];
  const html = await r.text();
  check("CSP has nonce + strict-dynamic", !!nonce && csp.includes("'strict-dynamic'"));
  check("CSP forbids framing and limits connect-src", csp.includes("frame-ancestors 'none'") && csp.includes("connect-src 'self' https://api.open-meteo.com"));
  check("CSP has no unsafe-inline for scripts", !/script-src[^;]*unsafe-inline/.test(csp) && !/script-src[^;]*unsafe-eval/.test(csp));
  check("page scripts carry the nonce", !!nonce && html.includes(`nonce="${nonce}"`));
  const r2 = await fetch(`${base}/en`);
  const nonce2 = /'nonce-([^']+)'/.exec(r2.headers.get("content-security-policy") || "")?.[1];
  check("nonce changes per request", !!nonce2 && nonce !== nonce2);
  check("HSTS + nosniff + referrer + frame headers", !!r.headers.get("strict-transport-security") && r.headers.get("x-content-type-options") === "nosniff" && !!r.headers.get("referrer-policy") && r.headers.get("x-frame-options") === "DENY");
  check("not indexable by default (meta robots)", /<meta name="robots" content="noindex/.test(html), "robots meta not noindex");
  const robots = await (await fetch(`${base}/robots.txt`)).text();
  check("robots.txt disallows everything until indexing is enabled", /Disallow:\s*\//.test(robots));
  const sm = await (await fetch(`${base}/sitemap.xml`)).text();
  check("sitemap lists legal pages in all languages", ["/en/cookies", "/ar/istanbul/store/terms", "/tr/istanbul/store/shipping-returns", "/es/privacy"].every((u) => sm.includes(u)));
  const root = await fetch(`${base}/`, { redirect: "manual", headers: { "accept-language": "ar,en;q=0.5" } });
  check("language negotiation: Accept-Language ar -> /ar", root.status >= 300 && root.status < 400 && (root.headers.get("location") || "").includes("/ar"), `${root.status} ${root.headers.get("location")}`);
  const root2 = await fetch(`${base}/`, { redirect: "manual", headers: { cookie: "NV_LOCALE=tr", "accept-language": "ar" } });
  check("language negotiation: cookie wins over header", (root2.headers.get("location") || "").includes("/tr"), `${root2.headers.get("location")}`);
  const ist = await new Promise<{ status: number; location: string }>((resolve, reject) => {
    const rq = http.request({ host: "127.0.0.1", port: PORT_A, path: "/en", headers: { host: `istanbul.localhost:${PORT_A}` } }, (res) => { res.resume(); resolve({ status: res.statusCode ?? 0, location: String(res.headers.location ?? "") }); });
    rq.on("error", reject); rq.end();
  });
  check("istanbul host lands on the Istanbul gate", ist.location.endsWith("/en/istanbul"), `${ist.status} ${ist.location}`);
  const health = await fetch(`${base}/api/health`);
  check("health endpoint", health.status === 200);
}

function readJsonl(dir: string, kind: string): Record<string, unknown>[] {
  const f = path.join(dir, "submissions", `${kind}.jsonl`);
  return existsSync(f) ? readFileSync(f, "utf8").split("\n").filter(Boolean).map((x) => JSON.parse(x)) : [];
}

async function fillForm(page: Page, kind: FormKind) {
  for (const f of formSpecs[kind]) {
    const el = page.locator(`#f-${f.name}`);
    if ((await el.count()) === 0) continue; // hidden by the page (prefilled)
    switch (f.type) {
      case "checkbox": await el.check(); break;
      case "select": {
        const idx = kind === "translation" && f.name === "targetLanguage" ? 2 : 1;
        if (!(await el.inputValue())) await el.selectOption({ index: idx });
        break;
      }
      case "date": await el.fill(new Date(Date.now() + 20 * 864e5).toISOString().slice(0, 10)); break;
      case "number": await el.fill("2"); break;
      case "email": await el.fill("e2e@example.com"); break;
      case "tel": await el.fill("+90 555 000 00 00"); break;
      case "url": await el.fill("https://example.com"); break;
      case "textarea": if (!(await el.inputValue())) await el.fill("End to end test message with enough characters."); break;
      default: if (!(await el.inputValue())) await el.fill("E2E Test");
    }
  }
}

async function forms(browser: Browser, base: string) {
  console.log("A3  every form, through the real UI, saved on the server");
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript(() => localStorage.setItem("nv_cart_v1", JSON.stringify([{ productId: "pr-lokum", variantId: "250", qty: 2 }])));
  const cases: { kind: FormKind; path: string; stored: string }[] = [
    { kind: "contact", path: "/en/contact", stored: "contact" },
    { kind: "listing", path: "/en/istanbul/list-your-business", stored: "listing" },
    { kind: "tourism", path: `/en/istanbul/travel/${collections.travelServices[0].slug}`, stored: "tourism" },
    { kind: "translation", path: "/en/istanbul/translation", stored: "translation" },
    { kind: "travelAssist", path: "/en/istanbul/flights", stored: "travelAssist" },
    { kind: "premium", path: "/en/istanbul/premium", stored: "premium" },
    { kind: "city", path: "/en/cities", stored: "city" },
    { kind: "order", path: "/en/istanbul/store/cart", stored: "order" },
  ];
  for (const c of cases) {
    const before = readJsonl(dataA, c.stored).length;
    const errors: string[] = [];
    const page = await newPage(ctx, errors);
    await page.goto(base + c.path, { waitUntil: "load" });
    await page.waitForTimeout(300);
    // 1) empty submit shows errors and no success
    let firstVisible = formSpecs[c.kind][0].name;
    for (const f of formSpecs[c.kind]) if ((await page.locator(`#f-${f.name}`).count()) > 0) { firstVisible = f.name; break; }
    const form = page.locator("form").filter({ has: page.locator("#f-" + firstVisible) }).first();
    await form.locator('button[type="submit"]').click();
    await page.waitForTimeout(300);
    check(`form ${c.kind}: empty submit shows an error summary, no success`, (await page.locator(".error-summary").count()) > 0 && (await page.locator(".notice--success").count()) === 0);
    check(`form ${c.kind}: nothing stored by an invalid submit`, readJsonl(dataA, c.stored).length === before);
    // 2) valid submit
    await fillForm(page, c.kind);
    await form.locator('button[type="submit"]').click();
    const ok = await page.locator(".notice--success").first().waitFor({ timeout: 8000 }).then(() => true).catch(() => false);
    check(`form ${c.kind}: valid submit shows success`, ok);
    const after = readJsonl(dataA, c.stored);
    check(`form ${c.kind}: record saved on the server`, after.length === before + 1, `before ${before} after ${after.length}`);
    if (c.kind === "order") {
      const rec = after[after.length - 1] as { data?: { lines?: { productId?: string; qty?: number }[] } };
      const lines = rec.data?.lines;
      check("form order: cart lines saved and resolved against the catalogue", Array.isArray(lines) && lines[0]?.productId === "pr-lokum" && lines[0]?.qty === 2);
    }
    check(`form ${c.kind}: no console errors`, errors.length === 0, errors.join(" | "));
    await page.close();
  }
  await ctx.close();
}

async function apiGuards(base: string) {
  console.log("A4  API guards");
  const post = (body: unknown, headers: Record<string, string> = {}) =>
    fetch(`${base}/api/submit`, { method: "POST", headers: { "content-type": "application/json", ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });
  const good = { kind: "contact", locale: "en", data: { name: "A B", email: "a@b.co", topic: "general", message: "A long enough message here.", consent: true } };
  const before = readJsonl(dataA, "contact").length;
  check("cross-site POST is refused (Sec-Fetch-Site)", (await post(good, { "sec-fetch-site": "cross-site" })).status === 403);
  check("foreign Origin is refused", (await post(good, { origin: "https://evil.example" })).status === 403);
  check("wrong content type refused", (await fetch(`${base}/api/submit`, { method: "POST", headers: { "content-type": "text/plain" }, body: "x" })).status === 415);
  check("bad JSON refused", (await post("{not json")).status === 400);
  check("unknown kind refused", (await post({ kind: "hack", data: {} })).status === 400);
  const inv = await post({ ...good, data: { ...good.data, email: "bad" } });
  const invJson = await inv.json();
  check("invalid data -> 422 with field errors", inv.status === 422 && invJson.errors?.email === "email");
  const hp = await post({ ...good, data: { ...good.data, company_url: "http://spam" } });
  check("honeypot answers ok but stores nothing", hp.status === 200 && readJsonl(dataA, "contact").length === before);
  check("unknown fields are dropped, not stored", await (async () => {
    const r = await post({ ...good, data: { ...good.data, evil: "x".repeat(50) } }, { "x-forwarded-for": "198.51.100.1" });
    const last = readJsonl(dataA, "contact").pop() as { data?: Record<string, unknown> } | undefined;
    return r.status === 200 && !!last && !("evil" in (last.data ?? {}));
  })());
  check("GET on submit is 405", (await fetch(`${base}/api/submit`)).status === 405);
  const big = await post({ ...good, data: { ...good.data, message: "x".repeat(70000) } }, { "x-forwarded-for": "198.51.100.2" });
  check("oversized body refused", big.status === 413);
  let limited = false;
  for (let i = 0; i < 60 && !limited; i++) limited = (await post(good, { "x-forwarded-for": "203.0.113.9" })).status === 429;
  check("rate limit returns 429", limited);
  const q = await fetch(`${base}/api/store/checkout`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ lines: [], buyer: {}, locale: "en" }) });
  check("request mode: live checkout API is closed", q.status >= 400 && (await q.json()).ok !== true);
  const quo = await fetch(`${base}/api/store/quote`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ lines: [{ productId: "pr-lokum", variantId: "250", qty: 1 }], country: "TR" }) });
  check("request mode: quote API refuses sample products", (await quo.json()).ok !== true);
  const chk = await fetch(`${base}/en/istanbul/store/checkout`, { redirect: "manual" });
  check("request mode: checkout page redirects to the cart", chk.status >= 300 && chk.status < 400);
  check("mock-pay endpoint does not exist in production", (await fetch(`${base}/api/store/mock-pay?token=x&cb=y`)).status === 404);
  const rates = await fetch(`${base}/api/rates`);
  const rj = await rates.json().catch(() => null);
  check("rates API answers honestly (data or an error state, never a fake rate)", rates.status < 600 && rj !== null && (rj.ok === false || typeof rj.base === "string" || typeof rj.rates === "object"), JSON.stringify(rj)?.slice(0, 160));
}

async function uiBehaviour(browser: Browser, base: string) {
  console.log("A5  language switch, RTL, cart");
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const errors: string[] = [];
  const page = await newPage(ctx, errors);
  await page.goto(`${base}/en/istanbul`, { waitUntil: "load" });
  await page.locator("summary", { hasText: /English/ }).first().click();
  await page.locator('a:has-text("العربية")').first().click();
  await page.waitForURL(/\/ar\/istanbul/, { timeout: 8000 }).catch(() => undefined);
  check("language switch keeps the page and flips to Arabic", /\/ar\/istanbul/.test(page.url()));
  check("Arabic page is RTL", (await page.evaluate(() => document.documentElement.dir)) === "rtl");
  const cookie = (await ctx.cookies()).find((c) => c.name === "NV_LOCALE");
  check("language cookie saved", cookie?.value === "ar");
  await page.goto(`${base}/en/istanbul/store/sample-turkish-delight`, { waitUntil: "load" });
  const addBtn = page.locator("button", { hasText: /add to cart/i }).first();
  await addBtn.waitFor({ timeout: 10000 }).catch(() => undefined);
  if (await addBtn.count()) {
    await addBtn.click();
    await page.goto(`${base}/en/istanbul/store/cart`, { waitUntil: "load" });
    await page.waitForTimeout(300);
    check("cart keeps the item after navigation", (await page.locator("text=/Sample Turkish|Lokum/i").count()) > 0);
  } else check("product page has an add-to-cart button", false);
  check("no console errors in UI flow", errors.length === 0, errors.join(" | "));
  await ctx.close();
}

async function liveCheckout(browser: Browser, base: string) {
  console.log("B   live checkout with the mock provider (test mode)");
  const get = (u: string, init?: RequestInit) => fetch(base + u, init);
  const quoteBody = (extra: object = {}) => JSON.stringify({ lines: [{ productId: "fx-lokum", variantId: "250", qty: 2 }], country: "TR", ...extra });
  const hdr = { "content-type": "application/json" };

  // Quote API returns a flat response: { ok, subtotalMinor, shippingMinor, totalMinor, ... }
  // fx-lokum fixture: 180 TRY/unit × 2 = 360 TRY = 36000 minor. Client numbers (price/shipping/total) are ignored.
  const q = await (await get("/api/store/quote", { method: "POST", headers: hdr, body: quoteBody({ price: 1, shipping: 0, total: 1 }) })).json();
  check("quote: server computed totals, client numbers ignored", q.ok === true && q.subtotalMinor === 36000 && q.totalMinor === 36000 + q.shippingMinor && q.shippingMinor > 0, JSON.stringify(q).slice(0, 200));
  const q2 = await (await get("/api/store/quote", { method: "POST", headers: hdr, body: JSON.stringify({ lines: [{ productId: "fx-lokum", variantId: "250", qty: 2 }], country: "FR" }) })).json();
  check("quote: destination without a zone refused", q2.ok !== true);
  const q3 = await (await get("/api/store/quote", { method: "POST", headers: hdr, body: JSON.stringify({ lines: [{ productId: "pr-lokum", variantId: "250", qty: 1 }], country: "TR" }) })).json();
  check("quote: sample product not for sale in live mode", q3.ok !== true);
  const co = await get("/api/store/checkout", { method: "POST", headers: hdr, body: JSON.stringify({ lines: [{ productId: "fx-lokum", variantId: "250", qty: 1 }], buyer: { name: "x" }, locale: "en" }) });
  const coj = await co.json();
  check("checkout: invalid buyer data -> validation errors, no order created", coj.ok !== true && !existsOrders(dataB));
  check("checkout: cross-site POST refused", (await get("/api/store/checkout", { method: "POST", headers: { ...hdr, "sec-fetch-site": "cross-site" }, body: "{}" })).status === 403);

  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  await ctx.addInitScript(() => localStorage.setItem("nv_cart_v1", JSON.stringify([{ productId: "fx-lokum", variantId: "250", qty: 2 }])));
  const errors: string[] = [];

  async function buy(result: "pay" | "fail") {
    const page = await newPage(ctx, errors);
    await page.goto(`${base}/en/istanbul/store/checkout`, { waitUntil: "load" });
    await page.waitForSelector("#co-name", { timeout: 20000 });
    await page.fill("#co-name", "Test"); await page.fill("#co-surname", "Buyer");
    await page.fill("#co-email", "buyer@example.com"); await page.fill("#co-phone", "+90 555 000 00 00");
    await page.selectOption("#co-country", "TR");
    if (await page.locator("#co-identityNumber").count()) await page.fill("#co-identityNumber", "10000000146");
    await page.fill("#co-address", "Some Street 12, Kadikoy"); await page.fill("#co-city", "Istanbul");
    await page.check("#co-consentPreInfo"); await page.check("#co-consentSales"); await page.check("#co-consentAllergen");
    await page.waitForSelector(".summary-row--total", { timeout: 10000 });
    const total = await page.locator(".summary-row--total span").last().innerText();
    // Scope the submit click to the checkout form (form.detail-grid), not the header search form
    await page.locator("form.detail-grid button[type='submit']").click();
    await page.waitForURL(/mock-pay/, { timeout: 15000 });
    await page.click(result === "pay" ? "#pay" : "#fail");
    await page.waitForURL(/\/istanbul\/store\/order\/NVO-/, { timeout: 15000 });
    const url = page.url();
    const status = await page.locator(".notice").first().innerText();
    return { page, url, status, total };
  }

  const okBuy = await buy("pay");
  check("checkout: success path ends on the order page showing Paid", /Paid/.test(okBuy.status), okBuy.status);
  const m = /(NVO-\d{8}-[0-9A-F]{6})\?t=([0-9a-f]+)/.exec(okBuy.url);
  check("order page URL carries order id and private token", !!m);
  const orderId = m?.[1] ?? "";
  const token = m?.[2] ?? "";
  const stored = JSON.parse(readFileSync(path.join(dataB, "orders", `${orderId}.json`), "utf8"));
  check("order stored as paid with an event log", stored.status === "paid" && stored.events.length === 2 && stored.events[0].type === "order.created" && stored.events[1].type === "payment.confirmed", JSON.stringify(stored.events?.map((e: { type: string }) => e.type)));
  check("order file stores a token HASH, never the token", stored.accessTokenHash && !JSON.stringify(stored).includes(token));
  check("order file stores no IP address", !/"ip"|clientIp|x-forwarded/i.test(JSON.stringify(stored)));
  check("total shown at checkout equals the stored server-computed total", okBuy.total.replace(/\D/g, "") === (stored.quote.totalMinor / 100).toFixed(2).replace(/\D/g, ""), `${okBuy.total} vs ${stored.quote.totalMinor}`);

  // replay the callback (provider retries, or an attacker repeats it): must stay paid, exactly one payment event
  const cb = `${base}/api/store/callback?order=${orderId}&t=${token}`;
  const providerToken = stored.provider.token as string;
  for (let i = 0; i < 3; i++) await fetch(cb, { method: "POST", redirect: "manual", headers: { "content-type": "application/x-www-form-urlencoded" }, body: `token=${providerToken}` });
  const again = JSON.parse(readFileSync(path.join(dataB, "orders", `${orderId}.json`), "utf8"));
  check("callback replay is idempotent (one payment event)", again.status === "paid" && again.events.filter((e: { type: string }) => e.type === "payment.confirmed").length === 1);

  // order page access control
  check("order page with a wrong token is a real 404", (await get(`/en/istanbul/store/order/${orderId}?t=wrong`)).status === 404);
  check("order page without a token is a real 404", (await get(`/en/istanbul/store/order/${orderId}`)).status === 404);
  check("order page for an unknown order is a real 404", (await get(`/en/istanbul/store/order/NVO-20260101-ABCDEF?t=x`)).status === 404);
  check("order page is noindex", /noindex/.test(await (await get(`/en/istanbul/store/order/${orderId}?t=${token}`)).text()));

  // forged callback on a NEW pending order: the visitor claims success without paying
  const failBuy = await buy("fail");
  check("checkout: failed payment ends on the order page showing Payment failed", /Payment failed/i.test(failBuy.status), failBuy.status);
  const m2 = /(NVO-\d{8}-[0-9A-F]{6})\?t=([0-9a-f]+)/.exec(failBuy.url);
  const failed = JSON.parse(readFileSync(path.join(dataB, "orders", `${m2?.[1]}.json`), "utf8"));
  check("failed payment never marks the order paid", failed.status === "payment_failed");
  const forged = await fetch(`${base}/api/store/callback?order=${m2?.[1]}&t=${m2?.[2]}`, { method: "POST", redirect: "manual", headers: { "content-type": "application/x-www-form-urlencoded" }, body: "token=" + failed.provider.token + "&paymentStatus=SUCCESS&status=success" });
  void forged;
  const afterForge = JSON.parse(readFileSync(path.join(dataB, "orders", `${m2?.[1]}.json`), "utf8"));
  check("forged callback fields do not mark an order paid", afterForge.status !== "paid", afterForge.status);
  const wrongTok = await fetch(`${base}/api/store/callback?order=${m2?.[1]}&t=${m2?.[2]}`, { method: "POST", redirect: "manual", headers: { "content-type": "application/x-www-form-urlencoded" }, body: "token=" + "0".repeat(32) });
  void wrongTok;
  check("callback with an unknown provider token changes nothing", JSON.parse(readFileSync(path.join(dataB, "orders", `${m2?.[1]}.json`), "utf8")).status !== "paid");
  check("callback with no order is a 404", (await fetch(`${base}/api/store/callback?order=NVO-20260101-ABCDEF&t=x`, { method: "POST", body: "token=x" })).status === 404);

  // owner CLI against the same data folder
  const run = (args: string[]) => new Promise<{ code: number | null; out: string }>((resolve) => {
    const p = spawn("npx", ["tsx", "scripts/orders.ts", ...args], { env: { ...process.env, NORVIGATE_DATA_DIR: dataB }, stdio: ["ignore", "pipe", "pipe"] });
    let out = ""; p.stdout.on("data", (d) => (out += d)); p.stderr.on("data", (d) => (out += d)); p.on("close", (code) => resolve({ code, out }));
  });
  const list = await run(["list"]);
  check("CLI lists both orders", list.code === 0 && list.out.includes(orderId) && list.out.includes(String(m2?.[1])), list.out.slice(0, 300));
  const ship = await run(["ship", orderId, "TestCarrier", "TRK123"]);
  check("CLI marks a paid order shipped with tracking", ship.code === 0 && /shipped/.test(ship.out), ship.out);
  const badShip = await run(["ship", String(m2?.[1]), "X", "Y"]);
  check("CLI refuses to ship an unpaid order", badShip.code !== 0, badShip.out);
  const pg = await newPage(ctx, errors);
  await pg.goto(`${base}/en/istanbul/store/order/${orderId}?t=${token}`, { waitUntil: "load" });
  check("order page shows shipped status and tracking number", /Shipped/.test(await pg.locator(".notice").first().innerText()) && (await pg.locator("text=TRK123").count()) > 0);
  check("checkout flow: no console errors", errors.length === 0, errors.slice(0, 3).join(" | "));
  await ctx.close();
}
const existsOrders = (dir: string) => existsSync(path.join(dir, "orders")) && readdirSync(path.join(dir, "orders")).length > 0;

async function main() {
  const siteA = `http://localhost:${PORT_A}`;
  const siteB = `http://localhost:${PORT_B}`;
  start("npx", ["next", "start", "-p", String(PORT_A)], { NORVIGATE_DATA_DIR: dataA, NEXT_PUBLIC_SITE_URL: siteA, NODE_ENV: "production", RATE_LIMIT_MAX: "40" });
  start("npx", ["next", "dev", "-p", String(PORT_B)], { NORVIGATE_DATA_DIR: dataB, NEXT_PUBLIC_SITE_URL: siteB, STORE_MODE: "live", STORE_TEST_FIXTURE: "1", STORE_ALLOW_MOCK: "1", PAYMENT_PROVIDER: "mock", NODE_ENV: "development", NEXT_DIST_DIR: ".next-test" });
  await Promise.all([waitFor(`${siteA}/api/health`), waitFor(`${siteB}/api/health`)]);
  const browser = await chromium.launch();
  try {
    await http404AndHeaders(siteA);
    await forms(browser, siteA);
    await apiGuards(siteA);
    await uiBehaviour(browser, siteA);
    await pageMatrix(browser, siteA);
    await liveCheckout(browser, siteB);
  } finally {
    await browser.close();
  }
}

main()
  .catch((e) => { check("test run completed", false, String(e?.stack || e)); })
  .finally(() => {
    for (const p of procs) { try { if (p.pid) process.kill(-p.pid, "SIGTERM"); } catch { /* already gone */ } }
    const failed = results.filter((r) => !r.ok);
    writeFileSync(path.join(__dirname, "e2e-report.json"), JSON.stringify({ at: new Date().toISOString(), total: results.length, failed: failed.length, results }, null, 1));
    console.log(`\n${results.length - failed.length}/${results.length} checks passed, ${failed.length} failed`);
    for (const f of failed.slice(0, 40)) console.log(` - ${f.name} ${f.detail ?? ""}`);
    rmSync(".next-test", { recursive: true, force: true }); rmSync(dataA, { recursive: true, force: true }); rmSync(dataB, { recursive: true, force: true });
    process.exit(failed.length ? 1 : 0);
  });
