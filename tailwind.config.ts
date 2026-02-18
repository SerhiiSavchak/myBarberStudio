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
        "neon-violet": "hsl(var(--neon-violet))",
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
        "neon-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "glow-breathe": {
          "0%, 100%": { filter: "brightness(1) blur(0px)" },
          "50%": { filter: "brightness(1.3) blur(1px)" },
        },
        "border-sweep": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "200% 0%" },
        },
        "glitch-1": {
          "0%, 100%": { clipPath: "inset(0 0 0 0)", transform: "translate(0)" },
          "20%": { clipPath: "inset(20% 0 60% 0)", transform: "translate(-3px, 2px)" },
          "40%": { clipPath: "inset(40% 0 40% 0)", transform: "translate(3px, -1px)" },
          "60%": { clipPath: "inset(60% 0 10% 0)", transform: "translate(-2px, 1px)" },
          "80%": { clipPath: "inset(10% 0 70% 0)", transform: "translate(2px, -2px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "light-sweep": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "neon-pulse": "neon-pulse 3s ease-in-out infinite",
        "scan-line": "scan-line 8s linear infinite",
        "glow-breathe": "glow-breathe 4s ease-in-out infinite",
        "border-sweep": "border-sweep 3s linear infinite",
        "glitch-1": "glitch-1 0.3s ease-in-out",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "light-sweep": "light-sweep 2s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
