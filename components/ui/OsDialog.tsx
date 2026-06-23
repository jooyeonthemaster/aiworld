"use client";

import { ReactNode } from "react";
import ClickRing from "@/components/ui/ClickRing";

/**
 * OsDialog — OS 모달 다이얼로그 / 설치 마법사 한 페이지.
 * UAC·신뢰·라이선스·경로·체크박스 등.
 * 하단 버튼에 ring=true 면 그 버튼 정중앙에 ClickRing(원+커서+라벨)을 '자식'으로 앵커링한다
 * → 푸터 레이아웃과 무관하게 항상 버튼 정중앙을 픽셀 단위로 가리킨다(드리프트 0).
 * ringLabel/ringDir 로 라벨 문구·방향(기본 up) 지정.
 */
export default function OsDialog({
  title,
  os = "win",
  children,
  buttons,
  className = "",
}: {
  title: string;
  os?: "win" | "mac";
  children: ReactNode;
  buttons?: {
    label: string;
    primary?: boolean;
    ring?: boolean;
    ringLabel?: string;
    ringDir?: "up" | "down" | "left" | "right";
  }[];
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-bone/15 bg-[#14121A] shadow-[0_40px_110px_rgba(0,0,0,0.65)] ${className}`}
    >
      {/* 타이틀바 */}
      <div className="flex h-10 items-center gap-2 border-b border-bone/10 bg-[#1B1822] px-4">
        {os === "mac" ? (
          <>
            <span className="h-3 w-3 rounded-full bg-[#FF5F56]/85" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]/85" />
            <span className="h-3 w-3 rounded-full bg-[#27C93F]/85" />
            <span className="mx-auto font-mono text-[11px] tracking-[0.04em] text-bone/60">{title}</span>
            <span className="w-9" />
          </>
        ) : (
          <>
            <span className="font-mono text-[11px] tracking-[0.04em] text-bone/65">{title}</span>
            <span className="ml-auto flex items-center gap-3 text-bone/40">
              <span className="text-xs">—</span>
              <span className="text-xs">▢</span>
              <span className="text-xs">✕</span>
            </span>
          </>
        )}
      </div>

      {/* 본문 */}
      <div className="px-[clamp(1.2rem,1.8vw,2rem)] py-[clamp(1.1rem,1.8vh,1.8rem)]">{children}</div>

      {/* 버튼 푸터 */}
      {buttons && buttons.length > 0 ? (
        <div className="flex items-center justify-end gap-2.5 border-t border-bone/10 bg-[#100E16] px-[clamp(1.2rem,1.8vw,2rem)] py-3">
          {buttons.map((b, i) => (
            <div key={i} className="relative">
              <span
                className={`relative inline-block rounded-md px-4 py-1.5 font-body text-[clamp(0.8rem,0.95vw,1rem)] ${
                  b.primary || b.ring
                    ? "bg-gold font-bold text-ink"
                    : "border border-bone/20 bg-bone/[0.04] text-bone/70"
                }`}
              >
                {b.label}
              </span>
              {/* 버튼 정중앙에 앵커링된 클릭 표지(드리프트 0) */}
              {b.ring ? (
                <ClickRing x={50} y={50} label={b.ringLabel} dir={b.ringDir ?? "up"} />
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
