import { getProjects } from "@/lib/actions/projects";
import Link from "next/link";
import { Plus, Edit, Eye, EyeOff, Star } from "lucide-react";
import { DeleteProjectButton } from "./delete-project-button";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 mt-1">{projects.length} total projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-[#0072BB] hover:bg-[#005a94] text-white px-4 py-2.5 rounded-xl font-medium transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Link>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {projects.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">No projects yet. Create your first project.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-gray-400 text-xs font-medium uppercase tracking-wider px-6 py-4">Project</th>
                <th className="text-left text-gray-400 text-xs font-medium uppercase tracking-wider px-6 py-4">Category</th>
                <th className="text-left text-gray-400 text-xs font-medium uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-gray-400 text-xs font-medium uppercase tracking-wider px-6 py-4">Featured</th>
                <th className="text-right text-gray-400 text-xs font-medium uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{project.title}</p>
                    <p className="text-gray-500 text-sm truncate max-w-xs">{project.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm bg-white/10 px-2.5 py-1 rounded-lg">{project.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    {project.published ? (
                      <span className="flex items-center gap-1.5 text-green-400 text-sm">
                        <Eye className="w-3.5 h-3.5" /> Published
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-yellow-400 text-sm">
                        <EyeOff className="w-3.5 h-3.5" /> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {project.featured && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="p-2 text-gray-500 hover:text-[#0072BB] hover:bg-[#0072BB]/10 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <DeleteProjectButton id={project.id} title={project.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  );
}
