"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { label: "Analyzing", description: "Understanding your notes..." },
  { label: "Refining", description: "Improving clarity and flow..." },
  { label: "Formatting", description: "Structuring the output..." },
];

export default function LoadingIndicator() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s < STEPS.length - 1 ? s + 1 : s));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-neutral-200" />
        <div className="absolute inset-0 rounded-full border-2 border-neutral-800 border-t-transparent animate-spin" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="text-sm font-medium text-neutral-800">
          {STEPS[step].label}
        </div>
        <div className="text-xs text-neutral-500">{STEPS[step].description}</div>
      </div>
      <div className="flex gap-2">
        {STEPS.map((s, i) => (
          <div
            key={s.label}
            className={`h-1.5 w-8 rounded-full transition-colors ${
              i <= step ? "bg-neutral-800" : "bg-neutral-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
