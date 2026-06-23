"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C21 — 경쟁사 가격 모니터링 [CASE / 클러스터 E · 데이터를 캐다]
 * Result: 경쟁사 5행 가격 표 + 전일대비 변동(↓골드 인하 / ↑ember 인상) + 미니 라인 트렌드.
 * "매일 자동" 배지. reveal 하위구간으로 헤더→행 stagger→하단 알림.
 */

const SCRIPT: ClineScript = {
  project: "price-watch",
  userPrompt: "경쟁사 5곳 가격을 매일 아침 체크해서 변동 있으면 알려주는 거 만들어줘.",
  steps: [
    { kind: "web", label: "5개 사이트 체크", detail: "competitor A~E · 가격 셀렉터" },
    { kind: "create", label: "monitor.py + 스케줄", detail: "매일 09:00 · cron" },
    { kind: "run", label: "첫 실행", detail: "diff vs 어제 스냅샷" },
  ],
  terminal: [
    { p: "$", t: "python monitor.py" },
    { p: ">", t: "⚠ 가격 변동 2건 감지 — 알림 전송", gold: true },
  ],
};

/* 경쟁사 행 데이터 (결정적) */
type Row = {
  name: string;
  price: string;
  delta: number; // 전일대비 % (음수=인하, 0=동결)
  trend: number[]; // 0~1 정규화 미니 트렌드
};
const ROWS: Row[] = [
  { name: "경쟁사 A", price: "₩29,900", delta: -8.0, trend: [0.7, 0.72, 0.66, 0.62, 0.4] },
  { name: "경쟁사 B", price: "₩41,500", delta: 0, trend: [0.5, 0.5, 0.5, 0.5, 0.5] },
  { name: "경쟁사 C", price: "₩18,800", delta: 5.6, trend: [0.45, 0.48, 0.5, 0.58, 0.72] },
  { name: "경쟁사 D", price: "₩34,000", delta: 0, trend: [0.6, 0.6, 0.6, 0.6, 0.6] },
  { name: "경쟁사 E", price: "₩52,000", delta: 0, trend: [0.55, 0.56, 0.55, 0.56, 0.55] },
];

function MiniTrend({ pts, color }: { pts: number[]; color: string }) {
  const w = 48;
  const h = 18;
  const d = pts
    .map((v, i) => {
      const x = (i / (pts.length - 1)) * w;
      const y = h - v * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-[18px] w-[48px]" aria-hidden>
      <path d={d} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PriceRow({ row, i, reveal }: { row: Row; i: number; reveal: MotionValue<number> }) {
  // 행 stagger: 0.2~0.62 구간에서 순차 등장
  const t0 = 0.2 + (i / ROWS.length) * 0.42;
  const o = useTransform(reveal, [t0, t0 + 0.12], [0, 1]);
  const x = useTransform(reveal, [t0, t0 + 0.12], [-14, 0]);

  const changed = row.delta !== 0;
  const isDrop = row.delta < 0;
  const accent = isDrop ? "#E8B54B" : "#C96A4A"; // 골드 인하 / ember 인상
  const deltaText = row.delta === 0 ? "동결" : `${row.delta > 0 ? "+" : ""}${row.delta.toFixed(1)}%`;

  return (
    <motion.div
      style={{ opacity: o, x }}
      className={`grid grid-cols-[1.4fr_1fr_1.25fr] items-center gap-2 rounded-lg border px-3 py-2.5 ${
        changed ? "border-gold/30 bg-gold/[0.05]" : "border-bone/10 bg-bone/[0.02]"
      }`}
    >
      {/* 경쟁사 */}
      <div className="flex min-w-0 items-center gap-2">
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: changed ? accent : "rgba(232,230,224,0.25)" }}
        />
        <span className="truncate font-body text-[clamp(0.78rem,0.95vw,1rem)] font-semibold text-bone/85">
          {row.name}
        </span>
      </div>

      {/* 현재가 */}
      <span className="text-right font-mono text-[clamp(0.78rem,0.95vw,1rem)] tabular-nums text-bone/80">
        {row.price}
      </span>

      {/* 전일대비 + 트렌드 */}
      <div className="flex items-center justify-end gap-2.5">
        <MiniTrend pts={row.trend} color={changed ? accent : "rgba(232,230,224,0.3)"} />
        {changed ? (
          <span
            className="inline-flex items-center gap-1 whitespace-nowrap font-mono text-[clamp(0.72rem,0.9vw,0.95rem)] font-bold tabular-nums"
            style={{ color: accent }}
          >
            {isDrop ? "↓" : "↑"} {deltaText}
          </span>
        ) : (
          <span className="whitespace-nowrap font-mono text-[clamp(0.7rem,0.85vw,0.9rem)] text-bone/35">
            — {deltaText}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.16], [0, 1]);
  const headO = useTransform(reveal, [0.06, 0.24], [0, 1]);
  const headY = useTransform(reveal, [0.06, 0.24], [12, 0]);
  const alertO = useTransform(reveal, [0.66, 0.92], [0, 1]);
  const alertY = useTransform(reveal, [0.66, 0.92], [14, 0]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col gap-2.5 p-3.5">
      {/* 헤더: 제목 + "매일 자동" 배지 */}
      <motion.div style={{ opacity: headO, y: headY }} className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-body text-[clamp(0.85rem,1.05vw,1.15rem)] font-bold text-bone/90">경쟁사 가격 보드</span>
          <span className="font-mono text-[9px] tracking-[0.12em] text-bone/35 md:text-[10px]">5 SITES</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/35 bg-gold/[0.08] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-gold md:text-[10px]">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-gold" />
          매일 자동 · 09:00
        </span>
      </motion.div>

      {/* 표 헤더 행 */}
      <motion.div
        style={{ opacity: headO }}
        className="grid grid-cols-[1.4fr_1fr_1.25fr] gap-2 border-b border-bone/10 px-3 pb-1.5"
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone/40 md:text-[9px]">경쟁사</span>
        <span className="text-right font-mono text-[8px] uppercase tracking-[0.2em] text-bone/40 md:text-[9px]">현재가</span>
        <span className="text-right font-mono text-[8px] uppercase tracking-[0.2em] text-bone/40 md:text-[9px]">전일대비</span>
      </motion.div>

      {/* 5행 표 */}
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-1.5">
        {ROWS.map((r, i) => (
          <PriceRow key={r.name} row={r} i={i} reveal={reveal} />
        ))}
      </div>

      {/* 하단 변동 알림 */}
      <motion.div
        style={{ opacity: alertO, y: alertY }}
        className="flex items-center gap-2.5 rounded-lg border border-gold/30 bg-gold/[0.07] px-3 py-2.5"
      >
        <span className="text-[clamp(0.9rem,1.1vw,1.2rem)] text-gold [text-shadow:0_0_18px_rgba(232,181,75,0.45)]">⚠</span>
        <p className="min-w-0 flex-1 font-body text-[clamp(0.72rem,0.9vw,0.95rem)] leading-snug text-bone/80">
          <span className="font-semibold text-gold">변동 2건</span> 감지 — A 8% 인하, C 5.6% 인상.{" "}
          <span className="whitespace-nowrap text-bone/55">알림 전송 완료</span>
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function C21PriceMonitor() {
  return (
    <CaseScene
      scene="c21"
      act="CASE · 데이터를 캐다"
      cluster="E · 데이터를 캐다"
      num={21}
      title="경쟁사 가격 모니터링"
      oldTool="가격추적 SaaS 월구독"
      lead="경쟁사 가격을 매일 자동 체크. 변동되면 알림."
      script={SCRIPT}
      Result={Result}
      resultTab="모니터"
    />
  );
}
