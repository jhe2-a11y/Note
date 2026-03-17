import { NextRequest, NextResponse } from "next/server";
import { parseInput } from "@/lib/parser";
import { runPipeline } from "@/lib/pipeline";
import { OutputStyle, ProcessResponse, ProcessError } from "@/types";

export const maxDuration = 60;
export const runtime = "nodejs";

const VALID_STYLES: OutputStyle[] = ["cornell", "sticky", "linear"];
const MAX_WORDS = 8000;

export async function POST(
  request: NextRequest
): Promise<NextResponse<ProcessResponse | ProcessError>> {
  try {
    const formData = await request.formData();
    const textField = formData.get("text") as string | null;
    const file = formData.get("file") as File | null;
    const style = formData.get("style") as string;

    // Validate style
    if (!VALID_STYLES.includes(style as OutputStyle)) {
      return NextResponse.json(
        { success: false as const, error: "Invalid style. Must be one of: cornell, sticky, linear" },
        { status: 400 }
      );
    }

    // Extract text
    let rawText = textField ?? "";
    if (file) {
      const extracted = await parseInput(file);
      rawText = rawText ? `${rawText}\n\n${extracted}` : extracted;
    }

    if (!rawText.trim()) {
      return NextResponse.json(
        { success: false as const, error: "No input provided. Please enter text or upload a file." },
        { status: 400 }
      );
    }

    // Check input size
    const wordCount = rawText.split(/\s+/).length;
    if (wordCount > MAX_WORDS) {
      return NextResponse.json(
        {
          success: false as const,
          error: `Input too large (${wordCount} words). Maximum is ${MAX_WORDS} words.`,
        },
        { status: 413 }
      );
    }

    // Run pipeline
    const result = await runPipeline(rawText, style as OutputStyle);

    return NextResponse.json({ success: true as const, result });
  } catch (error) {
    console.error("Pipeline error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json(
      { success: false as const, error: message },
      { status: 500 }
    );
  }
}
