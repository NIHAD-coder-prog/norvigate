import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { getExternalLinks, listProviders } from "@/lib/repo";
import { fmt, pick } from "@/i18n/config";
import { formatDate } from "@/lib/format";
import { Chip, Icon, Notice } from "@/components/ui";
import { PageHero } from "@/components/ui-server";
import { InquiryForm } from "@/components/client/InquiryForm";
import Link from "next/link";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "/istanbul/hotels", (d) => ({ title: `${d.hotels.title} | NORVIGATE`, description: d.hotels.lead }));
}

export default async function Page({ params }: LocaleParams) {
  const { locale, dict, h } = await getCtx(params);
  const t = dict.hotels;
  const links = await getExternalLinks("hotels");
  const stays = await listProviders({ categoryId: "accommodation" });
  return (
    <>
      <PageHero title={t.title} lead={t.lead} crumbLabel={dict.common.breadcrumb} crumbs={[{ label: dict.nav.home, href: h() }, { label: dict.nav.istanbul, href: h("/istanbul") }, { label: t.title }]} />
      <section className="section on-light">
        <div className="container">
          <Notice tone="warn">{t.banner}</Notice>
          <h2 style={{ marginBlockStart: "2rem" }}>{t.externalTitle}</h2>
          <p className="muted">{t.externalNote}</p>
          <ul className="rows">
            {links.map((l) => (
              <li className="row" key={l.id}>
                <h3>{l.name}</h3>
                <p>{pick(l.description, locale)} <span className="small">({fmt(t.verified, { date: formatDate(l.checkedAt, locale) })})</span></p>
                <div className="row__meta">
                  <Chip status="external">{dict.status.external}</Chip>
                  <a className="btn btn--outline btn--small" href={l.url} target="_blank" rel="noopener noreferrer">
                    {t.open} <Icon name="external" size={14} className="icon-flip" /><span className="visually-hidden"> — {dict.common.openExternal}</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
                    <h2 style={{ marginBlockStart: "2.5rem" }}>{t.listingsTitle}</h2>
          <p className="muted">{t.listingsLead}</p>
          <ul className="rows">
            {stays.map((p) => (
              <li className="row" key={p.id}>
                <h3><Link href={h(`/istanbul/services/${p.slug}`)}>{pick(p.name, locale)}</Link></h3>
                <p>{pick(p.summary, locale)}</p>
                <Chip status="sample">{dict.status.sample}</Chip>
              </li>
            ))}
          </ul>
          <h2 style={{ marginBlockStart: "2.5rem" }}>{t.integrationsTitle}</h2>
          <ul>{t.integrations.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
      </section>
      
      <section className="section on-light">
        <div className="container measure">
          <div className="panel">
            <h2>{t.formTitle}</h2>
            <p className="muted">{t.formLead}</p>
            <InquiryForm kind="travelAssist" locale={locale} dict={dict.forms} defaults={{ requestKind: "hotel" }} hide={["requestKind", "origin"]}
              labelMap={{ destination: "stayCity", departDate: "checkIn", returnDate: "checkOut" }} />
          </div>
        </div>
      </section>
    </>
  );
}
