import { anthropic, MODEL } from "@/lib/anthropic";
import { AnalyzedNote } from "@/types";

const ANALYZE_SYSTEM = `You are a note analysis expert. Given raw, unstructured notes, produce a structured semantic analysis as JSON.

Your task:
1. Identify a concise title that captures the overall topic.
2. Write a 1-2 sentence summary of the entire content.
3. Extract 2-5 high-level themes or topics.
4. Break the content into logical sections, each with:
   - A descriptive heading
   - Key points (core ideas — do NOT copy text verbatim, synthesize the meaning)
   - Supporting details or examples
   - Relationships to other sections (how ideas connect)

CRITICAL: Do NOT process line-by-line. Understand the MEANING of the entire input as a connected body of thought. Group related ideas together even if they appear in different parts of the original text. Identify implicit structure and overarching themes.

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

const MERGE_SYSTEM = `You are given multiple partial analyses of a single document, each covering a different portion. Merge them into ONE unified AnalyzedNote.

Rules:
- Combine duplicate or overlapping themes
- Merge sections covering the same topic into one section
- Produce a single coherent title and summary for the whole document
- Ensure relationships reflect the full document, not just individual chunks
- The final result should read as if it was analyzed from the complete text at once

Respond with ONLY valid JSON matching the AnalyzedNote schema:
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

export async function analyze(text: string): Promise<AnalyzedNote> {
  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: ANALYZE_SYSTEM,
    messages: [
      {
        role: "user",
        content: `Analyze the following notes and produce a structured semantic analysis:\n\n${text}`,
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from analysis step");
  }

  return JSON.parse(content.text) as AnalyzedNote;
}

export async function mergeAnalyses(
  analyses: AnalyzedNote[]
): Promise<AnalyzedNote> {
  if (analyses.length === 1) return analyses[0];

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: MERGE_SYSTEM,
    messages: [
      {
        role: "user",
        content: `Merge these ${analyses.length} partial analyses into one unified analysis:\n\n${JSON.stringify(analyses, null, 2)}`,
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from merge step");
  }

  return JSON.parse(content.text) as AnalyzedNote;
}
