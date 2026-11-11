"use client";

import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui";
import { swapLocale } from "@/lib/href";
import { LOCALE_COOKIE } from "@/i18n/config";
import { Popover } from "./Popover";

export interface LanguageItem {
  code: string;
  name: string;
  short: string;
  complete: boolean;
}

export function LanguageSwitcher({
  current,
  items,
  label,
  partialLabel,
}: {
  current: string;
  items: LanguageItem[];
  label: string;
  partialLabel: string;
}) {
  const pathname = usePathname() || `/${current}`;
  const active = items.find((i) => i.code === current);

  const choose = (e: React.MouseEvent<HTMLAnchorElement>, code: string) => {
    try {
      document.cookie = `${LOCALE_COOKIE}=${code}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      /* ignore */
    }
    // Keep the query string and hash when switching language.
    e.preventDefault();
    window.location.assign(`${swapLocale(pathname, code)}${window.location.search}${window.location.hash}`);
  };

  return (
    <Popover
      summaryLabel={`${label}: ${active?.name ?? current}`}
      summary={
        <>
          <Icon name="globe" size={16} />
          <span lang={current}>{active?.name ?? current.toUpperCase()}</span>
        </>
      }
    >
      <h2>{label}</h2>
      <ul className="popover__list" style={{ borderBlockStart: 0, marginBlockStart: 0 }}>
        {items.map((l) => (
          <li key={l.code}>
            <a
              href={swapLocale(pathname, l.code)}
              lang={l.code}
              hrefLang={l.code}
              aria-current={l.code === current ? "true" : undefined}
              onClick={(e) => choose(e, l.code)}
            >
              <span>{l.name}</span>
              {!l.complete ? <span className="code-tag">{partialLabel}</span> : <span className="code-tag">{l.short}</span>}
            </a>
          </li>
        ))}
      </ul>
    </Popover>
  );
}
