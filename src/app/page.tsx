import { Hero } from "@/widgets/Hero/ui/Hero";
import { TickerSection } from "@/widgets/TickerSection/ui/TickerSection";
import { StatsSection } from "@/widgets/StatsSection/ui/StatsSection";
import { AboutSection } from "@/widgets/AboutSection/ui/AboutSection";
import { HowSection } from "@/widgets/HowSection/ui/HowSection";
import { FeaturesSection } from "@/widgets/FeaturesSection/ui/FeaturesSection";
import { UseCasesSection } from "@/widgets/UseCasesSection/ui/UseCasesSection";
import { GallerySection } from "@/widgets/GallerySection/ui/GallerySection";
import { DemoSection } from "@/widgets/DemoSection/ui/DemoSection";
import { PoweredSection } from "@/widgets/PoweredSection/ui/PoweredSection";
import { PricingSection } from "@/widgets/PricingSection/ui/PricingSection";
import { FaqSection } from "@/widgets/FAQSection/ui/FAQSection";
import { BetaSection } from "@/widgets/ContactSection/ui/ContactSection";
import { Footer } from "@/widgets/Footer/ui/Footer";

export default function Home() {
  return (
    <div className="relative z-10 bg-transparent text-[var(--text)]">
      <main className="relative">
        <Hero />
        <TickerSection />
        <StatsSection />
        <AboutSection />
        <HowSection />
        <FeaturesSection />
        <UseCasesSection />
        <GallerySection />
        <DemoSection />
        <PoweredSection />
        <PricingSection />
        <FaqSection />
        <BetaSection />
      </main>
      <Footer />
    </div>
  );
}
