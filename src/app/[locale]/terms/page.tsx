import { getCtx, type LocaleParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";
import { getLegal } from "@/content/legal";
import { LegalPage } from "@/components/LegalPage";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await getCtx(params);
  const pack = await getLegal(locale);
  return buildMetadata({ locale, path: "/terms", title: `${pack.terms.title} | NORVIGATE`, description: pack.terms.intro.slice(0, 200) });
}

export default async function Page({ params }: LocaleParams) {
  const { locale, dict, h } = await getCtx(params);
  const pack = await getLegal(locale);
  return <LegalPage docKey="terms" pack={pack} dict={dict} h={h} />;
}
