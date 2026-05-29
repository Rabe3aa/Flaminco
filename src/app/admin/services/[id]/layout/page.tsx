import { getServiceById } from "@/lib/actions/services";
import { PageBuilder } from "@/components/admin/page-builder/page-builder";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Block } from "@/lib/page-builder/types";

export default async function ServiceLayoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) notFound();

  const blocks = (Array.isArray(service.layout) ? service.layout : []) as unknown as Block[];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href={`/admin/services/${id}`}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white">Service Content</h1>
          <p className="text-gray-400 mt-1">{service.title}</p>
        </div>
      </div>

      <PageBuilder
        entityId={id}
        saveEndpoint="/api/admin/service-layout"
        initialBlocks={blocks}
      />
    </div>
  );
}
