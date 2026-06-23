"use client";

import { MotionValue, motion } from "framer-motion";

/**
 * ClickRing — 클릭 지점 강조(이 튜토리얼 덱의 핵심).
 * 부모(relative) 기준 x/y % 위치에 펄스하는 링 + 커서 점 + 라벨 칩 + 화살표.
 * o(MotionValue)로 스크롤 동기 등장. 부모는 반드시 position: relative.
 */
export default function ClickRing({
  x,
  y,
  label,
  dir = "right",
  tone = "gold",
  size = 40,
  o,
}: {
  x: number;
  y: number;
  label?: string;
  dir?: "up" | "down" | "left" | "right";
  tone?: "gold" | "ember";
  size?: number;
  o?: MotionValue<number>;
}) {
  const ring = tone === "gold" ? "border-gold" : "border-ember";
  const glow =
    tone === "gold"
      ? "0 0 24px rgba(232,181,75,0.6)"
      : "0 0 24px rgba(255,75,46,0.55)";
  const dot = tone === "gold" ? "bg-gold" : "bg-ember";
  const labelCls =
    tone === "gold"
      ? "border-gold/50 bg-gold/15 text-gold"
      : "border-ember/50 bg-ember/15 text-ember";

  // 라벨 위치(링 기준)
  const labelPos: Record<string, string> = {
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
    up: "bottom-full left-1/2 -translate-x-1/2 mb-3",
    down: "top-full left-1/2 -translate-x-1/2 mt-3",
  };

  return (
    <motion.div
      style={{ opacity: o, left: `${x}%`, top: `${y}%` }}
      className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* 펄스 링 */}
        <span
          className={`animate-pulse-soft absolute inset-0 rounded-full border-2 ${ring}`}
          style={{ boxShadow: glow }}
        />
        <span
          className={`absolute inset-0 rounded-full border ${ring} opacity-40`}
          style={{ transform: "scale(1.55)" }}
        />
        {/* 중심 점 */}
        <span className={`absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${dot}`} />
        {/* 커서 화살표 글리프 (우하단) */}
        <svg
          viewBox="0 0 24 24"
          className={`absolute -bottom-2 -right-2 h-5 w-5 ${tone === "gold" ? "text-gold" : "text-ember"}`}
          style={{ filter: `drop-shadow(${glow})` }}
          aria-hidden
        >
          <path d="M5 3l6 16 2.2-6.2L19 11z" fill="currentColor" stroke="#07060a" strokeWidth="1" strokeLinejoin="round" />
        </svg>
        {/* 라벨 칩 */}
        {label ? (
          <span
            className={`absolute whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] backdrop-blur-sm md:text-[11px] ${labelCls} ${labelPos[dir]}`}
          >
            {label}
          </span>
        ) : null}
      </div>
    </motion.div>
  );
}
