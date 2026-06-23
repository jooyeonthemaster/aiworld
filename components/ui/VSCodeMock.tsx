"use client";

import { ReactNode } from "react";
import AppWindow from "@/components/ui/AppWindow";

/**
 * VSCodeMock — VS Code 창(튜토리얼 워크호스). view 로 화면 선택.
 * 좌측 활동바(activeIcon 골드) + 사이드패널(view) + 본문 + (terminalLines 있으면 터미널).
 * 부모는 relative 로 감싸 ClickRing 부착(이 컴포넌트 루트도 relative).
 */

export type VSCodeView =
  | "welcome"
  | "explorer"
  | "extensions"
  | "settings"
  | "source-control"
  | "editor";

type TreeNode = { name: string; depth: number; active?: boolean; kind?: "folder" | "file" };
type ExtCard = { name: string; pub: string; installs?: string; rating?: string; installed?: boolean; active?: boolean };
type TermLine = { p?: string; t: string; gold?: boolean };

const ICONS: { id: string; d: string }[] = [
  { id: "explorer", d: "M4 4h7l2 2h7v14H4z" },
  { id: "search", d: "M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12M20 20l-4-4" },
  { id: "git", d: "M6 3v12a3 3 0 0 0 3 3M6 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4M18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4M18 9a6 6 0 0 1-6 6" },
  { id: "run", d: "M7 5l11 7-11 7z" },
  { id: "extensions", d: "M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h6v6h-6z" },
];

function ActivityBar({ active }: { active?: string }) {
  return (
    <div className="flex w-11 shrink-0 flex-col items-center gap-5 border-r border-bone/10 bg-[#0A090E] py-4">
      {ICONS.map((it) => (
        <div key={it.id} className="relative">
          {active === it.id ? <span className="absolute -left-[7px] top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-full bg-gold" /> : null}
          <svg viewBox="0 0 24 24" className={`h-5 w-5 ${active === it.id ? "text-bone" : "text-bone/30"}`} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d={it.d} />
          </svg>
        </div>
      ))}
      {/* Cline 로봇 */}
      <div className="relative mt-1">
        {active === "cline" ? <span className="absolute -left-[7px] top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-full bg-gold" /> : null}
        <svg viewBox="0 0 24 24" className={`h-5 w-5 ${active === "cline" ? "text-gold" : "text-bone/30"}`} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="4" y="7" width="16" height="11" rx="3" />
          <circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
          <path d="M12 3.5V7" />
        </svg>
      </div>
    </div>
  );
}

function SidePanel({ view, tree, search, extResults }: { view: VSCodeView; tree?: TreeNode[]; search?: string; extResults?: ExtCard[] }) {
  if (view === "extensions") {
    return (
      <div className="flex w-[230px] shrink-0 flex-col border-r border-bone/10 bg-[#0C0A11] p-2.5 md:w-[260px]">
        <div className="flex items-center gap-2 rounded-md border border-bone/15 bg-bone/[0.04] px-2.5 py-1.5">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-bone/40" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
            <circle cx="11" cy="11" r="6" /><path d="m20 20-4-4" />
          </svg>
          <span className="font-mono text-[clamp(0.78rem,0.9vw,0.95rem)] text-bone/80">{search ?? ""}</span>
        </div>
        <div className="mt-2.5 flex flex-col gap-2">
          {(extResults ?? []).map((e, i) => (
            <div key={i} className={`flex items-start gap-2 rounded-md border p-2 ${e.active ? "border-gold/45 bg-gold/[0.06]" : "border-bone/8 bg-bone/[0.02]"}`}>
              <span className={`mt-0.5 h-7 w-7 shrink-0 rounded ${e.active ? "bg-gold/20" : "bg-bone/10"}`} />
              <div className="min-w-0 flex-1">
                <p className={`truncate font-body text-[12px] font-semibold ${e.active ? "text-gold" : "text-bone/85"}`}>{e.name}</p>
                <p className="truncate font-mono text-[10px] text-bone/40">{e.pub}{e.installs ? ` · ${e.installs}` : ""}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (view === "source-control") {
    return (
      <div className="flex w-[230px] shrink-0 flex-col border-r border-bone/10 bg-[#0C0A11] p-2.5 md:w-[260px]">
        <p className="px-1 pb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-bone/35">Source Control</p>
        <div className="rounded-md border border-bone/12 bg-bone/[0.04] px-2.5 py-2 font-mono text-[11px] text-bone/55">메시지 (Ctrl+Enter)</div>
        <p className="mt-3 px-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/35">변경 사항</p>
        {["index.html", "style.css"].map((f) => (
          <div key={f} className="flex items-center justify-between px-1 py-1 font-mono text-[11px] text-bone/65">
            <span>{f}</span><span className="text-[#C3E88D]">U</span>
          </div>
        ))}
      </div>
    );
  }
  // explorer (default side)
  return (
    <div className="flex w-[180px] shrink-0 flex-col border-r border-bone/10 bg-[#0C0A11] py-3 md:w-[210px]">
      <p className="px-3.5 pb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-bone/30">탐색기</p>
      {(tree ?? []).map((n, i) => (
        <div
          key={i}
          style={{ paddingLeft: `${14 + n.depth * 14}px` }}
          className={`flex items-center gap-2 py-1.5 pr-3 font-mono text-[11px] md:text-xs ${n.active ? "bg-gold/[0.08] text-gold" : "text-bone/55"}`}
        >
          <span className={`h-2 w-2 rounded-[2px] ${n.active ? "bg-gold/80" : n.kind === "folder" ? "bg-bone/30" : "bg-[#82AAFF]/60"}`} />
          {n.name}
        </div>
      ))}
    </div>
  );
}

export default function VSCodeMock({
  title = "my-ai — VS Code",
  view,
  activeIcon,
  tree,
  search,
  extResults,
  terminalLines,
  children,
  className = "",
}: {
  title?: string;
  view: VSCodeView;
  activeIcon?: "explorer" | "search" | "git" | "run" | "extensions" | "cline";
  tree?: TreeNode[];
  search?: string;
  extResults?: ExtCard[];
  terminalLines?: TermLine[];
  children?: ReactNode;
  className?: string;
}) {
  const showSide = view === "explorer" || view === "extensions" || view === "source-control";
  return (
    <AppWindow title={title} icon="vscode" accent className={`relative ${className}`}>
      <div className="flex h-[clamp(360px,52vh,560px)]">
        <ActivityBar active={activeIcon ?? (view === "extensions" ? "extensions" : view === "source-control" ? "git" : "explorer")} />
        {showSide ? <SidePanel view={view} tree={tree} search={search} extResults={extResults} /> : null}
        <div className="relative flex min-w-0 flex-1 flex-col bg-[#0B0A0F]">
          <div className="relative min-h-0 flex-1 overflow-hidden">
            {children ?? <DefaultMain view={view} />}
          </div>
          {terminalLines && terminalLines.length > 0 ? (
            <div className="border-t border-bone/10 bg-[#08070B] px-4 py-2.5">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#27C93F]/80" />
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone/35 md:text-[11px]">터미널</span>
              </div>
              <div className="flex flex-col gap-0.5 font-mono text-[clamp(0.8rem,0.92vw,0.98rem)] leading-relaxed">
                {terminalLines.map((l, i) => (
                  <div key={i} className="flex gap-2">
                    {l.p ? <span className={l.gold ? "text-gold" : "text-[#27C93F]/80"}>{l.p}</span> : null}
                    <span className={l.gold ? "text-gold [text-shadow:0_0_18px_rgba(232,181,75,0.4)]" : "text-bone/65"}>{l.t}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {/* 상태바 */}
      <div className="flex items-center justify-between border-t border-bone/10 bg-gold/[0.06] px-4 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/70 md:text-[11px]">✦ VS CODE</span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-bone/35 md:text-[11px]">UTF-8 · LF</span>
      </div>
    </AppWindow>
  );
}

function DefaultMain({ view }: { view: VSCodeView }) {
  if (view === "welcome") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
        <svg viewBox="0 0 24 24" className="h-12 w-12 text-bone/20" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden>
          <path d="M9 7 4 12l5 5M15 7l5 5-5 5" />
        </svg>
        <p className="font-display text-[clamp(1.1rem,1.6vw,1.6rem)] font-bold text-bone/70">시작하기</p>
        <p className="font-body text-[clamp(0.85rem,1vw,1.05rem)] text-bone/40">열린 폴더 없음 — 폴더를 열어 시작하세요</p>
      </div>
    );
  }
  return <div className="h-full w-full" />;
}
