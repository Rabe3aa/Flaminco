import { prisma } from "@/lib/prisma";
import { FolderKanban, FileText, Briefcase, Eye, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [projectCount, blogCount, serviceCount, publishedProjects, publishedBlogs, publishedServices, recentProjects, recentBlogs] =
    await Promise.all([
      prisma.project.count(),
      prisma.blog.count(),
      prisma.service.count(),
      prisma.project.count({ where: { published: true } }),
      prisma.blog.count({ where: { published: true } }),
      prisma.service.count({ where: { published: true } }),
      prisma.project.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
      prisma.blog.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
    ]);

  const stats = [
    { label: "Projects", value: projectCount, published: publishedProjects, icon: FolderKanban, href: "/admin/projects", color: "bg-blue-500" },
    { label: "Blogs", value: blogCount, published: publishedBlogs, icon: FileText, href: "/admin/blogs", color: "bg-purple-500" },
    { label: "Services", value: serviceCount, published: publishedServices, icon: Briefcase, href: "/admin/services", color: "bg-emerald-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome to Flaminco Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <Eye className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" />
            </div>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            <div className="flex items-center gap-1 mt-3 text-xs text-green-400">
              <CheckCircle className="w-3 h-3" />
              {stat.published} published
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
            <Link href="/admin/projects" className="text-[#0072BB] text-sm hover:underline">
              View all
            </Link>
          </div>
          {recentProjects.length === 0 ? (
            <p className="text-gray-500 text-sm">No projects yet</p>
          ) : (
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/admin/projects/${project.id}`}
                  className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${project.published ? "bg-green-400" : "bg-yellow-400"}`} />
                    <div>
                      <p className="text-white text-sm font-medium">{project.title}</p>
                      <p className="text-gray-500 text-xs">{project.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Clock className="w-3 h-3" />
                    {project.updatedAt.toLocaleDateString()}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Blogs</h2>
            <Link href="/admin/blogs" className="text-[#0072BB] text-sm hover:underline">
              View all
            </Link>
          </div>
          {recentBlogs.length === 0 ? (
            <p className="text-gray-500 text-sm">No blogs yet</p>
          ) : (
            <div className="space-y-3">
              {recentBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/admin/blogs/${blog.id}`}
                  className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${blog.published ? "bg-green-400" : "bg-yellow-400"}`} />
                    <div>
                      <p className="text-white text-sm font-medium">{blog.title}</p>
                      <p className="text-gray-500 text-xs">{blog.author || "No author"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Clock className="w-3 h-3" />
                    {blog.updatedAt.toLocaleDateString()}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
