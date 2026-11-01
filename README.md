# NORVIGATE v0.1

City-gateway website. First gate: **ISTANBUL INTERNATIONAL GATE** (`/{locale}/istanbul`, planned address `istanbul.norvigate.com`).
Next.js 15 (App Router) · React 19 · TypeScript (strict) · Languages: English, Turkish, Arabic (RTL), Spanish, plus any language you add.

All listings, products, prices and descriptions are **labelled samples**. Nothing here is a real service, client, price or review.

## Run

```bash
npm install
cp .env.example .env.local
npm run dev                 # http://localhost:3000
npm run build && npm start  # production build
```

## Checks

| Command | What it proves |
|---|---|
| `npm run typecheck` | TypeScript strict, no errors |
| `npm run test` | 25 unit tests: forms, store pricing, order files |
| `npm run i18n:check` | translation coverage per language (UI and content) |
| `npm run store:check` | whether live checkout may open (see Store) |
| `npm run test:e2e` | 2891 browser checks (Chromium): every page x 4 languages x 3 widths, 404s, security headers, every form through the real UI, API guards, cart, and a full live checkout with a mock provider |

## Environment

See `.env.example` (every variable is commented). Main ones:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical URLs and sitemap; baked in at build time; must be https for live checkout |
| `NORVIGATE_ALLOW_INDEXING` | the site is `noindex` unless this is exactly `true` |
| `NORVIGATE_DATA_DIR` | where submissions and orders are stored (needs a persistent writable disk) |
| `STORE_MODE` | `request` (launch default, no payment) or `live` (online checkout) |
| `RATE_LIMIT_MAX` | optional: submissions per client per 10 minutes (default 12; tests raise it) |

## Forms

Contact, city suggestion, business listing, travel, flights, hotels, translation and store order requests are written to `NORVIGATE_DATA_DIR/submissions/<kind>.jsonl`. Nothing is emailed. Protections: same-origin check, 64 KB body cap, per-client rate limit, hidden honeypot field, unknown fields dropped, and order lines re-validated against the catalogue on the server.

## Store

- **Phase 1 (default, `STORE_MODE=request`)**: browse, cart, and an order *request*. No payment, no shipping.
- **Phase 2 (`STORE_MODE=live`)**: iyzico checkout, orders stored as files with a hashed access token and an event log. It refuses to open until `npm run store:check` reports `ready: YES`: it lists exactly which legal, tax, shipping and payment-key items are still missing. Never switch it on before they are real.

## Add a language

```bash
npm run i18n:add -- fr      # also: pt-br, he, ur, zh, ...
npm run i18n:check
```

Missing strings fall back to English and the site shows a "partly translated" notice until you set `complete: true` in `src/i18n/config.ts` (the check fails if that claim is false). Right-to-left is detected from the language code.

## Currency

All currencies from the free Exchange Rate API open endpoint, TRY base, cached 6 hours, last good rates reused up to 7 days (flagged), otherwise the UI says rates are unavailable. It never invents a rate. Attribution is shown as the provider requires. Converted prices are indicative; nothing is charged in them.

## Deploy

See `DEPLOY-AR.md` (Arabic) and the `deploy/` folder (Docker + Caddy, automatic HTTPS). Run exactly one web container: orders use an in-process file lock.

## Design notes

"Two Gates" system: navy, royal blue and gold tokens (`tokens.json`, `src/app/globals.css`), arched `.door` cards and `.arch` image frames. Security headers and a nonce-based CSP are set in `src/middleware.ts`.

## Not implemented (by design)

Bookings, flight or hotel APIs, email sending, accounts, provider dashboards, file upload, analytics, tax and stock management.
