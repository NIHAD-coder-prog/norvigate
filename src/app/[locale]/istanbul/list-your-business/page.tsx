import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { listProviderCategories } from "@/lib/repo";
import { pick } from "@/i18n/config";
import { Notice } from "@/components/ui";
import { PageHero } from "@/components/ui-server";
import { InquiryForm } from "@/components/client/InquiryForm";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "/istanbul/list-your-business", (d) => ({ title: `${d.listBusiness.title} | NORVIGATE`, description: d.listBusiness.lead }));
}

export default async function ListBusinessPage({ params }: LocaleParams) {
  const { locale, dict, h } = await getCtx(params);
  const cats = await listProviderCategories();
  const t = dict.listBusiness;
  return (
    <>
      <PageHero title={t.title} lead={t.lead} crumbLabel={dict.common.breadcrumb} crumbs={[{ label: dict.nav.home, href: h() }, { label: dict.nav.istanbul, href: h("/istanbul") }, { label: t.title }]} />
      <section className="section on-light">
        <div className="container cols-2">
          <div className="panel">
            <Notice tone="warn">{t.noGuarantee}</Notice>
            <p className="small muted">{t.stored}</p>
            <InquiryForm kind="listing" locale={locale} dict={dict.forms} submitLabel={t.submit}
              dynamicOptions={{ providerCategories: cats.map((c) => ({ value: c.id, label: pick(c.name, locale) })) }} />
          </div>
          <aside className="panel panel--aside">
            <h2>{t.whyTitle}</h2>
            <ul>{t.why.map((w) => <li key={w}>{w}</li>)}</ul>
          </aside>
        </div>
      </section>
    </>
  );
}
