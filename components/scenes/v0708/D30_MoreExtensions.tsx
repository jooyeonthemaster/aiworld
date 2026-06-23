"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * D30 — 추천 확장 모음  [kind=선언/정보 / 독립 선언형 Pin 씬]
 * TutorialScene 아님. N06/N07 패턴: <section data-scene data-act> + Pin + Stage(글로우+그리드 + content-center).
 * 16:9 가로를 채우는 확장 카드 그리드(2×3). 각 카드 = 검색어 + 용도, 스크롤로 순차 점등.
 * 골드 강조 1개 원칙: 각 카드의 [검색어] 칩(=실제로 검색창에 칠 단어)만 골드.
 */

type Ext = { n: string; search: string; use: string; icon: IconKind };
type IconKind = "file" | "lens" | "spell" | "path" | "tag" | "indent";

const EXTS: Ext[] = [
  { n: "Material Icon Theme", search: "Material Icon Theme", use: "파일 아이콘을 예쁘게 — 폴더·파일이 한눈에", icon: "file" },
  { n: "Error Lens", search: "Error Lens", use: "에러를 코드 바로 옆에 빨갛게 표시", icon: "lens" },
  { n: "Code Spell Checker", search: "Code Spell Checker", use: "영어 오타를 밑줄로 잡아줌", icon: "spell" },
  { n: "Path Intellisense", search: "Path Intellisense", use: "파일 경로를 자동완성", icon: "path" },
  { n: "Auto Rename Tag", search: "Auto Rename Tag", use: "여는/닫는 태그를 같이 자동 수정", icon: "tag" },
  { n: "indent-rainbow", search: "indent-rainbow", use: "들여쓰기를 색으로 구분", icon: "indent" },
];

export default function D30MoreExtensions() {
  return (
    <section
      data-scene="d30"
      data-act="확장 · 도구 장착"
      className="relative bg-ink text-bone"
    >
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.36, 0.46]);
  const gridShift = useTransform(p, [0, 1], [0, -38]);

  /* ── 리드 ── */
  const kickO = useTransform(p, [0.02, 0.1], [0, 1]);
  const kickY = useTransform(p, [0.02, 0.12], [30, 0]);
  const headO = useTransform(p, [0.05, 0.15], [0, 1]);
  const headY = useTransform(p, [0.05, 0.17], [38, 0]);
  const leadO = useTransform(p, [0.12, 0.22], [0, 1]);
  const leadY = useTransform(p, [0.12, 0.24], [26, 0]);

  /* ── 마무리 메타 ── */
  const tailO = useTransform(p, [0.82, 0.92], [0, 1]);
  const tailY = useTransform(p, [0.82, 0.94], [24, 0]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(54% 56% at 50% 42%, rgba(232,181,75,0.10), transparent 72%)" }}
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

      {/* ── 콘텐츠 (content-center 로 단일 컬럼 수직 중앙) ── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col content-center justify-center gap-[clamp(2rem,4.5vh,4rem)] px-[clamp(2.5rem,6vw,8rem)] py-[7vh]">
        {/* ── 헤더 ── */}
        <header className="flex flex-col gap-5">
          <motion.div style={{ opacity: kickO, y: kickY }}>
            <Kicker>확장 · 도구 장착</Kicker>
          </motion.div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <motion.h2
              style={{ opacity: headO, y: headY }}
              className="font-display font-black leading-[1.12] text-bone text-[clamp(2.2rem,4.4vw,4.4rem)]"
            >
              추천 확장 모음
            </motion.h2>
            <motion.p
              style={{ opacity: leadO, y: leadY }}
              className="max-w-[640px] leading-relaxed text-bone/70 text-[clamp(1.05rem,1.5vw,1.6rem)]"
            >
              있으면 편한 확장들 —{" "}
              <span className="whitespace-nowrap text-bone/90">검색해서</span>{" "}
              <span className="whitespace-nowrap font-mono text-gold [text-shadow:0_0_30px_rgba(232,181,75,0.4)]">
                [설치]
              </span>
              만 누르면 끝.
            </motion.p>
          </div>
        </header>

        {/* ── 확장 카드 그리드 (2×3 → 16:9 가로 채움) ── */}
        <div className="grid grid-cols-1 gap-[clamp(0.9rem,1.4vw,1.6rem)] sm:grid-cols-2 lg:grid-cols-3">
          {EXTS.map((e, i) => (
            <ExtCard key={e.n} ext={e} index={i} p={p} />
          ))}
        </div>

        {/* ── 마무리 ── */}
        <motion.p
          style={{ opacity: tailO, y: tailY }}
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-bone/45 md:text-xs"
        >
          <span className="inline-block h-px w-9 bg-gold/55" />
          확장 패널(좌측 네모 4개 아이콘) → 검색창에 이름 입력 → 파란 설치
        </motion.p>
      </div>
    </div>
  );
}

/* ───────────────────────── 확장 카드 ───────────────────────── */
function ExtCard({ ext, index, p }: { ext: Ext; index: number; p: MotionValue<number> }) {
  /* 카드 순차 점등: 0.24 부터 0.07 간격 stagger */
  const at = 0.24 + index * 0.07;
  const o = useTransform(p, [at, at + 0.1], [0, 1]);
  const y = useTransform(p, [at, at + 0.12], [42, 0]);
  /* 검색어 칩 글로우는 한 박자 늦게 */
  const chipGlow = useTransform(p, [at + 0.05, at + 0.16], [0, 1]);

  return (
    <motion.div
      style={{ opacity: o, y }}
      className="group relative flex flex-col rounded-2xl border border-bone/12 bg-coal/70 px-[clamp(1.3rem,1.7vw,2rem)] py-[clamp(1.4rem,2vh,2rem)] backdrop-blur-sm"
    >
      {/* 헤더: 아이콘 + 이름 */}
      <div className="flex items-center gap-3.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/[0.08] text-gold">
          <ExtIcon kind={ext.icon} />
        </div>
        <h3 className="min-w-0 flex-1 font-display font-bold leading-tight text-bone text-[clamp(1.15rem,1.5vw,1.6rem)]">
          {ext.n}
        </h3>
      </div>

      {/* 용도 */}
      <p className="mt-5 leading-relaxed text-bone/65 text-[clamp(0.95rem,1.2vw,1.25rem)]">
        {ext.use}
      </p>

      {/* 검색어 칩 (골드 강조 = 실제로 검색창에 칠 단어) */}
      <div className="relative mt-auto pt-6">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.26em] text-bone/35 md:text-[11px]">
          검색어
        </span>
        <div className="relative inline-flex max-w-full items-center gap-2 rounded-lg border border-gold/45 bg-gold/[0.08] px-3.5 py-2">
          <motion.span
            aria-hidden
            style={{ opacity: chipGlow }}
            className="pointer-events-none absolute -inset-2 rounded-xl"
          >
            <span
              className="block h-full w-full rounded-xl"
              style={{ background: "radial-gradient(60% 70% at 30% 50%, rgba(232,181,75,0.16), transparent 72%)" }}
            />
          </motion.span>
          <svg viewBox="0 0 24 24" className="relative h-4 w-4 shrink-0 text-gold/80" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <span className="relative truncate font-mono text-gold text-[clamp(0.85rem,1.05vw,1.1rem)]">
            {ext.search}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────────────────── 확장별 아이콘 ───────────────────────── */
function ExtIcon({ kind }: { kind: IconKind }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-6 w-6",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (kind) {
    case "file":
      return (
        <svg {...common}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5" />
        </svg>
      );
    case "lens":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v5" />
          <circle cx="12" cy="16.5" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "spell":
      return (
        <svg {...common}>
          <path d="M4 17l4.5-11 4.5 11" />
          <path d="M5.6 13h5.8" />
          <path d="M15 16l2 2 4-4" />
        </svg>
      );
    case "path":
      return (
        <svg {...common}>
          <path d="M3 7h6l2 2h10" />
          <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9" />
        </svg>
      );
    case "tag":
      return (
        <svg {...common}>
          <path d="M9 7L4 12l5 5" />
          <path d="M15 7l5 5-5 5" />
        </svg>
      );
    case "indent":
      return (
        <svg {...common}>
          <path d="M4 6h16" />
          <path d="M9 12h11" />
          <path d="M9 18h11" />
          <path d="M4 10v4l3-2z" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}
