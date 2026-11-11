import { notFound } from "next/navigation";
import { getCtx } from "@/lib/page";
import { getTravelService, listTravelServices } from "@/lib/repo";
import { pick } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { Chip, Notice } from "@/components/ui";
import { PageHero } from "@/components/ui-server";
import { InquiryForm } from "@/components/client/InquiryForm";

type P = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: P) {
  const { locale } = await getCtx(params);
  const { slug } = await params;
  const s = await getTravelService(slug);
  if (!s) return {};
  return buildMetadata({ locale, path: `/istanbul/travel/${slug}`, title: `${pick(s.title, locale)} | NORVIGATE`, description: pick(s.summary, locale) });
}

export default async function TravelDetail({ params }: P) {
  const { locale, dict, h } = await getCtx(params);
  const { slug } = await params;
  const s = await getTravelService(slug);
  if (!s) notFound();
  const all = await listTravelServices();
  const t = dict.travel.detail;
  const title = pick(s.title, locale);
  return (
    <>
      <PageHero title={title} lead={pick(s.summary, locale)} chip={<Chip status="sample">{dict.status.sample}</Chip>} crumbLabel={dict.common.breadcrumb}
        crumbs={[{ label: dict.nav.home, href: h() }, { label: dict.nav.istanbul, href: h("/istanbul") }, { label: dict.travel.title, href: h("/istanbul/travel") }, { label: title }]} />
      <section className="section on-light">
        <div className="container cols-2">
          <div className="prose">
            <Notice tone="sample">{t.sampleText}</Notice>
            <h2>{t.about}</h2>
            <p>{pick(s.description, locale)}</p>
            <dl className="kv">
              <dt>{t.location}</dt><dd>{pick(s.location, locale)}</dd>
              {s.duration ? (<><dt>{t.duration}</dt><dd>{pick(s.duration, locale)}</dd></>) : null}
              <dt>{t.price}</dt><dd>{s.indicativePrice ? pick(s.indicativePrice, locale) : t.priceNone}</dd>
            </dl>
            <h2>{t.includes}</h2>
            <ul>{s.inclusions.map((x, i) => <li key={i}>{pick(x, locale)}</li>)}</ul>
            <h2>{t.excludes}</h2>
            <ul>{s.exclusions.map((x, i) => <li key={i}>{pick(x, locale)}</li>)}</ul>
          </div>
          <aside className="panel">
            <h2>{t.formTitle}</h2>
            <p className="small muted">{t.formLead}</p>
            <InquiryForm kind="tourism" locale={locale} dict={dict.forms} defaults={{ service: s.slug }}
              dynamicOptions={{ travelServices: all.map((x) => ({ value: x.slug, label: pick(x.title, locale) })) }} />
          </aside>
        </div>
      </section>
    </>
  );
}
