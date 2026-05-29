"use server";

import { prisma } from "@/lib/prisma";

export async function getTrustedCompanies() {
  return prisma.trustedCompany.findMany({
    orderBy: { order: "asc" },
  });
}

export async function getPublishedTrustedCompanies() {
  return prisma.trustedCompany.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}
