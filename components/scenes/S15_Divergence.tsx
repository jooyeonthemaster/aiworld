"use client";

import { ReactNode } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";

/* ------------------------------------------------------------------ */
/* 차트 지오메트리 — 모듈 스코프에서 결정적으로 계산 (hydration 안전)     */
/* ------------------------------------------------------------------ */

const VB_W = 1200;
const VB_H = 640;
const X0 = 80;
const X1 = 1130;
const BASE_Y = 520;
const TOP_RISE = 432;
const SEG = 72;
const K_EXP = 3.2;

type Pt = { x: number; y: number };

const goldPts: Pt[] = [];
const hazePts: Pt[] = [];
for (let i = 0; i <= SEG; i++) {
  const t = i / SEG;
  const k = (Math.exp(t * K_EXP) - 1) / (Math.exp(K_EXP) - 1);
  goldPts.push({ x: X0 + (X1 - X0) * t, y: BASE_Y - 6 - k * TOP_RISE });
  hazePts.push({
    x: X0 + (X1 - X0) * t,
    y: BASE_Y - 2 - t * 16 + Math.sin(t * 7.3) * 3,
  });
}

const toLine = (pts: Pt[]) =>
  pts.map((pt, i) => `${i === 0 ? "M" : "L"}${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`).join(" ");

const GOLD_D = toLine(goldPts);
const HAZE_D = toLine(hazePts);
const AREA_D = `${toLine(goldPts)} ${[...hazePts]
  .reverse()
  .map((pt) => `L${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`)
  .join(" ")} Z`;

function sampleAt(pts: Pt[], t: number): Pt {
  const clamped = Math.min(Math.max(t, 0), 1);
  const f = clamped * (pts.length - 1);
  const i = Math.min(Math.floor(f), pts.length - 2);
  const a = pts[i];
  const b = pts[i + 1];
  if (!a || !b) return { x: X0, y: BASE_Y };
  const u = f - i;
  return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u };
}

const ERAS: { at: number; text: string; accent: boolean }[] = [
  { at: 0.24, text: `1년 차 — "별 차이 없는데?"`, accent: false },
  { at: 0.45, text: `2년 차 — "어, 뭔가 다른데."`, accent: false },
  { at: 0.64, text: `3년 차 — "이제, 따라잡을 수 없다."`, accent: true },
];

const AXIS_LABELS = ["M0", "+12M", "+24M", "+36M"];

/* ------------------------------------------------------------------ */

export default function Scene15() {
  return (
    <section
      data-scene="s15"
      data-act="ACT 3 — 보이지 않는 격차"
      className="relative bg-ink text-bone"
    >
      <Pin heights={5}>{(p) => <DivergenceStage p={p} />}</Pin>
    </section>
  );
}

/* Pin render-prop 안에서 hook 금지 → 내부 컴포넌트로 분리 */
function DivergenceStage({ p }: { p: MotionValue<number> }) {
  // 선 그리기 — 스크롤에 직결
  const draw = useTransform(p, [0.06, 0.7], [0, 1]);
  const axis = useTransform(p, [0.02, 0.1], [0, 1]);
  const areaClip = useTransform(
    draw,
    (v: number) => `inset(0% ${(100 - v * 100).toFixed(2)}% 0% 0%)`
  );

  // 골드 곡선의 선두를 따라가는 트래커 닷
  const dotX = useTransform(draw, (v: number) => sampleAt(goldPts, v).x);
  const dotY = useTransform(draw, (v: number) => sampleAt(goldPts, v).y);
  const dotOpacity = useTransform(p, [0.07, 0.11, 0.76, 0.84], [0, 1, 1, 0]);

  // 격차 배수 라이브 리드아웃 (장식, 모노)
  const gapText = useTransform(
    draw,
    (v: number) => `CAPABILITY GAP — ×${(1 + 36.8 * Math.pow(Math.max(v, 0), 3)).toFixed(1)}`
  );
  const footerOpacity = useTransform(p, [0.08, 0.14, 0.76, 0.84], [0, 1, 1, 0.1]);

  // 마무리 비트 — 차트가 어두워지고 문장이 떠오름
  const chartOpacity = useTransform(p, [0.76, 0.9], [1, 0.13]);
  const chartBlur = useTransform(p, [0.76, 0.9], ["blur(0px)", "blur(7px)"]);
  const chartScale = useTransform(p, [0.76, 0.95], [1, 0.97]);
  const finaleOpacity = useTransform(p, [0.8, 0.89], [0, 1]);
  const finaleY = useTransform(p, [0.8, 0.92], [44, 0]);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-ink">
      {/* 배경 글로우 레이어 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 74% 16%, rgba(232,181,75,0.07), transparent 70%), radial-gradient(45% 38% at 16% 86%, rgba(139,132,148,0.05), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 animate-pulse-soft"
        style={{
          background:
            "radial-gradient(34% 28% at 78% 22%, rgba(232,181,75,0.05), transparent 70%)",
        }}
      />

      {/* 헤더 */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between px-[6vw] pt-10">
        <Reveal y={18}>
          <Kicker>ACT 3 — 갈라지는 두 세계</Kicker>
        </Reveal>
        <Reveal y={18} delay={0.15}>
          <div className="text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.3em] text-bone/40 md:text-xs">
            FIG. 03 — THE DIVERGENCE
            <br />
            T+36 MONTHS
          </div>
        </Reveal>
      </div>

      {/* ============ 차트 ============ */}
      <motion.div
        style={{ opacity: chartOpacity, filter: chartBlur, scale: chartScale }}
        className="relative mt-[4vh] w-[min(84vw,1280px)]"
      >
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="block h-auto w-full overflow-visible">
          <defs>
            <linearGradient id="s15-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#E8B54B" stopOpacity="0.6" />
              <stop offset="1" stopColor="#FFD37A" />
            </linearGradient>
            <linearGradient id="s15-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#E8B54B" stopOpacity="0.2" />
              <stop offset="1" stopColor="#E8B54B" stopOpacity="0.015" />
            </linearGradient>
            <filter id="s15-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>

          {/* 그리드 — 세로(연도) / 가로 */}
          {[1, 2, 3].map((k) => (
            <line
              key={`v${k}`}
              x1={X0 + ((X1 - X0) * k) / 3}
              y1={92}
              x2={X0 + ((X1 - X0) * k) / 3}
              y2={BASE_Y}
              stroke="#F2EDE3"
              strokeOpacity={0.05}
            />
          ))}
          {[130, 230, 330, 430].map((y) => (
            <line
              key={`h${y}`}
              x1={X0}
              y1={y}
              x2={X1}
              y2={y}
              stroke="#F2EDE3"
              strokeOpacity={0.035}
            />
          ))}

          {/* 베이스 축 — 진입 시 좌→우로 그어짐 */}
          <motion.line
            x1={X0}
            y1={BASE_Y + 2}
            x2={X1}
            y2={BASE_Y + 2}
            stroke="#F2EDE3"
            strokeOpacity={0.25}
            strokeWidth={1.5}
            style={{ pathLength: axis }}
          />
          {AXIS_LABELS.map((m, k) => (
            <text
              key={m}
              x={X0 + ((X1 - X0) * k) / 3}
              y={BASE_Y + 40}
              textAnchor="middle"
              className="font-mono"
              fill="#8B8494"
              fillOpacity={0.6}
              fontSize={15}
              letterSpacing={2}
            >
              {m}
            </text>
          ))}

          {/* 두 선 사이 격차 영역 — 진행에 따라 좌→우 충전 */}
          <motion.g style={{ clipPath: areaClip }}>
            <path d={AREA_D} fill="url(#s15-area)" />
          </motion.g>

          {/* haze 수평선 — 눈치채지 못한 다수 */}
          <motion.path
            d={HAZE_D}
            fill="none"
            stroke="#8B8494"
            strokeOpacity={0.75}
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{ pathLength: draw }}
          />

          {/* 골드 지수 곡선 — 글로우 언더레이 + 본선 */}
          <motion.path
            d={GOLD_D}
            fill="none"
            stroke="#E8B54B"
            strokeOpacity={0.32}
            strokeWidth={11}
            strokeLinecap="round"
            filter="url(#s15-glow)"
            style={{ pathLength: draw }}
          />
          <motion.path
            d={GOLD_D}
            fill="none"
            stroke="url(#s15-line)"
            strokeWidth={4}
            strokeLinecap="round"
            style={{ pathLength: draw }}
          />

          {/* 곡선 선두 트래커 닷 */}
          <motion.circle
            cx={0}
            cy={0}
            r={16}
            fill="#E8B54B"
            fillOpacity={0.16}
            style={{ x: dotX, y: dotY, opacity: dotOpacity }}
          />
          <motion.circle
            cx={0}
            cy={0}
            r={5.5}
            fill="#FFD37A"
            style={{ x: dotX, y: dotY, opacity: dotOpacity }}
          />
        </svg>

        {/* 시간 경과 라벨 — progress 구간별 점등 */}
        <div className="absolute left-[7%] top-[3%] flex flex-col gap-3 md:gap-4">
          {ERAS.map((e, i) => (
            <Era key={i} p={p} at={e.at} text={e.text} accent={e.accent} />
          ))}
        </div>

        {/* 곡선 끝 라벨 */}
        <CurveTag p={p} at={0.66} className="right-[1%] top-[3%] text-right">
          <div className="font-mono text-[11px] tracking-[0.08em] text-gold md:text-sm">
            AI에 올라탄 소수
          </div>
          <div className="ml-auto mt-1.5 h-px w-10 bg-gold/70" />
        </CurveTag>
        <CurveTag p={p} at={0.7} className="right-[1%] top-[80%] text-right">
          <div className="font-mono text-[11px] tracking-[0.08em] text-haze md:text-sm">
            변화를 모르는 다수
          </div>
          <div className="ml-auto mt-1.5 h-px w-10 bg-haze/50" />
        </CurveTag>

        {/* 차트 푸터 — 라이브 격차 리드아웃 */}
        <motion.div
          style={{ opacity: footerOpacity }}
          className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-haze/80 md:text-[11px]"
        >
          <span>OBSERVED 2023 — 2026</span>
          <motion.span className="tabular-nums text-gold/90">{gapText}</motion.span>
        </motion.div>
      </motion.div>

      {/* ============ 마무리 비트 ============ */}
      <motion.div
        style={{ opacity: finaleOpacity, y: finaleY }}
        className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-[6vw] text-center"
      >
        <h3 className="text-balance-k font-display text-[clamp(2rem,5vw,4.4rem)] font-bold leading-[1.2] text-bone">
          진짜 공포는 변화가 아니다.
        </h3>
        <p className="mt-7 text-balance-k font-display text-[clamp(2.1rem,5.4vw,4.8rem)] font-black leading-[1.25] text-bone">
          {`변화를 `}
          <span className="text-gold">{`'느끼지 못하는 감각'`}</span>
          {`, 그것이 공포다.`}
        </p>
      </motion.div>
    </div>
  );
}

/* 시간 경과 라벨 한 줄 */
function Era({
  p,
  at,
  text,
  accent,
}: {
  p: MotionValue<number>;
  at: number;
  text: string;
  accent: boolean;
}) {
  const opacity = useTransform(p, [at, at + 0.05, 0.78, 0.86], [0.08, 1, 1, 0.12]);
  const x = useTransform(p, [at, at + 0.06], [16, 0]);
  return (
    <motion.div style={{ opacity, x }} className="flex items-center gap-3">
      <span className={`h-px w-6 ${accent ? "bg-gold" : "bg-bone/30"}`} />
      <span
        className={`font-mono text-[11px] tracking-[0.06em] md:text-sm ${
          accent ? "text-gold" : "text-bone/70"
        }`}
      >
        {text}
      </span>
    </motion.div>
  );
}

/* 곡선 끝 라벨 래퍼 */
function CurveTag({
  p,
  at,
  className,
  children,
}: {
  p: MotionValue<number>;
  at: number;
  className: string;
  children: ReactNode;
}) {
  const opacity = useTransform(p, [at, at + 0.06, 0.78, 0.86], [0, 1, 1, 0.1]);
  const y = useTransform(p, [at, at + 0.06], [12, 0]);
  return (
    <motion.div style={{ opacity, y }} className={`absolute ${className}`}>
      {children}
    </motion.div>
  );
}
