import Link from "next/link";
import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { Notice } from "@/components/ui";
import { PageHero } from "@/components/ui-server";
import { Weather } from "@/components/client/Weather";
import { ISTANBUL, istanbulToday, prayerTimes } from "@/lib/prayer";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "/istanbul/tools", (d) => ({ title: `${d.tools.title} | NORVIGATE`, description: d.tools.lead }));
}

export default async function ToolsPage({ params }: LocaleParams) {
  const { locale, dict, h } = await getCtx(params);
  const t = dict.tools;
  const { y, m, d } = istanbulToday();
  const times = prayerTimes(y, m, d, ISTANBUL.lat, ISTANBUL.lng, ISTANBUL.tz);
  const dateText = new Intl.DateTimeFormat(locale, { timeZone: "Europe/Istanbul", dateStyle: "full" }).format(new Date());
  const keys = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"] as const;
  return (
    <>
      <PageHero title={t.title} lead={t.lead} crumbLabel={dict.common.breadcrumb} crumbs={[{ label: dict.cityNav.home, href: h("/istanbul") }, { label: t.title }]} />
      <section className="section on-light">
        <div className="container cols-2">
          <div className="panel">
            <h2>{t.prayerTitle}</h2>
            <p className="muted">{t.dateLabel}: {dateText}</p>
            <table className="table">
              <tbody>
                {keys.map((k) => (
                  <tr key={k}><th scope="row">{t.prayers[k]}</th><td dir="ltr">{times[k]}</td></tr>
                ))}
              </tbody>
            </table>
            <Notice tone="info" title="">{t.prayerNote}</Notice>
          </div>
          <div className="panel">
            <h2>{t.weatherTitle}</h2>
            <Weather t={t} locale={locale} />
          </div>
        </div>
        <div className="container" style={{ marginBlockStart: "1.5rem" }}>
          <div className="panel">
            <h2>{t.currencyTitle}</h2>
            <Link className="btn btn--outline" href={h("/currency")}>{t.currencyCta}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
