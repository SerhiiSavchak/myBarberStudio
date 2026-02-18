"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="about" className="relative px-6 py-24 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="Про нас"
          title="M&Y Barber Studio"
          description="Місце, де стиль народжується."
        />

        <div ref={ref} className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <Image
              src="/gallery/gallery-4.jpg"
              alt="Інтер'єр M&Y Barber Studio"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />

            {/* Industrial corner marks */}
            <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-foreground/15" />
            <div className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-foreground/15" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <p className="text-base leading-relaxed text-muted-foreground">
              M&Y Barber Studio -- це більше, ніж барбершоп. Це простір, де зустрічаються
              майстерність, стиль та атмосфера. Кожен візит -- це індивідуальний підхід,
              преміум інструменти та увага до кожної деталі.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Ми працюємо у Львові та створюємо стрижки, які підкреслюють характер.
              Наша команда -- це експерти з багаторічним досвідом, які постійно вдосконалюють
              свою майстерність.
            </p>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-6">
              {[
                { value: "5+", label: "років досвіду" },
                { value: "4", label: "експерти" },
                { value: "1000+", label: "задоволених клієнтів" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                >
                  <span className="block text-2xl font-bold text-foreground md:text-3xl">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
