"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D35 — Provider + 키 붙여넣기 [VSCodeMock settings(Cline) 폼]
 * 화면 → Provider 드롭다운(OpenRouter) → API Key 칸 채워짐 → ClickRing → 연결 준비.
 */
function ClineSettings({ reveal }: { reveal: MotionValue<number> }) {
  const provO = useTransform(reveal, [0.22, 0.4], [0, 1]);
  const keyFillO = useTransform(reveal, [0.5, 0.66], [0, 1]);
  const placeholderO = useTransform(reveal, [0.5, 0.6], [1, 0]);
  const readyO = useTransform(reveal, [0.82, 0.96], [0, 1]);

  return (
    <div className="flex h-full flex-col gap-[clamp(0.9rem,1.6vh,1.5rem)] p-[clamp(1.1rem,1.8vw,2rem)]">
      {/* 헤더 */}
      <div className="flex items-center gap-3 border-b border-bone/10 pb-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/30 bg-gold/10">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="4" y="7" width="16" height="11" rx="3" />
            <circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
            <path d="M12 3.5V7" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="font-display text-[clamp(1rem,1.4vw,1.4rem)] font-bold text-bone">Cline 설정</p>
          <p className="font-mono text-[clamp(0.68rem,0.82vw,0.88rem)] text-bone/60">API Configuration</p>
        </div>
      </div>

      {/* API Provider 드롭다운 */}
      <div className="flex flex-col gap-2">
        <label className="font-body text-[clamp(0.78rem,0.94vw,1rem)] font-semibold text-bone/75">API Provider</label>
        <motion.div
          style={{ opacity: provO }}
          className="flex items-center justify-between rounded-lg border border-bone/20 bg-bone/[0.04] px-3.5 py-2.5"
        >
          <span className="font-body text-[clamp(0.85rem,1vw,1.1rem)] font-bold text-bone/85">OpenRouter</span>
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-bone/50" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </div>

      {/* OpenRouter API Key 입력칸 */}
      <div className="relative flex flex-col gap-2">
        <label className="font-body text-[clamp(0.78rem,0.94vw,1rem)] font-semibold text-bone/75">OpenRouter API Key</label>
        <div className="flex items-center justify-between rounded-lg border border-bone/20 bg-[#08070B] px-3.5 py-2.5">
          <span className="relative font-mono text-[clamp(0.82rem,0.98vw,1.05rem)]">
            <motion.span style={{ opacity: placeholderO }} className="text-bone/30">키를 여기에 붙여넣기 (Ctrl+V)</motion.span>
            <motion.span style={{ opacity: keyFillO }} className="absolute left-0 top-0 whitespace-nowrap text-bone/85">
              sk-or-v1-••••••••••••••••
            </motion.span>
          </span>
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-bone/35" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
        </div>
      </div>

      {/* 하단 안내 + 연결 준비 */}
      <div className="mt-auto flex items-center justify-between border-t border-bone/10 pt-3">
        <p className="max-w-[62%] font-body text-[clamp(0.72rem,0.86vw,0.92rem)] leading-snug text-bone/65">
          키는 이 기기에만 저장됩니다 · openrouter.ai/keys
        </p>
        <motion.span
          style={{ opacity: readyO }}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 font-body text-[clamp(0.74rem,0.88vw,0.95rem)] font-bold text-gold"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 13l4 4L19 7" />
          </svg>
          연결 준비됨
        </motion.span>
      </div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.2], [0, 1]);
  const ringO = useTransform(reveal, [0.66, 0.86], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[880px]">
      <VSCodeMock title="my-ai — VS Code" view="settings" activeIcon="cline">
        <ClineSettings reveal={reveal} />
      </VSCodeMock>
      {/* 링 중심점 = API Key 입력칸 'sk-or-v1' 텍스트 정중앙(창 높이 ~47%). dir='down'으로 칩은 칸 아래 빈 공간(어떤 텍스트도 없음)으로 */}
      <ClickRing x={24} y={47} label="Ctrl+V 붙여넣기" dir="down" o={ringO} />
    </motion.div>
  );
}

export default function D35PasteKey() {
  return (
    <TutorialScene
      scene="d35"
      act="API 키 · AI 연결"
      chapter="API 키 · AI 연결"
      step={35}
      total={56}
      title="Provider + 키 붙여넣기"
      goal="이번 단계: OpenRouter 고르고 키 붙여넣기"
      platform="both"
      steps={[
        "'API Provider' 드롭다운에서 OpenRouter 선택",
        "'OpenRouter API Key' 칸을 클릭",
        "Ctrl + V 로 복사한 키를 붙여넣기",
      ]}
      success="키가 입력되고 연결 준비가 된다"
      warn="붙여넣은 키 양끝에 공백/따옴표가 없는지 확인(한 줄로)"
      Mockup={Mockup}
    />
  );
}
