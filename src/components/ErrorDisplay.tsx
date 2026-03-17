"use client";

interface ErrorDisplayProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorDisplay({ message, onDismiss }: ErrorDisplayProps) {
  return (
    <div className="rounded-lg bg-red-50 border border-red-200 p-4 flex items-start gap-3">
      <div className="text-red-500 text-lg leading-none mt-0.5">!</div>
      <div className="flex-1">
        <div className="text-sm text-red-800">{message}</div>
      </div>
      <button
        onClick={onDismiss}
        className="text-red-400 hover:text-red-600 text-lg leading-none"
      >
        &times;
      </button>
    </div>
  );
}
