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
          className="grid gap-px bg-border/50 md:grid-cols-3"
        >
          {/* Address */}
          <div className="flex flex-col gap-3 bg-card p-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40">
              Адреса
            </span>
            <p className="text-sm text-foreground">{CONTACT_INFO.address}</p>
            <a
              href={CONTACT_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Прокласти маршрут
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3">
                <path d="M5 11L11 5M11 5H6M11 5v5" />
              </svg>
            </a>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3 bg-card p-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40">
              Контакти
            </span>
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/[\s()]/g, "")}`}
              className="text-sm text-foreground transition-colors hover:text-neon-magenta/70"
            >
              {CONTACT_INFO.phone}
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {CONTACT_INFO.email}
            </a>
          </div>

          {/* Hours + CTA */}
          <div className="flex flex-col gap-3 bg-card p-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40">
              Графік роботи
            </span>
            <p className="text-sm text-foreground">{CONTACT_INFO.hours}</p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 border border-foreground/15 bg-foreground/5 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:bg-foreground/10 hover:border-neon-magenta/30"
            >
              Записатись
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
