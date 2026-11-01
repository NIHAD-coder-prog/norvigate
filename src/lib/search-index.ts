import { getProviderCategory } from "@/data/categories";
import type { LText } from "@/i18n/config";
import { listGuide, listProducts, listProviders, listExperiences, listTravelServices } from "./repo";
import { normalize } from "./normalize";

export type SearchType = "provider" | "experience" | "travel" | "product" | "guide";

export interface SearchDoc {
  type: SearchType;
  id: string;
  /** Path without locale prefix. */
  href: string;
  title: LText;
  summary: LText;
  area?: LText;
  /** "<type>:<categoryId>", used by the category filter. */
  facet: string;
  sample: boolean;
  /** Normalised text across ALL languages so a Turkish query finds content shown in an English UI and vice versa. */
  titleIndex: string;
  summaryIndex: string;
  bodyIndex: string;
}

function allLangs(t: LText | undefined): string {
  if (!t) return "";
  return Object.values(t)
    .filter((v): v is string => typeof v === "string")
    .map((v) => normalize(v))
    .join(" | ");
}

/** Builds the search index from published content only (every item in the repo counts as published). */
export async function listAllForSearch(): Promise<SearchDoc[]> {
  const [providers, experiences, travel, products, guide] = await Promise.all([
    listProviders(),
    listExperiences(),
    listTravelServices(),
    listProducts(),
    listGuide(),
  ]);

  const docs: SearchDoc[] = [];

  for (const p of providers) {
    const cat = getProviderCategory(p.categoryId);
    docs.push({
      type: "provider",
      id: p.id,
      href: `/istanbul/services/${p.slug}`,
      title: p.name,
      summary: p.summary,
      area: p.area,
      facet: `provider:${p.categoryId}`,
      sample: p.dataStatus === "sample",
      titleIndex: allLangs(p.name),
      summaryIndex: allLangs(p.summary),
      bodyIndex: `${allLangs(p.description)} ${allLangs(p.area)} ${cat ? allLangs(cat.name) : ""}`,
    });
  }

  for (const e of experiences) {
    docs.push({
      type: "experience",
      id: e.id,
      href: `/istanbul/experiences#${e.slug}`,
      title: e.title,
      summary: e.summary,
      area: e.area,
      facet: `experience:${e.category}`,
      sample: e.dataStatus === "sample",
      titleIndex: allLangs(e.title),
      summaryIndex: allLangs(e.summary),
      bodyIndex: `${allLangs(e.description)} ${allLangs(e.area)}`,
    });
  }

  for (const s of travel) {
    docs.push({
      type: "travel",
      id: s.id,
      href: `/istanbul/travel/${s.slug}`,
      title: s.title,
      summary: s.summary,
      area: s.location,
      facet: `travel:${s.category}`,
      sample: s.dataStatus === "sample",
      titleIndex: allLangs(s.title),
      summaryIndex: allLangs(s.summary),
      bodyIndex: `${allLangs(s.description)} ${allLangs(s.location)}`,
    });
  }

  for (const p of products) {
    docs.push({
      type: "product",
      id: p.id,
      href: `/istanbul/store/${p.slug}`,
      title: p.name,
      summary: p.summary,
      facet: `product:${p.categoryId}`,
      sample: true,
      titleIndex: allLangs(p.name),
      summaryIndex: allLangs(p.summary),
      bodyIndex: `${allLangs(p.description)} ${allLangs(p.ingredients)}`,
    });
  }

  for (const g of guide) {
    docs.push({
      type: "guide",
      id: g.id,
      href: `/istanbul/guide#${g.id}`,
      title: g.title,
      summary: g.body[0],
      facet: "guide:guide",
      sample: false,
      titleIndex: allLangs(g.title),
      summaryIndex: allLangs(g.body[0]),
      bodyIndex: g.body.map(allLangs).join(" "),
    });
  }

  return docs;
}
