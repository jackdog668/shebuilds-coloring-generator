import type { ColoringStyle } from "./types";

/** Curated motif suggestions per style — saves users a blank-page moment. */
export const MOTIF_SUGGESTIONS: Record<ColoringStyle, string[]> = {
  mandala: [
    "rose with leaves at center",
    "lotus with sun rays",
    "celestial moon and stars",
    "geometric flower of life",
    "sunburst with petals",
    "celtic knot center",
  ],
  florals: [
    "rose bouquet with vines",
    "wildflower meadow",
    "peonies and lavender",
    "wisteria branches",
    "magnolia and ivy",
    "daisy chain border",
  ],
  "animals-cute": [
    "sleepy fox curled up",
    "smiling whale with bubbles",
    "bunny holding a flower",
    "owl on a branch",
    "kitten in a teacup",
    "hedgehog under a leaf",
  ],
  geometric: [
    "tessellating hexagons",
    "art-deco fan border",
    "celtic interlace",
    "moroccan tile star",
    "concentric squares",
    "isometric cubes",
  ],
  "fairy-tale": [
    "castle on a hill with stars",
    "mushroom cottage in the woods",
    "fairy with butterfly wings",
    "wise owl with spell book",
    "dragon coiled around a tower",
    "moonlit forest scene",
  ],
  doodle: [
    "coffee shop morning scene",
    "self-care affirmations frame",
    "kawaii food collection",
    "study desk doodles",
    "weekend mood board",
    "motivational quote frame",
  ],
  cottagecore: [
    "cottage with garden gate",
    "jam jars and bread",
    "honeybee and lavender",
    "vintage tea set",
    "wildflower wreath",
    "hen and her chicks",
  ],
  "kawaii-faces": [
    "smiling cloud with cheeks",
    "sleepy moon face",
    "happy strawberry",
    "shy mushroom",
    "rainbow with face",
    "chubby cat face with stars",
  ],
};
