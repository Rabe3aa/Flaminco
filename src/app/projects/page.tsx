import { getProjectsForDisplay, getCategoriesForDisplay } from "@/lib/data";
import { ProjectsClient } from "@/components/layout/projects-client";

export const revalidate = 3600;

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    getProjectsForDisplay().catch(() => null),
    getCategoriesForDisplay().catch(() => ["All"]),
  ]);

  return <ProjectsClient projects={projects ?? []} categories={categories} />;
}
