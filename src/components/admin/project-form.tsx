"use client";

import { useState, useRef } from "react";
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
      {pending ? "Saving..." : "Save Project"}
    </button>
  );
}

interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  client: string;
  year: string;
  tags: string;
  images: string;
  thumbnail: string;
  featured: boolean;
  published: boolean;
  order: number;
}

export function ProjectForm({
  initialData,
  action,
  categories = [],
}: {
  initialData?: ProjectFormData;
  action: (formData: FormData) => Promise<void>;
  categories?: string[];
}) {
  const defaults: ProjectFormData = initialData || {
    title: "",
    description: "",
    category: categories[0] || "",
    client: "",
    year: new Date().getFullYear().toString(),
    tags: "",
    images: "",
    thumbnail: "",
    featured: false,
    published: true,
    order: 0,
  };

  const [thumbnailUrls, setThumbnailUrls] = useState<string[]>(
    defaults.thumbnail ? [defaults.thumbnail] : []
  );

  const thumbnailRef = useRef<HTMLInputElement>(null);

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
            <h2 className="text-lg font-semibold text-white">Project Details</h2>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
              <input
                name="title"
                defaultValue={defaults.title}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
                placeholder="Project title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
              <textarea
                name="description"
                defaultValue={defaults.description}
                required
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all resize-none"
                placeholder="Project description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                <select
                  name="category"
                  defaultValue={defaults.category}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
                >
                  {categories.map((cat: string) => (
                    <option key={cat} value={cat} className="bg-[#111] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Client</label>
                <input
                  name="client"
                  defaultValue={defaults.client}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
                  placeholder="Client name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                <input
                  name="year"
                  defaultValue={defaults.year}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
                  placeholder="2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Display Order</label>
                <input
                  name="order"
                  type="number"
                  defaultValue={defaults.order}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Key Deliverables / Services</label>
              <input
                name="tags"
                defaultValue={defaults.tags}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
                placeholder="Custom Branding, Premium Packaging, Strategic Design (comma-separated)"
              />
              <p className="text-gray-500 text-xs mt-1">These appear as &quot;Key Deliverables&quot; on the project page</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white">Thumbnail</h2>
            <p className="text-xs text-gray-500">Gallery images are managed in the Page Layout tab.</p>

            <input
              ref={thumbnailRef}
              type="hidden"
              name="thumbnail"
              value={thumbnailUrls[0] || ""}
            />
            {/* Keep images field empty so existing gallery data is preserved */}
            <input type="hidden" name="images" value="" />

            <ImageUploader
              label="Thumbnail Image"
              value={thumbnailUrls}
              onChange={(urls) => setThumbnailUrls(urls)}
              multiple={false}
            />
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

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                name="featured"
                type="checkbox"
                defaultChecked={defaults.featured}
                className="w-5 h-5 rounded bg-white/10 border-white/20 text-[#0072BB] focus:ring-[#0072BB]"
              />
              <span className="text-gray-300 text-sm">Featured on homepage</span>
            </label>
          </div>

          <SaveButton />
        </div>
      </div>
    </form>
  );
}
