import type { Metadata, Viewport } from "next";
import { Rajdhani, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

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
  themeColor: "#0b0c10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${rajdhani.variable} ${shareTechMono.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
