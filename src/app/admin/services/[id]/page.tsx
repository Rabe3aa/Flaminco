import { getServiceById, updateService } from "@/lib/actions/services";
import { ServiceEditTabs } from "@/components/admin/service-edit-tabs";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Block } from "@/lib/page-builder/types";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) notFound();

  const initialData = {
    title: service.title,
    description: service.description || "",
    icon: service.icon || "",
    images: service.images.join("\n"),
    thumbnail: service.thumbnail || service.images[0] || "",
    order: service.order,
    published: service.published,
  };

  const blocks = (Array.isArray(service.layout) ? service.layout : []) as unknown as Block[];
  const updateWithId = updateService.bind(null, id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/services"
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Service</h1>
          <p className="text-gray-400 mt-1">{service.title}</p>
        </div>
      </div>

      <ServiceEditTabs
        initialData={initialData}
        action={updateWithId}
        serviceId={id}
        initialBlocks={blocks}
      />
    </div>
  );
}
