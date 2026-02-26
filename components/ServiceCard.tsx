"use client";

import { cn } from "@/lib/utils";
import { BOOKING_URL } from "@/constants/routes";
import { useLocale } from "@/lib/locale-context";
import { useScrollSafeTap } from "@/hooks/use-scroll-safe-tap";

interface ServiceCardProps {
  name: string;
  price: string;
  index: number;
  inView: boolean;
}

export default function ServiceCard({ name, price, index, inView }: ServiceCardProps) {
  const { t } = useLocale();
  const { ref, tapHandlers } = useScrollSafeTap();
  const delayClass = index > 0 && index <= 10 ? `scroll-reveal-delay-${index}` : "";

  return (
    <div
      ref={ref}
      className={cn(
        "tron-edge group relative flex flex-col bg-card p-6 transition-all duration-500 hover:bg-muted select-none touch-manipulation scroll-reveal",
        inView && "in-view",
        delayClass
      )}
      {...tapHandlers}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow:
            "inset 0 0 20px hsl(var(--neon-red) / 0.05), 0 0 15px hsl(var(--neon-red) / 0.05)",
        }}
      />
      <div className="absolute left-0 top-0 h-4 w-4 border-l border-t border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/40 group-hover:h-5 group-hover:w-5" />
      <div className="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/40 group-hover:h-5 group-hover:w-5" />
      <h3 className="mb-3 font-body text-sm font-semibold uppercase tracking-wide text-foreground">
        {name}
      </h3>
      <div
        className="mb-3 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--neon-red) / 0.2), transparent)",
        }}
      />
      <span
        className="mb-5 font-display text-sm font-semibold tracking-wide text-neon-red/80"
        style={{ textShadow: "0 0 8px hsl(var(--neon-red) / 0.25)" }}
      >
        {price}
      </span>
      <div className="flex-1" />
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="neon-btn inline-flex w-full items-center justify-center px-4 py-2.5 font-body text-[10px] font-medium uppercase tracking-[0.2em] cursor-pointer select-none"
      >
        {t("pricing.book")}
      </a>
      <div
        className="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 group-hover:w-full"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--neon-red) / 0.5), transparent)",
          boxShadow: "0 0 8px hsl(var(--neon-red) / 0.2)",
        }}
      />
    </div>
  );
}
