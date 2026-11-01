import Link from "next/link";
import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { searchContent, facetIds, type SearchType } from "@/lib/search";
import { fmt } from "@/i18n/config";
import { withQuery } from "@/lib/href";
import { Chip, Notice, PageHero } from "@/components/ui";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "/istanbul/search", (d) => ({ title: `${d.search.title} | NORVIGATE`, description: d.search.lead }));
}

type SP = { q?: string; type?: string; category?: string; sort?: string };
const TYPES = ["provider", "experience", "travel", "product", "guide"] as const;

export default async function SearchPage({ params, searchParams }: LocaleParams & { searchParams: Promise<SP> }) {
  const { locale, dict, h } = await getCtx(params);
  const sp = await searchParams;
  const t = dict.search;
  const q = (sp.q ?? "").trim().slice(0, 100);
  const type = (TYPES as readonly string[]).includes(sp.type ?? "") ? (sp.type as SearchType) : undefined;
  const sort = sp.sort === "name" ? "name" : "relevance";
  const facetOptions = type && type !== "guide" ? facetIds[type] : [];
  const category = type && sp.category && facetOptions.includes(sp.category) ? `${type}:${sp.category}` : undefined;

  let hits: Awaited<ReturnType<typeof searchContent>> = [];
  let failed = false;
  if (q) {
    try {
      hits = await searchContent({ q, type, facet: category, sort, locale });
    } catch {
      failed = true;
    }
  }

  const catLabel = (id: string): string => {
    const d = dict as unknown as { services: unknown; store: { cat: Record<string, string> }; experiences: { cat: Record<string, string> }; travel: { cat: Record<string, string> } };
    return d.store.cat[id] ?? d.experiences.cat[id] ?? d.travel.cat[id] ?? id;
  };
  const base = h("/istanbul/search");

  return (
    <>
      <PageHero title={t.title} lead={t.lead} crumbLabel={dict.common.breadcrumb} crumbs={[{ label: dict.nav.home, href: h() }, { label: dict.nav.istanbul, href: h("/istanbul") }, { label: t.title }]} />
      <section className="section on-light">
        <div className="container">
          <form className="toolbar" action={base} method="get" role="search">
            <div className="field">
              <label className="field__label" htmlFor="s-q">{dict.common.search}</label>
              <input id="s-q" className="input" type="search" name="q" defaultValue={q} placeholder={t.placeholder} />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="s-type">{t.typeLabel}</label>
              <select id="s-type" className="select" name="type" defaultValue={type ?? ""}>
                <option value="">{(t.types as Record<string, string>).all}</option>
                {TYPES.map((x) => <option key={x} value={x}>{(t.types as Record<string, string>)[x]}</option>)}
              </select>
            </div>
            <button type="submit" className="btn btn--primary">{dict.common.search}</button>
          </form>

          {facetOptions.length ? (
            <nav className="filter-bar" aria-label={t.categoryLabel}>
              <Link href={withQuery(base, { q, type })} aria-current={!category ? "true" : undefined}>{t.allCategories}</Link>
              {facetOptions.map((c) => (
                <Link key={c} href={withQuery(base, { q, type, category: c })} aria-current={category === `${type}:${c}` ? "true" : undefined}>{catLabel(c)}</Link>
              ))}
            </nav>
          ) : null}

          {!q ? (
            <div className="panel"><h2>{t.startTitle}</h2><p>{t.startText}</p></div>
          ) : failed ? (
            <Notice tone="error" role="alert" title={t.errorTitle}>{t.errorText}</Notice>
          ) : hits.length === 0 ? (
            <div className="panel" role="status"><h2>{t.emptyTitle}</h2><p>{fmt(t.emptyText, { q })}</p></div>
          ) : (
            <>
              <p role="status"><strong>{fmt(t.resultsFor, { q })}</strong> — {hits.length === 1 ? dict.common.result1 : fmt(dict.common.results, { n: hits.length })}
                {" · "}
                <Link href={withQuery(base, { q, type, category: sp.category, sort: sort === "name" ? undefined : "name" })}>{sort === "name" ? t.sortRelevance : t.sortName}</Link>
              </p>
              <ul className="rows">
                {hits.map((x) => (
                  <li className="row" key={`${x.type}:${x.id}`}>
                    <h3><Link href={h(x.href)}>{x.title}</Link></h3>
                    <p>{x.summary}</p>
                    <div className="row__meta">
                      <Chip status="preview">{(t.typeSingular as Record<string, string>)[x.type]}</Chip>
                      {x.sample ? <Chip status="sample">{dict.status.sample}</Chip> : null}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </>
  );
}
