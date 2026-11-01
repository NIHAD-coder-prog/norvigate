import Link from "next/link";
import { notFound } from "next/navigation";
import { readiness, storeConfig } from "@/store-live/service";
import { getCtx } from "@/lib/page";
import { getProduct, listProducts } from "@/lib/repo";
import { collections } from "@/data";
import { fmt, pick } from "@/i18n/config";
import { formatDate, formatWeight } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { Chip, Notice, PageHero } from "@/components/ui";
import { ProductArt } from "@/components/ProductArt";
import { AddToCart } from "@/components/client/AddToCart";

type P = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: P) {
  const { locale } = await getCtx(params);
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return {};
  return buildMetadata({ locale, path: `/istanbul/store/${slug}`, title: `${pick(p.name, locale)} | NORVIGATE`, description: pick(p.summary, locale) });
}

export default async function ProductPage({ params }: P) {
  const { locale, dict, h } = await getCtx(params);
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();
  const t = dict.store;
  const d = t.detail;
  const cfg = storeConfig();
  const live = cfg.mode === "live" && readiness(cfg).ready;
  const name = pick(p.name, locale);
  const related = (await listProducts({ categoryId: p.categoryId })).filter((x) => x.id !== p.id).slice(0, 3);
  const allergens = p.allergens.contains.map((a) => (collections.allergenLabels[a] ? pick(collections.allergenLabels[a], locale) : a));

  return (
    <>
      <PageHero title={name} lead={pick(p.summary, locale)} chip={p.dataStatus === "sample" ? <Chip status="sample">{d.sampleBadge}</Chip> : undefined} crumbLabel={dict.common.breadcrumb}
        crumbs={[{ label: dict.nav.home, href: h() }, { label: dict.nav.istanbul, href: h("/istanbul") }, { label: t.title, href: h("/istanbul/store") }, { label: name }]} />
      <section className="section on-light">
        <div className="container">
          <div className="cols-2 cols-2--even">
            <ProductArt product={p} sampleLabel={dict.status.sample} />
            <div>
              <p className="small muted">{(t.cat as Record<string, string>)[p.categoryId]}</p>
              <AddToCart productId={p.id} dict={t} cartHref={h("/istanbul/store/cart")}
                variants={p.variants.map((v) => ({ id: v.id, label: pick(v.label, locale), priceMinor: v.priceMinor }))} />
              {p.dataStatus === "sample" ? <p className="small muted">{t.priceNote}</p> : null}
              <Notice tone={live ? "info" : "warn"}>{live ? t.live.bannerText : t.bannerText}</Notice>
            </div>
          </div>

          <div className="prose" style={{ marginBlockStart: "2.5rem" }}>
            <h2>{d.description}</h2>
            <p>{pick(p.description, locale)}</p>
            <dl className="kv">
              {p.ingredients ? (<><dt>{d.ingredients}</dt><dd>{pick(p.ingredients, locale)}</dd></>) : null}
              <dt>{d.allergens}</dt><dd>{allergens.length ? allergens.join(", ") : "—"}</dd>
              {p.shelfLifeDays ? (<><dt>{d.shelfLife}</dt><dd>{fmt(d.shelfLifeValue, { n: p.shelfLifeDays })}</dd></>) : null}
              {p.storage ? (<><dt>{d.storage}</dt><dd>{pick(p.storage, locale)}</dd></>) : null}
              {p.shipping.packageWeightGrams ? (<><dt>{d.weight}</dt><dd>{formatWeight(p.shipping.packageWeightGrams, locale)}</dd></>) : null}
              <dt>{t.stock}</dt><dd>{(t.stockStatus as Record<string, string>)[p.stock.status]}</dd>
              <dt>{dict.common.lastUpdated}</dt><dd>{formatDate(p.lastUpdated, locale)}</dd>
            </dl>
            {p.dataStatus === "sample" ? <Notice tone="warn">{d.allergenWarning}</Notice> : null}
            <h2>{d.shippingTitle}</h2>
            <p>{d.shippingDomestic}</p>
            <p>{d.shippingInternational}</p>
            <p>{d.taxes}</p>
          </div>

          {related.length ? (
            <section style={{ marginBlockStart: "2.5rem" }}>
              <h2>{d.related}</h2>
              <div className="grid grid--3">
                {related.map((r) => (
                  <Link key={r.id} href={h(`/istanbul/store/${r.slug}`)} className="tile">
                    <ProductArt product={r} sampleLabel={dict.status.sample} />
                    <div className="tile__body"><h3>{pick(r.name, locale)}</h3></div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </>
  );
}
