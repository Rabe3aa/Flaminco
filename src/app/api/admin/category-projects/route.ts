import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const category = request.nextUrl.searchParams.get("category");
  if (!category) {
    return NextResponse.json({ ids: [] });
  }

  const projects = await prisma.project.findMany({
    where: { category },
    select: { id: true },
  });

  return NextResponse.json({ ids: projects.map((p) => p.id) });
}
