import { createProject } from "@/lib/actions/projects";
import { ProjectForm } from "@/components/admin/project-form";
import { getCategories } from "@/lib/actions/categories";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewProjectPage() {
  const cats = await getCategories();
  const categoryNames = cats.map((c) => c.name);

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
          <h1 className="text-3xl font-bold text-white">New Project</h1>
          <p className="text-gray-400 mt-1">Create a new project</p>
        </div>
      </div>

      <ProjectForm action={createProject} categories={categoryNames} />
    </div>
  );
}
