"use client";

export default function Footer() {
  return (
    <footer className="relative border-t border-neon-red/10 px-6 py-8 lg:px-8">
      {/* Top TRON edge line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--neon-red) / 0.2), transparent)",
          boxShadow: "0 0 8px hsl(var(--neon-red) / 0.1)",
        }}
      />

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-3">
          {/* Triangle mark */}
          <svg viewBox="0 0 24 24" className="h-5 w-5 opacity-30" aria-hidden="true">
            <path
              d="M12 2L22 20H2Z"
              fill="none"
              stroke="hsl(var(--neon-red))"
              strokeWidth="1"
            />
          </svg>
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground/30">
            {"M&Y Barber Studio \u00A9"} {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-[7px] uppercase tracking-[0.5em] text-neon-red/15">
            LVIV // DISTRICT 07
          </span>
          <span className="h-1 w-1 bg-neon-red/20" />
          <span className="font-mono text-[7px] uppercase tracking-[0.4em] text-muted-foreground/20">
            вул. Мирослава Скорика, 21
          </span>
        </div>
      </div>
    </footer>
  );
}
