import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const serviceId = searchParams.get("entityId") || searchParams.get("serviceId");

  if (!serviceId) {
    return NextResponse.json({ error: "Missing serviceId" }, { status: 400 });
  }

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { layout: true },
  });

  return NextResponse.json({ layout: service?.layout || [] });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const entityId = body.entityId || body.serviceId;
  const { blocks } = body;

  if (!entityId) {
    return NextResponse.json({ error: "Missing serviceId" }, { status: 400 });
  }

  const service = await prisma.service.findUnique({
    where: { id: entityId },
    select: { id: true },
  });

  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  await prisma.service.update({
    where: { id: entityId },
    data: { layout: blocks },
  });

  revalidatePath("/services");
  revalidatePath("/admin/services");
  revalidatePath("/");

  return NextResponse.json({ success: true });
}
