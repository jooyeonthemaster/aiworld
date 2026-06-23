"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C05 — 지저분한 엑셀 정리 + 자동 차트 [CASE]
 * Result: 상단 KPI 카드 2개(총매출/성장률, 골드 숫자) + 월별 매출 막대그래프 12개(SVG).
 * reveal 로 KPI → 막대 차오름(scaleY, 마지막 막대 골드 강조).
 */

const SCRIPT: ClineScript = {
  project: "sales-data",
  userPrompt: "이 판매 엑셀 중복 제거하고 월별로 정리해서 매출 차트 만들어줘.",
  steps: [
    { kind: "read", label: "sales.xlsx", detail: "3,200 rows" },
    { kind: "edit", label: "중복·빈칸 정리", detail: "−420 dup" },
    { kind: "create", label: "clean.xlsx + chart.png" },
  ],
};

/* 월별 매출(결정적 — 우상향 곡선). 마지막 막대가 최고치 = 골드 강조. */
const MONTHS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const BARS: number[] = MONTHS.map((_, i) => {
  // 우상향 베이스 + 결정적 흔들림(0.42 ~ 1.0)
  const base = 0.42 + (i / 11) * 0.5;
  const jitter = (((i * 37) % 13) / 13) * 0.12 - 0.05;
  return Math.min(1, Math.max(0.34, base + jitter));
});

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.18], [0, 1]);
  const kpiO = useTransform(reveal, [0.1, 0.34], [0, 1]);
  const kpiY = useTransform(reveal, [0.1, 0.34], [16, 0]);
  const axisO = useTransform(reveal, [0.3, 0.5], [0, 1]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col gap-3 p-3.5">
      {/* 상단 KPI 카드 2개 */}
      <motion.div style={{ opacity: kpiO, y: kpiY }} className="grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-gold/25 bg-gold/[0.06] px-3.5 py-3">
          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-bone/65 md:text-[9px]">총매출</p>
          <p className="mt-1 font-display font-black leading-none text-gold text-[clamp(1.3rem,2vw,2rem)] tabular-nums [text-shadow:0_0_26px_rgba(232,181,75,0.4)]">
            ₩4.82<span className="text-[0.6em] font-bold">억</span>
          </p>
        </div>
        <div className="rounded-xl border border-bone/12 bg-bone/[0.03] px-3.5 py-3">
          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-bone/65 md:text-[9px]">전년比 성장률</p>
          <p className="mt-1 font-display font-black leading-none text-gold text-[clamp(1.3rem,2vw,2rem)] tabular-nums">
            +37<span className="text-[0.6em] font-bold">%</span>
          </p>
        </div>
      </motion.div>

      {/* 차트 카드 */}
      <div className="relative flex min-h-0 flex-1 flex-col rounded-xl border border-bone/12 bg-[#0E0C12] px-3.5 pb-2 pt-2.5">
        <div className="mb-1.5 flex items-baseline justify-between">
          <p className="font-body text-[10px] font-semibold text-bone/75 md:text-[11px]">월별 매출 추이</p>
          <span className="font-mono text-[9px] tracking-[0.1em] text-bone/35 md:text-[10px]">단위 · 백만원</span>
        </div>

        {/* 막대 그래프 (flex 기반, scaleY 차오름) */}
        <div className="relative flex min-h-0 flex-1 items-end gap-[clamp(3px,0.7vw,8px)]">
          {/* 점선 기준선 */}
          <motion.div aria-hidden style={{ opacity: axisO }} className="pointer-events-none absolute inset-x-0 bottom-0 top-1">
            {[0.25, 0.5, 0.75].map((g) => (
              <span
                key={g}
                className="absolute left-0 right-0 border-t border-dashed border-bone/10"
                style={{ bottom: `${g * 100}%` }}
              />
            ))}
          </motion.div>

          {BARS.map((h, i) => (
            <Bar key={i} h={h} i={i} last={i === BARS.length - 1} reveal={reveal} label={MONTHS[i]} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Bar({
  h,
  i,
  last,
  reveal,
  label,
}: {
  h: number;
  i: number;
  last: boolean;
  reveal: MotionValue<number>;
  label: string;
}) {
  // 막대마다 stagger: 0.34~0.92 구간에서 순차 차오름
  const t0 = 0.34 + (i / 12) * 0.52;
  const grow = useTransform(reveal, [t0, t0 + 0.12], [0, 1]);
  const o = useTransform(reveal, [t0, t0 + 0.1], [0, 1]);

  return (
    <div className="relative flex min-w-0 flex-1 flex-col items-center justify-end self-stretch">
      <motion.div
        style={{ scaleY: grow, opacity: o, height: `${h * 100}%` }}
        className={`w-full origin-bottom rounded-t-[3px] ${
          last
            ? "bg-gradient-to-t from-gold/70 to-gold [box-shadow:0_0_20px_rgba(232,181,75,0.5)]"
            : "bg-gradient-to-t from-[#82AAFF]/20 to-[#82AAFF]/55"
        }`}
      />
      <span
        className={`mt-1 font-mono text-[7px] leading-none md:text-[8px] ${
          last ? "text-gold" : "text-bone/40"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default function C05ExcelClean() {
  return (
    <CaseScene
      scene="c05"
      act="CASE · 문서를 다루다"
      cluster="A · 문서를 다루다"
      num={5}
      title="지저분한 엑셀 정리+자동 차트"
      oldTool="엑셀 수작업 · 유료 BI 툴"
      lead="셀 병합·빈칸·중복 범벅 데이터. 정리하고 차트까지 자동."
      script={SCRIPT}
      Result={Result}
      resultTab="chart.png"
    />
  );
}
