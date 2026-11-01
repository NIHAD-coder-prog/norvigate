"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Accessible disclosure built on <details>: closes on Escape and when focus or a click leaves it.
 * Works (opens/closes) even before JavaScript loads.
 */
export function Popover({
  summary,
  summaryLabel,
  children,
  onOpen,
}: {
  summary: ReactNode;
  summaryLabel: string;
  children: ReactNode;
  onOpen?: () => void;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const close = () => el.removeAttribute("open");
    const onDoc = (e: MouseEvent) => {
      if (el.open && !el.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && el.open) {
        close();
        el.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <details className="popover" ref={ref} onToggle={(e) => (e.currentTarget.open ? onOpen?.() : undefined)}>
      <summary className="pill-btn" aria-label={summaryLabel}>
        {summary}
      </summary>
      <div className="popover__panel">{children}</div>
    </details>
  );
}
