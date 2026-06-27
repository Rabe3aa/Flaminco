"use client";

import { deleteContent } from "@/lib/actions/content";
import { DeleteButton } from "@/components/admin/delete-button";
import Link from "next/link";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

interface ContentItem {
  id: string;
  page: string;
  section: string;
  key: string;
  value: string;
  type: string;
}

export function ContentTable({ items }: { items: ContentItem[] }) {
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="px-6 py-8 text-center">
        <p className="text-gray-500 text-sm">No content items for this page yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
    <table className="w-full min-w-[640px]">
      <thead>
        <tr className="border-b border-white/5">
          <th className="text-left text-gray-400 text-xs font-medium uppercase tracking-wider px-6 py-3">Section</th>
          <th className="text-left text-gray-400 text-xs font-medium uppercase tracking-wider px-6 py-3">Key</th>
          <th className="text-left text-gray-400 text-xs font-medium uppercase tracking-wider px-6 py-3">Value</th>
          <th className="text-left text-gray-400 text-xs font-medium uppercase tracking-wider px-6 py-3">Type</th>
          <th className="text-right text-gray-400 text-xs font-medium uppercase tracking-wider px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {items.map((item) => (
          <tr key={item.id} className="hover:bg-white/5 transition-colors">
            <td className="px-6 py-3">
              <span className="text-gray-300 text-sm">{item.section}</span>
            </td>
            <td className="px-6 py-3">
              <span className="text-white text-sm font-mono">{item.key}</span>
            </td>
            <td className="px-6 py-3">
              <span className="text-gray-400 text-sm truncate block max-w-xs">
                {item.value.length > 80 ? item.value.substring(0, 80) + "..." : item.value}
              </span>
            </td>
            <td className="px-6 py-3">
              <span className="text-gray-500 text-xs bg-white/5 px-2 py-0.5 rounded">{item.type}</span>
            </td>
            <td className="px-6 py-3">
              <div className="flex items-center justify-end gap-2">
                <Link
                  href={`/admin/content/${item.id}`}
                  className="p-2 text-gray-500 hover:text-[#0072BB] hover:bg-[#0072BB]/10 rounded-lg transition-all"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <DeleteButton
                  itemName={`${item.section}.${item.key}`}
                  onDelete={async () => {
                    await deleteContent(item.id);
                    router.refresh();
                  }}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
