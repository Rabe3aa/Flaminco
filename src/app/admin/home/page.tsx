import { getHomeContent } from "@/lib/actions/home";
import { HomeClient } from "@/components/admin/home-client";

const defaultContent: Record<string, string> = {
  "hero.badge": "Advertising Agency",
  "hero.heading": "Grow Your Business With Data-Driven Marketing.",
  "hero.subtitle": "We craft modern digital experiences, driving ROI through high-performance SEO, targeted campaigns, and elite creative design.",
  "hero.cta1": "Start Your Campaign",
  "hero.cta2": "View Our Work",
  "hero.image": "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1469&auto=format&fit=crop",
  "hero.reviewTitle": "Creating Impactful Digital Experiences",
  "hero.clientScore": "9.6",
  "hero.clientLabel": "150+ Clients",
  "highlight.heading": "Marketing metrics that actually matter.",
  "highlight.subtitle": "Stop guessing. We bring absolute clarity to your ad spend with precision tracking.",
  "highlight.cardTitle": "Data-driven growth strategies",
  "highlight.cardDesc": "We combine creative execution with rigorous A/B testing to ensure your budget goes further.",
  "highlight.image": "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop",
  "highlight.activeClients": "172",
  "highlight.roi": "45",
  "about.badge": "About Us",
  "about.heading": "Maximize Your Growth with Our Advertising",
  "about.description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
  "about.image": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop",
  "about.feature1Title": "Customized Strategies",
  "about.feature1Desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  "about.feature2Title": "Experienced Team",
  "about.feature2Desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  "about.feature3Title": "Client-Centric Approach",
  "about.feature3Desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  "features.badge": "Our Arsenal",
  "features.heading": "Built to dominate your digital landscape.",
  "features.card1Title": "Data-Driven Marketing",
  "features.card1Desc": "We analyze deep metrics to construct campaigns that guarantee maximum ROI.",
  "features.card2Title": "Organic SEO Growth",
  "features.card2Desc": "Dominate search rankings with our advanced technical and content strategies.",
  "features.card3Title": "Targeted Advertising",
  "features.card3Desc": "Hyper-focused ad placements that reach your ideal customers at the right time.",
  "features.card4Title": "Brand Scaling",
  "features.card4Desc": "Elevate your market presence with aggressive, multi-channel growth tactics.",
};

export default async function AdminHomePage() {
  const dbContent = await getHomeContent();
  const content = { ...defaultContent, ...dbContent };

  return <HomeClient initialContent={content} />;
}
