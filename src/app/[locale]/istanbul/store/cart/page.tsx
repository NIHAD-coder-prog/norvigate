import { readiness, storeConfig } from "@/store-live/service";
import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { listProducts } from "@/lib/repo";
import { pick } from "@/i18n/config";
import { Notice } from "@/components/ui";
import { PageHero } from "@/components/ui-server";
import { CartView } from "@/components/client/CartView";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "/istanbul/store/cart", (d) => ({ title: `${d.store.cart.title} | NORVIGATE`, description: d.store.bannerText }));
}

export default async function CartPage({ params }: LocaleParams) {
  const { locale, dict, h } = await getCtx(params);
  const products = await listProducts();
  const t = dict.store;
  const cfg = storeConfig();
  const live = cfg.mode === "live" && readiness(cfg).ready;
  const catalog = products.map((p) => ({
    id: p.id, slug: p.slug, name: pick(p.name, locale), motif: p.motif, categoryId: p.categoryId,
    variants: p.variants.map((v) => ({ id: v.id, label: pick(v.label, locale), priceMinor: v.priceMinor })),
  }));
  return (
    <>
      <PageHero title={t.cart.title} crumbLabel={dict.common.breadcrumb} crumbs={[{ label: dict.nav.home, href: h() }, { label: dict.nav.istanbul, href: h("/istanbul") }, { label: t.title, href: h("/istanbul/store") }, { label: t.cart.title }]} />
      <section className="section on-light">
        <div className="container">
          <Notice tone={live ? "info" : "warn"} title={live ? t.live.banner : t.banner}>{live ? t.live.bannerText : t.bannerText}</Notice>
          <div style={{ height: "1.5rem" }} />
          <CartView catalog={catalog} locale={locale} dict={t} forms={dict.forms} storeHref={h("/istanbul/store")} productHref={h("/istanbul/store")} checkoutHref={live ? h("/istanbul/store/checkout") : undefined} />
        </div>
      </section>
    </>
  );
}
