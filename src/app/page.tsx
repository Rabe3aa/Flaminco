import { Header } from "@/components/layout/header";
import { Hero } from "@/components/layout/hero";
import { HighlightRow } from "@/components/layout/highlight-row";
import { ProjectsSection } from "@/components/layout/projects-section";
import { AboutSection } from "@/components/layout/about-section";
import { FeaturesSection } from "@/components/layout/features-section";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/layout/animated-background";

export default function Home() {
  return (
    <main className="min-h-screen text-brand-neutral overflow-x-hidden font-sans relative z-0">
      <AnimatedBackground />
      <Header />
      <Hero />
      <HighlightRow />
      <ProjectsSection />
      <AboutSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}
