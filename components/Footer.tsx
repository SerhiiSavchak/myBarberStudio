export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
          M&Y Barber Studio &copy; {new Date().getFullYear()}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/30">
          Львів / вул. Мирослава Скорика, 21
        </span>
      </div>
    </footer>
  );
}
