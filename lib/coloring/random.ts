import { MOTIF_SUGGESTIONS } from "./motifs";
import {
  COLORING_STYLES,
  COMPLEXITIES,
  LINE_WEIGHTS,
  PAGE_SIZES,
  type ColoringPageState,
} from "./types";

const pick = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

export function randomState(prev: ColoringPageState): ColoringPageState {
  const style = pick(COLORING_STYLES);
  return {
    style,
    motif: pick(MOTIF_SUGGESTIONS[style]),
    lineWeight: pick(LINE_WEIGHTS),
    complexity: pick(COMPLEXITIES),
    pageSize: prev.pageSize,
    hasFrame: Math.random() > 0.4,
    seed: Math.floor(Math.random() * 9999),
  };
}
