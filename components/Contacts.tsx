"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import { useLocale } from "@/lib/locale-context";
import { BOOKING_URL, SECTION_IDS } from "@/constants/routes";
import { useSectionInView } from "@/hooks/use-section-in-view";
import type { TranslationKey, Locale } from "@/lib/i18n";

const CONTACT_INFO = {
  phone: "+38 (066) 033 60 00",
  email: "mybarbershop36@gmail.com",
  /** Opens the Google Maps business listing (place id), not a raw pin search */
  mapsUrl:
    "https://www.google.com/maps/place/M%26Y+BARBER+STUDIO/data=!4m6!3m5!1s0x473add2c785742b1:0xb00c85a63b08bc4a!8m2!3d49.8368579!4d24.0284688!16s%2Fg%2F11hzwg3vlm",
} as const;

/**
 * Consumer embed (no API key): `embed?pb=…` matches “Share → Embed” for the verified place,
 * so the pin shows the business listing / name like on the full Maps page.
 * `output=embed` + raw coordinates only shows a generic pin without the place label.
 */
function googleMapsEmbedSrc(locale: Locale) {
  const hl = locale === "uk" ? "uk" : "en";
  /** `!1m14!1m8!…` = consumer “Embed map” shape; pin is the verified place → name/label like in full Maps */
  const pb =
    "!1m14!1m8!1m3!1d2574.086!2d24.0284688!3d49.8368579!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add2c785742b1%3A0xb00c85a63b08bc4a!2sM%26Y%20BARBER%20STUDIO!5e0!3m2!1s" +
    hl +
    "!2sua!4v1738281600!5m2!1s" +
    hl +
    "!2sua";
  return `https://www.google.com/maps/embed?pb=${pb}&hl=${hl}`;
}

const SOCIAL_LINKS: { labelKey: TranslationKey; href: string; icon: ReactNode }[] = [
  {
    labelKey: "contacts.social.instagram",
    href: "https://www.instagram.com/my.barber_studio/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    labelKey: "contacts.social.telegram",
    href: "https://t.me/mybarberstudio",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
      </svg>
    ),
  },
  {
    labelKey: "contacts.social.phone",
    href: `tel:${CONTACT_INFO.phone.replace(/[\s()]/g, "")}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
];

function CornerBrackets({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="absolute left-0 top-0 h-4 w-4 border-l border-t border-neon-red/30" />
      <div className="absolute right-0 top-0 h-4 w-4 border-r border-t border-neon-red/30" />
      <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-neon-red/30" />
      <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-neon-red/30" />
    </div>
  );
}

function InfoBlock({
  label,
  children,
  delay = 0,
  inView,
}: {
  label: string;
  children: React.ReactNode;
  delay?: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "contacts-info-block group relative overflow-hidden border border-neon-red/10 bg-card p-5 transition-all duration-500 hover:border-neon-red/25 hover:bg-muted scroll-reveal-x",
        inView && "in-view"
      )}
      style={{ transitionDelay: inView ? `${delay}s` : "0s" }}
    >
      <span className="mb-3 block font-mono text-[7px] uppercase tracking-[0.6em] text-neon-cyan/30">
        {label}
      </span>
      {children}
      {hovered && (
        <div
          className="contacts-info-shimmer absolute left-0 top-0 h-full w-8"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--neon-red) / 0.08), transparent)" }}
        />
      )}
      <CornerBrackets />
    </div>
  );
}

function LazyMap() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useLocale();

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "100px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={mapRef} className="relative aspect-square w-full md:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[420px]">
      {/* Skeleton before load — same size, no layout shift */}
      {!shouldLoad && (
        <div
          className="map-skeleton absolute inset-0"
          aria-hidden
        />
      )}
      {shouldLoad && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/*
            Clip top-left: Google place card + top chrome; iframe is cross-origin — crop only.
          */}
          <iframe
            key={locale}
            title={t("contacts.mapIframeTitle")}
            src={googleMapsEmbedSrc(locale)}
            className="pointer-events-auto absolute max-w-none border-0
              w-[calc(100%+260px)] h-[calc(100%+168px)]
              -left-[188px] -top-[132px]
              md:w-[calc(100%+340px)] md:h-[calc(100%+192px)]
              md:-left-[248px] md:-top-[152px]"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setMapReady(true)}
          />
        </div>
      )}
      {/* Skeleton overlay while map loads — removed on iframe load */}
      {shouldLoad && !mapReady && (
        <div
          className="map-skeleton pointer-events-none absolute inset-0 z-[25]"
          aria-hidden
        />
      )}
      <div className="pointer-events-none absolute inset-0 z-[26]">
        <CornerBrackets />
      </div>
    </div>
  );
}

export default function Contacts() {
  const { ref, inView } = useSectionInView();
  const { t } = useLocale();

  return (
    <section
      id={SECTION_IDS.contacts}
      className="contacts-section relative overflow-hidden px-6 py-12 md:py-16 lg:px-8"
      style={{ background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(0 0% 2%) 100%)" }}
    >
      <div className="absolute left-0 right-0 top-0 glitch-divider" />
      <div className="contacts-bg-radial pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(0 0% 0% / 0.6) 100%)" }} />
      <div className="pointer-events-none absolute inset-0 cyber-grid opacity-40" />

      <div className="pointer-events-none absolute left-1/4 top-1/3 h-64 w-64 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--neon-red) / 0.04) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute right-1/4 bottom-1/3 h-48 w-48 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--neon-cyan) / 0.03) 0%, transparent 70%)" }} />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl pt-6">
        <SectionHeading
          tag={t("contacts.tag")}
          title={t("contacts.title")}
          description={t("contacts.description")}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-3">
            <InfoBlock label={t("contacts.label.location")} delay={0.1} inView={inView}>
              <p className="text-sm font-medium text-foreground">{t("contacts.addressLine")}</p>
              <a
                href={CONTACT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-neon-red"
              >
                <span className="inline-block h-1.5 w-1.5 animate-pulse-red bg-neon-red/60" style={{ boxShadow: "0 0 6px hsl(var(--neon-red) / 0.4)" }} />
                {t("contacts.route")}
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3">
                  <path d="M5 11L11 5M11 5H6M11 5v5" />
                </svg>
              </a>
            </InfoBlock>

            <InfoBlock label={t("contacts.label.comms")} delay={0.2} inView={inView}>
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/[\s()]/g, "")}`}
                className="group/phone relative inline-block text-sm font-medium text-foreground transition-all duration-300 hover:text-neon-red"
              >
                <span className="relative z-10">{CONTACT_INFO.phone}</span>
                <span className="absolute -inset-x-2 -inset-y-1 rounded bg-neon-red/0 transition-all duration-300 group-hover/phone:bg-neon-red/5" />
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="mt-2 block text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {CONTACT_INFO.email}
              </a>
            </InfoBlock>

            <InfoBlock label={t("contacts.label.schedule")} delay={0.3} inView={inView}>
              <p className="text-sm font-medium text-foreground">{t("contacts.hoursLine")}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse-red bg-neon-red/50" style={{ boxShadow: "0 0 6px hsl(var(--neon-red) / 0.4)" }} />
                <span className="font-mono text-[7px] uppercase tracking-[0.5em] text-neon-cyan/30">{t("contacts.systemOnline")}</span>
              </div>
            </InfoBlock>

            <div
              className={cn(
                "contacts-info-block relative border border-neon-red/10 bg-card p-5 scroll-reveal-x",
                inView && "in-view"
              )}
              style={{ transitionDelay: inView ? "0.4s" : "0s" }}
            >
              <span className="mb-4 block font-mono text-[7px] uppercase tracking-[0.6em] text-neon-cyan/30">{t("contacts.label.network")}</span>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.labelKey}
                    href={social.href}
                    target={social.href.startsWith("tel:") ? undefined : "_blank"}
                    rel={social.href.startsWith("tel:") ? undefined : "noopener noreferrer"}
                    aria-label={t(social.labelKey)}
                    className="group/icon relative flex h-10 w-10 items-center justify-center border border-neon-red/15 bg-background text-muted-foreground transition-all duration-300 hover:border-neon-red/40 hover:text-neon-red"
                  >
                    {social.icon}
                    <span className="pointer-events-none absolute inset-0 bg-neon-red/0 transition-all duration-300 group-hover/icon:bg-neon-red/5 group-hover/icon:shadow-[0_0_15px_hsl(var(--neon-red)/0.15)]" />
                  </a>
                ))}
              </div>
              <CornerBrackets />
            </div>
          </div>

          {/* RIGHT COLUMN — Map */}
          <div
            className={cn(
              "relative flex flex-col scroll-reveal",
              inView && "in-view"
            )}
            style={{ transitionDelay: inView ? "0.3s" : "0s" }}
          >
            <div className="contacts-map-block relative flex-1 overflow-hidden border border-neon-red/15 bg-card">
              <div className="flex items-center justify-between border-b border-neon-red/10 px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-pulse-red bg-neon-red/60" style={{ boxShadow: "0 0 4px hsl(var(--neon-red) / 0.3)" }} />
                  <span className="font-mono text-[7px] uppercase tracking-[0.5em] text-neon-red/40">{t("contacts.label.mapHeader")}</span>
                </div>
                <span className="font-mono text-[7px] uppercase tracking-[0.4em] text-muted-foreground/30">{t("contacts.coords")}</span>
              </div>

              <LazyMap />

              <div className="flex items-center justify-between border-t border-neon-red/10 px-4 py-2">
                <span className="font-mono text-[7px] uppercase tracking-[0.4em] text-muted-foreground/25">{t("contacts.label.signalOk")}</span>
                <div className="flex items-center gap-2">
                  <span className="h-px w-4 bg-neon-cyan/15" />
                  <span className="font-mono text-[7px] uppercase tracking-[0.4em] text-neon-cyan/20">{t("contacts.label.mapFooterLviv")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className={cn(
            "mt-12 flex flex-col items-center scroll-reveal",
            inView && "in-view"
          )}
          style={{ transitionDelay: inView ? "0.6s" : "0s" }}
        >
          <div className="mb-8 h-px w-full max-w-md" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--neon-red) / 0.2), transparent)" }} />
          <div className="relative px-8 py-6 text-center">
            <div className="pointer-events-none absolute inset-0 border border-neon-red/20" />
            <div className="pointer-events-none absolute inset-[3px] border border-neon-red/10" />
            <span className="mb-3 block font-mono text-[7px] uppercase tracking-[0.7em] text-neon-cyan/25">{t("contacts.ctaPretitle")}</span>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-btn inline-flex items-center gap-3 px-10 py-4 font-body text-sm font-medium uppercase tracking-[0.2em] neon-flicker"
            >
              <span className="h-1.5 w-1.5 animate-pulse-red bg-neon-red/60" style={{ boxShadow: "0 0 6px hsl(var(--neon-red) / 0.4)" }} />
              {t("contacts.bookNow")}
            </a>
            <p className="mt-3 font-mono text-[7px] uppercase tracking-[0.5em] text-muted-foreground/30">{t("contacts.bookingLine")}</p>
            <CornerBrackets />
          </div>
        </div>
      </div>
    </section>
  );
}
