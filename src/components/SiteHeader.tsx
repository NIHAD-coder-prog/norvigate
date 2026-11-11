import { StatusTag } from "@/components/NetworkSection";
import { isCityShown } from "@/config/visibility";
import { istanbulStatus } from "@/data/network";
import { ISTANBUL_URL } from "@/data/cities";
import Link from "next/link";
import { NavLink } from "./client/NavLink";
import { LanguageSwitcher } from "./client/LanguageSwitcher";
import { CurrencySwitcher } from "./client/CurrencySwitcher";
import { Icon } from "./ui";
import { languages, isComplete, nativeName, shortName, locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { href } from "@/lib/href";

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items = languages
    .filter((l) => locales.includes(l.code))
    .map((l) => ({ code: l.code, name: nativeName(l.code), short: shortName(l.code), complete: isComplete(l.code) }));

  const links = [
    { path: "", label: dict.nav.home, exact: true },
    { path: "/cities", label: dict.nav.cities },
    { path: "/about", label: dict.nav.about },
    { path: "/contact", label: dict.nav.contact },
    { path: "/currency", label: dict.nav.currency },
  ];

  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <Link href={href(locale)} className="brand" aria-label={`${dict.meta.siteName} — ${dict.nav.home}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand__full" src="/brand/norvigate-lockup-on-dark.svg" alt={dict.meta.siteName} width={288} height={32} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand__mark" src="/brand/norvigate-mark-compact.svg" alt="" aria-hidden="true" width={37} height={30} />
        </Link>
        <nav className="main-nav" aria-label={dict.common.mainNav}>
          {links.map((l) => (
            <NavLink key={l.path} href={href(locale, l.path)} exact={l.exact}>{l.label}</NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <CurrencySwitcher />
          <LanguageSwitcher current={locale} items={items} label={dict.common.language} partialLabel={dict.lang.partialTag} />
          <details className="mobile-nav-wrap">
            <summary aria-label={dict.common.menu}>
              <Icon name="menu" size={18} />
              <span>{dict.common.menu}</span>
            </summary>
            <nav className="mobile-nav" aria-label={dict.common.mainNav}>
              {links.map((l) => (
                <NavLink key={l.path} href={href(locale, l.path)} exact={l.exact}>{l.label}</NavLink>
              ))}
              {isCityShown("istanbul", istanbulStatus) ? <a href={ISTANBUL_URL}>{dict.nav.enterIstanbul}<StatusTag label={dict.network.status[istanbulStatus].label} /></a> : null}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
