"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C01 — 30p+ 보고서 통째 분석→요약 [CASE / A · 문서를 다루다]
 * Result: 마크다운 요약 카드(.md). 제목 + 골드 불릿 5개(시장규모/성장률/경쟁구도/기회/리스크)
 * 가 reveal 로 stagger 점등 → 하단 골드 인용박스. doc 프리뷰(다른 사례와 확연히 구별).
 */

const SCRIPT: ClineScript = {
  project: "market-research",
  userPrompt:
    "이 시장조사 보고서(48p) 읽고 핵심 5가지랑 우리한테 필요한 데이터만 요약본으로 만들어줘.",
  steps: [
    { kind: "read", label: "보고서 48p 분할 읽기", detail: "8 chunks · 48 pages" },
    { kind: "think", label: "핵심 주장 추출" },
    { kind: "create", label: "summary.md 생성" },
    { kind: "create", label: "data_needed.md", detail: "필요 데이터만 추출" },
  ],
};

/* ── 요약 불릿 (시장규모/성장률/경쟁구도/기회/리스크) ── */
const BULLETS: { k: string; v: string }[] = [
  { k: "시장규모", v: "국내 4.2조 원 — 전년比 +18%, 글로벌 동조화" },
  { k: "성장률", v: "연평균 21% (CAGR), 2027년 7.1조 전망" },
  { k: "경쟁구도", v: "상위 3사 점유 54%, 중위권 진입 가속" },
  { k: "기회", v: "20·30대 미충족 수요 + B2B 번들 공백" },
  { k: "리스크", v: "원가 변동성 · 규제 강화 · 대체재 등장" },
];

/* ── 불릿 한 행 (reveal 하위구간 stagger — hook 안전을 위해 컴포넌트로 분리) ── */
function BulletRow({ reveal, b, i }: { reveal: MotionValue<number>; b: { k: string; v: string }; i: number }) {
  const start = 0.3 + i * 0.085;
  const o = useTransform(reveal, [start, start + 0.13], [0, 1]);
  const x = useTransform(reveal, [start, start + 0.13], [-14, 0]);
  return (
    <motion.div
      style={{ opacity: o, x }}
      className="flex items-start gap-2.5 rounded-lg border border-bone/10 bg-bone/[0.03] px-3 py-2"
    >
      <span className="mt-[3px] h-2 w-2 shrink-0 rounded-[3px] bg-gold shadow-[0_0_12px_rgba(232,181,75,0.5)]" />
      <div className="min-w-0 flex-1">
        <span className="font-body text-[clamp(0.72rem,0.95vw,0.95rem)] font-bold text-gold">{b.k}</span>
        <span className="font-body text-[clamp(0.7rem,0.92vw,0.92rem)] leading-snug text-bone/75">
          {" — "}
          {b.v}
        </span>
      </div>
    </motion.div>
  );
}

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.18], [0, 1]);
  const headO = useTransform(reveal, [0.1, 0.32], [0, 1]);
  const headY = useTransform(reveal, [0.1, 0.32], [12, 0]);
  const quoteO = useTransform(reveal, [0.78, 1], [0, 1]);
  const quoteY = useTransform(reveal, [0.78, 1], [14, 0]);

  return (
    <motion.div
      style={{ opacity: frameO }}
      className="absolute inset-0 flex flex-col gap-2.5 overflow-hidden p-3.5"
    >
      {/* 문서 헤더 — .md 파일 메타 */}
      <motion.div style={{ opacity: headO, y: headY }} className="shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-[#82AAFF] md:text-[10px]">summary.md</span>
          <span className="h-1 w-1 rounded-full bg-bone/20" />
          <span className="font-mono text-[9px] text-bone/35 md:text-[10px]">48p → 1p · 분할 읽기</span>
        </div>
        <h3 className="mt-2 flex items-baseline gap-2 font-display font-black leading-tight text-bone text-[clamp(0.95rem,1.5vw,1.55rem)]">
          <span className="font-mono text-gold/70">#</span>
          Q3 시장조사 — 핵심 요약
        </h3>
        <div className="mt-2 h-px w-full bg-bone/10" />
      </motion.div>

      {/* 골드 불릿 5개 — reveal 하위구간 stagger */}
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-2">
        {BULLETS.map((b, i) => (
          <BulletRow key={b.k} reveal={reveal} b={b} i={i} />
        ))}
      </div>

      {/* 하단 골드 인용박스 한 줄 */}
      <motion.blockquote
        style={{ opacity: quoteO, y: quoteY }}
        className="shrink-0 rounded-lg border-l-[3px] border-gold bg-gold/[0.07] px-3.5 py-2.5"
      >
        <p className="font-body text-[clamp(0.72rem,0.95vw,0.95rem)] italic leading-snug text-bone/85">
          <span className="mr-1.5 font-display text-gold">&gt;</span>
          결론 — 지금이 진입 적기. 20·30대 타깃 + B2B 번들로 공백 선점.
        </p>
      </motion.blockquote>
    </motion.div>
  );
}

export default function C01ReportSummary() {
  return (
    <CaseScene
      scene="c01"
      act="CASE · 문서를 다루다"
      cluster="A · 문서를 다루다"
      num={1}
      title="30p+ 보고서 통째 분석→요약"
      oldTool="유료 PDF 요약 SaaS · 챗 업로드 30p 제한"
      lead="30페이지 넘으면 잘리던 보고서. 폴더에 넣으면 나눠 읽고, 핵심만 파일로 정리한다."
      script={SCRIPT}
      Result={Result}
      resultTab="summary.md"
    />
  );
}
