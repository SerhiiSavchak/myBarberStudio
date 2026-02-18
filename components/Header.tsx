"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Masters", href: "#masters" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contacts", href: "#contacts" },
];

// TODO: Replace with real booking URL
const BOOKING_URL = "#book";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-2">
          <span className="relative flex h-8 w-8 items-center justify-center">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="h-8 w-8"
              aria-hidden="true"
            >
              <rect
                x="2"
                y="2"
                width="28"
                height="28"
                rx="4"
                stroke="hsl(var(--neon-violet))"
                strokeWidth="1.5"
                className="opacity-60 group-hover:opacity-100 transition-opacity"
              />
              <path
                d="M10 8v16M14 8c3 0 5 2 5 4s-2 4-5 4m0 0c3 0 5 2 5 4s-2 4-5 4"
                stroke="hsl(var(--neon-cyan))"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:drop-shadow-[0_0_6px_hsl(var(--neon-cyan)/0.6)] transition-all"
              />
            </svg>
          </span>
          <span className="text-lg font-bold tracking-wider uppercase text-foreground">
            MyBarber
            <span className="text-neon-violet">Studio</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative font-mono text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-neon-cyan transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href={BOOKING_URL}
            className="neon-cta relative inline-flex items-center gap-2 rounded-sm border border-neon-violet/60 bg-neon-violet/10 px-5 py-2 font-mono text-sm uppercase tracking-widest text-neon-violet transition-all duration-300 hover:bg-neon-violet/20 hover:shadow-[0_0_20px_hsl(var(--neon-violet)/0.3)]"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={cn(
              "block h-0.5 w-6 bg-foreground transition-all duration-300",
              mobileOpen && "translate-y-2 rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 bg-foreground transition-all duration-300",
              mobileOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 bg-foreground transition-all duration-300",
              mobileOpen && "-translate-y-2 -rotate-45"
            )}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background/95 backdrop-blur-2xl transition-all duration-500 md:hidden",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="font-mono text-2xl uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            style={{ transitionDelay: mobileOpen ? `${i * 80}ms` : "0ms" }}
          >
            {link.label}
          </a>
        ))}
        <a
          href={BOOKING_URL}
          onClick={() => setMobileOpen(false)}
          className="mt-4 inline-flex items-center gap-2 rounded-sm border border-neon-violet/60 bg-neon-violet/10 px-8 py-3 font-mono text-lg uppercase tracking-widest text-neon-violet transition-all hover:bg-neon-violet/20"
        >
          Book Now
        </a>
      </div>
    </header>
  );
}
