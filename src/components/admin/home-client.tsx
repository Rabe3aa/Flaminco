"use client";

import { useState, useTransition } from "react";
import {
  Save,
  Loader2,
  Check,
  ChevronDown,
  ChevronRight,
  Sparkles,
  BarChart3,
  Users,
  Zap,
} from "lucide-react";
import { ImageUploader } from "./image-uploader";

interface HomeClientProps {
  initialContent: Record<string, string>;
}

export function HomeClient({ initialContent }: HomeClientProps) {
  const [content, setContent] = useState<Record<string, string>>(initialContent);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("hero");

  function updateField(key: string, value: string) {
    setContent((prev) => ({ ...prev, [key]: value }));
  }

  function handleSaveAll() {
    setSaved(false);
    startTransition(async () => {
      await fetch("/api/admin/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  }

  function toggleSection(section: string) {
    setExpandedSection((prev) => (prev === section ? null : section));
  }

  const sections = [
    { id: "hero", label: "Hero Section", icon: Sparkles },
    { id: "highlight", label: "Metrics / Stats Row", icon: BarChart3 },
    { id: "about", label: "About Section", icon: Users },
    { id: "features", label: "Features Section", icon: Zap },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Home Page</h1>
          <p className="text-gray-400 mt-1">Manage all content on the Home page</p>
        </div>
        <button
          onClick={handleSaveAll}
          disabled={isPending}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#0072BB] hover:bg-[#005a94] text-white font-semibold rounded-xl transition-all disabled:opacity-50 text-sm"
        >
          {isPending ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : <Save size={16} />}
          {isPending ? "Saving..." : saved ? "Saved!" : "Save All Changes"}
        </button>
      </div>

      {/* Sections */}
      {sections.map(({ id, label, icon: Icon }) => (
        <div key={id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection(id)}
            className="w-full flex items-center gap-3 px-6 py-4 hover:bg-white/[0.02] transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0072BB]/10 flex items-center justify-center">
              <Icon size={16} className="text-[#0072BB]" />
            </div>
            <span className="text-sm font-semibold text-white flex-1 text-left">{label}</span>
            {expandedSection === id ? <ChevronDown size={16} className="text-gray-500" /> : <ChevronRight size={16} className="text-gray-500" />}
          </button>

          {expandedSection === id && (
            <div className="px-6 pb-6 pt-2 border-t border-white/5 space-y-4">
              {id === "hero" && <HeroFields content={content} update={updateField} />}
              {id === "highlight" && <HighlightFields content={content} update={updateField} />}
              {id === "about" && <AboutFields content={content} update={updateField} />}
              {id === "features" && <FeaturesFields content={content} update={updateField} />}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Shared ──

function Field({ label, value, onChange, multiline, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs text-gray-400 block mb-1.5 font-medium">{label}</label>
      {multiline ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0072BB] resize-none"
          placeholder={placeholder}
        />
      ) : (
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

function ImgField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [urls, setUrls] = useState<string[]>(value ? [value] : []);
  return (
    <div>
      <label className="text-xs text-gray-400 block mb-1.5 font-medium">{label}</label>
      <ImageUploader
        label=""
        value={urls}
        onChange={(newUrls) => { setUrls(newUrls); onChange(newUrls[0] || ""); }}
        multiple={false}
      />
    </div>
  );
}

// ── Section field groups ──

function HeroFields({ content, update }: { content: Record<string, string>; update: (k: string, v: string) => void }) {
  return (
    <>
      <Field label="Badge Text" value={content["hero.badge"]} onChange={(v) => update("hero.badge", v)} placeholder="Advertising Agency" />
      <Field label="Heading" value={content["hero.heading"]} onChange={(v) => update("hero.heading", v)} multiline placeholder="Grow Your Business With..." />
      <Field label="Subtitle" value={content["hero.subtitle"]} onChange={(v) => update("hero.subtitle", v)} multiline placeholder="We craft modern digital experiences..." />
      <div className="grid grid-cols-2 gap-4">
        <Field label="CTA Button 1 Text" value={content["hero.cta1"]} onChange={(v) => update("hero.cta1", v)} placeholder="Start Your Campaign" />
        <Field label="CTA Button 2 Text" value={content["hero.cta2"]} onChange={(v) => update("hero.cta2", v)} placeholder="View Our Work" />
      </div>
      <ImgField label="Hero Image" value={content["hero.image"]} onChange={(v) => update("hero.image", v)} />
      <Field label="Review Card Title" value={content["hero.reviewTitle"]} onChange={(v) => update("hero.reviewTitle", v)} placeholder="Creating Impactful Digital Experiences" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Client Score (e.g. 9.6)" value={content["hero.clientScore"]} onChange={(v) => update("hero.clientScore", v)} placeholder="9.6" />
        <Field label="Client Label (e.g. 150+ Clients)" value={content["hero.clientLabel"]} onChange={(v) => update("hero.clientLabel", v)} placeholder="150+ Clients" />
      </div>
    </>
  );
}

function HighlightFields({ content, update }: { content: Record<string, string>; update: (k: string, v: string) => void }) {
  return (
    <>
      <Field label="Section Heading" value={content["highlight.heading"]} onChange={(v) => update("highlight.heading", v)} placeholder="Marketing metrics that actually matter." />
      <Field label="Section Subtitle" value={content["highlight.subtitle"]} onChange={(v) => update("highlight.subtitle", v)} multiline placeholder="Stop guessing..." />
      <Field label="Main Card Title" value={content["highlight.cardTitle"]} onChange={(v) => update("highlight.cardTitle", v)} placeholder="Data-driven growth strategies" />
      <Field label="Main Card Description" value={content["highlight.cardDesc"]} onChange={(v) => update("highlight.cardDesc", v)} multiline />
      <ImgField label="Main Card Image" value={content["highlight.image"]} onChange={(v) => update("highlight.image", v)} />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Active Clients Count" value={content["highlight.activeClients"]} onChange={(v) => update("highlight.activeClients", v)} placeholder="172" />
        <Field label="ROI Increase %" value={content["highlight.roi"]} onChange={(v) => update("highlight.roi", v)} placeholder="45" />
      </div>
    </>
  );
}

function AboutFields({ content, update }: { content: Record<string, string>; update: (k: string, v: string) => void }) {
  return (
    <>
      <Field label="Badge Text" value={content["about.badge"]} onChange={(v) => update("about.badge", v)} placeholder="About Us" />
      <Field label="Heading" value={content["about.heading"]} onChange={(v) => update("about.heading", v)} placeholder="Maximize Your Growth with Our Advertising" />
      <Field label="Description" value={content["about.description"]} onChange={(v) => update("about.description", v)} multiline />
      <ImgField label="Section Image" value={content["about.image"]} onChange={(v) => update("about.image", v)} />
      <p className="text-xs text-gray-500 font-medium pt-2">Features List</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="space-y-2 bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <Field label={`Feature ${n} Title`} value={content[`about.feature${n}Title`]} onChange={(v) => update(`about.feature${n}Title`, v)} />
            <Field label={`Feature ${n} Description`} value={content[`about.feature${n}Desc`]} onChange={(v) => update(`about.feature${n}Desc`, v)} multiline />
          </div>
        ))}
      </div>
    </>
  );
}

function FeaturesFields({ content, update }: { content: Record<string, string>; update: (k: string, v: string) => void }) {
  return (
    <>
      <Field label="Badge Text" value={content["features.badge"]} onChange={(v) => update("features.badge", v)} placeholder="Our Arsenal" />
      <Field label="Heading" value={content["features.heading"]} onChange={(v) => update("features.heading", v)} multiline placeholder="Built to dominate your digital landscape." />
      <p className="text-xs text-gray-500 font-medium pt-2">Feature Cards</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="space-y-2 bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <Field label={`Card ${n} Title`} value={content[`features.card${n}Title`]} onChange={(v) => update(`features.card${n}Title`, v)} />
            <Field label={`Card ${n} Description`} value={content[`features.card${n}Desc`]} onChange={(v) => update(`features.card${n}Desc`, v)} multiline />
          </div>
        ))}
      </div>
    </>
  );
}
