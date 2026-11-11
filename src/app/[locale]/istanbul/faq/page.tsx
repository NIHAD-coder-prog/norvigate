import Link from "next/link";
import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { listFaq } from "@/lib/repo";
import { pick } from "@/i18n/config";
import { PageHero } from "@/components/ui-server";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "/istanbul/faq", (d) => ({ title: `${d.faq.title} | NORVIGATE`, description: d.faq.lead }));
}

export default async function FaqPage({ params }: LocaleParams) {
  const { locale, dict, h } = await getCtx(params);
  const items = await listFaq();
  const t = dict.faq;
  return (
    <>
      <PageHero title={t.title} lead={t.lead} crumbLabel={dict.common.breadcrumb} crumbs={[{ label: dict.nav.home, href: h() }, { label: dict.nav.istanbul, href: h("/istanbul") }, { label: t.title }]} />
      <section className="section on-light">
        <div className="container measure">
          {items.map((f) => (
            <details key={f.id} className="panel" style={{ marginBlockEnd: ".75rem" }}>
              <summary style={{ cursor: "pointer", fontWeight: 800 }}>{pick(f.q, locale)}</summary>
              <p style={{ marginBlockStart: ".75rem" }}>{pick(f.a, locale)}</p>
            </details>
          ))}
          <div className="panel panel--aside" style={{ marginBlockStart: "2rem" }}>
            <h2>{t.stillTitle}</h2>
            <p>{t.stillText}</p>
            <Link className="btn btn--outline" href={h("/contact")}>{dict.nav.contact}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
