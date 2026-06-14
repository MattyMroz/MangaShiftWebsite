import { Hero } from "@/widgets/Hero/ui/Hero";
import { TickerSection } from "@/widgets/TickerSection/ui/TickerSection";
import { AboutSection } from "@/widgets/AboutSection/ui/AboutSection";
import { HowSection } from "@/widgets/HowSection/ui/HowSection";
import { FeaturesSection } from "@/widgets/FeaturesSection/ui/FeaturesSection";
import { GallerySection } from "@/widgets/GallerySection/ui/GallerySection";
import { DemoSection } from "@/widgets/DemoSection/ui/DemoSection";
import { FaqSection } from "@/widgets/FAQSection/ui/FAQSection";
import { BetaSection } from "@/widgets/ContactSection/ui/ContactSection";
import { Footer } from "@/widgets/Footer/ui/Footer";

export default function Home() {
  return (
    <div className="bg-transparent text-[var(--text)]">
      <main className="relative">
        <Hero />
        <TickerSection />
        <AboutSection />
        <HowSection />
        <FeaturesSection />
        <GallerySection />
        <DemoSection />
        <FaqSection />
        <BetaSection />
      </main>
      <Footer />
    </div>
  );
}
