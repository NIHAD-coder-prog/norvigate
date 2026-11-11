import Link from "next/link";
import type { ReactNode } from "react";

const PATHS: Record<string, ReactNode> = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  cart: <><path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H6" /><circle cx="9" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  alert: <><path d="M12 3 2.5 20h19L12 3Z" /><path d="M12 10v4.5M12 17.5v.5" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.5" /></>,
  external: <><path d="M14 4h6v6M20 4l-9 9" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>,
  bed: <><path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="1.6" /></>,
  bus: <><rect x="4" y="4" width="16" height="13" rx="2" /><path d="M4 11h16M7 20v-3M17 20v-3" /><circle cx="8" cy="14" r=".6" /><circle cx="16" cy="14" r=".6" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" /></>,
  utensils: <><path d="M6 3v8M9 3v8M6 7h3M7.5 11v10M17 3c-2 2-2.5 5-2.5 8h2.5v10" /></>,
  bag: <><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />,
  book: <><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" /><path d="M8 7h7" /></>,
  home: <><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10M10 20v-5h4v5" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
  plane: <path d="m3 13 18-8-4 15-5-5-3 3v-5L3 13Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  grid: <><rect x="4" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" /></>,
  chevron: <path d="m9 6 6 6-6 6" />,
  swap: <path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7" />,
};

export function Icon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {PATHS[name] ?? PATHS.info}
    </svg>
  );
}

export type StatusKey = "live" | "preview" | "sample" | "demo" | "request" | "planned" | "external" | "comingSoon" | "unverified";
const chipClass: Record<StatusKey, string> = {
  live: "live",
  preview: "preview",
  sample: "sample",
  demo: "demo",
  request: "request",
  planned: "planned",
  external: "external",
  comingSoon: "soon",
  unverified: "unverified",
};

export function Chip({ status, children }: { status: StatusKey; children: ReactNode }) {
  return <span className={`chip chip--${chipClass[status]}`}>{children}</span>;
}

export function Notice({
  tone = "info",
  title,
  children,
  role,
}: {
  tone?: "info" | "sample" | "warn" | "error" | "success";
  title?: string;
  children?: ReactNode;
  role?: "status" | "alert";
}) {
  const icon = tone === "success" ? "check" : tone === "error" || tone === "warn" ? "alert" : "info";
  return (
    <div className={`notice notice--${tone}`} role={role}>
      <Icon name={icon} />
      <div>
        {title ? <h2>{title}</h2> : null}
        {children ? <p>{children}</p> : null}
      </div>
    </div>
  );
}

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items, label }: { items: Crumb[]; label: string }) {
  return (
    <nav className="breadcrumb" aria-label={label}>
      <ol>
        {items.map((c, i) => (
          <li key={i}>{c.href && i < items.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current={i === items.length - 1 ? "page" : undefined}>{c.label}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}

export function SampleBadge({ label }: { label: string }) {
  return <Chip status="sample">{label}</Chip>;
}
