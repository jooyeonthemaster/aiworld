"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Pin from "@/components/ui/Pin";

const DOMINO_LINES = [
  "AI는 나를, 변호사보다 법을 잘 다루게 한다.",
  "AI는 나를, 십 년 차처럼 코드를 짜게 한다.",
  "AI는 나를, 기자보다 빠르고 깊게 쓰게 한다.",
  "AI는 나를, 애널리스트처럼 시장을 읽게 한다.",
  "AI는 나를, 디자이너처럼 만들게 한다.",
];

export default function Scene13() {
  return (
    <section
      data-scene="s13"
      data-act="ACT 2 — 다른 종류의 발명"
      className="relative overflow-x-clip bg-ink text-bone"
    >
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

/* ───────────────────────── 핀 스테이지 ───────────────────────── */

function Stage({ p }: { p: MotionValue<number> }) {
  // 배경 앰비언트 골드 — '예.'의 순간 차오르고, 마무리에서 잔광
  const ambientO = useTransform(
    p,
    [0.16, 0.3, 0.46, 0.6, 0.86, 0.96],
    [0.03, 0.32, 0.14, 0.08, 0.08, 0.18]
  );

  // 비트1 — 그런데, AI는.
  const b1o = useTransform(p, [0.03, 0.09, 0.15, 0.2], [0, 1, 1, 0]);
  const b1y = useTransform(p, [0.03, 0.2], [36, -36]);

  // 비트2 — 예. (도장 리듬을 깨부수는 카타르시스)
  const yesO = useTransform(p, [0.2, 0.26, 0.42, 0.48], [0, 1, 1, 0]);
  const yesS = useTransform(p, [0.2, 0.3, 0.42, 0.48], [0.82, 1, 1, 1.5]);
  const bloomO = useTransform(p, [0.2, 0.3, 0.42, 0.5], [0, 0.85, 0.65, 0]);
  const bloomS = useTransform(p, [0.2, 0.38], [0.45, 1.3]);
  const ringS = useTransform(p, [0.21, 0.38], [0.3, 2.6]);
  const ringO = useTransform(p, [0.21, 0.235, 0.38], [0, 0.7, 0]);

  // 비트4 — 마무리 선언
  const b4o = useTransform(p, [0.86, 0.93], [0, 1]);
  const b4y = useTransform(p, [0.86, 0.93], [44, 0]);
  const tagO = useTransform(p, [0.91, 0.97], [0, 1]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* 앰비언트 글로우 레이어 */}
      <motion.div
        aria-hidden
        style={{
          opacity: ambientO,
          background:
            "radial-gradient(circle at 50% 52%, rgba(232,181,75,0.4) 0%, rgba(232,181,75,0.1) 38%, transparent 68%)",
        }}
        className="pointer-events-none absolute inset-0"
      />
      {/* 칠흑 비네트 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 52%, rgba(7,6,10,0.85) 100%)",
        }}
      />

      {/* 비트1 — 그런데, AI는. */}
      <div className="absolute inset-0 flex items-center justify-center px-[6vw]">
        <motion.h2
          style={{ opacity: b1o, y: b1y }}
          className="text-center font-display font-black leading-[1.15] text-bone text-balance-k text-[clamp(2.6rem,7vw,6.5rem)]"
        >
          그런데, AI는.
        </motion.h2>
      </div>

      {/* 비트2 — 예. */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* 글로우 블룸 */}
        <motion.div
          aria-hidden
          style={{
            opacity: bloomO,
            scale: bloomS,
            background:
              "radial-gradient(circle at center, rgba(255,211,122,0.55) 0%, rgba(232,181,75,0.2) 42%, transparent 70%)",
          }}
          className="absolute h-[110vmin] w-[110vmin] rounded-full"
        />
        {/* 충격파 링 */}
        <motion.div
          aria-hidden
          style={{ opacity: ringO, scale: ringS }}
          className="absolute h-[52vmin] w-[52vmin] rounded-full border border-gold/60"
        />
        <motion.span
          style={{
            opacity: yesO,
            scale: yesS,
            textShadow:
              "0 0 70px rgba(232,181,75,0.55), 0 0 200px rgba(232,181,75,0.3)",
          }}
          className="font-display font-black leading-none text-gold text-[clamp(9rem,56vh,40rem)]"
        >
          예.
        </motion.span>
      </div>

      {/* 비트3 — 도미노 카드 5연타 */}
      <div className="absolute inset-0 flex items-center justify-center px-[6vw]">
        <div className="flex w-full max-w-[880px] flex-col gap-[2vh]">
          {DOMINO_LINES.map((line, i) => (
            <Domino key={i} p={p} i={i} text={line} />
          ))}
        </div>
      </div>

      {/* 비트4 — 마무리 선언 */}
      <div className="absolute inset-0 flex items-center justify-center px-[6vw]">
        <motion.h2
          style={{ opacity: b4o, y: b4y }}
          className="max-w-[1200px] text-center font-display font-black leading-[1.3] text-bone text-balance-k text-[clamp(1.9rem,4.6vw,4.2rem)]"
        >
          역사상 처음으로 — &lsquo;도구&rsquo;가 아니라{" "}
          <span
            className="text-gold"
            style={{ textShadow: "0 0 50px rgba(232,181,75,0.45)" }}
          >
            &lsquo;능력&rsquo;
          </span>
          을 빌려주는 발명이 나타났다.
        </motion.h2>
      </div>

      {/* 마감 모노 태그 */}
      <div className="absolute inset-x-0 bottom-[6vh] flex justify-center">
        <motion.span
          style={{ opacity: tagO }}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/55 md:text-[11px]"
        >
          A DIFFERENT KIND OF INVENTION
        </motion.span>
      </div>
    </div>
  );
}

/* ───────────────────────── 도미노 카드 ───────────────────────── */

function Domino({
  p,
  i,
  text,
}: {
  p: MotionValue<number>;
  i: number;
  text: string;
}) {
  const t0 = 0.47 + i * 0.058;
  const o = useTransform(p, [t0, t0 + 0.028, 0.8, 0.86], [0, 1, 1, 0]);
  const x = useTransform(p, [t0, t0 + 0.05], [-64, 0]);
  const s = useTransform(p, [t0, t0 + 0.05], [0.94, 1]);
  // 꽂히는 순간 골드 림 라이트가 번쩍였다 가라앉음
  const rimO = useTransform(p, [t0, t0 + 0.03, t0 + 0.1], [0, 0.9, 0.25]);
  const exitY = useTransform(p, [0.8, 0.86], [0, -28]);

  return (
    <motion.div style={{ opacity: o, x, scale: s, y: exitY }} className="relative">
      <motion.div
        aria-hidden
        style={{ opacity: rimO }}
        className="pointer-events-none absolute inset-0 rounded-lg border border-gold/70 shadow-[0_0_36px_rgba(232,181,75,0.25)]"
      />
      <div className="flex items-center gap-6 rounded-lg border border-bone/10 bg-coal/85 px-7 py-[2.1vh] md:px-9">
        <span className="font-mono text-xs tracking-[0.3em] text-gold/80 md:text-sm">
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="h-8 w-px shrink-0 bg-bone/10" />
        <p className="font-display font-bold leading-snug text-bone text-balance-k text-[clamp(1.05rem,2vw,1.7rem)]">
          {text}
        </p>
      </div>
    </motion.div>
  );
}
