"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}

// ── About Page Content (PageContent model) ──

export async function getAboutContent() {
  const rows = await prisma.pageContent.findMany({
    where: { page: "about" },
    orderBy: [{ section: "asc" }, { key: "asc" }],
  });
  const map: Record<string, string> = {};
  for (const r of rows) {
    map[`${r.section}.${r.key}`] = r.value;
  }
  return map;
}

export async function saveAboutContent(data: Record<string, string>) {
  await requireAuth();

  const entries = Object.entries(data);
  for (const [compositeKey, value] of entries) {
    const dotIdx = compositeKey.indexOf(".");
    const section = compositeKey.substring(0, dotIdx);
    const key = compositeKey.substring(dotIdx + 1);
    const type = key === "image" || key.endsWith("Image") ? "image" : "text";

    await prisma.pageContent.upsert({
      where: { page_section_key: { page: "about", section, key } },
      update: { value, type },
      create: { page: "about", section, key, value, type },
    });
  }

  revalidatePath("/about");
  revalidatePath("/");
  revalidatePath("/admin/about");
}

// ── Team Members ──

export async function getTeamMembers() {
  return prisma.teamMember.findMany({ orderBy: { order: "asc" } });
}

export async function createTeamMember(formData: FormData) {
  await requireAuth();

  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const image = formData.get("image") as string;
  const department = formData.get("department") as string;
  const order = parseInt(formData.get("order") as string) || 0;

  await prisma.teamMember.create({
    data: { name, role, image: image || null, department, order },
  });

  revalidatePath("/about");
  revalidatePath("/admin/about");
}

export async function updateTeamMember(id: string, formData: FormData) {
  await requireAuth();

  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const image = formData.get("image") as string;
  const department = formData.get("department") as string;
  const order = parseInt(formData.get("order") as string) || 0;

  await prisma.teamMember.update({
    where: { id },
    data: { name, role, image: image || null, department, order },
  });

  revalidatePath("/about");
  revalidatePath("/admin/about");
}

export async function deleteTeamMember(id: string) {
  await requireAuth();

  await prisma.teamMember.delete({ where: { id } });

  revalidatePath("/about");
  revalidatePath("/admin/about");
}

// ── Journey Milestones (stored as JSON in PageContent) ──

export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
}

export async function getJourneyMilestones(): Promise<JourneyMilestone[]> {
  const row = await prisma.pageContent.findUnique({
    where: { page_section_key: { page: "about", section: "journey", key: "milestones" } },
  });
  if (!row) return [];
  try {
    return JSON.parse(row.value) as JourneyMilestone[];
  } catch {
    return [];
  }
}

export async function saveJourneyMilestones(milestones: JourneyMilestone[]) {
  await requireAuth();

  await prisma.pageContent.upsert({
    where: { page_section_key: { page: "about", section: "journey", key: "milestones" } },
    update: { value: JSON.stringify(milestones), type: "json" },
    create: { page: "about", section: "journey", key: "milestones", value: JSON.stringify(milestones), type: "json" },
  });

  revalidatePath("/about");
  revalidatePath("/admin/about");
}

// ── Seed defaults ──

export async function seedAboutDefaults() {
  await requireAuth();

  const defaults: Record<string, string> = {
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

  await saveAboutContent(defaults);

  // Seed journey milestones
  const existingMilestones = await getJourneyMilestones();
  if (existingMilestones.length === 0) {
    await saveJourneyMilestones([
      { year: "2018", title: "The Beginning", description: "Founded in a small coffee shop in San Francisco with just 3 ambitious marketers." },
      { year: "2020", title: "Going Global", description: "Expanded our operations across Europe and Asia, acquiring our first Fortune 500 client." },
      { year: "2022", title: "Digital Evolution", description: "Integrated AI and machine learning into our core offering, launching the proprietary Designova Data Engine." },
      { year: "2024", title: "Industry Leaders", description: "Recognized as the #1 Fastest Growing Independent Agency in North America." },
    ]);
  }

  // Seed team members
  const existingTeam = await prisma.teamMember.count();
  if (existingTeam === 0) {
    const teamDefaults = [
      { name: "Shady Elahmady", role: "CEO", department: "Leadership", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop" },
      { name: "Alaa Ali", role: "Art Director", department: "Design", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361&auto=format&fit=crop" },
      { name: "Mahmoud Khaled", role: "2D & 3D Designer", department: "Design", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1374&auto=format&fit=crop" },
      { name: "Tasbeeh Mahmoud", role: "Marketing", department: "Marketing", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop" },
      { name: "Sara Kamal", role: "Marketing", department: "Marketing", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1374&auto=format&fit=crop" },
      { name: "Atef Zarzor", role: "Senior Marketing", department: "Marketing", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop" },
      { name: "Osama wael", role: "Marketing", department: "Marketing", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374&auto=format&fit=crop" },
      { name: "Rawda Ahmed", role: "Head of Accounting", department: "Finance", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop" },
      { name: "Mohamed Afify", role: "Head of Production", department: "Production", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop" },
      { name: "Mohamed Mubark", role: "Partner", department: "Leadership", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=1374&auto=format&fit=crop" },
    ];
    for (let i = 0; i < teamDefaults.length; i++) {
      await prisma.teamMember.create({ data: { ...teamDefaults[i], order: i } });
    }
  }
}
