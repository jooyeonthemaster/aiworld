"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ViewMode } from "@/components/desktop/types";
import type { SortKey } from "@/lib/lectures";

/**
 * Toolbar — 윈도우 툴바(TitleBar 아래)  [STUDIO OS]
 * ────────────────────────────────────────────────────────────────────
 * 좌: 뒤/앞 chevron(장식) + 브레드크럼.
 * 우: 그리드/리스트 세그먼트 토글 · 정렬 드롭다운(이름/날짜/씬) · 검색 인풋.
 * 전부 controlled — 콜백(onView/onSort/onQuery)을 실제로 호출한다.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "name", label: "이름" },
  { key: "date", label: "날짜" },
  { key: "scenes", label: "씬" },
];

export default function Toolbar({
  view,
  onView,
  sort,
  onSort,
  query,
  onQuery,
  crumb,
}: {
  view: ViewMode;
  onView: (v: ViewMode) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
  query: string;
  onQuery: (q: string) => void;
  crumb: string;
}) {
  const [open, setOpen] = useState(false);

  // 브레드크럼: "/" 를 흐린 구분자로 렌더 (한국어 줄바꿈 안티패턴 회피 — nowrap)
  const segments = crumb.split("/").map((s) => s.trim());
  const sortLabel =
    SORT_OPTIONS.find((o) => o.key === sort)?.label ?? "정렬";

  return (
    <div className="flex h-[54px] shrink-0 items-center gap-3 border-b border-bone/8 px-4">
      {/* ── 좌측: 내비 chevron(장식) + 브레드크럼 ── */}
      <div className="flex shrink-0 items-center gap-0.5">
        <span
          aria-hidden
          className="flex h-7 w-7 cursor-default items-center justify-center rounded-md text-bone/20"
        >
          <ChevronIcon className="h-4 w-4" dir="left" />
        </span>
        <span
          aria-hidden
          className="flex h-7 w-7 cursor-default items-center justify-center rounded-md text-bone/20"
        >
          <ChevronIcon className="h-4 w-4" dir="right" />
        </span>
      </div>

      <nav
        aria-label="현재 위치"
        className="flex min-w-0 items-center gap-1.5 whitespace-nowrap font-mono text-[12px] text-bone/55"
      >
        {segments.map((seg, i) => (
          <span key={`${seg}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-bone/25">/</span>}
            <span className={i === segments.length - 1 ? "text-bone/70" : ""}>
              {seg}
            </span>
          </span>
        ))}
      </nav>

      {/* ── 우측 컨트롤 ── */}
      <div className="ml-auto flex shrink-0 items-center gap-2">
        {/* 보기 토글: 세그먼트 컨트롤 */}
        <div
          role="group"
          aria-label="보기 모드"
          className="flex items-center gap-0.5 rounded-lg bg-bone/5 p-0.5"
        >
          <ViewButton
            active={view === "grid"}
            label="그리드 보기"
            onClick={() => onView("grid")}
          >
            <GridIcon className="h-[15px] w-[15px]" />
          </ViewButton>
          <ViewButton
            active={view === "list"}
            label="리스트 보기"
            onClick={() => onView("list")}
          >
            <ListIcon className="h-[15px] w-[15px]" />
          </ViewButton>
        </div>

        {/* 정렬 드롭다운 */}
        <div className="relative">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono text-[11px] tracking-[0.04em] transition-colors duration-200 ${
              open
                ? "border-gold/40 bg-bone/10 text-gold"
                : "border-bone/10 bg-bone/5 text-bone/55 hover:text-bone/80"
            }`}
          >
            <SortGlyph className="h-3.5 w-3.5 opacity-80" />
            <span>{sortLabel}</span>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="flex"
            >
              <ChevronIcon className="h-3 w-3" dir="down" />
            </motion.span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.ul
                role="listbox"
                aria-label="정렬 기준"
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.2, ease: EASE }}
                onMouseLeave={() => setOpen(false)}
                className="absolute right-0 top-[calc(100%+6px)] z-30 w-36 overflow-hidden rounded-xl border border-bone/10 bg-coal/90 p-1 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              >
                <li className="px-2.5 pb-1 pt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/30">
                  정렬 기준
                </li>
                {SORT_OPTIONS.map((opt) => {
                  const isActive = opt.key === sort;
                  return (
                    <li key={opt.key} role="option" aria-selected={isActive}>
                      <button
                        type="button"
                        onClick={() => {
                          onSort(opt.key);
                          setOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left font-body text-[13px] transition-colors duration-150 ${
                          isActive
                            ? "bg-gold/10 text-gold"
                            : "text-bone/65 hover:bg-bone/5 hover:text-bone"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isActive && <CheckIcon className="h-3.5 w-3.5 text-gold" />}
                      </button>
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* 검색 인풋 */}
        <div className="flex items-center gap-2 rounded-full border border-bone/10 bg-bone/5 px-3 py-1.5 transition-colors duration-200 focus-within:border-gold/50">
          <SearchIcon className="h-3.5 w-3.5 shrink-0 text-bone/35" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="검색"
            aria-label="강의안 검색"
            className="w-[160px] bg-transparent font-body text-[13px] text-bone outline-none placeholder:text-bone/30"
          />
        </div>
      </div>
    </div>
  );
}

/* ── 보기 토글 세그먼트 버튼 ── */
function ViewButton({
  active,
  label,
  onClick,
  children,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`flex h-7 w-7 items-center justify-center rounded-[7px] transition-colors duration-200 ${
        active
          ? "bg-bone/10 text-gold"
          : "text-bone/40 hover:text-bone/70"
      }`}
    >
      {children}
    </button>
  );
}

/* ── 인라인 아이콘(의존성 없음) ── */
function ChevronIcon({
  className = "",
  dir = "right",
}: {
  className?: string;
  dir?: "left" | "right" | "down";
}) {
  const rotate =
    dir === "left" ? 180 : dir === "down" ? 90 : 0;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function GridIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.4" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.4" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.4" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.4" />
    </svg>
  );
}

function ListIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden>
      <path d="M8 6h12M8 12h12M8 18h12" />
      <path d="M4 6h.01M4 12h.01M4 18h.01" strokeWidth="2.4" />
    </svg>
  );
}

function SortGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 7h14M7 12h10M10 17h4" />
    </svg>
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" className={className} aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.4-3.4" />
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
