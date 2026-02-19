"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SectionHeading from "./SectionHeading";

export default function About() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={sectionRef} id="about" className="relative px-6 py-24 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag="Про нас"
          title="M&Y Barber Studio"
          description="Місце, де стиль народжується."
        />

        <div ref={ref} className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Image with parallax */}
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={inView ? { opacity: 1, clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <motion.div className="absolute inset-0" style={{ y: imageY }}>
              <Image
                src="/gallery/gallery-4.jpg"
                alt="Інтер'єр M&Y Barber Studio"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover scale-110"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />

            {/* Corner marks */}
            <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-foreground/10" />
            <div className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-foreground/10" />

            {/* Industrial label */}
            <span className="absolute bottom-6 left-6 font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/30">
              Interior / Lviv
            </span>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <p className="text-base leading-relaxed text-muted-foreground">
              {"M&Y Barber Studio -- це більше, ніж барбершоп. Це простір, де зустрічаються майстерність, стиль та атмосфера. Кожен візит -- це індивідуальний підхід, преміум інструменти та увага до кожної деталі."}
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              Ми працюємо у Львові та створюємо стрижки, які підкреслюють характер. Наша команда -- це експерти з багаторічним досвідом, які постійно вдосконалюють свою майстерність.
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
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
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

            {/* Subtle magenta accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-2 h-px w-32 origin-left bg-neon-magenta/20"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
