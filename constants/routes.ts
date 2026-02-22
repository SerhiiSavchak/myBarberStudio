/** Site & booking URLs */
export const SITE_URL = "https://mybarber.com.ua";
export const BOOKING_URL = "https://b766038.alteg.io/company/719988/menu?o=";

/** Section IDs for navigation */
export const SECTION_IDS = {
  services: "services",
  tattoo: "tattoo",
  masters: "masters",
  gallery: "gallery",
  reviews: "reviews",
  contacts: "contacts",
} as const;

/** Navigation links with i18n keys */
export const NAV_LINKS = [
  { key: "nav.services" as const, href: `#${SECTION_IDS.services}` },
  { key: "nav.tattoo" as const, href: `#${SECTION_IDS.tattoo}` },
  { key: "nav.team" as const, href: `#${SECTION_IDS.masters}` },
  { key: "nav.gallery" as const, href: `#${SECTION_IDS.gallery}` },
  { key: "nav.reviews" as const, href: `#${SECTION_IDS.reviews}` },
  { key: "nav.contacts" as const, href: `#${SECTION_IDS.contacts}` },
] as const;
