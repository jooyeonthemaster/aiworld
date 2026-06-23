"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D12 — 확장 패널 여는 법 [VSCodeMock extensions 뷰 + 활동바 ClickRing]
 * 활동바의 '확장' 아이콘(네모 4개)을 클릭 → 왼쪽에 확장 검색창이 열린다.
 */

/** 확장 패널 본문(빈 상태) — 검색 안내 + 단축키 칩. (Mockup 본문 children) */
function ExtensionsEmpty({ reveal }: { reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0.5, 0.74], [0, 1]);
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-[clamp(1.4rem,3vw,3rem)] text-center">
      <motion.div
        style={{ opacity: o }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/30 bg-gold/[0.07]"
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-gold" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h6v6h-6z" />
        </svg>
      </motion.div>
      <motion.p style={{ opacity: o }} className="font-display text-[clamp(1.1rem,1.6vw,1.7rem)] font-bold text-bone/80">
        확장 마켓플레이스
      </motion.p>
      <motion.p style={{ opacity: o }} className="max-w-[80%] font-body text-[clamp(0.85rem,1vw,1.1rem)] leading-relaxed text-bone/70">
        왼쪽 검색창에 확장 이름을 입력하면
        <br />
        설치할 수 있는 도구들이 나타납니다.
      </motion.p>
      <motion.span
        style={{ opacity: o }}
        className="mt-1 inline-flex items-center gap-2 rounded-full border border-bone/15 bg-bone/[0.04] px-3.5 py-1.5 font-mono text-[clamp(0.72rem,0.86vw,0.92rem)] text-bone/55"
      >
        단축키
        <kbd className="rounded border border-bone/20 bg-bone/10 px-1.5 py-0.5 text-bone/80">Ctrl</kbd>
        <span className="text-bone/35">+</span>
        <kbd className="rounded border border-bone/20 bg-bone/10 px-1.5 py-0.5 text-bone/80">Shift</kbd>
        <span className="text-bone/35">+</span>
        <kbd className="rounded border border-gold/40 bg-gold/15 px-1.5 py-0.5 text-gold">X</kbd>
      </motion.span>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  // 화면 등장 → 활동바 클릭링 → 검색창 강조(성공) 순서
  const winO = useTransform(reveal, [0, 0.22], [0, 1]);
  const ringO = useTransform(reveal, [0.26, 0.5], [0, 1]);
  const searchGlow = useTransform(reveal, [0.54, 0.78], [0, 1]);
  const searchScale = useTransform(reveal, [0.54, 0.78], [0.96, 1]);
  const successO = useTransform(reveal, [0.8, 1], [0, 1]);

  return (
    <motion.div style={{ opacity: winO }} className="relative w-full max-w-[880px]">
      <VSCodeMock
        title="my-ai — VS Code"
        view="extensions"
        activeIcon="extensions"
        search=""
        extResults={[]}
      >
        <ExtensionsEmpty reveal={reveal} />
      </VSCodeMock>

      {/* 검색창 강조 — 사이드패널 최상단 실제 검색 입력칸 위에 골드 글로우 테두리 */}
      <motion.div
        style={{ opacity: searchGlow, scale: searchScale }}
        className="pointer-events-none absolute left-[6%] top-[8.4%] z-20 h-[4.6%] w-[27%] rounded-md border-2 border-gold"
      >
        <span className="absolute inset-0 rounded-md" style={{ boxShadow: "0 0 26px rgba(232,181,75,0.55)" }} />
      </motion.div>

      {/* '여기 나타남' 성공 라벨 (실제 검색칸 오른쪽 빈 공간) */}
      <motion.span
        style={{ opacity: successO }}
        className="pointer-events-none absolute left-[35%] top-[8.2%] z-30 whitespace-nowrap rounded-full border border-gold/50 bg-gold/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gold backdrop-blur-sm md:text-[11px]"
      >
        검색창 등장 ✓
      </motion.span>

      {/* 클릭 타깃 — 활동바 5번째 '확장' 아이콘(네모 4개) 정중앙 */}
      <ClickRing x={2.6} y={36.3} label="extensions 아이콘" dir="right" o={ringO} />
    </motion.div>
  );
}

export default function D12OpenExtensions() {
  return (
    <TutorialScene
      scene="d12"
      act="첫 화면 · 한국어"
      chapter="첫 화면 · 한국어"
      step={12}
      total={56}
      title="확장 패널 여는 법"
      goal="이번 단계: 확장(앱 추가) 패널 열기"
      platform="both"
      steps={[
        "왼쪽 활동바에서 네모 4개 모양 아이콘을 찾는다",
        "그 아이콘을 한 번 클릭한다",
        "(단축키) 또는 Ctrl + Shift + X 를 눌러도 열린다",
      ]}
      success="왼쪽에 확장 검색창이 나타난다"
      tip="Mac은 Ctrl 대신 ⌘(Command) — ⌘ + Shift + X"
      Mockup={Mockup}
    />
  );
}
