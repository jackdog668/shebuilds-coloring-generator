export const COLORING_STYLES = [
  "mandala",
  "florals",
  "animals-cute",
  "geometric",
  "fairy-tale",
  "doodle",
  "cottagecore",
  "kawaii-faces",
] as const;
export type ColoringStyle = (typeof COLORING_STYLES)[number];

export const LINE_WEIGHTS = ["fine", "medium", "bold", "mixed"] as const;
export type LineWeight = (typeof LINE_WEIGHTS)[number];

export const COMPLEXITIES = ["beginner", "intermediate", "advanced", "expert"] as const;
export type Complexity = (typeof COMPLEXITIES)[number];

export const PAGE_SIZES = ["us-letter", "kdp-8.5x11", "square", "a4"] as const;
export type PageSize = (typeof PAGE_SIZES)[number];

export interface ColoringPageState {
  style: ColoringStyle;
  motif: string;
  lineWeight: LineWeight;
  complexity: Complexity;
  pageSize: PageSize;
  hasFrame: boolean;
  seed: number;
}

export const STYLE_LABELS: Record<ColoringStyle, string> = {
  mandala: "Mandala",
  florals: "Florals",
  "animals-cute": "Cute Animals",
  geometric: "Geometric",
  "fairy-tale": "Fairy Tale",
  doodle: "Doodle",
  cottagecore: "Cottagecore",
  "kawaii-faces": "Kawaii Faces",
};

export const STYLE_DESCRIPTIONS: Record<ColoringStyle, string> = {
  mandala: "Symmetrical radial designs. Calming. Good for adults.",
  florals: "Botanical line art. Roses, leaves, vines. Soft femininity.",
  "animals-cute": "Chibi-style animals. Big eyes, sticker-friendly.",
  geometric: "Repeating shapes, tessellations, sacred geometry.",
  "fairy-tale": "Castles, mushrooms, fae creatures. Storybook feel.",
  doodle: "Loose, playful, hand-drawn imperfection.",
  cottagecore: "Cottages, gardens, jam jars, hens. Pressed-flower vibe.",
  "kawaii-faces": "Big-eye expressive faces. Easy color-in for kids.",
};

export const LINE_WEIGHT_LABELS: Record<LineWeight, string> = {
  fine: "Fine",
  medium: "Medium",
  bold: "Bold",
  mixed: "Mixed",
};

export const COMPLEXITY_LABELS: Record<Complexity, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

export const COMPLEXITY_DESCRIPTIONS: Record<Complexity, string> = {
  beginner: "Large, simple shapes. Big regions to color. Kids 4–7.",
  intermediate: "Moderate detail. Comfortable for kids 8–12 or adults relaxing.",
  advanced: "Dense detail. Adult coloring books. Stress relief.",
  expert: "Hyper-intricate. Hours per page. Premium-tier coloring books.",
};

export const PAGE_SIZE_LABELS: Record<PageSize, string> = {
  "us-letter": "US Letter",
  "kdp-8.5x11": "KDP 8.5×11",
  square: "Square",
  a4: "A4",
};

export const PAGE_SIZE_SPECS: Record<PageSize, { w: number; h: number; dpi: number; label: string }> = {
  "us-letter": { w: 8.5, h: 11, dpi: 300, label: "US Letter · 300 dpi" },
  "kdp-8.5x11": { w: 8.5, h: 11, dpi: 300, label: "KDP 8.5×11 · 300 dpi · bleed-safe" },
  square: { w: 8.5, h: 8.5, dpi: 300, label: "Square · 300 dpi" },
  a4: { w: 8.27, h: 11.69, dpi: 300, label: "A4 · 300 dpi" },
};

export const DEFAULT_STATE: ColoringPageState = {
  style: "mandala",
  motif: "rose with leaves at center",
  lineWeight: "medium",
  complexity: "intermediate",
  pageSize: "kdp-8.5x11",
  hasFrame: true,
  seed: 1234,
};
