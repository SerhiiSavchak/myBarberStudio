export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          MyBarber<span className="text-neon-violet">Studio</span> &copy;{" "}
          {new Date().getFullYear()}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          Lviv, Ukraine
        </span>
      </div>
    </footer>
  );
}
