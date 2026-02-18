"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";

const MASTERS = [
  {
    name: "Viktor Shevchenko",
    title: "Lead Barber",
    specialty: "Fades & Precision Cuts",
    image: "/masters/master-1.jpg",
  },
  {
    name: "Andrii Koval",
    title: "Senior Stylist",
    specialty: "Creative & Textured Styles",
    image: "/masters/master-2.jpg",
  },
  {
    name: "Dmytro Bondar",
    title: "Beard Specialist",
    specialty: "Sculpting & Hot Towel Rituals",
    image: "/masters/master-3.jpg",
  },
];

export default function Masters() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="masters" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tag="Team"
          title="Our Masters"
          description="Skilled craftsmen who shape your identity."
        />

        <div ref={ref} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {MASTERS.map((master, i) => (
            <motion.div
              key={master.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded border border-border bg-card"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={master.image}
                  alt={`${master.name} - ${master.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                {/* Hover overlay accent */}
                <div className="absolute inset-0 bg-neon-violet/0 transition-colors duration-500 group-hover:bg-neon-violet/5" />
              </div>

              {/* Info */}
              <div className="relative p-5">
                <h3 className="text-lg font-bold uppercase tracking-wider text-foreground">
                  {master.name}
                </h3>
                <p className="font-mono text-xs uppercase tracking-widest text-neon-violet">
                  {master.title}
                </p>
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  {master.specialty}
                </p>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-neon-cyan/0 transition-all duration-300 group-hover:border-neon-cyan/30" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
