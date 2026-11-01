import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { Chip, Notice, PageHero, SectionHead } from "@/components/ui";
import { InquiryForm } from "@/components/client/InquiryForm";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "/istanbul/premium", (d) => ({ title: `${d.premium.title} | NORVIGATE`, description: d.premium.lead }));
}

export default async function PremiumPage({ params }: LocaleParams) {
  const { locale, dict, h } = await getCtx(params);
  const t = dict.premium;
  return (
    <>
      <PageHero
        title={t.title}
        lead={t.lead}
        chip={<Chip status="planned">{dict.status.planned}</Chip>}
        crumbLabel={dict.common.breadcrumb}
        crumbs={[{ label: dict.nav.home, href: h() }, { label: dict.nav.istanbul, href: h("/istanbul") }, { label: t.title }]}
      />
      <section className="section--tight on-light">
        <div className="container"><Notice tone="sample" title="">{t.plannedNote}</Notice></div>
      </section>
      <section className="section on-light">
        <div className="container">
          <SectionHead title={t.itemsTitle} />
          <ul className="rows">
            {t.items.map((it) => (
              <li className="row" key={it.title}>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
                <div className="row__meta"><Chip status="planned">{dict.status.planned}</Chip></div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section section--white on-light">
        <div className="container cols-2">
          <div className="panel">
            <h2>{t.formTitle}</h2>
            <Notice tone="warn" title="">{t.noGuarantee}</Notice>
            <InquiryForm kind="premium" locale={locale} dict={dict.forms} submitLabel={t.submit} />
          </div>
          <aside className="panel panel--aside">
            <h2>{t.whoTitle}</h2>
            <p>{t.whoText}</p>
            <p><a href="https://norvigiq.com" target="_blank" rel="noopener noreferrer"><span dir="ltr">NORVIGIQ</span></a> · {t.parentLink}</p>
          </aside>
        </div>
      </section>
    </>
  );
}
