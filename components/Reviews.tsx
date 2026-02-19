"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";

const REVIEWS = [
  {
    name: "Олександр М.",
    text: "Найкращий барбершоп у Львові. Атмосфера неймовірна, стрижка бездоганна. Відчуваєш себе як у кіно.",
  },
  {
    name: "Тарас К.",
    text: "Мирослав -- справжній майстер. Фейд вийшов ідеальний. Вже записався на наступний раз.",
  },
  {
    name: "Роман Д.",
    text: "Комплекс стрижка + борода -- це інший рівень. Гарячий рушник, масаж, ідеальна борода. Варте кожної гривні.",
  },
  {
    name: "Іван П.",
    text: "Чиста атмосфера, крута музика, майстри своєї справи. Тут інша енергетика. Рекомендую всім.",
  },
  {
    name: "Максим С.",
    text: "Олег зрозумів що я хочу ще до того, як я пояснив. Ось це справжній професіоналізм. Обов'язково повернусь.",
  },
];

export default function Reviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="reviews" className="relative px-6 py-24 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="Відгуки"
          title="Що кажуть клієнти"
          description="Реальні слова від наших постійних клієнтів."
        />

        <div ref={ref} className="relative">
          {/* Horizontal scroll */}
          <div className="scrollbar-hide flex snap-x snap-mandatory gap-px overflow-x-auto bg-border/50 pb-4">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-[320px] flex-shrink-0 snap-start bg-card p-8 md:w-[380px]"
              >
                {/* Quote mark */}
                <span className="mb-4 block text-3xl font-light leading-none text-foreground/8">
                  {"\u201C"}
                </span>

                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {review.text}
                </p>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center border border-border bg-muted font-mono text-[10px] uppercase text-foreground/50">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                    {review.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
}
