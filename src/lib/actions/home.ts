"use server";

import { prisma } from "@/lib/prisma";

export async function getHomeContent(): Promise<Record<string, string>> {
  const rows = await prisma.pageContent.findMany({
    where: { page: "home" },
  });
  const map: Record<string, string> = {};
  for (const r of rows) {
    map[`${r.section}.${r.key}`] = r.value;
  }
  return map;
}
