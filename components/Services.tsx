"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";

const SERVICES = [
  {
    name: "Чоловічі стрижки",
    price: "від 500 грн",
    description: "Класичні та сучасні стрижки з урахуванням структури волосся та форми обличчя.",
    id: "SVC-001",
    est: "45 хв",
  },
  {
    name: "Бороди",
    price: "від 350 грн",
    description: "Моделювання, корекція та догляд за бородою. Гарячий рушник включено.",
    id: "SVC-002",
    est: "30 хв",
  },
  {
    name: "Стрижка + борода",
    price: "від 750 грн",
    description: "Повний комплекс: стрижка та оформлення бороди в одному сеансі.",
    id: "SVC-003",
    est: "75 хв",
  },
  {
    name: "Догляд за обличчям",
    price: "від 400 грн",
    description: "Чистка, зволоження, масаж обличчя. Преміум косметика та релакс.",
    id: "SVC-004",
    est: "40 хв",
  },
  {
    name: "Татуювання",
    price: "за домовленістю",
    description: "Авторські тату від майстра Сергія. Індивідуальний ескіз та консультація.",
    id: "SVC-005",
    est: "120+ хв",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="services" className="relative px-6 py-24 md:py-32 lg:px-8">
      {/* Glitch divider */}
      <div className="absolute top-0 left-0 right-0 glitch-divider" />

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="Послуги"
          title="Що ми пропонуємо"
          description="Кожна послуга -- це індивідуальний підхід, преміум інструменти та увага до деталей."
        />

        <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="tron-edge holo-shimmer group relative bg-card p-8 transition-all duration-500 hover:bg-muted"
            >
              {/* Red edge glow on hover */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                style={{ boxShadow: "inset 0 0 20px hsl(var(--neon-red) / 0.05), 0 0 15px hsl(var(--neon-red) / 0.05)" }}
              />

              {/* Top micro labels */}
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-[7px] uppercase tracking-[0.4em] text-neon-red/30">
                  SERVICE PROTOCOL
                </span>
                <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-muted-foreground/30">
                  {service.id}
                </span>
              </div>

              {/* Corner bracket animations */}
              <div className="absolute left-0 top-0 h-5 w-5 border-l border-t border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/40 group-hover:h-6 group-hover:w-6" />
              <div className="absolute right-0 top-0 h-5 w-5 border-r border-t border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/40 group-hover:h-6 group-hover:w-6" />
              <div className="absolute bottom-0 left-0 h-5 w-5 border-l border-b border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/40 group-hover:h-6 group-hover:w-6" />
              <div className="absolute right-0 bottom-0 h-5 w-5 border-r border-b border-neon-red/0 transition-all duration-500 group-hover:border-neon-red/40 group-hover:h-6 group-hover:w-6" />

              <h3 className="mb-2 text-lg font-semibold uppercase tracking-wide text-foreground">
                {service.name}
              </h3>

              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              {/* Bottom: price + est time */}
              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-xs uppercase tracking-wider text-neon-red/70"
                  style={{ textShadow: "0 0 8px hsl(var(--neon-red) / 0.3)" }}
                >
                  {service.price}
                </span>
                <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-neon-cyan/30">
                  EST. {service.est}
                </span>
              </div>

              {/* Bottom neon line */}
              <div
                className="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 group-hover:w-full"
                style={{
                  background: "linear-gradient(90deg, hsl(var(--neon-red) / 0.5), transparent)",
                  boxShadow: "0 0 8px hsl(var(--neon-red) / 0.2)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
