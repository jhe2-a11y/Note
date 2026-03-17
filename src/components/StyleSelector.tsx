"use client";

import { OutputStyle } from "@/types";

const STYLES: { value: OutputStyle; label: string; description: string }[] = [
  { value: "cornell", label: "Cornell Notes", description: "Cues + notes + summary" },
  { value: "sticky", label: "Sticky Notes", description: "Visual idea cards" },
  { value: "linear", label: "Linear Notes", description: "Polished paragraphs" },
];

interface StyleSelectorProps {
  style: OutputStyle;
  onStyleChange: (style: OutputStyle) => void;
}

export default function StyleSelector({ style, onStyleChange }: StyleSelectorProps) {
  return (
    <div className="flex gap-2">
      {STYLES.map((s) => (
        <button
          key={s.value}
          onClick={() => onStyleChange(s.value)}
          className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
            style === s.value
              ? "bg-neutral-900 text-white shadow-sm"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          <div>{s.label}</div>
          <div className={`text-xs mt-0.5 ${style === s.value ? "text-neutral-400" : "text-neutral-400"}`}>
            {s.description}
          </div>
        </button>
      ))}
    </div>
  );
}
