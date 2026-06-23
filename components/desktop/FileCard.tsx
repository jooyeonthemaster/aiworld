"use client";

import { motion } from "framer-motion";
import type { Lecture } from "@/lib/lectures";
import { STATUS_META } from "@/lib/lectures";

/**
 * FileCard — 그리드 보기의 강의안 파일 카드  [데스크탑 견본 / REFERENCE]
 * ────────────────────────────────────────────────────────────────────
 * 미디어 라이브러리형 카드: 16:9 커버 썸네일 + 파일명 + 메타.
 * 클릭=선택(상세 패널 반영), 더블클릭/Enter=열기(라우트 진입).
 * thumbnail 없으면 accent 그라디언트 + 글리프로 폴백(미래 강의안 대비).
 *
 * 이 파일이 데스크탑 컴포넌트의 품질 기준선이다 — 팬아웃은 이 톤에 맞춘다.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export default function FileCard({
  lecture,
  selected,
  index,
  onSelect,
  onOpen,
}: {
  lecture: Lecture;
  selected: boolean;
  index: number;
  onSelect: (id: string) => void;
  onOpen: (route: string) => void;
}) {
  const status = STATUS_META[lecture.status];
  const locked = lecture.status === "scheduled" || lecture.status === "draft";

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE, delay: Math.min(index * 0.045, 0.4) }}
      whileHover={{ y: -4 }}
      onClick={() => onSelect(lecture.id)}
      onDoubleClick={() => !locked && onOpen(lecture.route)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !locked) onOpen(lecture.route);
      }}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-coal/60 text-left outline-none transition-colors duration-200 ${
        selected
          ? "border-gold/70"
          : "border-bone/10 hover:border-bone/25 focus-visible:border-gold/60"
      }`}
    >
      {/* 선택 글로우 */}
      {selected && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl"
          style={{ boxShadow: "0 0 0 1px rgba(232,181,75,0.55), 0 18px 50px -20px rgba(232,181,75,0.45)" }}
        />
      )}

      {/* ── 커버 (16:9) ── */}
      <div className="relative aspect-video w-full overflow-hidden">
        {lecture.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={lecture.thumbnail}
            alt={`${lecture.title} 커버`}
            className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
            draggable={false}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: `radial-gradient(120% 120% at 30% 0%, ${lecture.accent}33, transparent 60%), linear-gradient(150deg, #15111a, #0a0810)`,
            }}
          >
            <span
              className="font-display text-[3.4rem] font-black leading-none"
              style={{ color: lecture.accent, opacity: 0.85 }}
            >
              {lecture.title.slice(0, 1)}
            </span>
          </div>
        )}

        {/* 하단 스크림 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-coal/90 via-coal/20 to-transparent" />

        {/* 상태 칩 */}
        <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full border border-bone/15 bg-ink/55 px-2.5 py-1 backdrop-blur-sm">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              status.tone === "gold" ? "bg-gold" : status.tone === "bone" ? "bg-bone/70" : "bg-haze"
            }`}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/70">
            {status.label}
          </span>
        </div>

        {/* 즐겨찾기 별 */}
        {lecture.pinned && (
          <div className="absolute right-2.5 top-2.5 text-gold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            <StarIcon className="h-4 w-4" />
          </div>
        )}

        {/* 더블클릭 열기 힌트 */}
        {!locked && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span className="rounded-full border border-gold/40 bg-ink/65 px-4 py-1.5 font-mono text-[11px] tracking-[0.2em] text-gold-bright backdrop-blur-sm">
              더블클릭 · 열기
            </span>
          </div>
        )}
      </div>

      {/* ── 메타 ── */}
      <div className="relative flex flex-1 flex-col gap-1.5 px-3.5 pb-3.5 pt-3">
        <div className="flex items-center gap-2">
          <DeckGlyph className="h-4 w-4 shrink-0 text-gold/80" />
          <h3 className="truncate font-body text-[15px] font-semibold text-bone">
            {lecture.fileName}
            <span className="ml-1 font-mono text-[11px] font-normal text-haze">.{lecture.ext}</span>
          </h3>
        </div>
        <div className="flex items-center gap-2 pl-6 font-mono text-[11px] tracking-[0.02em] text-bone/45">
          <span>{lecture.series}</span>
          <span className="text-bone/20">·</span>
          <span>{lecture.dateLabel}</span>
        </div>
      </div>

      {/* 선택 체크 */}
      {selected && (
        <div className="absolute right-2.5 bottom-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-ink">
          <CheckIcon className="h-3 w-3" />
        </div>
      )}
    </motion.div>
  );
}

/* ── 인라인 아이콘(의존성 없음) ── */
function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.3l6.5-.9L12 2.5z" />
    </svg>
  );
}
function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}
function DeckGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden>
      <rect x="3" y="4" width="18" height="13" rx="1.6" />
      <path d="M8 21h8M12 17v4" strokeLinecap="round" />
    </svg>
  );
}
