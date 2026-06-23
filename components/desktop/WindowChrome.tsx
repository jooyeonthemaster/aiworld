"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * WindowChrome — 파인더 윈도우 프레임 + 타이틀바  [STUDIO OS]
 * ────────────────────────────────────────────────────────────────────
 * 데스크탑 위에 떠 있는 macOS Finder 급 유리 패널.
 * 둥근 모서리 · 얇은 본 보더 · 큰 시네마틱 그림자 · backdrop-blur.
 * 상단 TitleBar(신호등 / 중앙 타이틀 / 창 컨트롤 글리프) 아래로
 * children(Toolbar + 본문 + StatusBar)을 flex-1 로 채운다.
 *
 * 창 컨트롤·신호등은 장식이다(실동작 없음) — 낮은 대비로 장식임을 표현.
 * FileCard.tsx 의 톤/정밀도에 맞춘다.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

// 신호등 색 — jade(#46B17B)는 토큰이 아니라 인라인 값으로.
const TRAFFIC = [
  { key: "close", color: "#FF4B2E" }, // ember
  { key: "minimize", color: "#E8B54B" }, // gold
  { key: "expand", color: "#46B17B" }, // jade
] as const;

export default function WindowChrome({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.985, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex h-full w-full flex-col overflow-hidden rounded-[14px] border border-bone/10 bg-coal/80 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl"
    >
      {/* ── 타이틀바 ── */}
      <header className="relative flex h-[46px] shrink-0 items-center border-b border-bone/[0.08] px-4">
        {/* 좌: 신호등 */}
        <div className="group/lights flex items-center gap-2">
          {TRAFFIC.map((light) => (
            <span
              key={light.key}
              aria-hidden
              className="h-[11px] w-[11px] rounded-full opacity-90 transition-opacity duration-200 group-hover/lights:opacity-100"
              style={{
                backgroundColor: light.color,
                boxShadow:
                  "inset 0 1px 1px rgba(255,255,255,0.28), inset 0 -1px 1px rgba(0,0,0,0.35)",
              }}
            />
          ))}
        </div>

        {/* 중앙: 폴더 글리프 + 타이틀 */}
        <div className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
          <FolderGlyph className="h-[15px] w-[15px] text-gold/70" />
          <span className="whitespace-nowrap font-body text-[13px] tracking-wide text-bone/70">
            {title}
          </span>
        </div>

        {/* 우: 창 컨트롤 글리프(장식) */}
        <div className="ml-auto flex cursor-default items-center gap-3 text-bone/25">
          <MinimizeGlyph className="h-[14px] w-[14px] transition-colors duration-200 hover:text-bone/50" />
          <ExpandGlyph className="h-[13px] w-[13px] transition-colors duration-200 hover:text-bone/50" />
          <CloseGlyph className="h-[13px] w-[13px] transition-colors duration-200 hover:text-bone/50" />
        </div>
      </header>

      {/* ── 본문(Toolbar + body + StatusBar) ── */}
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </motion.section>
  );
}

/* ── 인라인 글리프(의존성 없음) ── */
function FolderGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h4l2 2.2H19.5A1.5 1.5 0 0 1 21 9.7v8A1.5 1.5 0 0 1 19.5 19.2h-15A1.5 1.5 0 0 1 3 17.7V7.5z" />
    </svg>
  );
}

function MinimizeGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function ExpandGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="5" y="5" width="14" height="14" rx="2" />
    </svg>
  );
}

function CloseGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
