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
  title: "MyBarberStudio | Cyberpunk Barbershop in Lviv",
  description:
    "Premium barbershop in Lviv with a futuristic cyberpunk aesthetic. Haircuts, beard styling, and grooming for the modern urban man.",
  keywords: ["barbershop", "Lviv", "cyberpunk", "haircut", "beard", "grooming"],
  openGraph: {
    title: "MyBarberStudio | Cyberpunk Barbershop in Lviv",
    description:
      "Premium barbershop in Lviv with a futuristic cyberpunk aesthetic.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${shareTechMono.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
