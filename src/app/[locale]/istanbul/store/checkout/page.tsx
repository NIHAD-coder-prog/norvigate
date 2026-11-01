import { redirect } from "next/navigation";
import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { Notice, PageHero } from "@/components/ui";
import { CheckoutForm } from "@/components/client/CheckoutForm";
import { activeShipping, readiness, storeConfig } from "@/store-live/service";
import { shippableCountries } from "@/store-live/pricing";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "/istanbul/store/checkout", (d) => ({ title: `${d.store.live.checkoutTitle} | NORVIGATE`, description: d.store.live.bannerText }));
}

export default async function CheckoutPage({ params }: LocaleParams) {
  const { locale, dict, h } = await getCtx(params);
  const config = storeConfig();
  if (config.mode !== "live") redirect(h("/istanbul/store/cart"));
  const ready = readiness(config);
  const t = dict.store.live;
  const names = new Intl.DisplayNames([locale], { type: "region" });
  const countries = shippableCountries(activeShipping(config)).map((code) => ({ code, label: names.of(code) ?? code }));
  const crumbs = [{ label: dict.nav.home, href: h() }, { label: dict.nav.istanbul, href: h("/istanbul") }, { label: dict.store.title, href: h("/istanbul/store") }, { label: t.checkoutTitle }];
  if (!ready.ready) console.error("[store] checkout page closed:", ready.issues.join(", "));
  return (
    <>
      <PageHero title={t.checkoutTitle} crumbLabel={dict.common.breadcrumb} crumbs={crumbs} />
      <section className="section on-light">
        <div className="container">
          {ready.ready ? (
            <CheckoutForm
              locale={locale}
              dict={dict.store}
              forms={dict.forms}
              countries={countries}
              identityRequired={!config.defaultIdentityNumber}
              links={{ terms: h("/istanbul/store/terms"), shipping: h("/istanbul/store/shipping-returns"), cart: h("/istanbul/store/cart") }}
            />
          ) : (
            <div className="panel">
              <Notice tone="warn" title={t.closedTitle}>{t.closedText}</Notice>
              <p style={{ marginBlockStart: "1rem" }}><Link className="btn btn--outline" href={h("/istanbul/store/cart")}>{t.toRequest}</Link></p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
