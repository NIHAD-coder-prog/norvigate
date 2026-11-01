"use client";

import Link from "next/link";
import { Icon } from "@/components/ui";
import { fmt } from "@/i18n/config";
import { useCart } from "./Providers";

export function CartLink({ href, label, itemsLabel }: { href: string; label: string; itemsLabel: string }) {
  const { count, ready } = useCart();
  const n = ready ? count : 0;
  return (
    <Link href={href} className="cart-link" aria-label={n > 0 ? fmt(itemsLabel, { n }) : label}>
      <Icon name="cart" size={18} />
      <span>{label}</span>
      {n > 0 ? <span className="cart-count">{n}</span> : null}
    </Link>
  );
}
