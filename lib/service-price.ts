import type { Locale } from "@/lib/i18n";
import type { ServiceItemDef } from "@/data/services";

export function formatServicePrice(
  item: ServiceItemDef,
  locale: Locale,
  inquiryLabel: string,
): string {
  if (item.priceOnInquiry) return inquiryLabel;

  const top = item.priceTop;
  const exp = item.priceExpert;

  if (top != null && exp != null) {
    if (top === exp) return locale === "uk" ? `${top} ₴` : `${top} UAH`;
    return locale === "uk" ? `від ${top} до ${exp} ₴` : `from ${top} to ${exp} UAH`;
  }

  if (top != null && exp == null)
    return locale === "uk" ? `від ${top} ₴` : `from ${top} UAH`;

  if (top == null && exp != null)
    return locale === "uk" ? `${exp} ₴` : `${exp} UAH`;

  return inquiryLabel;
}

function itemNumericBounds(item: ServiceItemDef): { lo: number; hi: number } | null {
  if (item.priceOnInquiry) return null;
  const top = item.priceTop;
  const exp = item.priceExpert;
  if (top != null && exp != null)
    return { lo: Math.min(top, exp), hi: Math.max(top, exp) };
  if (top != null) return { lo: top, hi: top };
  if (exp != null) return { lo: exp, hi: exp };
  return null;
}

/** Діапазон цін для підсумку на картці категорії */
export function formatCategoryPriceRange(
  items: ServiceItemDef[],
  locale: Locale,
  inquiryLabel: string,
): string {
  const bounds = items
    .map(itemNumericBounds)
    .filter((b): b is { lo: number; hi: number } => b != null);
  if (bounds.length === 0) return inquiryLabel;
  const lo = Math.min(...bounds.map((b) => b.lo));
  const hi = Math.max(...bounds.map((b) => b.hi));
  if (lo === hi) return locale === "uk" ? `${lo} ₴` : `${lo} UAH`;
  return locale === "uk" ? `від ${lo} до ${hi} ₴` : `from ${lo} to ${hi} UAH`;
}

export function formatServicesCount(n: number, locale: Locale): string {
  if (locale === "en") return n === 1 ? "1 service" : `${n} services`;
  if (n === 1) return "1 послуга";
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return `${n} послуги`;
  return `${n} послуг`;
}
