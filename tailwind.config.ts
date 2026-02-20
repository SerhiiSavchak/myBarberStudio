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
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      spacing: {
        "section-y": "var(--section-padding-y)",
        "section-y-md": "var(--section-padding-y-md)",
        "section-x": "var(--section-padding-x)",
        "section-x-lg": "var(--section-padding-x-lg)",
      },
      keyframes: {
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
        "marker-glow": {
          "0%, 100%": { boxShadow: "0 0 8px hsl(var(--neon-red) / 0.4), 0 0 20px hsl(var(--neon-red) / 0.2)" },
          "50%": { boxShadow: "0 0 16px hsl(var(--neon-red) / 0.8), 0 0 40px hsl(var(--neon-red) / 0.4), 0 0 60px hsl(var(--neon-red) / 0.2)" },
        },
      },
      animation: {
        "glitch": "glitch 0.3s ease-in-out",
        "pulse-red": "pulse-red 2s ease-in-out infinite",
        "radar-spin": "radar-spin 6s linear infinite",
        "radar-pulse": "radar-pulse 2s ease-out infinite",
        "signal-ping": "signal-ping 1.5s ease-out infinite",
        "marker-glow": "marker-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
