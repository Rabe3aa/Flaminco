import { prisma } from "@/lib/prisma";
import { projects as staticProjects, getCategories as getStaticCategories } from "@/data/projects";

// ─── Projects ───────────────────────────────────────────────────────────────

export async function getProjectsForDisplay() {
  try {
    const dbProjects = await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    if (dbProjects.length > 0) {
      return dbProjects.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: p.category,
        shortDescription: p.description.substring(0, 120) + (p.description.length > 120 ? "..." : ""),
        fullDescription: p.description,
        image: p.thumbnail || p.images[0] || "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800",
        gallery: p.images,
        featured: p.featured,
        colSpan: p.featured ? "md:col-span-2" : undefined,
        client: p.client || "",
        year: p.year || "",
        services: p.tags,
      }));
    }
  } catch (error) {
    console.error("[data] getProjectsForDisplay failed:", error);
  }

  return staticProjects;
}

export async function getProjectBySlugForDisplay(slug: string) {
  try {
    const p = await prisma.project.findUnique({ where: { slug } });
    if (p) {
      return {
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: p.category,
        shortDescription: p.description.substring(0, 120) + (p.description.length > 120 ? "..." : ""),
        fullDescription: p.description,
        image: p.thumbnail || p.images[0] || "",
        gallery: p.images,
        featured: p.featured,
        client: p.client || "",
        year: p.year || "",
        services: p.tags,
        layout: p.layout as unknown[] | null,
      };
    }
  } catch (error) {
    console.error("[data] getProjectBySlugForDisplay failed:", error);
  }

  return staticProjects.find((p) => p.slug === slug) || null;
}

export async function getCategoriesForDisplay() {
  try {
    // Use Category model for proper ordering, filtered to only categories that have published projects
    const categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
    });

    if (categories.length > 0) {
      const publishedProjects = await prisma.project.findMany({
        where: { published: true },
        select: { category: true },
        distinct: ["category"],
      });
      const usedCategories = new Set(publishedProjects.map((p: { category: string }) => p.category));
      const filtered = categories
        .filter((c) => usedCategories.has(c.name))
        .map((c) => c.name);
      if (filtered.length > 0) {
        return ["All", ...filtered];
      }
    }
  } catch (error) {
    console.error("[data] getCategoriesForDisplay failed:", error);
  }

  return getStaticCategories();
}

export async function getFeaturedProjectsForDisplay() {
  try {
    const dbProjects = await prisma.project.findMany({
      where: { published: true, featured: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: 6,
    });

    if (dbProjects.length > 0) {
      return dbProjects.map((p) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        overview: p.description,
        benefits: p.tags,
      }));
    }
  } catch (error) {
    console.error("[data] getFeaturedProjectsForDisplay failed:", error);
  }

  return null;
}

// ─── Blogs ──────────────────────────────────────────────────────────────────

export async function getBlogsForDisplay() {
  try {
    const dbBlogs = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });

    if (dbBlogs.length > 0) {
      return dbBlogs.map((b) => ({
        id: b.id,
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt || "",
        content: b.content,
        coverImage: b.coverImage || "",
        author: b.author || "",
        tags: b.tags,
        createdAt: b.createdAt,
      }));
    }
  } catch (error) {
    console.error("[data] getBlogsForDisplay failed:", error);
  }

  return null;
}

export async function getBlogBySlugForDisplay(slug: string) {
  try {
    const b = await prisma.blog.findUnique({ where: { slug } });
    if (b && b.published) {
      return {
        id: b.id,
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt || "",
        content: b.content,
        coverImage: b.coverImage || "",
        author: b.author || "",
        tags: b.tags,
        createdAt: b.createdAt,
      };
    }
  } catch (error) {
    console.error("[data] getBlogBySlugForDisplay failed:", error);
  }

  return null;
}

// ─── Services ───────────────────────────────────────────────────────────────

export async function getServicesForDisplay(): Promise<{
  id: string;
  title: string;
  description: string;
  icon: string;
  images: string[];
  thumbnail: string | null;
  layout: unknown[] | null;
}[] | null> {
  try {
    const dbServices = await prisma.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });

    if (dbServices.length > 0) {
      return dbServices.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description || "",
        icon: s.icon || "Gift",
        images: s.images,
        thumbnail: s.thumbnail ?? null,
        layout: s.layout as unknown[] | null,
      }));
    }

    return null;
  } catch (error) {
    console.error("[data] getServicesForDisplay failed:", error);
    return null;
  }
}
