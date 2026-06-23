"use client";

/**
 * ContextMenu — 우클릭 메뉴(항목 리스트, 특정 항목 강조).
 * DesktopMock/VSCodeMock 위에 absolute로 올려 쓴다(부모 relative). active 항목은 골드 강조.
 */
export default function ContextMenu({
  items,
  className = "",
}: {
  items: { label: string; sub?: string; active?: boolean; submenu?: boolean }[];
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-bone/15 bg-[#15131A]/95 py-1.5 shadow-[0_24px_60px_rgba(0,0,0,0.65)] backdrop-blur-md ${className}`}
    >
      {items.map((it, i) => (
        <div
          key={i}
          className={`flex items-center justify-between gap-6 px-3.5 py-2 ${
            it.active ? "bg-gold/15 text-gold" : "text-bone/75"
          }`}
        >
          <span className="flex items-center gap-2.5">
            {it.active ? <span className="h-1.5 w-1.5 rounded-full bg-gold" /> : <span className="h-1.5 w-1.5" />}
            <span className="whitespace-nowrap font-body text-[clamp(0.82rem,0.95vw,1rem)]">{it.label}</span>
          </span>
          {it.submenu ? (
            <span className={`font-mono text-xs ${it.active ? "text-gold/80" : "text-bone/35"}`}>▸</span>
          ) : it.sub ? (
            <span className="font-mono text-[10px] text-bone/35">{it.sub}</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
