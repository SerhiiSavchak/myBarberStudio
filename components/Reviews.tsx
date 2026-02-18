"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";

const REVIEWS = [
  {
    name: "Oleksandr M.",
    text: "Best barbershop in Lviv. The atmosphere is insane and the cut was clean. Felt like stepping into a movie.",
    rating: 5,
  },
  {
    name: "Taras K.",
    text: "Viktor is a real master. My fade was sharper than ever. Already booked the next one.",
    rating: 5,
  },
  {
    name: "Roman D.",
    text: "The Royal Treatment is next level. Hot towel, face massage, perfect beard. Worth every hryvnia.",
    rating: 5,
  },
  {
    name: "Ivan P.",
    text: "Clean vibes, great music, skilled barbers. This place has a different energy. Highly recommended.",
    rating: 5,
  },
  {
    name: "Maksym S.",
    text: "Andrii understood exactly what I wanted without me saying much. That's real skill. Will be back.",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 16 16"
          fill="hsl(var(--neon-violet))"
          className="h-3.5 w-3.5"
        >
          <path d="M8 1l2.09 4.26L15 6.27l-3.5 3.41.83 4.82L8 12.27l-4.33 2.23.83-4.82L1 6.27l4.91-.71L8 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="reviews" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tag="Feedback"
          title="What They Say"
          description="Real words from our clients."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Horizontal scroll container */}
          <div className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-80 flex-shrink-0 snap-start rounded border border-border bg-card p-6"
              >
                <Stars count={review.rating} />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted font-mono text-xs text-neon-cyan">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-mono text-xs uppercase tracking-widest text-foreground">
                    {review.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
