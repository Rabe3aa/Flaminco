import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
  const companies = await prisma.trustedCompany.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(companies);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { companies } = await request.json();

  if (!Array.isArray(companies)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  // Get existing IDs
  const existing = await prisma.trustedCompany.findMany({ select: { id: true } });
  const existingIds = new Set(existing.map((c) => c.id));
  const incomingIds = new Set(companies.map((c: { id: string }) => c.id));

  // Delete removed
  for (const id of existingIds) {
    if (!incomingIds.has(id)) {
      await prisma.trustedCompany.delete({ where: { id } });
    }
  }

  // Upsert all
  for (const company of companies) {
    const isNew = company.id.startsWith("new_") || !existingIds.has(company.id);
    if (isNew) {
      await prisma.trustedCompany.create({
        data: {
          name: company.name,
          logo: company.logo,
          url: company.url || null,
          order: company.order,
          published: company.published ?? true,
        },
      });
    } else {
      await prisma.trustedCompany.update({
        where: { id: company.id },
        data: {
          name: company.name,
          logo: company.logo,
          url: company.url || null,
          order: company.order,
          published: company.published ?? true,
        },
      });
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/trusted-companies");

  return NextResponse.json({ success: true });
}
