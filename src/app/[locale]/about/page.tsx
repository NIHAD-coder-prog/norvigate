import { Skyline } from "@/components/Skyline";
import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { Notice } from "@/components/ui";
import { PageHero } from "@/components/ui-server";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "/about", (d) => ({ title: `${d.about.title} | NORVIGATE`, description: d.about.lead }));
}

export default async function AboutPage({ params }: LocaleParams) {
  const { dict, h } = await getCtx(params);
  const t = dict.about;
  return (
    <>
      <PageHero title={t.title} lead={t.lead} crumbLabel={dict.common.breadcrumb} crumbs={[{ label: dict.nav.home, href: h() }, { label: t.title }]} />
      <section className="section on-light">
        <div className="container doc-grid">
          <div className="prose">
          <h2>{t.missionTitle}</h2>
          <p>{t.mission}</p>
          <h2>{t.modelTitle}</h2>
          <p>{t.model}</p>
          <h2>{t.valueTitle}</h2>
          <ul>{t.value.map((v) => <li key={v}>{v}</li>)}</ul>
          <h2>{t.principlesTitle}</h2>
          <div className="value-list" style={{ marginBlockStart: "1rem" }}>
            {t.principles.map((p) => (
              <div key={p.title}><h3>{p.title}</h3><p>{p.text}</p></div>
            ))}
          </div>
          <h2>{t.visionTitle}</h2>
          <p>{t.vision}</p>
          <Notice tone="info" title={t.earlyTitle}>{t.early}</Notice>
          </div>
          <aside className="doc-aside" aria-hidden="true">
            <div className="arch arch--art"><Skyline fill="#9fb0e6" /></div>
          </aside>
        </div>
      </section>
    </>
  );
}
