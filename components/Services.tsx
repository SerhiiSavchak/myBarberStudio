"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";

const SERVICES = [
  {
    name: "Haircut",
    price: "500 UAH",
    description: "Precision cut tailored to your style with premium tools.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M6.5 6.5l11 11M6.5 6.5a2 2 0 10-2.83-2.83 2 2 0 002.83 2.83zM17.5 17.5a2 2 0 102.83 2.83 2 2 0 00-2.83-2.83zM12 12L6.5 17.5M6.5 17.5a2 2 0 10-2.83 2.83 2 2 0 002.83-2.83z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Beard Trim",
    price: "350 UAH",
    description: "Shape and sculpt your beard to cyberpunk perfection.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M12 2v6m0 0L9 11m3-3l3 3M4 14c0 4.418 3.582 8 8 8s8-3.582 8-8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Hair + Beard",
    price: "750 UAH",
    description: "The full package. Haircut and beard styling combined.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M9.5 2a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM14.5 2a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM12 9v6m-4 2h8M8 17v5m8-5v5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Royal Treatment",
    price: "1200 UAH",
    description: "Premium experience with hot towel, face massage, and styling.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M12 2l2.09 6.26L20.18 9l-5.09 3.74L17.18 19 12 15.27 6.82 19l2.09-6.26L3.82 9l6.09-.74L12 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="services" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tag="Services"
          title="What We Offer"
          description="Every cut is a craft. Every visit is an experience."
        />

        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded border border-border bg-card p-6 transition-all duration-300 hover:border-neon-violet/40 hover:shadow-[0_0_20px_hsl(var(--neon-violet)/0.1)]"
            >
              {/* Light sweep on hover */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-neon-violet/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {/* Corner accent */}
              <div className="absolute right-0 top-0 h-8 w-8 border-r border-t border-neon-violet/0 transition-all duration-300 group-hover:border-neon-violet/30" />

              <div className="relative z-10">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-muted text-neon-cyan transition-all duration-300 group-hover:border-neon-cyan/40 group-hover:shadow-[0_0_10px_hsl(var(--neon-cyan)/0.2)]">
                  {service.icon}
                </div>
                <h3 className="mb-1 text-lg font-bold uppercase tracking-wide text-foreground">
                  {service.name}
                </h3>
                <p className="mb-3 font-mono text-xs text-muted-foreground">
                  {service.description}
                </p>
                <span className="font-mono text-sm font-semibold text-neon-violet">
                  {service.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
