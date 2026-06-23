"use client";

import { ReactNode } from "react";

/**
 * DesktopMock — 바탕화면(월페이퍼 + 하단 작업표시줄/독). 폴더 생성·아이콘 배치용.
 * children 슬롯에 폴더 아이콘·ContextMenu 등을 absolute로 올린다(컨테이너 relative).
 */
export default function DesktopMock({
  os = "win",
  children,
  className = "",
}: {
  os?: "win" | "mac";
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-bone/12 shadow-[0_40px_110px_rgba(0,0,0,0.6)] ${className}`}
      style={{
        background:
          "radial-gradient(120% 90% at 30% 10%, rgba(232,181,75,0.10), transparent 55%), radial-gradient(120% 120% at 80% 90%, rgba(40,34,52,0.9), #0B0A0F 70%)",
      }}
    >
      {/* 은은한 도트 그리드 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(rgba(242,237,227,0.6) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      {/* 본문(아이콘/메뉴) */}
      <div className="relative h-full w-full">{children}</div>

      {/* 작업표시줄(win) / 독(mac) */}
      {os === "win" ? (
        <div className="absolute inset-x-0 bottom-0 flex h-9 items-center gap-3 border-t border-bone/10 bg-[#0E0C12]/85 px-4 backdrop-blur-md">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-bone/10">
            <span className="grid grid-cols-2 gap-px">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="h-1.5 w-1.5 bg-bone/50" />
              ))}
            </span>
          </span>
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-4 w-4 rounded bg-bone/15" />
          ))}
          <span className="ml-auto font-mono text-[10px] text-bone/45">오후 2:49</span>
        </div>
      ) : (
        <div className="absolute inset-x-0 bottom-2 mx-auto flex w-fit items-center gap-2 rounded-2xl border border-bone/10 bg-[#0E0C12]/70 px-3 py-1.5 backdrop-blur-md">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="h-6 w-6 rounded-lg bg-bone/15" />
          ))}
        </div>
      )}
    </div>
  );
}
