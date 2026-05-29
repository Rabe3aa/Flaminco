import { getProjectById } from "@/lib/actions/projects";
import { getProjectLayout } from "@/lib/actions/project-layout";
import { PageBuilder } from "@/components/admin/page-builder/page-builder";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProjectLayoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) notFound();

  const blocks = await getProjectLayout(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href={`/admin/projects/${id}`}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white">Design Layout</h1>
          <p className="text-gray-400 mt-1">{project.title}</p>
        </div>
        <Link
          href={`/projects/${project.slug}`}
          target="_blank"
          className="text-xs font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all border border-white/10"
        >
          Preview →
        </Link>
      </div>

      <PageBuilder projectId={id} initialBlocks={blocks} />
    </div>
  );
}
