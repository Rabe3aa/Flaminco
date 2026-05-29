"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { order: "asc" },
  });
}

export async function getCategoryProjectCounts() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
  });

  const counts = await Promise.all(
    categories.map(async (cat) => {
      const count = await prisma.project.count({
        where: { category: cat.name },
      });
      return { ...cat, projectCount: count };
    })
  );

  return counts;
}

export async function createCategory(formData: FormData) {
  await requireAuth();

  const name = (formData.get("name") as string).trim();
  if (!name) throw new Error("Category name is required");

  const slug = slugify(name);

  const maxOrder = await prisma.category.findFirst({
    orderBy: { order: "desc" },
    select: { order: true },
  });

  await prisma.category.create({
    data: {
      name,
      slug,
      order: (maxOrder?.order ?? -1) + 1,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

export async function updateCategory(id: string, formData: FormData) {
  await requireAuth();

  const name = (formData.get("name") as string).trim();
  if (!name) throw new Error("Category name is required");

  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) throw new Error("Category not found");

  const oldName = existing.name;
  const slug = slugify(name);

  await prisma.category.update({
    where: { id },
    data: { name, slug },
  });

  // Rename category on all projects that use it
  if (oldName !== name) {
    await prisma.project.updateMany({
      where: { category: oldName },
      data: { category: name },
    });
  }

  revalidatePath("/admin/categories");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function deleteCategory(id: string) {
  await requireAuth();

  const cat = await prisma.category.findUnique({ where: { id } });
  if (!cat) throw new Error("Category not found");

  const projectCount = await prisma.project.count({
    where: { category: cat.name },
  });

  if (projectCount > 0) {
    throw new Error(
      `Cannot delete "${cat.name}" — it has ${projectCount} project(s). Move them first.`
    );
  }

  await prisma.category.delete({ where: { id } });

  revalidatePath("/admin/categories");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

export async function reorderCategory(id: string, newOrder: number) {
  await requireAuth();

  await prisma.category.update({
    where: { id },
    data: { order: newOrder },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/projects");
}

export async function moveProjectsToCategory(
  projectIds: string[],
  targetCategory: string
) {
  await requireAuth();

  await prisma.project.updateMany({
    where: { id: { in: projectIds } },
    data: { category: targetCategory },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function seedDefaultCategories() {
  await requireAuth();

  const defaults = [
    "Corporate Gifts",
    "Promotional Materials",
    "Events Giveaways",
    "Booths, Pop-ups & Roll-ups",
    "Advertising designs, prints & Vip business gifts",
    "Personalized Logo Printing",
  ];

  for (let i = 0; i < defaults.length; i++) {
    const name = defaults[i];
    const slug = slugify(name);
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name, slug, order: i },
    });
  }

  revalidatePath("/admin/categories");
  revalidatePath("/admin/projects");
}
