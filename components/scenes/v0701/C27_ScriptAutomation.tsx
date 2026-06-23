"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C27 — 반복작업 스크립트화 [CASE / 클러스터 F · 전부 자동으로]
 * Result: 4단계 파이프라인(데이터→정리→리포트→메일)이 화살표로 가로 연결되며 점등 →
 * "매주 자동" 골드 배지 → "12분 → 8초" 거대 대비. 다른 사례와 확연히 구별되는 플로우 패널.
 */

const SCRIPT: ClineScript = {
  project: "automation",
  userPrompt:
    "매주 하는 '데이터 받기→정리→리포트→메일' 과정을 한 번에 도는 스크립트로 만들어줘.",
  steps: [
    { kind: "think", label: "단계 분해", detail: "4단계 파이프라인 설계" },
    { kind: "create", label: "weekly.py", detail: "fetch · clean · report · mail" },
    { kind: "run", label: "테스트 실행", detail: "python weekly.py" },
  ],
  terminal: [
    { p: "$", t: "python weekly.py" },
    { p: ">", t: "✔ 4 steps 자동화 · 12분 → 8초", gold: true },
  ],
};

/* 파이프라인 4단계 정의 */
const STAGES: { label: string; sub: string; glyph: "data" | "clean" | "report" | "mail" }[] = [
  { label: "데이터", sub: "fetch", glyph: "data" },
  { label: "정리", sub: "clean", glyph: "clean" },
  { label: "리포트", sub: "report", glyph: "report" },
  { label: "메일", sub: "mail", glyph: "mail" },
];

function StageGlyph({ kind }: { kind: "data" | "clean" | "report" | "mail" }) {
  const c = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "data":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <ellipse cx="12" cy="6" rx="7" ry="3" {...c} />
          <path d="M5 6v12c0 1.6 3.1 3 7 3s7-1.4 7-3V6M5 12c0 1.6 3.1 3 7 3s7-1.4 7-3" {...c} />
        </svg>
      );
    case "clean":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path d="M4 7h16M7 7v12h10V7M9 11h6M9 15h4" {...c} />
        </svg>
      );
    case "report":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path d="M6 3h9l4 4v14H6zM15 3v4h4" {...c} />
          <path d="M9 13v4M12 11v6M15 14v3" {...c} />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <rect x="3" y="6" width="18" height="12" rx="2" {...c} />
          <path d="M4 7l8 6 8-6" {...c} />
        </svg>
      );
  }
}

/* 한 단계 박스 — reveal 하위구간으로 stagger 점등 */
function StageBox({
  reveal,
  i,
  label,
  sub,
  glyph,
}: {
  reveal: MotionValue<number>;
  i: number;
  label: string;
  sub: string;
  glyph: "data" | "clean" | "report" | "mail";
}) {
  const a = 0.18 + i * 0.13;
  const o = useTransform(reveal, [a, a + 0.12], [0, 1]);
  const y = useTransform(reveal, [a, a + 0.12], [16, 0]);
  const s = useTransform(reveal, [a, a + 0.12], [0.9, 1]);
  return (
    <motion.div
      style={{ opacity: o, y, scale: s }}
      className="flex w-[19%] shrink-0 flex-col items-center gap-1.5 rounded-xl border border-bone/12 bg-bone/[0.04] px-1 py-3"
    >
      <span className="text-gold/85">
        <StageGlyph kind={glyph} />
      </span>
      <span className="font-display text-[clamp(0.78rem,1vw,1rem)] font-bold leading-none text-bone/90">
        {label}
      </span>
      <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-bone/40 md:text-[10px]">
        {sub}
      </span>
    </motion.div>
  );
}

/* 단계 사이 화살표 — 흐름이 차오르듯 점등 */
function FlowArrow({ reveal, i }: { reveal: MotionValue<number>; i: number }) {
  const a = 0.24 + i * 0.13;
  const o = useTransform(reveal, [a, a + 0.1], [0, 1]);
  const draw = useTransform(reveal, [a, a + 0.12], [0, 1]);
  return (
    <motion.svg
      style={{ opacity: o }}
      viewBox="0 0 28 16"
      className="h-4 w-[5.5%] shrink-0 text-gold"
      fill="none"
      aria-hidden
    >
      <motion.path
        d="M2 8h20M18 4l5 4-5 4"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength: draw }}
      />
    </motion.svg>
  );
}

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.14], [0, 1]);
  const badgeO = useTransform(reveal, [0.62, 0.78], [0, 1]);
  const badgeS = useTransform(reveal, [0.62, 0.78], [0.85, 1]);
  const beforeO = useTransform(reveal, [0.72, 0.86], [0, 1]);
  const afterO = useTransform(reveal, [0.82, 0.98], [0, 1]);
  const afterS = useTransform(reveal, [0.82, 0.98], [0.8, 1]);

  return (
    <motion.div
      style={{ opacity: frameO }}
      className="absolute inset-0 flex flex-col justify-center gap-[clamp(0.9rem,2.4vh,1.8rem)] p-[clamp(0.9rem,2.6vw,1.6rem)]"
    >
      {/* 파일 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-[2px] bg-[#C3E88D]/80" />
          <span className="font-mono text-[10px] tracking-[0.06em] text-bone/55 md:text-[11px]">
            weekly.py — 파이프라인
          </span>
        </div>
        <motion.span
          style={{ opacity: badgeO, scale: badgeS }}
          className="rounded-full border border-gold/35 bg-gold/[0.12] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-gold md:text-[10px] [text-shadow:0_0_18px_rgba(232,181,75,0.45)]"
        >
          매주 자동 ↻
        </motion.span>
      </div>

      {/* 4단계 가로 파이프라인 */}
      <div className="flex w-full items-center justify-between">
        {STAGES.map((st, i) => (
          <Step key={st.label} reveal={reveal} i={i} st={st} last={i === STAGES.length - 1} />
        ))}
      </div>

      {/* 12분 → 8초 거대 대비 */}
      <div className="flex items-end justify-center gap-[clamp(1rem,3vw,2.2rem)] rounded-xl border border-bone/10 bg-coal/60 px-3 py-[clamp(0.8rem,2.2vh,1.4rem)]">
        <motion.div style={{ opacity: beforeO }} className="flex flex-col items-center">
          <span className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-black leading-none text-bone/40 line-through decoration-ember/60 decoration-2">
            12분
          </span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-bone/35 md:text-[10px]">
            매주 수작업
          </span>
        </motion.div>

        <span className="mb-2 font-display text-[clamp(1.2rem,2vw,1.8rem)] leading-none text-gold">
          →
        </span>

        <motion.div style={{ opacity: afterO, scale: afterS }} className="flex flex-col items-center">
          <span className="font-display text-[clamp(2.4rem,5.4vw,4.2rem)] font-black leading-none text-gold [text-shadow:0_0_34px_rgba(232,181,75,0.45)]">
            8초
          </span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-gold/75 md:text-[10px]">
            한 클릭
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* 박스 + (마지막 아니면) 화살표 묶음 */
function Step({
  reveal,
  i,
  st,
  last,
}: {
  reveal: MotionValue<number>;
  i: number;
  st: { label: string; sub: string; glyph: "data" | "clean" | "report" | "mail" };
  last: boolean;
}) {
  return (
    <>
      <StageBox reveal={reveal} i={i} label={st.label} sub={st.sub} glyph={st.glyph} />
      {!last ? <FlowArrow reveal={reveal} i={i} /> : null}
    </>
  );
}

export default function C27ScriptAutomation() {
  return (
    <CaseScene
      scene="c27"
      act="CASE · 전부 자동으로"
      cluster="F · 전부 자동으로"
      num={27}
      title="반복작업 스크립트화"
      oldTool="매번 수작업 · 자동화 SaaS(Zapier)"
      lead="매주 반복하던 그 작업. 한 번 스크립트로 만들면 평생 한 클릭."
      script={SCRIPT}
      Result={Result}
      resultTab="파이프라인"
    />
  );
}
