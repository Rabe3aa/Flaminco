import { getCategoryProjectCounts } from "@/lib/actions/categories";
import { CategoriesClient } from "@/components/admin/categories-client";

export default async function CategoriesPage() {
  const categories = await getCategoryProjectCounts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Categories</h1>
        <p className="text-gray-400 mt-1">
          Manage project categories. Renaming a category updates all its projects automatically.
        </p>
      </div>
      <CategoriesClient categories={categories} />
    </div>
  );
}
