"use client";

import { useState } from "react";
import { ServiceForm } from "./service-form";
import { PageBuilder } from "./page-builder/page-builder";
import type { Block } from "@/lib/page-builder/types";

interface ServiceEditTabsProps {
  initialData: {
    title: string;
    description: string;
    icon: string;
    images: string;
    thumbnail: string;
    order: number;
    published: boolean;
  };
  action: (formData: FormData) => Promise<void>;
  serviceId: string;
  initialBlocks: Block[];
}

export function ServiceEditTabs({
  initialData,
  action,
  serviceId,
  initialBlocks,
}: ServiceEditTabsProps) {
  const [activeTab, setActiveTab] = useState<"details" | "layout">("details");

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex border-b border-white/10">
        {(["details", "layout"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-semibold capitalize transition-all relative ${
              activeTab === tab
                ? "text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab === "details" ? "Details" : "Layout Builder"}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0072BB] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Both panels stay mounted; only visibility toggles — preserves unsaved state */}
      <div style={{ display: activeTab === "details" ? "block" : "none" }}>
        <ServiceForm initialData={initialData} action={action} />
      </div>
      <div style={{ display: activeTab === "layout" ? "block" : "none" }}>
        <PageBuilder
          entityId={serviceId}
          saveEndpoint="/api/admin/service-layout"
          initialBlocks={initialBlocks}
          context="service"
        />
      </div>
    </div>
  );
}
