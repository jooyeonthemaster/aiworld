"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C16 — Remotion 코드 기반 영상 [CASE / 미디어를 만들다]
 * Result(media): 세로(9:16) 영상 플레이어 목업 — 거대 카운트업 숫자 화면 +
 *   하단 타임라인 트랙(클립 블록 4개 + 재생헤드). reveal 로 차오르며 숫자가 카운트업.
 */

const SCRIPT: ClineScript = {
  project: "reels",
  userPrompt:
    "이 캠페인 숫자로 15초 인스타 릴스 영상 만들어줘. 카운트업 애니메이션.",
  steps: [
    { kind: "think", label: "씬 구성", detail: "타이틀 → 카운트업 → CTA, 15s @ 30fps" },
    { kind: "create", label: "Reel.tsx (remotion)", detail: "1080×1920 · 9:16 composition" },
    { kind: "edit", label: "카운트업 애니메이션", detail: "interpolate + spring · tabular nums" },
    { kind: "run", label: "render mp4", detail: "450 frames · headless chromium" },
  ],
  terminal: [
    { p: "$", t: "npx remotion render Reel" },
    { p: ">", t: "Rendering 450/450 frames · encoding h264…" },
    { p: ">", t: "✔ reel.mp4 · 15s · 1080×1920", gold: true },
  ],
};

/* 결정적 카운트업 표시 (Date/Random 미사용) */
function CountUp({ reveal, target }: { reveal: MotionValue<number>; target: number }) {
  const v = useTransform(reveal, [0.18, 0.78], [0, target]);
  const text = useTransform(v, (n) => Math.round(n).toLocaleString("en-US"));
  return <motion.span>{text}</motion.span>;
}

const CLIPS: { name: string; w: string; tint: string }[] = [
  { name: "title", w: "20%", tint: "bg-[#82AAFF]/35 border-[#82AAFF]/40" },
  { name: "count", w: "44%", tint: "bg-gold/30 border-gold/45" },
  { name: "logo", w: "16%", tint: "bg-[#C792EA]/30 border-[#C792EA]/40" },
  { name: "cta", w: "20%", tint: "bg-[#C3E88D]/25 border-[#C3E88D]/35" },
];

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.16], [0, 1]);
  const phoneO = useTransform(reveal, [0.1, 0.4], [0, 1]);
  const phoneY = useTransform(reveal, [0.1, 0.4], [18, 0]);
  const labelO = useTransform(reveal, [0.2, 0.45], [0, 1]);
  const numO = useTransform(reveal, [0.22, 0.5], [0, 1]);
  const numScale = useTransform(reveal, [0.22, 0.5], [0.86, 1]);
  const railO = useTransform(reveal, [0.55, 0.85], [0, 1]);
  const railY = useTransform(reveal, [0.55, 0.85], [12, 0]);
  const headX = useTransform(reveal, [0.6, 1], ["6%", "82%"]);

  // 클립별 등장 — 고정 개수(4) 훅을 명시적으로 선언(rules-of-hooks 안전)
  const clip0 = useTransform(reveal, [0.6, 0.74], [0, 1]);
  const clip1 = useTransform(reveal, [0.66, 0.8], [0, 1]);
  const clip2 = useTransform(reveal, [0.72, 0.86], [0, 1]);
  const clip3 = useTransform(reveal, [0.78, 0.92], [0, 1]);
  const clipOps = [clip0, clip1, clip2, clip3];

  return (
    <motion.div
      style={{ opacity: frameO }}
      className="absolute inset-0 flex items-center justify-center gap-[clamp(0.6rem,1.4vw,1.2rem)] px-4 py-4"
    >
      {/* ── 세로 9:16 플레이어 (패널 높이 ~70%로 낮춰 폭 축소) ── */}
      <motion.div
        style={{ opacity: phoneO, y: phoneY }}
        className="relative flex h-full max-h-full shrink-0 items-center justify-center"
      >
        <div className="relative aspect-[9/16] h-[70%] max-w-full overflow-hidden rounded-[1.4rem] border-2 border-bone/15 bg-[#0B0910] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
          {/* 영상 글로우 배경 */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(80% 55% at 50% 38%, rgba(232,181,75,0.20), transparent 72%)" }}
          />
          {/* 9:16 라벨 + REC */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-3 py-2.5">
            <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.25em] text-bone/65 md:text-[9px]">
              <span className="h-1.5 w-1.5 rounded-full bg-ember" /> REC
            </span>
            <span className="rounded border border-bone/15 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.18em] text-bone/65 md:text-[9px]">
              9 : 16
            </span>
          </div>

          {/* 카운트업 중심 화면 */}
          <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-3 text-center">
            <motion.span
              style={{ opacity: labelO }}
              className="font-mono text-[9px] uppercase tracking-[0.3em] text-bone/60 md:text-[11px]"
            >
              CAMPAIGN REACH
            </motion.span>
            <motion.div
              style={{ opacity: numO, scale: numScale }}
              className="mt-1 max-w-full whitespace-nowrap px-1 font-display font-black leading-none text-gold tabular-nums text-[clamp(1.3rem,2.8vw,2.5rem)]"
            >
              <CountUp reveal={reveal} target={184250} />
            </motion.div>
            <motion.span
              style={{ opacity: labelO }}
              className="mt-1 font-body text-[10px] font-semibold tracking-wide text-bone/70 md:text-[12px]"
            >
              +312% vs 지난달
            </motion.span>
          </div>

          {/* 하단 재생바 */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-2 px-3 py-2.5">
            <span className="font-mono text-[8px] text-bone/60 md:text-[9px]">00:09</span>
            <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-bone/15">
              <motion.div className="absolute inset-y-0 left-0 rounded-full bg-gold" style={{ width: headX }} />
            </div>
            <span className="font-mono text-[8px] text-bone/60 md:text-[9px]">00:15</span>
          </div>
        </div>
      </motion.div>

      {/* ── 타임라인 트랙 (세로 옆) — 패널 폭 안에 가둠 ── */}
      <motion.div
        style={{ opacity: railO, y: railY }}
        className="flex h-full max-h-full min-w-0 max-w-[58%] flex-1 flex-col justify-center gap-2 overflow-hidden pb-1"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="min-w-0 truncate font-mono text-[9px] uppercase tracking-[0.2em] text-bone/65 md:text-[10px]">timeline · 30fps</span>
          <span className="shrink-0 rounded bg-gold/15 px-2 py-0.5 font-mono text-[9px] text-gold md:text-[10px]">reel.mp4</span>
        </div>

        {/* 시간 눈금 */}
        <div className="flex items-center justify-between px-0.5 font-mono text-[8px] text-bone/60 md:text-[9px]">
          {["0s", "5s", "10s", "15s"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        {/* 클립 트랙 + 재생헤드 */}
        <div className="relative overflow-hidden rounded-lg border border-bone/10 bg-bone/[0.03] p-2">
          <div className="flex h-12 gap-1 md:h-16">
            {CLIPS.map((c, i) => {
              return (
                <motion.div
                  key={c.name}
                  style={{ width: c.w, opacity: clipOps[i] }}
                  className={`flex min-w-0 flex-col justify-between overflow-hidden rounded-md border px-1.5 py-1.5 ${c.tint}`}
                >
                  <span className="truncate whitespace-nowrap font-mono text-[7px] text-bone/80 md:text-[9px]">{c.name}</span>
                  <span className="flex h-2 items-end gap-0.5 md:h-3">
                    {[0, 1, 2, 3, 4].map((b) => (
                      <span
                        key={b}
                        className="w-0.5 flex-1 rounded-sm bg-bone/30"
                        style={{ height: `${30 + ((i * 17 + b * 23) % 70)}%` }}
                      />
                    ))}
                  </span>
                </motion.div>
              );
            })}
          </div>
          {/* 재생헤드 */}
          <motion.div
            className="pointer-events-none absolute inset-y-1.5 z-10 w-px bg-gold"
            style={{ left: headX }}
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-full rotate-45 rounded-[1px] bg-gold" />
          </motion.div>
        </div>

        <p className="font-body text-[10px] leading-snug text-bone/70 md:text-[12px]">
          데이터가 바뀌면 코드가 다시 렌더 — 매번 새 영상이 자동으로.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function C16Remotion() {
  return (
    <CaseScene
      scene="c16"
      act="CASE · 미디어를 만들다"
      cluster="D · 미디어를 만들다"
      num={16}
      title="Remotion 코드 기반 영상"
      oldTool="프리미어/애프터이펙트 구독 · 영상 외주"
      lead="코드로 만드는 영상. 데이터 바뀌면 영상도 자동으로 다시."
      script={SCRIPT}
      Result={Result}
      resultTab="미리보기 — reel.mp4"
    />
  );
}
