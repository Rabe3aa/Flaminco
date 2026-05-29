import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcryptjs from "bcryptjs";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "Flaminco@2024!";

  const hashedPassword = await bcryptjs.hash(password, 12);

  await prisma.user.upsert({
    where: { username },
    update: { password: hashedPassword },
    create: {
      username,
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log(`Admin user '${username}' created/updated.`);

  // Seed services
  const services = [
    { title: "Corporate Gifts", description: "Premium corporate gifts tailored to your brand identity, perfect for clients, partners, and employees.", icon: "Gift", order: 1 },
    { title: "Promotional Materials", description: "Eye-catching promotional materials that amplify your brand message and drive engagement.", icon: "Megaphone", order: 2 },
    { title: "Events Giveaways", description: "Memorable event giveaways that leave lasting impressions on your audience.", icon: "Calendar", order: 3 },
    { title: "Booths, Pop-ups & Roll-ups", description: "Stunning exhibition booths, pop-up displays, and roll-up banners for maximum visual impact.", icon: "Layout", order: 4 },
    { title: "Advertising designs, prints & Vip business gifts", description: "Full-spectrum advertising design, premium prints, and VIP business gift solutions.", icon: "Palette", order: 5 },
    { title: "Personalized Logo Printing", description: "High-quality personalized logo printing on a wide range of products and materials.", icon: "Stamp", order: 6 },
  ];

  for (const service of services) {
    const id = service.title.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
      await prisma.service.create({
        data: {
          ...service,
          images: [],
          published: true,
        },
      });
    }
  }

  console.log(`${services.length} services seeded.`);

  // Seed sample projects
  const projects = [
    {
      title: "Luxury Corporate Gift Set",
      slug: "luxury-corporate-gift-set",
      description: "A premium corporate gift set designed for a leading financial institution, featuring custom-branded leather accessories and premium packaging.",
      category: "Corporate Gifts",
      client: "Alpha Finance",
      year: "2024",
      tags: ["branding", "luxury", "corporate"],
      images: ["https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800"],
      featured: true,
      published: true,
      order: 1,
    },
    {
      title: "Tech Summit Exhibition Booth",
      slug: "tech-summit-exhibition-booth",
      description: "A striking exhibition booth design for a major tech summit, featuring interactive displays and immersive brand experiences.",
      category: "Booths, Pop-ups & Roll-ups",
      client: "TechVision",
      year: "2024",
      tags: ["exhibition", "booth", "tech"],
      images: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"],
      featured: true,
      published: true,
      order: 2,
    },
    {
      title: "Annual Gala Event Package",
      slug: "annual-gala-event-package",
      description: "Complete event giveaway package for an annual corporate gala, including custom trophies, branded merchandise, and premium gift bags.",
      category: "Events Giveaways",
      client: "Royal Events",
      year: "2024",
      tags: ["events", "giveaways", "gala"],
      images: ["https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800"],
      featured: true,
      published: true,
      order: 3,
    },
  ];

  for (const project of projects) {
    const existing = await prisma.project.findUnique({ where: { slug: project.slug } });
    if (!existing) {
      await prisma.project.create({ data: project });
    }
  }

  console.log(`${projects.length} sample projects seeded.`);

  // Seed page content
  const content = [
    { page: "home", section: "hero", key: "title", value: "We Create Brands That Stand Out", type: "text" },
    { page: "home", section: "hero", key: "subtitle", value: "Flaminco is a full-service marketing agency specializing in corporate gifts, promotional materials, and brand experiences.", type: "text" },
    { page: "about", section: "hero", key: "title", value: "About Flaminco", type: "text" },
    { page: "about", section: "hero", key: "description", value: "We are a passionate team of creative professionals dedicated to delivering exceptional marketing solutions.", type: "text" },
    { page: "contact", section: "info", key: "egypt_address", value: "Plot No. 7995, Al Jazzera Higher Institute, Street 9, Mukattam, Cairo, Egypt", type: "text" },
    { page: "contact", section: "info", key: "egypt_phone", value: "+201062120949", type: "text" },
    { page: "contact", section: "info", key: "ksa_address", value: "7327, Prince Abdul Majeed bin Abdulaziz Street, Al-Duwaima, Al Madinah Al Munawwarah, Saudi Arabia", type: "text" },
    { page: "contact", section: "info", key: "ksa_phone", value: "+966543772563", type: "text" },
  ];

  for (const item of content) {
    await prisma.pageContent.upsert({
      where: { page_section_key: { page: item.page, section: item.section, key: item.key } },
      update: { value: item.value, type: item.type },
      create: item,
    });
  }

  console.log(`${content.length} content items seeded.`);
  console.log("\nSeed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
