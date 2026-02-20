import type { Metadata, Viewport } from "next";
import { Exo_2, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteLoader from "@/components/SiteLoader";
import { SITE_URL } from "@/constants/routes";
import { LocaleProvider } from "@/lib/locale-context";
import { ThemeProvider } from "@/lib/theme-context";

/* Display: геометрический, futuristic, tech, кириллица */
const exo2 = Exo_2({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

/* Body: максимально читаемый, современный UI, кириллица */
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

/* Mono: промышленные метки, labels, кириллица */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "M&Y Barber Studio | Барбершоп у Львові",
    template: "%s | M&Y Barber Studio",
  },
  description:
    "Преміум барбершоп у Львові. Чоловічі стрижки, бороди, догляд за обличчям. Запишись онлайн. вул. Мирослава Скорика, 21.",
  keywords: ["барбершоп", "Львів", "стрижка", "борода", "barber", "MyBarber", "чоловіча стрижка", "барбершоп Львів"],
  authors: [{ name: "M&Y Barber Studio" }],
  creator: "M&Y Barber Studio",
  openGraph: {
    title: "M&Y Barber Studio | Барбершоп у Львові",
    description: "Преміум барбершоп у Львові. Стиль народжується тут. Запишись онлайн.",
    type: "website",
    locale: "uk_UA",
    siteName: "M&Y Barber Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "M&Y Barber Studio | Барбершоп у Львові",
    description: "Преміум барбершоп у Львові. Стиль народжується тут.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: "M&Y Barber Studio",
    description: "Преміум барбершоп у Львові. Чоловічі стрижки, бороди, догляд за обличчям.",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "вул. Мирослава Скорика, 21",
      addressLocality: "Львів",
      addressCountry: "UA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.8397,
      longitude: 24.0297,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "21:00",
    },
  };

  return (
    <html lang="uk" className={`dark ${exo2.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
