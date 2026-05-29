"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}

export async function getServices() {
  return prisma.service.findMany({
    orderBy: { order: "asc" },
  });
}

export async function getPublishedServices() {
  return prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

export async function getServiceById(id: string) {
  return prisma.service.findUnique({ where: { id } });
}

export async function createService(formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || null;
  const icon = (formData.get("icon") as string) || null;
  const imagesRaw = formData.get("images") as string;
  const thumbnail = (formData.get("thumbnail") as string) || null;
  const order = parseInt((formData.get("order") as string) || "0", 10);
  const published = formData.get("published") === "on";

  const images = imagesRaw
    ? imagesRaw.split("\n").map((i: string) => i.trim()).filter(Boolean)
    : [];

  await prisma.service.create({
    data: { title, description, icon, images, thumbnail, order, published },
  });

  revalidatePath("/services");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || null;
  const icon = (formData.get("icon") as string) || null;
  const imagesRaw = formData.get("images") as string;
  const thumbnail = (formData.get("thumbnail") as string) || null;
  const order = parseInt((formData.get("order") as string) || "0", 10);
  const published = formData.get("published") === "on";

  const images = imagesRaw
    ? imagesRaw.split("\n").map((i: string) => i.trim()).filter(Boolean)
    : [];

  await prisma.service.update({
    where: { id },
    data: { title, description, icon, images, thumbnail, order, published },
  });

  revalidatePath("/services");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await requireAuth();

  await prisma.service.delete({ where: { id } });

  revalidatePath("/services");
  revalidatePath("/admin/services");
}
