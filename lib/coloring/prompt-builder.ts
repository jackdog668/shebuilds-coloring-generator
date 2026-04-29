import {
  COMPLEXITY_DESCRIPTIONS,
  LINE_WEIGHT_LABELS,
  PAGE_SIZE_SPECS,
  STYLE_DESCRIPTIONS,
  STYLE_LABELS,
  type ColoringPageState,
} from "./types";

export interface BuiltColoringPrompt {
  short: string;
  full: string;
  negative: string;
}

const NEGATIVE =
  "no color, no shading, no fill, no gray tones, no gradients, no watermark, no logo, no text other than the requested motif, no jpeg artifacts, pure black-and-white line art only, white background";

const LINE_WEIGHT_BIT: Record<string, string> = {
  fine: "fine consistent line weight (~0.5pt), suitable for delicate detail",
  medium: "medium uniform line weight (~1pt), classic coloring-book line",
  bold: "bold thick line weight (~2pt), forgiving for younger colorists",
  mixed: "mixed line weights, hierarchy of thicker outlines and finer interior detail",
};

export function buildColoringPrompt(state: ColoringPageState): BuiltColoringPrompt {
  const styleLabel = STYLE_LABELS[state.style];
  const styleDesc = STYLE_DESCRIPTIONS[state.style];
  const complexityDesc = COMPLEXITY_DESCRIPTIONS[state.complexity];
  const lineBit = LINE_WEIGHT_BIT[state.lineWeight] ?? "medium uniform line weight";
  const pageSpec = PAGE_SIZE_SPECS[state.pageSize];

  const short = `${styleLabel} coloring page — ${state.motif}.`;

  const full = [
    `Coloring book page, single-page composition, fully outlined for coloring.`,
    `Style: ${styleLabel} — ${styleDesc}`,
    `Subject: ${state.motif}.`,
    `Detail level: ${state.complexity} — ${complexityDesc}`,
    `Line: ${lineBit}.`,
    state.hasFrame
      ? `Decorative ornamental frame border around the page edge, integrated with the style.`
      : `No frame border — composition fills the page edge to edge with breathing room.`,
    `Page format: ${pageSpec.label}, ${pageSpec.w}×${pageSpec.h} inches at ${pageSpec.dpi} dpi.`,
    `Pure black-and-white line art on plain white background. No shading, no fill, no color.`,
    `Print-ready for KDP coloring books.`,
  ].join(" ");

  return { short, full, negative: NEGATIVE };
}
