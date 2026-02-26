import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

/* Lazy load below-the-fold sections — smaller initial bundle, faster TTI */
const About = dynamic(() => import("@/components/About"), { ssr: true });
const Services = dynamic(() => import("@/components/Services"), { ssr: true });
const Tattoo = dynamic(() => import("@/components/Tattoo"), { ssr: true });
const BookingFlow = dynamic(() => import("@/components/BookingFlow"), { ssr: true });
const Masters = dynamic(() => import("@/components/Masters"), { ssr: true });
const Gallery = dynamic(() => import("@/components/Gallery"), { ssr: true });
const Reviews = dynamic(() => import("@/components/Reviews"), { ssr: true });
const Contacts = dynamic(() => import("@/components/Contacts"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <Hero />
        <About />
        <Services />
        <Tattoo />
        <BookingFlow />
        <Masters />
        <Gallery />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
