"use client";

import { useState } from "react";
import { OutputStyle, FormattedNote } from "@/types";
import NoteInput from "@/components/NoteInput";
import NoteOutput from "@/components/NoteOutput";
import LoadingIndicator from "@/components/LoadingIndicator";
import ErrorDisplay from "@/components/ErrorDisplay";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [style, setStyle] = useState<OutputStyle>("cornell");
  const [result, setResult] = useState<FormattedNote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleProcess() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      if (inputText.trim()) formData.append("text", inputText);
      if (file) formData.append("file", file);
      formData.append("style", style);

      const res = await fetch("/api/process", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error);
      }
    } catch {
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-baseline gap-3">
          <h1 className="text-xl font-semibold tracking-tight">Noteflow</h1>
          <span className="text-xs text-neutral-400">Thinking amplifier</span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {/* Input Panel */}
          <div className="flex flex-col">
            <NoteInput
              inputText={inputText}
              onTextChange={setInputText}
              file={file}
              onFileChange={setFile}
              style={style}
              onStyleChange={setStyle}
              onProcess={handleProcess}
              loading={loading}
            />
          </div>

          {/* Output Panel */}
          <div className="flex flex-col bg-white rounded-lg border border-neutral-200 p-6 min-h-[400px]">
            {loading ? (
              <LoadingIndicator />
            ) : error ? (
              <ErrorDisplay message={error} onDismiss={() => setError(null)} />
            ) : result ? (
              <NoteOutput result={result} />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-neutral-300 text-4xl mb-3">&#9998;</div>
                  <p className="text-sm text-neutral-400">
                    Your transformed notes will appear here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
