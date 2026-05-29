"use client";

import { useState, useTransition, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  Save,
  Loader2,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronRight,
  Type,
  AlignLeft,
  Image,
  LayoutGrid,
  SeparatorHorizontal,
  RectangleHorizontal,
  Columns2,
  Quote,
  Check,
} from "lucide-react";
import type { Block, BlockType, BLOCK_DEFINITIONS } from "@/lib/page-builder/types";
import { SortableBlock } from "./sortable-block";
import { BlockEditor } from "./block-editor";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Type, AlignLeft, Image, LayoutGrid, SeparatorHorizontal, RectangleHorizontal, Columns2, Quote,
};

const BLOCK_DEFS: typeof BLOCK_DEFINITIONS = [
  {
    type: "heading",
    label: "Heading",
    icon: "Type",
    description: "Section title or heading",
    defaultData: { text: "Section Title", level: "h2", alignment: "left" },
  },
  {
    type: "text",
    label: "Text",
    icon: "AlignLeft",
    description: "Paragraph or rich text content",
    defaultData: { content: "Enter your text here...", alignment: "left" },
  },
  {
    type: "image",
    label: "Image",
    icon: "Image",
    description: "Single image with optional caption",
    defaultData: { src: "", alt: "", caption: "", fullWidth: true, rounded: true },
  },
  {
    type: "gallery",
    label: "Gallery",
    icon: "LayoutGrid",
    description: "Grid of multiple images",
    defaultData: { images: [], columns: 3 },
  },
  {
    type: "spacer",
    label: "Spacer",
    icon: "SeparatorHorizontal",
    description: "Vertical spacing between sections",
    defaultData: { height: "md" },
  },
  {
    type: "banner",
    label: "Banner",
    icon: "RectangleHorizontal",
    description: "Colored background section with text",
    defaultData: { text: "Banner text", backgroundColor: "#0072BB", textColor: "#ffffff", padding: "md" },
  },
  {
    type: "two-columns",
    label: "Two Columns",
    icon: "Columns2",
    description: "Side-by-side layout",
    defaultData: {
      left: { type: "text", content: "Left column content" },
      right: { type: "text", content: "Right column content" },
      split: "50-50",
    },
  },
  {
    type: "quote",
    label: "Quote",
    icon: "Quote",
    description: "Highlighted quote or testimonial",
    defaultData: { text: "Quote text here", author: "" },
  },
];

function generateId() {
  return `block_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function PageBuilder({
  projectId,
  entityId,
  saveEndpoint = "/api/admin/project-layout",
  initialBlocks,
  context = "project",
}: {
  projectId?: string;
  entityId?: string;
  saveEndpoint?: string;
  initialBlocks: Block[];
  context?: "project" | "service";
}) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showBlockPicker, setShowBlockPicker] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  function addBlock(type: BlockType) {
    const def = BLOCK_DEFS.find((d) => d.type === type);
    if (!def) return;

    const newBlock: Block = {
      id: generateId(),
      type,
      data: JSON.parse(JSON.stringify(def.defaultData)),
    } as Block;

    setBlocks((prev) => [...prev, newBlock]);
    setExpandedId(newBlock.id);
    setShowBlockPicker(false);
  }

  function updateBlock(updated: Block) {
    setBlocks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  }

  function deleteBlock(id: string) {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    if (expandedId === id) setExpandedId(null);
  }

  function handleSave() {
    const id = entityId || projectId;
    setSaved(false);
    startTransition(async () => {
      const res = await fetch(saveEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: id, entityId: id, blocks }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Page Layout Builder</h2>
          <p className="text-gray-500 text-xs mt-0.5">
            Drag and drop blocks to design the {context} page. Changes reflect immediately after saving.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0072BB] hover:bg-[#005a94] text-white font-semibold rounded-xl transition-all disabled:opacity-50 text-sm"
        >
          {isPending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : saved ? (
            <Check size={16} />
          ) : (
            <Save size={16} />
          )}
          {isPending ? "Saving..." : saved ? "Saved!" : "Save Layout"}
        </button>
      </div>

      {/* Block canvas */}
      <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 min-h-[300px]">
        {blocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
              <LayoutGrid size={24} className="text-gray-600" />
            </div>
            <p className="text-gray-400 text-sm font-medium mb-1">No blocks yet</p>
            <p className="text-gray-600 text-xs mb-6">Add blocks from the panel below to design your {context} page</p>
            <button
              onClick={() => setShowBlockPicker(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#0072BB] hover:bg-[#005a94] text-white text-sm font-semibold rounded-xl transition-all"
            >
              <Plus size={14} />
              Add First Block
            </button>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {blocks.map((block) => {
                  const def = BLOCK_DEFS.find((d) => d.type === block.type);
                  const IconComp = def ? ICON_MAP[def.icon] : null;
                  const isExpanded = expandedId === block.id;

                  return (
                    <SortableBlock key={block.id} id={block.id}>
                      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                        {/* Block header */}
                        <div
                          className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.03] transition-colors"
                          onClick={() => setExpandedId(isExpanded ? null : block.id)}
                        >
                          <div className="cursor-grab active:cursor-grabbing text-gray-600 hover:text-gray-400 transition-colors">
                            <GripVertical size={16} />
                          </div>
                          {IconComp && (
                            <div className="w-7 h-7 rounded-lg bg-[#0072BB]/10 flex items-center justify-center shrink-0">
                              <IconComp size={14} className="text-[#0072BB]" />
                            </div>
                          )}
                          <span className="text-sm font-medium text-white flex-1">
                            {def?.label || block.type}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteBlock(block.id);
                            }}
                            className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                          {isExpanded ? (
                            <ChevronDown size={14} className="text-gray-500" />
                          ) : (
                            <ChevronRight size={14} className="text-gray-500" />
                          )}
                        </div>

                        {/* Block editor (expanded) */}
                        {isExpanded && (
                          <div className="px-4 pb-4 pt-1 border-t border-white/5">
                            <BlockEditor block={block} onChange={updateBlock} />
                          </div>
                        )}
                      </div>
                    </SortableBlock>
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {/* Add block button (when blocks exist) */}
        {blocks.length > 0 && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setShowBlockPicker(!showBlockPicker)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium rounded-xl transition-all border border-white/10 border-dashed"
            >
              <Plus size={14} />
              Add Block
            </button>
          </div>
        )}
      </div>

      {/* Block picker panel */}
      {showBlockPicker && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Choose a Block</h3>
            <button
              onClick={() => setShowBlockPicker(false)}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {BLOCK_DEFS.map((def) => {
              const IconComp = ICON_MAP[def.icon];
              return (
                <button
                  key={def.type}
                  onClick={() => addBlock(def.type)}
                  className="flex flex-col items-center gap-2 p-4 bg-white/[0.03] hover:bg-[#0072BB]/10 border border-white/10 hover:border-[#0072BB]/30 rounded-xl transition-all group text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-[#0072BB]/20 flex items-center justify-center transition-colors">
                    {IconComp && <IconComp size={20} className="text-gray-400 group-hover:text-[#0072BB] transition-colors" />}
                  </div>
                  <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                    {def.label}
                  </span>
                  <span className="text-[10px] text-gray-600 leading-tight">
                    {def.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
