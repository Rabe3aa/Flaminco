"use client";

import { DeleteButton } from "@/components/admin/delete-button";
import { useRouter } from "next/navigation";

export function DeleteBlogButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();

  return (
    <DeleteButton
      itemName={title}
      onDelete={async () => {
        const res = await fetch("/api/admin/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "blog", id }),
        });
        if (!res.ok) throw new Error("Failed to delete blog");
        router.refresh();
      }}
    />
  );
}
