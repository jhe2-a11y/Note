import { chunkIfNeeded } from "@/lib/chunker";
import { analyze, mergeAnalyses } from "./analyze";
import { refine } from "./refine";
import { format } from "./format";
import { FormattedNote, OutputStyle } from "@/types";

export async function runPipeline(
  text: string,
  style: OutputStyle
): Promise<FormattedNote> {
  // 1. Chunk if needed
  const chunks = chunkIfNeeded(text);

  // 2. Analyze (parallel for chunks, then merge)
  const analyzed =
    chunks.length === 1
      ? await analyze(chunks[0].content)
      : await mergeAnalyses(
          await Promise.all(chunks.map((c) => analyze(c.content)))
        );

  // 3. Refine
  const refined = await refine(analyzed);

  // 4. Format into requested style
  const formatted = await format(refined, style);

  return formatted;
}
