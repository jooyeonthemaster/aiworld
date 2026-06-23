"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * D20 — Node.js가 뭔가 (친절 설명 선언형)  [Node.js · 엔진]
 * TutorialScene 미사용 — N06/N07·D04 패턴 독립 선언형 Pin 씬.
 * 16:9 중앙정렬 메가타이포 + 자동차/엔진 비유 3단 그리드로 가로를 시원하게.
 * 비트: 리드 → 메가 선언(골드='실행하는 엔진') → 비유 3단(자동차←엔진→도구들) → 보조.
 * 골드 강조 = 중앙 '엔진' 단 하나.
 */

/* 비유 3단: 자동차 ← [엔진] → 굴러가는 것들. gold=중앙 엔진만 */
type Card = { role: string; title: string; sub: string; desc: string; chips: string[]; gold: boolean; icon: "car" | "engine" | "tools" };
const CARDS: Card[] = [
  { role: "비유 — 탈것", title: "자동차", sub: "THE CAR", desc: "엔진이 있어야 비로소 굴러간다.", chips: ["AI 자동화", "도구", "프로그램"], gold: false, icon: "car" },
  { role: "정답 — 엔진", title: "Node.js", sub: "THE ENGINE", desc: "AI가 만든 프로그램을 실제로 돌리는 엔진.", chips: ["실행", "구동", "런타임"], gold: true, icon: "engine" },
  { role: "그래서 — 돌아간다", title: "도구들", sub: "POWERED BY NODE", desc: "이 많은 도구가, Node가 있어야 돈다.", chips: ["npm", "Vercel", "크롤러"], gold: false, icon: "tools" },
];

export default function D20WhatIsNode() {
  return (
    <section data-scene="d20" data-act="Node.js · 엔진" className="relative bg-ink text-bone">
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

  const helpO = useTransform(p, [0.84, 0.94], [0, 1]);
  const helpY = useTransform(p, [0.84, 0.96], [26, 0]);

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

      {/* ── 콘텐츠: 중앙정렬, 가로 풀폭 ── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col content-center items-center justify-center gap-[clamp(2rem,5vh,4.5rem)] px-[clamp(2.5rem,6vw,8rem)] py-[8vh]">
        {/* 리드 */}
        <motion.div style={{ opacity: leadO, y: leadY }} className="text-center">
          <motion.div style={{ opacity: kickO }}>
            <Kicker className="justify-center">Node.js · 엔진</Kicker>
          </motion.div>
          <p className="mt-7 font-display font-bold leading-[1.3] text-bone/80 text-[clamp(1.35rem,2.6vw,2.6rem)]">
            <span className="whitespace-nowrap">
              Node.js<span className="text-bone/45">(노드)</span>?
            </span>
          </p>
        </motion.div>

        {/* 메가 선언 */}
        <motion.h2
          style={{ opacity: megaO, y: megaY }}
          className="relative max-w-[1320px] text-center font-display font-black leading-[1.14] text-bone text-[clamp(2.4rem,5.8vw,6.4rem)]"
        >
          <motion.span
            aria-hidden
            style={{ opacity: goldGlow }}
            className="pointer-events-none absolute -inset-x-10 -inset-y-6 rounded-[40%]"
          >
            <span
              className="block h-full w-full"
              style={{ background: "radial-gradient(50% 60% at 50% 66%, rgba(232,181,75,0.18), transparent 72%)" }}
            />
          </motion.span>
          <span className="relative block">AI가 만든 프로그램을 —</span>
          <span
            className="relative mt-2 block whitespace-nowrap text-gold"
            style={{ textShadow: "0 0 46px rgba(232,181,75,0.42)" }}
          >
            실행하는 엔진.
          </span>
        </motion.h2>

        {/* 비유 3단 (자동차 ← 엔진 → 도구들) */}
        <div className="grid w-full max-w-[1400px] grid-cols-1 items-stretch gap-[clamp(1rem,1.8vw,2rem)] md:grid-cols-[1fr_auto_1.1fr_auto_1fr]">
          <AnalogyCard card={CARDS[0]} at={0.4} p={p} />
          <Bridge p={p} at={0.5} label="엔진이 있어야" />
          <AnalogyCard card={CARDS[1]} at={0.52} p={p} />
          <Bridge p={p} at={0.62} label="그래서 돈다" />
          <AnalogyCard card={CARDS[2]} at={0.64} p={p} />
        </div>

        {/* 보조 — 한 번 깔면 끝 */}
        <motion.p
          style={{ opacity: helpO, y: helpY }}
          className="text-balance-k text-center leading-relaxed text-bone/65 text-[clamp(1.05rem,1.55vw,1.6rem)]"
        >
          좋은 소식 — <span className="whitespace-nowrap text-bone/90">한 번 깔면 끝.</span>{" "}
          평생 다시 안 깔아도 된다.{" "}
          <span className="whitespace-nowrap text-bone/90">지금 깔자.</span>
        </motion.p>
      </div>
    </div>
  );
}

/* ───────────────────────── 비유 카드 (자동차 / 엔진 / 도구들) ───────────────────────── */
function AnalogyCard({ card, at, p }: { card: Card; at: number; p: MotionValue<number> }) {
  const o = useTransform(p, [at, at + 0.1], [0, 1]);
  const y = useTransform(p, [at, at + 0.12], [34, 0]);
  const tintGlow = useTransform(p, [at + 0.04, at + 0.18], [0, 1]);

  return (
    <motion.div
      style={{ opacity: o, y }}
      className={`relative flex flex-col rounded-2xl border bg-coal/70 px-[clamp(1.4rem,2vw,2.4rem)] py-[clamp(1.5rem,2.4vh,2.4rem)] backdrop-blur-sm ${
        card.gold ? "border-gold/55" : "border-bone/12"
      }`}
    >
      {card.gold ? (
        <motion.div
          aria-hidden
          style={{
            opacity: tintGlow,
            background: "radial-gradient(62% 72% at 50% 40%, rgba(232,181,75,0.16), transparent 72%)",
          }}
          className="pointer-events-none absolute -inset-4 rounded-3xl"
        />
      ) : null}

      {/* 역할 라벨 + 아이콘 */}
      <div className="relative flex items-center justify-between gap-3">
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.24em] md:text-[12px] ${
            card.gold ? "text-gold/75" : "text-bone/40"
          }`}
        >
          {card.role}
        </span>
        <CardIcon kind={card.icon} gold={card.gold} />
      </div>

      {/* 이름 */}
      <h3
        className={`relative mt-6 font-display font-black leading-tight text-[clamp(1.7rem,2.6vw,2.9rem)] ${
          card.gold ? "text-gold [text-shadow:0_0_34px_rgba(232,181,75,0.4)]" : "text-bone"
        }`}
      >
        {card.title}
      </h3>
      <p
        className={`relative mt-1.5 font-mono text-[10px] uppercase tracking-[0.26em] md:text-[12px] ${
          card.gold ? "text-gold/65" : "text-bone/40"
        }`}
      >
        {card.sub}
      </p>

      {/* 구분선 */}
      <span className={`relative mt-6 h-px w-full ${card.gold ? "bg-gold/40" : "bg-bone/12"}`} />

      {/* 한 줄 설명 */}
      <p
        className={`relative mt-6 leading-relaxed text-[clamp(1rem,1.3vw,1.35rem)] ${
          card.gold ? "text-bone/90" : "text-bone/60"
        }`}
      >
        {card.desc}
      </p>

      {/* 예시 칩 */}
      <div className="relative mt-auto flex flex-wrap gap-2.5 pt-6">
        {card.chips.map((c) => (
          <span
            key={c}
            className={`rounded-full border px-3.5 py-1.5 font-mono text-[clamp(0.78rem,0.95vw,1rem)] tracking-[0.02em] ${
              card.gold ? "border-gold/45 bg-gold/10 text-gold" : "border-bone/15 bg-bone/[0.04] text-bone/70"
            }`}
          >
            {c}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* 가운데 다리 — 흐름 화살표 (작은 라벨) */
function Bridge({ p, at, label }: { p: MotionValue<number>; at: number; label: string }) {
  const o = useTransform(p, [at, at + 0.1], [0, 1]);
  const s = useTransform(p, [at, at + 0.12], [0.7, 1]);
  return (
    <motion.div
      style={{ opacity: o, scale: s }}
      className="hidden flex-col items-center justify-center gap-2 self-center md:flex"
    >
      <span className="font-display font-black leading-none text-gold/70 text-[clamp(1.5rem,2.2vw,2.4rem)]">→</span>
      <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-bone/35 md:text-[12px]">
        {label}
      </span>
    </motion.div>
  );
}

/* ───────────────────────── 카드 아이콘 (인라인 SVG) ───────────────────────── */
function CardIcon({ kind, gold }: { kind: Card["icon"]; gold: boolean }) {
  const stroke = gold ? "var(--color-gold)" : "rgba(242,237,227,0.55)";
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[clamp(1.4rem,1.9vw,1.9rem)] w-[clamp(1.4rem,1.9vw,1.9rem)]"
      aria-hidden
    >
      {kind === "car" ? (
        <>
          <path d="M3 13l1.8-4.2A2 2 0 0 1 6.6 7.5h10.8a2 2 0 0 1 1.8 1.3L21 13" />
          <path d="M3 13h18v4a1 1 0 0 1-1 1h-1.5" />
          <path d="M5.5 18H4a1 1 0 0 1-1-1v-4" />
          <path d="M8.5 18h7" />
          <circle cx="7" cy="18" r="1.8" />
          <circle cx="17" cy="18" r="1.8" />
        </>
      ) : kind === "engine" ? (
        <>
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v3M12 18v3M4 7.5l2.6 1.5M17.4 15l2.6 1.5M20 7.5l-2.6 1.5M6.6 15L4 16.5" />
        </>
      ) : (
        <>
          <path d="M14.5 5.5l4 4-7.5 7.5-4-4z" />
          <path d="M18.5 9.5l1.4-1.4a2 2 0 0 0-2.8-2.8L15.7 6.7" />
          <path d="M7 13l-3 3a2 2 0 1 0 2.8 2.8l3-3" />
          <circle cx="5.5" cy="17.5" r="0.6" />
        </>
      )}
    </svg>
  );
}
