"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * Z01 — 습관이 전부다  [CLOSE / 마무리]
 * 16:9 풀스크린 선언형 + Pin 스크롤 스테이지.
 * 세 비트가 스크롤로 순차 점등(opacity+y) → 마지막 골드 선언("매일, VS Code에서
 * 채팅하라")에 글로우가 차오른다 → 하단 모노 캡션("그게 — 전부다.").
 * 차분한 마무리 톤: 글로우는 후반부에 천천히, 골드 강조는 1개 원칙.
 */

type Beat = {
  /** 비트가 점등되는 progress 구간 시작 */
  at: number;
  /** 이전 비트를 살짝 음소거할지(앞 비트는 조연으로) */
  body: React.ReactNode;
};

const BEATS: Beat[] = [
  {
    at: 0.1,
    body: (
      <>
        <span className="block whitespace-nowrap">도구를 외우지 마라.</span>
        <span className="block whitespace-nowrap text-bone/55">도구는, 또 바뀐다.</span>
      </>
    ),
  },
  {
    at: 0.32,
    body: (
      <span className="block whitespace-nowrap">
        습관을 <span className="text-bone">만들어라</span> —
      </span>
    ),
  },
];

export default function Z01Habit() {
  return (
    <section
      data-scene="z01"
      data-act="CLOSE · 습관이 전부다"
      className="relative bg-ink text-bone"
    >
      <Pin heights={3}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경: 차분하게 차오르는 글로우 + 그리드 패럴랙스 ── */
  const glowO = useTransform(p, [0, 0.55, 1], [0.12, 0.26, 0.46]);
  const gridShift = useTransform(p, [0, 1], [0, -34]);

  /* ── 킥커 ── */
  const kickO = useTransform(p, [0.02, 0.1], [0, 1]);
  const kickY = useTransform(p, [0.02, 0.12], [22, 0]);

  /* ── 앞 두 비트가 점등 후 골드 선언이 들어올 때 한 톤 가라앉음 ── */
  const leadDim = useTransform(p, [0.5, 0.62], [1, 0.34]);

  /* ── 골드 선언("매일, VS Code에서 채팅하라") ── */
  const goldO = useTransform(p, [0.54, 0.66], [0, 1]);
  const goldY = useTransform(p, [0.54, 0.68], [42, 0]);
  const goldGlow = useTransform(p, [0.62, 0.86], [0, 0.55]);
  const goldScale = useTransform(p, [0.54, 0.7], [0.965, 1]);

  /* ── 하단 캡션 ── */
  const capO = useTransform(p, [0.82, 0.94], [0, 0.85]);
  const capY = useTransform(p, [0.82, 0.96], [18, 0]);
  const ruleW = useTransform(p, [0.84, 0.98], ["0px", "44px"]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 (하단 중앙에서 차분히) ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(56% 60% at 50% 62%, rgba(232,181,75,0.13), transparent 72%)" }}
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
            backgroundSize: "76px 76px",
            maskImage: "radial-gradient(80% 80% at 50% 52%, black, transparent 100%)",
          }}
        />
      </motion.div>

      {/* ── 콘텐츠: 선언형, 중앙 정렬, 가로로 시원하게 ── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col content-center items-center justify-center gap-[clamp(2rem,5vh,4.5rem)] px-[clamp(2.5rem,6vw,8rem)] py-[8vh] text-center">
        {/* 킥커 */}
        <motion.div style={{ opacity: kickO, y: kickY }}>
          <Kicker className="justify-center">CLOSE · 마지막으로</Kicker>
        </motion.div>

        {/* 앞 두 비트 — 점등 후 골드 선언 시 한 톤 음소거(조연) */}
        <motion.div
          style={{ opacity: leadDim }}
          className="flex flex-col items-center gap-[clamp(1.4rem,3.4vh,3rem)]"
        >
          {BEATS.map((b, i) => (
            <BeatLine key={i} p={p} beat={b} />
          ))}
        </motion.div>

        {/* 골드 선언 — 글로우 차오름 (강조 1개) */}
        <motion.div
          style={{ opacity: goldO, y: goldY, scale: goldScale }}
          className="relative mt-[clamp(0.5rem,2vh,2rem)]"
        >
          <motion.div
            aria-hidden
            style={{ opacity: goldGlow }}
            className="pointer-events-none absolute -inset-x-[12%] -inset-y-[40%] rounded-[100%]"
          >
            <div
              className="h-full w-full"
              style={{ background: "radial-gradient(50% 55% at 50% 50%, rgba(232,181,75,0.30), rgba(232,181,75,0.08) 48%, transparent 74%)" }}
            />
          </motion.div>
          <p className="relative font-display font-black leading-[1.16] text-gold text-[clamp(2.6rem,6.2vw,6.4rem)] [text-shadow:0_0_60px_rgba(232,181,75,0.42),0_0_20px_rgba(232,181,75,0.28)]">
            <span className="block whitespace-nowrap">매일,</span>
            <span className="block whitespace-nowrap">VS Code에서 채팅하라.</span>
          </p>
        </motion.div>

        {/* 하단 캡션 (모노) */}
        <motion.div
          style={{ opacity: capO, y: capY }}
          className="mt-[clamp(1rem,3vh,2.5rem)] flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.34em] text-bone/55 md:text-[13px]"
        >
          <motion.span style={{ width: ruleW }} className="inline-block h-px bg-gold/55" />
          <span className="whitespace-nowrap">
            그게 — <span className="text-gold/85">전부다.</span>
          </span>
          <motion.span style={{ width: ruleW }} className="inline-block h-px bg-gold/55" />
        </motion.div>
      </div>
    </div>
  );
}

/* ── 단일 비트 라인 (스크롤 점등: opacity + y) ── */
function BeatLine({ p, beat }: { p: MotionValue<number>; beat: Beat }) {
  const o = useTransform(p, [beat.at, beat.at + 0.12], [0, 1]);
  const y = useTransform(p, [beat.at, beat.at + 0.14], [38, 0]);
  return (
    <motion.p
      style={{ opacity: o, y }}
      className="font-display font-bold leading-[1.28] text-bone text-[clamp(1.6rem,3.4vw,3.4rem)]"
    >
      {beat.body}
    </motion.p>
  );
}
