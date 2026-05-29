"use client";

import { useState, useTransition } from "react";
import { Save, Loader2, Plus, Trash2, GripVertical, Building2 } from "lucide-react";
import { ImageUploader } from "./image-uploader";

interface Company {
  id: string;
  name: string;
  logo: string;
  url: string;
  order: number;
  published: boolean;
}

export function TrustedCompaniesClient({
  initialCompanies,
}: {
  initialCompanies: Company[];
}) {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const addCompany = () => {
    setCompanies((prev) => [
      ...prev,
      {
        id: `new_${Date.now()}`,
        name: "",
        logo: "",
        url: "",
        order: prev.length,
        published: true,
      },
    ]);
  };

  const removeCompany = (index: number) => {
    setCompanies((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCompany = (index: number, field: keyof Company, value: string | number | boolean) => {
    setCompanies((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  };

  const moveCompany = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= companies.length) return;
    const updated = [...companies];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setCompanies(updated.map((c, i) => ({ ...c, order: i })));
  };

  const handleSave = () => {
    startTransition(async () => {
      const ordered = companies.map((c, i) => ({ ...c, order: i }));
      const res = await fetch("/api/admin/trusted-companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companies: ordered }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Trusted Companies</h1>
          <p className="text-gray-400 mt-1">
            Manage company logos that appear on the homepage
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center gap-2 bg-[#0072BB] hover:bg-[#005a94] text-white px-5 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saved ? "Saved!" : "Save All"}
        </button>
      </div>

      <div className="space-y-4">
        {companies.map((company, index) => (
          <div
            key={company.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-5"
          >
            <div className="flex items-start gap-4">
              {/* Drag handle + order controls */}
              <div className="flex flex-col items-center gap-1 pt-2">
                <button
                  type="button"
                  onClick={() => moveCompany(index, "up")}
                  disabled={index === 0}
                  className="text-gray-500 hover:text-white disabled:opacity-30 transition-colors text-xs"
                  title="Move up"
                >
                  ▲
                </button>
                <GripVertical className="w-4 h-4 text-gray-600" />
                <button
                  type="button"
                  onClick={() => moveCompany(index, "down")}
                  disabled={index === companies.length - 1}
                  className="text-gray-500 hover:text-white disabled:opacity-30 transition-colors text-xs"
                  title="Move down"
                >
                  ▼
                </button>
              </div>

              {/* Logo */}
              <div className="w-48 shrink-0">
                <ImageUploader
                  label="Logo"
                  value={company.logo ? [company.logo] : []}
                  onChange={(urls) =>
                    updateCompany(index, "logo", urls[0] || "")
                  }
                  multiple={false}
                />
              </div>

              {/* Fields */}
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      Company Name *
                    </label>
                    <input
                      value={company.name}
                      onChange={(e) =>
                        updateCompany(index, "name", e.target.value)
                      }
                      placeholder="Company name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      Website URL (optional)
                    </label>
                    <input
                      value={company.url}
                      onChange={(e) =>
                        updateCompany(index, "url", e.target.value)
                      }
                      placeholder="https://example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={company.published}
                      onChange={(e) =>
                        updateCompany(index, "published", e.target.checked)
                      }
                      className="w-4 h-4 rounded bg-white/10 border-white/20 text-[#0072BB] focus:ring-[#0072BB]"
                    />
                    <span className="text-gray-300 text-sm">Published</span>
                  </label>
                </div>
              </div>

              {/* Delete */}
              <button
                type="button"
                onClick={() => removeCompany(index)}
                className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all shrink-0"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {companies.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <Building2 className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500">
              No companies added yet. Click the button below to add one.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={addCompany}
          className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-white/15 hover:border-[#0072BB]/50 rounded-2xl text-gray-400 hover:text-[#0072BB] transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Company
        </button>
      </div>
    </div>
  );
}
