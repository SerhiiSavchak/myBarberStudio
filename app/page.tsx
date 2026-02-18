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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
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
