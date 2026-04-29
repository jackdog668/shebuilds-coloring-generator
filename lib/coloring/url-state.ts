import {
  COLORING_STYLES,
  COMPLEXITIES,
  DEFAULT_STATE,
  LINE_WEIGHTS,
  PAGE_SIZES,
  type ColoringPageState,
  type ColoringStyle,
  type Complexity,
  type LineWeight,
  type PageSize,
} from "./types";

const idxOrDefault = <T extends string>(
  list: readonly T[],
  raw: string | null,
  fallback: T,
): T => {
  if (!raw) return fallback;
  const n = Number(raw);
  if (Number.isInteger(n) && n >= 0 && n < list.length) return list[n];
  return list.includes(raw as T) ? (raw as T) : fallback;
};

export function encodeState(s: ColoringPageState): string {
  const params = new URLSearchParams({
    s: COLORING_STYLES.indexOf(s.style).toString(),
    m: encodeURIComponent(s.motif).slice(0, 240),
    l: LINE_WEIGHTS.indexOf(s.lineWeight).toString(),
    c: COMPLEXITIES.indexOf(s.complexity).toString(),
    p: PAGE_SIZES.indexOf(s.pageSize).toString(),
    f: s.hasFrame ? "1" : "0",
    x: s.seed.toString(),
  });
  return params.toString();
}

export function decodeState(qs: string | URLSearchParams): ColoringPageState {
  const params = typeof qs === "string" ? new URLSearchParams(qs) : qs;
  const motifRaw = params.get("m");
  const motif = motifRaw ? decodeURIComponent(motifRaw).slice(0, 240) : DEFAULT_STATE.motif;
  const x = params.get("x");

  return {
    style: idxOrDefault<ColoringStyle>(COLORING_STYLES, params.get("s"), DEFAULT_STATE.style),
    motif: motif || DEFAULT_STATE.motif,
    lineWeight: idxOrDefault<LineWeight>(LINE_WEIGHTS, params.get("l"), DEFAULT_STATE.lineWeight),
    complexity: idxOrDefault<Complexity>(COMPLEXITIES, params.get("c"), DEFAULT_STATE.complexity),
    pageSize: idxOrDefault<PageSize>(PAGE_SIZES, params.get("p"), DEFAULT_STATE.pageSize),
    hasFrame: params.get("f") === "1",
    seed: x ? Math.max(0, Math.min(9999, Number(x) | 0)) : DEFAULT_STATE.seed,
  };
}
