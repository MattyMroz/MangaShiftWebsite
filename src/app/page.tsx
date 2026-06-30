import { Hero } from "@/widgets/Hero/ui/hero";
import { TickerSection } from "@/widgets/TickerSection/ui/ticker-section";
import { AboutSection } from "@/widgets/AboutSection/ui/about-section";
import { HowSection } from "@/widgets/HowSection/ui/how-section";
import { FeaturesSection } from "@/widgets/FeaturesSection/ui/features-section";
import { UseCasesSection } from "@/widgets/UseCasesSection/ui/use-cases-section";
import { GallerySection } from "@/widgets/GallerySection/ui/gallery-section";
import { DemoSection } from "@/widgets/DemoSection/ui/demo-section";
import { FaqSection } from "@/widgets/FAQSection/ui/faq-section";
import { BetaSection } from "@/widgets/ContactSection/ui/contact-section";
import { Footer } from "@/widgets/Footer/ui/footer";

export default function Home() {
  return (
    <div className="relative z-10 bg-transparent text-[var(--text)]">
      <main className="relative">
        <Hero />
        <TickerSection />
        <AboutSection />
        <HowSection />
        <FeaturesSection />
        <UseCasesSection />
        <GallerySection />
        <DemoSection />
        <FaqSection />
        <BetaSection />
      </main>
      <Footer />
    </div>
  );
}
