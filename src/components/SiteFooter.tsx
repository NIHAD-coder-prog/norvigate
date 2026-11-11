import { StatusTag } from "@/components/NetworkSection";
import { isCityShown } from "@/config/visibility";
import { istanbulStatus } from "@/data/network";
import { ISTANBUL_URL } from "@/data/cities";
import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { fmt, type Locale } from "@/i18n/config";
import { href } from "@/lib/href";
import { getLegal } from "@/content/legal";
import { RATES_ATTRIBUTION } from "@/lib/currency/types";

export async function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = (p = "") => href(locale, p);
  const legal = await getLegal(locale);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/norvigate-lockup-white.svg" alt={dict.meta.siteName} width={288} height={32} style={{ height: 32, width: "auto", marginBlockEnd: "1rem" }} />
            <p style={{ maxWidth: "36ch" }}>{dict.footer.blurb}</p>
            <p className="endorse">{dict.brand.footerLine.split("{company}").flatMap((part, n, arr) => [part.trim() ? <span key={`t${n}`}>{part.trim()}</span> : null, n < arr.length - 1 ? <a key={`a${n}`} href="https://norvigiq.com" target="_blank" rel="noopener noreferrer" dir="ltr">NORVIGIQ</a> : null])}</p>
          </div>
          <nav aria-label={dict.footer.company}>
            <h2>{dict.footer.company}</h2>
            <ul>
              <li><Link href={h()}>{dict.nav.home}</Link></li>
              <li><Link href={h("/cities")}>{dict.nav.cities}</Link></li>
              <li><Link href={h("/about")}>{dict.nav.about}</Link></li>
              <li><Link href={h("/contact")}>{dict.nav.contact}</Link></li>
              <li><Link href={h("/currency")}>{dict.nav.currency}</Link></li>
            </ul>
          </nav>
          {isCityShown("istanbul", istanbulStatus) ? (
          <nav aria-label={dict.footer.istanbulPlatform}>
            <h2>{dict.footer.istanbulPlatform}</h2>
            <ul>
              <li><a href={ISTANBUL_URL}>{dict.nav.enterIstanbul}<StatusTag label={dict.network.status[istanbulStatus].label} /></a></li>
            </ul>
          </nav>
          ) : null}
          <nav aria-label={dict.footer.legal}>
            <h2>{dict.footer.legal}</h2>
            <ul>
              <li><Link href={h("/privacy")}>{legal.privacy.title}</Link></li>
              <li><Link href={h("/terms")}>{legal.terms.title}</Link></li>
              <li><Link href={h("/cookies")}>{legal.cookies.title}</Link></li>
              <li><Link href={h("/istanbul/store/terms")}>{legal.sales.title}</Link></li>
              <li><Link href={h("/istanbul/store/shipping-returns")}>{legal.shipping.title}</Link></li>
            </ul>
          </nav>
        </div>
        <div className="footer__fine">
          <span>{dict.footer.sampleNote}</span>
          <span>{dict.footer.draftNote}</span>
          <span>
            <a href={RATES_ATTRIBUTION.url} target="_blank" rel="noopener noreferrer">{dict.currency.ratesBy}</a>
          </span>
          <span>{fmt(dict.footer.rights, { year: new Date().getFullYear() })}</span>
        </div>
      </div>
    </footer>
  );
}
