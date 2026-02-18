"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";

const STEPS = [
  {
    number: "01",
    title: "Обери послугу",
    description: "Стрижка, борода, комплекс або догляд -- обирай те, що потрібно саме тобі.",
  },
  {
    number: "02",
    title: "Обери майстра",
    description: "Кожен наш барбер -- експерт. Обирай за стилем або за рекомендаціями.",
  },
  {
    number: "03",
    title: "Запишись онлайн",
    description: "Зручний онлайн-запис на сайті. Обирай дату, час та підтверджуй.",
  },
];

const BOOKING_URL = "https://mybarber.com.ua/";

export default function BookingFlow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative px-6 py-24 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="Запис"
          title="Як проходить запис"
          description="Три простих кроки до ідеальної стрижки."
        />

        <div ref={ref} className="relative">
          {/* Steps */}
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="relative"
              >
                {/* Step number */}
                <span className="mb-4 block text-5xl font-bold text-foreground/[0.06] md:text-6xl">
                  {step.number}
                </span>

                <h3 className="mb-3 text-xl font-semibold uppercase tracking-wide text-foreground">
                  {step.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>

                {/* Connecting line (between steps, desktop only) */}
                {i < STEPS.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                    className="absolute right-0 top-8 hidden h-px w-8 origin-left -translate-x-4 bg-neon-accent/20 md:block lg:w-16"
                    style={{ right: "-1rem" }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-foreground/20 bg-foreground/5 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-all duration-400 hover:bg-foreground/10 hover:border-foreground/40"
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
