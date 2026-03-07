export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  featured: boolean;
  colSpan?: string; // For the featured bento grid
  client: string;
  year: string;
  services: string[];
};

export const projects: Project[] = [
  {
    id: "01",
    slug: "lumina-app-redesign",
    title: "Lumina App Redesign",
    category: "Advertising designs, prints & Vip business gifts",
    shortDescription: "A complete overhaul of the Lumina mobile app to improve user retention.",
    fullDescription: "Lumina approached us with a challenge: their user retention was dropping despite strong acquisition numbers. We conducted deep user research and completely overhauled their app interface, focusing on intuitive navigation, micro-interactions, and a fresh, modern aesthetic. The result was a 300% increase in daily active users.",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=1470&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1470&auto=format&fit=crop",
    ],
    featured: true,
    colSpan: "md:col-span-2",
    client: "Lumina Tech",
    year: "2023",
    services: ["UX/UI Design", "User Research", "Prototyping"],
  },
  {
    id: "02",
    slug: "eco-tech-branding",
    title: "Eco-Tech Branding",
    category: "Corporate Gifts",
    shortDescription: "Modernizing a sustainable tech company's visual identity.",
    fullDescription: "Eco-Tech needed a brand identity that communicated both their technological prowess and their commitment to sustainability. We developed a comprehensive brand system including a new logo, color palette, typography, and brand guidelines that positioned them as a premium, forward-thinking leader in the green tech space.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop"
    ],
    featured: true,
    colSpan: "md:col-span-1",
    client: "Eco-Tech Solutions",
    year: "2023",
    services: ["Brand Strategy", "Visual Identity", "Collateral Design"],
  },
  {
    id: "03",
    slug: "nexgen-campaign",
    title: "NexGen Campaign",
    category: "Promotional Materials",
    shortDescription: "A high-conversion digital campaign for a B2B enterprise.",
    fullDescription: "Through highly targeted account-based marketing and technical SEO, we helped NexGen establish enterprise authority and fill their sales pipeline with high-value leads. We created a series of whitepapers, webinars, and targeted LinkedIn ads that resulted in a 45% reduction in CPA.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop",
    ],
    featured: true,
    colSpan: "md:col-span-1",
    client: "NexGen Corp",
    year: "2024",
    services: ["B2B Marketing", "SEO", "Lead Generation"],
  },
  {
    id: "04",
    slug: "aura-ecommerce",
    title: "Aura E-Commerce",
    category: "Events Giveaways",
    shortDescription: "A high-performance custom Shopify storefront.",
    fullDescription: "Aura needed a bespoke e-commerce experience that reflected their premium lifestyle products. We built a headless Shopify storefront using Next.js, delivering blazing fast load times, immersive product pages, and a seamless checkout experience that boosted conversion rates by 22%.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1470&auto=format&fit=crop",
    ],
    featured: true,
    colSpan: "md:col-span-2",
    client: "Aura Lifestyle",
    year: "2024",
    services: ["Web Development", "E-Commerce", "Shopify"],
  },
  {
    id: "05",
    slug: "stellar-social",
    title: "Stellar Social Growth",
    category: "Booths, Pop-ups & Roll-ups",
    shortDescription: "Organic social media growth strategy for a new beverage brand.",
    fullDescription: "We launched Stellar's social presence from scratch, utilizing a mix of influencer partnerships, viral TikTok formats, and high-aesthetic Instagram curation. Within 6 months, they reached 100k engaged followers and sold out their initial inventory run.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1374&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1374&auto=format&fit=crop",
    ],
    featured: false,
    client: "Stellar Beverages",
    year: "2023",
    services: ["Social Media", "Content Creation", "Influencer Marketing"],
  },
  {
    id: "06",
    slug: "fintech-dashboard",
    title: "Fintech Dashboard",
    category: "Personalized Logo Printing",
    shortDescription: "Designing a complex financial dashboard for retail investors.",
    fullDescription: "Simplifying complex financial data was the core challenge for this project. We designed a clean, intuitive dashboard that allows users to easily track their investments, analyze trends, and execute trades without feeling overwhelmed.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop",
    ],
    featured: false,
    client: "TradeFlow",
    year: "2024",
    services: ["UX/UI Design", "Data Visualization"],
  },
  {
    id: "07",
    slug: "urban-living-seo",
    title: "Urban Living SEO",
    category: "Promotional Materials",
    shortDescription: "Dominating local search for a real estate agency.",
    fullDescription: "Through a localized content strategy and technical SEO optimization, we helped Urban Living rank #1 for their target keywords in 5 major metropolitan areas, driving a massive influx of organic leads.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469&auto=format&fit=crop",
    ],
    featured: false,
    client: "Urban Living Real Estate",
    year: "2023",
    services: ["SEO Optimization", "Content Strategy"],
  },
  {
    id: "08",
    slug: "health-plus-web",
    title: "Health Plus Platform",
    category: "Corporate Gifts",
    shortDescription: "A HIPAA-compliant telemedicine web application.",
    fullDescription: "We developed a secure, scalable web platform connecting patients with healthcare providers. The application features real-time video consultations, secure messaging, and integrated electronic health records.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1470&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1470&auto=format&fit=crop",
    ],
    featured: false,
    client: "Health Plus",
    year: "2024",
    services: ["Web Development", "Backend Architecture", "Healthcare Compliance"],
  }
];

export const getCategories = () => {
  const categories = new Set(projects.map(p => p.category));
  return ["All", ...Array.from(categories)];
};
