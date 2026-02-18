"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";

const SERVICES = [
  {
    name: "Чоловічі стрижки",
    price: "від 500 грн",
    description: "Класичні та сучасні стрижки з урахуванням структури волосся та форми обличчя.",
  },
  {
    name: "Бороди",
    price: "від 350 грн",
    description: "Моделювання, корекція та догляд за бородою. Гарячий рушник включено.",
  },
  {
    name: "Стрижка + борода",
    price: "від 750 грн",
    description: "Повний комплекс: стрижка та оформлення бороди в одному сеансі.",
  },
  {
    name: "Догляд за обличчям",
    price: "від 400 грн",
    description: "Чистка, зволоження, масаж обличчя. Преміум косметика та релакс.",
  },
  {
    name: "Татуювання",
    price: "за домовленістю",
    description: "Авторські тату від майстра Сергія. Індивідуальний ескіз та консультація.",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="services" className="relative px-6 py-24 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="Послуги"
          title="Що ми пропонуємо"
          description="Кожна послуга -- це індивідуальний підхід, преміум інструменти та увага до деталей."
        />

        <div ref={ref} className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative bg-card p-8 transition-colors duration-500 hover:bg-muted"
            >
              {/* Index number */}
              <span className="mb-4 block font-mono text-[10px] text-muted-foreground/40">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="mb-2 text-lg font-semibold uppercase tracking-wide text-foreground">
                {service.name}
              </h3>

              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <span className="font-mono text-xs uppercase tracking-wider text-neon-accent/80">
                {service.price}
              </span>

              {/* Subtle accent line on hover */}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-neon-accent/30 transition-all duration-700 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
