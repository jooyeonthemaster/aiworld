"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * I03 — 네안데르 (회사 + 성과)  [견본 / REFERENCE]
 * 16:9 풀스크린 2단 레이아웃 + Pin 스크롤 연동 모션.
 * 좌: 킥커·정의문·선언 / 우: 매출 차트(곡선 pathLength·막대 scaleY·카운터가 스크롤에 직결).
 */

type Step = { year: string; label: string; h: number; gold: boolean };
const STEPS: Step[] = [
  { year: "2023", label: "법인 설립", h: 0.22, gold: false },
  { year: "2025", label: "매출", h: 0.62, gold: false },
  { year: "2026", label: "기대", h: 1.0, gold: true },
];

/* SVG 좌표계 — 막대 중심을 통과하는 성장 곡선 */
const VB = { w: 820, h: 440 };
const PAD = { l: 90, r: 90, b: 90, t: 60 };
const PLOT_W = VB.w - PAD.l - PAD.r;
const PLOT_H = VB.h - PAD.t - PAD.b;
const colX = (i: number) => PAD.l + (PLOT_W / (STEPS.length - 1)) * i;
const valY = (h: number) => PAD.t + PLOT_H * (1 - h);
const CURVE_D = `M ${colX(0)} ${valY(STEPS[0].h)} C ${colX(0) + 100} ${valY(
  STEPS[0].h,
)}, ${colX(1) - 100} ${valY(STEPS[1].h)}, ${colX(1)} ${valY(STEPS[1].h)} S ${
  colX(2) - 100
} ${valY(STEPS[2].h)}, ${colX(2)} ${valY(STEPS[2].h)}`;

export default function I03Neander() {
  return (
    <section
      data-scene="i03"
      data-act="OPENING — 김주연"
      className="relative bg-ink text-bone"
    >
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* 배경 — 스크롤에 미세 반응 */
  const glowO = useTransform(p, [0, 0.5, 1], [0.22, 0.42, 0.52]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  /* 좌측 카피 */
  const headO = useTransform(p, [0.02, 0.14], [0, 1]);
  const headY = useTransform(p, [0.02, 0.18], [44, 0]);
  const declO = useTransform(p, [0.72, 0.84], [0, 1]);
  const declY = useTransform(p, [0.72, 0.86], [28, 0]);
  const footO = useTransform(p, [0.88, 0.96], [0, 1]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ── 배경 레이어 ── */}
      <motion.div
        aria-hidden
        style={{ opacity: glowO }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(48% 56% at 74% 56%, rgba(232,181,75,0.13), transparent 72%)",
          }}
        />
        <div
          className="animate-pulse-soft absolute right-[14%] top-[42%] h-[42vh] w-[42vh] -translate-y-1/2 rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(255,211,122,0.10), transparent 70%)" }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: gridShift }}
        className="pointer-events-none absolute inset-[-10%] opacity-[0.05]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,237,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,227,0.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(75% 75% at 50% 50%, black, transparent 100%)",
          }}
        />
      </motion.div>
      {/* ×2 워터마크 */}
      <div
        aria-hidden
        className="text-stroke-gold pointer-events-none absolute -left-[2vw] top-[6vh] rotate-[-7deg] select-none font-mono text-[clamp(8rem,22vw,20rem)] font-bold leading-none opacity-[0.045]"
      >
        ×2
      </div>

      {/* ── 콘텐츠: 2단 (content-center 로 단일 row 수직 중앙 정렬) ── */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 content-center items-center gap-[clamp(2rem,5vw,5.5rem)] px-[clamp(2.5rem,6vw,8rem)] lg:grid-cols-[0.95fr_1.05fr]">
        {/* 좌측 — 카피 */}
        <div className="flex flex-col justify-center">
          <motion.div style={{ opacity: headO, y: headY }}>
            <Kicker>COMPANY — 네안데르 (NEANDER)</Kicker>
            <h2 className="mt-12 font-display font-bold leading-[1.24] text-bone text-[clamp(2.2rem,3.6vw,4rem)]">
              <span className="block whitespace-nowrap">다양한 산업에 AI를 접목해,</span>
              <span className="block whitespace-nowrap">
                진짜 <span className="text-gold [text-shadow:0_0_38px_rgba(232,181,75,0.4)]">&apos;가치&apos;</span>를 만드는
              </span>
              <span className="block whitespace-nowrap">— AX 전문 회사.</span>
            </h2>
          </motion.div>

          <motion.p
            style={{ opacity: declO, y: declY }}
            className="mt-[clamp(3.5rem,8vh,6rem)] font-display font-bold leading-[1.4] text-bone/90 text-[clamp(1.4rem,2vw,2.2rem)]"
          >
            직원 수로 키운 회사가 아니다.
            <br />
            <span className="text-gold">— AI로 키운 회사다.</span>
          </motion.p>

          <motion.p
            style={{ opacity: footO }}
            className="mt-[clamp(2.5rem,6vh,4.5rem)] font-mono text-[11px] uppercase tracking-[0.3em] text-bone/45 md:text-[12px]"
          >
            {"// NEANDER — AX STUDIO · EST. 2023 · ₩5억 → ₩10억"}
          </motion.p>
        </div>

        {/* 우측 — 매출 차트 */}
        <div className="flex h-full items-center justify-center">
          <RevenueChart p={p} />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── 매출 차트 (스크롤 연동) ───────────────────────── */
function RevenueChart({ p }: { p: MotionValue<number> }) {
  const curveLen = useTransform(p, [0.16, 0.52], [0, 1]);
  const fillO = useTransform(p, [0.4, 0.62], [0, 1]);

  return (
    <div className="relative w-full max-w-[880px]">
      {/* 곡선 오버레이 */}
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="i03c" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(242,237,227,0.3)" />
            <stop offset="58%" stopColor="rgba(232,181,75,0.7)" />
            <stop offset="100%" stopColor="#FFD37A" />
          </linearGradient>
          <linearGradient id="i03f" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(232,181,75,0.16)" />
            <stop offset="100%" stopColor="rgba(232,181,75,0)" />
          </linearGradient>
        </defs>
        <line
          x1={PAD.l - 26}
          y1={valY(0)}
          x2={VB.w - PAD.r + 26}
          y2={valY(0)}
          stroke="rgba(242,237,227,0.14)"
          strokeWidth={1}
        />
        <motion.path
          d={`${CURVE_D} L ${colX(2)} ${valY(0)} L ${colX(0)} ${valY(0)} Z`}
          fill="url(#i03f)"
          style={{ opacity: fillO }}
        />
        <motion.path
          d={CURVE_D}
          fill="none"
          stroke="url(#i03c)"
          strokeWidth={3.5}
          strokeLinecap="round"
          style={{ pathLength: curveLen, filter: "drop-shadow(0 0 12px rgba(232,181,75,0.45))" }}
        />
        {STEPS.map((s, i) => (
          <Node key={s.year} p={p} i={i} s={s} />
        ))}
      </svg>

      {/* 막대 + 라벨 */}
      <div
        className="relative grid items-end"
        style={{
          gridTemplateColumns: `repeat(${STEPS.length}, 1fr)`,
          height: "min(70vh, 620px)",
          paddingTop: "7%",
          paddingBottom: `${(PAD.b / VB.h) * 100}%`,
        }}
      >
        {STEPS.map((s, i) => (
          <BarColumn key={s.year} step={s} index={i} p={p} />
        ))}
      </div>
    </div>
  );
}

function Node({ p, i, s }: { p: MotionValue<number>; i: number; s: Step }) {
  const a = 0.2 + i * 0.16;
  const o = useTransform(p, [a, a + 0.06], [0, 1]);
  const sc = useTransform(p, [a, a + 0.1], [0, 1]);
  return (
    <motion.circle
      cx={colX(i)}
      cy={valY(s.h)}
      r={s.gold ? 8 : 5}
      fill={s.gold ? "#FFD37A" : "rgba(242,237,227,0.7)"}
      style={{ opacity: o, scale: sc, transformOrigin: `${colX(i)}px ${valY(s.h)}px` }}
    />
  );
}

function BarColumn({ step, index, p }: { step: Step; index: number; p: MotionValue<number> }) {
  const barStart = 0.2 + index * 0.16;
  const barH = useTransform(p, [barStart, barStart + 0.16], [0, 1]);
  const labelO = useTransform(p, [barStart + 0.04, barStart + 0.16], [0, 1]);
  const valueO = useTransform(p, [barStart + 0.1, barStart + 0.22], [0, 1]);

  return (
    <div className="flex h-full flex-col items-center justify-end">
      {/* 값 */}
      <motion.div style={{ opacity: valueO }} className="mb-2.5 flex items-baseline justify-center whitespace-nowrap">
        {step.year === "2023" ? (
          <span className="font-display text-[clamp(1.3rem,2vw,2rem)] font-bold text-bone/70">—</span>
        ) : (
          <ValueLabel step={step} p={p} />
        )}
      </motion.div>

      {/* 막대 */}
      <motion.div
        style={{ scaleY: barH, height: `${step.h * 100}%`, transformOrigin: "bottom" }}
        className={`w-[clamp(64px,8vw,128px)] origin-bottom rounded-t-[4px] ${
          step.gold ? "bg-gradient-to-t from-gold/30 to-gold" : "bg-gradient-to-t from-bone/8 to-bone/45"
        }`}
      >
        {step.gold ? (
          <div
            aria-hidden
            className="animate-pulse-soft h-full w-full rounded-t-[4px]"
            style={{ boxShadow: "0 0 60px rgba(232,181,75,0.5)" }}
          />
        ) : null}
      </motion.div>

      {/* 연도 + 라벨 */}
      <motion.div style={{ opacity: labelO }} className="mt-6 flex flex-col items-center gap-1.5 text-center">
        <span
          className={`font-mono text-[clamp(1.05rem,1.6vw,1.4rem)] font-semibold tracking-[0.1em] ${
            step.gold ? "text-gold" : "text-bone/85"
          }`}
        >
          {step.year}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/40 md:text-xs">
          {step.label}
        </span>
      </motion.div>
    </div>
  );
}

/* 스크롤 연동 카운트 — 2025: ₩5억 / 2026: ₩10억(골드 + ×2) */
function ValueLabel({ step, p }: { step: Step; p: MotionValue<number> }) {
  const isGold = step.gold;
  const target = isGold ? 10 : 5;
  const start = isGold ? 0.5 : 0.34;
  const end = isGold ? 0.74 : 0.52;
  const num = useTransform(p, [start, end], [0, target]);
  const text = useTransform(num, (n: number) => Math.round(n).toString());
  const mxO = useTransform(p, [0.74, 0.82], [0, 1]);

  return (
    <span className="flex items-baseline gap-1.5">
      <span className={`font-mono text-[clamp(1.1rem,1.7vw,1.5rem)] ${isGold ? "text-gold/80" : "text-bone/55"}`}>
        ₩
      </span>
      <span
        className="relative inline-block"
        style={isGold ? { textShadow: "0 0 55px rgba(232,181,75,0.55), 0 0 20px rgba(232,181,75,0.35)" } : undefined}
      >
        {isGold ? (
          <span
            aria-hidden
            className="animate-pulse-soft absolute -inset-x-7 -inset-y-4 rounded-full"
            style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(232,181,75,0.22), transparent 70%)" }}
          />
        ) : null}
        <motion.span
          className={`relative font-display font-black leading-none tabular-nums ${
            isGold ? "text-[clamp(3rem,5.6vw,5.4rem)] text-gold" : "text-[clamp(2.2rem,4vw,3.8rem)] text-bone/90"
          }`}
        >
          {text}
        </motion.span>
      </span>
      <span
        className={`font-display font-bold ${
          isGold ? "text-[clamp(1.4rem,2.4vw,2.2rem)] text-gold" : "text-[clamp(1.2rem,1.9vw,1.7rem)] text-bone/80"
        }`}
      >
        억
      </span>
      {isGold ? (
        <motion.span
          style={{ opacity: mxO }}
          className="ml-2 self-center rounded-full border border-gold/50 bg-gold/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold tracking-[0.1em] text-gold md:text-xs"
        >
          × 2
        </motion.span>
      ) : null}
    </span>
  );
}
