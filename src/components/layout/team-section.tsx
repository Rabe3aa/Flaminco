"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface TeamMemberItem {
  name: string;
  role: string;
  bio?: string | null;
  image: string;
  department: string;
}

export function TeamSection({ members }: { members: TeamMemberItem[] }) {
  const [selected, setSelected] = useState<TeamMemberItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((member, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelected(member)}
            className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/5] bg-brand-bg shadow-sm hover:shadow-2xl transition-all duration-500 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 w-full p-8">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-3">
                {member.department}
              </span>
              <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-white/80">{member.role}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Member detail modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
            style={{ animation: "fadeIn 0.3s ease forwards" }}
          />

          {/* Modal */}
          <div
            className="relative z-10 w-full max-w-lg mx-4 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            style={{ animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
          >
            {/* Image header */}
            <div className="relative h-64 w-full shrink-0">
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                className="object-cover object-top"
                unoptimized={selected.image.startsWith("/")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all"
              >
                <X size={20} />
              </button>

              {/* Name overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-2">
                  {selected.department}
                </span>
                <h2 className="text-3xl font-black text-white tracking-tight">{selected.name}</h2>
                <p className="text-white/80 font-medium">{selected.role}</p>
              </div>
            </div>

            {/* Bio */}
            {selected.bio && (
              <div className="p-8">
                <p className="text-brand-neutral/80 leading-relaxed text-base whitespace-pre-line">
                  {selected.bio}
                </p>
              </div>
            )}

            {!selected.bio && (
              <div className="p-8 text-center text-brand-neutral/40 text-sm">
                No bio available.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
