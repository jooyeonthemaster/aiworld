"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";

/**
 * S02 — 첫 번째 질문 (핀 4)
 * 칠흑. 거대 세리프 단어들이 스크롤 진행에 따라 하나씩 점등되고,
 * 문장 완성 후 전체가 골드로 물들며 글로우. 마지막에 모노 캡션.
 */

const WORDS = ["당신은", "지금,", "AI를", "얼마나", "활용하고", "있습니까."];
const SENTENCE = "당신은 지금, AI를 얼마나 활용하고 있습니까.";

/** i 번째 단어의 점등 구간 (progress) */
const wordWindow = (i: number): [number, number] => {
  const start = 0.06 + i * 0.103;
  return [start, start + 0.075];
};

export default function Scene02() {
  return (
    <section
      data-scene="s02"
      data-act="PROLOGUE — 두 가지 질문"
      className="relative bg-ink text-bone"
    >
      <Pin heights={4}>
        {(p) => (
          /* 주의: render-prop 내부 hook 금지 — 모든 hook 은 Stage 내부에서 */
          <Stage p={p} />
        )}
      </Pin>
    </section>
  );
}

/* ====================================================================== */
/* 핀 스테이지                                                             */
/* ====================================================================== */
function Stage({ p }: { p: MotionValue<number> }) {
  /* 문장 완성 후 — 골드 점화 */
  const goldOp = useTransform(p, [0.72, 0.82], [0, 1]);
  /* 골드 점화에 동조하는 배경 글로우 */
  const glowOp = useTransform(p, [0.72, 0.88], [0, 0.5]);
  /* 캡션 등장과 함께 문장이 살짝 위로 양보 */
  const sentenceY = useTransform(p, [0.82, 0.92], [0, -30]);
  const sentenceScale = useTransform(p, [0.72, 0.96], [1, 1.025]);
  /* 마지막 비트 캡션 */
  const capOp = useTransform(p, [0.84, 0.93], [0, 1]);
  const capY = useTransform(p, [0.84, 0.93], [22, 0]);
  /* 상단 라벨 / 우측 진행 레일 */
  const labelOp = useTransform(p, [0.01, 0.07], [0, 1]);
  const railScale = useTransform(p, [0, 1], [0, 1]);

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden px-[6vw]">
      {/* ---------- 배경: 아주 희미한 골드 펄스 ---------- */}
      <div
        aria-hidden
        className="animate-pulse-soft pointer-events-none absolute left-1/2 top-1/2 h-[120vh] w-[120vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(232,181,75,0.8), transparent 70%)",
        }}
      />
      {/* ---------- 배경: 골드 점화에 동조하는 글로우 ---------- */}
      <motion.div
        aria-hidden
        style={{ opacity: glowOp }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[86vw] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(232,181,75,0.22), transparent 70%)",
          }}
        />
      </motion.div>

      {/* ---------- 상단 모노 라벨 ---------- */}
      <motion.div
        style={{ opacity: labelOp }}
        className="absolute top-[9vh] left-1/2 flex -translate-x-1/2 items-center gap-4 font-mono text-[11px] uppercase tracking-[0.35em] text-gold/75 md:text-xs"
      >
        <span className="h-px w-8 bg-gold/50" />
        <span>Prologue — Question 01</span>
        <span className="h-px w-8 bg-gold/50" />
      </motion.div>

      {/* ---------- 센터: 문장 + 캡션 ---------- */}
      <div className="relative z-10 flex w-full max-w-[1240px] flex-col items-center">
        <motion.p
          aria-label={SENTENCE}
          style={{ y: sentenceY, scale: sentenceScale }}
          className="flex flex-wrap items-baseline justify-center gap-x-[0.32em] gap-y-[0.08em] text-center font-display font-bold leading-[1.22] text-[clamp(2.6rem,7vw,7rem)]"
        >
          {WORDS.map((w, i) => (
            <Word key={i} p={p} i={i} gold={goldOp}>
              {w}
            </Word>
          ))}
        </motion.p>

        {/* 단어 점등 틱 — 6개의 미세 인디케이터 */}
        <div aria-hidden className="mt-[5.5vh] flex items-center gap-2.5">
          {WORDS.map((_, i) => (
            <Tick key={i} p={p} i={i} />
          ))}
        </div>

        {/* 마지막 비트 캡션 */}
        <motion.p
          style={{ opacity: capOp, y: capY }}
          className="text-balance-k mt-[4.5vh] max-w-[680px] text-center font-mono text-xs leading-relaxed tracking-[0.08em] text-bone/50 md:text-[13px]"
        >
          솔직하게 — 검색창 대신 AI에게 먼저 물어본 게, 마지막으로 언제입니까?
        </motion.p>
      </div>

      {/* ---------- 우측 진행 레일 ---------- */}
      <div
        aria-hidden
        className="absolute right-[5vw] top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="h-1 w-1 rounded-full bg-gold/60" />
        <span className="relative block h-[30vh] w-px bg-bone/10">
          <motion.span
            style={{ scaleY: railScale }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-gold/70"
          />
        </span>
        <span className="h-1 w-1 rounded-full bg-bone/25" />
      </div>
    </div>
  );
}

/* ====================================================================== */
/* 단어 — 3중 레이어: 윤곽(stroke) / 점등(bone) / 점화(gold)                 */
/* ====================================================================== */
function Word({
  p,
  i,
  gold,
  children,
}: {
  p: MotionValue<number>;
  i: number;
  gold: MotionValue<number>;
  children: string;
}) {
  const [start, end] = wordWindow(i);
  const fillOp = useTransform(p, [start, end], [0.08, 1]);
  const fillY = useTransform(p, [start, end], [20, 0]);

  return (
    <span className="relative inline-block">
      {/* 점등 전 — 윤곽만 */}
      <span aria-hidden className="text-stroke-bone opacity-40">
        {children}
      </span>
      {/* 점등 — 본 톤 채움 */}
      <motion.span
        aria-hidden
        style={{ opacity: fillOp, y: fillY }}
        className="absolute inset-0 text-bone"
      >
        {children}
      </motion.span>
      {/* 점화 — 골드 + 글로우 */}
      <motion.span
        aria-hidden
        style={{
          opacity: gold,
          textShadow:
            "0 0 28px rgba(232,181,75,0.55), 0 0 90px rgba(232,181,75,0.3)",
        }}
        className="absolute inset-0 text-gold"
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ====================================================================== */
/* 점등 틱 인디케이터                                                       */
/* ====================================================================== */
function Tick({ p, i }: { p: MotionValue<number>; i: number }) {
  const [start, end] = wordWindow(i);
  const op = useTransform(p, [start, end], [0.15, 1]);
  const bg = useTransform(p, [0.72, 0.82], ["#F2EDE3", "#E8B54B"]);

  return (
    <motion.span
      style={{ opacity: op, backgroundColor: bg }}
      className="block h-px w-6"
    />
  );
}
