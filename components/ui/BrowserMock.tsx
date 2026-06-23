"use client";

import { ReactNode } from "react";

/**
 * BrowserMock — 브라우저 창(주소창 + 페이지 본문). 다운로드 페이지·GitHub·Vercel·OpenRouter.
 * 부모가 relative 컨테이너로 감싸 ClickRing 부착. 본문 = children.
 */
export default function BrowserMock({
  url,
  children,
  className = "",
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-bone/12 bg-[#0B0A0F] shadow-[0_40px_110px_rgba(0,0,0,0.6)] ${className}`}
    >
      {/* 탭바 */}
      <div className="flex items-center gap-2 border-b border-bone/10 bg-[#100D13] px-4 pt-2.5">
        <div className="flex items-center gap-2 pb-2.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F56]/85" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E]/85" />
          <span className="h-3 w-3 rounded-full bg-[#27C93F]/85" />
        </div>
        <div className="ml-3 flex max-w-[240px] items-center gap-2 rounded-t-lg border border-b-0 border-bone/10 bg-[#0B0A0F] px-3 py-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-bone/25" />
          <span className="truncate font-mono text-[11px] text-bone/55">{url.split("/")[0]}</span>
        </div>
      </div>
      {/* 주소창 */}
      <div className="flex items-center gap-2 border-b border-bone/10 bg-[#0E0C12] px-4 py-2.5">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-bone/30" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden>
          <path d="M9 7 4 12l5 5M15 7l5 5-5 5" />
        </svg>
        <div className="flex flex-1 items-center gap-2 rounded-full border border-bone/12 bg-bone/[0.04] px-3 py-1.5">
          <svg viewBox="0 0 24 24" className="h-3 w-3 text-[#27C93F]/70" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          <span className="truncate font-mono text-[clamp(0.78rem,0.95vw,1rem)] text-bone/75">{url}</span>
        </div>
      </div>
      {/* 본문 */}
      <div className="relative">{children}</div>
    </div>
  );
}
