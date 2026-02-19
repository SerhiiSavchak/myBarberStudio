import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "neon-red": "hsl(var(--neon-red))",
        "neon-cyan": "hsl(var(--neon-cyan))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        border: "hsl(var(--border))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "reveal-left": {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0% 0 0)" },
        },
        "line-grow": {
          "0%": { scaleX: "0" },
          "100%": { scaleX: "1" },
        },
        "scanline": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "glitch": {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-3px, 2px)" },
          "40%": { transform: "translate(-3px, -2px)" },
          "60%": { transform: "translate(3px, 2px)" },
          "80%": { transform: "translate(3px, -2px)" },
        },
        "pulse-red": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.8" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "100%" },
          "100%": { strokeDashoffset: "0%" },
        },
        "flicker": {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": { opacity: "1" },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": { opacity: "0.4" },
        },
        "radar-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "radar-pulse": {
          "0%": { transform: "scale(0.3)", opacity: "0.8" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
        "signal-ping": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "75%, 100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "light-streak": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "50%": { opacity: "0.6" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        "marker-glow": {
          "0%, 100%": { boxShadow: "0 0 8px hsl(var(--neon-red) / 0.4), 0 0 20px hsl(var(--neon-red) / 0.2)" },
          "50%": { boxShadow: "0 0 16px hsl(var(--neon-red) / 0.8), 0 0 40px hsl(var(--neon-red) / 0.4), 0 0 60px hsl(var(--neon-red) / 0.2)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "reveal-left": "reveal-left 1s ease-out forwards",
        "line-grow": "line-grow 1.2s ease-out forwards",
        "scanline": "scanline 1.5s linear",
        "glitch": "glitch 0.3s ease-in-out",
        "pulse-red": "pulse-red 2s ease-in-out infinite",
        "flicker": "flicker 4s linear infinite",
        "radar-spin": "radar-spin 6s linear infinite",
        "radar-pulse": "radar-pulse 2s ease-out infinite",
        "signal-ping": "signal-ping 1.5s ease-out infinite",
        "light-streak": "light-streak 2s ease-in-out",
        "marker-glow": "marker-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
