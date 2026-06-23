"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C03 — PDF 용량 줄이기 [CASE / A · 문서를 다루다]
 * Result: before/after 막대 비교. 48MB(긴 bone) vs 8.6MB(짧은 골드) +
 * 거대 "82% ↓" 골드 숫자 + "화질 유지" 캡션. reveal 하위구간으로 stagger.
 */

const SCRIPT: ClineScript = {
  project: "proposal",
  userPrompt: "이 제안서 PDF 48MB인데 화질 유지하면서 10MB 아래로 줄여줘.",
  steps: [
    { kind: "read", label: "proposal.pdf", detail: "48 MB" },
    { kind: "run", label: "ghostscript 압축" },
    { kind: "create", label: "proposal_min.pdf", detail: "48MB → 8.6MB" },
  ],
  terminal: [
    { p: "$", t: "gs -compress proposal.pdf" },
    { p: ">", t: "48MB → 8.6MB (82% ↓) · 화질 유지", gold: true },
  ],
};

/* before/after 막대 한 줄 */
function Bar({
  label,
  size,
  widthPct,
  gold,
  o,
  scaleX,
}: {
  label: string;
  size: string;
  widthPct: number;
  gold?: boolean;
  o: MotionValue<number>;
  scaleX: MotionValue<number>;
}) {
  return (
    <motion.div style={{ opacity: o }} className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone/45 md:text-[11px]">
          {label}
        </span>
        <span
          className={`font-display font-black tabular-nums leading-none text-[clamp(1.1rem,2vw,2rem)] ${
            gold ? "text-gold" : "text-bone/75"
          }`}
        >
          {size}
        </span>
      </div>
      <div className="relative h-[clamp(1rem,1.9vw,1.7rem)] w-full overflow-hidden rounded-full border border-bone/10 bg-bone/[0.04]">
        <motion.div
          style={{ scaleX, transformOrigin: "left" }}
          className={`absolute inset-y-0 left-0 w-full rounded-full ${
            gold
              ? "bg-gradient-to-r from-gold to-gold-bright shadow-[0_0_22px_rgba(232,181,75,0.5)]"
              : "bg-bone/30"
          }`}
          aria-hidden
        />
      </div>
    </motion.div>
  );
}

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.18], [0, 1]);

  // before 막대(긴, bone) — 먼저 길게 깔림
  const beforeO = useTransform(reveal, [0.1, 0.3], [0, 1]);
  const beforeW = useTransform(reveal, [0.12, 0.42], [0, 1]); // 100% 폭

  // after 막대(짧은, 골드) — 줄어드는 연출(길게 떴다가 목표폭으로 수축)
  const afterO = useTransform(reveal, [0.34, 0.52], [0, 1]);
  const afterW = useTransform(reveal, [0.38, 0.72], [1, 0.18]); // 100% → 18%

  // 거대 82% 숫자 + 캡션
  const bigO = useTransform(reveal, [0.62, 0.86], [0, 1]);
  const bigY = useTransform(reveal, [0.62, 0.86], [18, 0]);
  const capO = useTransform(reveal, [0.78, 0.98], [0, 1]);

  return (
    <motion.div
      style={{ opacity: frameO }}
      className="absolute inset-0 flex flex-col gap-[clamp(0.9rem,2vw,1.6rem)] p-[clamp(0.9rem,2.4vw,1.8rem)]"
    >
      {/* 헤더 라벨 */}
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_10px_rgba(232,181,75,0.6)]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50 md:text-[11px]">
          proposal.pdf · 압축 결과
        </span>
      </div>

      {/* 막대 비교 */}
      <div className="mt-[clamp(0.4rem,1.2vw,1rem)] flex flex-col gap-[clamp(1.4rem,3vw,2.4rem)]">
        <Bar label="예전" size="48.0 MB" widthPct={100} o={beforeO} scaleX={beforeW} />
        <Bar label="이제" size="8.6 MB" widthPct={18} gold o={afterO} scaleX={afterW} />
      </div>

      {/* 거대 82% ↓ 골드 숫자 */}
      <motion.div
        style={{ opacity: bigO, y: bigY }}
        className="mt-auto flex items-end justify-between gap-3 border-t border-bone/10 pt-[clamp(0.7rem,1.6vw,1.3rem)]"
      >
        <div className="flex items-baseline gap-1.5">
          <span className="font-display font-black leading-none tabular-nums text-gold text-[clamp(2.6rem,6vw,5.2rem)]">
            82
          </span>
          <span className="font-display font-black leading-none text-gold text-[clamp(1.4rem,3vw,2.6rem)]">
            % ↓
          </span>
        </div>
        <motion.div style={{ opacity: capO }} className="flex flex-col items-end text-right">
          <span className="rounded-full border border-gold/30 bg-gold/[0.08] px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.15em] text-gold md:text-[11px]">
            화질 유지
          </span>
          <span className="mt-1.5 font-body text-[10px] leading-snug text-bone/70 md:text-[12px]">
            메일 첨부 OK · 재압축 0원
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function C03CompressPDF() {
  return (
    <CaseScene
      scene="c03"
      act="CASE · 문서를 다루다"
      cluster="A · 문서를 다루다"
      num={3}
      title="PDF 용량 줄이기"
      oldTool="유료 압축 프로그램 · 용량 제한"
      lead="메일 첨부가 안 되던 50MB 제안서. 화질 지키며 한 방에 줄인다."
      script={SCRIPT}
      Result={Result}
      resultTab="용량 비교"
    />
  );
}
