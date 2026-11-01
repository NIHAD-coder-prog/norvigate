import Link from "next/link";
import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { listExperiences } from "@/lib/repo";
import { pick } from "@/i18n/config";
import { Chip, Notice, PageHero } from "@/components/ui";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "/istanbul/experiences", (d) => ({ title: `${d.experiences.title} | NORVIGATE`, description: d.experiences.lead }));
}

export default async function ExperiencesPage({ params }: LocaleParams) {
  const { locale, dict, h } = await getCtx(params);
  const items = await listExperiences();
  const t = dict.experiences;
  const cats = Object.keys(t.cat);
  return (
    <>
      <PageHero title={t.title} lead={t.lead} crumbLabel={dict.common.breadcrumb} crumbs={[{ label: dict.nav.home, href: h() }, { label: dict.nav.istanbul, href: h("/istanbul") }, { label: t.title }]} />
      <section className="section on-light">
        <div className="container">
          <Notice tone="info">{t.checkOfficial}</Notice>
          {cats.map((c) => {
            const list = items.filter((i) => i.category === c);
            if (!list.length) return null;
            return (
              <section key={c} style={{ marginBlockStart: "2.5rem" }} aria-labelledby={`cat-${c}`}>
                <h2 id={`cat-${c}`}>{(t.cat as Record<string, string>)[c]}</h2>
                <ul className="rows">
                  {list.map((e) => (
                    <li className="row" key={e.id}>
                      <h3>{pick(e.title, locale)}</h3>
                      <p>{pick(e.description, locale)}</p>
                      <div className="row__meta">
                        <Chip status="preview">{dict.status.preview}</Chip>
                        <span className="small muted">{pick(e.area, locale)}</span>
                        {e.duration ? <span className="small muted">· {dict.common.duration}: {pick(e.duration, locale)}</span> : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
          <p style={{ marginBlockStart: "2rem" }}><Link className="btn btn--outline" href={h("/istanbul/travel")}>{t.askGuide}</Link></p>
        </div>
      </section>
    </>
  );
}
