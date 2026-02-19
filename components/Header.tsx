"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Послуги", href: "#services" },
  { label: "Команда", href: "#masters" },
  { label: "Галерея", href: "#gallery" },
  { label: "Відгуки", href: "#reviews" },
  { label: "Контакти", href: "#contacts" },
];

const BOOKING_URL = "https://mybarber.com.ua/";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

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
          {/* Triangle mark */}
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
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{
                    background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.6), transparent)",
                    boxShadow: "0 0 4px hsl(var(--neon-red) / 0.3)",
                  }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA - Neon sign button */}
        <div className="hidden lg:block">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-btn neon-flicker inline-flex items-center gap-2 px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em]"
          >
            Записатись
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={mobileOpen ? "Закрити меню" : "Відкрити меню"}
        >
          <span
            className={cn(
              "block h-px w-6 bg-neon-red transition-all duration-300",
              mobileOpen && "translate-y-[7px] rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-neon-red transition-all duration-300",
              mobileOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-neon-red transition-all duration-300",
              mobileOpen && "-translate-y-[7px] -rotate-45"
            )}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background/98 backdrop-blur-2xl transition-all duration-500 lg:hidden cyber-grid",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Corner brackets - neon red */}
        <div className="absolute left-6 top-20 h-10 w-10 border-l border-t border-neon-red/20" />
        <div className="absolute right-6 bottom-20 h-10 w-10 border-r border-b border-neon-red/20" />

        {/* District tag */}
        <span className="absolute top-20 right-6 font-mono text-[7px] uppercase tracking-[0.5em] text-neon-red/20">
          LVIV // 07
        </span>

        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-light uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-neon-red"
            style={{
              transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.4s ease ${i * 60}ms, transform 0.4s ease ${i * 60}ms, color 0.3s`,
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileOpen(false)}
          className="neon-btn mt-4 inline-flex items-center gap-2 px-8 py-3 font-mono text-sm uppercase tracking-[0.2em]"
        >
          Записатись
        </a>

        <span className="absolute bottom-8 font-mono text-[8px] uppercase tracking-[0.5em] text-muted-foreground/20">
          {"M&Y Barber Studio // Night Session"}
        </span>
      </div>
    </header>
  );
}
