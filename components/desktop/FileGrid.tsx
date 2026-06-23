"use client";

import FileCard from "./FileCard";
import type { Lecture } from "@/lib/lectures";

/**
 * FileGrid — 그리드 보기 컨테이너 (FileCard 매핑 글루).
 * 내부 스크롤 영역이므로 data-lenis-prevent 로 전역 Lenis 우회.
 */
export default function FileGrid({
  lectures,
  selectedId,
  onSelect,
  onOpen,
}: {
  lectures: Lecture[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onOpen: (route: string) => void;
}) {
  if (lectures.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <EmptyGlyph className="h-12 w-12 text-bone/12" />
        <p className="font-body text-sm text-bone/40">표시할 강의안이 없습니다</p>
        <p className="font-mono text-[11px] text-bone/25">검색어나 필터를 바꿔보세요</p>
      </div>
    );
  }

  return (
    <div data-lenis-prevent className="h-full overflow-y-auto px-5 py-5">
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(232px,1fr))]">
        {lectures.map((l, i) => (
          <FileCard
            key={l.id}
            lecture={l}
            index={i}
            selected={selectedId === l.id}
            onSelect={onSelect}
            onOpen={onOpen}
          />
        ))}
      </div>
    </div>
  );
}

function EmptyGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    </svg>
  );
}
