"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { useLocale } from "@/lib/locale-context";

const BOOKING_URL = "https://mybarber.com.ua/";

const CONTACT_INFO = {
  address: "Львів, вул. Мирослава Скорика, 21",
  phone: "+38 (066) 033 60 00",
  email: "mybarbershop36@gmail.com",
  hours: "Пн-Нд: 10:00-20:00",
  mapsUrl: "https://maps.google.com/?q=Львів+вул+Мирослава+Скорика+21",
};

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com/mybarber.studio",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/mybarberstudio",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
      </svg>
    ),
  },
  {
    label: "Phone",
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

function RadarOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-neon-cyan/10 animate-radar-pulse"
          style={{ width: "200px", height: "200px", animationDelay: `${i * 0.7}s` }}
        />
      ))}
      <div
        className="absolute h-[100px] w-px origin-bottom animate-radar-spin"
        style={{ background: "linear-gradient(to top, hsl(var(--neon-cyan) / 0.2), transparent)" }}
      />
    </div>
  );
}

function LocationMarker() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <div className="absolute -inset-3 animate-signal-ping rounded-full border border-neon-red/40" />
      <div className="absolute -inset-3 animate-signal-ping rounded-full border border-neon-red/20" style={{ animationDelay: "0.5s" }} />
      <div className="relative h-3 w-3 rounded-full bg-neon-red animate-marker-glow" />
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
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden border border-neon-red/10 bg-card p-5 transition-all duration-500 hover:border-neon-red/25 hover:bg-muted"
    >
      <span className="mb-3 block font-mono text-[7px] uppercase tracking-[0.6em] text-neon-cyan/30">
        {label}
      </span>
      {children}
      {hovered && (
        <motion.div
          className="absolute left-0 top-0 h-full w-8"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--neon-red) / 0.08), transparent)" }}
          initial={{ x: "-100%" }}
          animate={{ x: "calc(100% + 400px)" }}
          transition={{ duration: 0.6 }}
        />
      )}
      <CornerBrackets />
    </motion.div>
  );
}

export default function Contacts() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { t } = useLocale();

  return (
    <section
      id="contacts"
      className="relative overflow-hidden px-6 py-24 md:py-32 lg:px-8"
      style={{ background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(0 0% 2%) 100%)" }}
    >
      <div className="absolute left-0 right-0 top-0 glitch-divider" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(0 0% 0% / 0.6) 100%)" }} />
      <div className="pointer-events-none absolute inset-0 cyber-grid opacity-40" />

      <div className="pointer-events-none absolute left-1/4 top-1/3 h-64 w-64 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--neon-red) / 0.04) 0%, transparent 70%)" }} />
      <div className="pointer-events-none absolute right-1/4 bottom-1/3 h-48 w-48 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--neon-cyan) / 0.03) 0%, transparent 70%)" }} />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl pt-6">
        <SectionHeading
          tag={t("contacts.tag")}
          title={t("contacts.title")}
          description={t("contacts.description")}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10 flex items-center gap-3"
        >
          <span className="h-px w-6 bg-neon-cyan/20" />
          <span className="font-mono text-[7px] uppercase tracking-[0.7em] text-neon-cyan/25">
            District 07 // Access Point // Barber Hub
          </span>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-3">
            <InfoBlock label="Location Node" delay={0.1} inView={inView}>
              <p className="text-sm font-medium text-foreground">{CONTACT_INFO.address}</p>
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

            <InfoBlock label="Comms Channel" delay={0.2} inView={inView}>
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

            <InfoBlock label="Schedule // Uptime" delay={0.3} inView={inView}>
              <p className="text-sm font-medium text-foreground">{CONTACT_INFO.hours}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse-red bg-neon-red/50" style={{ boxShadow: "0 0 6px hsl(var(--neon-red) / 0.4)" }} />
                <span className="font-mono text-[7px] uppercase tracking-[0.5em] text-neon-cyan/30">System Online</span>
              </div>
            </InfoBlock>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative border border-neon-red/10 bg-card p-5"
            >
              <span className="mb-4 block font-mono text-[7px] uppercase tracking-[0.6em] text-neon-cyan/30">Network Links</span>
              <div className="flex items-center gap-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group/icon relative flex h-10 w-10 items-center justify-center border border-neon-red/15 bg-background text-muted-foreground transition-all duration-300 hover:border-neon-red/40 hover:text-neon-red"
                  >
                    {social.icon}
                    <span className="pointer-events-none absolute inset-0 bg-neon-red/0 transition-all duration-300 group-hover/icon:bg-neon-red/5 group-hover/icon:shadow-[0_0_15px_hsl(var(--neon-red)/0.15)]" />
                  </a>
                ))}
              </div>
              <CornerBrackets />
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Map */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex flex-col"
          >
            <div className="relative flex-1 overflow-hidden border border-neon-red/15 bg-card">
              <div className="flex items-center justify-between border-b border-neon-red/10 px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-pulse-red bg-neon-red/60" style={{ boxShadow: "0 0 4px hsl(var(--neon-red) / 0.3)" }} />
                  <span className="font-mono text-[7px] uppercase tracking-[0.5em] text-neon-red/40">Location Terminal</span>
                </div>
                <span className="font-mono text-[7px] uppercase tracking-[0.4em] text-muted-foreground/30">49.8397N // 24.0232E</span>
              </div>

              <div className="relative aspect-square w-full md:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[420px]">
                <iframe
                  title="M&Y Barber Studio Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.4!2d24.0232!3d49.8397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z0JvRjNCy0ZbQsg!5e0!3m2!1suk!2sua!4v1"
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.6) contrast(1.3)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="pointer-events-none absolute inset-0 z-[2] mix-blend-multiply" style={{ background: "linear-gradient(180deg, hsl(0 0% 2% / 0.3) 0%, hsl(0 0% 2% / 0.15) 50%, hsl(0 0% 2% / 0.4) 100%)" }} />
                <div className="pointer-events-none absolute inset-0 z-[3]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(0 0% 0% / 0.04) 3px, hsl(0 0% 0% / 0.04) 6px)" }} />
                <div className="pointer-events-none absolute inset-0 z-[3] opacity-20" style={{ backgroundImage: "linear-gradient(hsl(var(--neon-red) / 0.08) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--neon-red) / 0.08) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div className="pointer-events-none absolute inset-0 z-[4]"><RadarOverlay /></div>
                <div className="pointer-events-none absolute inset-0 z-[5]"><LocationMarker /></div>
                <div className="pointer-events-none absolute inset-0 z-[6]"><CornerBrackets /></div>
              </div>

              <div className="flex items-center justify-between border-t border-neon-red/10 px-4 py-2">
                <span className="font-mono text-[7px] uppercase tracking-[0.4em] text-muted-foreground/25">Signal Locked</span>
                <div className="flex items-center gap-2">
                  <span className="h-px w-4 bg-neon-cyan/15" />
                  <span className="font-mono text-[7px] uppercase tracking-[0.4em] text-neon-cyan/20">LVIV // UA</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 flex flex-col items-center"
        >
          <div className="mb-8 h-px w-full max-w-md" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--neon-red) / 0.2), transparent)" }} />
          <div className="relative px-8 py-6 text-center">
            <div className="pointer-events-none absolute inset-0 border border-neon-red/20" />
            <div className="pointer-events-none absolute inset-[3px] border border-neon-red/10" />
            <span className="mb-3 block font-mono text-[7px] uppercase tracking-[0.7em] text-neon-cyan/25">Ready to Deploy</span>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-btn inline-flex items-center gap-3 px-10 py-4 font-mono text-xs uppercase tracking-[0.35em] neon-flicker"
            >
              <span className="h-1.5 w-1.5 animate-pulse-red bg-neon-red/60" style={{ boxShadow: "0 0 6px hsl(var(--neon-red) / 0.4)" }} />
              {t("contacts.bookNow")}
            </a>
            <p className="mt-3 font-mono text-[7px] uppercase tracking-[0.5em] text-muted-foreground/30">Booking System // Online</p>
            <CornerBrackets />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
