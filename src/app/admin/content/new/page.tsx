import { upsertContent } from "@/lib/actions/content";
import { ContentForm } from "@/components/admin/content-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/content"
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Add Content</h1>
          <p className="text-gray-400 mt-1">Add a new content item to any page</p>
        </div>
      </div>

      <ContentForm action={upsertContent} />
    </div>
  );
}
