import { prisma } from "@/lib/prisma";
import { upsertContent } from "@/lib/actions/content";
import { ContentForm } from "@/components/admin/content-form";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const content = await prisma.pageContent.findUnique({ where: { id } });

  if (!content) notFound();

  const initialData = {
    page: content.page,
    section: content.section,
    key: content.key,
    value: content.value,
    type: content.type,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/content"
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Content</h1>
          <p className="text-gray-400 mt-1">
            {content.page} / {content.section} / {content.key}
          </p>
        </div>
      </div>

      <ContentForm initialData={initialData} action={upsertContent} />
    </div>
  );
}
