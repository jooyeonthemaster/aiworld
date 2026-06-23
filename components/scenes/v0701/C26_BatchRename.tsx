"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C26 — 파일 수백개 일괄 이름변경 [CASE · 전부 자동으로 / F]
 * Result: 좌(흐린 원본 IMG_2931.jpg…) → 우(골드 2026-07_캠페인_001.jpg…) before→after 대비 리스트.
 *         가운데 화살표 열 + "480개 한 번에" 배지. C12(웹 프리뷰)와 확연히 다른 파일 정리 패널.
 */

const SCRIPT: ClineScript = {
  project: "rename",
  userPrompt:
    "이 사진 480장 '날짜_프로젝트_번호' 형식으로 한 번에 이름 바꿔줘.",
  steps: [
    { kind: "read", label: "480개 파일 인식", detail: "IMG_2931.jpg … IMG_3410.jpg" },
    { kind: "run", label: "rename 스크립트", detail: "regex → 2026-07_캠페인_NNN" },
  ],
  terminal: [
    { p: "$", t: "python rename.py" },
    { p: ">", t: "✔ renamed 480 files", gold: true },
  ],
};

/* before→after 매핑 (결정적, Math.random 미사용) */
const ROWS: { from: string; to: string }[] = [
  { from: "IMG_2931.jpg", to: "2026-07_캠페인_001.jpg" },
  { from: "IMG_2932.jpg", to: "2026-07_캠페인_002.jpg" },
  { from: "IMG_2933.jpg", to: "2026-07_캠페인_003.jpg" },
  { from: "IMG_2934.jpg", to: "2026-07_캠페인_004.jpg" },
  { from: "IMG_2935.jpg", to: "2026-07_캠페인_005.jpg" },
];

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.18], [0, 1]);
  const headO = useTransform(reveal, [0.12, 0.34], [0, 1]);
  const headY = useTransform(reveal, [0.12, 0.34], [12, 0]);
  const badgeO = useTransform(reveal, [0.72, 0.98], [0, 1]);
  const badgeS = useTransform(reveal, [0.72, 0.98], [0.85, 1]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col gap-2 p-3">
      {/* 헤더: 폴더 경로 + 처리 카운트 */}
      <motion.div
        style={{ opacity: headO, y: headY }}
        className="flex items-center justify-between rounded-lg border border-bone/10 bg-bone/[0.03] px-3 py-2"
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gold/80" />
          <span className="font-mono text-[10px] text-bone/70 md:text-[11px]">~/photos/2026-07-캠페인</span>
        </div>
        <span className="font-mono text-[9px] tracking-[0.18em] text-bone/45 md:text-[10px]">480 ITEMS · .jpg</span>
      </motion.div>

      {/* 컬럼 헤더 */}
      <div className="grid grid-cols-[1fr_28px_1fr] items-center gap-1.5 px-1">
        <span className="font-mono text-[8px] uppercase tracking-[0.26em] text-bone/40 md:text-[9px]">before · 원본</span>
        <span aria-hidden />
        <span className="text-right font-mono text-[8px] uppercase tracking-[0.26em] text-gold/70 md:text-[9px]">after · 정리됨</span>
      </div>

      {/* before → after 대비 리스트 */}
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-1.5">
        {ROWS.map((row, i) => {
          const a = 0.3 + i * 0.075;
          const b = a + 0.2;
          return <Row key={row.from} from={row.from} to={row.to} reveal={reveal} a={a} b={b} />;
        })}

        {/* …나머지 475개 */}
        <RestRow reveal={reveal} a={0.62} b={0.82} />
      </div>

      {/* 480개 한 번에 배지 */}
      <motion.div style={{ opacity: badgeO, scale: badgeS }} className="flex items-center justify-center pt-0.5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/[0.08] px-3.5 py-1.5 font-body text-[10px] font-bold text-gold md:text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          480개 한 번에
        </span>
      </motion.div>
    </motion.div>
  );
}

function Row({
  from,
  to,
  reveal,
  a,
  b,
}: {
  from: string;
  to: string;
  reveal: MotionValue<number>;
  a: number;
  b: number;
}) {
  const o = useTransform(reveal, [a, b], [0, 1]);
  const x = useTransform(reveal, [a, b], [-10, 0]);
  const arrowO = useTransform(reveal, [a + 0.04, b], [0, 1]);
  return (
    <motion.div style={{ opacity: o }} className="grid grid-cols-[1fr_28px_1fr] items-center gap-1.5">
      {/* 원본 (흐림) */}
      <motion.div
        style={{ x }}
        className="flex items-center gap-1.5 overflow-hidden rounded-md border border-bone/10 bg-bone/[0.02] px-2 py-1.5"
      >
        <span className="h-1.5 w-1.5 shrink-0 rounded-[2px] bg-bone/20" />
        <span className="truncate font-mono text-[9px] text-bone/35 line-through decoration-bone/20 md:text-[10px]">
          {from}
        </span>
      </motion.div>

      {/* 화살표 */}
      <motion.span style={{ opacity: arrowO }} className="text-center font-mono text-[11px] text-gold/80">
        →
      </motion.span>

      {/* 정리됨 (골드) */}
      <div className="flex items-center gap-1.5 overflow-hidden rounded-md border border-gold/25 bg-gold/[0.06] px-2 py-1.5">
        <span className="h-1.5 w-1.5 shrink-0 rounded-[2px] bg-gold" />
        <span className="truncate font-mono text-[9px] font-semibold text-gold md:text-[10px]">{to}</span>
      </div>
    </motion.div>
  );
}

function RestRow({ reveal, a, b }: { reveal: MotionValue<number>; a: number; b: number }) {
  const o = useTransform(reveal, [a, b], [0, 1]);
  return (
    <motion.div
      style={{ opacity: o }}
      className="grid grid-cols-[1fr_28px_1fr] items-center gap-1.5 pt-0.5"
    >
      <span className="rounded-md border border-dashed border-bone/10 px-2 py-1 text-center font-mono text-[8px] text-bone/30 md:text-[9px]">
        … +475개
      </span>
      <span className="text-center font-mono text-[10px] text-gold/40">→</span>
      <span className="rounded-md border border-dashed border-gold/15 px-2 py-1 text-center font-mono text-[8px] text-gold/55 md:text-[9px]">
        … _480.jpg
      </span>
    </motion.div>
  );
}

export default function C26BatchRename() {
  return (
    <CaseScene
      scene="c26"
      act="CASE · 전부 자동으로"
      cluster="F · 전부 자동으로"
      num={26}
      title="파일 수백개 일괄 이름변경"
      oldTool="리네임 유틸 유료 · 수작업"
      lead="규칙만 말하면 수백 개 파일명을 한 번에 정리."
      script={SCRIPT}
      Result={Result}
      resultTab="결과"
    />
  );
}
