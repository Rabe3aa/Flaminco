import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { team } = await request.json();

  // Get existing member IDs
  const existing = await prisma.teamMember.findMany({ select: { id: true } });
  const existingIds = new Set(existing.map((m) => m.id));
  const incomingIds = new Set(team.map((m: { id: string }) => m.id));

  // Delete removed members
  for (const id of existingIds) {
    if (!incomingIds.has(id)) {
      await prisma.teamMember.delete({ where: { id } });
    }
  }

  // Upsert all members
  for (const member of team) {
    const isNew = member.id.startsWith("new_") || member.id.startsWith("def_") || !existingIds.has(member.id);
    if (isNew) {
      await prisma.teamMember.create({
        data: {
          name: member.name,
          role: member.role,
          bio: member.bio || null,
          image: member.image || null,
          department: member.department,
          order: member.order,
        },
      });
    } else {
      await prisma.teamMember.update({
        where: { id: member.id },
        data: {
          name: member.name,
          role: member.role,
          bio: member.bio || null,
          image: member.image || null,
          department: member.department,
          order: member.order,
        },
      });
    }
  }

  revalidatePath("/about");
  revalidatePath("/");
  revalidatePath("/admin/about");

  return NextResponse.json({ success: true });
}
