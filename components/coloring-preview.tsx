"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Download, AlertTriangle } from "lucide-react";
import { buildColoringPrompt } from "@/lib/coloring/prompt-builder";
import { PAGE_SIZE_SPECS, STYLE_LABELS, type ColoringPageState } from "@/lib/coloring/types";

interface Props {
  state: ColoringPageState;
}

interface GenerateResult {
  status: "idle" | "loading" | "success" | "error";
  image?: string;
  error?: string;
  remaining?: number;
}

export function ColoringPreview({ state }: Props) {
  const [result, setResult] = useState<GenerateResult>({ status: "idle" });
  const prompt = useMemo(() => buildColoringPrompt(state), [state]);
  const pageSpec = PAGE_SIZE_SPECS[state.pageSize];
  const aspect = pageSpec.w === pageSpec.h ? "aspect-square" : "aspect-[8.5/11]";

  const handleGenerate = async () => {
    setResult({ status: "loading" });
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.full, negative: prompt.negative }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult({
          status: "error",
          error: data.error ?? "Generation failed.",
          remaining: data.remaining,
        });
        return;
      }

      setResult({ status: "success", image: data.image, remaining: data.remaining });
    } catch (e) {
      console.error(e);
      setResult({ status: "error", error: "Network error. Try the copy-prompt path." });
    }
  };

  const handleDownload = () => {
    if (!result.image) return;
    const a = document.createElement("a");
    a.href = result.image;
    a.download = `shebuilds-coloring-${state.style}-${state.seed}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div>
      <motion.div
        key={`${state.style}-${state.seed}-${result.status}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`relative w-full overflow-hidden rounded-md bg-cream shadow-elevated ring-1 ring-cream/10 ${aspect}`}
        aria-label={`${STYLE_LABELS[state.style]} coloring page preview`}
      >
        <CornerBrackets />

        {result.status === "success" && result.image ? (
          <img src={result.image} alt={`Generated ${STYLE_LABELS[state.style]} coloring page`} className="h-full w-full object-contain" />
        ) : (
          <PlaceholderPreview state={state} />
        )}

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-md bg-bg/70 px-3 py-2 backdrop-blur-md">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream-muted">
            {result.status === "success"
              ? "AI-generated · ready to download"
              : `Placeholder vibe · ${pageSpec.label}`}
          </p>
          {typeof result.remaining === "number" && (
            <span className="font-mono text-[10px] text-gold">
              {result.remaining} left this hour
            </span>
          )}
        </div>
      </motion.div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={result.status === "loading"}
          className="group inline-flex items-center gap-2 rounded-full bg-gold-shimmer bg-[length:200%_200%] px-5 py-2.5 text-sm font-medium text-ink shadow-gold-soft transition-all hover:shadow-gold hover:bg-[position:100%_50%] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {result.status === "loading" ? (
            <>
              <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-ink border-t-transparent" />
              Conjuring…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
              Generate with AI
            </>
          )}
        </button>

        {result.status === "success" && (
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm text-cream transition-all hover:border-gold hover:bg-gold/5"
          >
            <Download className="h-4 w-4" />
            Download PNG
          </button>
        )}
      </div>

      {result.status === "error" && (
        <div className="mt-3 flex items-start gap-2 rounded-md border border-rose-300/30 bg-rose-300/5 px-4 py-3 text-sm text-cream">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-300" />
          <span>{result.error}</span>
        </div>
      )}

      <p className="mt-3 font-mono text-[11px] leading-relaxed text-cream-muted/70">
        Free tier: 5 AI generations per hour. Copy the prompt instead for unlimited use in your own AI tool.
      </p>
    </div>
  );
}

function PlaceholderPreview({ state }: { state: ColoringPageState }) {
  const seed = state.seed % 12;
  const ringCount = state.complexity === "expert" ? 9 : state.complexity === "advanced" ? 7 : state.complexity === "intermediate" ? 5 : 3;
  const ringSpacing = 100 / (ringCount + 1);

  return (
    <svg viewBox="0 0 800 1040" className="h-full w-full">
      <rect width="800" height="1040" fill="#F5F0E8" />
      {state.hasFrame && (
        <rect
          x="40"
          y="40"
          width="720"
          height="960"
          fill="none"
          stroke="#0A0A0A"
          strokeWidth="3"
          strokeDasharray="2 6"
          rx="12"
        />
      )}
      <g transform="translate(400, 520)">
        {[...Array(ringCount)].map((_, i) => {
          const r = ringSpacing * (i + 1) * 4;
          const petals = 8 + (i + seed) % 6;
          return (
            <g key={i}>
              <circle cx="0" cy="0" r={r} fill="none" stroke="#0A0A0A" strokeWidth="1.5" />
              {[...Array(petals)].map((_, j) => {
                const angle = (j / petals) * Math.PI * 2;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                return <circle key={j} cx={x} cy={y} r="6" fill="none" stroke="#0A0A0A" strokeWidth="1.5" />;
              })}
            </g>
          );
        })}
      </g>
      <text
        x="400"
        y="980"
        textAnchor="middle"
        fontFamily="serif"
        fontStyle="italic"
        fontSize="14"
        fill="#0A0A0A"
        opacity="0.4"
      >
        click Generate to conjure your AI page
      </text>
    </svg>
  );
}

function CornerBrackets() {
  const arm = "absolute h-4 w-4 border-gold pointer-events-none z-10";
  return (
    <>
      <span className={`${arm} top-2 left-2 border-t border-l`} />
      <span className={`${arm} top-2 right-2 border-t border-r`} />
      <span className={`${arm} bottom-2 left-2 border-b border-l`} />
      <span className={`${arm} bottom-2 right-2 border-b border-r`} />
    </>
  );
}
