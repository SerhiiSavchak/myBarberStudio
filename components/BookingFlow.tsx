"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";

const STEPS = [
  {
    number: "01",
    title: "Обери послугу",
    description: "Стрижка, борода, комплекс або догляд -- обирай те, що потрібно саме тобі.",
    tag: "STEP.INIT",
  },
  {
    number: "02",
    title: "Обери майстра",
    description: "Кожен наш барбер -- експерт. Обирай за стилем або за рекомендаціями.",
    tag: "STEP.SELECT",
  },
  {
    number: "03",
    title: "Запишись онлайн",
    description: "Зручний онлайн-запис на сайті. Обирай дату, час та підтверджуй.",
    tag: "STEP.CONFIRM",
  },
];

const BOOKING_URL = "https://mybarber.com.ua/";

export default function BookingFlow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative px-6 py-24 md:py-32 lg:px-8">
      {/* Glitch divider */}
      <div className="absolute top-0 left-0 right-0 glitch-divider" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="Запис"
          title="Як проходить запис"
          description="Три простих кроки до ідеальної стрижки."
        />

        <div ref={ref} className="relative">
          {/* Connecting TRON line (desktop) */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute top-12 left-0 right-0 hidden h-px origin-left md:block"
            style={{
              background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.3), hsl(var(--neon-red) / 0.1), hsl(var(--neon-red) / 0.3))",
              boxShadow: "0 0 6px hsl(var(--neon-red) / 0.15)",
            }}
          />

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.2 }}
                className="relative"
              >
                {/* Neon red dot on the line */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.2 }}
                  className="absolute -top-1 left-0 hidden h-3 w-3 md:block"
                  style={{
                    background: "hsl(var(--neon-red) / 0.5)",
                    boxShadow: "0 0 10px hsl(var(--neon-red) / 0.4), 0 0 30px hsl(var(--neon-red) / 0.15)",
                  }}
                />

                {/* Step number - large ghost */}
                <span
                  className="mb-4 block text-5xl font-bold text-neon-red/[0.06] md:text-6xl"
                  style={{ textShadow: "0 0 30px hsl(var(--neon-red) / 0.05)" }}
                >
                  {step.number}
                </span>

                {/* Micro tag */}
                <span className="mb-2 block font-mono text-[7px] uppercase tracking-[0.5em] text-neon-cyan/25">
                  {step.tag}
                </span>

                <h3 className="mb-3 text-xl font-semibold uppercase tracking-wide text-foreground">
                  {step.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-16"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-btn neon-flicker inline-flex items-center gap-3 px-10 py-4 font-mono text-[11px] uppercase tracking-[0.25em]"
            >
              Записатись онлайн
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                <path d="M3 8h10m0 0l-3-3m3 3l-3 3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
