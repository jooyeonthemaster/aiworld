"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C04 — PDF 번역본 생성 [CASE / A · 문서를 다루다]
 * Result: 좌우 분할 미리보기. 좌측 영문 원문(흐림, bone/40) → 화살표 →
 *         우측 한국어 번역본(골드 제목 + 본문). "레이아웃 유지" 배지.
 */

const SCRIPT: ClineScript = {
  project: "whitepaper",
  userPrompt: "이 영문 백서 한국어로 번역해줘. 표·레이아웃 유지하고 PDF로.",
  steps: [
    { kind: "read", label: "whitepaper.pdf (EN)", detail: "32 pages" },
    { kind: "think", label: "문단별 번역" },
    { kind: "create", label: "whitepaper_ko.pdf" },
  ],
};

/* 좌측 영문(흐림) / 우측 한국어(골드) 문단 쌍 */
const PARAS: { en: string[]; ko: { head: string; body: string } }[] = [
  {
    en: ["Executive", "Summary", "— overview of", "the framework."],
    ko: {
      head: "핵심 요약",
      body: "본 프레임워크 전반에 대한 개요입니다.",
    },
  },
  {
    en: ["Adoption grew", "by 3.4× across", "enterprise teams", "in twelve months."],
    ko: {
      head: "도입 성과",
      body: "12개월간 기업 팀 전반에서 3.4배 성장했습니다.",
    },
  },
  {
    en: ["The approach", "preserves table", "structure during", "translation."],
    ko: {
      head: "표 보존",
      body: "번역 과정에서 표 구조를 그대로 유지합니다.",
    },
  },
];

function DocLine({ w }: { w: string }) {
  return <span className="block h-[6px] rounded-full bg-bone/[0.18]" style={{ width: w }} />;
}

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.18], [0, 1]);
  const enO = useTransform(reveal, [0.1, 0.34], [0, 1]);
  const arrowO = useTransform(reveal, [0.32, 0.5], [0, 1]);
  const arrowX = useTransform(reveal, [0.32, 0.5], [-8, 0]);
  const koO = useTransform(reveal, [0.46, 0.74], [0, 1]);
  const koX = useTransform(reveal, [0.46, 0.74], [16, 0]);
  const badgeO = useTransform(reveal, [0.78, 1], [0, 1]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col p-3">
      {/* 분할 미리보기 헤더 */}
      <div className="flex items-center justify-between rounded-t-lg border border-bone/10 bg-[#15121A] px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-[2px] bg-ember/50" />
          <span className="font-mono text-[10px] tracking-[0.06em] text-bone/45 md:text-[11px]">EN → KO</span>
        </div>
        <motion.span
          style={{ opacity: badgeO }}
          className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 font-mono text-[9px] tracking-[0.04em] text-gold/90 md:text-[10px]"
        >
          ✦ 레이아웃 유지
        </motion.span>
      </div>

      {/* 좌(영문 흐림) → 우(한국어 골드) */}
      <div className="relative grid min-h-0 flex-1 grid-cols-[1fr_auto_1fr] items-stretch gap-2 overflow-hidden rounded-b-lg border border-t-0 border-bone/10 bg-[#0E0C12] p-3">
        {/* 좌측 — 영문 원문(흐림) */}
        <motion.div style={{ opacity: enO }} className="flex min-w-0 flex-col rounded-lg border border-bone/10 bg-bone/[0.02] p-2.5">
          <span className="mb-2 font-mono text-[8px] uppercase tracking-[0.24em] text-bone/30 md:text-[9px]">whitepaper.pdf</span>
          <div className="flex flex-1 flex-col justify-between gap-2.5 blur-[0.4px]">
            {PARAS.map((para, i) => (
              <div key={i} className="flex flex-col gap-1">
                {para.en.map((ln, j) => (
                  <p key={j} className="font-body text-[8px] leading-tight text-bone/40 md:text-[10px]">
                    {ln}
                  </p>
                ))}
                <div className="mt-0.5 flex flex-col gap-1">
                  <DocLine w="92%" />
                  <DocLine w="74%" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 중앙 — 변환 화살표 */}
        <motion.div style={{ opacity: arrowO, x: arrowX }} className="flex flex-col items-center justify-center px-0.5">
          <span className="font-mono text-[clamp(1rem,1.6vw,1.6rem)] leading-none text-gold [text-shadow:0_0_18px_rgba(232,181,75,0.4)]">→</span>
        </motion.div>

        {/* 우측 — 한국어 번역본(골드 강조) */}
        <motion.div
          style={{ opacity: koO, x: koX }}
          className="relative flex min-w-0 flex-col rounded-lg border border-gold/25 bg-gold/[0.045] p-2.5"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-lg"
            style={{ background: "radial-gradient(80% 60% at 50% 0%, rgba(232,181,75,0.10), transparent 72%)" }}
          />
          <span className="relative mb-2 font-mono text-[8px] uppercase tracking-[0.24em] text-gold/65 md:text-[9px]">whitepaper_ko.pdf</span>
          <div className="relative flex flex-1 flex-col justify-between gap-2.5">
            {PARAS.map((para, i) => (
              <div key={i} className="flex flex-col gap-1">
                <p className="font-display font-bold leading-tight text-gold text-[10px] md:text-[12px]">
                  {para.ko.head}
                </p>
                <p className="font-body text-[9px] leading-snug text-bone/75 md:text-[11px]">
                  {para.ko.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function C04TranslatePDF() {
  return (
    <CaseScene
      scene="c04"
      act="CASE · 문서를 다루다"
      cluster="A · 문서를 다루다"
      num={4}
      title="PDF 번역본 생성"
      oldTool="유료 번역 서비스 · 페이지당 과금"
      lead="영문 백서 30p. 레이아웃 그대로, 한국어 번역본을 만든다."
      script={SCRIPT}
      Result={Result}
      resultTab="미리보기 — 번역본"
    />
  );
}
