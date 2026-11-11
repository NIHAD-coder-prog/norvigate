import { isCityShown } from "@/config/visibility";
import { istanbulStatus } from "@/data/network";
import { ISTANBUL_URL } from "@/data/cities";
import Link from "next/link";
import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { listCities, listProviderCategories } from "@/lib/repo";
import { pick } from "@/i18n/config";
import { languageName } from "@/i18n/world-languages";
import { StatusLight, StatusTag } from "@/components/NetworkSection";
import { PageHero } from "@/components/ui-server";
import { InquiryForm } from "@/components/client/InquiryForm";
import { Skyline } from "@/components/Skyline";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "/cities", (d) => ({ title: `${d.cities.title} | NORVIGATE`, description: d.cities.lead }));
}

export default async function CitiesPage({ params }: LocaleParams) {
  const { locale, dict, h } = await getCtx(params);
  const [cities, cats] = await Promise.all([listCities(), listProviderCategories()]);
  const t = dict.cities;

  return (
    <>
      <PageHero title={t.title} lead={t.lead} crumbLabel={dict.common.breadcrumb} crumbs={[{ label: dict.nav.home, href: h() }, { label: t.title }]} />
      <section className="section on-light">
        <div className="container" style={{ display: "grid", gap: "1.5rem" }}>
          {cities.filter((c) => isCityShown(c.id, c.status === "preview" ? istanbulStatus : "planned")).map((c) => {
            const live = c.status === "preview";
            const arch = live ? (
              <Skyline fill="#9fb0e6" />
            ) : (
              <span>{dict.status.comingSoon}</span>
            );
            return (
              <article key={c.id} className={`city-card${live ? "" : " city-card--soon"}`}>
                <div className={`arch${live ? "" : " arch--empty"}`}>{arch}</div>
                <div>
                  <h2 style={{ marginBlockEnd: ".25rem" }}>{pick(c.name, locale)}</h2>
                  <p style={{ margin: "0 0 .8rem", fontWeight: 800 }}>{pick(c.platformName, locale)}</p>
                  <StatusLight status={live ? istanbulStatus : "planned"} label={dict.network.status[live ? istanbulStatus : "planned"].label} />
                  <p>{pick(c.description, locale)}</p>
                  <dl className="kv">
                    <dt>{t.country}</dt>
                    <dd>{pick(c.country, locale)}</dd>
                    <dt>{t.languagesLabel}</dt>
                    <dd>{c.languages.map((l) => languageName(l, locale)).join(", ")}</dd>
                    {live ? (
                      <>
                        <dt>{t.featured}</dt>
                        <dd>{c.featuredCategoryIds.map((id) => { const cat = cats.find((x) => x.id === id); return cat ? pick(cat.name, locale) : id; }).join(", ")}</dd>
                      </>
                    ) : null}
                    <dt>{t.platformUrl}</dt>
                    <dd>{live ? <a href={ISTANBUL_URL} dir="ltr">{c.plannedUrl}</a> : <span dir="ltr">{c.plannedUrl}</span>}</dd>
                  </dl>
                  {live ? (
                    <>
                      <p className="small muted">{t.onThisSite}</p>
                      <a className="btn btn--primary" href={ISTANBUL_URL}>{t.enter}<StatusTag label={dict.network.status[istanbulStatus].label} /></a>
                    </>
                  ) : (
                    <p className="muted">{t.notLive}</p>
                  )}
                </div>
              </article>
            );
          })}
          <div className="panel" id="suggest">
            <h2>{t.suggestTitle}</h2>
            <p>{t.suggestText}</p>
            <InquiryForm kind="city" locale={locale} dict={dict.forms} />
          </div>
        </div>
      </section>
    </>
  );
}
