import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border/30 px-6 py-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="M&Y Barber Studio"
            width={24}
            height={24}
            className="h-6 w-6 object-contain opacity-50"
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/40">
            {"M&Y Barber Studio \u00A9"} {new Date().getFullYear()}
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/25">
          {"Львів / вул. Мирослава Скорика, 21"}
        </span>
      </div>
    </footer>
  );
}
