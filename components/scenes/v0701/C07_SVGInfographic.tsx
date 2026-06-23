"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C07 — SVG 인포그래픽 제작 [CASE · 눈에 보이게 / 클러스터 B]
 * Result: 실제 렌더된 벡터 인포그래픽. 가로 3단계 성장 타임라인을
 * SVG로 직접 그린다 — 연결선 path 가 그려지고(pathLength) → 골드 노드 3개가
 * 순차 점등(scale) → 각 단계 수치/라벨이 stagger 로 차오른다. 배경 장식 포함.
 */

const SCRIPT: ClineScript = {
  project: "infographic",
  userPrompt:
    "우리 성장 스토리 인포그래픽 SVG로 만들어줘. 골드 톤, 3단계 타임라인.",
  steps: [
    { kind: "think", label: "레이아웃 설계", detail: "가로 타임라인 · 노드 3 · 연결선" },
    { kind: "create", label: "growth.svg 생성", detail: "viewBox 0 0 480 300 · vector" },
    { kind: "edit", label: "브랜드 골드 컬러 적용", detail: "#E8B54B · 노드 글로우" },
  ],
};

/* ── 3단계 데이터(결정적) ── */
const STAGES = [
  { y: "2023", v: "1.2K", k: "씨앗", cx: 78 },
  { y: "2024", v: "18K", k: "성장", cx: 240 },
  { y: "2025", v: "240K", k: "도약", cx: 402 },
] as const;

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  /* 캔버스 등장 */
  const frameO = useTransform(reveal, [0, 0.16], [0, 1]);
  /* 연결선이 그려진다 */
  const line = useTransform(reveal, [0.18, 0.52], [0, 1]);
  /* 상승 면적(area) */
  const areaO = useTransform(reveal, [0.42, 0.66], [0, 0.85]);
  /* 캡션 푸터 */
  const footO = useTransform(reveal, [0.82, 1], [0, 1]);

  return (
    <motion.div
      style={{ opacity: frameO }}
      className="absolute inset-0 flex flex-col bg-[#0C0A11] p-3"
    >
      {/* 인포그래픽 헤더 */}
      <div className="mb-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-[3px] bg-gold [box-shadow:0_0_14px_rgba(232,181,75,0.55)]" />
          <span className="font-display text-[clamp(0.7rem,1vw,0.95rem)] font-bold text-bone/90">
            우리 성장 스토리
          </span>
        </div>
        <span className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 font-mono text-[8px] tracking-[0.18em] text-gold/85 md:text-[9px]">
          VECTOR · SVG
        </span>
      </div>

      {/* 렌더된 SVG 인포그래픽 */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-lg border border-bone/10 bg-[#08070B]">
        <svg viewBox="0 0 480 300" className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
          <defs>
            <linearGradient id="c07-line" x1="0" y1="0" x2="480" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#E8B54B" stopOpacity="0.35" />
              <stop offset="1" stopColor="#FFD37A" />
            </linearGradient>
            <linearGradient id="c07-area" x1="0" y1="40" x2="0" y2="260" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#E8B54B" stopOpacity="0.35" />
              <stop offset="1" stopColor="#E8B54B" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="c07-node" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#FFD37A" />
              <stop offset="1" stopColor="#E8B54B" />
            </radialGradient>
            <filter id="c07-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* 배경 장식: 베이스라인 + 도트 그리드 */}
          <g opacity="0.22">
            {[60, 130, 200].map((gy) => (
              <line key={gy} x1="40" y1={gy} x2="440" y2={gy} stroke="#F2EDE3" strokeOpacity="0.14" strokeWidth="1" />
            ))}
            {STAGES.map((s) => (
              <line key={s.cx} x1={s.cx} y1="48" x2={s.cx} y2="232" stroke="#F2EDE3" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="2 6" />
            ))}
          </g>

          {/* 상승 면적 */}
          <motion.path
            style={{ opacity: areaO }}
            d="M78 200 L240 132 L402 64 L402 232 L78 232 Z"
            fill="url(#c07-area)"
          />

          {/* 연결선 — 그려진다 */}
          <motion.path
            style={{ pathLength: line }}
            d="M78 200 L240 132 L402 64"
            fill="none"
            stroke="url(#c07-line)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 노드 3개 + 수치/라벨 */}
          {STAGES.map((s, i) => (
            <Node key={s.y} reveal={reveal} index={i} stage={s} />
          ))}
        </svg>
      </div>

      {/* 푸터 */}
      <motion.div
        style={{ opacity: footO }}
        className="mt-2 flex items-center justify-between px-1 font-mono text-[8px] tracking-[0.12em] text-bone/45 md:text-[9px]"
      >
        <span>growth.svg · 24 KB</span>
        <span className="text-gold/80">무한 확대 · 색·문구 즉시 수정</span>
      </motion.div>
    </motion.div>
  );
}

/* ── 노드 보조 컴포넌트(hook 안전) ── */
function Node({
  reveal,
  index,
  stage,
}: {
  reveal: MotionValue<number>;
  index: number;
  stage: { y: string; v: string; k: string; cx: number };
}) {
  /* 노드는 연결선이 지난 뒤 순차 점등 */
  const a = 0.34 + index * 0.16;
  const pop = useTransform(reveal, [a, a + 0.14], [0, 1]);
  const cy = index === 0 ? 200 : index === 1 ? 132 : 64;
  return (
    <g>
      <motion.circle style={{ scale: pop, opacity: pop }} cx={stage.cx} cy={cy} r="9" fill="url(#c07-node)" filter="url(#c07-glow)" />
      <motion.circle style={{ scale: pop }} cx={stage.cx} cy={cy} r="3.5" fill="#08070B" />
      {/* 수치 */}
      <motion.text
        style={{ opacity: pop }}
        x={stage.cx}
        y={cy - 18}
        textAnchor="middle"
        className="font-mono"
        fontSize="20"
        fontWeight="800"
        fill="#FFD37A"
      >
        {stage.v}
      </motion.text>
      {/* 라벨 + 연도 */}
      <motion.text style={{ opacity: pop }} x={stage.cx} y="262" textAnchor="middle" fontSize="13" fontWeight="700" fill="#F2EDE3">
        {stage.k}
      </motion.text>
      <motion.text style={{ opacity: pop }} x={stage.cx} y="280" textAnchor="middle" className="font-mono" fontSize="11" fill="#8B8494">
        {stage.y}
      </motion.text>
    </g>
  );
}

export default function C07SVGInfographic() {
  return (
    <CaseScene
      scene="c07"
      act="CASE · 눈에 보이게"
      cluster="B · 눈에 보이게"
      num={7}
      title="SVG 인포그래픽 제작"
      oldTool="일러스트레이터 · 캔바 Pro 구독"
      lead="발표용 인포그래픽. 벡터라 무한 확대, 색·문구 바로 수정."
      script={SCRIPT}
      Result={Result}
      resultTab="growth.svg"
    />
  );
}
