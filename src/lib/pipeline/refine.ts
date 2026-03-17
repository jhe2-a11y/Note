import { anthropic, MODEL } from "@/lib/anthropic";
import { AnalyzedNote, RefinedNote } from "@/types";

const REFINE_SYSTEM = `You are a writing refinement specialist. Given a structured analysis of notes (as JSON), rewrite all text content for maximum clarity, conciseness, and readability.

Rules:
- Preserve the EXACT structure (same number of sections, same keys).
- Rewrite key points to be clear, self-contained statements.
- Rewrite details to be concise and specific.
- Fix grammar, remove redundancy, improve word choice.
- Smooth transitions and improve logical flow within each section.
- Do NOT add new information or change the meaning.
- Do NOT hallucinate facts that weren't in the original.
- Keep the same title, summary, themes, and section headings (improve wording only).

Respond with ONLY valid JSON matching this exact schema:
{
  "title": "string",
  "summary": "string",
  "themes": ["string"],
  "sections": [
    {
      "heading": "string",
      "keyPoints": ["string"],
      "details": ["string"],
      "relationships": ["string"]
    }
  ]
}`;

export async function refine(analyzed: AnalyzedNote): Promise<RefinedNote> {
  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: REFINE_SYSTEM,
    messages: [
      {
        role: "user",
        content: `Refine the following structured analysis for clarity and readability:\n\n${JSON.stringify(analyzed, null, 2)}`,
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from refinement step");
  }

  return JSON.parse(content.text) as RefinedNote;
}
