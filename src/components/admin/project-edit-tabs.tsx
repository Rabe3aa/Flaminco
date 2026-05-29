"use client";

import { useState } from "react";
import { Settings, LayoutTemplate } from "lucide-react";
import { ProjectForm } from "./project-form";
import { PageBuilder } from "./page-builder/page-builder";
import type { Block } from "@/lib/page-builder/types";

interface ProjectEditTabsProps {
  projectId: string;
  initialData: {
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
  };
  action: (formData: FormData) => Promise<void>;
  categories: string[];
  initialBlocks: Block[];
}

export function ProjectEditTabs({
  projectId,
  initialData,
  action,
  categories,
  initialBlocks,
}: ProjectEditTabsProps) {
  const [activeTab, setActiveTab] = useState<"details" | "layout">("details");

  return (
    <div className="space-y-6">
      {/* Tab switcher */}
      <div className="flex gap-1 bg-white/5 border border-white/10 rounded-xl p-1 w-fit">
        <button
          onClick={() => setActiveTab("details")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "details"
              ? "bg-[#0072BB] text-white shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Settings size={16} />
          Project Details
        </button>
        <button
          onClick={() => setActiveTab("layout")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "layout"
              ? "bg-[#0072BB] text-white shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <LayoutTemplate size={16} />
          Page Layout
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "details" ? (
        <ProjectForm initialData={initialData} action={action} categories={categories} />
      ) : (
        <PageBuilder projectId={projectId} initialBlocks={initialBlocks} />
      )}
    </div>
  );
}
