"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C15 — 유튜브 링크 → mp4 / mp3 [CASE · 미디어를 만들다]
 * Result(media): 영상 플레이어 목업(썸네일+재생버튼+재생바) → 파일 칩 2개(mp4 골드 / mp3).
 * reveal 하위구간으로 플레이어 → 재생바 → 칩이 순차 등장.
 */

const SCRIPT: ClineScript = {
  project: "media-grab",
  userPrompt: "이 유튜브 링크 1080p mp4랑 mp3 둘 다 받아줘.",
  steps: [
    { kind: "web", label: "링크 분석", detail: "youtube.com · 포맷·화질 스캔" },
    { kind: "run", label: "yt-dlp 실행", detail: "1080p 스트림 병합 (video+audio)" },
    { kind: "create", label: "video.mp4 + audio.mp3", detail: "mp4 1080p · mp3 320k 추출" },
  ],
  terminal: [
    { p: "$", t: "yt-dlp <url>" },
    { p: ">", t: "✔ video.mp4 (1080p) · audio.mp3 (320k)", gold: true },
  ],
};

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.18], [0, 1]);

  const playerO = useTransform(reveal, [0.12, 0.4], [0, 1]);
  const playerY = useTransform(reveal, [0.12, 0.4], [16, 0]);
  const playPulse = useTransform(reveal, [0.28, 0.46, 0.62], [0.85, 1.08, 1]);

  const barO = useTransform(reveal, [0.4, 0.62], [0, 1]);
  const barFill = useTransform(reveal, [0.42, 0.92], ["0%", "100%"]);

  const mp4O = useTransform(reveal, [0.6, 0.82], [0, 1]);
  const mp4Y = useTransform(reveal, [0.6, 0.82], [14, 0]);
  const mp3O = useTransform(reveal, [0.72, 0.95], [0, 1]);
  const mp3Y = useTransform(reveal, [0.72, 0.95], [14, 0]);

  /* 결정적 파형 막대 — 사운드 트랙 느낌 (i*47)%13 기반 */
  const wave = Array.from({ length: 26 }, (_, i) => 18 + ((i * 47) % 13) * 6);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col gap-3 p-3.5">
      {/* 영상 플레이어 목업 */}
      <motion.div
        style={{ opacity: playerO, y: playerY }}
        className="relative aspect-video w-full overflow-hidden rounded-xl border border-bone/10 bg-[#0E0C12]"
      >
        {/* 썸네일 배경 그라데이션 */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 110% at 28% 18%, rgba(130,170,255,0.18), transparent 58%), radial-gradient(120% 120% at 80% 100%, rgba(232,181,75,0.16), transparent 60%)",
          }}
        />
        {/* 썸네일 라벨 */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5">
          <span className="flex h-4 items-center rounded-[3px] bg-[#FF0000]/85 px-1.5 font-mono text-[8px] font-bold tracking-[0.04em] text-bone md:text-[9px]">
            YouTube
          </span>
          <span className="font-mono text-[9px] tracking-[0.04em] text-bone/70 md:text-[10px]">1080p · HD</span>
        </div>
        {/* 재생 시간 배지 */}
        <span className="absolute bottom-3 right-3 rounded-[3px] bg-ink/70 px-1.5 py-0.5 font-mono text-[8px] text-bone/80 md:text-[9px]">
          14:32
        </span>
        {/* 재생 버튼 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            style={{ scale: playPulse }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/95 shadow-[0_0_36px_rgba(232,181,75,0.5)] md:h-14 md:w-14"
          >
            <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 text-ink md:h-6 md:w-6" fill="currentColor" aria-hidden>
              <path d="M7 4.5v15l13-7.5z" />
            </svg>
          </motion.span>
        </div>
      </motion.div>

      {/* 재생바 + 파형 */}
      <motion.div style={{ opacity: barO }} className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-bone/60 md:text-[10px]">04:18</span>
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-bone/10">
            <motion.div
              style={{ width: barFill }}
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold to-gold-bright"
            />
          </div>
          <span className="font-mono text-[9px] text-bone/60 md:text-[10px]">14:32</span>
        </div>
        {/* 오디오 파형 (mp3 추출 암시) */}
        <div className="flex h-7 items-end gap-[3px]">
          {wave.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-full bg-bone/20"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </motion.div>

      {/* 파일 칩 2개 */}
      <div className="mt-auto grid grid-cols-2 gap-2.5">
        <motion.div
          style={{ opacity: mp4O, y: mp4Y }}
          className="flex items-center gap-2.5 rounded-lg border border-gold/30 bg-gold/[0.07] px-3 py-2.5"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gold/15 text-gold">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m10 9 5 3-5 3z" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="truncate font-mono text-[clamp(0.74rem,0.9vw,0.92rem)] font-semibold text-gold">video.mp4</p>
            <p className="font-mono text-[9px] tracking-[0.04em] text-gold/70 md:text-[10px]">1080p · 248 MB</p>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: mp3O, y: mp3Y }}
          className="flex items-center gap-2.5 rounded-lg border border-bone/12 bg-bone/[0.04] px-3 py-2.5"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#82AAFF]/12 text-[#82AAFF]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 18V6l10-2v12" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="16" cy="16" r="3" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="truncate font-mono text-[clamp(0.74rem,0.9vw,0.92rem)] font-semibold text-bone/85">audio.mp3</p>
            <p className="font-mono text-[9px] tracking-[0.04em] text-bone/60 md:text-[10px]">320k · 21 MB</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function C15YoutubeDL() {
  return (
    <CaseScene
      scene="c15"
      act="CASE · 미디어를 만들다"
      cluster="D · 미디어를 만들다"
      num={15}
      title="유튜브 링크 → mp4 / mp3"
      oldTool="유료 다운로드 사이트 · 광고·바이러스"
      lead="링크만 주면 영상은 mp4, 소리는 mp3로. 화질 골라서."
      script={SCRIPT}
      Result={Result}
      resultTab="결과 파일"
    />
  );
}
