import type { Metadata, Viewport } from "next";
import { Orbitron, Rajdhani, Share_Tech_Mono, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteLoader from "@/components/SiteLoader";
import { LocaleProvider } from "@/lib/locale-context";
import { ThemeProvider } from "@/lib/theme-context";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

/* Fallback для кириллицы — Orbitron, Rajdhani, Share Tech Mono её не поддерживают */
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cyrillic",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-mono-cyrillic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "M&Y Barber Studio | Барбершоп у Львові",
  description:
    "Преміум барбершоп у Львові. Чоловічі стрижки, бороди, догляд за обличчям. Запишись онлайн.",
  keywords: ["барбершоп", "Львів", "стрижка", "борода", "barber", "MyBarber"],
  openGraph: {
    title: "M&Y Barber Studio | Барбершоп у Львові",
    description: "Преміум барбершоп у Львові. Стиль народжується тут.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`dark ${orbitron.variable} ${rajdhani.variable} ${shareTechMono.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <ThemeProvider>
          <LocaleProvider>
            <SiteLoader />
            {children}
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
