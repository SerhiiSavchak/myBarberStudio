"use client";

import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import { useLocale } from "@/lib/locale-context";
import { BOOKING_URL } from "@/constants/routes";
import { useSectionInView } from "@/hooks/use-section-in-view";

export default function BookingFlow() {
  const { ref, inView } = useSectionInView();
  const { t } = useLocale();

  const STEPS = [
    { number: "01", title: t("booking.step1.title"), description: t("booking.step1.desc"), tag: "STEP.INIT" },
    { number: "02", title: t("booking.step2.title"), description: t("booking.step2.desc"), tag: "STEP.SELECT" },
    { number: "03", title: t("booking.step3.title"), description: t("booking.step3.desc"), tag: "STEP.CONFIRM" },
  ];

  return (
    <section className="relative px-6 py-24 md:py-32 lg:px-8">
      <div className="absolute top-0 left-0 right-0 glitch-divider" />
      <div className="mx-auto max-w-7xl pt-6">
        <SectionHeading
          tag={t("booking.tag")}
          title={t("booking.title")}
          description={t("booking.description")}
        />

        <div ref={ref} className="relative">
          <div
            className={cn(
              "absolute top-12 left-0 right-0 hidden h-px origin-left md:block scroll-reveal-scale-x",
              inView && "in-view"
            )}
            style={{
              background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.3), hsl(var(--neon-red) / 0.1), hsl(var(--neon-red) / 0.3))",
              boxShadow: "0 0 6px hsl(var(--neon-red) / 0.15)",
              transitionDelay: inView ? "0.3s" : "0s",
            }}
          />

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className={cn(
                  "relative scroll-reveal",
                  inView && "in-view"
                )}
                style={{ transitionDelay: inView ? `${0.2 + i * 0.2}s` : "0s" }}
              >
                <div
                  className={cn(
                    "absolute -top-1 left-0 hidden h-3 w-3 md:block scroll-reveal-scale",
                    inView && "in-view"
                  )}
                  style={{
                    background: "hsl(var(--neon-red) / 0.5)",
                    boxShadow: "0 0 10px hsl(var(--neon-red) / 0.4), 0 0 30px hsl(var(--neon-red) / 0.15)",
                    transitionDelay: inView ? `${0.5 + i * 0.2}s` : "0s",
                  }}
                />
                <span
                  className="mb-4 block font-display text-5xl font-bold text-neon-red/25 md:text-6xl"
                  style={{ textShadow: "0 0 40px hsl(var(--neon-red) / 0.2), 0 0 80px hsl(var(--neon-red) / 0.1)" }}
                >
                  {step.number}
                </span>
                <span className="mb-2 block font-mono text-[7px] uppercase tracking-[0.5em] text-neon-cyan/25">
                  {step.tag}
                </span>
                <h3 className="mb-3 font-body text-xl font-semibold uppercase tracking-wide text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div
            className={cn(
              "mt-16 scroll-reveal",
              inView && "in-view"
            )}
            style={{ transitionDelay: inView ? "0.9s" : "0s" }}
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="neon-btn neon-flicker inline-flex items-center gap-3 px-10 py-4 font-body text-[13px] font-medium uppercase tracking-[0.2em] cursor-pointer select-none"
            >
              {t("booking.cta")}
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5">
                <path d="M3 8h10m0 0l-3-3m3 3l-3 3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
