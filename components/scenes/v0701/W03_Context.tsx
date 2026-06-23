"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * W03 — 무기② 폴더 전체 맥락 (WHY · 두 개의 무기)
 * 16:9 풀스크린 대비 다이어그램 + Pin 스크롤 스테이지.
 * 좌(ember): 챗 창에 긴 문서 → "context limit — 잘림"으로 끊긴다.
 * 우(gold):  폴더 트리(48p.pdf 등) → 분할 화살표 → 요약 파일(summary.md/data.md). 에이전틱 분할읽기.
 * 카피 3비트는 progress 구간으로 순차 점등. 골드 강조 1개 원칙.
 */

const CHAT_LINES = ["92%", "84%", "96%", "78%", "88%"];
const SRC_FILES: { name: string; meta: string; at: number }[] = [
  { name: "48p_report.pdf", meta: "48p · 2.4MB", at: 0.58 },
  { name: "data_2025.xlsx", meta: "12 sheets", at: 0.61 },
  { name: "refs/", meta: "9 files", at: 0.64 },
];
const OUT_FILES: { name: string; at: number }[] = [{ name: "summary.md", at: 0.74 }, { name: "data.md", at: 0.78 }];

export default function W03Context() {
  return (
    <section data-scene="w03" data-act="WHY · 두 개의 무기" className="relative bg-ink text-bone">
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.34, 0.48]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  const b0o = useTransform(p, [0.04, 0.14], [0, 1]);
  const b0y = useTransform(p, [0.04, 0.16], [34, 0]);
  const b1o = useTransform(p, [0.18, 0.28], [0, 1]);
  const b1y = useTransform(p, [0.18, 0.30], [30, 0]);
  const b2o = useTransform(p, [0.50, 0.60], [0, 1]);
  const b2y = useTransform(p, [0.50, 0.62], [30, 0]);
  const leftO = useTransform(p, [0.20, 0.30], [0, 1]);
  const leftY = useTransform(p, [0.20, 0.32], [40, 0]);
  const rightO = useTransform(p, [0.50, 0.60], [0, 1]);
  const rightY = useTransform(p, [0.50, 0.62], [40, 0]);
  const goldGlow = useTransform(p, [0.56, 0.72], [0, 0.55]);
  const capO = useTransform(p, [0.86, 0.96], [0, 0.85]);
  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* 배경 글로우 (gold + 좌측 ember 보조) */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(54% 58% at 68% 44%, rgba(232,181,75,0.11), transparent 72%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(40% 48% at 24% 50%, rgba(255,75,46,0.07), transparent 70%)" }} />
      </motion.div>
      {/* 그리드 패럴랙스 */}
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
      {/* 콘텐츠: 좌 카피 / 우 대비 다이어그램 */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 content-center items-center gap-[clamp(2rem,5vw,5.5rem)] px-[clamp(2.5rem,6vw,8rem)] py-[7vh] lg:grid-cols-[0.86fr_1.14fr]">
        {/* 좌측: 카피 3비트 */}
        <div className="flex flex-col justify-center">
          <motion.div style={{ opacity: b0o, y: b0y }}>
            <Kicker>무기 ② — 폴더 전체 맥락</Kicker>
            <p className="mt-9 font-display font-bold leading-[1.34] text-bone/85 text-[clamp(1.5rem,2.6vw,2.6rem)]">
              챗 창은 — <span className="whitespace-nowrap text-ember">30페이지에서 잘린다.</span>
            </p>
          </motion.div>
          <motion.p
            style={{ opacity: b1o, y: b1y }}
            className="mt-[clamp(1.6rem,3.4vh,2.6rem)] font-display font-black leading-[1.24] text-bone text-[clamp(2rem,3.6vw,3.7rem)]"
          >
            VS Code는 —
            <br />
            <span className="whitespace-nowrap text-gold [text-shadow:0_0_38px_rgba(232,181,75,0.42)]">폴더를 통째로 준다.</span>
          </motion.p>
          <motion.p
            style={{ opacity: b2o, y: b2y }}
            className="mt-[clamp(1.6rem,3.4vh,2.8rem)] max-w-[560px] text-balance-k leading-relaxed text-bone/70 text-[clamp(1.05rem,1.5vw,1.55rem)]"
          >
            나눠 읽고, 요약해서, <span className="whitespace-nowrap text-bone/85">파일로 정리한다.</span>
          </motion.p>
        </div>
        {/* 우측: 대비 다이어그램 */}
        <div className="grid grid-cols-1 items-stretch gap-[clamp(1rem,1.6vw,1.8rem)] md:grid-cols-[1.05fr_auto_1.18fr]">
          <motion.div style={{ opacity: leftO, y: leftY }} className="flex">
            <ChatCutPanel p={p} />
          </motion.div>
          <div className="hidden items-center justify-center md:flex">
            <VsArrow p={p} />
          </div>
          <motion.div style={{ opacity: rightO, y: rightY }} className="relative flex">
            <motion.div
              aria-hidden
              style={{ opacity: goldGlow, background: "radial-gradient(62% 70% at 50% 42%, rgba(232,181,75,0.16), transparent 72%)" }}
              className="pointer-events-none absolute -inset-5 rounded-[2rem]"
            />
            <FolderSummaryPanel p={p} />
          </motion.div>
        </div>
      </div>
      {/* 하단 캡션(모노) */}
      <motion.div
        style={{ opacity: capO }}
        className="pointer-events-none absolute bottom-[clamp(1.6rem,4vh,3rem)] left-1/2 flex -translate-x-1/2 items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold/80 md:text-xs"
      >
        <span className="inline-block h-px w-9 bg-gold/55" />
        30페이지가, 안 잘린다.
      </motion.div>
    </div>
  );
}

/* 좌: 챗 창 — context limit 잘림 */
function ChatCutPanel({ p }: { p: MotionValue<number> }) {
  const linesO = useTransform(p, [0.30, 0.44], [0, 1]);
  const fadeMask = useTransform(p, [0.40, 0.50], [0, 1]);
  const warnO = useTransform(p, [0.44, 0.52], [0, 1]);
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-ember/30 bg-coal/70 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
      <div className="flex h-9 items-center gap-2 border-b border-bone/10 bg-[#100D13] px-3.5">
        <span className="h-2 w-2 rounded-full bg-ember/70" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40 md:text-[11px]">챗 창 — 붙여넣기</span>
        <span className="ml-auto font-mono text-[9px] tracking-[0.2em] text-haze md:text-[10px]">48p.pdf</span>
      </div>
      <div className="relative flex-1 px-3.5 py-3.5">
        <motion.div style={{ opacity: linesO }} className="space-y-2.5">
          {CHAT_LINES.map((w, i) => (
            <div key={i} className="flex items-center gap-2" style={{ opacity: i > 2 ? 0.4 : 1 }}>
              <span className="font-mono text-[8px] text-bone/25 md:text-[9px]">{String(i + 1).padStart(2, "0")}</span>
              <span className="h-[6px] rounded-full bg-bone/22 md:h-2" style={{ width: w }} />
            </div>
          ))}
        </motion.div>
        <motion.div aria-hidden style={{ opacity: fadeMask }} className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]">
          <div className="h-full w-full bg-gradient-to-t from-coal via-coal/85 to-transparent" />
        </motion.div>
      </div>
      <motion.div style={{ opacity: warnO }} className="flex items-center gap-2 border-t border-ember/30 bg-ember/[0.07] px-3 py-2.5">
        <span className="shrink-0 font-mono text-[12px] text-ember md:text-sm">&#9888;</span>
        <span className="font-mono text-[9px] leading-snug tracking-[0.04em] text-ember md:text-[11px]">context limit — 30페이지에서 잘림</span>
      </motion.div>
    </div>
  );
}

/* 중앙: 대비 화살표 (ember↔gold) */
function VsArrow({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [0.52, 0.62], [0, 1]);
  const len = useTransform(p, [0.54, 0.70], [0, 1]);
  return (
    <motion.div style={{ opacity: o }} className="flex w-[clamp(48px,4vw,72px)] flex-col items-center gap-2">
      <span className="font-display font-black leading-none text-bone/30 text-[clamp(0.85rem,1vw,1.05rem)]">VS</span>
      <svg viewBox="0 0 80 24" className="h-5 w-full" aria-hidden>
        <defs>
          <linearGradient id="w03arrow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,75,46,0.65)" /><stop offset="100%" stopColor="rgba(232,181,75,0.95)" />
          </linearGradient>
        </defs>
        <motion.path d="M4 12 H66" fill="none" stroke="url(#w03arrow)" strokeWidth={2.6} strokeLinecap="round" style={{ pathLength: len, filter: "drop-shadow(0 0 6px rgba(232,181,75,0.45))" }} />
        <motion.path d="M58 5 L70 12 L58 19" fill="none" stroke="rgba(232,181,75,0.95)" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" style={{ opacity: len }} />
      </svg>
    </motion.div>
  );
}

/* 우: 폴더 트리 → 분할 화살표 → 요약 산출물 */
function FolderSummaryPanel({ p }: { p: MotionValue<number> }) {
  const splitLen = useTransform(p, [0.68, 0.80], [0, 1]);
  const splitLabel = useTransform(p, [0.70, 0.80], [0, 1]);
  const doneO = useTransform(p, [0.80, 0.88], [0, 1]);
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-gold/45 bg-coal/80 shadow-[0_30px_90px_rgba(232,181,75,0.16)]">
      <div className="flex h-9 items-center gap-2 border-b border-bone/10 bg-[#100D13] px-3.5">
        <span className="h-2 w-2 rounded-full bg-gold/80" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45 md:text-[11px]">VS Code — 폴더 전체</span>
        <span className="ml-auto font-mono text-[9px] tracking-[0.2em] text-gold/60 md:text-[10px]">AGENTIC</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-[clamp(0.9rem,1.4vw,1.4rem)] py-[clamp(0.9rem,1.6vh,1.4rem)]">
        {/* 소스: 폴더 트리 */}
        <div className="rounded-xl border border-bone/12 bg-bone/[0.03] px-3 py-3">
          <div className="mb-2.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40 md:text-[11px]">
            <span>&#128193;</span> campaign/
          </div>
          <div className="space-y-2">
            {SRC_FILES.map((f) => (
              <SrcRow key={f.name} p={p} name={f.name} meta={f.meta} at={f.at} />
            ))}
          </div>
        </div>
        {/* 에이전틱 분할 화살표 (하나→둘) */}
        <div className="relative flex items-center justify-center py-0.5">
          <svg viewBox="0 0 200 34" className="h-[clamp(22px,2.4vh,34px)] w-[64%]" aria-hidden>
            <defs>
              <linearGradient id="w03split" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(232,181,75,0.9)" /><stop offset="100%" stopColor="rgba(255,211,122,0.55)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M100 2 V12 M100 12 C100 22, 60 18, 56 30 M100 12 C100 22, 140 18, 144 30"
              fill="none" stroke="url(#w03split)" strokeWidth={2.2} strokeLinecap="round"
              style={{ pathLength: splitLen, filter: "drop-shadow(0 0 5px rgba(232,181,75,0.4))" }}
            />
          </svg>
          <motion.span
            style={{ opacity: splitLabel }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-coal px-2 font-mono text-[8px] uppercase tracking-[0.22em] text-gold/75 md:text-[10px]"
          >
            나눠 읽기 · 요약
          </motion.span>
        </div>
        {/* 산출: 요약 파일 */}
        <div className="grid grid-cols-2 gap-2.5 [&>*]:min-w-0">
          {OUT_FILES.map((f) => (
            <OutCard key={f.name} p={p} name={f.name} at={f.at} />
          ))}
        </div>
        {/* 완료 라벨 */}
        <motion.div style={{ opacity: doneO }} className="mt-auto flex items-center gap-2 pt-1">
          <span className="font-mono text-[11px] text-gold md:text-[13px]">&#10003;</span>
          <span className="font-mono text-[9px] tracking-[0.12em] text-bone/55 md:text-[11px]">
            48p 전부 읽고 — <span className="text-gold">2개 파일로 정리됨</span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}
function SrcRow({ p, name, meta, at }: { p: MotionValue<number>; name: string; meta: string; at: number }) {
  const o = useTransform(p, [at, at + 0.04], [0, 1]);
  const x = useTransform(p, [at, at + 0.05], [-14, 0]);
  return (
    <motion.div style={{ opacity: o, x }} className="flex min-w-0 items-center gap-2.5">
      <span className="shrink-0 font-mono text-[11px] text-bone/30 md:text-[13px]">&#128196;</span>
      <span className="min-w-0 truncate whitespace-nowrap font-mono text-[clamp(0.72rem,0.92vw,0.95rem)]" style={{ color: "#C3E88D" }}>{name}</span>
      <span className="ml-auto shrink-0 whitespace-nowrap font-mono text-[9px] tracking-[0.06em] text-bone/60 md:text-[10px]">{meta}</span>
    </motion.div>
  );
}
function OutCard({ p, name, at }: { p: MotionValue<number>; name: string; at: number }) {
  const o = useTransform(p, [at, at + 0.05], [0, 1]);
  const s = useTransform(p, [at, at + 0.06], [0.86, 1]);
  return (
    <motion.div style={{ opacity: o, scale: s }} className="flex min-w-0 flex-col gap-1.5 rounded-xl border border-gold/40 bg-gold/[0.06] py-2.5 pl-2.5 pr-3">
      <div className="flex min-w-0 items-center gap-1.5">
        <span className="shrink-0 font-mono text-[11px] text-gold md:text-[13px]">&#128221;</span>
        <span className="min-w-0 truncate font-mono text-[clamp(0.7rem,0.85vw,0.9rem)] font-semibold text-gold">{name}</span>
      </div>
      <span className="block h-[5px] w-[88%] rounded-full bg-gold/30 md:h-1.5" />
      <span className="block h-[5px] w-[64%] rounded-full bg-bone/15 md:h-1.5" />
    </motion.div>
  );
}
