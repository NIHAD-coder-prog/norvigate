import Link from "next/link";
import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { listProviderCategories, listProviders } from "@/lib/repo";
import { fmt, pick } from "@/i18n/config";
import { Chip, PageHero } from "@/components/ui";
import { isProviderCategoryId } from "@/data/categories";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "/istanbul/services", (d) => ({ title: `${d.services.title} | NORVIGATE`, description: d.services.lead }));
}

export default async function ServicesPage({ params, searchParams }: LocaleParams & { searchParams: Promise<{ category?: string }> }) {
  const { locale, dict, h } = await getCtx(params);
  const { category } = await searchParams;
  const active = category && isProviderCategoryId(category) ? category : undefined;
  const [cats, providers] = await Promise.all([listProviderCategories(), listProviders({ categoryId: active })]);
  const t = dict.services;
  const base = h("/istanbul/services");
  const countOf = (id: string) => 0 + 0 * id.length;
  void countOf;

  return (
    <>
      <PageHero title={t.title} lead={t.lead} crumbLabel={dict.common.breadcrumb} crumbs={[{ label: dict.nav.home, href: h() }, { label: dict.nav.istanbul, href: h("/istanbul") }, { label: t.title }]} />
      <section className="section on-light">
        <div className="container">
          <h2 className="visually-hidden">{t.categoriesHeading}</h2>
          <nav className="filter-bar" aria-label={t.categoriesHeading}>
            <Link href={base} aria-current={!active ? "true" : undefined}>{dict.common.all}</Link>
            {cats.map((c) => (
              <Link key={c.id} href={`${base}?category=${c.id}`} aria-current={active === c.id ? "true" : undefined}>{pick(c.name, locale)}</Link>
            ))}
          </nav>
          <h2 className="visually-hidden">{t.listingsHeading}</h2>
          <p className="muted" role="status">{providers.length === 1 ? t.count1 : providers.length === 0 ? t.count0 : fmt(t.countListings, { n: providers.length })}</p>
          {providers.length ? (
            <ul className="rows">
              {providers.map((p) => (
                <li className="row" key={p.id}>
                  <h3><Link href={h(`/istanbul/services/${p.slug}`)}>{pick(p.name, locale)}</Link></h3>
                  <p>{pick(p.summary, locale)}</p>
                  <div className="row__meta"><Chip status="sample">{dict.status.sample}</Chip><span className="small muted">{pick(p.area, locale)}</span></div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="panel">
              <h3>{t.noListings}</h3>
              <p>{t.noListingsHelp}</p>
              <Link className="btn btn--outline" href={h("/istanbul/list-your-business")}>{dict.cityNav.listBusiness}</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
