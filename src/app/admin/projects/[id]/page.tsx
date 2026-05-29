import { getProjectById, updateProject } from "@/lib/actions/projects";
import { getCategories } from "@/lib/actions/categories";
import { getProjectLayout } from "@/lib/actions/project-layout";
import { ProjectEditTabs } from "@/components/admin/project-edit-tabs";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, cats, blocks] = await Promise.all([
    getProjectById(id),
    getCategories(),
    getProjectLayout(id),
  ]);

  if (!project) notFound();

  const categoryNames = cats.map((c) => c.name);

  // Ensure the project's current category is in the list even if it was deleted
  if (!categoryNames.includes(project.category)) {
    categoryNames.push(project.category);
  }

  const initialData = {
    title: project.title,
    description: project.description,
    category: project.category,
    client: project.client || "",
    year: project.year || "",
    tags: project.tags.join(", "),
    images: project.images.join("\n"),
    thumbnail: project.thumbnail || "",
    featured: project.featured,
    published: project.published,
    order: project.order,
  };

  const updateWithId = updateProject.bind(null, id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/projects"
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Project</h1>
          <p className="text-gray-400 mt-1">{project.title}</p>
        </div>
      </div>

      <ProjectEditTabs
        projectId={id}
        initialData={initialData}
        action={updateWithId}
        categories={categoryNames}
        initialBlocks={blocks}
      />
    </div>
  );
}
