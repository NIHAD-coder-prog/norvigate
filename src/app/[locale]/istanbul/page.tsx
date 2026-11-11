import Link from "next/link";
import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { listExperiences, listGuide, listProviderCategories, listProviders } from "@/lib/repo";
import { pick } from "@/i18n/config";
import { Chip, Icon, Notice } from "@/components/ui";
import { SectionHead } from "@/components/ui-server";
import { getProviderCategory } from "@/data/categories";
import { Skyline } from "@/components/Skyline";
import { WeatherNow } from "@/components/client/WeatherNow";
import { ISTANBUL, istanbulToday, prayerTimes } from "@/lib/prayer";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "/istanbul", (d) => ({ title: `${d.meta.cityName} | NORVIGATE`, description: d.meta.cityDescription }));
}

export default async function IstanbulHome({ params }: LocaleParams) {
  const { locale, dict, h } = await getCtx(params);
  const [cats, providers, experiences, guide] = await Promise.all([listProviderCategories(), listProviders(), listExperiences(), listGuide()]);
  const t = dict.istanbul;
  const { y, m, d } = istanbulToday();
  const times = prayerTimes(y, m, d, ISTANBUL.lat, ISTANBUL.lng, ISTANBUL.tz);
  const prayers = ["fajr", "dhuhr", "asr", "maghrib", "isha"] as const;
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Istanbul", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const nowMin = Number(parts.find((p) => p.type === "hour")?.value ?? 0) * 60 + Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const toMin = (v: string) => Number(v.slice(0, 2)) * 60 + Number(v.slice(3));
  const next = prayers.find((k) => toMin(times[k]) > nowMin) ?? "fajr";

  const br = dict.brand;
  return (
    <>
      <section className="hero hero--center on-dark">
        <div className="hero__skyline"><Skyline fill="#9fb0e6" /></div>
        <div className="container hero__grid" style={{ paddingBlockEnd: "clamp(3.5rem, 8vw, 5.5rem)" }}>
          <div className="hero__copy" style={{ width: "100%" }}>
            <p className="hero__eyebrow">{br.descriptor}</p>
            <h1>{dict.meta.cityTagline}</h1>
            <p className="hero__sub">{br.subline}</p>
            <p className="lead">{t.homeLead}</p>
            <form action={h("/istanbul/search")} method="get" role="search" aria-label={dict.common.searchAll} className="hero-search" style={{ marginInline: "auto" }}>
              <label className="visually-hidden" htmlFor="hero-q">{dict.common.searchAll}</label>
              <input id="hero-q" type="search" name="q" placeholder={dict.common.searchPlaceholder} autoComplete="off" />
              <button type="submit" className="btn btn--primary btn--small"><Icon name="search" size={16} /> {dict.common.search}</button>
            </form>
          </div>
        </div>
      </section>

      <div className="container on-light">
        <div className="doors">
          <article className="door">
            <span className="door__icon"><Icon name="compass" size={28} /></span>
            <Chip status="live">{dict.status.preview}</Chip>
            <h3>{t.freeGate.title}</h3>
            <p>{t.freeGate.text}</p>
            <ul>{t.freeGate.items.map((x) => <li key={x}>{x}</li>)}</ul>
            <Link className="btn btn--navy" href={h("/istanbul/guide")}>{t.freeGate.cta}</Link>
          </article>
          <article className="door door--premium">
            <span className="door__icon"><Icon name="briefcase" size={28} /></span>
            <Chip status="planned">{dict.status.planned}</Chip>
            <h3>{t.premiumGate.title}</h3>
            <p>{t.premiumGate.text}</p>
            <ul>{t.premiumGate.items.map((x) => <li key={x}>{x}</li>)}</ul>
            <Link className="btn btn--primary" href={h("/istanbul/premium")}>{t.premiumGate.cta}</Link>
          </article>
        </div>
      </div>

      <section className="today-strip on-light" style={{ marginBlockStart: "clamp(2.5rem, 5vw, 3.5rem)" }}>
        <div className="container today">
          <div className="today__label">{t.todayTitle}</div>
          <ul className="today__prayers">
            {prayers.map((k) => (
              <li key={k} aria-current={k === next ? "true" : undefined}>
                {dict.tools.prayers[k]}
                <b dir="ltr">{times[k]}</b>
              </li>
            ))}
          </ul>
          <Link className="btn btn--outline btn--small" href={h("/istanbul/tools")}>{t.todayTools}</Link>
          <p className="small muted today__note">{dict.tools.prayerNote} <WeatherNow t={dict.tools} locale={locale} /></p>
        </div>
      </section>

      <section className="section--tight on-light">
        <div className="container"><Notice tone="sample" title={t.previewTitle}>{t.previewText}</Notice></div>
      </section>

      <section className="section on-light">
        <div className="container">
          <SectionHead title={br.exploreTitle} />
          <div className="cat-grid">
            {cats.map((c) => (
              <Link key={c.id} href={`${h("/istanbul/services")}?category=${c.id}`} className="cat">
                <Icon name={c.icon} size={28} />
                <div>
                  <h3>{pick(c.name, locale)}</h3>
                  <p>{pick(c.description, locale)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white on-light">
        <div className="container">
          <SectionHead title={t.quickTitle} />
          <div className="grid grid--3">
            {t.quick.map((q) => (
              <Link key={q.href} href={h(q.href)} className="tile">
                <div className="tile__body"><h3>{q.title}</h3><p>{q.text}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section on-light">
        <div className="container">
          <SectionHead title={t.listingsTitle} lead={t.listingsLead} />
          <ul className="rows">
            {providers.slice(0, 4).map((p) => (
              <li className="row" key={p.id}>
                <h3><Link href={h(`/istanbul/services/${p.slug}`)}>{pick(p.name, locale)}</Link></h3>
                <p>{pick(p.summary, locale)}</p>
                <div className="row__meta"><Chip status="sample">{dict.status.sample}</Chip><span className="small muted">{pick(getProviderCategory(p.categoryId)!.name, locale)}</span></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--white on-light">
        <div className="container">
          <SectionHead title={t.experiencesTitle} />
          <div className="grid grid--3">
            {experiences.slice(0, 3).map((e) => (
              <div key={e.id}>
                <div className="slot" role="img" aria-label={br.photoSlot}>{br.photoSlot}</div>
                <h3 style={{ marginBlockStart: "1rem" }}>{pick(e.title, locale)}</h3>
                <p className="muted">{pick(e.summary, locale)}</p>
                <Chip status="sample">{dict.status.sample}</Chip>
              </div>
            ))}
          </div>
          <p style={{ marginBlockStart: "1.5rem" }}><Link className="btn btn--outline btn--small" href={h("/istanbul/experiences")}>{dict.common.viewAll}</Link></p>
        </div>
      </section>

      <section className="section on-light">
        <div className="container">
          <SectionHead title={t.guideTitle} lead={t.guideLead} />
          <ul className="rows">
            {guide.slice(0, 3).map((g) => (
              <li className="row" key={g.id}>
                <h3><Link href={`${h("/istanbul/guide")}#${g.id}`}>{pick(g.title, locale)}</Link></h3>
                <p>{pick(g.body[0], locale)}</p>
                <span />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
