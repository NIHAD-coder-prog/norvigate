/**
 * Translation coverage report.  Run: npm run i18n:check
 * - UI dictionary coverage per language (against English)
 * - Content coverage per language (every LText in src/data)
 * Exits 1 when a language flagged `complete: true` in src/i18n/config.ts is not actually complete.
 */
import { languages } from "../src/i18n/config";
import { en } from "../src/i18n/dictionaries/en";
import { dictionaryLoaders } from "../src/i18n/dictionaries";
import { coverage } from "../src/i18n/merge";
import { collections } from "../src/data";
import { walkLTexts } from "../src/data/overlay";

async function main() {
  const content = [...walkLTexts(collections)];
  let failed = false;
  console.log(`UI strings: ${coverage(en, en).total}   Content texts: ${content.length}\n`);
  for (const l of languages) {
    if (l.code === "en") continue;
    const loader = dictionaryLoaders[l.code];
    const ui = coverage(en, loader ? await loader() : {});
    const missingContent = content.filter((c) => !(typeof c.text[l.code] === "string" && (c.text[l.code] as string).trim()));
    const uiPct = ((ui.present / ui.total) * 100).toFixed(1);
    const cPct = (((content.length - missingContent.length) / content.length) * 100).toFixed(1);
    const complete = ui.missing.length === 0 && missingContent.length === 0;
    console.log(`${l.code.padEnd(6)} UI ${uiPct}% (${ui.missing.length} missing)   content ${cPct}% (${missingContent.length} missing)   flagged complete: ${l.complete ? "yes" : "no"}`);
    if (ui.missing.length) console.log("   UI missing:", ui.missing.slice(0, 8).join(", "), ui.missing.length > 8 ? "…" : "");
    if (missingContent.length) console.log("   content missing:", missingContent.slice(0, 8).map((m) => m.path).join(", "), missingContent.length > 8 ? "…" : "");
    if (l.complete && !complete) {
      failed = true;
      console.log(`   ✗ ${l.code} is flagged complete but is not.`);
    }
  }
  process.exit(failed ? 1 : 0);
}
main();
