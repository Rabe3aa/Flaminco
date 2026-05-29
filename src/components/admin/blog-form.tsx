"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Save, Loader2 } from "lucide-react";
import { ImageUploader } from "./image-uploader";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 bg-[#0072BB] hover:bg-[#005a94] text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50"
    >
      {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
      {pending ? "Saving..." : "Save Blog"}
    </button>
  );
}

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string;
  published: boolean;
}

export function BlogForm({
  initialData,
  action,
}: {
  initialData?: BlogFormData;
  action: (formData: FormData) => Promise<void>;
}) {
  const defaults: BlogFormData = initialData || {
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    author: "",
    tags: "",
    published: false,
  };

  const [coverImageUrls, setCoverImageUrls] = useState<string[]>(
    defaults.coverImage ? [defaults.coverImage] : []
  );

  return (
    <form
      action={async (formData) => {
        await action(formData);
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white">Blog Details</h2>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
              <input
                name="title"
                defaultValue={defaults.title}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
                placeholder="Blog title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
              <textarea
                name="excerpt"
                defaultValue={defaults.excerpt}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all resize-none"
                placeholder="A short summary of the blog post"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Content *</label>
              <textarea
                name="content"
                defaultValue={defaults.content}
                required
                rows={15}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all resize-none font-mono text-sm"
                placeholder="Write your blog content here... (Markdown supported)"
              />
              <p className="text-gray-500 text-xs mt-1">Markdown formatting is supported</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white">Publish</h2>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                name="published"
                type="checkbox"
                defaultChecked={defaults.published}
                className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#0072BB] focus:ring-[#0072BB]"
              />
              <span className="text-gray-300 text-sm">Published</span>
            </label>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white">Metadata</h2>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Author</label>
              <input
                name="author"
                defaultValue={defaults.author}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
                placeholder="Author name"
              />
            </div>

            <div>
              <input
                type="hidden"
                name="coverImage"
                value={coverImageUrls[0] || ""}
              />
              <ImageUploader
                label="Cover Image"
                value={coverImageUrls}
                onChange={(urls) => setCoverImageUrls(urls)}
                multiple={false}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
              <input
                name="tags"
                defaultValue={defaults.tags}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
                placeholder="marketing, branding (comma-separated)"
              />
            </div>
          </div>

          <SaveButton />
        </div>
      </div>
    </form>
  );
}
