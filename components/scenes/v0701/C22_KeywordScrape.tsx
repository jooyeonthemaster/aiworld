"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C22 — 검색결과·키워드 수집 [CASE / 클러스터 E · 데이터를 캐다]
 * Result: 태그 클라우드(크기 다른 칩) → 키워드 표(키워드/검색량추정/연관도) → "총 340개" 골드.
 */

const SCRIPT: ClineScript = {
  project: "keywords",
  userPrompt:
    "'AI 향수' 관련 네이버·구글 연관검색어랑 자동완성 다 모아서 키워드 리스트 만들어줘.",
  steps: [
    { kind: "web", label: "검색 수집 — 연관검색어·자동완성", detail: "naver · google · 자동완성 API" },
    { kind: "think", label: "중복 정리 — 표기·동의어 병합", detail: "유사어 클러스터링" },
    { kind: "create", label: "keywords.csv", detail: "340 keywords" },
  ],
};

/* 칩(태그 클라우드): 텍스트 + 상대 크기(weight) + 등장 순서(o) */
const CHIPS: { t: string; w: number; o: number }[] = [
  { t: "AI 향수", w: 3, o: 0 },
  { t: "맞춤 향수", w: 2, o: 1 },
  { t: "향수 추천", w: 1, o: 2 },
  { t: "퍼스널 향", w: 2, o: 3 },
  { t: "니치 향수", w: 1, o: 0 },
  { t: "향수 시향", w: 1, o: 1 },
  { t: "AI 조향", w: 3, o: 2 },
  { t: "선물 향수", w: 1, o: 3 },
  { t: "겨울 향수", w: 2, o: 4 },
];

/* 표 행: 키워드 / 검색량추정 / 연관도(%) — 전부 결정적 상수 */
const ROWS: { k: string; vol: string; rel: number }[] = [
  { k: "AI 향수", vol: "12,400", rel: 98 },
  { k: "AI 조향", vol: "8,900", rel: 94 },
  { k: "맞춤 향수 추천", vol: "6,700", rel: 88 },
  { k: "퍼스널 향수 제작", vol: "4,300", rel: 81 },
  { k: "니치 향수 브랜드", vol: "3,100", rel: 73 },
  { k: "AI 향수 선물세트", vol: "1,950", rel: 67 },
];

const CHIP_SIZE: Record<number, string> = {
  1: "text-[10px] md:text-[12px] text-bone/70",
  2: "text-[12px] md:text-[15px] text-bone/85",
  3: "text-[14px] md:text-[18px] text-gold",
};

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.18], [0, 1]);
  /* 태그 클라우드 구간 */
  const cloudO = useTransform(reveal, [0.12, 0.4], [0, 1]);
  /* 표 구간 */
  const tableO = useTransform(reveal, [0.34, 0.6], [0, 1]);
  const tableY = useTransform(reveal, [0.34, 0.6], [16, 0]);
  /* 합계 구간 */
  const totalO = useTransform(reveal, [0.78, 1], [0, 1]);
  const totalS = useTransform(reveal, [0.78, 1], [0.92, 1]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col p-3">
      {/* 파일 헤더 */}
      <div className="flex items-center justify-between rounded-t-lg border border-bone/10 bg-[#15121A] px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-[2px] bg-[#C3E88D]/80" />
          <span className="font-mono text-[10px] tracking-[0.06em] text-bone/70 md:text-[11px]">keywords.csv</span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/35 md:text-[10px]">UTF-8 · CSV</span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-b-lg border border-t-0 border-bone/10 bg-[#0E0C12]">
        {/* 태그 클라우드 */}
        <motion.div style={{ opacity: cloudO }} className="border-b border-bone/10 px-3.5 py-3">
          <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.24em] text-bone/40 md:text-[10px]">키워드 풀</p>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 leading-tight">
            {CHIPS.map((c) => (
              <ChipItem key={c.t} chip={c} reveal={reveal} />
            ))}
          </div>
        </motion.div>

        {/* 키워드 표 */}
        <motion.div style={{ opacity: tableO, y: tableY }} className="flex min-h-0 flex-1 flex-col px-3.5 pt-2.5">
          <div className="grid grid-cols-[1fr_auto_72px] gap-2 border-b border-bone/10 pb-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/45 md:text-[10px]">
            <span>키워드</span>
            <span className="text-right">검색량추정</span>
            <span className="text-right">연관도</span>
          </div>
          <div className="flex min-h-0 flex-1 flex-col">
            {ROWS.map((r, i) => (
              <RowItem key={r.k} row={r} idx={i} reveal={reveal} />
            ))}
          </div>
        </motion.div>

        {/* 합계 — 골드 강조 */}
        <motion.div
          style={{ opacity: totalO, scale: totalS }}
          className="mt-auto flex items-center justify-between border-t border-gold/25 bg-gold/[0.06] px-3.5 py-2.5"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/55 md:text-[10px]">수집된 키워드</span>
          <span className="font-display text-[clamp(1.05rem,1.7vw,1.6rem)] font-black leading-none text-gold [text-shadow:0_0_24px_rgba(232,181,75,0.4)]">
            총 340개
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── 칩 한 개 (개별 stagger) ── */
function ChipItem({ chip, reveal }: { chip: { t: string; w: number; o: number }; reveal: MotionValue<number> }) {
  const at = 0.14 + chip.o * 0.04;
  const o = useTransform(reveal, [at, at + 0.12], [0, 1]);
  const y = useTransform(reveal, [at, at + 0.12], [8, 0]);
  return (
    <motion.span
      style={{ opacity: o, y }}
      className={`whitespace-nowrap font-body font-semibold ${CHIP_SIZE[chip.w]}`}
    >
      {chip.t}
    </motion.span>
  );
}

/* ── 표 행 한 개 (행별 stagger + 연관도 막대) ── */
function RowItem({ row, idx, reveal }: { row: { k: string; vol: string; rel: number }; idx: number; reveal: MotionValue<number> }) {
  const at = 0.4 + idx * 0.055;
  const o = useTransform(reveal, [at, at + 0.1], [0, 1]);
  const x = useTransform(reveal, [at, at + 0.1], [-10, 0]);
  const barW = useTransform(reveal, [at + 0.04, at + 0.18], ["0%", `${row.rel}%`]);
  return (
    <motion.div
      style={{ opacity: o, x }}
      className="grid grid-cols-[1fr_auto_72px] items-center gap-2 border-b border-bone/[0.06] py-[6px]"
    >
      <span className="truncate font-body text-[clamp(0.78rem,0.92vw,0.98rem)] text-bone/85">{row.k}</span>
      <span className="text-right font-mono text-[10px] tabular-nums text-bone/70 md:text-[11px]">{row.vol}</span>
      <div className="flex items-center justify-end gap-1.5">
        <div className="h-1.5 w-9 overflow-hidden rounded-full bg-bone/[0.08]">
          <motion.div style={{ width: barW }} className="h-full rounded-full bg-[#C3E88D]/70" />
        </div>
        <span className="w-7 text-right font-mono text-[10px] tabular-nums text-bone/70 md:text-[11px]">{row.rel}%</span>
      </div>
    </motion.div>
  );
}

export default function C22KeywordScrape() {
  return (
    <CaseScene
      scene="c22"
      act="CASE · 데이터를 캐다"
      cluster="E · 데이터를 캐다"
      num={22}
      title="검색결과·키워드 수집"
      oldTool="키워드 툴 구독(블랙키위 등)"
      lead="검색결과·연관검색어·자동완성을 수집해 키워드 풀을 만든다."
      script={SCRIPT}
      Result={Result}
      resultTab="keywords.csv"
    />
  );
}
