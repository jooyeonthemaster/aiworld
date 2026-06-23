"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C23 — 리뷰 스크래핑 → 감성요약 [CASE / 클러스터 E · 데이터를 캐다]
 * Result: 도넛 차트(긍정 72% 골드 / 부정 28% ember) + "불만 TOP5" 가로 막대 리스트.
 * reveal 하위구간으로 도넛 호 그리기 → 중앙 숫자 → 범례 → TOP5 막대 stagger.
 */

const SCRIPT: ClineScript = {
  project: "voc",
  userPrompt:
    "이 제품 리뷰 전부 긁어서 긍정·부정 비율이랑 자주 나오는 불만 top5 정리해줘.",
  steps: [
    { kind: "web", label: "리뷰 480개 수집", detail: "쇼핑몰 3곳 · 페이지네이션 순회" },
    { kind: "think", label: "감성분석", detail: "긍/부정 분류 · 불만 토픽 클러스터링" },
    { kind: "create", label: "voc_report.md 생성", detail: "비율 · TOP5 · 대표 인용" },
  ],
};

/* ── 불만 TOP5 (결정적 데이터) ── */
const COMPLAINTS: { label: string; pct: number }[] = [
  { label: "배송 지연", pct: 34 },
  { label: "가격 부담", pct: 26 },
  { label: "사이즈 오차", pct: 19 },
  { label: "내구성", pct: 13 },
  { label: "포장 상태", pct: 8 },
];

/* 도넛 기하 — 반지름 52, 둘레 = 2πr */
const R = 52;
const CIRC = 2 * Math.PI * R; // ≈ 326.7
const POS = 0.72; // 긍정 72%

/* 세그먼트(누적 오프셋 사전계산) — 긍정 끝에서 부정이 빈틈없이 이어붙음 */
const DONUT_SEG: { len: number; offset: number; color: string; glow?: boolean }[] = (() => {
  const fracs: { frac: number; color: string; glow?: boolean }[] = [
    { frac: POS, color: "#e8b54b", glow: true }, // 긍정 72% (gold)
    { frac: 1 - POS, color: "#ff4b2e" }, // 부정 28% (ember)
  ];
  let offset = 0;
  return fracs.map((s) => {
    const len = s.frac * CIRC;
    const row = { len, offset, color: s.color, glow: s.glow };
    offset += len;
    return row;
  });
})();

/* 도넛 한 조각 (hook 안전: 컴포넌트 최상위에서 useTransform) */
function DonutSeg({
  seg,
  draw,
}: {
  seg: { len: number; offset: number; color: string; glow?: boolean };
  draw: MotionValue<number>;
}) {
  const dash = useTransform(draw, (d) => `${d * seg.len} ${CIRC}`);
  return (
    <motion.circle
      cx="70"
      cy="70"
      r={R}
      fill="none"
      stroke={seg.color}
      strokeWidth="16"
      strokeLinecap="butt"
      strokeDashoffset={-seg.offset}
      style={{
        strokeDasharray: dash,
        ...(seg.glow ? { filter: "drop-shadow(0 0 10px rgba(232,181,75,0.35))" } : null),
      }}
    />
  );
}

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  /* 프레임 */
  const frameO = useTransform(reveal, [0, 0.16], [0, 1]);

  /* 도넛 호: 가시 길이만 0→목표로 보간 (두 호가 빈틈없이 100%를 채움) */
  const donutDraw = useTransform(reveal, [0.1, 0.6], [0, 1]);

  /* 중앙 숫자 + 범례 */
  const coreO = useTransform(reveal, [0.4, 0.6], [0, 1]);
  const coreS = useTransform(reveal, [0.4, 0.62], [0.86, 1]);
  const legendO = useTransform(reveal, [0.5, 0.7], [0, 1]);

  /* TOP5 헤더 */
  const topHeadO = useTransform(reveal, [0.46, 0.62], [0, 1]);
  const topHeadX = useTransform(reveal, [0.46, 0.62], [12, 0]);

  return (
    <motion.div
      style={{ opacity: frameO }}
      className="absolute inset-0 flex flex-col gap-3 bg-[#0B0A0F] p-[clamp(0.7rem,1.4vw,1.4rem)]"
    >
      {/* 문서 헤더 — voc_report.md 느낌 */}
      <div className="flex items-center justify-between border-b border-bone/10 pb-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-[2px] bg-gold/70" />
          <span className="font-mono text-[10px] tracking-[0.06em] text-bone/70 md:text-[11px]">
            감성 요약 · 리뷰 480개
          </span>
        </div>
        <span className="rounded-full border border-bone/15 bg-bone/[0.04] px-2 py-0.5 font-mono text-[9px] tracking-[0.05em] text-bone/60 md:text-[10px]">
          .md
        </span>
      </div>

      {/* 본문: [도넛] | [TOP5] */}
      <div className="grid min-h-0 flex-1 grid-cols-[0.92fr_1.08fr] items-center gap-[clamp(0.6rem,1.4vw,1.6rem)]">
        {/* ── 도넛 차트 ── */}
        <div className="flex h-full flex-col items-center justify-center">
          <div className="relative aspect-square w-[clamp(140px,13vw,204px)]">
            <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
              {/* 트랙 */}
              <circle
                cx="70"
                cy="70"
                r={R}
                fill="none"
                stroke="rgba(242,237,227,0.07)"
                strokeWidth="16"
              />
              {/* 세그먼트: 긍정(gold) → 부정(ember) 가 빈틈없이 100%를 채움 */}
              {DONUT_SEG.map((seg) => (
                <DonutSeg key={seg.color} seg={seg} draw={donutDraw} />
              ))}
            </svg>

            {/* 중앙 숫자 */}
            <motion.div
              style={{ opacity: coreO, scale: coreS }}
              className="absolute inset-0 flex flex-col items-center justify-center rotate-0"
            >
              <span className="font-display font-black leading-none text-gold text-[clamp(1.6rem,2.3vw,2.7rem)] [text-shadow:0_0_24px_rgba(232,181,75,0.4)]">
                72%
              </span>
              <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-bone/60 md:text-[10px]">
                긍정
              </span>
              <span className="mt-1 font-mono text-[8px] tracking-[0.14em] text-bone/60 md:text-[9px]">
                리뷰 480개
              </span>
            </motion.div>
          </div>

          {/* 범례 */}
          <motion.div
            style={{ opacity: legendO }}
            className="mt-3 flex items-center gap-4"
          >
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[2px] bg-gold" />
              <span className="font-body text-[10px] text-bone/75 md:text-[12px]">긍정 72%</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[2px] bg-ember" />
              <span className="font-body text-[10px] text-bone/75 md:text-[12px]">부정 28%</span>
            </span>
          </motion.div>
        </div>

        {/* ── 불만 TOP5 가로 막대 ── */}
        <div className="flex h-full min-w-0 flex-col justify-center gap-[clamp(0.45rem,1vh,0.85rem)] border-l border-bone/10 pl-[clamp(0.6rem,1.2vw,1.4rem)]">
          <motion.div
            style={{ opacity: topHeadO, x: topHeadX }}
            className="flex items-baseline gap-2"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember/80 md:text-[11px]">
              불만 TOP5
            </span>
            <span className="font-mono text-[9px] text-bone/35 md:text-[10px]">자주 나온 토픽</span>
          </motion.div>

          {COMPLAINTS.map((c, i) => (
            <ComplaintBar key={c.label} reveal={reveal} item={c} i={i} rank={i + 1} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── 가로 막대 1행 (reveal 하위구간 stagger) ── */
function ComplaintBar({
  reveal,
  item,
  i,
  rank,
}: {
  reveal: MotionValue<number>;
  item: { label: string; pct: number };
  i: number;
  rank: number;
}) {
  const at = 0.58 + i * 0.07;
  const o = useTransform(reveal, [at, at + 0.08], [0, 1]);
  const x = useTransform(reveal, [at, at + 0.08], [16, 0]);
  const scaleX = useTransform(reveal, [at + 0.02, at + 0.16], [0, 1]);
  const isTop = rank === 1;

  return (
    <motion.div style={{ opacity: o, x }} className="flex items-center gap-2.5">
      <span
        className={`w-4 shrink-0 text-right font-mono text-[9px] tabular-nums md:text-[10px] ${
          isTop ? "text-ember" : "text-bone/35"
        }`}
      >
        {rank}
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-baseline justify-between gap-2">
          <span
            className={`whitespace-nowrap font-body text-[clamp(0.72rem,0.92vw,0.98rem)] ${
              isTop ? "font-semibold text-bone/90" : "text-bone/75"
            }`}
          >
            {item.label}
          </span>
          <span
            className={`shrink-0 font-mono text-[9px] tabular-nums md:text-[11px] ${
              isTop ? "text-ember" : "text-bone/45"
            }`}
          >
            {item.pct}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-bone/[0.06]">
          <motion.div
            style={{ scaleX, width: `${(item.pct / COMPLAINTS[0].pct) * 100}%` }}
            className={`h-full origin-left rounded-full ${
              isTop ? "bg-ember" : "bg-ember/45"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function C23ReviewSentiment() {
  return (
    <CaseScene
      scene="c23"
      act="CASE · 데이터를 캐다"
      cluster="E · 데이터를 캐다"
      num={23}
      title="리뷰 스크래핑 → 감성요약"
      oldTool="리뷰분석 SaaS · VOC 툴"
      lead="리뷰 수백 개를 긁어 긍/부정과 핵심 불만을 요약."
      script={SCRIPT}
      Result={Result}
      resultTab="voc_report.md"
    />
  );
}
