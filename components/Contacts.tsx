"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";

// TODO: Replace with real data
const CONTACT_INFO = {
  address: "Lviv, Rynok Square 14",
  phone: "+380 96 123 4567",
  hours: [
    { days: "Mon - Fri", time: "10:00 - 21:00" },
    { days: "Sat", time: "10:00 - 19:00" },
    { days: "Sun", time: "Closed" },
  ],
  mapsUrl: "https://maps.google.com/?q=Lviv+Rynok+Square+14",
};

const BOOKING_URL = "#book";

export default function Contacts() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="contacts" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          tag="Find Us"
          title="Contacts"
          description="Located in the heart of Lviv."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid gap-8 md:grid-cols-2"
        >
          {/* Info */}
          <div className="flex flex-col gap-6">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm border border-border bg-muted text-neon-cyan">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Address
                </p>
                <p className="mt-1 text-sm text-foreground">{CONTACT_INFO.address}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm border border-border bg-muted text-neon-cyan">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Phone
                </p>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                  className="mt-1 inline-block text-sm text-foreground transition-colors hover:text-neon-cyan"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm border border-border bg-muted text-neon-cyan">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Working Hours
                </p>
                <div className="mt-1 flex flex-col gap-1">
                  {CONTACT_INFO.hours.map((h) => (
                    <div key={h.days} className="flex gap-3 text-sm">
                      <span className="w-20 text-muted-foreground">{h.days}</span>
                      <span className="text-foreground">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="neon-border flex flex-col items-center justify-center rounded bg-card p-8 text-center">
            <h3 className="mb-2 text-2xl font-bold uppercase tracking-wider text-foreground">
              Ready?
            </h3>
            <p className="mb-6 font-mono text-sm text-muted-foreground">
              Book your session today.
            </p>
            <a
              href={BOOKING_URL}
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-sm border border-neon-violet/60 bg-neon-violet/10 px-8 py-3 font-mono text-sm uppercase tracking-widest text-neon-violet transition-all duration-300 hover:bg-neon-violet/20 hover:shadow-[0_0_25px_hsl(var(--neon-violet)/0.3)]"
            >
              <span className="absolute inset-0 -z-10 animate-border-sweep bg-gradient-to-r from-transparent via-neon-violet/20 to-transparent bg-[length:200%_100%]" />
              Book Now
            </a>
            <a
              href={CONTACT_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-neon-cyan"
            >
              Get Directions
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                <path d="M5 11L11 5M11 5H6M11 5v5" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
