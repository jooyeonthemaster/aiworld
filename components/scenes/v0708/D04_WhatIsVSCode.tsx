"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * D04 — VS Code가 뭔가 (친절 설명 선언형)  [설치 · VS CODE]
 * TutorialScene 미사용 — N06/N07 패턴의 독립 선언형 Pin 씬.
 * 16:9 중앙정렬 메가타이포 + 2단 비유(워드 vs VS Code)로 가로를 시원하게 채운다.
 * 스크롤 비트: 리드 → 메가 선언(골드 1개) → 비유 2단 점등 → 보조(브라우저 열기).
 * 골드 강조 = '무료 코드 에디터' 단 하나.
 */

/* ── 비유 2단 데이터 ── */
type Pane = {
  app: string;
  sub: string;
  line: string;
  what: string;
  tint: boolean; // true = VS Code(골드 톤)
};
const PANES: Pane[] = [
  { app: "워드", sub: "MS WORD", line: "글을 쓰는 곳", what: "문서를 편집한다", tint: false },
  { app: "VS Code", sub: "VISUAL STUDIO CODE", line: "코드를 쓰는 곳", what: "여기에 AI까지 산다", tint: true },
];

export default function D04WhatIsVSCode() {
  return (
    <section data-scene="d04" data-act="설치 · VS CODE" className="relative bg-ink text-bone">
      <Pin heights={3}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.36, 0.48]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  /* ── 비트 ── */
  const kickO = useTransform(p, [0.0, 0.08], [0, 1]);

  const leadO = useTransform(p, [0.04, 0.14], [0, 1]);
  const leadY = useTransform(p, [0.04, 0.18], [34, 0]);

  const megaO = useTransform(p, [0.16, 0.3], [0, 1]);
  const megaY = useTransform(p, [0.16, 0.32], [40, 0]);
  const goldGlow = useTransform(p, [0.28, 0.44], [0, 1]);

  const helpO = useTransform(p, [0.82, 0.92], [0, 1]);
  const helpY = useTransform(p, [0.82, 0.94], [26, 0]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(54% 58% at 50% 42%, rgba(232,181,75,0.11), transparent 72%)" }}
        />
      </motion.div>
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

      {/* ── 콘텐츠: 중앙정렬 단일 컬럼, 가로 풀폭 ── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col content-center items-center justify-center gap-[clamp(2rem,5vh,4.5rem)] px-[clamp(2.5rem,6vw,8rem)] py-[8vh]">
        {/* 리드 */}
        <motion.div style={{ opacity: leadO, y: leadY }} className="text-center">
          <motion.div style={{ opacity: kickO }}>
            <Kicker className="justify-center">설치 · VS CODE</Kicker>
          </motion.div>
          <p className="mt-7 font-display font-bold leading-[1.3] text-bone/80 text-[clamp(1.35rem,2.6vw,2.6rem)]">
            <span className="whitespace-nowrap">
              VS Code<span className="text-bone/45">(브이에스 코드)</span>?
            </span>
          </p>
        </motion.div>

        {/* 메가 선언 */}
        <motion.h2
          style={{ opacity: megaO, y: megaY }}
          className="relative max-w-[1280px] text-center font-display font-black leading-[1.14] text-bone text-[clamp(2.6rem,6.2vw,6.8rem)]"
        >
          <motion.span
            aria-hidden
            style={{ opacity: goldGlow }}
            className="pointer-events-none absolute -inset-x-10 -inset-y-6 rounded-[40%]"
          >
            <span
              className="block h-full w-full"
              style={{ background: "radial-gradient(50% 60% at 50% 64%, rgba(232,181,75,0.18), transparent 72%)" }}
            />
          </motion.span>
          <span className="relative block">마이크로소프트가 만든 —</span>
          <span
            className="relative mt-2 block whitespace-nowrap text-gold"
            style={{ textShadow: "0 0 46px rgba(232,181,75,0.42)" }}
          >
            무료 코드 에디터.
          </span>
        </motion.h2>

        {/* 비유 2단 */}
        <div className="grid w-full max-w-[1280px] grid-cols-1 items-stretch gap-[clamp(1rem,2vw,2.2rem)] md:grid-cols-[1fr_auto_1fr]">
          <AnalogyPane pane={PANES[0]} at={0.4} p={p} />
          <Bridge p={p} />
          <AnalogyPane pane={PANES[1]} at={0.56} p={p} />
        </div>

        {/* 보조 — 브라우저 열기 */}
        <motion.p
          style={{ opacity: helpO, y: helpY }}
          className="text-balance-k text-center leading-relaxed text-bone/65 text-[clamp(1.05rem,1.55vw,1.55rem)]"
        >
          그러니 먼저 — <span className="text-bone/90">이걸 깔자.</span>{" "}
          <span className="whitespace-nowrap">브라우저를 연다</span>{" "}
          <span className="text-bone/45">(크롬 · 엣지 · 사파리 아무거나).</span>
        </motion.p>
      </div>
    </div>
  );
}

/* ───────────────────────── 비유 패널 (워드 / VS Code) ───────────────────────── */
function AnalogyPane({ pane, at, p }: { pane: Pane; at: number; p: MotionValue<number> }) {
  const o = useTransform(p, [at, at + 0.1], [0, 1]);
  const y = useTransform(p, [at, at + 0.12], [34, 0]);
  const tintGlow = useTransform(p, [at + 0.04, at + 0.18], [0, 1]);

  return (
    <motion.div
      style={{ opacity: o, y }}
      className={`relative flex flex-col rounded-2xl border bg-coal/70 px-[clamp(1.6rem,2.4vw,2.8rem)] py-[clamp(1.6rem,2.6vh,2.6rem)] backdrop-blur-sm ${
        pane.tint ? "border-gold/55" : "border-bone/12"
      }`}
    >
      {pane.tint ? (
        <motion.div
          aria-hidden
          style={{
            opacity: tintGlow,
            background: "radial-gradient(62% 72% at 50% 40%, rgba(232,181,75,0.15), transparent 72%)",
          }}
          className="pointer-events-none absolute -inset-4 rounded-3xl"
        />
      ) : null}

      {/* 미니 앱 창 칩 */}
      <div className="relative flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${pane.tint ? "bg-gold/75" : "bg-bone/30"}`} />
        <span className={`h-2.5 w-2.5 rounded-full ${pane.tint ? "bg-gold/45" : "bg-bone/20"}`} />
        <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.26em] text-bone/40 md:text-[12px]">
          {pane.sub}
        </span>
      </div>

      {/* 앱 이름 */}
      <h3
        className={`relative mt-6 font-display font-black leading-tight text-[clamp(1.8rem,2.8vw,3rem)] ${
          pane.tint ? "text-gold [text-shadow:0_0_34px_rgba(232,181,75,0.4)]" : "text-bone"
        }`}
      >
        {pane.app}
      </h3>

      {/* '~ 쓰는 곳' */}
      <p className="relative mt-3 font-display font-bold leading-snug text-bone/85 text-[clamp(1.25rem,1.9vw,1.95rem)]">
        {pane.line}
      </p>

      {/* 구분선 */}
      <span className={`relative mt-6 h-px w-full ${pane.tint ? "bg-gold/40" : "bg-bone/12"}`} />

      {/* 보조 설명 */}
      <p
        className={`relative mt-6 leading-relaxed text-[clamp(1rem,1.35vw,1.4rem)] ${
          pane.tint ? "text-bone/85" : "text-bone/55"
        }`}
      >
        {pane.what}
      </p>
    </motion.div>
  );
}

/* 가운데 다리 — '같은 종류다' 화살표 */
function Bridge({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [0.5, 0.6], [0, 1]);
  const s = useTransform(p, [0.5, 0.62], [0.7, 1]);
  return (
    <motion.div
      style={{ opacity: o, scale: s }}
      className="hidden flex-col items-center justify-center gap-2 self-center md:flex"
    >
      <span className="font-display font-black leading-none text-gold/70 text-[clamp(1.6rem,2.4vw,2.6rem)]">→</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-bone/35 md:text-[12px]">같은 종류</span>
    </motion.div>
  );
}
