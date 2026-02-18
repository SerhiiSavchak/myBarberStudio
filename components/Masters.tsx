"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";

const MASTERS = [
  {
    name: "Мирослав",
    title: "Експерт / Власник",
    description: "Засновник M&Y Barber Studio. Багаторічний досвід, авторський підхід до кожної стрижки. Спеціалізується на класичних та сучасних чоловічих стрижках.",
    image: "/masters/master-1.jpg",
  },
  {
    name: "Олег",
    title: "Експерт",
    description: "Майстер з бездоганним відчуттям стилю. Фейди, текстурні стрижки, креативні рішення. Кожна робота -- як витвір мистецтва.",
    image: "/masters/master-2.jpg",
  },
  {
    name: "Роман",
    title: "Експерт",
    description: "Спеціаліст з бороди та комплексного догляду. Точність ліній, увага до деталей та індивідуальний підхід до кожного клієнта.",
    image: "/masters/master-3.jpg",
  },
  {
    name: "Сергій",
    title: "Тату-майстер",
    description: "Авторські татуювання в різних стилях. Індивідуальні ескізи, консультація та професійний підхід. Кожна робота унікальна.",
    image: "/masters/master-1.jpg",
  },
];

export default function Masters() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="masters" className="relative px-6 py-24 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="Команда"
          title="Наші майстри"
          description="Експерти, які формують ваш стиль."
        />

        <div ref={ref} className="flex flex-col gap-px bg-border md:flex-row">
          {MASTERS.map((master, i) => {
            const isExpanded = expanded === i;

            return (
              <motion.div
                key={master.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => setExpanded(isExpanded ? null : i)}
                className="group relative cursor-pointer overflow-hidden bg-card transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] md:min-h-[500px]"
                style={{
                  flex: isExpanded ? 3 : 1,
                }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden md:absolute md:inset-0 md:h-auto">
                  <Image
                    src={master.image}
                    alt={`${master.name} -- ${master.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  {/* Cinematic gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent md:bg-gradient-to-t md:from-card md:via-card/40 md:to-card/10" />
                </div>

                {/* Content - always visible at bottom */}
                <div className="relative z-10 p-6 md:absolute md:inset-x-0 md:bottom-0 md:p-8">
                  {/* Industrial index */}
                  <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-xl font-bold uppercase tracking-wider text-foreground">
                    {master.name}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-neon-accent/70">
                    {master.title}
                  </p>

                  {/* Expanded description */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.p
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden text-sm leading-relaxed text-muted-foreground"
                      >
                        {master.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Subtle edge accent */}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-neon-accent/20 transition-all duration-700 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
