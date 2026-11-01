import { getCtx, makeMeta, type LocaleParams } from "@/lib/page";
import { PageHero } from "@/components/ui";
import { InquiryForm } from "@/components/client/InquiryForm";
import { contactTopics } from "@/lib/forms";

export async function generateMetadata({ params }: LocaleParams) {
  return makeMeta(params, "/contact", (d) => ({ title: `${d.contact.title} | NORVIGATE`, description: d.contact.lead }));
}

export default async function ContactPage({ params, searchParams }: LocaleParams & { searchParams: Promise<{ topic?: string }> }) {
  const { locale, dict, h } = await getCtx(params);
  const { topic } = await searchParams;
  const t = dict.contact;
  const defaults = topic && (contactTopics as readonly string[]).includes(topic) ? { topic } : undefined;
  return (
    <>
      <PageHero title={t.title} lead={t.lead} crumbLabel={dict.common.breadcrumb} crumbs={[{ label: dict.nav.home, href: h() }, { label: t.title }]} />
      <section className="section on-light">
        <div className="container cols-2">
          <div className="panel">
            <InquiryForm kind="contact" locale={locale} dict={dict.forms} defaults={defaults} submitLabel={t.submit} />
          </div>
          <aside className="panel panel--aside">
            <h2>{t.asideTitle}</h2>
            <ul>{t.aside.map((a) => <li key={a}>{a}</li>)}</ul>
          </aside>
        </div>
      </section>
    </>
  );
}
