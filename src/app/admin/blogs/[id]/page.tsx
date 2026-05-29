import { getBlogById, updateBlog } from "@/lib/actions/blogs";
import { BlogForm } from "@/components/admin/blog-form";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) notFound();

  const initialData = {
    title: blog.title,
    excerpt: blog.excerpt || "",
    content: blog.content,
    coverImage: blog.coverImage || "",
    author: blog.author || "",
    tags: blog.tags.join(", "),
    published: blog.published,
  };

  const updateWithId = updateBlog.bind(null, id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blogs"
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Blog</h1>
          <p className="text-gray-400 mt-1">{blog.title}</p>
        </div>
      </div>

      <BlogForm initialData={initialData} action={updateWithId} />
    </div>
  );
}
