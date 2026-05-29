import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, id } = await request.json();

  if (!type || !id) {
    return NextResponse.json({ error: "Missing type or id" }, { status: 400 });
  }

  try {
    switch (type) {
      case "service":
        await prisma.service.delete({ where: { id } });
        revalidatePath("/services");
        revalidatePath("/admin/services");
        break;
      case "project":
        await prisma.project.delete({ where: { id } });
        revalidatePath("/projects");
        revalidatePath("/admin/projects");
        break;
      case "blog":
        await prisma.blog.delete({ where: { id } });
        revalidatePath("/blog");
        revalidatePath("/admin/blogs");
        break;
      default:
        return NextResponse.json({ error: "Unknown type" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`[delete] Failed to delete ${type} ${id}:`, error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
