"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C17 — 이미지 일괄 변환·워터마크 [CASE]
 * Result: 3×3 썸네일 그리드(각 정사각형 + 우하단 워터마크 마크) 가 reveal 로
 * stagger 등장하고, 하단에 "240장 · 1080² · webp" 골드 배지가 차오른다.
 */

const SCRIPT: ClineScript = {
  project: "image-batch",
  userPrompt:
    "이 제품사진 240장 전부 1080 정사각형으로, 로고 워터마크 박아서 webp로.",
  steps: [
    { kind: "read", label: "images/ 240장", detail: "jpg · png · 평균 4032×3024" },
    { kind: "run", label: "sharp 변환", detail: "resize 1080² · crop center · 워터마크 합성" },
    { kind: "create", label: "out/ 240 webp", detail: "quality 82 · -71% 용량" },
  ],
  terminal: [
    { p: "$", t: "node batch.js" },
    { p: ">", t: "✔ 240 images · resized + watermark · webp", gold: true },
  ],
};

/* 3×3 셀 — 결정적 수식으로 셀마다 다른 톤/구도(랜덤 금지) */
const CELLS = Array.from({ length: 9 }, (_, i) => {
  const hue = (28 + i * 37) % 360; // 셀마다 다른 색조
  const tilt = ((i * 53) % 2 === 0 ? 1 : -1) * (6 + (i % 3) * 4); // 그라데이션 각도
  const blob = 30 + ((i * 29) % 40); // 제품 형상 크기
  return { hue, tilt, blob };
});

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.16], [0, 1]);
  const badgeO = useTransform(reveal, [0.7, 0.95], [0, 1]);
  const badgeY = useTransform(reveal, [0.7, 0.95], [14, 0]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col p-3.5">
      {/* 탐색기 경로 줄 */}
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-bone/45 md:text-[11px]">
          <span className="text-[#82AAFF]/80">out/</span>
          <span className="text-bone/25">·</span>
          <span>그리드 보기</span>
        </div>
        <span className="shrink-0 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-bone/30 md:text-[10px]">240 items</span>
      </div>

      {/* 3×3 썸네일 그리드 — 정사각형 + 워터마크 */}
      <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-3 gap-2">
        {CELLS.map((cell, i) => (
          <Thumb key={i} cell={cell} i={i} reveal={reveal} />
        ))}
      </div>

      {/* 골드 배지 */}
      <motion.div style={{ opacity: badgeO, y: badgeY }} className="mt-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full border border-gold/35 bg-gold/[0.08] px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-soft" />
          <span className="font-mono text-[10px] font-bold tracking-[0.08em] text-gold md:text-[11px] [text-shadow:0_0_18px_rgba(232,181,75,0.4)]">
            240장 · 1080² · webp
          </span>
        </div>
        <span className="font-mono text-[10px] text-bone/40 md:text-[11px]">+ logo watermark</span>
      </motion.div>
    </motion.div>
  );
}

/* 단일 썸네일 — reveal 하위구간으로 stagger (보조 컴포넌트라 hook 안전) */
function Thumb({
  cell,
  i,
  reveal,
}: {
  cell: { hue: number; tilt: number; blob: number };
  i: number;
  reveal: MotionValue<number>;
}) {
  const start = 0.14 + (i / 9) * 0.5;
  const o = useTransform(reveal, [start, start + 0.16], [0, 1]);
  const s = useTransform(reveal, [start, start + 0.16], [0.82, 1]);

  const c1 = `hsl(${cell.hue} 42% 24%)`;
  const c2 = `hsl(${(cell.hue + 40) % 360} 38% 14%)`;
  const prod = `hsl(${cell.hue} 55% 62%)`;

  return (
    <motion.div
      style={{ opacity: o, scale: s }}
      className="relative aspect-square overflow-hidden rounded-md border border-bone/10"
    >
      {/* 제품사진 목업(결정적) */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(${135 + cell.tilt}deg, ${c1}, ${c2})` }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[28%]"
        style={{
          width: `${cell.blob}%`,
          height: `${cell.blob}%`,
          background: `radial-gradient(60% 60% at 38% 32%, ${prod}, transparent 78%)`,
          boxShadow: `0 6px 18px ${c2}`,
        }}
      />
      {/* 1:1 안전 가이드 */}
      <div className="absolute inset-1.5 rounded-[3px] border border-bone/10" />

      {/* 우하단 워터마크 마크 */}
      <div className="absolute bottom-1 right-1 flex items-center gap-1 rounded-[4px] bg-coal/55 px-1.5 py-0.5 backdrop-blur-sm">
        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 text-gold" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 13l4 4L19 7" />
        </svg>
        <span className="font-mono text-[7px] font-bold tracking-[0.08em] text-bone/80">LOGO</span>
      </div>
    </motion.div>
  );
}

export default function C17ImageBatch() {
  return (
    <CaseScene
      scene="c17"
      act="CASE · 미디어를 만들다"
      cluster="D · 미디어를 만들다"
      num={17}
      title="이미지 일괄 변환·워터마크"
      oldTool="포토샵 배치 · 유료 변환 사이트"
      lead="수백 장 리사이즈·포맷 변환·워터마크를 한 번에."
      script={SCRIPT}
      Result={Result}
      resultTab="out/"
    />
  );
}
