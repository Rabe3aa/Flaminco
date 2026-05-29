"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}

export async function getPageContent(page: string) {
  return prisma.pageContent.findMany({
    where: { page },
    orderBy: [{ section: "asc" }, { key: "asc" }],
  });
}

export async function getContentValue(
  page: string,
  section: string,
  key: string
): Promise<string | null> {
  const content = await prisma.pageContent.findUnique({
    where: { page_section_key: { page, section, key } },
  });
  return content?.value ?? null;
}

export async function getAllPageContent() {
  return prisma.pageContent.findMany({
    orderBy: [{ page: "asc" }, { section: "asc" }, { key: "asc" }],
  });
}

export async function upsertContent(formData: FormData) {
  await requireAuth();

  const page = formData.get("page") as string;
  const section = formData.get("section") as string;
  const key = formData.get("key") as string;
  const value = formData.get("value") as string;
  const type = (formData.get("type") as string) || "text";

  await prisma.pageContent.upsert({
    where: { page_section_key: { page, section, key } },
    update: { value, type },
    create: { page, section, key, value, type },
  });

  revalidatePath("/");
  revalidatePath(`/${page}`);
  revalidatePath("/admin/content");
}

export async function deleteContent(id: string) {
  await requireAuth();

  await prisma.pageContent.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/content");
}

export async function getSiteSettings() {
  const settings = await prisma.siteSettings.findMany();
  const map: Record<string, string> = {};
  for (const s of settings) {
    map[s.key] = s.value;
  }
  return map;
}

export async function updateSiteSetting(key: string, value: string) {
  await requireAuth();

  await prisma.siteSettings.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}
