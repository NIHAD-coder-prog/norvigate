#!/usr/bin/env node
/**
 * Adds a language to the site.   npm run i18n:add -- <code>     e.g. fr, pt-br, he, ur
 * Creates empty dictionary + content-overlay files and registers them. Missing strings fall back to English,
 * and the site shows a "partly translated" notice until you set `complete: true` (verified by i18n:check).
 */
import fs from "node:fs";
import path from "node:path";

const code = (process.argv[2] || "").toLowerCase();
if (!/^[a-z]{2,3}(-[a-z0-9]{2,8})*$/.test(code)) {
  console.error("Usage: npm run i18n:add -- <code>   (a BCP-47 tag such as fr, pt-br, he)");
  process.exit(1);
}
const root = process.cwd();
const file = (p) => path.join(root, p);
const ident = code.replace(/[^a-z0-9]/g, "_");
const read = (p) => fs.readFileSync(file(p), "utf8");
const write = (p, s) => fs.writeFileSync(file(p), s);

const cfg = "src/i18n/config.ts";
const dictIndex = "src/i18n/dictionaries/index.ts";
const contentIndex = "src/data/translations/index.ts";

if (new RegExp(`code: "${code}"`).test(read(cfg))) {
  console.error(`"${code}" is already registered.`);
  process.exit(1);
}

write(`src/i18n/dictionaries/${code}.ts`, `import type { PartialDictionary } from "./index";

/** ${code}: translate any strings you like; everything omitted shows English. Keep the same shape as en.ts. */
export const ${ident}: PartialDictionary = {};
`);
write(`src/data/translations/${code}.ts`, `import type { ContentOverlay } from "../overlay";

/** ${code} translations of src/data content. See ../overlay.ts for the format. Omitted items show English. */
export const ${ident}: ContentOverlay = {};
`);

write(cfg, read(cfg).replace("  // <<ADD-LANGUAGE>>", `  { code: "${code}" },\n  // <<ADD-LANGUAGE>>`));
write(dictIndex, read(dictIndex).replace("  // <<ADD-DICTIONARY>>", `  "${code}": async () => (await import("./${code}")).${ident},\n  // <<ADD-DICTIONARY>>`));
let ci = read(contentIndex);
ci = `import { ${ident} } from "./${code}";\n` + ci;
ci = ci.replace("  // <<ADD-CONTENT>>", `  "${code}": ${ident},\n  // <<ADD-CONTENT>>`);
write(contentIndex, ci);

console.log(`Added "${code}". Next: translate src/i18n/dictionaries/${code}.ts and src/data/translations/${code}.ts,`);
console.log(`then run  npm run i18n:check  and set complete: true in ${cfg} when it reports 100%.`);
