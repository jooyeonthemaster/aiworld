"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C19 — 썸네일/GIF 자동 생성 [CASE · 미디어를 만들다]
 * Result(image): 썸네일 후보 6장 그리드(2×3, 각 16:9 미니 + 시간 라벨) +
 *   우상단 "preview.gif" 칩(작은 재생표시). 골드 강조 1개(선택된 1번 + gif 칩).
 */

const SCRIPT: ClineScript = {
  project: "thumbs",
  userPrompt: "이 영상에서 썸네일 후보 6개랑 3초 미리보기 gif 만들어줘.",
  steps: [
    { kind: "read", label: "video.mp4", detail: "06:42 · 1080p · H.264" },
    { kind: "run", label: "ffmpeg 프레임 추출", detail: "scene-change 6 keyframes" },
    { kind: "create", label: "thumb 6장 + preview.gif", detail: "1280×720 · loop 3s" },
  ],
};

/* 6개 후보 — 결정적 좌표(인덱스 수식). 시간 라벨 + 미니 장면 그라데이션 각도. */
const SHOTS = [
  { t: "00:08", hue: 18, pick: true },
  { t: "01:24", hue: 200, pick: false },
  { t: "02:57", hue: 48, pick: false },
  { t: "03:41", hue: 280, pick: false },
  { t: "05:10", hue: 150, pick: false },
  { t: "06:18", hue: 8, pick: false },
];

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.18], [0, 1]);
  const chipO = useTransform(reveal, [0.12, 0.36], [0, 1]);
  const chipS = useTransform(reveal, [0.12, 0.36], [0.85, 1]);
  const barW = useTransform(reveal, [0.4, 1], ["8%", "100%"]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col p-3.5">
      {/* 헤더: 소스 라벨 + preview.gif 칩(우상단, 골드 + 재생표시) */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone/60 md:text-[11px]">
          후보 6 · video.mp4
        </span>
        <motion.div
          style={{ opacity: chipO, scale: chipS }}
          className="flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/[0.1] px-2.5 py-1 [box-shadow:0_0_24px_rgba(232,181,75,0.28)]"
        >
          <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-gold">
            <svg viewBox="0 0 24 24" className="h-2 w-2 text-ink" aria-hidden>
              <path d="M7 5l11 7-11 7z" fill="currentColor" />
            </svg>
          </span>
          <span className="font-mono text-[9px] font-bold tracking-[0.08em] text-gold md:text-[10px]">preview.gif</span>
          <span className="rounded-sm bg-gold/20 px-1 font-mono text-[8px] text-gold/90 md:text-[9px]">3s</span>
        </motion.div>
      </div>

      {/* 2×3 썸네일 후보 그리드 */}
      <div className="mt-3 grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-2">
        {SHOTS.map((s, i) => (
          <Thumb key={s.t} shot={s} i={i} reveal={reveal} />
        ))}
      </div>

      {/* gif 인코딩 진행바 */}
      <div className="mt-3 flex items-center gap-2.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/55 md:text-[10px]">encode</span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-bone/[0.08]">
          <motion.div style={{ width: barW }} className="h-full rounded-full bg-gradient-to-r from-gold/60 to-gold" />
        </div>
        <span className="font-mono text-[9px] tabular-nums text-gold/80 md:text-[10px]">1280×720</span>
      </div>
    </motion.div>
  );
}

function Thumb({
  shot,
  i,
  reveal,
}: {
  shot: { t: string; hue: number; pick: boolean };
  i: number;
  reveal: MotionValue<number>;
}) {
  // 6장이 0.2→0.82 구간에서 순차 stagger
  const at = 0.2 + (i / SHOTS.length) * 0.58;
  const o = useTransform(reveal, [at, at + 0.16], [0, 1]);
  const y = useTransform(reveal, [at, at + 0.16], [12, 0]);

  return (
    <motion.div
      style={{ opacity: o, y }}
      className={`relative h-full w-full min-h-0 overflow-hidden rounded-md border ${
        shot.pick ? "border-gold/70 [box-shadow:0_0_22px_rgba(232,181,75,0.3)]" : "border-bone/10"
      }`}
    >
      {/* 미니 장면 — 결정적 그라데이션(영상 한 프레임 느낌) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${130 + i * 24}deg, hsl(${shot.hue} 46% 22%) 0%, #0B0A0F 78%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(60% 70% at 70% 30%, rgba(242,237,227,0.12), transparent 70%)" }}
      />
      {/* 분할선(프레임 톤) */}
      <span aria-hidden className="absolute inset-x-0 bottom-1/3 h-px bg-bone/[0.08]" />

      {/* 인덱스 번호 */}
      <span
        className={`absolute left-1.5 top-1.5 font-mono text-[9px] font-bold md:text-[10px] ${
          shot.pick ? "text-gold" : "text-bone/70"
        }`}
      >
        {String(i + 1).padStart(2, "0")}
      </span>

      {/* 선택 배지(골드 1개) */}
      {shot.pick ? (
        <span className="absolute right-1.5 top-1.5 rounded-sm bg-gold px-1.5 py-px font-mono text-[8px] font-bold tracking-[0.1em] text-ink md:text-[9px]">
          BEST
        </span>
      ) : null}

      {/* 시간 라벨 */}
      <span className="absolute bottom-1.5 right-1.5 rounded bg-ink/65 px-1.5 py-px font-mono text-[9px] tabular-nums text-bone/85 md:text-[10px]">
        {shot.t}
      </span>
    </motion.div>
  );
}

export default function C19Thumbnail() {
  return (
    <CaseScene
      scene="c19"
      act="CASE · 미디어를 만들다"
      cluster="D · 미디어를 만들다"
      num={19}
      title="썸네일/GIF 자동 생성"
      oldTool="썸네일 메이커 구독 · 디자인 외주"
      lead="영상에서 핵심 장면을 썸네일·움짤로. A/B용 여러 장."
      script={SCRIPT}
      Result={Result}
      resultTab="결과"
    />
  );
}
