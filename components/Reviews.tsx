"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";

const REVIEWS = [
  {
    name: "Олександр М.",
    text: "Найкращий барбершоп у Львові. Атмосфера неймовірна, стрижка бездоганна. Відчуваєш себе як у кіно.",
    rating: 5,
  },
  {
    name: "Тарас К.",
    text: "Мирослав -- справжній майстер. Фейд вийшов ідеальний. Вже записався на наступний раз.",
    rating: 5,
  },
  {
    name: "Роман Д.",
    text: "Комплекс стрижка + борода -- це інший рівень. Гарячий рушник, масаж, ідеальна борода. Варте кожної гривні.",
    rating: 5,
  },
  {
    name: "Іван П.",
    text: "Чиста атмосфера, крута музика, майстри своєї справи. Тут інша енергетика. Рекомендую всім.",
    rating: 5,
  },
  {
    name: "Максим С.",
    text: "Олег зрозумів що я хочу ще до того, як я пояснив. Ось це справжній професіоналізм. Обов'язково повернусь.",
    rating: 5,
  },
];

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="reviews" className="relative px-6 py-24 md:py-32 lg:px-8">
      <div className="absolute top-0 left-0 right-0 glitch-divider" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="Відгуки"
          title="Що кажуть клієнти"
          description="Реальні слова від наших постійних клієнтів."
        />

        <div ref={ref} className="relative">
          {/* Horizontal scroll */}
          <div className="scrollbar-hide flex snap-x snap-mandatory gap-1 overflow-x-auto pb-4">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="tron-edge holo-shimmer group w-[320px] flex-shrink-0 snap-start bg-card p-8 md:w-[380px]"
              >
                {/* Quote - neon red */}
                <span
                  className="mb-4 block text-4xl font-light leading-none text-neon-red/15"
                  style={{ textShadow: "0 0 15px hsl(var(--neon-red) / 0.1)" }}
                >
                  {"\u201C"}
                </span>

                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {review.text}
                </p>

                <div className="flex items-center gap-3">
                  {/* Avatar with neon border */}
                  <div
                    className="flex h-9 w-9 items-center justify-center border border-neon-red/20 bg-muted font-mono text-[10px] uppercase text-neon-red/50"
                    style={{ boxShadow: "0 0 6px hsl(var(--neon-red) / 0.1)" }}
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">
                      {review.name}
                    </span>
                    {/* Star dots */}
                    <div className="mt-1 flex gap-1">
                      {Array.from({ length: review.rating }).map((_, s) => (
                        <span
                          key={s}
                          className="h-1 w-1 bg-neon-red/40"
                          style={{ boxShadow: "0 0 3px hsl(var(--neon-red) / 0.3)" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fade edge */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
}
