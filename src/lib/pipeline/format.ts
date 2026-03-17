import { anthropic, MODEL } from "@/lib/anthropic";
import { RefinedNote, FormattedNote, OutputStyle } from "@/types";

const CORNELL_SYSTEM = `Transform the given refined note structure into Cornell Notes format as JSON.

Cornell format:
- title: the note title
- summary: brief overview
- rows: array where each row has a "cue" (question or keyword for the left column) and "notes" (detailed explanation for the right column). Generate one row per key point across all sections.
- bottomSummary: a comprehensive summary paragraph for the bottom of the page

Use the cue column for questions a student might ask, or keywords that trigger recall of the associated notes.

Respond with ONLY valid JSON matching this schema:
{
  "style": "cornell",
  "title": "string",
  "summary": "string",
  "rows": [{ "cue": "string", "notes": "string" }],
  "bottomSummary": "string"
}`;

const STICKY_SYSTEM = `Transform the given refined note structure into Sticky Notes format as JSON.

Sticky Notes format:
- title: the note title
- cards: array of cards, each with:
  - heading: short label (2-5 words)
  - color: one of "yellow", "pink", "blue", "green", "purple" (distribute evenly)
  - bullets: 2-4 concise bullet points

Group related ideas onto the same card. Aim for 4-8 cards total. Each card should be self-contained and scannable. One atomic idea per card.

Respond with ONLY valid JSON matching this schema:
{
  "style": "sticky",
  "title": "string",
  "cards": [{ "heading": "string", "color": "string", "bullets": ["string"] }]
}`;

const LINEAR_SYSTEM = `Transform the given refined note structure into Refined Linear Notes as JSON.

Linear format:
- title: the note title
- summary: 2-3 sentence overview paragraph
- sections: array of sections, each with:
  - heading: section title
  - paragraphs: array of well-written paragraphs that flow naturally

Write in clear, professional prose. Each paragraph should develop one idea fully. Use smooth transitions between paragraphs and sections. The result should read like polished, well-organized writing.

Respond with ONLY valid JSON matching this schema:
{
  "style": "linear",
  "title": "string",
  "summary": "string",
  "sections": [{ "heading": "string", "paragraphs": ["string"] }]
}`;

const SYSTEM_PROMPTS: Record<OutputStyle, string> = {
  cornell: CORNELL_SYSTEM,
  sticky: STICKY_SYSTEM,
  linear: LINEAR_SYSTEM,
};

export async function format(
  refined: RefinedNote,
  style: OutputStyle
): Promise<FormattedNote> {
  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: SYSTEM_PROMPTS[style],
    messages: [
      {
        role: "user",
        content: `Format the following refined notes into ${style} style:\n\n${JSON.stringify(refined, null, 2)}`,
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from formatting step");
  }

  return JSON.parse(content.text) as FormattedNote;
}
