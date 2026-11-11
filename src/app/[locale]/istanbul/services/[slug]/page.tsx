import Link from "next/link";
import { notFound } from "next/navigation";
import { getCtx, type LocaleParams } from "@/lib/page";
import { getProvider, listProviders } from "@/lib/repo";
import { getProviderCategory } from "@/data/categories";
import { pick } from "@/i18n/config";
import { languageName } from "@/i18n/world-languages";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { Chip, Notice } from "@/components/ui";
import { PageHero } from "@/components/ui-server";
import { InquiryForm } from "@/components/client/InquiryForm";

type P = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: P) {
  const { locale, dict } = await getCtx(params);
  const { slug } = await params;
  const p = await getProvider(slug);
  if (!p) return {};
  return buildMetadata({ locale, path: `/istanbul/services/${slug}`, title: `${pick(p.name, locale)} | NORVIGATE`, description: pick(p.summary, locale) });
}

export default async function ProviderPage({ params }: P) {
  const { locale, dict, h } = await getCtx(params);
  const { slug } = await params;
  const p = await getProvider(slug);
  if (!p) notFound();
  const cat = getProviderCategory(p.categoryId)!;
  const t = dict.services.detail;
  const related = (await listProviders({ categoryId: p.categoryId })).filter((x) => x.id !== p.id);
  const name = pick(p.name, locale);

  return (
    <>
      <PageHero
        title={name}
        lead={pick(p.summary, locale)}
        chip={<Chip status="sample">{dict.status.sample}</Chip>}
        crumbLabel={dict.common.breadcrumb}
        crumbs={[
          { label: dict.nav.home, href: h() },
          { label: dict.nav.istanbul, href: h("/istanbul") },
          { label: dict.services.title, href: h("/istanbul/services") },
          { label: name },
        ]}
      />
      <section className="section on-light">
        <div className="container cols-2">
          <div>
            <Notice tone="sample" title={t.sampleTitle}>{t.sampleText}</Notice>
            <div className="prose">
              <h2>{t.about}</h2>
              <p>{pick(p.description, locale)}</p>
              <h2>{t.facts}</h2>
              <dl className="kv">
                <dt>{dict.common.category}</dt>
                <dd><Link href={`${h("/istanbul/services")}?category=${cat.id}`}>{pick(cat.name, locale)}</Link></dd>
                <dt>{dict.common.area}</dt>
                <dd>{pick(p.area, locale)}</dd>
                {p.serviceArea ? (<><dt>{t.serviceArea}</dt><dd>{pick(p.serviceArea, locale)}</dd></>) : null}
                <dt>{dict.common.languages}</dt>
                <dd>{p.languages.map((l) => languageName(l, locale)).join(", ")}</dd>
                {p.accessibility ? (<><dt>{t.accessibility}</dt><dd>{pick(p.accessibility, locale)}</dd></>) : null}
                {p.openingHours ? (<><dt>{dict.common.lastUpdated}</dt><dd>{pick(p.openingHours, locale)}</dd></>) : null}
                {p.priceInfo ? (<><dt>{dict.common.priceOnRequest}</dt><dd>{pick(p.priceInfo, locale)}</dd></>) : null}
                <dt>{dict.common.lastUpdated}</dt>
                <dd>{formatDate(p.lastUpdated, locale)}</dd>
              </dl>
              <h2>{t.contactTitle}</h2>
              {p.contact?.phone || p.contact?.email || p.contact?.website ? (
                <ul>
                  {p.contact.phone ? <li dir="ltr">{p.contact.phone}</li> : null}
                  {p.contact.email ? <li dir="ltr">{p.contact.email}</li> : null}
                  {p.contact.website ? <li dir="ltr"><a href={p.contact.website} rel="noopener noreferrer" target="_blank">{p.contact.website}</a></li> : null}
                </ul>
              ) : (
                <p>{t.contactNone}</p>
              )}
            </div>
            {related.length ? (
              <>
                <h2 style={{ marginBlockStart: "2.5rem" }}>{t.related}</h2>
                <ul className="rows">
                  {related.map((r) => (
                    <li className="row" key={r.id}>
                      <h3><Link href={h(`/istanbul/services/${r.slug}`)}>{pick(r.name, locale)}</Link></h3>
                      <p>{pick(r.summary, locale)}</p>
                      <Chip status="sample">{dict.status.sample}</Chip>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
          <aside className="panel">
            <h2>{t.enquire}</h2>
            <p className="small muted">{t.enquireNote}</p>
            <InquiryForm kind="contact" locale={locale} dict={dict.forms} defaults={{ topic: "listing", message: `${name}: ` }} hide={["topic"]} />
          </aside>
        </div>
      </section>
    </>
  );
}
