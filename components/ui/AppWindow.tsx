"use client";

import { ReactNode } from "react";

/**
 * AppWindow — 범용 데스크탑 창 크롬 (macOS / VS Code 톤).
 * 신호등 3개 + 타이틀바(아이콘+타이틀) + 둥근 보더 + 큰 그림자. 본문은 children.
 * 세팅 씬(마켓플레이스/설정 목업)과 ClineStudio 가 공통으로 사용 → 픽셀 단위 통일.
 * 창 마운트 모션은 부모가 감싼 motion 래퍼에서 처리(이 컴포넌트는 정적).
 */

type IconKind =
  | "vscode"
  | "cline"
  | "browser"
  | "folder"
  | "settings"
  | "terminal";

function WinIcon({ kind }: { kind: IconKind }) {
  const stroke = "rgba(232,181,75,0.8)";
  const common = { fill: "none", stroke, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (kind) {
    case "vscode":
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
          <path d="M9 7 4 12l5 5M15 7l5 5-5 5" {...common} />
        </svg>
      );
    case "cline":
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
          <rect x="4" y="6" width="16" height="12" rx="3" {...common} />
          <circle cx="9.5" cy="12" r="1.1" fill={stroke} stroke="none" />
          <circle cx="14.5" cy="12" r="1.1" fill={stroke} stroke="none" />
          <path d="M12 3v3" {...common} />
        </svg>
      );
    case "browser":
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
          <circle cx="12" cy="12" r="8.5" {...common} />
          <path d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17" {...common} />
        </svg>
      );
    case "folder":
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" {...common} />
        </svg>
      );
    case "settings":
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
          <circle cx="12" cy="12" r="3.2" {...common} />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" {...common} />
        </svg>
      );
    case "terminal":
      return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
          <path d="M5 7l4 5-4 5M12 17h7" {...common} />
        </svg>
      );
  }
}

export default function AppWindow({
  title,
  icon = "vscode",
  accent = false,
  rightLabel,
  className = "",
  children,
}: {
  title: string;
  icon?: IconKind;
  accent?: boolean;
  rightLabel?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-[#0B0A0F] shadow-[0_40px_110px_rgba(0,0,0,0.6)] ${
        accent ? "border-gold/55" : "border-bone/12"
      } ${className}`}
    >
      {/* 타이틀바 */}
      <div className="flex h-11 items-center gap-2 border-b border-bone/10 bg-[#100D13] px-4">
        <span className="h-3 w-3 rounded-full bg-[#FF5F56]/85" />
        <span className="h-3 w-3 rounded-full bg-[#FFBD2E]/85" />
        <span className="h-3 w-3 rounded-full bg-[#27C93F]/85" />
        <div className="ml-4 flex min-w-0 items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-bone/45">
          <WinIcon kind={icon} />
          <span className="truncate">{title}</span>
        </div>
        {rightLabel ? (
          <span className="ml-auto truncate font-mono text-[10px] uppercase tracking-[0.24em] text-bone/30 md:text-[11px]">
            {rightLabel}
          </span>
        ) : null}
      </div>

      {/* 본문 */}
      {children}
    </div>
  );
}
