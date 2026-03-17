import { LinearNote } from "@/types";

interface OutputLinearProps {
  data: LinearNote;
}

export default function OutputLinear({ data }: OutputLinearProps) {
  return (
    <div className="max-w-prose space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900">{data.title}</h2>
      <p className="text-sm text-neutral-600 italic leading-relaxed">
        {data.summary}
      </p>

      {data.sections.map((section, i) => (
        <div key={i} className="space-y-3">
          <h3 className="text-lg font-medium text-neutral-800">
            {section.heading}
          </h3>
          {section.paragraphs.map((para, j) => (
            <p
              key={j}
              className="text-sm text-neutral-700 leading-relaxed"
            >
              {para}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
