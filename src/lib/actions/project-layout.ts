"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import type { Block } from "@/lib/page-builder/types";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}

export async function saveProjectLayout(projectId: string, blocks: Block[]) {
  await requireAuth();

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { slug: true },
  });

  if (!project) throw new Error("Project not found");

  await prisma.project.update({
    where: { id: projectId },
    data: { layout: JSON.parse(JSON.stringify(blocks)) },
  });

  revalidatePath(`/projects/${project.slug}`);
  revalidatePath("/projects");
  revalidatePath("/");

  return { success: true };
}

export async function getProjectLayout(projectId: string): Promise<Block[]> {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { layout: true },
  });

  if (!project?.layout) return [];
  return project.layout as unknown as Block[];
}
