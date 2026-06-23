"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C18 — 영상 자막(SRT) 추출 + 번역 [CASE / 미디어를 만들다]
 * Result: media — 영상 플레이어 목업(자막 오버레이 + 재생바) + ko/en 두 칩 탭 +
 *   아래 자막 라인 4개(골드 타임스탬프 + 텍스트). whisper로 ko 추출 → en 번역.
 * 다른 사례와 구별점: "재생 중인 영상 플레이어 + SRT 타임코드 큐 리스트"가 패널의 주인공.
 */

const SCRIPT: ClineScript = {
  project: "subtitles",
  userPrompt:
    "이 강의 영상에서 한국어 자막 뽑고 영어로도 번역해서 SRT 두 개 만들어줘.",
  steps: [
    { kind: "run", label: "whisper 자막 추출", detail: "lecture.mp4 · 24:18 · ko" },
    { kind: "create", label: "ko.srt", detail: "342 cues · 타임코드 정렬" },
    { kind: "create", label: "en.srt (번역)", detail: "342 cues · KO → EN" },
  ],
};

/* SRT 큐 — 결정적(인덱스 기반), 렌더 중 랜덤/시간 미사용 */
type Cue = { ts: string; ko: string; en: string };
const CUES: Cue[] = [
  { ts: "00:01,2", ko: "자, 여기서부터 시작합니다.", en: "Alright, we begin right here." },
  { ts: "00:04,8", ko: "도구를 외우지 마세요.", en: "Don't memorize the tools." },
  { ts: "00:08,1", ko: "환경을 다루는 법을 익히세요.", en: "Learn to handle the environment." },
  { ts: "00:12,5", ko: "전부, VS Code 안에서.", en: "All of it, inside VS Code." },
];

function CueRow({
  cue,
  reveal,
  at,
  lang,
}: {
  cue: Cue;
  reveal: MotionValue<number>;
  at: number;
  lang: "ko" | "en";
}) {
  const o = useTransform(reveal, [at, at + 0.16], [0, 1]);
  const x = useTransform(reveal, [at, at + 0.16], [-10, 0]);
  return (
    <motion.div
      style={{ opacity: o, x }}
      className="flex items-baseline gap-2.5 border-b border-bone/[0.06] px-2.5 py-1.5 last:border-b-0"
    >
      <span className="shrink-0 font-mono text-[9px] tabular-nums text-gold md:text-[10px] [text-shadow:0_0_14px_rgba(232,181,75,0.4)]">
        {cue.ts}
      </span>
      <span className="min-w-0 flex-1 truncate font-body text-[9px] leading-snug text-bone/80 md:text-[11px]">
        {lang === "ko" ? cue.ko : cue.en}
      </span>
    </motion.div>
  );
}

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.16], [0, 1]);

  const playerO = useTransform(reveal, [0.1, 0.32], [0, 1]);
  const playerY = useTransform(reveal, [0.1, 0.32], [14, 0]);

  /* 재생바 진행(스크롤 직결) + 자막 오버레이 부드러운 등장 */
  const playW = useTransform(reveal, [0.18, 0.78], ["18%", "62%"]);
  const overlayO = useTransform(reveal, [0.26, 0.42], [0, 1]);

  const tabsO = useTransform(reveal, [0.42, 0.58], [0, 1]);
  const listO = useTransform(reveal, [0.5, 0.66], [0, 1]);
  const listY = useTransform(reveal, [0.5, 0.66], [14, 0]);

  return (
    <motion.div style={{ opacity: frameO }} className="absolute inset-0 flex flex-col gap-2.5 p-3">
      {/* 영상 플레이어 목업 */}
      <motion.div
        style={{ opacity: playerO, y: playerY }}
        className="relative overflow-hidden rounded-lg border border-bone/10 bg-[#08070B]"
      >
        {/* 16:9 무대 */}
        <div className="relative aspect-[16/9] w-full">
          {/* 무드 글로우 */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 70% at 50% 30%, rgba(232,181,75,0.10), transparent 70%)",
            }}
          />
          {/* 사운드 웨이브 — 결정적 높이 */}
          <div className="absolute inset-x-0 top-1/2 flex h-10 -translate-y-1/2 items-center justify-center gap-[3px] px-6">
            {Array.from({ length: 22 }).map((_, i) => {
              const h = 16 + ((i * 37) % 64);
              return (
                <span
                  key={i}
                  style={{ height: `${h}%` }}
                  className="w-[3px] shrink-0 rounded-full bg-bone/20"
                />
              );
            })}
          </div>
          {/* 재생 글리프 */}
          <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/25 bg-ink/50 backdrop-blur-sm">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 text-bone/80" aria-hidden>
              <path d="M7 4l13 8-13 8z" fill="currentColor" />
            </svg>
          </div>
          {/* whisper 라벨 */}
          <span className="absolute left-2.5 top-2.5 rounded-full border border-gold/30 bg-gold/[0.08] px-2 py-[2px] font-mono text-[7px] uppercase tracking-[0.22em] text-gold/80 md:text-[8px]">
            ● REC · whisper
          </span>
          {/* 자막 오버레이(영상 위) */}
          <motion.div
            style={{ opacity: overlayO }}
            className="absolute inset-x-0 bottom-9 flex justify-center px-4 text-center"
          >
            <span className="rounded bg-ink/70 px-2.5 py-1 font-body text-[10px] font-semibold leading-snug text-bone backdrop-blur-sm md:text-[12px] [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]">
              전부, VS Code 안에서.
            </span>
          </motion.div>
        </div>

        {/* 재생바 */}
        <div className="flex items-center gap-2 border-t border-bone/10 px-2.5 py-1.5">
          <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0 text-bone/70" aria-hidden>
            <path d="M7 4l13 8-13 8z" fill="currentColor" />
          </svg>
          <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-bone/15">
            <motion.div
              style={{ width: playW }}
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold to-gold-bright"
            />
          </div>
          <span className="shrink-0 font-mono text-[8px] tabular-nums text-bone/45 md:text-[9px]">
            12:04 / 24:18
          </span>
        </div>
      </motion.div>

      {/* ko / en 칩 탭 */}
      <motion.div style={{ opacity: tabsO }} className="flex items-center gap-1.5">
        <span className="rounded-md border border-gold/40 bg-gold/[0.10] px-2.5 py-1 font-mono text-[9px] font-bold tracking-[0.06em] text-gold md:text-[10px]">
          ko.srt
        </span>
        <span className="rounded-md border border-bone/12 bg-bone/[0.04] px-2.5 py-1 font-mono text-[9px] tracking-[0.06em] text-bone/55 md:text-[10px]">
          en.srt
        </span>
        <span className="ml-auto flex items-center gap-1 rounded-full bg-[#C3E88D]/[0.12] px-2 py-[2px] font-mono text-[7px] text-[#C3E88D] md:text-[8px]">
          <span className="h-1 w-1 rounded-full bg-[#C3E88D]" />
          342 cues · 동기화
        </span>
      </motion.div>

      {/* SRT 큐 리스트 (타임스탬프 + ko/en 병기) */}
      <motion.div
        style={{ opacity: listO, y: listY }}
        className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-bone/10 bg-[#0E0C12]"
      >
        <div className="flex items-center justify-between border-b border-bone/10 bg-bone/[0.02] px-2.5 py-1">
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone/40 md:text-[9px]">
            TIMECODE
          </span>
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone/40 md:text-[9px]">
            KO · EN
          </span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-center">
          {CUES.map((cue, i) => (
            <CueRow
              key={cue.ts}
              cue={cue}
              reveal={reveal}
              at={0.52 + i * 0.09}
              lang={i % 2 === 0 ? "ko" : "en"}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function C18Subtitle() {
  return (
    <CaseScene
      scene="c18"
      act="CASE · 미디어를 만들다"
      cluster="D · 미디어를 만들다"
      num={18}
      title="영상 자막(SRT) 추출+번역"
      oldTool="유료 자막 SaaS · 분당 과금"
      lead="영상에서 자막 뽑고, 번역까지. 유튜브 업로드용 SRT."
      script={SCRIPT}
      Result={Result}
      resultTab="ko.srt / en.srt"
    />
  );
}
