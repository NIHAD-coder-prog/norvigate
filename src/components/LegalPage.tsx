import { Fragment } from "react";
import Link from "next/link";
import { PageHero, Notice } from "@/components/ui";
import type { Dictionary } from "@/i18n/dictionaries";
import type { LegalPack } from "@/content/legal";
import { business } from "@/store-live/business";

export type LegalKey = "privacy" | "terms" | "sales" | "shipping" | "cookies";
export const legalPaths: Record<LegalKey, string> = {
  privacy: "/privacy",
  terms: "/terms",
  cookies: "/cookies",
  sales: "/istanbul/store/terms",
  shipping: "/istanbul/store/shipping-returns",
};
const sellerOrder = ["legalName", "taxOffice", "taxNumber", "mersis", "address", "email", "phone", "kepAddress", "foodRegistration"] as const;

export function LegalPage({ docKey, pack, dict, h }: { docKey: LegalKey; pack: LegalPack; dict: Dictionary; h: (p?: string) => string }) {
  const doc = pack[docKey];
  const showSeller = docKey === "sales";
  const showStoreNote = docKey === "sales" || docKey === "shipping";
  const related = (Object.keys(legalPaths) as LegalKey[]).filter((k) => k !== docKey);
  return (
    <>
      <PageHero title={doc.title} crumbLabel={dict.common.breadcrumb} crumbs={[{ label: dict.nav.home, href: h() }, { label: doc.title }]} />
      <section className="section on-light">
        <div className="container doc-grid">
          <div className="prose">
            <Notice tone="warn">{pack.ui.banner} {pack.ui.notLawyer}</Notice>
            <p className="small muted">{pack.ui.drafted}</p>
            {showStoreNote ? <Notice tone="info">{pack.ui.storeNotOpen}</Notice> : null}
            <p>{doc.intro}</p>
            {showSeller ? (
              <section aria-labelledby="seller-h">
                <h2 id="seller-h">{pack.ui.sellerTitle}</h2>
                <dl className="kv">
                  {sellerOrder.map((k) => {
                    if (k === "mersis" && business.isCompany === false) return null;
                    const v = business[k];
                    return (
                      <Fragment key={k}>
                        <dt>{pack.ui.sellerFields[k]}</dt>
                        <dd>{v && v.trim() ? v : pack.ui.toComplete}</dd>
                      </Fragment>
                    );
                  })}
                </dl>
              </section>
            ) : null}
            {doc.sections.map((s, i) => (
              <section key={s.h} id={`s${i}`}>
                <h2>{s.h}</h2>
                {s.p.map((para, j) => (<p key={j}>{para}</p>))}
              </section>
            ))}
            <h2>{pack.ui.related}</h2>
            <ul>
              {related.map((k) => (<li key={k}><Link href={h(legalPaths[k])}>{pack[k].title}</Link></li>))}
            </ul>
          </div>
          <nav className="panel doc-aside toc" aria-label={doc.title}>
            <h2>{doc.title}</h2>
            {doc.sections.map((s, i) => (<a key={s.h} href={`#s${i}`}>{s.h}</a>))}
          </nav>
        </div>
      </section>
    </>
  );
}
