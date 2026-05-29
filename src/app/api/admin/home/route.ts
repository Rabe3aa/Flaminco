import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { content } = await request.json();

  if (content) {
    for (const [compositeKey, value] of Object.entries(content)) {
      const dotIdx = compositeKey.indexOf(".");
      const section = compositeKey.substring(0, dotIdx);
      const key = compositeKey.substring(dotIdx + 1);
      const type = key === "image" || key.endsWith("Image") ? "image" : "text";

      await prisma.pageContent.upsert({
        where: { page_section_key: { page: "home", section, key } },
        update: { value: value as string, type },
        create: { page: "home", section, key, value: value as string, type },
      });
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/home");

  return NextResponse.json({ success: true });
}
