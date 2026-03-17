import { TextChunk } from "@/types";

const TARGET_WORDS = 3000;

export function chunkIfNeeded(text: string): TextChunk[] {
  const wordCount = text.split(/\s+/).length;

  if (wordCount <= TARGET_WORDS * 1.2) {
    return [{ content: text, index: 0, total: 1 }];
  }

  const paragraphs = text.split(/\n\s*\n/);
  const chunks: TextChunk[] = [];
  let current = "";
  let currentWords = 0;

  for (const para of paragraphs) {
    const paraWords = para.split(/\s+/).length;

    if (currentWords + paraWords > TARGET_WORDS && current.length > 0) {
      chunks.push({ content: current.trim(), index: chunks.length, total: 0 });
      current = para;
      currentWords = paraWords;
    } else {
      current += (current ? "\n\n" : "") + para;
      currentWords += paraWords;
    }
  }

  if (current.trim()) {
    chunks.push({ content: current.trim(), index: chunks.length, total: 0 });
  }

  return chunks.map((c) => ({ ...c, total: chunks.length }));
}
