"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C08 — HTML 대시보드 시각화 [CASE]
 * Result: 미니 브라우저 안 인터랙티브 KPI 대시보드.
 *   상단 KPI 카드 3개(숫자) → 도넛 차트 + 라인 차트 그리드. reveal 로 stagger 등장.
 */

const SCRIPT: ClineScript = {
  project: "campaign-dash",
  userPrompt: "이 캠페인 csv로 KPI 대시보드 HTML 만들어줘. 클릭형 차트로.",
  steps: [
    { kind: "read", label: "campaign.csv", detail: "1,842 rows · 9 cols" },
    { kind: "create", label: "dashboard.html", detail: "+ Chart.js CDN · 반응형" },
    { kind: "edit", label: "차트 연결", detail: "도넛 · 라인 · 클릭 필터" },
    { kind: "run", label: "브라우저로 열기", detail: "open dashboard.html" },
  ],
};

/* ── 결정적 라인 차트 포인트(0~1 정규화) ── */
const LINE: number[] = [0.18, 0.32, 0.27, 0.46, 0.4, 0.58, 0.52, 0.71, 0.66, 0.84, 0.78, 0.94];
const W = 200;
const H = 64;
const PX = 7; // 좌우 안쪽 패딩(가장자리 클리핑 방지)
const TOP_PAD = 10; // 상단 헤드룸(최고점이 천장에 붙지 않게)
function pt(i: number): [number, number] {
  const x = PX + (i / (LINE.length - 1)) * (W - 2 * PX);
  const y = H - LINE[i] * (H - TOP_PAD - 4) - 4;
  return [x, y];
}
const LINE_PATH = LINE.map((_, i) => `${i === 0 ? "M" : "L"}${pt(i)[0].toFixed(1)} ${pt(i)[1].toFixed(1)}`).join(" ");
const AREA_PATH = `${LINE_PATH} L${W - PX} ${H} L${PX} ${H} Z`;

/* ── KPI 카드 데이터(정적·결정적) ── */
const KPIS: { label: string; value: string; delta: string; gold?: boolean }[] = [
  { label: "전환율", value: "4.82%", delta: "+1.3%p", gold: true },
  { label: "도달", value: "128K", delta: "+24%" },
  { label: "CPA", value: "₩1,940", delta: "-18%" },
];

/* ── 도넛: 결정적 세그먼트(누적 오프셋 사전계산) ── */
const R = 26;
const C = 2 * Math.PI * R;
const SEG: { len: number; offset: number; color: string }[] = (() => {
  const fracs: { frac: number; color: string }[] = [
    { frac: 0.52, color: "#E8B54B" },
    { frac: 0.3, color: "rgba(245,234,214,0.55)" },
    { frac: 0.18, color: "rgba(245,234,214,0.2)" },
  ];
  let offset = 0;
  return fracs.map((s) => {
    const len = s.frac * C;
    const row = { len, offset, color: s.color };
    offset += len;
    return row;
  });
})();

/* ── 도넛 한 조각(hook 안전: 컴포넌트 최상위에서 useTransform) ── */
function DonutSeg({ seg, draw }: { seg: { len: number; offset: number; color: string }; draw: MotionValue<number> }) {
  const dash = useTransform(draw, (d) => `${d * seg.len} ${C}`);
  return (
    <motion.circle
      cx="32"
      cy="32"
      r={R}
      fill="none"
      stroke={seg.color}
      strokeWidth={9}
      strokeLinecap="round"
      strokeDashoffset={-seg.offset}
      style={{ strokeDasharray: dash }}
    />
  );
}

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.18], [0, 1]);
  const kpiO = useTransform(reveal, [0.14, 0.42], [0, 1]);
  const kpiY = useTransform(reveal, [0.14, 0.42], [16, 0]);
  const donutO = useTransform(reveal, [0.42, 0.7], [0, 1]);
  const donutY = useTransform(reveal, [0.42, 0.7], [16, 0]);
  const donutDraw = useTransform(reveal, [0.46, 0.9], [0, 1]);
  const lineO = useTransform(reveal, [0.58, 0.86], [0, 1]);
  const lineY = useTransform(reveal, [0.58, 0.86], [16, 0]);
  const lineDraw = useTransform(reveal, [0.62, 0.98], [0, 1]);
  const areaO = useTransform(lineDraw, [0.5, 1], [0, 1]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col p-3">
      {/* 미니 브라우저 주소창 */}
      <div className="flex items-center gap-2 rounded-t-lg border border-bone/10 bg-[#15121A] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-bone/20" />
        <div className="flex flex-1 items-center gap-2 rounded-md bg-bone/[0.05] px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#27C93F]/70" />
          <span className="font-mono text-[10px] text-bone/55 md:text-[11px]">file:///campaign-dash/dashboard.html</span>
        </div>
        <span className="rounded border border-gold/30 bg-gold/10 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.1em] text-gold/85 md:text-[9px]">LIVE</span>
      </div>

      {/* 렌더된 대시보드 */}
      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden rounded-b-lg border border-t-0 border-bone/10 bg-[#0E0C12] p-3">
        {/* 대시보드 헤더 */}
        <div className="flex items-baseline justify-between">
          <p className="font-display font-black leading-tight text-bone text-[clamp(0.85rem,1.3vw,1.25rem)]">캠페인 성과 대시보드</p>
          <span className="font-mono text-[8px] uppercase tracking-[0.24em] text-gold/70 md:text-[9px]">Q3 · REAL-TIME</span>
        </div>

        {/* KPI 카드 3개 */}
        <motion.div style={{ opacity: kpiO, y: kpiY }} className="grid grid-cols-3 gap-2">
          {KPIS.map((k) => (
            <div
              key={k.label}
              className={`rounded-lg border px-2.5 py-2 ${k.gold ? "border-gold/30 bg-gold/[0.06]" : "border-bone/10 bg-bone/[0.03]"}`}
            >
              <p className="font-body text-[8px] uppercase tracking-[0.18em] text-bone/45 md:text-[9px]">{k.label}</p>
              <p className={`mt-0.5 font-display font-black tabular-nums leading-none text-[clamp(0.95rem,1.6vw,1.55rem)] ${k.gold ? "text-gold" : "text-bone/90"}`}>
                {k.value}
              </p>
              <p className={`mt-1 font-mono text-[9px] md:text-[10px] ${k.gold ? "text-gold/80" : "text-[#27C93F]/75"}`}>{k.delta}</p>
            </div>
          ))}
        </motion.div>

        {/* 차트 그리드: 도넛 + 라인 */}
        <div className="grid min-h-0 flex-1 grid-cols-[0.85fr_1.15fr] gap-2.5">
          {/* 도넛 차트 */}
          <motion.div style={{ opacity: donutO, y: donutY }} className="flex flex-col rounded-lg border border-bone/10 bg-bone/[0.025] p-2.5">
            <p className="font-body text-[8px] uppercase tracking-[0.18em] text-bone/45 md:text-[9px]">채널 비중</p>
            <div className="flex min-h-0 flex-1 items-center justify-center gap-2.5">
              <svg viewBox="0 0 64 64" className="h-[clamp(52px,7vw,84px)] w-[clamp(52px,7vw,84px)] -rotate-90" aria-hidden>
                <circle cx="32" cy="32" r={R} fill="none" stroke="rgba(245,234,214,0.08)" strokeWidth={9} />
                {SEG.map((s, i) => (
                  <DonutSeg key={i} seg={s} draw={donutDraw} />
                ))}
              </svg>
              <div className="flex flex-col gap-1">
                {[
                  { t: "검색", v: "52%", gold: true },
                  { t: "SNS", v: "30%" },
                  { t: "기타", v: "18%" },
                ].map((l) => (
                  <div key={l.t} className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-sm ${l.gold ? "bg-gold" : "bg-bone/40"}`} />
                    <span className="font-mono text-[9px] text-bone/70 md:text-[10px]">{l.t}</span>
                    <span className={`ml-auto font-mono text-[9px] tabular-nums md:text-[10px] ${l.gold ? "text-gold" : "text-bone/55"}`}>{l.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 라인 차트 */}
          <motion.div style={{ opacity: lineO, y: lineY }} className="flex flex-col rounded-lg border border-bone/10 bg-bone/[0.025] p-2.5">
            <div className="flex items-baseline justify-between">
              <p className="font-body text-[8px] uppercase tracking-[0.18em] text-bone/45 md:text-[9px]">일별 전환</p>
              <span className="font-mono text-[9px] text-gold/80 md:text-[10px]">↗ 우상향</span>
            </div>
            <div className="relative min-h-0 flex-1 pt-1.5">
              <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-full w-full" aria-hidden>
                {[0.25, 0.5, 0.75].map((g) => (
                  <line key={g} x1={PX} y1={H * g} x2={W - PX} y2={H * g} stroke="rgba(245,234,214,0.06)" strokeWidth={0.6} />
                ))}
                <motion.path d={AREA_PATH} fill="url(#dashArea)" style={{ opacity: areaO }} />
                <motion.path
                  d={LINE_PATH}
                  fill="none"
                  stroke="#E8B54B"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  style={{ pathLength: lineDraw }}
                />
                <defs>
                  <linearGradient id="dashArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E8B54B" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#E8B54B" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function C08HTMLDashboard() {
  return (
    <CaseScene
      scene="c08"
      act="CASE · 눈에 보이게"
      cluster="B · 눈에 보이게"
      num={8}
      title="HTML 대시보드 시각화"
      oldTool="유료 대시보드 SaaS(Tableau 등)"
      lead="CSV 하나로 인터랙티브 대시보드. 브라우저에서 바로 열린다."
      script={SCRIPT}
      Result={Result}
      resultTab="미리보기 — dashboard.html"
    />
  );
}
