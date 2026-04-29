import type { Locale } from "@/lib/i18n";
import type { ServiceItemDef } from "@/data/services";

export function formatPriceNumber(n: number, locale: Locale): string {
  if (!Number.isFinite(n)) return "";
  return locale === "uk"
    ? n.toLocaleString("uk-UA", { maximumFractionDigits: 0 })
    : n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function formatServicePrice(
  item: ServiceItemDef,
  locale: Locale,
  inquiryLabel: string,
): string {
  if (item.priceOnInquiry) return inquiryLabel;

  if (item.fixedPrice != null && Number.isFinite(item.fixedPrice)) {
    const num = formatPriceNumber(item.fixedPrice, locale);
    return locale === "uk" ? `${num} ₴` : `${num} UAH`;
  }

  const top = item.priceTop;
  const exp = item.priceExpert;

  if (top != null && exp != null && Number.isFinite(top) && Number.isFinite(exp)) {
    if (top === exp) {
      const num = formatPriceNumber(top, locale);
      return locale === "uk" ? `${num} ₴` : `${num} UAH`;
    }
    return locale === "uk"
      ? `від ${formatPriceNumber(top, locale)} до ${formatPriceNumber(exp, locale)} ₴`
      : `from ${formatPriceNumber(top, locale)} to ${formatPriceNumber(exp, locale)} UAH`;
  }

  if (top != null && Number.isFinite(top) && exp == null)
    return locale === "uk"
      ? `від ${formatPriceNumber(top, locale)} ₴`
      : `from ${formatPriceNumber(top, locale)} UAH`;

  if (top == null && exp != null && Number.isFinite(exp)) {
    const num = formatPriceNumber(exp, locale);
    return locale === "uk" ? `${num} ₴` : `${num} UAH`;
  }

  return inquiryLabel;
}

function itemNumericBounds(item: ServiceItemDef): { lo: number; hi: number } | null {
  if (item.priceOnInquiry) return null;
  if (item.excludeFromCategoryRange) return null;
  if (item.fixedPrice != null && Number.isFinite(item.fixedPrice)) {
    return { lo: item.fixedPrice, hi: item.fixedPrice };
  }
  const top = item.priceTop;
  const exp = item.priceExpert;
  if (top != null && exp != null && Number.isFinite(top) && Number.isFinite(exp))
    return { lo: Math.min(top, exp), hi: Math.max(top, exp) };
  if (top != null && Number.isFinite(top)) return { lo: top, hi: top };
  if (exp != null && Number.isFinite(exp)) return { lo: exp, hi: exp };
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
  if (lo === hi) {
    const num = formatPriceNumber(lo, locale);
    return locale === "uk" ? `${num} ₴` : `${num} UAH`;
  }
  return locale === "uk"
    ? `від ${formatPriceNumber(lo, locale)} до ${formatPriceNumber(hi, locale)} ₴`
    : `from ${formatPriceNumber(lo, locale)} to ${formatPriceNumber(hi, locale)} UAH`;
}

export function formatServicesCount(n: number, locale: Locale): string {
  if (locale === "en") return n === 1 ? "1 service" : `${n} services`;
  if (n === 1) return "1 послуга";
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return `${n} послуги`;
  return `${n} послуг`;
}
