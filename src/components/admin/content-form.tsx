"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ImageUploader } from "./image-uploader";

interface ContentFormData {
  page: string;
  section: string;
  key: string;
  value: string;
  type: string;
}

const PAGES = ["home", "about", "services", "contact", "footer", "header", "blogs", "projects"];
const TYPES = ["text", "html", "image", "json"];

export function ContentForm({
  initialData,
  action,
}: {
  initialData?: ContentFormData;
  action: (formData: FormData) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const defaults: ContentFormData = initialData || {
    page: "home",
    section: "",
    key: "",
    value: "",
    type: "text",
  };

  const [selectedType, setSelectedType] = useState(defaults.type);
  const [imageUrls, setImageUrls] = useState<string[]>(
    defaults.type === "image" && defaults.value ? [defaults.value] : []
  );

  return (
    <form
      action={async (formData) => {
        setLoading(true);
        try {
          await action(formData);
          router.push("/admin/content");
          router.refresh();
        } catch {
          setLoading(false);
        }
      }}
      className="space-y-6 max-w-2xl"
    >
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <h2 className="text-lg font-semibold text-white">Content Item</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Page *</label>
            <select
              name="page"
              defaultValue={defaults.page}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
            >
              {PAGES.map((p) => (
                <option key={p} value={p} className="bg-[#111] text-white">
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Section *</label>
            <input
              name="section"
              defaultValue={defaults.section}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
              placeholder="e.g. hero, features"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Key *</label>
            <input
              name="key"
              defaultValue={defaults.key}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
              placeholder="e.g. title, description"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
          <select
            name="type"
            defaultValue={defaults.type}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
          >
            {TYPES.map((t) => (
              <option key={t} value={t} className="bg-[#111] text-white">
                {t}
              </option>
            ))}
          </select>
        </div>

        {selectedType === "image" ? (
          <div>
            <input
              type="hidden"
              name="value"
              value={imageUrls[0] || ""}
            />
            <ImageUploader
              label="Image Value"
              value={imageUrls}
              onChange={(urls) => setImageUrls(urls)}
              multiple={false}
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Value *</label>
            <textarea
              name="value"
              defaultValue={defaults.value}
              required
              rows={8}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all resize-none"
              placeholder="Content value"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 bg-[#0072BB] hover:bg-[#005a94] text-white font-semibold px-6 py-3 rounded-xl transition-all disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Save className="w-5 h-5" />
            Save Content
          </>
        )}
      </button>
    </form>
  );
}
