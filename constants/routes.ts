/** Site & booking URLs */
export const SITE_URL = "https://mybarber.com.ua";
export const BOOKING_URL = "https://b766038.alteg.io/company/719988/menu?o=";

/** Tattoo section CTA — select services / consultation flow */
export const TATTOO_BOOKING_URL =
  "https://b766038.alteg.io/company/719988/personal/select-services?gcid=488652786.1711811568&o=m2101313&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnmv9MykXYgD-RjEpn5XaT1dET_NS7zdwx-9P2Hc8GhMYFvqLUZS1EllxIPrQ_aem_XeKGpXM16ZFFKRoYo2RmOg&utm_id=97760_v0_s00_e0_tv3_a1denngln8xg71";

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
