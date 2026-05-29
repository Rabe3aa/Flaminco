"use client";

import { useState, useTransition } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Loader2,
  FolderOpen,
  ArrowRightLeft,
  AlertTriangle,
} from "lucide-react";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  moveProjectsToCategory,
  seedDefaultCategories,
} from "@/lib/actions/categories";
import { useRouter } from "next/navigation";

type CategoryWithCount = {
  id: string;
  name: string;
  slug: string;
  order: number;
  projectCount: number;
};

export function CategoriesClient({
  categories,
}: {
  categories: CategoryWithCount[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // New category
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");

  // Edit
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  // Delete confirmation
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Move dialog
  const [moveFrom, setMoveFrom] = useState<CategoryWithCount | null>(null);
  const [moveTo, setMoveTo] = useState("");

  // Error
  const [error, setError] = useState("");

  function refresh() {
    router.refresh();
  }

  async function handleCreate() {
    if (!newName.trim()) return;
    setError("");
    const fd = new FormData();
    fd.set("name", newName);
    startTransition(async () => {
      try {
        await createCategory(fd);
        setNewName("");
        setShowAdd(false);
        refresh();
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to create");
      }
    });
  }

  async function handleUpdate(id: string) {
    if (!editName.trim()) return;
    setError("");
    const fd = new FormData();
    fd.set("name", editName);
    startTransition(async () => {
      try {
        await updateCategory(id, fd);
        setEditingId(null);
        refresh();
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to update");
      }
    });
  }

  async function handleDelete(id: string) {
    setError("");
    startTransition(async () => {
      try {
        await deleteCategory(id);
        setDeletingId(null);
        refresh();
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to delete");
        setDeletingId(null);
      }
    });
  }

  async function handleMoveAll() {
    if (!moveFrom || !moveTo) return;
    setError("");
    startTransition(async () => {
      try {
        // Get all project IDs in source category — we pass empty array to move ALL
        const res = await fetch(
          `/api/admin/category-projects?category=${encodeURIComponent(moveFrom.name)}`
        );
        const data = await res.json();
        if (data.ids?.length > 0) {
          await moveProjectsToCategory(data.ids, moveTo);
        }
        setMoveFrom(null);
        setMoveTo("");
        refresh();
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to move");
      }
    });
  }

  async function handleSeedDefaults() {
    setError("");
    startTransition(async () => {
      try {
        await seedDefaultCategories();
        refresh();
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to seed");
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
          <AlertTriangle size={16} className="shrink-0" />
          {error}
          <button onClick={() => setError("")} className="ml-auto">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Actions bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0072BB] hover:bg-[#005a94] text-white font-semibold rounded-xl transition-all text-sm"
        >
          <Plus size={16} />
          Add Category
        </button>

        {categories.length === 0 && (
          <button
            onClick={handleSeedDefaults}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 font-medium rounded-xl transition-all text-sm border border-white/10"
          >
            {isPending ? <Loader2 size={16} className="animate-spin" /> : <FolderOpen size={16} />}
            Load Default Categories
          </button>
        )}
      </div>

      {/* Add new category inline */}
      {showAdd && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            placeholder="Category name"
            autoFocus
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all text-sm"
          />
          <button
            onClick={handleCreate}
            disabled={isPending || !newName.trim()}
            className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl hover:bg-emerald-500/30 transition-all disabled:opacity-50"
          >
            {isPending ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
          </button>
          <button
            onClick={() => { setShowAdd(false); setNewName(""); }}
            className="p-2.5 bg-white/5 text-gray-400 rounded-xl hover:bg-white/10 transition-all"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Categories list */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {categories.length === 0 ? (
          <div className="p-12 text-center">
            <FolderOpen className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No categories yet</p>
            <p className="text-gray-600 text-xs mt-1">
              Add your first category or load the defaults
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {categories.map((cat, index) => (
              <div
                key={cat.id}
                className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors"
              >
                {/* Order number */}
                <span className="text-xs font-bold text-gray-600 w-6 text-center">
                  {index + 1}
                </span>

                {/* Name (editable) */}
                {editingId === cat.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleUpdate(cat.id);
                        if (e.key === "Escape") setEditingId(null);
                      }}
                      autoFocus
                      className="flex-1 bg-white/5 border border-[#0072BB]/50 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
                    />
                    <button
                      onClick={() => handleUpdate(cat.id)}
                      disabled={isPending}
                      className="p-1.5 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-all"
                    >
                      {isPending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-1.5 text-gray-400 hover:bg-white/10 rounded-lg transition-all"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <span className="flex-1 text-white font-medium text-sm">
                    {cat.name}
                  </span>
                )}

                {/* Project count badge */}
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 text-gray-400">
                  {cat.projectCount} project{cat.projectCount !== 1 ? "s" : ""}
                </span>

                {/* Actions */}
                {editingId !== cat.id && (
                  <div className="flex items-center gap-1">
                    {/* Move projects */}
                    {cat.projectCount > 0 && (
                      <button
                        onClick={() => {
                          setMoveFrom(cat);
                          setMoveTo("");
                        }}
                        className="p-1.5 text-gray-500 hover:text-[#0072BB] hover:bg-[#0072BB]/10 rounded-lg transition-all"
                        title="Move projects to another category"
                      >
                        <ArrowRightLeft size={14} />
                      </button>
                    )}

                    {/* Edit */}
                    <button
                      onClick={() => {
                        setEditingId(cat.id);
                        setEditName(cat.name);
                      }}
                      className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                      title="Rename"
                    >
                      <Pencil size={14} />
                    </button>

                    {/* Delete */}
                    {deletingId === cat.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(cat.id)}
                          disabled={isPending}
                          className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition-all text-xs font-bold"
                        >
                          {isPending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                        </button>
                        <button
                          onClick={() => setDeletingId(null)}
                          className="p-1.5 text-gray-400 hover:bg-white/10 rounded-lg transition-all"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeletingId(cat.id)}
                        className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Move projects modal */}
      {moveFrom && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-5">
            <div>
              <h3 className="text-lg font-bold text-white">Move Projects</h3>
              <p className="text-gray-400 text-sm mt-1">
                Move all <span className="text-white font-semibold">{moveFrom.projectCount}</span> project(s) from{" "}
                <span className="text-white font-semibold">&ldquo;{moveFrom.name}&rdquo;</span> to:
              </p>
            </div>

            <select
              value={moveTo}
              onChange={(e) => setMoveTo(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#0072BB] transition-all"
            >
              <option value="" className="bg-[#111]">Select target category...</option>
              {categories
                .filter((c) => c.id !== moveFrom.id)
                .map((c) => (
                  <option key={c.id} value={c.name} className="bg-[#111] text-white">
                    {c.name} ({c.projectCount} projects)
                  </option>
                ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setMoveFrom(null); setMoveTo(""); }}
                className="px-4 py-2 text-gray-400 hover:text-white text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleMoveAll}
                disabled={isPending || !moveTo}
                className="flex items-center gap-2 px-5 py-2 bg-[#0072BB] hover:bg-[#005a94] text-white font-semibold rounded-xl transition-all text-sm disabled:opacity-50"
              >
                {isPending ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <ArrowRightLeft size={14} />
                )}
                Move All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
