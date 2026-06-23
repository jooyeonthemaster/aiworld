"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import AppWindow from "@/components/ui/AppWindow";

/**
 * ClineStudio — VS Code + Cline 스튜디오 목업 (사례 씬의 심장).
 * progress(p) 로 구동: 창 마운트 → 사용자 프롬프트 → Cline 작업단계 순차 점등 →
 * (터미널) → 결과 패널(reveal) → 완료 점등.
 * 레이아웃: AppWindow > [활동바][Cline 채팅 ~40%][결과 패널 ~60%] + (terminal 하단).
 */

export type StepKind =
  | "read"
  | "search"
  | "edit"
  | "create"
  | "run"
  | "web"
  | "think"
  | "done";

export type ClineStep = { kind: StepKind; label: string; detail?: string };

export type ClineScript = {
  project: string;
  userPrompt: string;
  steps: ClineStep[];
  terminal?: { p: string; t: string; gold?: boolean }[];
};

export type ResultRenderer = React.ComponentType<{
  p: MotionValue<number>;
  reveal: MotionValue<number>;
}>;

/* ── 단계 종류별 색/아이콘 ── */
const KIND_COLOR: Record<StepKind, string> = {
  read: "text-[#82AAFF]",
  search: "text-[#82AAFF]",
  edit: "text-[#C792EA]",
  create: "text-[#C3E88D]",
  run: "text-gold",
  web: "text-[#82AAFF]",
  think: "text-bone/55",
  done: "text-gold",
};
const KIND_LABEL: Record<StepKind, string> = {
  read: "읽기",
  search: "검색",
  edit: "편집",
  create: "생성",
  run: "실행",
  web: "웹",
  think: "분석",
  done: "완료",
};

function StepGlyph({ kind, className = "" }: { kind: StepKind; className?: string }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const cls = `h-3.5 w-3.5 ${className}`;
  switch (kind) {
    case "read":
      return <svg viewBox="0 0 24 24" className={cls} aria-hidden><path d="M4 5h7v15H4zM20 5h-7v15h7z" {...c} /></svg>;
    case "search":
      return <svg viewBox="0 0 24 24" className={cls} aria-hidden><circle cx="11" cy="11" r="6" {...c} /><path d="m20 20-4-4" {...c} /></svg>;
    case "edit":
      return <svg viewBox="0 0 24 24" className={cls} aria-hidden><path d="M4 20h4L19 9l-4-4L4 16z" {...c} /></svg>;
    case "create":
      return <svg viewBox="0 0 24 24" className={cls} aria-hidden><path d="M14 3H6v18h12V7zM14 3v4h4" {...c} /><path d="M12 11v6M9 14h6" {...c} /></svg>;
    case "run":
      return <svg viewBox="0 0 24 24" className={cls} aria-hidden><path d="M6 5l5 5-5 5M12 15h6" {...c} /></svg>;
    case "web":
      return <svg viewBox="0 0 24 24" className={cls} aria-hidden><circle cx="12" cy="12" r="8" {...c} /><path d="M4 12h16M12 4c2.2 2 2.2 14 0 16M12 4c-2.2 2-2.2 14 0 16" {...c} /></svg>;
    case "think":
      return <svg viewBox="0 0 24 24" className={cls} aria-hidden><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" {...c} /></svg>;
    case "done":
      return <svg viewBox="0 0 24 24" className={cls} aria-hidden><path d="M5 13l4 4L19 7" {...c} /></svg>;
  }
}

/* ── 활동바 아이콘 ── */
function ActivityBar() {
  const items = [
    { d: "M4 4h16v16H4z M4 10h16", on: false },
    { d: "M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12M20 20l-4-4", on: false },
    { d: "M6 3v12a3 3 0 0 0 3 3M6 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4M18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4M18 9a6 6 0 0 1-6 6", on: false },
  ];
  return (
    <div className="flex w-11 shrink-0 flex-col items-center gap-5 border-r border-bone/10 bg-[#0A090E] py-4">
      {items.map((it, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-5 w-5 text-bone/30" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d={it.d} />
        </svg>
      ))}
      {/* Cline 로봇 — 활성(골드) */}
      <div className="relative mt-1">
        <span className="absolute -left-[7px] top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-full bg-gold" />
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="4" y="7" width="16" height="11" rx="3" />
          <circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
          <path d="M12 3.5V7" />
        </svg>
      </div>
    </div>
  );
}

export default function ClineStudio({
  p,
  script,
  Result,
  resultTab = "미리보기",
}: {
  p: MotionValue<number>;
  script: ClineScript;
  Result: ResultRenderer;
  resultTab?: string;
}) {
  /* 창 마운트 */
  const winO = useTransform(p, [0.04, 0.16], [0, 1]);
  const winY = useTransform(p, [0.04, 0.18], [56, 0]);
  const winS = useTransform(p, [0.04, 0.18], [0.965, 1]);

  /* 사용자 프롬프트 */
  const promptO = useTransform(p, [0.12, 0.22], [0, 1]);
  const promptY = useTransform(p, [0.12, 0.22], [16, 0]);

  /* 결과 reveal */
  const reveal = useTransform(p, [0.56, 0.82], [0, 1]);
  const resultPanelO = useTransform(p, [0.5, 0.6], [0, 1]);

  /* 완료 배지 */
  const doneO = useTransform(p, [0.82, 0.92], [0, 1]);

  const steps = script.steps;
  const stepStart = 0.24;
  const stepEnd = 0.56;
  const stepSpan = (stepEnd - stepStart) / Math.max(steps.length, 1);

  return (
    <motion.div style={{ opacity: winO, y: winY, scale: winS }} className="w-full">
      <AppWindow title={`${script.project} — VS Code`} icon="vscode" accent rightLabel="Cline · Qwen3.7-plus">
        <div className="flex h-[clamp(360px,52vh,560px)]">
          <ActivityBar />

          {/* Cline 채팅 패널 */}
          <div className="flex w-[40%] min-w-0 flex-col border-r border-bone/10 bg-[#0C0A11]">
            <div className="flex items-center justify-between border-b border-bone/10 px-3.5 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-soft" />
                <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-bone/55 md:text-[11px]">Cline</span>
              </div>
              <span className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 font-mono text-[9px] tracking-[0.05em] text-gold/85 md:text-[10px]">
                Qwen3.7-plus
              </span>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden px-3.5 py-3.5">
              {/* 사용자 프롬프트 버블 */}
              <motion.div style={{ opacity: promptO, y: promptY }} className="self-end">
                <div className="rounded-2xl rounded-br-sm border border-gold/30 bg-gold/[0.08] px-3.5 py-2.5">
                  <p className="font-body text-[clamp(0.82rem,0.95vw,1rem)] leading-snug text-bone/90">
                    {script.userPrompt}
                  </p>
                </div>
                <p className="mt-1 text-right font-mono text-[9px] uppercase tracking-[0.2em] text-bone/30 md:text-[10px]">나</p>
              </motion.div>

              {/* Cline 작업 단계 */}
              <div className="flex flex-col gap-1.5">
                {steps.map((s, i) => (
                  <StepRow
                    key={i}
                    step={s}
                    p={p}
                    at={stepStart + i * stepSpan}
                    span={stepSpan}
                  />
                ))}
              </div>

              {/* 완료 배지 */}
              <motion.div style={{ opacity: doneO }} className="mt-auto flex items-center gap-2 rounded-lg border border-gold/30 bg-gold/[0.07] px-3 py-2">
                <span className="text-gold"><StepGlyph kind="done" /></span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold md:text-[11px]">완료 — 작업 끝</span>
              </motion.div>
            </div>
          </div>

          {/* 결과 패널 */}
          <div className="flex min-w-0 flex-1 flex-col bg-[#0B0A0F]">
            <div className="flex h-9 items-center gap-2 border-b border-bone/10 bg-[#0E0C12] px-3">
              <span className="h-2 w-2 rounded-[2px] bg-gold/70" />
              <span className="font-mono text-[10px] tracking-[0.06em] text-bone/60 md:text-[11px]">{resultTab}</span>
            </div>
            <motion.div style={{ opacity: resultPanelO }} className="relative min-h-0 flex-1 overflow-hidden">
              <Result p={p} reveal={reveal} />
            </motion.div>
          </div>
        </div>

        {/* 터미널 (선택) */}
        {script.terminal && script.terminal.length > 0 ? (
          <div className="border-t border-bone/10 bg-[#08070B] px-4 py-2.5">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#27C93F]/80" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone/35 md:text-[11px]">Terminal</span>
            </div>
            <div className="flex flex-col gap-0.5 font-mono text-[clamp(0.78rem,0.9vw,0.95rem)] leading-relaxed">
              {script.terminal.map((row, i) => (
                <TermRow key={i} row={row} p={p} i={i} n={script.terminal!.length} />
              ))}
            </div>
          </div>
        ) : null}

        {/* 상태바 */}
        <div className="flex items-center justify-between border-t border-bone/10 bg-gold/[0.06] px-4 py-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/70 md:text-[11px]">✦ AI CONNECTED</span>
          <span className="font-mono text-[10px] tracking-[0.14em] text-bone/35 md:text-[11px]">OpenRouter · Cline</span>
        </div>
      </AppWindow>
    </motion.div>
  );
}

/* ── Cline 단계 행 ── */
function StepRow({ step, p, at, span }: { step: ClineStep; p: MotionValue<number>; at: number; span: number }) {
  const o = useTransform(p, [at, at + span * 0.7], [0, 1]);
  const x = useTransform(p, [at, at + span * 0.7], [-12, 0]);
  return (
    <motion.div style={{ opacity: o, x }} className="flex items-start gap-2.5 rounded-lg border border-bone/10 bg-bone/[0.03] px-3 py-2">
      <span className={`mt-0.5 shrink-0 ${KIND_COLOR[step.kind]}`}>
        <StepGlyph kind={step.kind} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className={`font-mono text-[10px] uppercase tracking-[0.16em] md:text-[11px] ${KIND_COLOR[step.kind]}`}>
            {KIND_LABEL[step.kind]}
          </span>
          <span className="truncate font-body text-[clamp(0.8rem,0.92vw,0.98rem)] text-bone/85">{step.label}</span>
        </div>
        {step.detail ? (
          <p className="mt-0.5 truncate font-mono text-[10px] text-bone/35 md:text-[11px]">{step.detail}</p>
        ) : null}
      </div>
    </motion.div>
  );
}

/* ── 터미널 행 ── */
function TermRow({ row, p, i, n }: { row: { p: string; t: string; gold?: boolean }; p: MotionValue<number>; i: number; n: number }) {
  const at = 0.48 + (i / Math.max(n, 1)) * 0.16;
  const o = useTransform(p, [at, at + 0.05], [0, 1]);
  const y = useTransform(p, [at, at + 0.05], [8, 0]);
  return (
    <motion.div style={{ opacity: o, y }} className="flex gap-2">
      <span className={row.gold ? "text-gold" : "text-[#27C93F]/80"}>{row.p}</span>
      <span className={row.gold ? "text-gold [text-shadow:0_0_20px_rgba(232,181,75,0.4)]" : "text-bone/55"}>{row.t}</span>
    </motion.div>
  );
}
