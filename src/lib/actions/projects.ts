"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function getProjects() {
  return prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export async function getPublishedProjects() {
  return prisma.project.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: { published: true, featured: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    take: 6,
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({ where: { slug } });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({ where: { id } });
}

export async function getProjectCategories() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    select: { category: true },
    distinct: ["category"],
  });
  return projects.map((p: { category: string }) => p.category);
}

export async function createProject(formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const client = (formData.get("client") as string) || null;
  const year = (formData.get("year") as string) || null;
  const tagsRaw = formData.get("tags") as string;
  const imagesRaw = formData.get("images") as string;
  const thumbnail = (formData.get("thumbnail") as string) || null;
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";
  const order = parseInt((formData.get("order") as string) || "0", 10);

  const slug = slugify(title);
  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];
  const images = imagesRaw
    ? imagesRaw.split("\n").map((i) => i.trim()).filter(Boolean)
    : [];

  await prisma.project.create({
    data: {
      title,
      slug,
      description,
      category,
      client,
      year,
      tags,
      images,
      thumbnail,
      featured,
      published,
      order,
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const client = (formData.get("client") as string) || null;
  const year = (formData.get("year") as string) || null;
  const tagsRaw = formData.get("tags") as string;
  const imagesRaw = formData.get("images") as string;
  const thumbnail = (formData.get("thumbnail") as string) || null;
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";
  const order = parseInt((formData.get("order") as string) || "0", 10);

  const slug = slugify(title);
  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];
  const images = imagesRaw
    ? imagesRaw.split("\n").map((i) => i.trim()).filter(Boolean)
    : [];

  await prisma.project.update({
    where: { id },
    data: {
      title,
      slug,
      description,
      category,
      client,
      year,
      tags,
      images,
      thumbnail,
      featured,
      published,
      order,
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAuth();

  await prisma.project.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}
