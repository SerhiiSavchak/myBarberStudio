import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import BookingFlow from "@/components/BookingFlow";
import Masters from "@/components/Masters";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";

function SectionDivider() {
  return <div className="glitch-divider mx-auto max-w-7xl" />;
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <BookingFlow />
        <SectionDivider />
        <Masters />
        <SectionDivider />
        <Gallery />
        <SectionDivider />
        <Reviews />
        <SectionDivider />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
