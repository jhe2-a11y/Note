"use client";

import { useCallback, useState } from "react";

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED = [".pdf", ".txt", ".md"];

export default function FileUpload({ file, onFileChange }: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(
    (f: File) => {
      const ext = "." + f.name.split(".").pop()?.toLowerCase();
      if (!ACCEPTED.includes(ext)) {
        alert(`Unsupported file type. Accepted: ${ACCEPTED.join(", ")}`);
        return;
      }
      if (f.size > MAX_SIZE) {
        alert("File too large. Maximum size is 10MB.");
        return;
      }
      onFileChange(f);
    },
    [onFileChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`relative rounded-lg border-2 border-dashed p-4 text-center transition-colors ${
        dragOver
          ? "border-neutral-400 bg-neutral-50"
          : "border-neutral-200 hover:border-neutral-300"
      }`}
    >
      {file ? (
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-700 truncate">{file.name}</span>
          <button
            onClick={() => onFileChange(null)}
            className="ml-2 text-neutral-400 hover:text-neutral-600 text-lg leading-none"
          >
            &times;
          </button>
        </div>
      ) : (
        <label className="cursor-pointer block">
          <div className="text-sm text-neutral-500">
            Drop a file here or{" "}
            <span className="text-neutral-700 underline">browse</span>
          </div>
          <div className="text-xs text-neutral-400 mt-1">
            PDF, TXT, or Markdown (max 10MB)
          </div>
          <input
            type="file"
            accept=".pdf,.txt,.md"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </label>
      )}
    </div>
  );
}
