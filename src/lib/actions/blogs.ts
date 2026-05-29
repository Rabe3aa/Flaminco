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

export async function getBlogs() {
  return prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getPublishedBlogs() {
  return prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getBlogBySlug(slug: string) {
  return prisma.blog.findUnique({ where: { slug } });
}

export async function getBlogById(id: string) {
  return prisma.blog.findUnique({ where: { id } });
}

export async function createBlog(formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const excerpt = (formData.get("excerpt") as string) || null;
  const content = formData.get("content") as string;
  const coverImage = (formData.get("coverImage") as string) || null;
  const author = (formData.get("author") as string) || null;
  const tagsRaw = formData.get("tags") as string;
  const published = formData.get("published") === "on";

  const slug = slugify(title);
  const tags = tagsRaw
    ? tagsRaw.split(",").map((t: string) => t.trim()).filter(Boolean)
    : [];

  await prisma.blog.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      author,
      tags,
      published,
    },
  });

  revalidatePath("/blogs");
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function updateBlog(id: string, formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const excerpt = (formData.get("excerpt") as string) || null;
  const content = formData.get("content") as string;
  const coverImage = (formData.get("coverImage") as string) || null;
  const author = (formData.get("author") as string) || null;
  const tagsRaw = formData.get("tags") as string;
  const published = formData.get("published") === "on";

  const slug = slugify(title);
  const tags = tagsRaw
    ? tagsRaw.split(",").map((t: string) => t.trim()).filter(Boolean)
    : [];

  await prisma.blog.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      author,
      tags,
      published,
    },
  });

  revalidatePath("/blogs");
  revalidatePath(`/blogs/${slug}`);
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function deleteBlog(id: string) {
  await requireAuth();

  await prisma.blog.delete({ where: { id } });

  revalidatePath("/blogs");
  revalidatePath("/admin/blogs");
}
