/**
 * VISIBILITY LEVEL: what the public site shows. Change the ONE line below, rebuild, redeploy.
 *
 *   "live"  = only what works now (status LIVE). The simplest face of the site.
 *   "beta"  = what works now + what is in trial (LIVE and BETA).
 *   "all"   = everything, including items in development and on the roadmap (the full vision).
 *
 * Items below the level are removed on the server, so they do not appear in pages, menus or search engines.
 * Each item's own status is set in src/data/network.ts. On a server you can also override this line with the
 * environment variable NORVIGATE_VISIBILITY=live|beta|all (needs a rebuild because pages are built ahead of time).
 */
import type { NetworkStatus } from "@/data/network-status";

export type VisibilityLevel = "live" | "beta" | "all";

export const VISIBILITY_LEVEL: VisibilityLevel = "all"; // <<< the one line to change

const fromEnv = process.env.NORVIGATE_VISIBILITY;
export const level: VisibilityLevel = fromEnv === "live" || fromEnv === "beta" || fromEnv === "all" ? fromEnv : VISIBILITY_LEVEL;

export const shownAt: Record<VisibilityLevel, NetworkStatus[]> = {
  live: ["live"],
  beta: ["live", "beta"],
  all: ["live", "beta", "development", "planned"],
};

/** True when an item with this status should appear on the site at the current level. */
export const isShown = (status: NetworkStatus): boolean => shownAt[level].includes(status);

/** Roadmap wording (about other gates and future items) appears only at the "all" level. */
export const showRoadmapText = level === "all";

/**
 * Cities that are always shown, whatever the level (Istanbul: its site is open in beta and must be reachable from the hub).
 * Their own status label still tells the truth (BETA).
 */
export const PINNED_CITY_IDS: string[] = ["istanbul"];
export const isCityShown = (id: string, status: NetworkStatus): boolean => PINNED_CITY_IDS.includes(id) || isShown(status);
