import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/lib/href";
import { NavLink } from "@/components/client/NavLink";
import { CartLink } from "@/components/client/CartLink";
import { Icon } from "@/components/ui";
import Link from "next/link";

export default async function IstanbulLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const h = (p = "") => href(locale, `/istanbul${p}`);
  const items = [
    { path: "", label: dict.cityNav.home, exact: true },
    { path: "/services", label: dict.cityNav.services },
    { path: "/experiences", label: dict.cityNav.experiences },
    { path: "/travel", label: dict.cityNav.travel },
    { path: "/flights", label: dict.cityNav.flights },
    { path: "/hotels", label: dict.cityNav.hotels },
    { path: "/translation", label: dict.cityNav.translation },
    { path: "/tools", label: dict.cityNav.tools },
    { path: "/guide", label: dict.cityNav.guide },
    { path: "/premium", label: dict.cityNav.premium },
    { path: "/store", label: dict.cityNav.store },
    { path: "/faq", label: dict.cityNav.faq },
    { path: "/list-your-business", label: dict.cityNav.listBusiness },
  ];

  return (
    <>
      <div className="city-bar">
        <div className="container">
          <div className="city-bar__inner">
            <Link href={h()} className="city-bar__title">{dict.meta.cityName}</Link>
            <nav className="city-nav" aria-label={dict.common.cityNav}>
              {items.map((i) => (
                <NavLink key={i.path} href={h(i.path)} exact={i.exact}>{i.label}</NavLink>
              ))}
            </nav>
            <CartLink href={h("/store/cart")} label={dict.cityNav.cart} itemsLabel={dict.cityNav.cartItems} />
          </div>
          <div className="city-search">
            <form action={h("/search")} method="get" role="search" aria-label={dict.common.searchAll}>
              <label className="visually-hidden" htmlFor="city-q">{dict.common.searchAll}</label>
              <input id="city-q" className="input" type="search" name="q" placeholder={dict.common.searchPlaceholder} autoComplete="off" />
              <button type="submit" className="btn btn--primary btn--small"><Icon name="search" size={16} /> {dict.common.search}</button>
            </form>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
