import { Hero } from "@/widgets/hero/ui/hero";
import { TickerSection } from "@/widgets/ticker-section/ui/ticker-section";
import { AboutSection } from "@/widgets/about-section/ui/about-section";
import { HowSection } from "@/widgets/how-section/ui/how-section";
import { FeaturesSection } from "@/widgets/features-section/ui/features-section";
import { UseCasesSection } from "@/widgets/use-cases-section/ui/use-cases-section";
import { GallerySection } from "@/widgets/gallery-section/ui/gallery-section";
import { DemoSection } from "@/widgets/demo-section/ui/demo-section";
import { FaqSection } from "@/widgets/faq-section/ui/faq-section";
import { BetaSection } from "@/widgets/contact-section/ui/contact-section";
import { Footer } from "@/widgets/footer/ui/footer";

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
