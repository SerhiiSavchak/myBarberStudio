"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/locale-context";
import { LOCALES } from "@/lib/i18n";
import { BOOKING_URL, NAV_LINKS } from "@/constants/routes";
import { useLockBodyScroll, setPendingScrollTo } from "@/hooks/use-lock-body-scroll";
import ThemeToggle from "./ThemeToggle";

const MENU_ANIM_DURATION = 250;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const { locale, setLocale, t } = useLocale();

  useEffect(() => {
    const el = menuOverlayRef.current;
    if (!el || !(mobileOpen || isAnimatingOut)) return;
    const prevent = (e: TouchEvent) => e.preventDefault();
    el.addEventListener("touchmove", prevent, { passive: false });
    return () => el.removeEventListener("touchmove", prevent);
  }, [mobileOpen, isAnimatingOut]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLockBodyScroll(mobileOpen || isAnimatingOut);

  const closeMenu = useCallback(() => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsAnimatingOut(true);
    closeTimeoutRef.current = setTimeout(() => {
      setMobileOpen(false);
      setIsAnimatingOut(false);
      closeTimeoutRef.current = null;
    }, 450);
  }, []);

  useEffect(() => () => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current); }, []);
  const handleNavClick = useCallback((href: string) => {
    setPendingScrollTo(href);
    closeMenu();
  }, [closeMenu]);

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
        <a href="/" className="group flex items-center gap-3 cursor-pointer select-none" onClick={(e) => { if (window.location.pathname === "/") { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); } }}>
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
                className="group relative font-body text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground cursor-pointer"
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
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 border border-neon-red/15 bg-background/50 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground transition-all duration-300 hover:border-neon-red/30 hover:text-foreground cursor-pointer select-none"
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
                    type="button"
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
            className="neon-btn neon-flicker inline-flex items-center gap-2 px-6 py-2.5 font-body text-[11px] font-medium uppercase tracking-[0.2em] cursor-pointer select-none"
          >
            {t("nav.book")}
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => {
            if (mobileOpen) {
              setPendingScrollTo(null);
              closeMenu();
            } else setMobileOpen(true);
          }}
          className="relative z-[60] flex h-10 w-10 min-w-[44px] min-h-[44px] flex-col items-center justify-center gap-1.5 lg:hidden cursor-pointer select-none touch-manipulation"
          aria-label={mobileOpen ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={mobileOpen}
        >
          <span className={cn("block h-px w-6 bg-neon-red transition-all duration-300", mobileOpen && "translate-y-[7px] rotate-45")} />
          <span className={cn("block h-px w-6 bg-neon-red transition-all duration-300", mobileOpen && "opacity-0")} />
          <span className={cn("block h-px w-6 bg-neon-red transition-all duration-300", mobileOpen && "-translate-y-[7px] -rotate-45")} />
        </button>
      </nav>

      {/* Mobile Menu — overflow lock only (no position:fixed = no scroll jump on iOS) */}
      <div
        ref={menuOverlayRef}
        className={cn(
          "fixed inset-0 z-40 flex flex-col lg:hidden",
          "min-h-[100dvh] min-h-[100svh]",
          "transition-[opacity,visibility] duration-300 ease-out",
          (mobileOpen || isAnimatingOut) ? "opacity-100 pointer-events-auto visible" : "opacity-0 pointer-events-none invisible"
        )}
        style={{ top: 0, left: 0, right: 0, bottom: 0, touchAction: "none" }}
        aria-hidden={!mobileOpen && !isAnimatingOut}
      >
        {/* Solid background — no transparency, appears immediately */}
        <div className="absolute inset-0 bg-background" />

        {/* Scanning horizontal line */}
        {(mobileOpen || isAnimatingOut) && (
          <div
            className="pointer-events-none absolute left-0 right-0 top-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--neon-red) / 0.4), transparent)",
              animation: "scanline-pass 3s linear infinite",
            }}
          />
        )}

        {/* Cyber grid background */}
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-20" />

        {/* Corner brackets */}
        <div className="pointer-events-none absolute left-6 top-20 h-10 w-10 border-l border-t border-neon-red/20" />
        <div className="pointer-events-none absolute right-6 bottom-20 h-10 w-10 border-r border-b border-neon-red/20" />

        {/* District tag */}
        <span className="pointer-events-none absolute top-20 right-6 font-mono text-[7px] uppercase tracking-[0.5em] text-neon-red/20">
          LVIV // 07
        </span>

        {/* Nav links — interactive, above overlays */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6">
          {NAV_LINKS.map((link, i) => {
            const isVisible = mobileOpen && !isAnimatingOut;
            const closeDelay = (NAV_LINKS.length - 1 - i) * 45;
            const openDelay = i * 50;
            const delay = isAnimatingOut ? closeDelay : (mobileOpen ? openDelay : 0);
            return (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="group relative flex w-full max-w-[200px] items-center justify-center gap-4 cursor-pointer select-none touch-manipulation min-h-[44px] bg-transparent border-0 text-left"
              style={{
                transitionDelay: `${delay}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.25s ease-out ${delay}ms, transform 0.25s ease-out ${delay}ms`,
              }}
            >
              {/* Animated indicator dot */}
              <span className="h-1 w-1 bg-neon-red/30 transition-all duration-300 group-hover:bg-neon-red group-hover:shadow-[0_0_8px_hsl(var(--neon-red)/0.5)]" />
              {/* Glowing separator line */}
              <span className="h-px w-6 bg-neon-red/10 transition-all duration-300 group-hover:w-10 group-hover:bg-neon-red/40" />
              <span className="font-body text-xl font-light uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                {t(link.key)}
              </span>
              {/* Futuristic label */}
              <span className="font-mono text-[7px] uppercase tracking-[0.4em] text-neon-red/15 transition-colors duration-300 group-hover:text-neon-red/40">
                {`0${i + 1}`}
              </span>
            </button>
          );
          })}

          {/* Glowing separator */}
          <div
            className="my-2 h-px w-32"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--neon-red) / 0.2), transparent)" }}
          />

          {/* Mobile language + theme — larger touch targets, pointer-events-auto */}
          <div className="relative z-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <div className="flex items-center gap-2 rounded border border-neon-red/15 bg-card/50 p-1">
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLocale(l.code)}
                  className={cn(
                    "min-h-[44px] min-w-[44px] px-4 font-mono text-[11px] uppercase tracking-[0.3em] transition-all duration-200 rounded cursor-pointer select-none touch-manipulation",
                    locale === l.code ? "text-neon-red font-medium bg-neon-red/10" : "text-muted-foreground hover:text-foreground hover:bg-neon-red/5"
                  )}
                  aria-label={`Мова: ${l.label}`}
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
            onClick={() => { setPendingScrollTo(null); closeMenu(); }}
            className="neon-btn mt-2 inline-flex items-center gap-2 px-8 py-3 font-body text-sm font-medium uppercase tracking-[0.2em] cursor-pointer select-none"
          >
            {t("nav.book")}
          </a>
        </div>

        <span className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[8px] uppercase tracking-[0.5em] text-muted-foreground/20">
          {"M&Y Barber Studio // Night Session"}
        </span>
      </div>
    </header>
  );
}
