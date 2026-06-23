"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * MenuBar — 화면 최상단 OS 메뉴바  [STUDIO OS]
 * ────────────────────────────────────────────────────────────────────
 * 가로 풀폭, h-9(≈36px)의 시스템 바.
 *   좌측: ◆ 골드 다이아몬드 + NEANDER STUDIO(브랜드) + 구분선 + "강의안 아카이브".
 *   우측: 라이브 시계 HH:MM(24h) · 날짜 · 연결됨 상태점.
 *
 * 라이브 시계는 useEffect+setInterval(1000ms)로만 갱신한다.
 * 초기 state는 빈 문자열 → SSR/hydration 안전(서버·클라 첫 렌더 일치).
 * 렌더 중 Date 호출 없음. 언마운트 시 interval cleanup.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export default function MenuBar() {
  // SSR/hydration 안전: 초기값 빈 문자열, 클라이언트에서만 채운다.
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(`${pad(now.getHours())}:${pad(now.getMinutes())}`);
    };
    tick(); // 마운트 직후 1회 즉시 표시(빈 문자열 깜빡임 최소화)
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative z-50 flex h-9 w-full shrink-0 select-none items-center border-b border-bone/8 bg-ink/40 px-5 backdrop-blur-sm"
    >
      {/* ── 좌측: 브랜드 ── */}
      <div className="flex items-center gap-2.5">
        <span className="relative flex items-center justify-center">
          <DiamondGlyph className="h-3 w-3 text-gold" />
          {/* 다이아몬드 옆 미세 골드 점(라이브 신호 느낌) */}
          <span className="ml-2 h-1 w-1 rounded-full bg-gold/70 shadow-[0_0_6px_rgba(232,181,75,0.8)]" />
        </span>

        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-bone">
          NEANDER&nbsp;STUDIO
        </span>

        {/* 얇은 구분선 */}
        <span aria-hidden className="mx-1 h-3 w-px bg-bone/12" />

        <span className="font-mono text-[11px] tracking-[0.12em] text-bone/45">
          강의안 아카이브
        </span>
      </div>

      {/* ── 우측: 상태 + 라이브 시계 ── */}
      <div className="ml-auto flex items-center gap-3">
        {/* 연결됨 상태(OS 바다운 디테일) */}
        <span className="hidden items-center gap-1.5 sm:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-[#46B17B]/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#46B17B]" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">
            연결됨
          </span>
        </span>

        <span aria-hidden className="mx-0.5 h-3 w-px bg-bone/12" />

        {/* 라이브 시계 HH:MM */}
        <time
          aria-label="현재 시각"
          className="font-mono text-[12px] tabular-nums tracking-[0.12em] text-bone/80"
          // 빈 문자열일 때 레이아웃 폭 유지(시계 자리 떨림 방지)
          style={{ minWidth: "3.4ch", textAlign: "right" }}
        >
          {clock || "--:--"}
        </time>

        <span aria-hidden className="text-bone/20">
          ·
        </span>

        <span className="font-mono text-[12px] tracking-[0.08em] text-bone/45">
          2026.06.24
        </span>
      </div>
    </motion.header>
  );
}

/* ── 인라인 아이콘(외부 의존성 없음) ── */
function DiamondGlyph({ className = "" }: { className?: string }) {
  // 작은 회전 사각형 = 다이아몬드. 골드 채움 + 내부 음각으로 정밀한 글리프.
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect
        x="6"
        y="6"
        width="12"
        height="12"
        rx="1.6"
        transform="rotate(45 12 12)"
        fill="currentColor"
      />
      <rect
        x="9.2"
        y="9.2"
        width="5.6"
        height="5.6"
        rx="0.8"
        transform="rotate(45 12 12)"
        fill="#07060a"
        fillOpacity="0.55"
      />
    </svg>
  );
}
