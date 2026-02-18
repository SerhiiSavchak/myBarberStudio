"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionHeadingProps {
  tag: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ tag, title, description }: SectionHeadingProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mb-16 flex flex-col items-start">
      {/* Industrial tag */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-4 flex items-center gap-3"
      >
        <span className="block h-px w-8 bg-neon-accent/50" />
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          {tag}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-balance text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground"
        >
          {description}
        </motion.p>
      )}

      {/* Divider line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-6 h-px w-full max-w-xs origin-left bg-border"
      />
    </div>
  );
}
