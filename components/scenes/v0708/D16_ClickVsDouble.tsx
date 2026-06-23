"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D16 — 클릭 vs 더블클릭 [자체 비교 다이어그램]
 * 좌: 한 번 클릭 = 선택(파란 하이라이트, 안 들어감) / 우: 더블클릭 = 열림(창 등장).
 * VSCodeMock 대신 div/svg로 직접 그린 좌우 2패널. 토큰 색만 사용.
 */

const BLUE = "#82AAFF"; // 선택 하이라이트(팁 블루 토큰)

/* 폴더 아이콘 */
function FolderGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path
        d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        opacity="0.9"
      />
    </svg>
  );
}

/* 파일 아이콘 (문서, 모서리 접힘) */
function FileGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M6 3h7l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
        fill="currentColor"
        opacity="0.22"
      />
      <path
        d="M6 3h7l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      <path d="M13 3v5h5" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" />
    </svg>
  );
}

/* 마우스 + 클릭 횟수 표시 */
function MouseHint({ clicks, tone }: { clicks: 1 | 2; tone: "blue" | "gold" }) {
  const accent = tone === "gold" ? "var(--color-gold,#e8b54b)" : BLUE;
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 24 36" className="h-9 w-6" fill="none" aria-hidden>
        <rect x="2" y="2" width="20" height="32" rx="10" stroke="currentColor" strokeWidth={1.6} className="text-bone/70" />
        <rect x="2.5" y="2.5" width="9.5" height="13" rx="5" fill={accent} opacity="0.9" />
        <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth={1.4} className="text-bone/50" />
      </svg>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: clicks }).map((_, i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}` }}
          />
        ))}
        <span className="ml-1 font-mono text-[clamp(0.66rem,0.8vw,0.82rem)] font-bold tracking-[0.16em]" style={{ color: accent }}>
          {clicks === 1 ? "×1" : "×2 빠르게"}
        </span>
      </div>
    </div>
  );
}

/* 좌측 패널 — 한 번 클릭 = 선택 */
function SelectPanel({ reveal }: { reveal: MotionValue<number> }) {
  const hiO = useTransform(reveal, [0.34, 0.5], [0, 1]);
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-bone/12 bg-coal/70 p-[clamp(0.9rem,1.4vw,1.5rem)]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[clamp(0.66rem,0.82vw,0.85rem)] uppercase tracking-[0.22em]" style={{ color: BLUE }}>
          한 번 클릭
        </span>
        <span className="rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ borderColor: `${BLUE}55`, color: BLUE }}>
          선택
        </span>
      </div>

      {/* 바탕화면 미니 무대 — 들어가지 않고 아이콘만 강조됨 */}
      <div className="relative mt-3 flex flex-1 items-center justify-center rounded-lg border border-bone/8 bg-ink/60">
        <div className="flex w-[78px] flex-col items-center gap-1.5">
          {/* 선택 하이라이트 박스(아이콘+이름표를 감싼다 — 들어가지 않음) */}
          <div className="relative flex flex-col items-center gap-1.5 rounded-md px-2 py-2">
            <motion.span
              style={{ opacity: hiO, backgroundColor: `${BLUE}22`, boxShadow: `inset 0 0 0 1.5px ${BLUE}` }}
              className="absolute inset-0 rounded-md"
              aria-hidden
            />
            <FolderGlyph className="relative h-[clamp(2.6rem,4.4vw,3.4rem)] w-[clamp(2.6rem,4.4vw,3.4rem)] text-bone/75" />
            <motion.span
              style={{ opacity: hiO, backgroundColor: `${BLUE}` }}
              className="relative rounded px-1.5 py-0.5 font-mono text-[10px] text-ink"
            >
              my-ai
            </motion.span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <MouseHint clicks={1} tone="blue" />
        <span className="font-body text-[clamp(0.78rem,1vw,1.05rem)] text-bone/70">
          파랗게 강조 · <span className="font-semibold" style={{ color: BLUE }}>안 들어감</span>
        </span>
      </div>
    </div>
  );
}

/* 우측 패널 — 더블클릭 = 열림 */
function OpenPanel({ reveal }: { reveal: MotionValue<number> }) {
  const winO = useTransform(reveal, [0.5, 0.68], [0, 1]);
  const winY = useTransform(reveal, [0.5, 0.68], [16, 0]);
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-gold/25 bg-coal/70 p-[clamp(0.9rem,1.4vw,1.5rem)]">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[clamp(0.66rem,0.82vw,0.85rem)] uppercase tracking-[0.22em] text-gold">
          더블클릭
        </span>
        <span className="rounded-full border border-gold/45 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
          열기 · 실행
        </span>
      </div>

      {/* 바탕화면 미니 무대 — 위의 폴더를 더블클릭하면 아래로 창이 떠오름 */}
      <div className="relative mt-3 flex flex-1 flex-col items-center justify-start gap-[clamp(0.7rem,2vh,1.4rem)] rounded-lg border border-bone/8 bg-ink/60 px-3 pt-[clamp(0.9rem,3vh,2rem)] pb-3">
        {/* 더블클릭 타깃 = 닫힌 폴더(여기에 링이 붙는다) */}
        <div className="relative flex flex-col items-center gap-1.5">
          <FolderGlyph className="h-[clamp(2.6rem,4.4vw,3.4rem)] w-[clamp(2.6rem,4.4vw,3.4rem)] text-gold" />
          <span className="rounded bg-gold/20 px-1.5 py-0.5 font-mono text-[10px] text-bone">my-ai</span>
        </div>

        {/* 열린 폴더 창 — 폴더 아래로 떠오름 */}
        <motion.div
          style={{ opacity: winO, y: winY }}
          className="w-[clamp(220px,80%,340px)] overflow-hidden rounded-lg border border-bone/15 bg-coal shadow-[0_18px_44px_rgba(0,0,0,0.55)]"
        >
          <div className="flex items-center gap-1.5 border-b border-bone/10 bg-bone/[0.04] px-2.5 py-1.5">
            <span className="h-2 w-2 rounded-full bg-ember/70" />
            <span className="h-2 w-2 rounded-full bg-bone/30" />
            <span className="h-2 w-2 rounded-full bg-bone/30" />
            <span className="ml-1.5 truncate font-mono text-[10px] text-bone/70">my-ai</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2.5 px-3.5 py-3.5">
            {[
              { n: "src", isFolder: true },
              { n: "README.md", isFolder: false },
              { n: "index.html", isFolder: false },
            ].map((it) => (
              <span key={it.n} className="flex w-[60px] flex-col items-center gap-1">
                {it.isFolder ? (
                  <FolderGlyph className="h-7 w-7 text-bone/70" />
                ) : (
                  <FileGlyph className="h-7 w-7 text-bone/70" />
                )}
                <span className="truncate font-mono text-[9px] text-bone/70">{it.n}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <MouseHint clicks={2} tone="gold" />
        <span className="font-body text-[clamp(0.78rem,1vw,1.05rem)] text-bone/70">
          폴더로 <span className="font-semibold text-gold">들어감 / 열림</span>
        </span>
      </div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.2], [0, 1]);
  const rightRingO = useTransform(reveal, [0.4, 0.58], [0, 1]);
  const btnsO = useTransform(reveal, [0.84, 1], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[1080px]">
      <div className="grid grid-cols-2 gap-[clamp(0.9rem,1.6vw,1.6rem)]" style={{ minHeight: "clamp(360px,46vh,560px)" }}>
        <div className="relative">
          <SelectPanel reveal={reveal} />
        </div>
        <div className="relative">
          <OpenPanel reveal={reveal} />
          {/* 더블클릭 타깃(닫힌 폴더) 위에 링 — 라벨 칩은 오른쪽 빈 공간으로 */}
          <ClickRing x={50} y={24} label="더블클릭" dir="right" o={rightRingO} />
        </div>
      </div>

      {/* 좌·우 버튼 비교 띠 */}
      <motion.div
        style={{ opacity: btnsO }}
        className="mt-[clamp(0.9rem,1.8vh,1.6rem)] flex items-center justify-center gap-[clamp(1rem,2vw,2rem)] rounded-xl border border-bone/12 bg-coal/60 px-5 py-3.5"
      >
        <span className="flex items-center gap-2 font-body text-[clamp(0.8rem,1.05vw,1.1rem)] text-bone/80">
          <span className="font-mono text-[clamp(0.7rem,0.85vw,0.9rem)] font-bold uppercase tracking-[0.16em]" style={{ color: BLUE }}>
            왼쪽 버튼
          </span>
          선택 · 열기
        </span>
        <span className="h-5 w-px bg-bone/20" aria-hidden />
        <span className="flex items-center gap-2 font-body text-[clamp(0.8rem,1.05vw,1.1rem)] text-bone/80">
          <span className="font-mono text-[clamp(0.7rem,0.85vw,0.9rem)] font-bold uppercase tracking-[0.16em] text-bone/70">
            오른쪽 버튼
          </span>
          메뉴(우클릭)
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function D16ClickVsDouble() {
  return (
    <TutorialScene
      scene="d16"
      act="폴더 · 작업공간"
      chapter="폴더 · 작업공간"
      step={16}
      total={56}
      title="클릭 vs 더블클릭"
      goal="이번 단계: 가장 헷갈리는 한 번 클릭과 두 번 클릭의 차이"
      platform="both"
      steps={[
        "한 번 클릭 = 선택(아이콘이 파랗게 강조됨, 들어가지 않음)",
        "두 번 빠르게 클릭(더블클릭) = 열기/실행(폴더로 들어가거나 파일이 열림)",
        "마우스 왼쪽 버튼 = 선택·열기 / 오른쪽 버튼 = 메뉴(우클릭)",
      ]}
      success={'이제 "클릭"과 "더블클릭"을 구분할 수 있다'}
      Mockup={Mockup}
    />
  );
}
