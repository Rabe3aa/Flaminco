"use client";

import { useState, useTransition } from "react";
import {
  Save,
  Loader2,
  Check,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Users,
  Milestone,
  Sparkles,
  Award,
  ImageIcon,
  GripVertical,
} from "lucide-react";
import { ImageUploader } from "./image-uploader";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image: string | null;
  department: string;
  order: number;
}

interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
}

interface AboutClientProps {
  initialContent: Record<string, string>;
  initialTeam: TeamMember[];
  initialMilestones: JourneyMilestone[];
}

export function AboutClient({ initialContent, initialTeam, initialMilestones }: AboutClientProps) {
  const [content, setContent] = useState<Record<string, string>>(initialContent);
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [milestones, setMilestones] = useState<JourneyMilestone[]>(initialMilestones);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("hero");
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [newMember, setNewMember] = useState(false);

  function updateField(key: string, value: string) {
    setContent((prev) => ({ ...prev, [key]: value }));
  }

  function handleSaveAll() {
    setSaved(false);
    startTransition(async () => {
      // Save content
      await fetch("/api/admin/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, milestones }),
      });

      // Save team members
      await fetch("/api/admin/about/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team }),
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  }

  function addMilestone() {
    setMilestones((prev) => [...prev, { year: new Date().getFullYear().toString(), title: "", description: "" }]);
  }

  function removeMilestone(idx: number) {
    setMilestones((prev) => prev.filter((_, i) => i !== idx));
  }

  function updateMilestone(idx: number, field: keyof JourneyMilestone, value: string) {
    setMilestones((prev) => prev.map((m, i) => (i === idx ? { ...m, [field]: value } : m)));
  }

  function addTeamMember() {
    const newId = `new_${Date.now()}`;
    setTeam((prev) => [
      ...prev,
      { id: newId, name: "", role: "", bio: null, image: null, department: "", order: prev.length },
    ]);
    setEditingMember(newId);
    setNewMember(true);
  }

  function removeTeamMember(id: string) {
    setTeam((prev) => prev.filter((m) => m.id !== id));
    if (editingMember === id) setEditingMember(null);
  }

  function updateTeamMemberField(id: string, field: keyof TeamMember, value: string | number | null) {
    setTeam((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  }

  function toggleSection(section: string) {
    setExpandedSection((prev) => (prev === section ? null : section));
  }

  const sections = [
    { id: "hero", label: "Hero Section", icon: Sparkles },
    { id: "values", label: "Mission & Approach", icon: Award },
    { id: "journey", label: "Journey Timeline", icon: Milestone },
    { id: "team", label: "Team Members", icon: Users },
    { id: "highlight", label: "Employee Highlight", icon: Award },
  ];

  return (
    <div className="space-y-6">
      {/* Save button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">About Us Page</h1>
          <p className="text-gray-400 mt-1">Manage all content on the About page</p>
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
              {id === "hero" && <HeroSection content={content} updateField={updateField} />}
              {id === "values" && <ValuesSection content={content} updateField={updateField} />}
              {id === "journey" && (
                <JourneySection
                  content={content}
                  updateField={updateField}
                  milestones={milestones}
                  addMilestone={addMilestone}
                  removeMilestone={removeMilestone}
                  updateMilestone={updateMilestone}
                />
              )}
              {id === "team" && (
                <TeamSection
                  content={content}
                  updateField={updateField}
                  team={team}
                  editingMember={editingMember}
                  setEditingMember={setEditingMember}
                  addTeamMember={addTeamMember}
                  removeTeamMember={removeTeamMember}
                  updateTeamMemberField={updateTeamMemberField}
                />
              )}
              {id === "highlight" && <HighlightSection content={content} updateField={updateField} />}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Section Components ──

function FieldInput({ label, value, onChange, multiline, placeholder }: {
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

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [urls, setUrls] = useState<string[]>(value ? [value] : []);

  return (
    <div>
      <label className="text-xs text-gray-400 block mb-1.5 font-medium">{label}</label>
      <ImageUploader
        label=""
        value={urls}
        onChange={(newUrls) => {
          setUrls(newUrls);
          onChange(newUrls[0] || "");
        }}
        multiple={false}
      />
    </div>
  );
}

function HeroSection({ content, updateField }: { content: Record<string, string>; updateField: (k: string, v: string) => void }) {
  return (
    <>
      <FieldInput label="Badge Text" value={content["hero.badge"]} onChange={(v) => updateField("hero.badge", v)} placeholder="Who We Are" />
      <FieldInput label="Heading" value={content["hero.heading"]} onChange={(v) => updateField("hero.heading", v)} placeholder="We are an agency..." />
      <FieldInput label="Subtitle" value={content["hero.subtitle"]} onChange={(v) => updateField("hero.subtitle", v)} multiline placeholder="Founded on the belief..." />
      <ImageField label="Hero Image" value={content["hero.image"]} onChange={(v) => updateField("hero.image", v)} />
    </>
  );
}

function ValuesSection({ content, updateField }: { content: Record<string, string>; updateField: (k: string, v: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <FieldInput label="Mission Title" value={content["mission.title"]} onChange={(v) => updateField("mission.title", v)} />
        <FieldInput label="Mission Text" value={content["mission.text"]} onChange={(v) => updateField("mission.text", v)} multiline />
      </div>
      <div className="space-y-4">
        <FieldInput label="Approach Title" value={content["approach.title"]} onChange={(v) => updateField("approach.title", v)} />
        <FieldInput label="Approach Text" value={content["approach.text"]} onChange={(v) => updateField("approach.text", v)} multiline />
      </div>
    </div>
  );
}

function JourneySection({
  content, updateField, milestones, addMilestone, removeMilestone, updateMilestone,
}: {
  content: Record<string, string>; updateField: (k: string, v: string) => void;
  milestones: JourneyMilestone[]; addMilestone: () => void; removeMilestone: (i: number) => void;
  updateMilestone: (i: number, f: keyof JourneyMilestone, v: string) => void;
}) {
  return (
    <>
      <FieldInput label="Section Heading" value={content["journey.heading"]} onChange={(v) => updateField("journey.heading", v)} />
      <FieldInput label="Section Subtitle" value={content["journey.subtitle"]} onChange={(v) => updateField("journey.subtitle", v)} />

      <div className="mt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-400 font-medium">Milestones</span>
          <button onClick={addMilestone} className="flex items-center gap-1 text-xs text-[#0072BB] hover:text-white transition-colors">
            <Plus size={12} /> Add Milestone
          </button>
        </div>
        <div className="space-y-3">
          {milestones.map((m, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <input
                  value={m.year}
                  onChange={(e) => updateMilestone(i, "year", e.target.value)}
                  className="w-20 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
                  placeholder="Year"
                />
                <input
                  value={m.title}
                  onChange={(e) => updateMilestone(i, "title", e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
                  placeholder="Title"
                />
                <button onClick={() => removeMilestone(i)} className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
              <textarea
                value={m.description}
                onChange={(e) => updateMilestone(i, "description", e.target.value)}
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0072BB] resize-none"
                placeholder="Description"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function TeamSection({
  content, updateField, team, editingMember, setEditingMember, addTeamMember, removeTeamMember, updateTeamMemberField,
}: {
  content: Record<string, string>; updateField: (k: string, v: string) => void;
  team: TeamMember[]; editingMember: string | null; setEditingMember: (id: string | null) => void;
  addTeamMember: () => void; removeTeamMember: (id: string) => void;
  updateTeamMemberField: (id: string, field: keyof TeamMember, value: string | number | null) => void;
}) {
  return (
    <>
      <FieldInput label="Section Heading" value={content["team.heading"]} onChange={(v) => updateField("team.heading", v)} />
      <FieldInput label="Section Subtitle" value={content["team.subtitle"]} onChange={(v) => updateField("team.subtitle", v)} />

      <div className="mt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-400 font-medium">{team.length} Members</span>
          <button onClick={addTeamMember} className="flex items-center gap-1 text-xs text-[#0072BB] hover:text-white transition-colors">
            <Plus size={12} /> Add Member
          </button>
        </div>
        <div className="space-y-2">
          {team.map((member) => (
            <div key={member.id} className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
                onClick={() => setEditingMember(editingMember === member.id ? null : member.id)}
              >
                {member.image && (
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 shrink-0">
                    <img src={member.image} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                {!member.image && (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Users size={14} className="text-gray-500" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{member.name || "New Member"}</p>
                  <p className="text-xs text-gray-500 truncate">{member.role} · {member.department}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeTeamMember(member.id); }}
                  className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <Trash2 size={14} />
                </button>
                {editingMember === member.id ? <ChevronDown size={14} className="text-gray-500" /> : <ChevronRight size={14} className="text-gray-500" />}
              </div>

              {editingMember === member.id && (
                <div className="px-4 pb-4 pt-2 border-t border-white/5 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-gray-500 block mb-1">Name</label>
                      <input
                        value={member.name}
                        onChange={(e) => updateTeamMemberField(member.id, "name", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 block mb-1">Role</label>
                      <input
                        value={member.role}
                        onChange={(e) => updateTeamMemberField(member.id, "role", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-gray-500 block mb-1">Department</label>
                      <input
                        value={member.department}
                        onChange={(e) => updateTeamMemberField(member.id, "department", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-500 block mb-1">Order</label>
                      <input
                        type="number"
                        value={member.order}
                        onChange={(e) => updateTeamMemberField(member.id, "order", parseInt(e.target.value) || 0)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0072BB]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 block mb-1">Bio / Description <span className="text-gray-600">(shown in popup)</span></label>
                    <textarea
                      value={member.bio || ""}
                      onChange={(e) => updateTeamMemberField(member.id, "bio", e.target.value || null)}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#0072BB] resize-none"
                      placeholder="Short bio about this team member..."
                    />
                  </div>
                  <ImageField
                    label="Photo"
                    value={member.image || ""}
                    onChange={(v) => updateTeamMemberField(member.id, "image", v || null)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function HighlightSection({ content, updateField }: { content: Record<string, string>; updateField: (k: string, v: string) => void }) {
  const members = [1, 2, 3] as const;
  return (
    <>
      <FieldInput label="Badge Text" value={content["highlight.badge"]} onChange={(v) => updateField("highlight.badge", v)} placeholder="Quarterly Achievers" />
      <FieldInput label="Section Heading" value={content["highlight.heading"]} onChange={(v) => updateField("highlight.heading", v)} placeholder="Team Stars This Quarter" />

      <div className="mt-4 space-y-6">
        {members.map((n) => (
          <div key={n} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-3">
            <p className="text-xs font-semibold text-[#0072BB] uppercase tracking-widest">Member {n}</p>
            <div className="grid grid-cols-2 gap-3">
              <FieldInput label="Name" value={content[`highlight.member${n}.name`]} onChange={(v) => updateField(`highlight.member${n}.name`, v)} placeholder="Alex Rivera" />
              <FieldInput label="Role" value={content[`highlight.member${n}.role`]} onChange={(v) => updateField(`highlight.member${n}.role`, v)} placeholder="Senior Data Analyst" />
            </div>
            <FieldInput label="Achievement / Stat" value={content[`highlight.member${n}.stat`]} onChange={(v) => updateField(`highlight.member${n}.stat`, v)} placeholder="+40% Performance" />
            <FieldInput label="Description" value={content[`highlight.member${n}.description`]} onChange={(v) => updateField(`highlight.member${n}.description`, v)} multiline placeholder="Short description..." />
            <ImageField label="Photo" value={content[`highlight.member${n}.image`]} onChange={(v) => updateField(`highlight.member${n}.image`, v)} />
          </div>
        ))}
      </div>
    </>
  );
}
