import { notFound } from "next/navigation";
import { getCtx } from "@/lib/page";
import { getOrder, tokenMatches } from "@/store-live/orders";
import { Chip, Notice } from "@/components/ui";
import { PageHero } from "@/components/ui-server";
import { formatDate, formatMoney } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
type P = { params: Promise<{ locale: string; id: string }>; searchParams: Promise<{ t?: string }> };

/** Order pages are private: never indexed, no canonical, no social card. */
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await getCtx(params);
  const m = buildMetadata({ locale, path: "/istanbul/store/order", title: "NORVIGATE", description: "" });
  return { ...m, robots: { index: false, follow: false }, alternates: undefined, openGraph: undefined, twitter: undefined };
}

export default async function OrderPage({ params, searchParams }: P) {
  const { locale, dict, h } = await getCtx(params);
  const { id } = await params;
  const { t: token } = await searchParams;
  const order = await getOrder(id);
  // wrong or missing access token looks exactly like "no such order"
  if (!order || !tokenMatches(token, order.accessTokenHash)) notFound();
  const t = dict.store.live.order;
  const q = order.quote;
  const status = order.status;
  return (
    <>
      <PageHero title={t.title} crumbLabel={dict.common.breadcrumb} crumbs={[{ label: dict.nav.home, href: h() }, { label: dict.store.title, href: h("/istanbul/store") }, { label: t.title }]} />
      <section className="section on-light">
        <div className="container measure">
          <Notice tone={status === "paid" || status === "shipped" || status === "delivered" ? "success" : status === "payment_failed" || status === "cancelled" ? "error" : "info"} title={`${t.status}: ${t.statuses[status]}`} role="status">
            {t.explain[status]}
          </Notice>
          <dl className="kv" style={{ marginBlockStart: "1.5rem" }}>
            <dt>{t.orderNumber}</dt><dd><span dir="ltr" className="code-tag">{order.id}</span></dd>
            <dt>{t.placed}</dt><dd>{formatDate(order.createdAt.slice(0, 10), locale)}</dd>
            <dt>{t.status}</dt><dd><Chip status={status === "paid" || status === "shipped" || status === "delivered" ? "live" : "planned"}>{t.statuses[status]}</Chip></dd>
            {order.tracking ? (<><dt>{t.carrier}</dt><dd>{order.tracking.carrier}</dd><dt>{t.number}</dt><dd><span dir="ltr">{order.tracking.number}</span></dd></>) : null}
          </dl>
          <h2>{t.items}</h2>
          <ul className="rows">
            {q.lines.map((l) => (
              <li className="row" key={`${l.productId}:${l.variantId}`} style={{ gridTemplateColumns: "1fr auto" }}>
                <div><h3>{l.name}</h3><p>{l.variant} × {l.qty}</p></div>
                <strong>{formatMoney(l.unitMinor * l.qty, "TRY", locale)}</strong>
              </li>
            ))}
          </ul>
          <div className="summary-row"><span>{dict.store.live.shipping}</span><span>{formatMoney(q.shippingMinor, "TRY", locale)}</span></div>
          <div className="summary-row summary-row--total"><span>{dict.store.live.total}</span><span>{formatMoney(q.totalMinor, "TRY", locale)}</span></div>
          <p className="small muted" style={{ marginBlockStart: "1rem" }}>{t.keepLink}</p>
        </div>
      </section>
    </>
  );
}
