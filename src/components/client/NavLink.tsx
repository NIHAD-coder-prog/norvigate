"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Link that marks itself as the current page for assistive tech and styling. */
export function NavLink({ href, exact = false, children, className }: { href: string; exact?: boolean; children: ReactNode; className?: string }) {
  const pathname = usePathname() || "";
  const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={className}>
      {children}
    </Link>
  );
}
