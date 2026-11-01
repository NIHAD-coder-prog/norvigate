import Link from "next/link";
import { readiness, storeConfig } from "@/store-live/service";
import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { listProducts } from "@/lib/repo";
import { fmt, pick } from "@/i18n/config";
import { filterProducts, minPrice, storeSorts, type StoreSort } from "@/lib/store";
import { withQuery } from "@/lib/href";
import { Chip, Notice, PageHero } from "@/components/ui";
import { ProductArt } from "@/components/ProductArt";
import { Price } from "@/components/client/Price";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "/istanbul/store", (d) => ({ title: `${d.store.title} | NORVIGATE`, description: d.store.lead }));
}

type SP = { category?: string; q?: string; sort?: string };

export default async function StorePage({ params, searchParams }: LocaleParams & { searchParams: Promise<SP> }) {
  const { locale, dict, h } = await getCtx(params);
  const sp = await searchParams;
  const t = dict.store;
  const cfg = storeConfig();
  const live = cfg.mode === "live" && readiness(cfg).ready;
  const catIds = Object.keys(t.cat);
  const category = sp.category && catIds.includes(sp.category) ? sp.category : undefined;
  const q = (sp.q ?? "").slice(0, 100);
  const sort = (storeSorts as string[]).includes(sp.sort ?? "") ? (sp.sort as StoreSort) : "relevance";

  const all = await listProducts();
  const inCat = category ? all.filter((p) => p.categoryId === category) : all;
  const products = filterProducts(inCat, { q, sort, locale });
  const base = h("/istanbul/store");
  const keep = { q: q || undefined, sort: sort !== "relevance" ? sort : undefined };

  return (
    <>
      <PageHero title={t.title} lead={t.lead} chip={<Chip status={live ? "live" : "request"}>{live ? t.live.banner : t.banner}</Chip>} crumbLabel={dict.common.breadcrumb} crumbs={[{ label: dict.nav.home, href: h() }, { label: dict.nav.istanbul, href: h("/istanbul") }, { label: t.title }]} />
      <section className="section on-light">
        <div className="container">
          <Notice tone={live ? "info" : "warn"} title={live ? t.live.banner : t.banner}>{live ? t.live.bannerText : t.bannerText}</Notice>
          <div style={{ height: "1.5rem" }} />
          <nav className="filter-bar" aria-label={dict.common.category}>
            <Link href={withQuery(base, keep)} aria-current={!category ? "true" : undefined}>{t.allProducts}</Link>
            {catIds.map((c) => (
              <Link key={c} href={withQuery(base, { category: c, ...keep })} aria-current={category === c ? "true" : undefined}>{(t.cat as Record<string, string>)[c]}</Link>
            ))}
          </nav>
          <form className="toolbar" action={base} method="get" role="search">
            {category ? <input type="hidden" name="category" value={category} /> : null}
            <div className="field">
              <label className="field__label" htmlFor="store-q">{dict.common.search}</label>
              <input id="store-q" className="input" type="search" name="q" defaultValue={q} placeholder={t.searchPlaceholder} />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="store-sort">{dict.common.sortBy}</label>
              <select id="store-sort" className="select" name="sort" defaultValue={sort}>
                {storeSorts.map((s) => <option key={s} value={s}>{(t.sort as Record<string, string>)[s]}</option>)}
              </select>
            </div>
            <button type="submit" className="btn btn--outline">{dict.common.apply}</button>
          </form>
          <p className="muted" role="status">{products.length === 1 ? dict.common.result1 : fmt(dict.common.results, { n: products.length })}</p>
          {products.length ? (
            <div className="grid grid--3">
              {products.map((p) => (
                <Link key={p.id} href={h(`/istanbul/store/${p.slug}`)} className="tile">
                  <ProductArt product={p} sampleLabel={dict.status.sample} />
                  <div className="tile__body">
                    <h3>{pick(p.name, locale)}</h3>
                    <p>{pick(p.summary, locale)}</p>
                    <span className="small muted">{t.from} </span><Price minor={minPrice(p)} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="panel" role="status">
              <h2>{t.noResults}</h2>
              <p>{t.noResultsHelp}</p>
              <Link className="btn btn--outline" href={base}>{dict.common.reset}</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
