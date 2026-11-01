import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { PageHero } from "@/components/ui";
import { Converter } from "@/components/client/Converter";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "/currency", (d) => ({ title: `${d.currency.title} | NORVIGATE`, description: d.currency.lead }));
}

export default async function CurrencyPage({ params }: LocaleParams) {
  const { dict, h } = await getCtx(params);
  const t = dict.currency;
  return (
    <>
      <PageHero title={t.title} lead={t.lead} crumbLabel={dict.common.breadcrumb} crumbs={[{ label: dict.nav.home, href: h() }, { label: t.title }]} />
      <section className="section on-light">
        <div className="container measure">
          <div className="panel"><Converter /></div>
        </div>
      </section>
    </>
  );
}
