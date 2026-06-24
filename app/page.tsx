import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import HeroSection from "@/components/HeroSection";
import MarqueeTicker from "@/components/MarqueeTicker";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BottomPricing from "@/components/BottomPricing";
import FAQSection from "@/components/FAQSection";
import FilmGrain from "@/components/FilmGrain";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionBackground from "@/components/SectionBackground";
import CustomCursor from "@/components/CustomCursor";
import StickyCTA from "@/components/StickyCTA";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <main style={{ background: "#0A0A0B", minHeight: "100vh", width: "100%", overflowX: "hidden", position: "relative" }}>
      <FilmGrain />
      <CustomCursor />
      <StickyCTA />
      <MusicPlayer />
      <ScrollProgress />
      <SectionBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <HeroSection />
        <MarqueeTicker />
        <ServicesSection />
        <StatsSection />
        <PortfolioSection />
        <MarqueeTicker reverse />
        <TestimonialsSection />
        <ProcessSection />
        <BottomPricing />
        <FAQSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
