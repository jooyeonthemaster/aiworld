"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * D32 — API 키가 뭔가 (친절 설명 선언형)  [API 키 · AI 연결 / 선언·정보형]
 * TutorialScene 미사용 — D14/D20·N06/N07 패턴 독립 선언형 Pin 씬.
 * 비트: 리드(API 키?) → 메가 선언(골드='출입증') → 의미 3단 → ember 경고 '키는 비밀번호다'.
 * 골드 강조 1개 원칙(BIBLE §6.4): 1순위 골드 = 메가 '출입증.' 하나.
 * 공용 키 카드는 제목만 골드(서브 강조)로 차등 — border/glow/칩은 절제해 시선 분산 방지. 경고만 ember.
 */

/* 의미 3단: 무엇인가 / 조심 / 이번 수업. gold=서브 강조(공용 키 제목만), ember=경고 */
type Tone = "bone" | "ember" | "gold";
type Card = { role: string; title: string; sub: string; desc: string; chips: string[]; tone: Tone; icon: "pass" | "lock" | "ticket" };
const CARDS: Card[] = [
  { role: "무엇인가", title: "출입증 · 비밀번호", sub: "ACCESS PASS", tone: "bone", icon: "pass",
    desc: "AI 두뇌(모델)에 접속하게 해주는 신분증. 이 키가 있어야 Cline이 AI에 연결된다.",
    chips: ["sk-or-...", "신분 확인", "접속 허가"] },
  { role: "조심", title: "절대 공유 금지", sub: "KEEP IT SECRET", tone: "ember", icon: "lock",
    desc: "남에게 보여주면 안 된다 — 키가 새면 내 대신 쓰여 돈이 나갈 수 있다.",
    chips: ["비공개", "캡처 X", "채팅 붙여넣기 X"] },
  { role: "이번 수업", title: "공용 수업용 키", sub: "CLASS KEY", tone: "gold", icon: "ticket",
    desc: "선생님이 준비한 공용 키를 그대로 쓴다 — 회원가입·로그인 없이 바로 시작.",
    chips: ["가입 X", "로그인 X", "복사·붙여넣기"] },
];

export default function D32WhatIsKey() {
  return (
    <section data-scene="d32" data-act="API 키 · AI 연결" className="relative bg-ink text-bone">
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

  const warnO = useTransform(p, [0.84, 0.94], [0, 1]);
  const warnY = useTransform(p, [0.84, 0.96], [26, 0]);
  const warnGlow = useTransform(p, [0.88, 0.98], [0, 0.5]);

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
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col content-center items-center justify-center gap-[clamp(1.8rem,4.5vh,4rem)] px-[clamp(2.5rem,6vw,8rem)] py-[7vh]">
        {/* 리드 */}
        <motion.div style={{ opacity: leadO, y: leadY }} className="text-center">
          <motion.div style={{ opacity: kickO }}>
            <Kicker className="justify-center">API 키 · AI 연결</Kicker>
          </motion.div>
          <p className="mt-7 font-display font-bold leading-[1.3] text-bone/80 text-[clamp(1.35rem,2.6vw,2.6rem)]">
            <span className="whitespace-nowrap">
              API 키<span className="text-bone/45">(키)</span>?
            </span>
          </p>
        </motion.div>

        {/* 메가 선언 */}
        <motion.h2
          style={{ opacity: megaO, y: megaY }}
          className="relative max-w-[1320px] text-center font-display font-black leading-[1.14] text-bone text-[clamp(2.2rem,5.4vw,6rem)]"
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
          <span className="relative block">AI 두뇌에 접속하는 —</span>
          <span
            className="relative mt-2 block whitespace-nowrap text-gold"
            style={{ textShadow: "0 0 46px rgba(232,181,75,0.42)" }}
          >
            출입증.
          </span>
        </motion.h2>

        {/* 의미 3단 (무엇인가 · 조심 · 이번 수업) */}
        <div className="grid w-full max-w-[1480px] grid-cols-1 items-stretch gap-[clamp(1rem,1.8vw,2rem)] md:grid-cols-3">
          {CARDS.map((c, i) => (
            <MeaningCard key={c.sub} card={c} at={0.4 + i * 0.11} p={p} />
          ))}
        </div>

        {/* ember 경고 — 키는 비밀번호다 */}
        <motion.div style={{ opacity: warnO, y: warnY }} className="relative">
          <motion.div
            aria-hidden
            style={{ opacity: warnGlow }}
            className="pointer-events-none absolute -inset-x-6 -inset-y-3 rounded-3xl"
          >
            <div
              className="h-full w-full"
              style={{ background: "radial-gradient(60% 70% at 50% 50%, rgba(255,75,46,0.16), transparent 72%)" }}
            />
          </motion.div>
          <div className="relative inline-flex items-center gap-3.5 rounded-2xl border border-ember/45 bg-ember/[0.07] px-[clamp(1.3rem,2vw,2.2rem)] py-[clamp(0.85rem,1.6vh,1.4rem)]">
            <WarnIcon />
            <p className="font-display font-bold leading-none text-ember text-[clamp(1.15rem,2vw,2rem)]">
              <span className="whitespace-nowrap">키 = 비밀번호. 절대 공유하지 말 것.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ───────────────────────── 의미 카드 (출입증 / 조심 / 공용 키) ───────────────────────── */
function MeaningCard({ card, at, p }: { card: Card; at: number; p: MotionValue<number> }) {
  const o = useTransform(p, [at, at + 0.1], [0, 1]);
  const y = useTransform(p, [at, at + 0.12], [34, 0]);
  /* 골드 카드는 '서브 강조'로 차등화: glow 상한 0.5 (메가 '출입증.'만 1순위 골드) */
  const tintGlow = useTransform(p, [at + 0.04, at + 0.18], [0, card.tone === "gold" ? 0.5 : 1]);

  const gold = card.tone === "gold";
  const ember = card.tone === "ember";
  const border = gold ? "border-gold/30" : ember ? "border-ember/40" : "border-bone/12";
  const tint = gold
    ? "radial-gradient(62% 72% at 50% 40%, rgba(232,181,75,0.16), transparent 72%)"
    : "radial-gradient(62% 72% at 50% 40%, rgba(255,75,46,0.13), transparent 72%)";

  return (
    <motion.div
      style={{ opacity: o, y }}
      className={`relative flex flex-col rounded-2xl border bg-coal/70 px-[clamp(1.4rem,2vw,2.4rem)] py-[clamp(1.5rem,2.4vh,2.4rem)] backdrop-blur-sm ${border}`}
    >
      {gold || ember ? (
        <motion.div
          aria-hidden
          style={{ opacity: tintGlow, background: tint }}
          className="pointer-events-none absolute -inset-4 rounded-3xl"
        />
      ) : null}

      {/* 역할 라벨 + 아이콘 */}
      <div className="relative flex items-center justify-between gap-3">
        <span className={`font-mono text-[10px] uppercase tracking-[0.24em] md:text-[12px] ${gold ? "text-gold/75" : ember ? "text-ember/80" : "text-bone/55"}`}>
          {card.role}
        </span>
        <CardIcon kind={card.icon} tone={card.tone} />
      </div>

      {/* 이름 */}
      <h3
        className={`relative mt-6 font-display font-black leading-tight text-[clamp(1.45rem,2.2vw,2.5rem)] ${
          gold ? "text-gold [text-shadow:0_0_18px_rgba(232,181,75,0.28)]" : ember ? "text-ember" : "text-bone"
        }`}
      >
        {card.title}
      </h3>
      <p className={`relative mt-1.5 font-mono text-[10px] uppercase tracking-[0.26em] md:text-[12px] ${gold ? "text-gold/65" : ember ? "text-ember/65" : "text-bone/50"}`}>
        {card.sub}
      </p>

      {/* 구분선 */}
      <span
        className={`relative mt-6 h-px w-full ${gold ? "bg-gold/40" : ember ? "bg-ember/35" : "bg-bone/12"}`}
      />

      {/* 한 줄 설명 */}
      <p className={`relative mt-6 leading-relaxed text-[clamp(1rem,1.3vw,1.35rem)] ${gold ? "text-bone/90" : "text-bone/65"}`}>
        {card.desc}
      </p>

      {/* 예시 칩 — 칩 영역 높이 고정(min-h)으로 카드별 baseline 정렬, 한 줄 유지 */}
      <div className="relative mt-auto flex min-h-[2.5rem] flex-wrap content-end items-end gap-2.5 pt-6">
        {card.chips.map((c) => (
          <span
            key={c}
            className={`whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[clamp(0.74rem,0.92vw,0.98rem)] tracking-[0.02em] ${
              ember ? "border-ember/40 bg-ember/[0.08] text-ember/90" : "border-bone/15 bg-bone/[0.04] text-bone/80"
            }`}
          >
            {c}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ───────────────────────── 카드 아이콘 (인라인 SVG) ───────────────────────── */
function CardIcon({ kind, tone }: { kind: Card["icon"]; tone: Card["tone"] }) {
  const stroke =
    tone === "gold" ? "var(--color-gold)" : tone === "ember" ? "var(--color-ember)" : "rgba(242,237,227,0.55)";
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
      {kind === "pass" ? (
        <>
          {/* 출입증 카드 */}
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="8" cy="11" r="2" />
          <path d="M5.5 16c0-1.5 1.2-2.5 2.5-2.5S10.5 14.5 10.5 16" />
          <path d="M14 10h5M14 13h5" />
        </>
      ) : kind === "lock" ? (
        <>
          {/* 자물쇠 */}
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          <circle cx="12" cy="15.5" r="1.3" />
        </>
      ) : (
        <>
          {/* 입장권 / 티켓 */}
          <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8z" />
          <path d="M14 6v12" strokeDasharray="2 2" />
          <path d="M7.5 12h3" />
        </>
      )}
    </svg>
  );
}

/* 경고 아이콘 (삼각 느낌표) */
function WarnIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-ember)"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[clamp(1.2rem,1.7vw,1.7rem)] w-[clamp(1.2rem,1.7vw,1.7rem)] shrink-0"
      aria-hidden
    >
      <path d="M10.3 3.8 1.9 18a2 2 0 0 0 1.7 3h16.8a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}
