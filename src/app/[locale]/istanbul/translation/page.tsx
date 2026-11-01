import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { Notice, PageHero } from "@/components/ui";
import { languageOptionGroups } from "@/i18n/world-languages";
import { InquiryForm } from "@/components/client/InquiryForm";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "/istanbul/translation", (d) => ({ title: `${d.translation.title} | NORVIGATE`, description: d.translation.lead }));
}

export default async function TranslationPage({ params }: LocaleParams) {
  const { locale, dict, h } = await getCtx(params);
  const t = dict.translation;
  return (
    <>
      <PageHero title={t.title} lead={t.lead} crumbLabel={dict.common.breadcrumb} crumbs={[{ label: dict.nav.home, href: h() }, { label: dict.nav.istanbul, href: h("/istanbul") }, { label: t.title }]} />
      <section className="section on-light">
        <div className="container">
          <Notice tone="warn">{t.banner}</Notice>
          <h2 style={{ marginBlockStart: "2rem" }}>{t.servicesTitle}</h2>
          <div className="value-list">
            {t.services.map((s) => (<div key={s.title}><h3>{s.title}</h3><p>{s.text}</p></div>))}
          </div>
        </div>
      </section>
      <section className="section section--white on-light">
        <div className="container measure">
          <div className="panel">
            <h2>{t.formTitle}</h2>
            <p className="muted">{t.formLead}</p>
            <Notice tone="info">{t.fileNote}</Notice>
            <div style={{ height: "1rem" }} />
            <InquiryForm kind="translation" locale={locale} dict={dict.forms} languageGroups={languageOptionGroups(locale)} />
            <p className="small muted">{t.notBooking}</p>
          </div>
        </div>
      </section>
    </>
  );
}
