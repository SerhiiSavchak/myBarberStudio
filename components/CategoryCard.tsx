"use client";

import { motion } from "framer-motion";
import { useScrollSafeTap } from "@/hooks/use-scroll-safe-tap";

interface CategoryCardProps {
  name: string;
  description: string;
  id: string;
  index: number;
  inView: boolean;
  onClick: () => void;
}

export default function CategoryCard({
  name,
  description,
  id,
  index,
  inView,
  onClick,
}: CategoryCardProps) {
  const { ref, tapHandlers } = useScrollSafeTap();

  return (
    <motion.button
      ref={ref}
      type="button"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      className="tron-edge holo-shimmer group relative w-full bg-card p-8 text-left transition-all duration-500 hover:bg-muted cursor-pointer select-none touch-manipulation"
      {...tapHandlers}
    >
      {/* Red edge glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow:
            "inset 0 0 20px hsl(var(--neon-red) / 0.05), 0 0 15px hsl(var(--neon-red) / 0.05)",
        }}
      />

      {/* Top micro labels */}
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono text-[7px] uppercase tracking-[0.4em] text-neon-red/30">
          SERVICE PROTOCOL
        </span>
        <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-muted-foreground/30">
          {id}
        </span>
      </div>

      {/* Corner brackets on hover */}
      <div className="absolute left-0 top-0 h-5 w-5 border-l border-t border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/40 group-hover:h-6 group-hover:w-6" />
      <div className="absolute right-0 top-0 h-5 w-5 border-r border-t border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/40 group-hover:h-6 group-hover:w-6" />
      <div className="absolute bottom-0 left-0 h-5 w-5 border-l border-b border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/40 group-hover:h-6 group-hover:w-6" />
      <div className="absolute right-0 bottom-0 h-5 w-5 border-r border-b border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/40 group-hover:h-6 group-hover:w-6" />

      <h3 className="mb-2 text-lg font-semibold uppercase tracking-wide text-foreground">
        {name}
      </h3>

      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {/* Hint: click to view prices */}
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon-red/50"
          style={{ textShadow: "0 0 8px hsl(var(--neon-red) / 0.2)" }}
        >
          →
        </span>
      </div>

      {/* Bottom neon line */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 group-hover:w-full"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--neon-red) / 0.5), transparent)",
          boxShadow: "0 0 8px hsl(var(--neon-red) / 0.2)",
        }}
      />
    </motion.button>
  );
}
