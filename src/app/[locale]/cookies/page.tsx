import { getCtx, type LocaleParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";
import { getLegal } from "@/content/legal";
import { LegalPage } from "@/components/LegalPage";

export async function generateMetadata({ params }: LocaleParams) {
  const { locale } = await getCtx(params);
  const pack = await getLegal(locale);
  return buildMetadata({ locale, path: "/cookies", title: `${pack.cookies.title} | NORVIGATE`, description: pack.cookies.intro.slice(0, 200) });
}

export default async function Page({ params }: LocaleParams) {
  const { locale, dict, h } = await getCtx(params);
  const pack = await getLegal(locale);
  return <LegalPage docKey="cookies" pack={pack} dict={dict} h={h} />;
}
