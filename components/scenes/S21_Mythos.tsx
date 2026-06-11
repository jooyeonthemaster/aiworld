"use client";

import { ReactNode } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import Pin from "@/components/ui/Pin";

const LETTERS = ["M", "Y", "T", "H", "O", "S"];

/* ------------------------------------------------------------------ */
/* MYTHOS 글자 하나 — 윤곽만 있다가 진행에 따라 골드로 점등             */
/* ------------------------------------------------------------------ */
function MythLetter({ p, ch, i }: { p: MotionValue<number>; ch: string; i: number }) {
  const start = 0.05 + i * 0.042;
  const lit = useTransform(p, [start, start + 0.05], [0, 1]);
  const flare = useTransform(p, [start, start + 0.025, start + 0.07], [0, 1, 0]);

  return (
    <span className="relative inline-block">
      {/* 꺼진 상태 — 윤곽선 */}
      <span className="text-stroke-gold opacity-25">{ch}</span>
      {/* 점등 상태 */}
      <motion.span
        style={{
          opacity: lit,
          textShadow: "0 0 30px rgba(232,181,75,0.6), 0 0 80px rgba(232,181,75,0.28)",
        }}
        className="absolute inset-0 text-gold"
        aria-hidden
      >
        {ch}
      </motion.span>
      {/* 점등 순간의 과노출 플레어 */}
      <motion.span
        style={{ opacity: flare, textShadow: "0 0 50px rgba(255,211,122,0.9)" }}
        className="absolute inset-0 text-gold-bright"
        aria-hidden
      >
        {ch}
      </motion.span>
      {/* 글자 아래 틱 */}
      <motion.span
        style={{ opacity: lit }}
        className="absolute -bottom-[0.28em] left-1/2 h-[3px] w-[0.45em] -translate-x-1/2 bg-gold/70"
        aria-hidden
      />
    </span>
  );
}

/* 크로스 페이드 비트 */
function Beat({
  p,
  t,
  children,
  className = "",
}: {
  p: MotionValue<number>;
  t: [number, number, number, number];
  children: ReactNode;
  className?: string;
}) {
  const opacity = useTransform(p, t, [0, 1, 1, 0]);
  const y = useTransform(p, t, [30, 0, 0, -30]);
  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-x-0 top-0 flex flex-col items-center px-[8vw] text-center ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* 비트3 — ember 강조 라인이 내부에서 한 박자 늦게 */
function Beat3({ p }: { p: MotionValue<number> }) {
  const emberO = useTransform(p, [0.71, 0.76], [0, 1]);
  const emberY = useTransform(p, [0.71, 0.76], [16, 0]);
  return (
    <Beat p={p} t={[0.66, 0.72, 0.8, 0.86]}>
      <p className="text-balance-k font-display text-[clamp(1.3rem,2.6vw,2.2rem)] font-bold text-bone/80">
        문제는 단 하나였다.
      </p>
      <motion.p
        style={{
          opacity: emberO,
          y: emberY,
          textShadow: "0 0 40px rgba(255,75,46,0.4), 0 0 100px rgba(255,75,46,0.15)",
        }}
        className="text-balance-k mt-6 font-display text-[clamp(1.9rem,4.6vw,4rem)] font-black leading-[1.2] text-ember"
      >
        너무 강력해서, 공개할 수 없었다.
      </motion.p>
    </Beat>
  );
}

/* ------------------------------------------------------------------ */
/* 핀 스테이지                                                          */
/* ------------------------------------------------------------------ */
function MythosStage({ p }: { p: MotionValue<number> }) {
  /* 자간 — 극단적으로 벌어져 있다가 진행에 따라 조여듦 */
  const tracking = useTransform(p, [0.05, 0.9], ["0.82em", "0.30em"]);
  const trackingComp = useTransform(p, [0.05, 0.9], ["-0.82em", "-0.30em"]);

  /* 점등 완료 후 위로 물러나며 비트에 무대를 내줌 */
  const myY = useTransform(p, [0.36, 0.48], [0, -110]);
  const myScale = useTransform(p, [0.36, 0.48], [1, 0.8]);
  const myO = useTransform(p, [0.66, 0.72, 0.84, 0.9], [1, 0.65, 0.65, 0.9]);

  /* 배경 글로우 / ember 워시 / 진행 게이지 */
  const glowO = useTransform(p, [0.06, 0.32], [0, 1]);
  const gaugeSX = useTransform(p, [0.05, 0.3], [0, 1]);
  const emberWashO = useTransform(p, [0.66, 0.74, 0.84, 0.9], [0, 0.13, 0.13, 0]);
  const vaultO = useTransform(p, [0.7, 0.78], [0, 1]);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-ink text-bone">
      {/* ---------- 배경: 칠흑 + 초저속 펄스 글로우 ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div style={{ opacity: glowO }} className="absolute inset-0">
          <motion.div
            animate={{ opacity: [0.4, 0.85, 0.4], scale: [1, 1.06, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-[38%] h-[70vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
            style={{ background: "radial-gradient(circle, rgba(232,181,75,0.12), transparent 65%)" }}
          />
        </motion.div>
        {/* ember 경고 워시 (비트3 국면) */}
        <motion.div
          style={{ opacity: emberWashO }}
          className="absolute inset-0"
        >
          <div className="absolute inset-x-0 top-0 h-[45vh] bg-gradient-to-b from-ember/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-ember/10 to-transparent" />
        </motion.div>
        {/* 봉인 표식 — '공개 불가' 국면에 떠오르는 링 */}
        <motion.div
          style={{ opacity: vaultO }}
          className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="h-[58vmin] w-[58vmin] rounded-full border border-ember/15"
            style={{ borderStyle: "dashed" }}
          />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 40%, #07060a 96%)" }}
        />
      </div>

      {/* 코너 메타 라벨 */}
      <div aria-hidden className="absolute left-6 top-6 font-mono text-[9px] tracking-[0.4em] text-bone/25 md:left-10 md:top-10 md:text-[10px]">
        FILE 21 — MODEL DESIGNATION
      </div>
      <div aria-hidden className="absolute bottom-6 right-6 font-mono text-[9px] tracking-[0.4em] text-bone/25 md:bottom-10 md:right-10 md:text-[10px]">
        INTERNAL — DO NOT DISTRIBUTE
      </div>

      {/* ---------- MYTHOS 점등 ---------- */}
      <div className="absolute left-1/2 top-[42%] z-10 w-full -translate-x-1/2 -translate-y-1/2">
        <motion.div style={{ y: myY, scale: myScale, opacity: myO }} className="text-center">
          <motion.span
            style={{ letterSpacing: tracking, marginRight: trackingComp }}
            className="whitespace-nowrap font-display text-[clamp(2rem,8.5vw,7.5rem)] font-black leading-none"
          >
            {LETTERS.map((ch, i) => (
              <MythLetter key={i} p={p} ch={ch} i={i} />
            ))}
          </motion.span>
          {/* 점등 게이지 */}
          <motion.div
            style={{ scaleX: gaugeSX }}
            className="mx-auto mt-12 h-px w-[min(480px,56vw)] origin-left bg-gold/40"
          />
          <div className="mt-4 font-mono text-[9px] tracking-[0.5em] text-gold/45 md:text-[10px]">
            DESIGNATION CONFIRMED — MYTHOS
          </div>
        </motion.div>
      </div>

      {/* ---------- 비트 시퀀스 ---------- */}
      <div className="absolute inset-x-0 top-[52%] z-10">
        {/* 비트1 */}
        <Beat p={p} t={[0.36, 0.42, 0.46, 0.52]}>
          <p className="text-balance-k font-display text-[clamp(1.3rem,2.6vw,2.2rem)] font-medium text-bone/80">
            그 직후, 그들이 꺼내 든 것.
          </p>
        </Beat>

        {/* 비트2 */}
        <Beat p={p} t={[0.5, 0.56, 0.62, 0.68]}>
          <h2 className="text-balance-k font-display text-[clamp(2rem,5.4vw,4.8rem)] font-black leading-[1.22] text-bone">
            기존의 어떤 모델과도
            <br />
            비교 자체를 거부하는 —{" "}
            <span
              className="text-gold-bright"
              style={{ textShadow: "0 0 40px rgba(255,211,122,0.4)" }}
            >
              괴물.
            </span>
          </h2>
        </Beat>

        {/* 비트3 — ember */}
        <Beat3 p={p} />

        {/* 비트4 — 내부 평가 (잔류) */}
        <Beat p={p} t={[0.84, 0.9, 1.5, 1.6]}>
          <div className="mb-5 flex items-center gap-4 font-mono text-[9px] tracking-[0.4em] text-bone/30 md:text-[10px]">
            <span className="h-px w-8 bg-bone/20" />
            <span>INTERNAL ASSESSMENT — EXCERPT</span>
            <span className="h-px w-8 bg-bone/20" />
          </div>
          <p className="text-balance-k max-w-[760px] font-mono text-[clamp(0.9rem,1.5vw,1.15rem)] leading-relaxed tracking-wide text-bone/65">
            이 모델을 쥐면 — 평범한 개인이 빅테크의 방화벽을 뚫는다. 그것이 내부 평가였다.
          </p>
        </Beat>
      </div>
    </div>
  );
}

export default function Scene21() {
  return (
    <section data-scene="s21" data-act="ACT 4 — 어떤 회사 이야기" className="relative bg-ink">
      <Pin heights={4}>{(p) => <MythosStage p={p} />}</Pin>
    </section>
  );
}
