import { getAboutContent, getTeamMembers, getJourneyMilestones } from "@/lib/actions/about";
import { AboutClient } from "@/components/admin/about-client";

const defaultContent: Record<string, string> = {
  "hero.badge": "Who We Are",
  "hero.heading": "We are an agency built for the future.",
  "hero.subtitle": "Founded on the belief that creative excellence and data science shouldn't exist in silos.",
  "hero.image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop",
  "mission.title": "Our Mission",
  "mission.text": "To empower ambitious brands by engineering digital experiences that captivate audiences and systematically drive revenue growth. We don't guess; we test, measure, and scale.",
  "approach.title": "Our Approach",
  "approach.text": "We blend high-end aesthetic design with rigorous performance marketing. By breaking down the traditional agency silos, we ensure that every creative asset is deployed with a strategic, data-backed purpose.",
  "journey.heading": "Our Journey",
  "journey.subtitle": "A timeline of our growth and evolution.",
  "team.heading": "The minds behind the magic.",
  "team.subtitle": "Meet our leadership and core departmental heads.",
  "highlight.badge": "Quarterly Achiever",
  "highlight.name": "Meet Alex Rivera",
  "highlight.role": "Senior Data Analyst",
  "highlight.description": "Alex has been instrumental in optimizing our client bidding algorithms this quarter. Their rigorous approach to data science and unyielding commitment to client ROI resulted in a 40% average CPA reduction across all enterprise accounts. We are thrilled to celebrate Alex as this quarter's MVP!",
  "highlight.stat": "+40% Performance Increase",
  "highlight.image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop",
};

const defaultTeam: { id: string; name: string; role: string; bio: string | null; image: string; department: string; order: number }[] = [
  { id: "def_1", name: "Shady Elahmady", role: "CEO", bio: null, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop", department: "Leadership", order: 0 },
  { id: "def_2", name: "Alaa Ali", role: "Art Director", bio: null, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361&auto=format&fit=crop", department: "Design", order: 1 },
  { id: "def_3", name: "Mahmoud Khaled", role: "2D & 3D Designer", bio: null, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop", department: "Design", order: 2 },
  { id: "def_4", name: "Tasbeeh Mahmoud", role: "Marketing", bio: null, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop", department: "Marketing", order: 3 },
  { id: "def_5", name: "Sara Kamal", role: "Marketing", bio: null, image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1374&auto=format&fit=crop", department: "Marketing", order: 4 },
  { id: "def_6", name: "Atef Zarzor", role: "Senior Marketing", bio: null, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop", department: "Marketing", order: 5 },
  { id: "def_7", name: "Osama wael", role: "Marketing", bio: null, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop", department: "Marketing", order: 6 },
  { id: "def_8", name: "Rawda Ahmed", role: "Head of Accounting", bio: null, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop", department: "Finance", order: 7 },
  { id: "def_9", name: "Mohamed Afify", role: "Head of Production", bio: null, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop", department: "Production", order: 8 },
  { id: "def_10", name: "Mohamed Mubark", role: "Partner", bio: null, image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=1374&auto=format&fit=crop", department: "Leadership", order: 9 },
];

const defaultMilestones = [
  { year: "2018", title: "The Beginning", description: "Founded in a small coffee shop in San Francisco with just 3 ambitious marketers." },
  { year: "2020", title: "Going Global", description: "Expanded our operations across Europe and Asia, acquiring our first Fortune 500 client." },
  { year: "2022", title: "Digital Evolution", description: "Integrated AI and machine learning into our core offering, launching the proprietary Designova Data Engine." },
  { year: "2024", title: "Industry Leaders", description: "Recognized as the #1 Fastest Growing Independent Agency in North America." },
];

export default async function AdminAboutPage() {
  const [dbContent, dbTeam, dbMilestones] = await Promise.all([
    getAboutContent(),
    getTeamMembers(),
    getJourneyMilestones(),
  ]);

  const content = Object.keys(dbContent).length > 0
    ? { ...defaultContent, ...dbContent }
    : defaultContent;

  const team = dbTeam.length > 0
    ? dbTeam.map((m) => ({ id: m.id, name: m.name, role: m.role, bio: m.bio ?? null, image: m.image, department: m.department, order: m.order }))
    : defaultTeam.map((m) => ({ ...m, bio: null }));

  const milestones = dbMilestones.length > 0 ? dbMilestones : defaultMilestones;

  return (
    <AboutClient
      initialContent={content}
      initialTeam={team}
      initialMilestones={milestones}
    />
  );
}
