"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/locale-context";
import { LOCALES } from "@/lib/i18n";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { key: "nav.services" as const, href: "#services" },
  { key: "nav.team" as const, href: "#masters" },
  { key: "nav.gallery" as const, href: "#gallery" },
  { key: "nav.reviews" as const, href: "#reviews" },
  { key: "nav.contacts" as const, href: "#contacts" },
];

const BOOKING_URL = "https://mybarber.com.ua/";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const top = document.body.style.top;
      const scrollY = top ? Math.abs(parseInt(top, 10)) : 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (scrollY > 0) window.scrollTo(0, scrollY);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const currentLocale = LOCALES.find((l) => l.code === locale)!;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-neon-red/10"
          : "bg-transparent"
      )}
    >
      {/* Top TRON-style edge line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--neon-red) / 0.3), transparent)",
          opacity: scrolled ? 1 : 0,
        }}
      />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-3">
          <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
            <path
              d="M12 2L22 20H2Z"
              fill="none"
              stroke="hsl(var(--neon-red))"
              strokeWidth="1"
              className="drop-shadow-[0_0_4px_hsl(var(--neon-red)/0.5)]"
            />
          </svg>
          <span className="hidden text-sm font-bold tracking-[0.15em] uppercase text-foreground sm:inline">
            {"M&Y"}
            <span className="text-neon-red/70"> Barber</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {t(link.key)}
                {/* Scanning underline */}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{
                    background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.6), transparent)",
                    boxShadow: "0 0 6px hsl(var(--neon-red) / 0.3)",
                  }}
                />
                {/* Subtle glow on hover */}
                <span className="pointer-events-none absolute -inset-x-2 -inset-y-1 bg-neon-red/0 transition-all duration-300 group-hover:bg-neon-red/[0.03]" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 border border-neon-red/15 bg-background/50 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground transition-all duration-300 hover:border-neon-red/30 hover:text-foreground"
            >
              {currentLocale.short}
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className={cn("h-2.5 w-2.5 transition-transform duration-200", langOpen && "rotate-180")}>
                <path d="M3 4.5L6 7.5L9 4.5" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 flex flex-col border border-neon-red/15 bg-card/95 backdrop-blur-xl">
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLocale(l.code); setLangOpen(false); }}
                    className={cn(
                      "px-4 py-2 text-left font-mono text-[9px] uppercase tracking-[0.3em] transition-colors duration-200 hover:bg-neon-red/10 hover:text-neon-red",
                      locale === l.code ? "text-neon-red" : "text-muted-foreground"
                    )}
                  >
                    {l.short}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <ThemeToggle variant="desktop" />

          {/* Futuristic separator */}
          <div className="mx-1 h-5 w-px bg-neon-red/10" />

          {/* CTA */}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-btn neon-flicker inline-flex items-center gap-2 px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em]"
          >
            {t("nav.book")}
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={mobileOpen ? "Закрити меню" : "Відкрити меню"}
        >
          <span className={cn("block h-px w-6 bg-neon-red transition-all duration-300", mobileOpen && "translate-y-[7px] rotate-45")} />
          <span className={cn("block h-px w-6 bg-neon-red transition-all duration-300", mobileOpen && "opacity-0")} />
          <span className={cn("block h-px w-6 bg-neon-red transition-all duration-300", mobileOpen && "-translate-y-[7px] -rotate-45")} />
        </button>
      </nav>

      {/* Mobile Menu — fixed, stable, scroll locked */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-background/98 backdrop-blur-2xl transition-opacity duration-300 lg:hidden",
          "min-h-[100dvh] min-h-[100svh]",
          mobileOpen ? "opacity-100 pointer-events-auto visible" : "opacity-0 pointer-events-none invisible"
        )}
        style={{ top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {/* Scanning horizontal line */}
        {mobileOpen && (
          <div
            className="absolute left-0 right-0 top-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--neon-red) / 0.4), transparent)",
              animation: "scanline-pass 3s linear infinite",
            }}
          />
        )}

        {/* Cyber grid background */}
        <div className="absolute inset-0 cyber-grid opacity-20" />

        {/* Corner brackets */}
        <div className="absolute left-6 top-20 h-10 w-10 border-l border-t border-neon-red/20" />
        <div className="absolute right-6 bottom-20 h-10 w-10 border-r border-b border-neon-red/20" />

        {/* District tag */}
        <span className="absolute top-20 right-6 font-mono text-[7px] uppercase tracking-[0.5em] text-neon-red/20">
          LVIV // 07
        </span>

        {/* Nav links */}
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="group relative flex items-center gap-4"
              style={{
                transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.4s ease ${i * 60}ms, transform 0.4s ease ${i * 60}ms`,
              }}
            >
              {/* Animated indicator dot */}
              <span className="h-1 w-1 bg-neon-red/30 transition-all duration-300 group-hover:bg-neon-red group-hover:shadow-[0_0_8px_hsl(var(--neon-red)/0.5)]" />
              {/* Glowing separator line */}
              <span className="h-px w-6 bg-neon-red/10 transition-all duration-300 group-hover:w-10 group-hover:bg-neon-red/40" />
              <span className="font-heading text-xl font-light uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                {t(link.key)}
              </span>
              {/* Futuristic label */}
              <span className="font-mono text-[7px] uppercase tracking-[0.4em] text-neon-red/15 transition-colors duration-300 group-hover:text-neon-red/40">
                {`0${i + 1}`}
              </span>
            </a>
          ))}

          {/* Glowing separator */}
          <div
            className="my-2 h-px w-32"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--neon-red) / 0.2), transparent)" }}
          />

          {/* Mobile language + theme */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <div className="flex items-center gap-3">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.3em] transition-colors duration-200",
                    locale === l.code ? "text-neon-red font-medium" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {l.short}
                </button>
              ))}
            </div>
            <ThemeToggle variant="mobile" />
          </div>

          {/* CTA */}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="neon-btn mt-2 inline-flex items-center gap-2 px-8 py-3 font-mono text-sm uppercase tracking-[0.2em]"
          >
            {t("nav.book")}
          </a>
        </div>

        <span className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[8px] uppercase tracking-[0.5em] text-muted-foreground/20">
          {"M&Y Barber Studio // Night Session"}
        </span>
      </div>
    </header>
  );
}
