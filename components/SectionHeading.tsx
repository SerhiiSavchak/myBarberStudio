"use client";

import { motion, useInView } from "framer-motion";
import { useSectionInView } from "@/hooks/use-section-in-view";

interface SectionHeadingProps {
  tag: string;
  title: string;
  description?: string;
  id?: string;
}

export default function SectionHeading({ tag, title, description, id }: SectionHeadingProps) {
  const { ref, inView } = useSectionInView();

  return (
    <div ref={ref} id={id} className="mb-16 flex flex-col items-start">
      {/* Cyberpunk tag line */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-4 flex items-center gap-3"
      >
        <motion.span
          className="block h-px w-10 bg-neon-red/60"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            originX: 0,
            boxShadow: "0 0 6px hsl(var(--neon-red) / 0.3)",
          }}
        />
        <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-neon-red/60">
          {tag}
        </span>
        <motion.span
          className="h-1 w-1 bg-neon-red/40"
          animate={inView ? { opacity: [0.3, 1, 0.3] } : { opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Title — clamp, balance, glitch effect */}
      <div className="relative overflow-visible">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[1.2] tracking-[0.03em] text-foreground"
          style={{ textWrap: "balance" }}
        >
          <span className="glitch-heading" data-text={title}>
            {title}
          </span>
        </motion.h2>
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-neon-red/30"
          initial={{ top: 0, opacity: 0 }}
          animate={inView ? { top: "100%", opacity: [0, 1, 0] } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ boxShadow: "0 0 10px hsl(var(--neon-red) / 0.3)" }}
        />
      </div>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 max-w-lg font-body text-[clamp(0.9375rem,1.5vw,1rem)] leading-[1.65] text-muted-foreground"
        >
          {description}
        </motion.p>
      )}

      {/* TRON-style edge line divider — increased gap from heading */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-10 h-px w-full max-w-xs origin-left"
        style={{
          background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.4), transparent)",
          boxShadow: "0 0 8px hsl(var(--neon-red) / 0.15)",
        }}
      />
    </div>
  );
}
