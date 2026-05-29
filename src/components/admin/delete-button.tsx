"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";

export function DeleteButton({
  onDelete,
  itemName,
}: {
  onDelete: () => Promise<void>;
  itemName: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-red-400 text-sm">Delete {itemName}?</span>
        <button
          onClick={async () => {
            setLoading(true);
            await onDelete();
            setLoading(false);
            setConfirming(false);
          }}
          disabled={loading}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Yes"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-lg hover:bg-white/20 transition-colors"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
      title={`Delete ${itemName}`}
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
