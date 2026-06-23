"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C02 — 여러 PDF 합치기 (무료·무제한) [CASE / 클러스터 A · 문서를 다루다]
 * Result(files): 좌측 PDF 7개 리스트(아이콘+이름+페이지) → 화살표 →
 * 우측 merged.pdf 단일 골드 카드 + "182페이지 · 무제한 · ₩0" 배지.
 */

const SOURCES: { name: string; pages: number }[] = [
  { name: "01_표지.pdf", pages: 2 },
  { name: "02_사업개요.pdf", pages: 18 },
  { name: "03_시장분석.pdf", pages: 41 },
  { name: "04_예산안.pdf", pages: 27 },
  { name: "05_일정표.pdf", pages: 9 },
  { name: "06_부록.pdf", pages: 63 },
  { name: "07_레퍼런스.pdf", pages: 22 },
];

const SCRIPT: ClineScript = {
  project: "docs-merge",
  userPrompt: "이 PDF 7개를 순서대로 하나로 합쳐줘. 표지도 자동으로.",
  steps: [
    { kind: "read", label: "폴더 PDF 7개 인식", detail: "01_표지 … 07_레퍼런스 · 정렬됨" },
    { kind: "run", label: "pypdf merge 실행", detail: "PdfWriter · append × 7" },
    { kind: "create", label: "merged.pdf 생성", detail: "182 pages · 24MB" },
  ],
  terminal: [
    { p: "$", t: "python merge.py" },
    { p: ">", t: "merged 7 files → merged.pdf" },
    { p: ">", t: "완료 · 182 pages · ₩0", gold: true },
  ],
};

/* ── PDF 글리프 ── */
function PdfGlyph({ gold = false }: { gold?: boolean }) {
  const c = gold ? "text-gold" : "text-[#82AAFF]";
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 ${c}`} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z" />
      <path d="M14 3v4h4" />
      <path d="M8.5 13.5h1.2M8.5 16h3.5M14.3 13.5h1.2" />
    </svg>
  );
}

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.16], [0, 1]);
  const arrowO = useTransform(reveal, [0.46, 0.62], [0, 1]);
  const arrowX = useTransform(reveal, [0.46, 0.62], [-10, 0]);
  const mergedO = useTransform(reveal, [0.58, 0.82], [0, 1]);
  const mergedY = useTransform(reveal, [0.58, 0.82], [18, 0]);
  const badgeO = useTransform(reveal, [0.8, 1], [0, 1]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex items-stretch gap-2.5 p-3.5">
      {/* ── BEFORE: 소스 PDF 7개 ── */}
      <div className="flex min-w-0 flex-[0.95] flex-col">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone/40 md:text-[10px]">소스 · 7 files</span>
          <span className="font-mono text-[9px] text-bone/30 md:text-[10px]">/docs-merge</span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-center gap-[clamp(4px,0.9vh,8px)]">
          {SOURCES.map((f, i) => {
            const at = 0.1 + i * 0.045;
            return <SourceRow key={f.name} file={f} reveal={reveal} at={at} />;
          })}
        </div>
      </div>

      {/* ── 화살표 (merge) ── */}
      <motion.div style={{ opacity: arrowO, x: arrowX }} className="flex shrink-0 flex-col items-center justify-center gap-1.5">
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold/65">merge</span>
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold [filter:drop-shadow(0_0_10px_rgba(232,181,75,0.45))]" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 12h14M13 6l6 6-6 6" />
        </svg>
        <span className="font-mono text-[8px] text-bone/35">pypdf</span>
      </motion.div>

      {/* ── AFTER: merged.pdf 골드 강조 ── */}
      <motion.div style={{ opacity: mergedO, y: mergedY }} className="flex min-w-0 flex-[1.25] flex-col justify-center">
        <span className="mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-gold/70 md:text-[10px]">결과 · 1 file</span>
        <div
          className="relative flex flex-col gap-3 rounded-xl border border-gold/35 bg-gold/[0.07] p-3.5"
          style={{ boxShadow: "0 0 40px rgba(232,181,75,0.16)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{ background: "radial-gradient(80% 80% at 30% 0%, rgba(232,181,75,0.14), transparent 72%)" }}
          />
          {/* 거대 PDF 아이콘 + 파일명 */}
          <div className="relative flex items-center gap-2.5">
            <div className="flex h-11 w-8 shrink-0 items-center justify-center rounded-md border border-gold/40 bg-gold/[0.1]">
              <PdfGlyph gold />
            </div>
            <div className="min-w-0">
              <p className="whitespace-nowrap font-mono text-[clamp(0.85rem,1vw,1rem)] font-bold text-gold">merged.pdf</p>
              <p className="mt-0.5 font-mono text-[10px] text-bone/70 md:text-[11px]">24MB · v1.0</p>
            </div>
          </div>

          {/* 배지 */}
          <motion.div style={{ opacity: badgeO }} className="relative flex flex-wrap items-center gap-1.5">
            {["182페이지", "무제한", "₩0"].map((b, i) => (
              <span
                key={b}
                className={`rounded-full border px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.04em] md:text-[10px] ${
                  i === 2
                    ? "border-gold/50 bg-gold/15 text-gold [text-shadow:0_0_16px_rgba(232,181,75,0.5)]"
                    : "border-bone/15 bg-bone/[0.05] text-bone/75"
                }`}
              >
                {b}
              </span>
            ))}
          </motion.div>

          {/* 결제 차단 → 무료 대비 */}
          <motion.div style={{ opacity: badgeO }} className="relative flex items-center gap-2 border-t border-gold/15 pt-2.5">
            <span className="font-mono text-[9px] text-bone/40 line-through md:text-[10px]">30p+ 결제 필요</span>
            <span className="font-mono text-[9px] text-bone/30">→</span>
            <span className="font-mono text-[9px] font-bold text-gold md:text-[10px]">결제창 없음</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── 소스 PDF 행 ── */
function SourceRow({
  file,
  reveal,
  at,
}: {
  file: { name: string; pages: number };
  reveal: MotionValue<number>;
  at: number;
}) {
  const o = useTransform(reveal, [at, at + 0.12], [0.25, 1]);
  const x = useTransform(reveal, [at, at + 0.12], [-12, 0]);
  return (
    <motion.div
      style={{ opacity: o, x }}
      className="flex items-center gap-2 rounded-lg border border-bone/10 bg-bone/[0.03] px-2.5 py-1.5"
    >
      <PdfGlyph />
      <span className="min-w-0 flex-1 truncate font-mono text-[10px] text-bone/75 md:text-[11px]">{file.name}</span>
      <span className="shrink-0 rounded bg-bone/[0.06] px-1 py-0.5 font-mono text-[9px] text-bone/60 md:text-[10px]">
        {file.pages}p
      </span>
    </motion.div>
  );
}

export default function C02MergePDF() {
  return (
    <CaseScene
      scene="c02"
      act="CASE · 문서를 다루다"
      cluster="A · 문서를 다루다"
      num={2}
      title="여러 PDF 합치기 (무료·무제한)"
      oldTool="ilovepdf/스마트PDF 유료(30p+ 결제)"
      lead={"30페이지 넘으면 결제하라던 합치기. 파일 넣고 \"합쳐줘\" 한 줄이면 끝."}
      script={SCRIPT}
      Result={Result}
      resultTab="파일"
    />
  );
}
