import { CornellNote } from "@/types";

interface OutputCornellProps {
  data: CornellNote;
}

export default function OutputCornell({ data }: OutputCornellProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-neutral-900">{data.title}</h2>
      <p className="text-sm text-neutral-600 italic">{data.summary}</p>

      <div className="border border-neutral-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_2fr] bg-neutral-50 border-b border-neutral-200">
          <div className="px-4 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wide border-r border-neutral-200">
            Cues
          </div>
          <div className="px-4 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            Notes
          </div>
        </div>

        {/* Rows */}
        {data.rows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-[1fr_2fr] ${
              i < data.rows.length - 1 ? "border-b border-neutral-100" : ""
            }`}
          >
            <div className="px-4 py-3 text-sm font-medium text-neutral-700 border-r border-neutral-100 bg-neutral-50/50">
              {row.cue}
            </div>
            <div className="px-4 py-3 text-sm text-neutral-700">{row.notes}</div>
          </div>
        ))}

        {/* Bottom Summary */}
        <div className="border-t-2 border-neutral-300 px-4 py-3 bg-neutral-50">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
            Summary
          </div>
          <p className="text-sm text-neutral-700">{data.bottomSummary}</p>
        </div>
      </div>
    </div>
  );
}
