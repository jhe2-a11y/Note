import Anthropic from "@anthropic-ai/sdk";

const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey) {
  console.error(
    "ANTHROPIC_API_KEY is not set. Available env vars:",
    Object.keys(process.env).filter((k) => k.includes("ANTHRO") || k.includes("API"))
  );
}

export const anthropic = new Anthropic({
  apiKey: apiKey || "",
});

export const MODEL = "claude-sonnet-4-20250514";
