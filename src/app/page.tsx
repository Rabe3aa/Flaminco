import { Header } from "@/components/layout/header";
import { Hero } from "@/components/layout/hero";
import { HighlightRow } from "@/components/layout/highlight-row";
import { ProjectsSection } from "@/components/layout/projects-section";
import { AboutSection } from "@/components/layout/about-section";
import { FeaturesSection } from "@/components/layout/features-section";
import { TrustedCompaniesMarquee } from "@/components/layout/trusted-companies";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/layout/animated-background";
import { Reveal } from "@/components/ui/reveal";
import { getFeaturedProjectsForDisplay } from "@/lib/data";
import { getPublishedTrustedCompanies } from "@/lib/actions/trusted-companies";
import { getHomeContent } from "@/lib/actions/home";

// ISR: served instantly from cache; admin edits trigger on-demand
// revalidation (revalidatePath) so changes still appear immediately.
export const revalidate = 3600;

const FALLBACK_PROJECTS = [
  {
    id: "1",
    title: "Corporate Gifts",
    category: "Corporate Gifts",
    overview: "Premium corporate gifts tailored to your brand identity, perfect for clients, partners, and employees.",
    benefits: ["Custom Branding", "Premium Packaging", "Bulk Orders"],
  },
  {
    id: "2",
    title: "Exhibition Booth",
    category: "Booths, Pop-ups & Roll-ups",
    overview: "Stunning exhibition booth design featuring interactive displays and immersive brand experiences.",
    benefits: ["Custom Design", "Easy Assembly", "Brand Impact"],
  },
  {
    id: "3",
    title: "Event Giveaways",
    category: "Events Giveaways",
    overview: "Complete event giveaway packages including custom trophies, branded merchandise, and premium gift bags.",
    benefits: ["Memorable Items", "Brand Visibility", "Quality Materials"],
  },
];

function pickSection(content: Record<string, string>, prefix: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [k, v] of Object.entries(content)) {
    if (k.startsWith(`${prefix}.`)) {
      result[k.slice(prefix.length + 1)] = v;
    }
  }
  return result;
}

export default async function Home() {
  const [dbProjects, trustedCompanies, homeContent] = await Promise.all([
    getFeaturedProjectsForDisplay().catch(() => null),
    getPublishedTrustedCompanies().catch(() => []),
    getHomeContent().catch(() => ({})),
  ]);
  const projects = dbProjects || FALLBACK_PROJECTS;

  return (
    <main className="min-h-screen text-brand-neutral overflow-x-hidden font-sans relative z-0">
      <AnimatedBackground />
      <Header />
      <Hero content={pickSection(homeContent, "hero")} />
      <Reveal><HighlightRow content={pickSection(homeContent, "highlight")} /></Reveal>
      {trustedCompanies.length > 0 && (
        <Reveal><TrustedCompaniesMarquee companies={trustedCompanies} /></Reveal>
      )}
      <Reveal><ProjectsSection projects={projects} /></Reveal>
      <Reveal><AboutSection content={pickSection(homeContent, "about")} /></Reveal>
      <Reveal><FeaturesSection content={pickSection(homeContent, "features")} /></Reveal>
      <Footer />
    </main>
  );
}
