/** Primary About image path (first slide; legacy single-image imports) */
export const ABOUT_SECTION_IMAGE_SRC = "/images/about/about-new-01.png";

/** About section gallery: first slide is the historical hero; 02–07 from studio photography */
export const ABOUT_SLIDES = [
  { src: "/images/about/about-new-01.png", objectPosition: "50% 50%" as const, altKey: "about.slideAlt.1" as const },
  { src: "/images/about/about-slide-02.png", objectPosition: "50% 40%" as const, altKey: "about.slideAlt.2" as const },
  { src: "/images/about/about-slide-03.png", objectPosition: "50% 45%" as const, altKey: "about.slideAlt.3" as const },
  { src: "/images/about/about-slide-04.png", objectPosition: "50% 50%" as const, altKey: "about.slideAlt.4" as const },
  { src: "/images/about/about-slide-05.png", objectPosition: "50% 45%" as const, altKey: "about.slideAlt.5" as const },
  { src: "/images/about/about-slide-06.png", objectPosition: "50% 45%" as const, altKey: "about.slideAlt.6" as const },
  { src: "/images/about/about-slide-07.png", objectPosition: "50% 50%" as const, altKey: "about.slideAlt.7" as const },
] as const;

/** Hero background — public/videos/hero (served as /videos/hero/...) */
export const HERO_VIDEO_DESKTOP_SRC = "/videos/hero/hero-desktop.mp4";
export const HERO_VIDEO_MOBILE_SRC = "/videos/hero/hero-mobile.mp4";
export const HERO_VIDEO_POSTER_SRC = "/videos/hero/hero-poster.png";
