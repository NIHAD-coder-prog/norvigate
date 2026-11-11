import Link from "next/link";
import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { pick } from "@/i18n/config";
import { listCities } from "@/lib/repo";
import { Icon } from "@/components/ui";
import { SectionHead } from "@/components/ui-server";
import { LivingMark } from "@/components/client/LivingMark";
import { Skyline } from "@/components/Skyline";
import { DisplayHeading } from "@/components/Display";
import { ISTANBUL_URL } from "@/data/cities";
import { isCityShown, isShown } from "@/config/visibility";
import { istanbulStatus, pillarStatus } from "@/data/network";
import { NetworkSection, StatusLight, StatusTag } from "@/components/NetworkSection";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "", (d) => ({ title: `${d.meta.siteName} — ${d.meta.tagline}`, description: d.meta.description }));
}

export default async function HomePage({ params }: LocaleParams) {
  const { locale, dict, h } = await getCtx(params);
  const cities = await listCities();
  const live = isCityShown("istanbul", istanbulStatus) ? cities.filter((c) => c.status === "preview") : [];
  const b = dict.brand;
  const icons = ["compass", "briefcase", "globe"];

  return (
    <>
      <section className="hero hero--split on-dark">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="hero__eyebrow">{b.descriptor}</p>
            <DisplayHeading as="h1" text={dict.meta.tagline} mode="strong" />
            <p className="hero__sub">{b.subline}</p>
            <p className="lead">{b.hubLead}</p>
            <div className="hero__actions">
              {isCityShown("istanbul", istanbulStatus) ? <a className="btn btn--primary" href={ISTANBUL_URL}>{b.enterIstanbul}<StatusTag label={dict.network.status[istanbulStatus].label} /></a> : null}
              <Link className="btn btn--secondary" href={h("/about")}>{b.aboutCta}</Link>
            </div>
          </div>
          <LivingMark kind="gate" label={dict.meta.siteName} />
        </div>
      </section>

      <NetworkSection dict={dict} h={h} />

      {pillarStatus.some((st) => isShown(st)) ? (
      <section className="section on-light">
        <div className="container">
          <SectionHead title={b.pillarsTitle} />
          <div className="value-list">
            {b.pillars.map((p, i) => (isShown(pillarStatus[i]) ? (
              <div key={p.title}>
                <Icon name={icons[i]} size={28} />
                <DisplayHeading as="h3" text={p.title} style={{ marginBlockStart: ".6rem" }} />
                <p>{p.text}</p>
              </div>
            ) : null))}
          </div>
        </div>
      </section>
      ) : null}

      <section className="section section--white on-light">
        <div className="container">
          <SectionHead title={b.cityTitle} lead={live.length > 0 ? b.cityLead : undefined} />
          <div className="cols-2 cols-2--even">
            {live.map((c) => (
              <article key={c.id} className="cities-hero-card">
                <div className="sk"><Skyline fill="#9fb0e6" /></div>
                <StatusLight status={istanbulStatus} label={dict.network.status[istanbulStatus].label} />
                <DisplayHeading as="h3" text={pick(c.name, locale)} />
                <p style={{ margin: 0 }}>{pick(c.tagline, locale)}</p>
                <a className="btn btn--primary" href={ISTANBUL_URL}>{b.enterIstanbul}<StatusTag label={dict.network.status[istanbulStatus].label} /></a>
              </article>
            ))}
            <div className="panel panel--aside">
              <DisplayHeading as="h3" text={dict.cities.suggestTitle} />
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
              <DisplayHeading as="h3" text={b.sisterTitle} />
              <p>{b.sisterText}</p>
            </div>
            <a className="btn btn--primary" href="https://norvigiq.com" target="_blank" rel="noopener noreferrer">{b.sisterCta}</a>
          </div>
        </div>
      </section>
    </>
  );
}
