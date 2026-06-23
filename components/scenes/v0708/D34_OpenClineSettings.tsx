"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D34 — Cline 설정 열기 [VSCodeMock editor 뷰 + Cline 패널]
 * 활동바 cline 로봇 아이콘 클릭 → Cline 패널 등장 → 상단 톱니(설정) 아이콘 클릭.
 */

/** 톱니(설정) 아이콘 — 진짜 코그휠(중앙 원 + 8노치 외곽). 색은 currentColor(부모가 제어) */
function GearIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

/** editor 본문에 들어가는 Cline 패널(상단 CLINE + 톱니 + 모델칩 + 입력영역). */
function ClinePanel({ reveal }: { reveal: MotionValue<number> }) {
  const panelO = useTransform(reveal, [0.28, 0.46], [0, 1]);
  const panelX = useTransform(reveal, [0.28, 0.46], [26, 0]);
  // 톱니는 링 점등 구간(gearRing 0.62~0.82와 동기)에서만 골드+글로우 — 상시 글로우 제거(골드 포커스 1개 원칙)
  const gearFilter = useTransform(reveal, [0.62, 0.82], [0, 1], { clamp: true });
  const gearShadow = useTransform(gearFilter, (v) => `drop-shadow(0 0 ${10 * v}px rgba(232,181,75,${0.7 * v}))`);
  const gearColor = useTransform(gearFilter, (v) => (v > 0.5 ? "#E8B54B" : "rgba(245,239,224,0.55)"));
  return (
    <motion.div style={{ opacity: panelO, x: panelX }} className="flex h-full flex-col bg-[#0B0A0F]">
      {/* 패널 헤더: CLINE + 우측 아이콘들(톱니) */}
      <div className="flex items-center justify-between border-b border-bone/10 bg-[#0C0A11] px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="4" y="7" width="16" height="11" rx="3" />
            <circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
            <path d="M12 3.5V7" />
          </svg>
          <span className="font-mono text-[clamp(0.72rem,0.85vw,0.92rem)] uppercase tracking-[0.22em] text-bone/70">CLINE</span>
        </div>
        <div className="flex items-center gap-3.5">
          {/* + 새 작업 */}
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-bone/40" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
          {/* 기록 */}
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-bone/40" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 4v4h4" /><path d="M12 8v4l3 2" />
          </svg>
          {/* 톱니 = 설정 (클릭 타깃) — 평소 bone/55, 링 점등 구간에만 골드+글로우 */}
          <motion.span style={{ filter: gearShadow, color: gearColor }} className="relative inline-flex">
            <GearIcon />
          </motion.span>
        </div>
      </div>

      {/* 본문: 모델칩 + 안내 + 입력창 */}
      <div className="flex min-h-0 flex-1 flex-col justify-between p-[clamp(1rem,1.6vw,1.7rem)]">
        <div className="flex flex-col items-center gap-3 pt-[clamp(0.5rem,2vh,1.6rem)] text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="4" y="7" width="16" height="11" rx="3" />
              <circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
              <circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
              <path d="M12 3.5V7" />
            </svg>
          </div>
          <p className="font-display text-[clamp(1rem,1.4vw,1.4rem)] font-bold text-bone/80">무엇을 만들어 드릴까요?</p>
          {/* 모델칩 */}
          <span className="inline-flex items-center gap-2 rounded-full border border-bone/15 bg-bone/[0.04] px-3 py-1 font-mono text-[clamp(0.68rem,0.82vw,0.88rem)] text-bone/55">
            <span className="h-1.5 w-1.5 rounded-full bg-bone/30" />
            모델: 아직 연결 안 됨
          </span>
        </div>

        {/* 입력창(비활성 느낌) */}
        <div className="rounded-lg border border-bone/12 bg-bone/[0.03] px-3.5 py-3">
          <p className="font-body text-[clamp(0.78rem,0.92vw,0.98rem)] text-bone/35">메시지를 입력하세요…</p>
        </div>
      </div>
    </motion.div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.2], [0, 1]);
  const robotRingO = useTransform(reveal, [0.16, 0.34, 0.5, 0.6], [0, 1, 1, 0]);
  const gearRingO = useTransform(reveal, [0.62, 0.82], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[920px]">
      <VSCodeMock title="my-ai — VS Code" view="editor" activeIcon="cline">
        <ClinePanel reveal={reveal} />
      </VSCodeMock>

      {/* ① 활동바의 Cline 로봇 아이콘 (클릭 → 패널 열림) */}
      <motion.div style={{ opacity: robotRingO }}>
        <ClickRing x={2.5} y={37} label="Cline 아이콘" dir="right" size={34} />
      </motion.div>

      {/* ② 패널 상단 우측 끝의 톱니(설정) 아이콘 — 링 중심을 코그휠 정중앙에. 라벨은 아래 빈 본문으로 */}
      <ClickRing x={96.3} y={9.2} label="설정(톱니)" dir="down" o={gearRingO} />
    </motion.div>
  );
}

export default function D34OpenClineSettings() {
  return (
    <TutorialScene
      scene="d34"
      act="API 키 · AI 연결"
      chapter="API 키 · AI 연결"
      step={34}
      total={56}
      title="Cline 설정 열기"
      goal="이번 단계: Cline 설정 화면 열기"
      platform="both"
      steps={[
        "왼쪽 활동바에서 Cline 로봇 아이콘을 클릭",
        "Cline 패널이 열린다",
        "패널 위쪽의 톱니(⚙ Settings) 아이콘을 클릭",
      ]}
      success="Cline 설정 화면이 열린다"
      Mockup={Mockup}
    />
  );
}
