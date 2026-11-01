import Link from "next/link";
import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { pick } from "@/i18n/config";
import { listCities } from "@/lib/repo";
import { Chip, Icon, SectionHead } from "@/components/ui";
import { LivingMark } from "@/components/client/LivingMark";
import { Skyline } from "@/components/Skyline";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "", (d) => ({ title: `${d.meta.siteName} — ${d.meta.tagline}`, description: d.meta.description }));
}

export default async function HomePage({ params }: LocaleParams) {
  const { locale, dict, h } = await getCtx(params);
  const cities = await listCities();
  const live = cities.filter((c) => c.status === "preview");
  const b = dict.brand;
  const icons = ["compass", "briefcase", "globe"];

  return (
    <>
      <section className="hero hero--split on-dark">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="hero__eyebrow">{b.descriptor}</p>
            <h1>{dict.meta.tagline}</h1>
            <p className="hero__sub">{b.subline}</p>
            <p className="lead">{b.hubLead}</p>
            <div className="hero__actions">
              <Link className="btn btn--primary" href={h("/istanbul")}>{b.enterIstanbul}</Link>
              <Link className="btn btn--secondary" href={h("/about")}>{b.aboutCta}</Link>
            </div>
          </div>
          <LivingMark kind="gate" label={dict.meta.siteName} />
        </div>
      </section>

      <section className="section on-light">
        <div className="container">
          <SectionHead title={b.pillarsTitle} />
          <div className="value-list">
            {b.pillars.map((p, i) => (
              <div key={p.title}>
                <Icon name={icons[i]} size={28} />
                <h3 style={{ marginBlockStart: ".6rem" }}>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white on-light">
        <div className="container">
          <SectionHead title={b.cityTitle} lead={b.cityLead} />
          <div className="cols-2 cols-2--even">
            {live.map((c) => (
              <article key={c.id} className="cities-hero-card">
                <div className="sk"><Skyline fill="#9fb0e6" /></div>
                <Chip status="preview">{b.cityLive}</Chip>
                <h3>{pick(c.name, locale)}</h3>
                <p style={{ margin: 0 }}>{pick(c.tagline, locale)}</p>
                <Link className="btn btn--primary" href={h("/istanbul")}>{b.enterIstanbul}</Link>
              </article>
            ))}
            <div className="panel panel--aside">
              <h3>{dict.cities.suggestTitle}</h3>
              <p className="muted">{dict.cities.suggestText}</p>
              <Link className="btn btn--outline" href={`${h("/cities")}#suggest`}>{dict.cities.suggestCta}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section on-light">
        <div className="container">
          <SectionHead title={b.nameTitle} />
          <div className="name-grid">
            {b.name.map((n) => (
              <div key={n.part}>
                <b className={n.part === "GATE" ? "gold" : undefined}>{n.part}</b>
                <p>{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section on-light" style={{ paddingBlockStart: 0 }}>
        <div className="container">
          <div className="sister">
            <div>
              <h3>{b.sisterTitle}</h3>
              <p>{b.sisterText}</p>
            </div>
            <a className="btn btn--primary" href="https://norvigiq.com" target="_blank" rel="noopener noreferrer">{b.sisterCta}</a>
          </div>
        </div>
      </section>
    </>
  );
}
