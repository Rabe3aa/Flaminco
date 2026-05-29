import { getAllPageContent } from "@/lib/actions/content";
import Link from "next/link";
import { Plus, Settings } from "lucide-react";
import { ContentTable } from "./content-table";

const PAGES = [
  { id: "home", label: "Home Page" },
  { id: "about", label: "About Page" },
  { id: "services", label: "Services Page" },
  { id: "contact", label: "Contact Page" },
  { id: "footer", label: "Footer" },
  { id: "header", label: "Header" },
];

export default async function AdminContentPage() {
  const allContent = await getAllPageContent();

  const grouped: Record<string, typeof allContent> = {};
  for (const item of allContent) {
    if (!grouped[item.page]) grouped[item.page] = [];
    grouped[item.page].push(item);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Page Content</h1>
          <p className="text-gray-400 mt-1">Manage all website content</p>
        </div>
        <Link
          href="/admin/content/new"
          className="flex items-center gap-2 bg-[#0072BB] hover:bg-[#005a94] text-white px-4 py-2.5 rounded-xl font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Content
        </Link>
      </div>

      {PAGES.map((page) => (
        <div key={page.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
            <Settings className="w-5 h-5 text-[#0072BB]" />
            <h2 className="text-lg font-semibold text-white">{page.label}</h2>
            <span className="text-gray-500 text-sm ml-auto">
              {(grouped[page.id] || []).length} items
            </span>
          </div>
          <ContentTable items={grouped[page.id] || []} />
        </div>
      ))}

      {Object.keys(grouped)
        .filter((key) => !PAGES.some((p) => p.id === key))
        .map((key) => (
          <div key={key} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
              <Settings className="w-5 h-5 text-[#0072BB]" />
              <h2 className="text-lg font-semibold text-white capitalize">{key}</h2>
              <span className="text-gray-500 text-sm ml-auto">
                {grouped[key].length} items
              </span>
            </div>
            <ContentTable items={grouped[key]} />
          </div>
        ))}
    </div>
  );
}
