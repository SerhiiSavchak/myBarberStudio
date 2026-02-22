"use client";

import { motion } from "framer-motion";
import { BOOKING_URL } from "@/constants/routes";
import { useLocale } from "@/lib/locale-context";

interface ServiceCardProps {
  name: string;
  price: string;
  index: number;
  inView: boolean;
}

export default function ServiceCard({ name, price, index, inView }: ServiceCardProps) {
  const { t } = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="tron-edge group relative flex flex-col bg-card p-6 transition-all duration-500 hover:bg-muted select-none"
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow:
            "inset 0 0 20px hsl(var(--neon-red) / 0.05), 0 0 15px hsl(var(--neon-red) / 0.05)",
        }}
      />

      {/* Corner brackets on hover */}
      <div className="absolute left-0 top-0 h-4 w-4 border-l border-t border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/40 group-hover:h-5 group-hover:w-5" />
      <div className="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/40 group-hover:h-5 group-hover:w-5" />

      {/* Service name */}
      <h3 className="mb-3 font-body text-sm font-semibold uppercase tracking-wide text-foreground">
        {name}
      </h3>

      {/* Divider */}
      <div
        className="mb-3 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--neon-red) / 0.2), transparent)",
        }}
      />

      {/* Price */}
      <span
        className="mb-5 font-display text-sm font-semibold tracking-wide text-neon-red/80"
        style={{ textShadow: "0 0 8px hsl(var(--neon-red) / 0.25)" }}
      >
        {price}
      </span>

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTA */}
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="neon-btn inline-flex w-full items-center justify-center px-4 py-2.5 font-body text-[10px] font-medium uppercase tracking-[0.2em] cursor-pointer select-none"
      >
        {t("pricing.book")}
      </a>

      {/* Bottom neon edge */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 group-hover:w-full"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--neon-red) / 0.5), transparent)",
          boxShadow: "0 0 8px hsl(var(--neon-red) / 0.2)",
        }}
      />
    </motion.div>
  );
}
