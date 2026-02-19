"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";

const BOOKING_URL = "https://mybarber.com.ua/";

const CONTACT_INFO = {
  address: "Львів, вул. Мирослава Скорика, 21",
  phone: "+38 (066) 033 60 00",
  email: "mybarbershop36@gmail.com",
  hours: "Пн-Нд: 10:00-20:00",
  mapsUrl: "https://maps.google.com/?q=Львів+вул+Мирослава+Скорика+21",
};

export default function Contacts() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="contacts" className="relative px-6 py-24 md:py-32 lg:px-8">
      <div className="absolute top-0 left-0 right-0 glitch-divider" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="Контакти"
          title="Як нас знайти"
          description="Ми у самому серці Львова."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid gap-1 md:grid-cols-3"
        >
          {/* Address */}
          <div className="tron-edge group relative bg-card p-8 transition-colors duration-500 hover:bg-muted">
            <span className="mb-3 block font-mono text-[8px] uppercase tracking-[0.5em] text-neon-red/30">
              Адреса // Location
            </span>
            <p className="text-sm text-foreground">{CONTACT_INFO.address}</p>
            <a
              href={CONTACT_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-neon-red"
            >
              Прокласти маршрут
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3">
                <path d="M5 11L11 5M11 5H6M11 5v5" />
              </svg>
            </a>
            {/* Corner glow */}
            <div className="absolute left-0 top-0 h-6 w-6 border-l border-t border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/25" />
          </div>

          {/* Contact */}
          <div className="tron-edge group relative bg-card p-8 transition-colors duration-500 hover:bg-muted">
            <span className="mb-3 block font-mono text-[8px] uppercase tracking-[0.5em] text-neon-red/30">
              Контакти // Comms
            </span>
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/[\s()]/g, "")}`}
              className="block text-sm text-foreground transition-colors hover:text-neon-red"
              style={{ textShadow: "none" }}
            >
              {CONTACT_INFO.phone}
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="mt-2 block text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {CONTACT_INFO.email}
            </a>
            <div className="absolute right-0 bottom-0 h-6 w-6 border-r border-b border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/25" />
          </div>

          {/* Hours + CTA */}
          <div className="tron-edge group relative bg-card p-8 transition-colors duration-500 hover:bg-muted">
            <span className="mb-3 block font-mono text-[8px] uppercase tracking-[0.5em] text-neon-red/30">
              Графік // Schedule
            </span>
            <p className="text-sm text-foreground">{CONTACT_INFO.hours}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse-red bg-neon-red/50" style={{ boxShadow: "0 0 6px hsl(var(--neon-red) / 0.4)" }} />
              <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-neon-cyan/30">
                SYSTEM ONLINE
              </span>
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-btn mt-5 inline-flex items-center gap-2 px-6 py-3 font-mono text-[9px] uppercase tracking-[0.25em]"
            >
              Записатись
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
