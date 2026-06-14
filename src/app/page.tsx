import { Hero } from "@/widgets/Hero/ui/Hero";
import { AboutSection } from "@/widgets/AboutSection/ui/AboutSection";
import { HowSection } from "@/widgets/HowSection/ui/HowSection";
import { FeaturesSection } from "@/widgets/FeaturesSection/ui/FeaturesSection";
import { DemoSection } from "@/widgets/DemoSection/ui/DemoSection";
import { FAQSection } from "@/widgets/FAQSection/ui/FAQSection";
import { ContactSection } from "@/widgets/ContactSection/ui/ContactSection";
import { Footer } from "@/widgets/Footer/ui/Footer";

export default function Home() {
  return (
    <div className="bg-transparent text-[var(--text)]">
      <main className="relative">
        <Hero />
        <AboutSection />
        <HowSection />
        <FeaturesSection />
        <DemoSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
