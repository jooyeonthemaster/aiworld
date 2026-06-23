"use client";

import { motion } from "framer-motion";
import { CATEGORY_META } from "@/lib/lectures";
import type { LectureCategory } from "@/lib/lectures";

/**
 * Sidebar — 데스크탑 파일 관리자 좌측 내비게이션
 * ────────────────────────────────────────────────────────────────────
 * CATEGORY_META 를 group("favorites"/"library")으로 묶어 렌더한다.
 * 즐겨찾기 그룹이 먼저, 라이브러리 그룹이 그 다음.
 * 선택 항목: 골드 텍스트 + bg-gold/10 + layoutId 로 이동하는 좌측 골드 세로바.
 * 하단: 발표자 미니 명함(김주연 · 네안데르 · 일해라컴퍼니).
 *
 * controlled — onCategory(key) 로 상위 상태를 갱신한다.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/** CATEGORY_META 를 선언 순서(favorites → library)대로 안정적으로 나열 */
const ENTRIES = Object.entries(CATEGORY_META) as [
  LectureCategory,
  (typeof CATEGORY_META)[LectureCategory],
][];

const GROUPS: { id: "favorites" | "library"; label: string }[] = [
  { id: "favorites", label: "즐겨찾기" },
  { id: "library", label: "라이브러리" },
];

export default function Sidebar({
  category,
  onCategory,
  counts,
}: {
  category: LectureCategory;
  onCategory: (c: LectureCategory) => void;
  counts: Record<LectureCategory, number>;
}) {
  return (
    <nav
      aria-label="강의안 카테고리"
      className="flex h-full w-[248px] shrink-0 flex-col border-r border-bone/8 bg-ink/30 px-3 py-4"
    >
      {/* ── 카테고리 그룹 ── */}
      <div className="flex flex-col">
        {GROUPS.map((group, gi) => {
          const items = ENTRIES.filter(([, meta]) => meta.group === group.id);
          if (items.length === 0) return null;
          return (
            <div key={group.id}>
              <p
                className={`mb-2 px-3 font-mono text-[10px] uppercase tracking-[0.25em] text-haze ${
                  gi === 0 ? "mt-1" : "mt-4"
                }`}
              >
                {group.label}
              </p>
              <ul className="flex flex-col gap-0.5">
                {items.map(([key, meta]) => {
                  const active = category === key;
                  return (
                    <li key={key} className="relative">
                      {/* 좌측 골드 세로바 — 선택 항목으로 부드럽게 이동 */}
                      {active && (
                        <motion.span
                          layoutId="sidebar-active"
                          aria-hidden
                          className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-gold"
                          style={{
                            boxShadow: "0 0 8px -1px rgba(232,181,75,0.6)",
                          }}
                          transition={{ duration: 0.32, ease: EASE }}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => onCategory(key)}
                        aria-current={active ? "true" : undefined}
                        className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left outline-none transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-gold/50 ${
                          active
                            ? "bg-gold/10 text-gold"
                            : "text-bone/60 hover:bg-bone/5 hover:text-bone"
                        }`}
                      >
                        <CategoryIcon
                          name={meta.icon}
                          className={`h-[18px] w-[18px] shrink-0 ${
                            active ? "text-gold" : "text-current"
                          }`}
                        />
                        <span className="truncate font-body text-[13px] font-medium">
                          {meta.label}
                        </span>
                        <span
                          className={`ml-auto font-mono text-[11px] tabular-nums ${
                            active ? "text-gold/70" : "text-bone/35"
                          }`}
                        >
                          {counts[key] ?? 0}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* ── 발표자 미니 명함 ── */}
      <div className="mt-auto border-t border-bone/8 pt-4">
        <div className="flex items-center gap-3 rounded-xl px-2 py-1.5">
          <div
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-[15px] font-bold text-ink shadow-[0_4px_14px_-4px_rgba(232,181,75,0.55)]"
            style={{
              background:
                "linear-gradient(150deg, #ffd37a 0%, #e8b54b 55%, #b8842f 100%)",
            }}
          >
            김
          </div>
          <div className="min-w-0 leading-tight">
            <p className="truncate font-body text-sm font-medium text-bone">
              김주연
            </p>
            <p className="truncate font-mono text-[11px] tracking-[0.01em] text-bone/40">
              (주)네안데르 · 일해라컴퍼니
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ── 카테고리 아이콘(인라인 SVG, 외부 의존성 없음) ── */
function CategoryIcon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (name) {
    case "star":
      return (
        <svg {...common}>
          <path d="M12 3.2l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.6 9.3l5.8-.8L12 3.2z" />
        </svg>
      );
    case "folder":
      return (
        <svg {...common}>
          <path d="M3 7.5a1.5 1.5 0 011.5-1.5h4.1a1.5 1.5 0 011.06.44l1.34 1.34a1.5 1.5 0 001.06.44h7.48A1.5 1.5 0 0121 9.76V18a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 18V7.5z" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="15" rx="2" />
          <path d="M3.5 9.5h17M8 3v4M16 3v4" />
        </svg>
      );
    case "deck":
      return (
        <svg {...common}>
          <rect x="3" y="4.5" width="18" height="12.5" rx="1.6" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    case "draft":
      return (
        <svg {...common}>
          <path d="M14 3.5H7A1.5 1.5 0 005.5 5v14A1.5 1.5 0 007 20.5h10A1.5 1.5 0 0018.5 19V8l-4.5-4.5z" />
          <path d="M13.8 3.5V8H18.4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}
