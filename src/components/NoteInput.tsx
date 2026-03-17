"use client";

import { OutputStyle } from "@/types";
import FileUpload from "./FileUpload";
import StyleSelector from "./StyleSelector";

interface NoteInputProps {
  inputText: string;
  onTextChange: (text: string) => void;
  file: File | null;
  onFileChange: (file: File | null) => void;
  style: OutputStyle;
  onStyleChange: (style: OutputStyle) => void;
  onProcess: () => void;
  loading: boolean;
}

export default function NoteInput({
  inputText,
  onTextChange,
  file,
  onFileChange,
  style,
  onStyleChange,
  onProcess,
  loading,
}: NoteInputProps) {
  const hasInput = inputText.trim().length > 0 || file !== null;

  return (
    <div className="flex flex-col gap-4 h-full">
      <textarea
        value={inputText}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Paste your messy notes here... Lecture notes, meeting minutes, brainstorm dumps — anything goes."
        className="flex-1 min-h-[200px] rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-800 placeholder:text-neutral-400 resize-none focus:outline-none focus:ring-2 focus:ring-neutral-300 transition-shadow"
      />

      <FileUpload file={file} onFileChange={onFileChange} />

      <StyleSelector style={style} onStyleChange={onStyleChange} />

      <button
        onClick={onProcess}
        disabled={!hasInput || loading}
        className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? "Transforming..." : "Transform Notes"}
      </button>
    </div>
  );
}
