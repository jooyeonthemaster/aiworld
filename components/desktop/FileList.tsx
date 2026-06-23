"use client";

import { motion } from "framer-motion";
import type { Lecture, SortKey } from "@/lib/lectures";

/**
 * FileList — 리스트(테이블) 보기의 강의안 파일 목록
 * ────────────────────────────────────────────────────────────────────
 * macOS Finder의 리스트 뷰처럼: 정렬 가능한 헤더 + 행(이름/날짜/종류/씬/크기).
 * 클릭=선택(상세 패널 반영), 더블클릭=열기(라우트 진입).
 * status 가 scheduled/draft 면 더블클릭 열기를 막는다.
 *
 * 품질 기준선: components/desktop/FileCard.tsx 의 톤/정밀도에 맞춤.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/** 헤더/행 공용 그리드 템플릿 — 이름(가변) / 날짜 / 종류 / 씬 / 크기 */
const COLS = "grid-cols-[minmax(0,1fr)_120px_90px_70px_90px]";

export default function FileList({
  lectures,
  selectedId,
  onSelect,
  onOpen,
  sort,
  onSort,
}: {
  lectures: Lecture[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onOpen: (route: string) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
}) {
  return (
    <div className="flex h-full flex-col">
      {/* ── 헤더 행 ── */}
      <div
        className={`grid ${COLS} items-center gap-4 border-b border-bone/8 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-haze`}
      >
        <SortHeader label="이름" col="name" active={sort} onSort={onSort} />
        <SortHeader label="날짜" col="date" active={sort} onSort={onSort} />
        <span className="select-none">종류</span>
        <SortHeader
          label="씬"
          col="scenes"
          active={sort}
          onSort={onSort}
          className="justify-end"
        />
        <span className="select-none text-right">크기</span>
      </div>

      {/* ── 본문(스크롤) ── */}
      <div
        data-lenis-prevent
        className="flex-1 overflow-y-auto overflow-x-hidden"
      >
        {lectures.length === 0 ? (
          <div className="flex h-full min-h-[180px] items-center justify-center px-6 text-center">
            <p className="font-mono text-[12px] tracking-[0.04em] text-bone/35">
              표시할 강의안이 없습니다.
            </p>
          </div>
        ) : (
          lectures.map((lecture, index) => (
            <Row
              key={lecture.id}
              lecture={lecture}
              index={index}
              selected={selectedId === lecture.id}
              onSelect={onSelect}
              onOpen={onOpen}
            />
          ))
        )}
      </div>
    </div>
  );
}

/* ── 정렬 가능한 헤더 셀 ── */
function SortHeader({
  label,
  col,
  active,
  onSort,
  className = "",
}: {
  label: string;
  col: SortKey;
  active: SortKey;
  onSort: (s: SortKey) => void;
  className?: string;
}) {
  const isActive = active === col;
  return (
    <button
      type="button"
      onClick={() => onSort(col)}
      className={`group flex items-center gap-1.5 select-none outline-none transition-colors duration-150 ${
        isActive ? "text-gold" : "text-haze hover:text-bone/70"
      } ${className}`}
    >
      <span className="truncate uppercase tracking-[0.18em]">{label}</span>
      <CaretDown
        className={`h-2.5 w-2.5 shrink-0 transition-opacity duration-150 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
        }`}
      />
    </button>
  );
}

/* ── 데이터 행 ── */
function Row({
  lecture,
  index,
  selected,
  onSelect,
  onOpen,
}: {
  lecture: Lecture;
  index: number;
  selected: boolean;
  onSelect: (id: string) => void;
  onOpen: (route: string) => void;
}) {
  const locked = lecture.status === "scheduled" || lecture.status === "draft";

  return (
    <motion.div
      role="row"
      aria-selected={selected}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE, delay: Math.min(index * 0.03, 0.3) }}
      onClick={() => onSelect(lecture.id)}
      onDoubleClick={() => !locked && onOpen(lecture.route)}
      className={`relative grid ${COLS} cursor-pointer items-center gap-4 border-l-2 px-4 py-2.5 transition-colors duration-150 ${
        selected
          ? "border-gold bg-gold/10"
          : "border-transparent hover:bg-bone/5"
      }`}
    >
      {/* 이름 */}
      <div className="flex min-w-0 items-center gap-2.5">
        <DeckGlyph className="h-4 w-4 shrink-0 text-gold/70" />
        <div className="min-w-0">
          <p className="truncate font-body text-[13.5px] font-medium leading-tight text-bone">
            {lecture.fileName}
            <span className="font-mono text-[12px] font-normal text-haze">
              .{lecture.ext}
            </span>
          </p>
          <p className="truncate font-mono text-[11px] leading-tight text-bone/35">
            {lecture.series}
          </p>
        </div>
      </div>

      {/* 날짜 */}
      <span className="truncate font-mono text-[12px] tracking-[0.02em] text-bone/55">
        {lecture.dateLabel}
      </span>

      {/* 종류 */}
      <span className="truncate text-[12px] text-bone/55">키노트</span>

      {/* 씬 */}
      <span className="text-right font-mono text-[12px] tabular-nums text-bone/55">
        {lecture.scenes}
      </span>

      {/* 크기 */}
      <span className="text-right font-mono text-[12px] tabular-nums text-bone/45">
        {lecture.sizeLabel}
      </span>
    </motion.div>
  );
}

/* ── 인라인 아이콘(의존성 없음) ── */
function DeckGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="13" rx="1.6" />
      <path d="M8 21h8M12 17v4" strokeLinecap="round" />
    </svg>
  );
}

function CaretDown({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
