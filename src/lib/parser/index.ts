import { parsePdf } from "./pdf";
import { parseText } from "./text";

export async function parseInput(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const extension = file.name.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "pdf":
      return parsePdf(buffer);
    case "txt":
    case "md":
      return parseText(buffer);
    default:
      throw new Error(`Unsupported file type: .${extension}`);
  }
}
