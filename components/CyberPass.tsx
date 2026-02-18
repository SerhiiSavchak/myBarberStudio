"use client";

import { useState, useCallback, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";

const STYLE_TAGS = ["Street", "Neo", "Classic"] as const;
type StyleTag = (typeof STYLE_TAGS)[number];

const STYLE_COLORS: Record<StyleTag, string> = {
  Street: "neon-cyan",
  Neo: "neon-violet",
  Classic: "foreground",
};

function generateId(): string {
  return `MBS-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString(36).toUpperCase().slice(-4)}`;
}

export default function CyberPass() {
  const [name, setName] = useState("");
  const [style, setStyle] = useState<StyleTag>("Street");
  const [generated, setGenerated] = useState(false);
  const [building, setBuilding] = useState(false);
  const [passId, setPassId] = useState("");
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  const handleGenerate = useCallback(() => {
    if (!name.trim()) return;
    setBuilding(true);
    setGenerated(false);
    setPassId(generateId());

    setTimeout(() => {
      setBuilding(false);
      setGenerated(true);
    }, 1800);
  }, [name]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(passId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [passId]);

  return (
    <section className="relative px-6 py-24 md:py-32">
      <div ref={sectionRef} className="mx-auto max-w-4xl">
        <SectionHeading
          tag="Loyalty"
          title="CyberPass ID"
          description="Generate your unique digital identity card."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-lg"
        >
          {/* Input Form */}
          <div className="mb-8 flex flex-col gap-4">
            <div>
              <label
                htmlFor="cyberpass-name"
                className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground"
              >
                Your Name
              </label>
              <input
                id="cyberpass-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your callsign..."
                className="w-full rounded-sm border border-border bg-muted px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-neon-violet/60 focus:outline-none focus:ring-1 focus:ring-neon-violet/30 transition-all"
              />
            </div>

            <div>
              <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Style Tag
              </span>
              <div className="flex gap-3">
                {STYLE_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setStyle(tag)}
                    className={`flex-1 rounded-sm border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
                      style === tag
                        ? "border-neon-violet/60 bg-neon-violet/15 text-neon-violet"
                        : "border-border bg-muted text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!name.trim() || building}
              className="mt-2 w-full rounded-sm border border-neon-cyan/50 bg-neon-cyan/10 px-6 py-3 font-mono text-sm uppercase tracking-widest text-neon-cyan transition-all duration-300 hover:bg-neon-cyan/20 hover:shadow-[0_0_20px_hsl(var(--neon-cyan)/0.2)] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {building ? "Constructing..." : "Generate Pass"}
            </button>
          </div>

          {/* Pass Card */}
          <AnimatePresence mode="wait">
            {building && (
              <motion.div
                key="building"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="neon-border relative flex h-56 items-center justify-center overflow-hidden rounded bg-card"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-neon-violet/30 border-t-neon-violet" />
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Building CyberPass...
                  </span>
                </div>
                {/* Animated frame construction lines */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute left-4 right-4 top-4 h-px origin-left bg-neon-violet/30"
                />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                  className="absolute bottom-4 left-4 right-4 h-px origin-right bg-neon-violet/30"
                />
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
                  className="absolute bottom-4 left-4 top-4 w-px origin-top bg-neon-cyan/30"
                />
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.9 }}
                  className="absolute bottom-4 right-4 top-4 w-px origin-bottom bg-neon-cyan/30"
                />
              </motion.div>
            )}

            {generated && !building && (
              <motion.div
                key="pass"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="neon-border relative overflow-hidden rounded bg-card p-6"
              >
                {/* Scanline effect */}
                <div className="pointer-events-none absolute inset-0 opacity-30">
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(var(--neon-cyan) / 0.03) 3px, hsl(var(--neon-cyan) / 0.03) 4px)",
                    }}
                  />
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      MyBarberStudio // CyberPass
                    </span>
                    <span
                      className={`rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${
                        style === "Street"
                          ? "border-neon-cyan/30 text-neon-cyan"
                          : style === "Neo"
                          ? "border-neon-violet/30 text-neon-violet"
                          : "border-border text-foreground"
                      }`}
                    >
                      {style}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="mb-1 text-2xl font-bold uppercase tracking-wider text-foreground">
                    {name}
                  </h3>

                  {/* ID */}
                  <p className="mb-4 font-mono text-xs text-muted-foreground">
                    ID: {passId}
                  </p>

                  {/* Bottom */}
                  <div className="flex items-end justify-between">
                    {/* Fake QR */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-border bg-muted p-1">
                      <div className="grid h-full w-full grid-cols-5 grid-rows-5 gap-px">
                        {Array.from({ length: 25 }).map((_, idx) => (
                          <div
                            key={idx}
                            className={`rounded-[1px] ${
                              Math.random() > 0.4
                                ? `bg-${STYLE_COLORS[style]}/70`
                                : "bg-transparent"
                            }`}
                            style={{
                              backgroundColor:
                                Math.random() > 0.4
                                  ? style === "Street"
                                    ? "hsl(var(--neon-cyan) / 0.7)"
                                    : style === "Neo"
                                    ? "hsl(var(--neon-violet) / 0.7)"
                                    : "hsl(var(--foreground) / 0.5)"
                                  : "transparent",
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleCopy}
                      className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {copied ? "Copied!" : "Copy ID"}
                    </button>
                  </div>
                </div>

                {/* Corner decorations */}
                <div className="absolute left-0 top-0 h-4 w-4 border-l border-t border-neon-cyan/30" />
                <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-neon-violet/30" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
