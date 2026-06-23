"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * W04 — 습관: 진짜 시작점  [WHY · 두 개의 무기 → 30사례 다리]
 * 16:9 풀스크린 2단 + Pin 스크롤 스테이지.
 * 좌: 3개 비트가 스크롤로 순차 점등(opacity+y) → 강조어 '채팅창을 여는 습관'은 골드 1개 원칙.
 *     마지막 비트에서 '30가지' 예고(메가 골드).
 * 우: 비트와 동기화되는 비주얼 — '검색창 → 채팅창' 대비 목업이 점등되고,
 *     마지막에 30 사례 그리드 프리뷰가 차오르며 가로/세로를 적극 채운다.
 * 하단 스크롤 큐로 다음(사례) 톤 전달.
 */

export default function W04Habit() {
  return (
    <section
      data-scene="w04"
      data-act="WHY · 두 개의 무기"
      className="relative bg-ink text-bone"
    >
      <Pin heights={3}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 (글로우 + 그리드 패럴랙스) ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.36, 0.52]);
  const glowX = useTransform(p, [0, 1], ["-6vw", "6vw"]);
  const gridShift = useTransform(p, [0, 1], [0, -44]);

  /* ── 비트 1: 제대로 된 작업은, 전부 여기서 시작된다 ── */
  const b1O = useTransform(p, [0.03, 0.13, 0.4, 0.52], [0, 1, 1, 0.28]);
  const b1Y = useTransform(p, [0.03, 0.15], [40, 0]);

  /* ── 비트 2: 검색창 대신 — 채팅창을 여는 습관 ── */
  const b2O = useTransform(p, [0.34, 0.46, 0.7, 0.8], [0, 1, 1, 0.32]);
  const b2Y = useTransform(p, [0.34, 0.48], [42, 0]);
  const goldGlow = useTransform(p, [0.46, 0.62], [0, 1]);

  /* ── 비트 3: 이제, 보여주겠습니다 — 30가지 ── */
  const b3O = useTransform(p, [0.66, 0.78], [0, 1]);
  const b3Y = useTransform(p, [0.66, 0.8], [46, 0]);
  const numO = useTransform(p, [0.74, 0.86], [0, 1]);
  const numScale = useTransform(p, [0.74, 0.9], [0.84, 1]);
  const numGlow = useTransform(p, [0.82, 0.96], [0.2, 0.7]);

  /* ── 하단: 캡션 + 스크롤 큐 ── */
  const capO = useTransform(p, [0.86, 0.96], [0, 1]);
  const cueO = useTransform(p, [0.9, 1], [0, 0.85]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 (X 패럴랙스) ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            x: glowX,
            background:
              "radial-gradient(52% 58% at 50% 46%, rgba(232,181,75,0.13), transparent 72%)",
          }}
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
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(78% 78% at 50% 50%, black, transparent 100%)",
          }}
        />
      </motion.div>

      {/* ── 콘텐츠: 2단 (좌 카피 · 우 비주얼) — content-center 수직 중앙 ── */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 content-center items-center gap-[clamp(2rem,5vw,5.5rem)] px-[clamp(2.5rem,6vw,8rem)] py-[6vh] lg:grid-cols-[1.04fr_0.96fr]">
        {/* ── 좌측: 3비트 선언 카피 ── */}
        <div className="flex flex-col justify-center gap-[clamp(1.8rem,4vh,3.4rem)]">
          <Kicker>습관 — 진짜 시작점</Kicker>

          {/* 비트 1 */}
          <motion.p
            style={{ opacity: b1O, y: b1Y }}
            className="font-display font-bold leading-[1.24] text-bone/85 text-[clamp(1.8rem,3.4vw,3.6rem)]"
          >
            <span className="block whitespace-nowrap">제대로 된 작업은,</span>
            <span className="block whitespace-nowrap">전부 여기서 시작된다.</span>
          </motion.p>

          {/* 비트 2 — 강조어(골드 1개) */}
          <motion.p
            style={{ opacity: b2O, y: b2Y }}
            className="relative font-display font-black leading-[1.18] text-bone text-[clamp(2rem,4.2vw,4.6rem)]"
          >
            <motion.span
              aria-hidden
              style={{ opacity: goldGlow }}
              className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10"
            >
              <span
                className="block h-full w-full"
                style={{
                  background:
                    "radial-gradient(58% 62% at 50% 54%, rgba(232,181,75,0.16), transparent 72%)",
                }}
              />
            </motion.span>
            <span className="block whitespace-nowrap text-bone/60">검색창 대신 —</span>
            <span className="block whitespace-nowrap text-gold [text-shadow:0_0_48px_rgba(232,181,75,0.42)]">
              채팅창을 여는 습관.
            </span>
          </motion.p>

          {/* 비트 3 — 30가지 예고 */}
          <motion.div style={{ opacity: b3O, y: b3Y }} className="flex w-full flex-wrap items-baseline gap-x-[clamp(1.2rem,2.4vw,2.6rem)] gap-y-3">
            <p className="font-display font-bold leading-[1.2] text-bone text-[clamp(1.6rem,3vw,3.2rem)]">
              <span className="whitespace-nowrap">이제, 보여주겠습니다 —</span>
            </p>
            <motion.div
              style={{ opacity: numO, scale: numScale }}
              className="relative inline-flex items-baseline"
            >
              <motion.span
                aria-hidden
                style={{ opacity: numGlow }}
                className="animate-pulse-soft pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 rounded-full"
              >
                <span
                  className="block h-full w-full rounded-full"
                  style={{
                    background:
                      "radial-gradient(50% 50% at 50% 50%, rgba(232,181,75,0.22), transparent 70%)",
                  }}
                />
              </motion.span>
              <span
                className="font-display font-black leading-none tabular-nums text-gold text-[clamp(3.2rem,6.4vw,6.4rem)]"
                style={{ textShadow: "0 0 60px rgba(232,181,75,0.5), 0 0 20px rgba(232,181,75,0.34)" }}
              >
                30
              </span>
              <span className="ml-1 font-display font-bold leading-none text-gold text-[clamp(1.6rem,2.6vw,2.6rem)]">
                가지.
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* ── 우측: 비트 동기화 비주얼 (검색창 → 채팅창 → 30 그리드) ── */}
        <div className="hidden h-full place-items-center lg:grid">
          <HabitVisual p={p} />
        </div>
      </div>

      {/* ── 하단 캡션 (모노) ── */}
      <motion.div
        style={{ opacity: capO }}
        className="absolute bottom-[clamp(2.6rem,6vh,5rem)] left-1/2 z-20 flex w-full max-w-[1600px] -translate-x-1/2 items-center justify-between px-[clamp(2.5rem,6vw,8rem)]"
      >
        <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold/75 md:text-xs">
          <span className="inline-block h-px w-9 bg-gold/55" />
          CASE 01 → 30 · 지금부터.
        </span>
      </motion.div>

      {/* ── 스크롤 큐 (다음 = 사례로 톤 전달) ── */}
      <motion.div
        style={{ opacity: cueO }}
        aria-hidden
        className="pointer-events-none absolute bottom-[clamp(1rem,2.6vh,2rem)] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-bone/40 md:text-[11px]">
          scroll
        </span>
        <span className="animate-scroll-cue text-gold/70 text-lg leading-none">↓</span>
      </motion.div>
    </div>
  );
}

/* ───────────────────────── 우측 비주얼 (검색창 → 채팅창 → 30 그리드) ───────────────────────── */
function HabitVisual({ p }: { p: MotionValue<number> }) {
  /* 비트1: 검색창(낡은 습관) — 등장 후 비트2에서 흐려짐(취소) */
  const searchO = useTransform(p, [0.06, 0.16, 0.5, 0.62], [0, 1, 1, 0.26]);
  const searchY = useTransform(p, [0.06, 0.18], [28, 0]);
  const strikeW = useTransform(p, [0.5, 0.64], ["0%", "100%"]);

  /* 비트2: 채팅창(새 습관) — 골드 강조 점등 */
  const chatO = useTransform(p, [0.4, 0.52], [0, 1]);
  const chatY = useTransform(p, [0.4, 0.54], [30, 0]);
  const chatGlow = useTransform(p, [0.5, 0.66], [0, 1]);
  const arrowO = useTransform(p, [0.46, 0.58], [0, 1]);

  /* 비트3: 30 사례 그리드 프리뷰 차오름 */
  const gridO = useTransform(p, [0.72, 0.84], [0, 1]);
  const gridY = useTransform(p, [0.72, 0.86], [34, 0]);

  return (
    <div className="relative w-full max-w-[560px]">
      {/* 낡은 습관: 검색창 (취소) */}
      <motion.div
        style={{ opacity: searchO, y: searchY }}
        className="relative overflow-hidden rounded-2xl border border-bone/12 bg-coal/55 px-[clamp(1.2rem,1.8vw,1.8rem)] py-[clamp(1rem,1.6vh,1.5rem)] backdrop-blur-sm"
      >
        <div className="mb-3 flex items-center gap-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-bone/40 md:text-[11px]">
            예전 습관
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember/70 md:text-[11px]">
            search engine
          </span>
        </div>
        <div className="relative flex items-center gap-3 rounded-full border border-bone/15 bg-bone/[0.04] px-4 py-3">
          <SearchIcon />
          <span className="font-mono text-[clamp(0.85rem,1.05vw,1.05rem)] text-bone/45">
            검색 결과를 일일이 찾아 헤맨다…
          </span>
          {/* 취소선 (scaleX 대신 width 보간) */}
          <motion.span
            aria-hidden
            style={{ width: strikeW }}
            className="absolute left-3 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-ember/70"
          />
        </div>
      </motion.div>

      {/* 전환 화살표 */}
      <motion.div
        style={{ opacity: arrowO }}
        aria-hidden
        className="my-[clamp(0.8rem,1.6vh,1.4rem)] flex justify-center"
      >
        <span className="font-display text-gold/80 text-2xl leading-none">↓</span>
      </motion.div>

      {/* 새 습관: 채팅창 (골드 강조) */}
      <motion.div
        style={{ opacity: chatO, y: chatY }}
        className="relative overflow-hidden rounded-2xl border border-gold/50 bg-coal/70 px-[clamp(1.2rem,1.8vw,1.8rem)] py-[clamp(1rem,1.6vh,1.5rem)] backdrop-blur-sm"
      >
        <motion.div
          aria-hidden
          style={{
            opacity: chatGlow,
            background: "radial-gradient(62% 72% at 50% 40%, rgba(232,181,75,0.16), transparent 72%)",
          }}
          className="pointer-events-none absolute -inset-4 rounded-3xl"
        />
        <div className="relative mb-3 flex items-center gap-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-bone/45 md:text-[11px]">
            진짜 습관
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold/75 md:text-[11px]">
            VS Code · chat
          </span>
        </div>
        <div className="relative flex items-center gap-3 rounded-full border border-gold/45 bg-gold/[0.08] px-4 py-3">
          <ChatIcon />
          <span className="whitespace-nowrap font-mono text-[clamp(0.85rem,1.05vw,1.05rem)] text-gold">
            이 폴더 좀 정리해줘 —
          </span>
          <span className="ml-0.5 inline-block h-[1.1em] w-[2px] animate-pulse-soft bg-gold" />
        </div>
        <p className="relative mt-3.5 text-[clamp(0.85rem,1.1vw,1.1rem)] leading-relaxed text-bone/60">
          한 줄이면, AI가 네 컴퓨터에서 직접 일한다.
        </p>
      </motion.div>

      {/* 30 사례 그리드 프리뷰 */}
      <motion.div
        style={{ opacity: gridO, y: gridY }}
        className="mt-[clamp(1.1rem,2vh,1.8rem)]"
      >
        <div className="mb-2.5 flex items-center gap-2.5">
          <span className="inline-block h-px w-7 bg-gold/45" />
          <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-bone/60 md:text-[11px]">
            30 cases · preview
          </span>
        </div>
        <div className="grid grid-cols-10 gap-[clamp(4px,0.5vw,7px)]">
          {Array.from({ length: 30 }).map((_, i) => (
            <Cell key={i} i={i} p={p} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* 30 그리드의 셀 — 결정적 stagger 로 순차 점등 */
function Cell({ i, p }: { i: number; p: MotionValue<number> }) {
  const at = 0.78 + (i % 10) * 0.004 + Math.floor(i / 10) * 0.012;
  const o = useTransform(p, [at, at + 0.06], [0.18, 1]);
  /* 결정적 골드 강조 셀(첫 셀 = CASE 01) */
  const gold = i === 0;
  return (
    <motion.span
      style={{ opacity: o }}
      className={`aspect-square rounded-[5px] border ${
        gold
          ? "border-gold/60 bg-gold/25 [box-shadow:0_0_14px_rgba(232,181,75,0.45)]"
          : "border-bone/12 bg-bone/[0.07]"
      }`}
    />
  );
}

/* ── 아이콘 (인라인 SVG) ── */
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <circle cx="11" cy="11" r="7" stroke="rgba(242,237,227,0.4)" strokeWidth="2" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="rgba(242,237,227,0.4)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path
        d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"
        stroke="rgba(232,181,75,0.9)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
