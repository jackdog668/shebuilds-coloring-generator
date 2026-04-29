"use client";

import { Shuffle } from "lucide-react";
import { MOTIF_SUGGESTIONS } from "@/lib/coloring/motifs";
import {
  COLORING_STYLES,
  COMPLEXITIES,
  COMPLEXITY_DESCRIPTIONS,
  COMPLEXITY_LABELS,
  LINE_WEIGHTS,
  LINE_WEIGHT_LABELS,
  PAGE_SIZES,
  PAGE_SIZE_LABELS,
  STYLE_DESCRIPTIONS,
  STYLE_LABELS,
  type ColoringPageState,
  type ColoringStyle,
  type Complexity,
  type LineWeight,
  type PageSize,
} from "@/lib/coloring/types";
import { cn } from "@/lib/cn";

interface Props {
  state: ColoringPageState;
  onChange: (next: ColoringPageState) => void;
  onRandom: () => void;
}

export function ControlPanel({ state, onChange, onRandom }: Props) {
  const set = <K extends keyof ColoringPageState>(key: K, value: ColoringPageState[K]) =>
    onChange({ ...state, [key]: value });

  const suggestions = MOTIF_SUGGESTIONS[state.style];

  return (
    <div className="space-y-8">
      <Section label="Style">
        <div className="grid grid-cols-2 gap-1.5">
          {COLORING_STYLES.map((s) => (
            <Chip
              key={s}
              active={state.style === s}
              onClick={() => set("style", s as ColoringStyle)}
              label={STYLE_LABELS[s]}
            />
          ))}
        </div>
        <p className="mt-3 font-mono text-[11px] leading-relaxed text-cream-muted">
          {STYLE_DESCRIPTIONS[state.style]}
        </p>
      </Section>

      <Section label="Motif">
        <input
          type="text"
          value={state.motif}
          onChange={(e) => set("motif", e.target.value.slice(0, 240))}
          placeholder="e.g. rose bouquet with vines"
          className="w-full rounded-md border border-cream/15 bg-bg/40 px-3 py-2 text-sm text-cream placeholder:text-cream-muted/40 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/30"
        />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => set("motif", s)}
              className={cn(
                "rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-all",
                state.motif === s
                  ? "border-gold/60 bg-gold/10 text-cream"
                  : "border-cream/10 text-cream-muted hover:border-cream/30 hover:text-cream",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </Section>

      <Section label="Line weight">
        <div className="grid grid-cols-4 gap-1.5">
          {LINE_WEIGHTS.map((l) => (
            <Chip
              key={l}
              active={state.lineWeight === l}
              onClick={() => set("lineWeight", l as LineWeight)}
              label={LINE_WEIGHT_LABELS[l]}
              size="sm"
            />
          ))}
        </div>
      </Section>

      <Section label="Complexity">
        <div className="grid grid-cols-2 gap-1.5">
          {COMPLEXITIES.map((c) => (
            <Chip
              key={c}
              active={state.complexity === c}
              onClick={() => set("complexity", c as Complexity)}
              label={COMPLEXITY_LABELS[c]}
              size="sm"
            />
          ))}
        </div>
        <p className="mt-3 font-mono text-[11px] leading-relaxed text-cream-muted">
          {COMPLEXITY_DESCRIPTIONS[state.complexity]}
        </p>
      </Section>

      <Section label="Page size">
        <div className="grid grid-cols-2 gap-1.5">
          {PAGE_SIZES.map((p) => (
            <Chip
              key={p}
              active={state.pageSize === p}
              onClick={() => set("pageSize", p as PageSize)}
              label={PAGE_SIZE_LABELS[p]}
              size="sm"
            />
          ))}
        </div>
      </Section>

      <Section label="Frame">
        <button
          type="button"
          onClick={() => set("hasFrame", !state.hasFrame)}
          className={cn(
            "flex w-full items-center justify-between rounded-md border px-3 py-2.5 transition-all",
            state.hasFrame
              ? "border-gold/60 bg-gold/10 text-cream"
              : "border-cream/10 text-cream-muted hover:border-cream/30 hover:text-cream",
          )}
        >
          <span className="font-display text-sm leading-tight">Ornamental frame border</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em]">
            {state.hasFrame ? "On" : "Off"}
          </span>
        </button>
      </Section>

      <button
        type="button"
        onClick={onRandom}
        className="group flex w-full items-center justify-between rounded-full border border-cream/15 px-5 py-3 text-sm transition-all hover:border-gold/60 hover:bg-gold/5"
      >
        <span className="font-mono uppercase tracking-[0.16em] text-[11px] text-cream-muted group-hover:text-cream">
          Surprise me
        </span>
        <Shuffle className="h-4 w-4 text-gold transition-transform group-hover:rotate-12" />
      </button>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="label mb-3">{label}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  label,
  size = "md",
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  size?: "sm" | "md";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-md border text-left transition-all",
        size === "sm" ? "px-3 py-2 text-[12px]" : "px-3 py-2.5 text-sm",
        active
          ? "border-gold/60 bg-gold/10 text-cream shadow-gold-soft"
          : "border-cream/10 text-cream-muted hover:border-cream/30 hover:text-cream",
      )}
    >
      <div className={cn("font-display leading-tight", size === "sm" ? "text-sm" : "text-base")}>
        {label}
      </div>
    </button>
  );
}
