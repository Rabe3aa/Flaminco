import { getProjectsForDisplay, getCategoriesForDisplay } from "@/lib/data";
import { ProjectsClient } from "@/components/layout/projects-client";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const [projects, categories] = await Promise.all([
    getProjectsForDisplay(),
    getCategoriesForDisplay(),
  ]);

  return <ProjectsClient projects={projects} categories={categories} />;
}
