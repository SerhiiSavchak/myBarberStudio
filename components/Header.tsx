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
          ? "bg-background/85 backdrop-blur-xl border-b border-border/40"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-3">
          <span className="text-lg font-bold tracking-[0.15em] uppercase text-foreground">
            M&Y
            <span className="text-neon-accent"> Barber</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground/40 transition-all duration-500 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:block">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-foreground/20 bg-foreground/5 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:bg-foreground/10 hover:border-foreground/40"
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
          <span className={cn(
            "block h-px w-6 bg-foreground transition-all duration-300",
            mobileOpen && "translate-y-[7px] rotate-45"
          )} />
          <span className={cn(
            "block h-px w-6 bg-foreground transition-all duration-300",
            mobileOpen && "opacity-0"
          )} />
          <span className={cn(
            "block h-px w-6 bg-foreground transition-all duration-300",
            mobileOpen && "-translate-y-[7px] -rotate-45"
          )} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background/98 backdrop-blur-2xl transition-all duration-500 lg:hidden",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Industrial corner marks */}
        <div className="absolute left-6 top-20 h-8 w-8 border-l border-t border-foreground/10" />
        <div className="absolute right-6 bottom-20 h-8 w-8 border-r border-b border-foreground/10" />

        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-light uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
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
          className="mt-4 inline-flex items-center gap-2 border border-foreground/20 bg-foreground/5 px-8 py-3 font-mono text-sm uppercase tracking-[0.2em] text-foreground transition-all hover:bg-foreground/10"
        >
          Записатись
        </a>

        {/* Industrial label */}
        <span className="absolute bottom-8 font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground/40">
          M&Y Barber Studio / Lviv
        </span>
      </div>
    </header>
  );
}
