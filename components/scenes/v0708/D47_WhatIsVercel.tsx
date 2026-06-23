"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * D47 — Vercel이 뭔가  [Vercel · 세상에 공개 / 선언·정보형 견본 패턴]
 * 친절 선언형. 독립 Pin 씬(N06/N07 패턴).
 * 리드 'Vercel(버셀)?' → 메가 '내 웹페이지를 인터넷에 공짜로 띄우는 곳' →
 * 3카드 비유(내 컴퓨터 → 링크 하나 → 명령 한 줄) → 보조 한 줄.
 * 골드 강조 1개: '인터넷에 공짜로'.
 */

type Card = { no: string; head: string; sub: string; body: string };
const CARDS: Card[] = [
  {
    no: "01",
    head: "지금은 — 내 컴퓨터에만",
    sub: "MY MACHINE ONLY",
    body: "내가 만든 페이지는 내 컴퓨터 안에서만 열린다. 나밖에 못 본다.",
  },
  {
    no: "02",
    head: "링크 하나로 — 전 세계가",
    sub: "ONE LINK · WORLDWIDE",
    body: "Vercel에 올리면 주소(URL)가 생긴다. 그 링크만 있으면 누구나 본다.",
  },
  {
    no: "03",
    head: "명령 한 줄이면 — 끝",
    sub: "ONE COMMAND · DONE",
    body: "터미널에 vercel 한 줄. 배포 끝. 받은 주소를 그냥 공유하면 된다.",
  },
];

export default function D47WhatIsVercel() {
  return (
    <section
      data-scene="d47"
      data-act="Vercel · 세상에 공개"
      className="relative bg-ink text-bone"
    >
      <Pin heights={3}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.18, 0.4, 0.52]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  /* ── 비트 ── */
  const leadO = useTransform(p, [0.02, 0.12], [0, 1]);
  const leadY = useTransform(p, [0.02, 0.16], [38, 0]);

  const megaO = useTransform(p, [0.16, 0.28], [0, 1]);
  const megaY = useTransform(p, [0.16, 0.3], [44, 0]);
  const goldGlow = useTransform(p, [0.26, 0.4], [0, 1]);

  const footO = useTransform(p, [0.82, 0.92], [0, 1]);
  const footY = useTransform(p, [0.82, 0.94], [26, 0]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(54% 58% at 50% 40%, rgba(232,181,75,0.11), transparent 72%)" }}
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

      {/* ── 콘텐츠 ── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col content-center items-center justify-center gap-[clamp(2rem,5vh,4.5rem)] px-[clamp(2.5rem,6vw,8rem)] py-[7vh]">
        {/* 리드 */}
        <motion.div style={{ opacity: leadO, y: leadY }} className="text-center">
          <Kicker className="justify-center">Vercel · 세상에 공개</Kicker>
          <p className="mt-6 font-mono uppercase tracking-[0.34em] text-bone/45 text-[clamp(0.9rem,1.3vw,1.25rem)]">
            Vercel<span className="text-bone/70"> (버셀)</span>?
          </p>
        </motion.div>

        {/* 메가 선언 */}
        <motion.div style={{ opacity: megaO, y: megaY }} className="relative text-center">
          <motion.div
            aria-hidden
            style={{ opacity: goldGlow }}
            className="pointer-events-none absolute -inset-x-10 -inset-y-8 rounded-[3rem]"
          >
            <div
              className="h-full w-full"
              style={{ background: "radial-gradient(55% 60% at 50% 55%, rgba(232,181,75,0.14), transparent 72%)" }}
            />
          </motion.div>
          <h2 className="relative mx-auto max-w-[1280px] font-display font-black leading-[1.16] text-bone text-[clamp(2.4rem,5.6vw,6rem)]">
            <span className="block whitespace-nowrap">내 웹페이지를 —</span>
            <span className="block whitespace-nowrap">
              <span className="relative text-gold [text-shadow:0_0_46px_rgba(232,181,75,0.45)]">인터넷에 공짜로</span>{" "}
              띄우는 곳.
            </span>
          </h2>
          <p className="relative mx-auto mt-[clamp(1.4rem,3vh,2.4rem)] max-w-[1080px] text-balance-k leading-[1.5] text-bone/75 text-[clamp(1.15rem,2vw,2rem)]">
            내 컴퓨터에만 있던 페이지를,{" "}
            <span className="whitespace-nowrap text-bone">링크 하나로 전 세계가 보게.</span>
          </p>
        </motion.div>

        {/* 3카드 비유 */}
        <div className="grid w-full grid-cols-1 gap-[clamp(1rem,1.5vw,1.8rem)] md:grid-cols-3">
          {CARDS.map((c, i) => (
            <StepCard key={c.no} card={c} index={i} p={p} />
          ))}
        </div>

        {/* 보조 한 줄 */}
        <motion.p
          style={{ opacity: footO, y: footY }}
          className="text-balance-k text-center font-display font-bold leading-[1.45] text-bone/85 text-[clamp(1.1rem,1.9vw,1.95rem)]"
        >
          명령 한 줄이면 배포 끝. —{" "}
          <span className="whitespace-nowrap">받은 주소를 그냥 공유하면 된다.</span>
        </motion.p>
      </div>
    </div>
  );
}

function StepCard({ card, index, p }: { card: Card; index: number; p: MotionValue<number> }) {
  const at = 0.44 + index * 0.12;
  const o = useTransform(p, [at, at + 0.1], [0, 1]);
  const y = useTransform(p, [at, at + 0.12], [40, 0]);
  /* 마지막 카드(배포 = 핵심)만 골드 점등 */
  const gold = index === 2;
  const goldGlow = useTransform(p, [at + 0.05, at + 0.16], [0, 1]);

  return (
    <motion.div
      style={{ opacity: o, y }}
      className={`relative flex flex-col rounded-2xl border bg-coal/70 px-[clamp(1.4rem,1.8vw,2.2rem)] py-[clamp(1.6rem,2.4vh,2.4rem)] backdrop-blur-sm ${
        gold ? "border-gold/55" : "border-bone/12"
      }`}
    >
      {gold ? (
        <motion.div
          aria-hidden
          style={{
            opacity: goldGlow,
            background: "radial-gradient(60% 70% at 50% 40%, rgba(232,181,75,0.16), transparent 72%)",
          }}
          className="pointer-events-none absolute -inset-4 rounded-3xl"
        />
      ) : null}

      {/* 번호 + 단계명 */}
      <div className="relative flex items-baseline gap-3">
        <span
          className={`font-mono text-[clamp(1.1rem,1.4vw,1.5rem)] tracking-[0.1em] ${
            gold ? "text-gold" : "text-bone/35"
          }`}
        >
          {card.no}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone/35 md:text-[12px]">{card.sub}</span>
      </div>

      <h3
        className={`relative mt-4 font-display font-black leading-[1.24] text-[clamp(1.25rem,1.9vw,1.95rem)] ${
          gold ? "text-gold [text-shadow:0_0_30px_rgba(232,181,75,0.35)]" : "text-bone"
        }`}
      >
        {card.head}
      </h3>

      {/* 구분선 */}
      <span className={`relative mt-5 h-px w-full ${gold ? "bg-gold/40" : "bg-bone/12"}`} />

      {/* 설명 */}
      <p
        className={`relative mt-5 text-balance-k leading-relaxed text-[clamp(1rem,1.25vw,1.3rem)] ${
          gold ? "text-bone/85" : "text-bone/60"
        }`}
      >
        {card.body}
      </p>
    </motion.div>
  );
}
