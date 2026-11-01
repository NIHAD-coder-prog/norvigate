import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { listGuide } from "@/lib/repo";
import { fmt, pick } from "@/i18n/config";
import { formatDate } from "@/lib/format";
import { Chip, Icon, Notice, PageHero } from "@/components/ui";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "/istanbul/guide", (d) => ({ title: `${d.guide.title} | NORVIGATE`, description: d.guide.lead }));
}

export default async function GuidePage({ params }: LocaleParams) {
  const { locale, dict, h } = await getCtx(params);
  const sections = await listGuide();
  const t = dict.guide;
  return (
    <>
      <PageHero title={t.title} lead={t.lead} crumbLabel={dict.common.breadcrumb} crumbs={[{ label: dict.nav.home, href: h() }, { label: dict.nav.istanbul, href: h("/istanbul") }, { label: t.title }]} />
      <section className="section on-light">
        <div className="container cols-2">
          <div>
            <Notice tone="warn">{t.disclaimer}</Notice>
            {sections.map((s) => (
              <section key={s.id} id={s.id} style={{ marginBlockStart: "2.5rem" }} aria-labelledby={`h-${s.id}`}>
                <h2 id={`h-${s.id}`}>{pick(s.title, locale)}</h2>
                <div className="row__meta" style={{ marginBlockEnd: ".75rem" }}>
                  <Chip status="unverified">{dict.status.unverified}</Chip>
                  <span className="small muted">{fmt(t.reviewed, { date: formatDate(s.reviewedAt, locale) })}</span>
                </div>
                {s.body.map((p, i) => <p key={i} className="measure">{pick(p, locale)}</p>)}
                {s.links.length ? (
                  <>
                    <h3>{t.usefulLinks}</h3>
                    <ul>
                      {s.links.map((l) => (
                        <li key={l.url}>
                          <a href={l.url} target="_blank" rel="noopener noreferrer">{pick(l.label, locale)} <Icon name="external" size={14} className="icon-flip" /></a>
                          <span className="small muted"> ({formatDate(l.checkedAt, locale)})</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </section>
            ))}
          </div>
          <aside className="panel" style={{ position: "sticky", top: "140px" }}>
            <h2>{t.contents}</h2>
            <ul>{sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{pick(s.title, locale)}</a></li>)}</ul>
          </aside>
        </div>
      </section>
    </>
  );
}
