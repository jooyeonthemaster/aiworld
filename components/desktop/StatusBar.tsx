"use client";

import { motion } from "framer-motion";

/**
 * StatusBar — 윈도우 하단 상태바  [데스크탑]
 * ────────────────────────────────────────────────────────────────────
 * macOS Finder 하단 상태바 감각. 좌측은 항목 수(+선택된 파일명),
 * 우측은 줌 라벨 100% + 장식 줌 슬라이더(트랙 + 핸들).
 * 좌측 끝에 작은 골드 점으로 "동기화됨" 정적 신호를 준다.
 *
 * controlled 상태가 없는 순수 표시 바 — 슬라이더/줌은 장식이므로
 * 낮은 대비 + cursor-default 로 인터랙티브하지 않음을 표현한다.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export default function StatusBar({
  total,
  selectedName,
}: {
  total: number;
  selectedName: string | null;
}) {
  return (
    <div className="flex h-[34px] shrink-0 items-center border-t border-bone/8 bg-ink/20 px-4 font-mono text-[11px] text-bone/40">
      {/* ── 좌: 동기화 점 + 항목 수 (+ 선택 파일명) ── */}
      <div className="flex min-w-0 items-center gap-2">
        {/* 동기화됨 골드 점 */}
        <span className="relative flex h-1.5 w-1.5 shrink-0 items-center justify-center" aria-hidden>
          <span className="absolute inline-flex h-full w-full rounded-full bg-gold/70" />
          <span className="absolute inline-flex h-[5px] w-[5px] rounded-full bg-gold/15" />
        </span>

        <span className="shrink-0 tracking-[0.04em]">
          항목 <span className="tabular-nums text-bone/55">{total}</span>개
        </span>

        {selectedName && (
          <span className="flex min-w-0 items-center gap-2">
            <span className="shrink-0 text-bone/15" aria-hidden>
              ·
            </span>
            <motion.span
              key={selectedName}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="min-w-0 truncate text-bone/60"
              title={selectedName}
            >
              {selectedName}
            </motion.span>
            <span className="shrink-0 whitespace-nowrap text-bone/40">선택됨</span>
          </span>
        )}
      </div>

      {/* ── 우: 줌 라벨 + 장식 슬라이더 ── */}
      <div className="ml-auto flex shrink-0 cursor-default select-none items-center gap-3 text-bone/30">
        {/* 5칸 줌 막대 (현재 단계만 골드, 나머지는 음소거) */}
        <div className="flex items-end gap-[3px]" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`w-[3px] rounded-full ${i <= 3 ? "bg-bone/30" : "bg-bone/12"}`}
              style={{ height: `${5 + i * 2}px` }}
            />
          ))}
        </div>

        {/* 줌 라벨 */}
        <span className="tabular-nums tracking-[0.04em] text-bone/45">100%</span>

        {/* 장식 줌 슬라이더 (트랙 + 핸들) */}
        <div className="relative h-1 w-20 rounded-full bg-bone/10" aria-hidden>
          {/* 채워진 트랙 */}
          <div className="absolute inset-y-0 left-0 w-[72%] rounded-full bg-bone/25" />
          {/* 핸들 */}
          <div className="absolute left-[72%] top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bone/30 bg-coal shadow-[0_1px_3px_rgba(0,0,0,0.6)]" />
        </div>
      </div>
    </div>
  );
}
