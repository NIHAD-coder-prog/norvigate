# NORVIGATE hub: project brief for any future session

Send this file together with the project ZIP when asking for changes in a new chat. It holds the decisions and rules that are not obvious from the code.

## What this is
The hub website of NORVIGATE (norvigate.com): a network of city gateways, built as a "vision-led digital presence". It shows what works today and what is planned, with an honest status on everything. NORVIGATE is a sister company under NORVIGIQ ("A NORVIGIQ COMPANY" appears in the footer only). The Istanbul gate is a separate site at https://istanbul.norvigate.com; every hub entry to Istanbul links there (`ISTANBUL_URL` in `src/data/cities.ts`).

## Working rules (from the founder)
- Reply to the founder in Arabic: direct and honest, reasons before steps. Never mix Arabic and English inside one sentence; Latin names go on their own line.
- Start each answer with one short line saying what is being done.
- Do not invent taglines, services, clients, testimonials, statistics, awards, addresses, phone numbers, prices or case numbers. Missing facts become clearly labelled placeholders.
- Do not build a ZIP of an unfinished site. Build everything, then one final ZIP when the founder says so.
- No curved lines or arcs as decoration (not institutional).
- Show a visual change on one page and get approval before applying it site-wide.

## Locked decisions
- Logo F1 (ribbon N, gold seam on the diagonal edge, gold gate). Files in `public/brand` and `src/components/client/LivingMark.tsx`. Do not redraw. The final build ships with this logo; a later logo file, if one arrives, replaces these files.
- Main line: "Your Gateway to the World's Cities" (ar: بوابتك إلى مدن العالم). Supporting line: ALL YOU NEED IN ONE PLACE. Descriptor: TOURISM · SERVICES · INVESTMENT.
- Name meaning: NOR = Direction, VIGI = Insight, GATE = Gate (gold).
- Typography: Cormorant (display), Literata (Latin body), Amiri (Arabic display, with kashida on headings only), Noto Naskh Arabic (Arabic body). Self-hosted.
- Languages: en, tr, ar (RTL), es, fr. French and Spanish still need a native-quality review.
- Status system: LIVE, BETA, IN DEVELOPMENT, PLANNED, always a light plus a text label. Data in `src/data/network.ts`. Other cities appear only as PLANNED, with no link. Istanbul is LIVE (the founder confirmed its site is ready to launch) and is pinned: it always shows on the hub at every visibility level, with its status tag on every link to it. Its status is the first line of `networkCities`.
- Visibility level: `src/config/visibility.ts` (live, beta, all) decides what the public sees; hidden items are removed on the server. Every new feature must get a status in `src/data/network.ts` so the switch can control it.
- Pattern: centred page headers, section headings and short cards; long text, lists, forms and legal pages stay start-aligned. Buttons change colour on hover and press.

## How to ask for an update
Say what to change and on which page, in plain words, and attach a screenshot if it is visual. State which of the rules above (if any) the change touches. A good request: "On the cities page, change X to Y in Arabic, keep everything else, show me before applying elsewhere."

## Before accepting any change
`npm run typecheck`, `npm run test`, `npm run i18n:check`, `npm run build`, `npm run test:e2e` must all pass (see QA.md). The e2e run covers every page in five languages at three widths.
