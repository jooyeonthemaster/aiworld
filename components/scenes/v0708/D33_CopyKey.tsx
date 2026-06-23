"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D33 — 공용 수업용 키 복사 [자체 카드 목업: '수업 자료' + 선택 하이라이트 + 복사됨 토스트]
 */
function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const cardO = useTransform(reveal, [0, 0.2], [0, 1]);
  // 파란 선택 하이라이트가 키 위로 쓸려 지나간다(드래그 선택 연출)
  const selW = useTransform(reveal, [0.28, 0.5], ["0%", "100%"]);
  const ringO = useTransform(reveal, [0.5, 0.72], [0, 1]);
  // 복사됨 토스트 등장
  const toastO = useTransform(reveal, [0.78, 0.94], [0, 1]);
  const toastY = useTransform(reveal, [0.78, 0.94], [12, 0]);

  return (
    <motion.div style={{ opacity: cardO }} className="relative w-full max-w-[960px]">
      {/* '수업 자료' 카드 */}
      <div className="overflow-hidden rounded-2xl border border-bone/12 bg-coal/80 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-sm">
        {/* 카드 헤더 */}
        <div className="flex items-center gap-3 border-b border-bone/10 bg-bone/[0.03] px-[clamp(1.6rem,2.4vw,2.6rem)] py-[clamp(1rem,2vh,1.4rem)]">
          <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-gold md:h-7 md:w-7" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
            <path d="M13 3v5h5" />
          </svg>
          <span className="font-body text-[clamp(1.05rem,1.3vw,1.4rem)] font-semibold text-bone/90">수업 자료</span>
          <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.22em] text-bone/70 md:text-[12px]">공용 키</span>
        </div>

        {/* 카드 본문 */}
        <div className="px-[clamp(1.6rem,2.8vw,2.8rem)] py-[clamp(2.4rem,5vh,4rem)]">
          <p className="font-body text-[clamp(0.95rem,1.15vw,1.25rem)] leading-relaxed text-bone/75">
            아래 키를 복사해서 Cline에 붙여넣으세요.
          </p>

          {/* 키 라벨 + 박스 */}
          <div className="mt-6 flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone/70 md:text-[12px]">OPENROUTER API KEY</span>
          </div>
          <div className="relative mt-3 rounded-xl border border-bone/12 bg-ink/60 px-[clamp(1.2rem,1.8vw,1.8rem)] py-[clamp(1.4rem,3vh,2.2rem)]">
            {/* 파란 선택 하이라이트(드래그가 쓸고 지나가는 연출) */}
            <motion.span
              style={{ width: selW }}
              className="pointer-events-none absolute inset-y-[clamp(0.7rem,1.6vh,1.3rem)] left-[clamp(1.2rem,1.8vw,1.8rem)] z-0 rounded-[5px] bg-[#3b82f6]/45 ring-1 ring-[#60a5fa]/60"
            />
            <code className="relative z-10 block break-all font-mono text-[clamp(1.1rem,1.8vw,1.95rem)] font-semibold tracking-tight text-bone">
              sk-or-v1-a1b2c3<span className="text-bone/55">••••••••••••••••</span>
            </code>
          </div>

          <p className="mt-4 flex items-center gap-2 font-body text-[clamp(0.85rem,1.05vw,1.1rem)] text-bone/70">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#27C93F]" />
            sk-or-v1- 로 시작하면 OpenRouter 키가 맞습니다.
          </p>

          {/* 하단 안내 칩 — 카드 세로 매스 보강(상단 공백 흡수) */}
          <div className="mt-[clamp(1.6rem,3.5vh,2.6rem)] flex flex-wrap gap-2.5 border-t border-bone/10 pt-[clamp(1.4rem,3vh,2.2rem)]">
            {["수업 자료·채팅에서 받기", "세 번 클릭 = 전체 선택", "Ctrl + C / ⌘ + C"].map((t) => (
              <span key={t} className="whitespace-nowrap rounded-full border border-bone/15 bg-bone/[0.03] px-4 py-2 font-mono text-[11px] text-bone/70 md:text-[12px]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 키 위 클릭 링: 전체 선택 → 복사 (중심점=키 박스 중앙, 라벨은 위쪽 빈 공간으로) */}
      <motion.div style={{ opacity: ringO }}>
        <ClickRing x={24} y={51} label="전체 선택 → 복사" dir="up" />
      </motion.div>

      {/* '복사됨 ✓' 토스트 */}
      <motion.div
        style={{ opacity: toastO, y: toastY }}
        className="absolute -bottom-5 right-5 z-30 flex items-center gap-2 rounded-full border border-gold/40 bg-coal/95 px-4 py-2 shadow-[0_0_30px_rgba(232,181,75,0.3)] backdrop-blur-sm"
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold">
          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 text-ink" fill="none" stroke="currentColor" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <span className="font-body text-[clamp(0.78rem,0.9vw,0.95rem)] font-bold text-gold">복사됨 ✓</span>
      </motion.div>
    </motion.div>
  );
}

export default function D33CopyKey() {
  return (
    <TutorialScene
      scene="d33"
      act="API 키 · AI 연결"
      chapter="API 키 · AI 연결"
      step={33}
      total={56}
      title="공용 수업용 키 복사"
      goal="이번 단계: 선생님이 준 키를 복사"
      platform="both"
      steps={[
        "선생님이 준 키(sk-or-v1-… 로 시작)를 연다 (수업 자료·채팅)",
        "키 전체를 드래그하거나, 키를 세 번 클릭해 전체 선택",
        "Ctrl + C 로 복사 (Mac은 ⌘ + C)",
      ]}
      success="키가 복사되어 붙여넣을 준비가 된다"
      warn="키 앞뒤에 공백이나 따옴표가 섞이지 않게 — 전체만 깔끔히 복사"
      Mockup={Mockup}
    />
  );
}
