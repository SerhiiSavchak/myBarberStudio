/** Site & booking URLs */
export const SITE_URL = "https://mybarber.com.ua";
export const BOOKING_URL = "https://mybarber.com.ua/";

/** Section IDs for navigation */
export const SECTION_IDS = {
  services: "services",
  masters: "masters",
  gallery: "gallery",
  reviews: "reviews",
  contacts: "contacts",
} as const;

/** Navigation links with i18n keys */
export const NAV_LINKS = [
  { key: "nav.services" as const, href: `#${SECTION_IDS.services}` },
  { key: "nav.team" as const, href: `#${SECTION_IDS.masters}` },
  { key: "nav.gallery" as const, href: `#${SECTION_IDS.gallery}` },
  { key: "nav.reviews" as const, href: `#${SECTION_IDS.reviews}` },
  { key: "nav.contacts" as const, href: `#${SECTION_IDS.contacts}` },
] as const;
