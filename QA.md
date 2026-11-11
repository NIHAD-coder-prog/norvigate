# QA report

**Result of the last full run: 3587 / 3587 checks passed.** `npm run typecheck`, `npm run test` (25/25) and `npm run build` are clean. `npm run i18n:check`: tr, ar, es, fr at 100% UI and content. Machine-readable results: `tests/e2e-report.json`.

## How it was tested
Chromium (Playwright) against a production build (`next start`) plus a second dev server in live-store test mode with the mock payment provider. Re-run with `npm run test:e2e`.

## Page matrix: 29 pages x 5 languages (EN, TR, AR, ES, FR) x 3 widths (390, 768, 1440) = 435 loads
For each load: HTTP 200, correct `lang` and `dir` (RTL for Arabic), a title, no broken images, buttons have names, **no horizontal overflow**, and no console or page errors.

Pages: home, cities, about, contact, privacy, terms, currency, Istanbul home, services (+ a detail page), experiences, travel (+ a detail page), flights, hotels, translation, tools, guide, premium, store, product page, cart, store terms, shipping and returns, FAQ, search (empty and with a query), list-your-business.

## Behaviour checks
- Unknown paths and unknown slugs return a real 404 in every language.
- Security headers present; cross-origin POST refused (403); empty body 422; oversized body 413; unknown fields dropped; honeypot silently discarded; rate limit returns 429.
- Every form submitted through the real UI saves a record on the server, shows an ID, and rejects empty or invalid input. A network failure never shows a false success.
- Cart: add, persist across navigation, change quantity, order request stores validated lines; unknown product refused.
- Language switch keeps path and query, sets the cookie, flips to RTL.
- Currency: converter maths, prices in the chosen currency, an honest "unavailable" state when rates fail.
- Live checkout (mock provider): paid path and failed path, order stored as paid with `order.created` then `payment.confirmed`, token stored only as a hash, no IP stored, callback replay is idempotent, wrong or missing token gives a real 404.

## Defects found and fixed
1. Unknown pages returned 200 (soft 404). Fixed.
2. Translation page hydration mismatch (language names from Intl). Now computed on the server.
3. Forms posted a body shape the API did not expect, so nothing saved. Fixed.
4. Variant picker styled nested price text. Fixed.
5. **Mobile overflow of 61 to 149 px on /cities (390 px)**: the skyline SVG had no width rule and rendered at its intrinsic 800 px. Fixed with `.arch svg { width: 100%; height: auto }`.
6. Long unbroken text overflowed on legal pages, key/value lists and breadcrumbs (Spanish worst). Fixed with `min-width: 0` and wrapping rules.
7. The "preview" status chip was a full sentence and overflowed at 768 px. Shortened in all four languages.
8. The mock payment page used an inline style that the CSP blocks. Removed.

## Test-harness corrections (not product bugs)
Benign aborted Next.js prefetches and the expected 503 from the exchange-rate endpoint in a no-internet sandbox are ignored; the dev server's inline-style CSP message (server B only, never on the production build) is ignored; the order event-log expectation was updated to two events.

## Added in this round
French (UI, content, legal drafts), the network roadmap section with the four-state status system, old orange/cyan colours removed from product art, tokens.json replaced by the final identity tokens. The language menu test now targets the dropdown (it shows the current language name).

## Not verified here
- French and Spanish have not had a native-quality review.
- Real devices (iOS Safari, Android Chrome) and screen readers.
- Open-Meteo weather and live exchange rates (the sandbox has no internet, so only the failure states were exercised).
- The Docker/Caddy kit on a real server.
- iyzico sandbox and production (only the mock provider was exercised).
- Prayer times against the official Diyanet table.
- Legal texts are drafts awaiting review by a qualified lawyer.
