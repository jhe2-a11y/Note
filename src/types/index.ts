// ── Input ──────────────────────────────────────────────
export type OutputStyle = "cornell" | "sticky" | "linear";

export interface ProcessRequest {
  text: string;
  style: OutputStyle;
}

// ── Step 1 output: Semantic Analysis ───────────────────
export interface AnalyzedNote {
  title: string;
  summary: string;
  themes: string[];
  sections: AnalyzedSection[];
}

export interface AnalyzedSection {
  heading: string;
  keyPoints: string[];
  details: string[];
  relationships: string[];
}

// ── Step 2 output: Refined ─────────────────────────────
export interface RefinedNote {
  title: string;
  summary: string;
  themes: string[];
  sections: RefinedSection[];
}

export interface RefinedSection {
  heading: string;
  keyPoints: string[];
  details: string[];
  relationships: string[];
}

// ── Step 3 output: Formatted (union of styles) ────────
export interface CornellNote {
  style: "cornell";
  title: string;
  summary: string;
  rows: {
    cue: string;
    notes: string;
  }[];
  bottomSummary: string;
}

export interface StickyNote {
  style: "sticky";
  title: string;
  cards: {
    heading: string;
    color: string;
    bullets: string[];
  }[];
}

export interface LinearNote {
  style: "linear";
  title: string;
  summary: string;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
}

export type FormattedNote = CornellNote | StickyNote | LinearNote;

// ── API Response ───────────────────────────────────────
export interface ProcessResponse {
  success: true;
  result: FormattedNote;
}

export interface ProcessError {
  success: false;
  error: string;
}

// ── Chunking ───────────────────────────────────────────
export interface TextChunk {
  content: string;
  index: number;
  total: number;
}
