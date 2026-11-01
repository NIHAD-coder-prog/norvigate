import { L } from "@/i18n/config";
import type { LText } from "@/i18n/config";

/** Allergen labels. Product allergen data itself is SAMPLE and unverified. */
export const allergenLabels: Record<string, LText> = {
  gluten: L("Gluten", "Gluten", "الغلوتين", "Gluten"),
  treeNuts: L("Tree nuts", "Sert kabuklu yemişler", "المكسرات الشجرية", "Frutos secos de cáscara"),
  milk: L("Milk", "Süt", "الحليب", "Leche"),
  sesame: L("Sesame", "Susam", "السمسم", "Sésamo"),
};
