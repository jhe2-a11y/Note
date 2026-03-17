import { StickyNote } from "@/types";

interface OutputStickyProps {
  data: StickyNote;
}

const COLOR_MAP: Record<string, string> = {
  yellow: "bg-yellow-100 border-yellow-200",
  pink: "bg-pink-100 border-pink-200",
  blue: "bg-blue-100 border-blue-200",
  green: "bg-green-100 border-green-200",
  purple: "bg-purple-100 border-purple-200",
};

const ROTATIONS = [
  "-rotate-1",
  "rotate-1",
  "-rotate-2",
  "rotate-0.5",
  "rotate-2",
  "-rotate-0.5",
];

export default function OutputSticky({ data }: OutputStickyProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-neutral-900">{data.title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.cards.map((card, i) => (
          <div
            key={i}
            className={`rounded-lg border p-4 shadow-sm transition-transform hover:scale-[1.02] ${
              COLOR_MAP[card.color] || COLOR_MAP.yellow
            } ${ROTATIONS[i % ROTATIONS.length]}`}
          >
            <h3 className="font-semibold text-sm text-neutral-800 mb-2">
              {card.heading}
            </h3>
            <ul className="space-y-1">
              {card.bullets.map((bullet, j) => (
                <li key={j} className="text-sm text-neutral-700 flex gap-2">
                  <span className="text-neutral-400 shrink-0">&bull;</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
