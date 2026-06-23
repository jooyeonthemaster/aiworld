"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Lecture } from "@/lib/lectures";
import { STATUS_META } from "@/lib/lectures";

/**
 * DetailPane — 우측 상세/미리보기 패널  [데스크탑 파일 관리자]
 * ────────────────────────────────────────────────────────────────────
 * 선택된 강의안의 큰 커버(16:9) + 제목/부제/요약 + 메타 테이블 + 태그 칩,
 * 하단 고정 "열기" CTA(골드). 선택이 없으면 차분한 빈 상태 안내.
 * 선택 전환은 AnimatePresence(mode="wait") 로 페이드/슬라이드.
 *
 * controlled: onOpen(route) 로 라우트 진입 신호를 부모에게 위임.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export default function DetailPane({
  lecture,
  onOpen,
}: {
  lecture: Lecture | null;
  onOpen: (route: string) => void;
}) {
  return (
    <aside className="flex h-full w-[320px] shrink-0 flex-col border-l border-bone/8 bg-ink/30">
      <AnimatePresence mode="wait">
        {lecture === null ? (
          <EmptyState key="empty" />
        ) : (
          <Detail key={lecture.id} lecture={lecture} onOpen={onOpen} />
        )}
      </AnimatePresence>
    </aside>
  );
}

/* ───────────────────────── 빈 상태 ───────────────────────── */

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center"
    >
      <FileGlyph className="h-16 w-16 text-bone/15" />
      <div className="flex flex-col gap-1.5">
        <p className="font-body text-sm text-bone/40">파일을 선택하세요</p>
        <p className="font-mono text-[11px] tracking-[0.04em] text-bone/25">
          더블클릭하면 강의안이 열립니다
        </p>
      </div>
    </motion.div>
  );
}

/* ───────────────────────── 상세 ───────────────────────── */

function Detail({
  lecture,
  onOpen,
}: {
  lecture: Lecture;
  onOpen: (route: string) => void;
}) {
  const status = STATUS_META[lecture.status];
  const locked = lecture.status === "scheduled" || lecture.status === "draft";

  const toneClass =
    status.tone === "gold"
      ? "bg-gold"
      : status.tone === "bone"
      ? "bg-bone/70"
      : "bg-haze";

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "회차", value: lecture.series },
    { label: "날짜", value: lecture.dateLabel },
    { label: "대상", value: lecture.audience },
    { label: "씬", value: `${lecture.scenes}개` },
    { label: "시간", value: `${lecture.durationMin}분` },
    { label: "용량", value: lecture.sizeLabel },
    {
      label: "상태",
      value: (
        <span className="inline-flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${toneClass}`} />
          {status.label}
        </span>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.32, ease: EASE }}
      className="flex h-full min-h-0 flex-col"
    >
      {/* ── 스크롤 본문 ── */}
      <div
        data-lenis-prevent
        className="flex flex-1 flex-col gap-5 overflow-y-auto p-5"
      >
        {/* 커버 (16:9) */}
        <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl border border-bone/10">
          {lecture.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={lecture.thumbnail}
              alt={`${lecture.title} 커버`}
              className="h-full w-full object-cover"
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
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-coal/80 via-coal/15 to-transparent" />
        </div>

        {/* 제목 블록 */}
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[11px] tracking-[0.02em] text-haze">
            {lecture.fileName}
            <span className="text-haze/70">.{lecture.ext}</span>
          </p>
          <h2 className="font-display text-[1.5rem] font-bold leading-tight text-bone">
            {lecture.title}
          </h2>
          <p className="font-body text-sm text-bone/55">{lecture.subtitle}</p>
          <p className="font-body text-[13px] leading-relaxed text-bone/50">
            {lecture.summary}
          </p>
        </div>

        {/* 메타 테이블 */}
        <div className="divide-y divide-bone/6 rounded-xl border border-bone/8 bg-coal/40">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-3 px-3.5 py-2.5"
            >
              <span className="shrink-0 font-mono text-[11px] tracking-[0.02em] text-haze">
                {row.label}
              </span>
              <span className="text-right font-body text-[13px] text-bone/75">
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* 태그 칩 */}
        {lecture.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {lecture.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-bone/12 bg-bone/5 px-2.5 py-1 font-mono text-[11px] tracking-[0.02em] text-bone/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── 하단 고정 CTA ── */}
      <div className="shrink-0 border-t border-bone/8 p-4">
        <button
          type="button"
          disabled={locked}
          onClick={() => {
            if (!locked) onOpen(lecture.route);
          }}
          className={`w-full rounded-lg py-2.5 font-body text-sm font-semibold text-ink transition-colors duration-200 ${
            locked
              ? "cursor-not-allowed bg-gold opacity-50"
              : "bg-gold hover:bg-gold-bright"
          }`}
        >
          {locked ? "준비 중" : "열기"}
        </button>
      </div>
    </motion.div>
  );
}

/* ── 인라인 아이콘(의존성 없음) ── */
function FileGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5L13.5 3z" />
      <path d="M13.5 3v5.5H19" />
    </svg>
  );
}
