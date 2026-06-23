"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * D41 — Git/GitHub가 뭔가 (친절 설명 선언형) [Git · 백업과 협업]
 * 독립 선언형 Pin 씬(N06/N07·D14/D20 패턴). 16:9 2단, 클릭 타깃 없음.
 * 좌: 리드 → 메가(골드='타임머신') → 비유 2카드(기록기/금고) → 보조.
 * 우: 내 컴퓨터(Git 기록기) → 업로드 동기선(packet) → 클라우드 금고(GitHub·협업).
 */

const VB = { w: 760, h: 620 };
// 두 패널 사이 '가시 간격'에만 동기선을 그린다 (viewBox 좌표).
const LINE_TOP = 188; // 금고 카드 바닥 바로 아래
const LINE_BOT = 410; // PC 패널 상단 바로 위
const LINE_X = 380;

type Card = { tag: string; sub: string; title: string; desc: string; icon: "recorder" | "vault"; at: number };
const CARDS: Card[] = [
  { tag: "Git", sub: "ON YOUR PC", title: "내 컴퓨터의 저장 기록기", desc: "저장할 때마다 기록을 남긴다.", icon: "recorder", at: 0.4 },
  { tag: "GitHub", sub: "THE CLOUD VAULT", title: "기록을 올려두는 클라우드 금고", desc: "안전하게 백업 — 그리고 함께 작업.", icon: "vault", at: 0.5 },
];

const MATES = [0.66, 0.7, 0.74];
const COMMITS = [
  { t: "첫 작동 성공", on: false },
  { t: "버그 수정", on: false },
  { t: "지금 — 저장", on: true },
] as const;

export default function D41WhatIsGit() {
  return (
    <section data-scene="d41" data-act="Git · 백업과 협업" className="relative bg-ink text-bone">
      <Pin heights={3}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.36, 0.5]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  const leadO = useTransform(p, [0.02, 0.12], [0, 1]);
  const leadY = useTransform(p, [0.02, 0.16], [38, 0]);
  const megaO = useTransform(p, [0.16, 0.3], [0, 1]);
  const megaY = useTransform(p, [0.16, 0.32], [40, 0]);
  const goldGlow = useTransform(p, [0.28, 0.44], [0, 1]);
  const helpO = useTransform(p, [0.82, 0.92], [0, 1]);
  const helpY = useTransform(p, [0.82, 0.94], [26, 0]);
  const stageO = useTransform(p, [0.1, 0.24], [0, 1]);
  const stageY = useTransform(p, [0.1, 0.26], [40, 0]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 ── */}
      <motion.div aria-hidden style={{ opacity: glowO, background: "radial-gradient(52% 56% at 38% 46%, rgba(232,181,75,0.11), transparent 72%)" }} className="pointer-events-none absolute inset-0" />
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

      {/* ── 콘텐츠: 2단 ── */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1680px] grid-cols-1 content-center items-center gap-[clamp(2rem,4vw,4.5rem)] px-[clamp(2.5rem,5vw,7rem)] py-[8vh] lg:grid-cols-[1fr_1.02fr]">
        {/* ── 좌측 카피 ── */}
        <div className="order-1 flex flex-col justify-center">
          <motion.div style={{ opacity: leadO, y: leadY }}>
            <Kicker>Git · 백업과 협업</Kicker>
            <p className="mt-8 font-display font-bold leading-[1.28] text-bone/80 text-[clamp(1.5rem,3vw,3rem)]">
              <span className="whitespace-nowrap">
                Git? <span className="text-bone/70">그리고</span> GitHub?
              </span>
            </p>
          </motion.div>

          <motion.h2
            style={{ opacity: megaO, y: megaY }}
            className="relative mt-[clamp(1.4rem,3vh,2.4rem)] font-display font-black leading-[1.16] text-bone text-[clamp(2rem,4vw,4.1rem)]"
          >
            <motion.span
              aria-hidden
              style={{ opacity: goldGlow, background: "radial-gradient(52% 62% at 36% 72%, rgba(232,181,75,0.16), transparent 72%)" }}
              className="pointer-events-none absolute -inset-x-8 -inset-y-5 rounded-[40%]"
            />
            <span className="relative block whitespace-nowrap">작업을 저장·되돌리고,</span>
            <span className="relative block whitespace-nowrap">
              백업·협업하는 —{" "}
              <span className="text-gold" style={{ textShadow: "0 0 46px rgba(232,181,75,0.42)" }}>
                타임머신.
              </span>
            </span>
          </motion.h2>

          <div className="mt-[clamp(1.8rem,4vh,3rem)] grid grid-cols-1 gap-[clamp(1rem,1.6vw,1.6rem)] sm:grid-cols-2">
            {CARDS.map((c) => (
              <AnalogyCard key={c.tag} p={p} card={c} />
            ))}
          </div>

          <motion.p
            style={{ opacity: helpO, y: helpY }}
            className="mt-[clamp(1.6rem,3.5vh,2.6rem)] flex items-start gap-3 text-balance-k leading-relaxed text-bone/75 text-[clamp(1.05rem,1.5vw,1.55rem)]"
          >
            <span aria-hidden className="mt-[0.55em] inline-block h-px w-7 shrink-0 bg-gold/55" />
            <span>
              실수해도 <span className="whitespace-nowrap text-bone/90">되돌리고</span> —{" "}
              <span className="whitespace-nowrap text-bone/90">어디서든 내 작업을 꺼낸다.</span>
            </span>
          </motion.p>
        </div>

        {/* ── 우측 다이어그램 ── */}
        <motion.div style={{ opacity: stageO, y: stageY }} className="order-2">
          <SyncDiagram p={p} />
        </motion.div>
      </div>
    </div>
  );
}

/* ───────── 비유 카드 ───────── */
function AnalogyCard({ p, card }: { p: MotionValue<number>; card: Card }) {
  const o = useTransform(p, [card.at, card.at + 0.1], [0, 1]);
  const y = useTransform(p, [card.at, card.at + 0.12], [32, 0]);
  return (
    <motion.div
      style={{ opacity: o, y }}
      className="relative flex flex-col rounded-2xl border border-bone/12 bg-coal/70 px-[clamp(1.3rem,1.8vw,2rem)] py-[clamp(1.4rem,2.2vh,2rem)] backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-bone/20 bg-bone/[0.05] px-3 py-1 font-mono text-[clamp(0.72rem,0.95vw,0.95rem)] tracking-[0.04em] text-bone/80">{card.tag}</span>
        <CardIcon kind={card.icon} />
      </div>
      <h3 className="mt-5 font-display font-bold leading-[1.32] text-bone text-[clamp(1.2rem,1.7vw,1.7rem)]">{card.title}</h3>
      <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.26em] text-bone/55 md:text-[12px]">{card.sub}</p>
      <span className="mt-5 h-px w-full bg-bone/12" />
      <p className="mt-5 leading-relaxed text-bone/75 text-[clamp(0.95rem,1.25vw,1.3rem)]">{card.desc}</p>
    </motion.div>
  );
}

function CardIcon({ kind }: { kind: Card["icon"] }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(242,237,227,0.55)"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-[clamp(1.4rem,1.9vw,1.9rem)] w-[clamp(1.4rem,1.9vw,1.9rem)]"
    >
      {kind === "recorder" ? (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2M12 3.5v1.6M12 18.9v1.6M3.5 12h1.6M18.9 12h1.6" />
        </>
      ) : (
        <>
          <rect x="3.5" y="6.5" width="17" height="13" rx="2" />
          <circle cx="12" cy="13" r="2.8" />
          <path d="M12 13v2.4M3.5 9.5h17M8 6.5V5a4 4 0 0 1 8 0v1.5" />
        </>
      )}
    </svg>
  );
}

/* ───────── PC(Git) → 동기선 → 클라우드 금고(GitHub) ───────── */
function SyncDiagram({ p }: { p: MotionValue<number> }) {
  const upLen = useTransform(p, [0.5, 0.66], [0, 1]);
  const upO = useTransform(p, [0.5, 0.58], [0, 1]);
  const packetY = useTransform(p, [0.56, 0.82], [LINE_BOT, LINE_TOP]);
  const packetO = useTransform(p, [0.56, 0.62, 0.78, 0.82], [0, 1, 1, 0]);
  const cloudGlow = useTransform(p, [0.6, 0.8], [0.16, 0.42]);
  const recDot = useTransform(p, [0.42, 0.46, 0.5, 0.54], [0.25, 1, 0.25, 1]);

  return (
    <div className="relative mr-0 ml-auto aspect-[760/620] w-full max-w-[780px]">
      {/* 금고 후광 */}
      <motion.div aria-hidden style={{ opacity: cloudGlow, background: "radial-gradient(circle, rgba(232,181,75,0.4), transparent 70%)" }} className="pointer-events-none absolute left-1/2 top-[22%] h-[40%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]" />

      {/* 동기선 + 패킷 — 두 패널 사이 간격에만, 패널 위(z-20)에 그려 항상 보이게 */}
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="pointer-events-none absolute inset-0 z-20 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="d41sync" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="rgba(232,181,75,0.95)" />
            <stop offset="100%" stopColor="rgba(255,211,122,0.75)" />
          </linearGradient>
        </defs>
        {/* 바닥(어두운) 가이드선 — 항상 보이는 트랙 */}
        <line
          x1={LINE_X}
          y1={LINE_BOT}
          x2={LINE_X}
          y2={LINE_TOP}
          stroke="rgba(232,181,75,0.2)"
          strokeWidth={6}
          strokeLinecap="round"
        />
        {/* 동기선 — 스크롤로 아래(PC)→위(GitHub) 그려짐 */}
        <motion.path
          d={`M ${LINE_X} ${LINE_BOT} L ${LINE_X} ${LINE_TOP}`}
          fill="none"
          stroke="url(#d41sync)"
          strokeWidth={6}
          strokeLinecap="round"
          style={{ pathLength: upLen, opacity: upO, filter: "drop-shadow(0 0 9px rgba(232,181,75,0.75))" }}
        />
        {/* 화살촉 — 위(GitHub)로 향함 */}
        <motion.path
          d={`M ${LINE_X - 9} ${LINE_TOP + 13} L ${LINE_X} ${LINE_TOP} L ${LINE_X + 9} ${LINE_TOP + 13}`}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: upO, filter: "drop-shadow(0 0 8px rgba(232,181,75,0.7))" }}
        />
        <motion.circle cx={LINE_X} r={7} fill="var(--color-gold)" style={{ cy: packetY, opacity: packetO, filter: "drop-shadow(0 0 10px rgba(232,181,75,0.9))" }} />
      </svg>

      {/* push 라벨 — 동기선 옆 빈 공간에 (선/패널 글자 안 덮음) */}
      <motion.div style={{ opacity: upO }} className="absolute left-[56%] top-[50%] z-30 flex -translate-y-1/2 items-center gap-2 rounded-full border border-gold/45 bg-coal/90 px-3 py-1.5 backdrop-blur-sm">
        <span aria-hidden className="text-gold text-[clamp(0.8rem,1.1vw,1.05rem)] leading-none">↑</span>
        <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.22em] text-gold/85 md:text-[11px]">push · 백업</span>
      </motion.div>

      {/* 클라우드 금고(GitHub) — 골드는 테두리/아이콘만, 본체는 중성 톤 */}
      <div className="absolute left-1/2 top-[5%] w-[74%] -translate-x-1/2">
        {/* 금고 뚜껑 — 카드 상단 테두리에 붙임(겹침) */}
        <div className="absolute -top-[11%] left-1/2 z-0 h-[24%] w-[34%] -translate-x-1/2 rounded-t-full border border-b-0 border-gold/45 bg-gold/[0.07]" />
        <div className="relative z-[1] rounded-2xl border border-gold/45 bg-coal/85 px-[clamp(1rem,1.8vw,1.8rem)] py-[clamp(0.9rem,1.8vh,1.5rem)] shadow-[0_0_30px_rgba(232,181,75,0.14)] backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span aria-hidden className="text-[clamp(1.1rem,1.7vw,1.7rem)] leading-none">☁️</span>
              <div className="leading-tight">
                <p className="font-display font-bold text-bone text-[clamp(0.95rem,1.4vw,1.45rem)]">GitHub</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone/60 md:text-[11px]">cloud vault</p>
              </div>
            </div>
            <span aria-hidden className="text-gold text-[clamp(1rem,1.5vw,1.5rem)] leading-none">🔒</span>
          </div>
          <div className="mt-4 flex items-center gap-2.5 border-t border-bone/15 pt-3.5">
            <span className="mr-1 font-mono text-[9px] uppercase tracking-[0.2em] text-bone/60 md:text-[11px]">협업</span>
            {MATES.map((at, i) => (
              <Mate key={i} p={p} at={at} />
            ))}
          </div>
        </div>
      </div>

      {/* 내 컴퓨터(Git 기록기) */}
      <div className="absolute bottom-[3%] left-1/2 w-[70%] -translate-x-1/2">
        <div className="overflow-hidden rounded-xl border border-bone/15 bg-[#0c0a10] shadow-[0_18px_44px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 border-b border-bone/10 bg-coal/90 px-3 py-2">
            {["bg-ember/70", "bg-gold/70", "bg-bone/30"].map((c) => (
              <span key={c} className={`h-2 w-2 rounded-full ${c}`} />
            ))}
            <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.2em] text-bone/45 md:text-[11px]">내 컴퓨터 · Git</span>
          </div>
          <div className="space-y-2.5 px-3.5 py-3.5">
            {COMMITS.map((row, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <motion.span
                  style={row.on ? { opacity: recDot } : undefined}
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${row.on ? "bg-gold shadow-[0_0_10px_rgba(232,181,75,0.8)]" : "border border-bone/30"}`}
                />
                <span className={`font-mono text-[clamp(0.68rem,0.95vw,0.95rem)] tracking-[0.01em] ${row.on ? "text-gold" : "text-bone/55"}`}>{row.t}</span>
                <span className="ml-auto font-mono text-[clamp(0.6rem,0.8vw,0.8rem)] text-bone/30">#{String(i + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-bone/10 bg-[#08070b] px-3.5 py-2">
            <span aria-hidden className="font-mono text-bone/45 text-[clamp(0.7rem,0.95vw,0.95rem)] leading-none">↺</span>
            <span className="font-mono text-[clamp(0.62rem,0.85vw,0.85rem)] tracking-[0.12em] text-bone/40">언제든 과거로 되돌리기</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Mate({ p, at }: { p: MotionValue<number>; at: number }) {
  const o = useTransform(p, [at, at + 0.06], [0, 1]);
  const s = useTransform(p, [at, at + 0.08], [0.6, 1]);
  return (
    <motion.span
      style={{ opacity: o, scale: s }}
      className="grid h-[clamp(20px,2.4vw,28px)] w-[clamp(20px,2.4vw,28px)] place-items-center rounded-full border border-bone/25 bg-bone/[0.08] font-mono text-[clamp(0.6rem,0.85vw,0.85rem)] text-bone/70"
    >●</motion.span>
  );
}
