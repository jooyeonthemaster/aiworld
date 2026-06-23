"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * T01 — THESIS · 방금 본 전부  [SaaS 죽음 종합 / 도입]
 * 16:9 풀스크린 2단 (Pin 스크롤 스테이지).
 * 좌: 카피 2비트 순차 점등 — "방금 본 그 30가지 —" → "예전엔, 전부 따로 '결제'하던 프로그램이었다."
 *     강조어 '결제' 만 골드 점등(골드 강조 1개 원칙). 하단 모노 캡션.
 * 우: 예전에 매달 돈 내던 SaaS 이름+비용 칩 14개가 progress 따라 카메라처럼 줄줄이 점등.
 *     비용은 ember 톤. 비트2에서 우상단 '매달 수십만 원' 합계가 골드로 차오르며 못박는다.
 * 정적 나열 금지 — 결정적 좌표로 스태거 점등, 합계 카운터(0→320,000) 스크롤 연동.
 */

type SaaS = { name: string; cost: string };
/* 결정적 순서 — 인덱스로 스태거. 비용은 ember. (좌표/타이밍 전부 수식으로) */
const APPS: SaaS[] = [
  { name: "윅스", cost: "₩29,000/월" },
  { name: "어도비 CC", cost: "₩24,000/월" },
  { name: "ilovepdf Pro", cost: "₩9,900/월" },
  { name: "캔바 Pro", cost: "₩14,000/월" },
  { name: "Tableau", cost: "₩99,000/월" },
  { name: "크롤링 SaaS", cost: "₩49,000/월" },
  { name: "yt 다운로드", cost: "₩7,900/월" },
  { name: "Zapier", cost: "₩29,000/월" },
  { name: "번역 서비스", cost: "₩22,000/월" },
  { name: "BI 툴", cost: "₩59,000/월" },
  { name: "SNS 분석", cost: "₩39,000/월" },
  { name: "자막 추출", cost: "₩12,000/월" },
  { name: "이미지 일괄", cost: "₩18,000/월" },
  { name: "리뷰 수집", cost: "₩34,000/월" },
];

export default function T01UsedToPay() {
  return (
    <section
      data-scene="t01"
      data-act="THESIS · SaaS를 삼키다"
      className="relative bg-ink text-bone"
    >
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 글로우 + 그리드 패럴랙스 ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.34, 0.48]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  /* ── 비트 1: "방금 본 그 30가지 —" ── */
  const b1O = useTransform(p, [0.05, 0.16], [0, 1]);
  const b1Y = useTransform(p, [0.05, 0.18], [40, 0]);

  /* ── 비트 2: "예전엔, 전부 따로 '결제'하던 프로그램이었다." ── */
  const b2O = useTransform(p, [0.56, 0.68], [0, 1]);
  const b2Y = useTransform(p, [0.56, 0.7], [40, 0]);
  const goldPayO = useTransform(p, [0.66, 0.78], [0, 1]);
  const payGlow = useTransform(p, [0.68, 0.84], [0, 0.5]);

  /* ── 하단 모노 캡션: "매달, 수십만 원이 나갔다." ── */
  const capO = useTransform(p, [0.72, 0.84], [0, 0.85]);
  const capX = useTransform(p, [0.72, 0.84], [-16, 0]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(52% 56% at 64% 46%, rgba(232,181,75,0.10), transparent 72%)" }}
        />
      </motion.div>

      {/* ── 그리드 패럴랙스 ── */}
      <motion.div aria-hidden style={{ y: gridShift }} className="pointer-events-none absolute inset-[-10%] opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,237,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,227,0.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(78% 78% at 50% 50%, black, transparent 100%)",
          }}
        />
      </motion.div>

      {/* ── 콘텐츠: 2단 (content-center 로 단일 row 수직 중앙) ── */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 content-center items-center gap-[clamp(2rem,4.5vw,5rem)] px-[clamp(2.5rem,6vw,8rem)] py-[8vh] lg:grid-cols-[0.85fr_1.15fr]">
        {/* ── 좌측: 카피 ── */}
        <div className="flex flex-col justify-center">
          {/* 비트 1 */}
          <motion.div style={{ opacity: b1O, y: b1Y }}>
            <Kicker>THESIS · 방금 본 전부</Kicker>
            <p className="mt-9 font-display font-bold leading-[1.26] text-bone/85 text-[clamp(1.9rem,4vw,4rem)]">
              <span className="block whitespace-nowrap">방금 본 그 30가지 —</span>
            </p>
          </motion.div>

          {/* 비트 2 — '결제' 골드 점등 */}
          <motion.div style={{ opacity: b2O, y: b2Y }} className="relative mt-[clamp(1.6rem,4vh,3rem)]">
            <motion.div
              aria-hidden
              style={{ opacity: payGlow }}
              className="pointer-events-none absolute -inset-x-10 -inset-y-6 rounded-3xl"
            >
              <div
                className="h-full w-full"
                style={{ background: "radial-gradient(56% 70% at 28% 50%, rgba(232,181,75,0.14), transparent 72%)" }}
              />
            </motion.div>
            <p className="relative font-display font-black leading-[1.22] text-bone text-[clamp(2rem,4.4vw,4.4rem)]">
              <span className="block whitespace-nowrap">예전엔, 전부 따로</span>
              <span className="block whitespace-nowrap">
                <motion.span
                  style={{ opacity: goldPayO }}
                  className="text-gold [text-shadow:0_0_46px_rgba(232,181,75,0.5)]"
                >
                  &apos;결제&apos;
                </motion.span>
                하던 프로그램이었다.
              </span>
            </p>
          </motion.div>

          {/* ── 하단 모노 캡션 ── */}
          <motion.p
            style={{ opacity: capO, x: capX }}
            className="mt-[clamp(1.8rem,4.5vh,3.4rem)] flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-ember/80 md:text-xs"
          >
            <span className="inline-block h-px w-9 bg-ember/55" />
            그 30가지 중 14개가 유료 구독 — 매달, 수십만 원이 나갔다.
          </motion.p>
        </div>

        {/* ── 우측: SaaS 비용 칩 그리드 + 합계 ── */}
        <div className="flex h-full flex-col justify-center gap-[clamp(1.2rem,2.6vh,2.2rem)]">
          <TotalMeter p={p} />
          <div className="grid grid-cols-2 gap-[clamp(0.6rem,0.9vw,1rem)] sm:grid-cols-3">
            {APPS.map((a, i) => (
              <CostChip key={a.name} app={a} index={i} p={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── SaaS 비용 칩 (결정적 스태거 점등) ───────────────────────── */
function CostChip({ app, index, p }: { app: SaaS; index: number; p: MotionValue<number> }) {
  /* 결정적 스태거: 0.10 ~ 0.52 구간에 14개를 고르게 펼침 */
  const at = 0.1 + index * 0.03;
  const o = useTransform(p, [at, at + 0.08], [0, 1]);
  const y = useTransform(p, [at, at + 0.1], [20, 0]);
  /* 비용은 한 박자 늦게 ember 로 또렷해짐 */
  const costO = useTransform(p, [at + 0.05, at + 0.13], [0.25, 1]);

  return (
    <motion.div
      style={{ opacity: o, y }}
      className="flex flex-col gap-1.5 rounded-xl border border-bone/12 bg-coal/65 px-[clamp(0.8rem,1.1vw,1.2rem)] py-[clamp(0.7rem,1.1vh,1.1rem)] backdrop-blur-sm"
    >
      <span className="whitespace-nowrap font-display font-bold leading-tight text-bone/85 text-[clamp(0.78rem,0.92vw,1.02rem)]">
        {app.name}
      </span>
      <motion.span
        style={{ opacity: costO }}
        className="font-mono leading-none tabular-nums tracking-[0.02em] text-ember text-[clamp(0.75rem,0.92vw,1rem)]"
      >
        {app.cost}
      </motion.span>
    </motion.div>
  );
}

/* ───────────────────────── 매달 합계 (비트2에서 골드로 못박음, 0→320,000) ───────────────────────── */
function TotalMeter({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [0.5, 0.62], [0, 1]);
  const y = useTransform(p, [0.5, 0.64], [18, 0]);
  const num = useTransform(p, [0.52, 0.72], [0, 320000]);
  const text = useTransform(num, (n: number) => "₩" + Math.round(n).toLocaleString("en-US"));
  const glow = useTransform(p, [0.62, 0.78], [0, 0.6]);

  return (
    <motion.div
      style={{ opacity: o, y }}
      className="relative flex flex-col gap-[clamp(0.6rem,1.2vh,1.1rem)] rounded-2xl border border-gold/40 bg-coal/70 px-[clamp(1.2rem,1.8vw,2rem)] py-[clamp(1rem,1.8vh,1.6rem)] backdrop-blur-sm"
    >
      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="pointer-events-none absolute -inset-2 rounded-3xl"
      >
        <div
          className="h-full w-full"
          style={{ background: "radial-gradient(60% 80% at 78% 60%, rgba(232,181,75,0.16), transparent 72%)" }}
        />
      </motion.div>

      {/* 상단 라벨 행 — 가로로 펼쳐 한글 세로쌓임 제거 */}
      <div className="relative flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/55 md:text-[12px]">
          매달 합계 · MONTHLY
        </span>
        <span className="whitespace-nowrap font-display font-bold leading-none text-bone/60 text-[clamp(0.9rem,1.1vw,1.2rem)]">
          14개 프로그램 구독
        </span>
      </div>

      {/* 거대 골드 숫자 — 단독 행에서 가로 전체 사용, '/월' 한 덩어리 */}
      <div className="relative flex items-baseline whitespace-nowrap">
        <motion.span
          className="font-display font-black leading-none tabular-nums text-gold text-[clamp(2.4rem,3.8vw,3.6rem)]"
          style={{ textShadow: "0 0 48px rgba(232,181,75,0.5), 0 0 16px rgba(232,181,75,0.32)" }}
        >
          {text}
        </motion.span>
        <span className="ml-1 font-display font-bold leading-none text-gold/80 text-[clamp(1.1rem,1.6vw,1.6rem)]">/월</span>
      </div>
    </motion.div>
  );
}
