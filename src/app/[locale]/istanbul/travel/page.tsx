import Link from "next/link";
import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { listTravelServices } from "@/lib/repo";
import { pick } from "@/i18n/config";
import { Chip, Notice, PageHero } from "@/components/ui";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "/istanbul/travel", (d) => ({ title: `${d.travel.title} | NORVIGATE`, description: d.travel.lead }));
}

export default async function TravelPage({ params }: LocaleParams) {
  const { locale, dict, h } = await getCtx(params);
  const items = await listTravelServices();
  const t = dict.travel;
  return (
    <>
      <PageHero title={t.title} lead={t.lead} crumbLabel={dict.common.breadcrumb} crumbs={[{ label: dict.nav.home, href: h() }, { label: dict.nav.istanbul, href: h("/istanbul") }, { label: t.title }]} />
      <section className="section on-light">
        <div className="container">
          <Notice tone="warn">{t.banner}</Notice>
          {Object.keys(t.cat).map((c) => {
            const list = items.filter((i) => i.category === c);
            if (!list.length) return null;
            return (
              <section key={c} style={{ marginBlockStart: "2.5rem" }} aria-labelledby={`c-${c}`}>
                <h2 id={`c-${c}`}>{(t.cat as Record<string, string>)[c]}</h2>
                <ul className="rows">
                  {list.map((s) => (
                    <li className="row" key={s.id}>
                      <h3><Link href={h(`/istanbul/travel/${s.slug}`)}>{pick(s.title, locale)}</Link></h3>
                      <p>{pick(s.summary, locale)}</p>
                      <div className="row__meta"><Chip status="sample">{dict.status.sample}</Chip><Chip status="request">{dict.status.request}</Chip></div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </section>
    </>
  );
}
