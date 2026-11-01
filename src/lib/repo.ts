/**
 * Data access layer. Pages and components call these functions, never the data files directly,
 * so the static sample data can later be replaced by a CMS or database without touching the UI.
 * All functions are async on purpose: the real implementations will be.
 */
import { collections } from "@/data";
import { storefrontProducts } from "@/store-live/service";
import type {
  City,
  Experience,
  ExternalLink,
  FaqItem,
  GuideSection,
  Product,
  ProductCategoryId,
  Provider,
  ProviderCategory,
  ProviderCategoryId,
  TravelService,
} from "@/data/types";

const { cities, providerCategories, providers, experiences, travelServices, faqItems, guideSections, externalLinks } =
  collections;

export async function listCities(): Promise<City[]> {
  return cities;
}
export async function getCity(id: string): Promise<City | undefined> {
  return cities.find((c) => c.id === id);
}

export async function listProviderCategories(): Promise<ProviderCategory[]> {
  return providerCategories;
}
export async function getProviderCategory(id: string): Promise<ProviderCategory | undefined> {
  return providerCategories.find((c) => c.id === id);
}

export async function listProviders(opts: { categoryId?: ProviderCategoryId } = {}): Promise<Provider[]> {
  return providers.filter((p) => !opts.categoryId || p.categoryId === opts.categoryId);
}
export async function getProvider(slug: string): Promise<Provider | undefined> {
  return providers.find((p) => p.slug === slug);
}

export async function listExperiences(opts: { category?: Experience["category"] } = {}): Promise<Experience[]> {
  return experiences.filter((e) => !opts.category || e.category === opts.category);
}

export async function listTravelServices(opts: { category?: TravelService["category"] } = {}): Promise<TravelService[]> {
  return travelServices.filter((s) => !opts.category || s.category === opts.category);
}
export async function getTravelService(slug: string): Promise<TravelService | undefined> {
  return travelServices.find((s) => s.slug === slug);
}

export async function listProducts(opts: { categoryId?: ProductCategoryId } = {}): Promise<Product[]> {
  return storefrontProducts().filter((p) => !opts.categoryId || p.categoryId === opts.categoryId);
}
export async function getProduct(slug: string): Promise<Product | undefined> {
  return storefrontProducts().find((p) => p.slug === slug);
}

export async function listFaq(): Promise<FaqItem[]> {
  return faqItems;
}
export async function listGuide(): Promise<GuideSection[]> {
  return guideSections;
}

/** Integration point for future flight/hotel providers, affiliates and APIs. */
export async function getExternalLinks(kind: ExternalLink["kind"]): Promise<ExternalLink[]> {
  return externalLinks.filter((l) => l.kind === kind);
}
