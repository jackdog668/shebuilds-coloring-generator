import {
  COMPLEXITY_LABELS,
  STYLE_LABELS,
  type ColoringPageState,
} from "./types";

export interface BuiltListing {
  title: string;
  description: string;
  tags: string[];
  asMarkdown: string;
}

/**
 * Crafts a KDP/Etsy-friendly listing draft for a coloring book page or set.
 * Title kept under 200 chars (KDP limit). Tags ≤ 7 (KDP keyword limit, 50 chars each).
 */
export function buildListing(state: ColoringPageState): BuiltListing {
  const styleLabel = STYLE_LABELS[state.style];
  const complexity = COMPLEXITY_LABELS[state.complexity];

  const title =
    `${styleLabel} Coloring Book — ${complexity} | Printable Coloring Pages | ` +
    `KDP Ready | PDF Download | ${state.motif} and More`;

  const description = [
    `${styleLabel.toUpperCase()} COLORING BOOK — A printable, print-on-demand-ready coloring book featuring ${state.motif}.`,
    ``,
    `WHAT'S INCLUDED`,
    `• High-resolution PDF, ${state.pageSize.toUpperCase()} format, 300 dpi`,
    `• Black-and-white line art only — no color, ready to fill`,
    `• ${complexity} difficulty — ${state.style === "kawaii-faces" || state.style === "animals-cute" ? "great for kids and beginners" : state.complexity === "expert" ? "challenge-level for serious colorists" : "comfortable adult coloring"}`,
    `• Each page printed single-sided to prevent bleed-through`,
    `• Personal + small commercial license`,
    ``,
    `PERFECT FOR`,
    `• KDP coloring book authors`,
    `• Etsy printable shops`,
    `• Bullet journal coloring inserts`,
    `• Classroom and therapist mindfulness sessions`,
    `• Bridal showers, baby showers, slow-living gifts`,
    ``,
    `INSTANT DOWNLOAD — files available the moment you check out. No physical product will be shipped.`,
    ``,
    `Made with care by SheBuilds Digital. See more tools at shebuildsdigital.com.`,
  ].join("\n");

  const baseTags = [
    `${styleLabel.toLowerCase()} coloring`,
    `${state.style.replace(/-/g, " ")} pages`,
    `${complexity.toLowerCase()} coloring`,
    "printable coloring pages",
    "kdp coloring book",
    "instant download",
    "adult coloring",
  ]
    .map((t) => (t.length > 50 ? t.slice(0, 50).trim() : t));

  const tags = Array.from(new Set(baseTags)).slice(0, 7);

  const asMarkdown =
    `# ${title}\n\n` +
    `**Keywords:** ${tags.join(", ")}\n\n` +
    `${description}`;

  return { title, description, tags, asMarkdown };
}
