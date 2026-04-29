"use client";

import { PRESETS } from "@/lib/coloring/presets";
import { isSameState } from "@/lib/coloring/favorites";
import type { ColoringPageState } from "@/lib/coloring/types";
import { cn } from "@/lib/cn";

interface Props {
  current: ColoringPageState;
  onSelect: (state: ColoringPageState) => void;
}

export function PresetRail({ current, onSelect }: Props) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="label">Curated</h3>
        <span className="font-mono text-[10px] text-cream-muted/60">One-tap presets</span>
      </div>
      <div className="-mx-6 overflow-x-auto px-6 pb-2 lg:mx-0 lg:px-0">
        <div className="flex gap-2 lg:flex-wrap">
          {PRESETS.map((preset) => {
            const active = isSameState(current, preset.state);
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelect(preset.state)}
                aria-pressed={active}
                className={cn(
                  "flex flex-shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs transition-all",
                  active
                    ? "border-gold/60 bg-gold/10 text-cream"
                    : "border-cream/10 text-cream-muted hover:border-cream/30 hover:text-cream",
                )}
              >
                <span className="font-display tracking-tight">{preset.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
