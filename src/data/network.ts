/**
 * The network roadmap shown on the hub. Names live in the dictionaries (dict.network); this file holds only the ids and
 * the honest status of each item. To move an item forward, change its status here: the site updates everywhere.
 * live = available now; beta = first working version; development = work started, not ready; planned = on the roadmap.
 * What the public sees also depends on the visibility level in src/config/visibility.ts.
 */
export type { NetworkStatus } from "./network-status";
import type { NetworkStatus } from "./network-status";

export interface NetworkCity { id: string; status: NetworkStatus; route?: string }
export interface Capability { id: string; icon: string; status: NetworkStatus }

export const networkCities: NetworkCity[] = [
  { id: "istanbul", status: "live", route: "/istanbul" },
  { id: "dubai", status: "planned" },
  { id: "riyadh", status: "planned" },
  { id: "doha", status: "planned" },
  { id: "london", status: "planned" },
  { id: "newyork", status: "planned" },
  { id: "singapore", status: "planned" },
  { id: "hongkong", status: "planned" },
  { id: "damascus", status: "planned" },
  { id: "aleppo", status: "planned" },
];

/** Status of each capability inside the Istanbul gate today. */
export const capabilities: Capability[] = [
  { id: "travel", icon: "plane", status: "beta" },
  { id: "realestate", icon: "home", status: "planned" },
  { id: "shopping", icon: "bag", status: "beta" },
  { id: "business", icon: "briefcase", status: "development" },
  { id: "education", icon: "book", status: "planned" },
  { id: "health", icon: "heart", status: "planned" },
  { id: "more", icon: "grid", status: "planned" },
];

/** Status of the Istanbul gate itself; every Istanbul entry point on the hub is hidden when this is below the visibility level. */
export const istanbulStatus: NetworkStatus = networkCities.find((c) => c.id === "istanbul")!.status;

/** Status of the three brand pillars on the hub home, in the order of dict.home.pillars (tourism, services, investment). */
export const pillarStatus: NetworkStatus[] = ["beta", "beta", "planned"];
