"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import BrowserMock from "@/components/ui/BrowserMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D48 — Vercel 가입 (Continue with GitHub) [BrowserMock + ClickRing]
 */
function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.22], [0, 1]);
  const cardO = useTransform(reveal, [0.22, 0.44], [0, 1]);
  const ringO = useTransform(reveal, [0.5, 0.72], [0, 1]);
  const authO = useTransform(reveal, [0.78, 1], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[880px]">
      <BrowserMock url="vercel.com/signup">
        <div className="flex flex-col items-center gap-5 px-6 py-[clamp(2rem,5vh,4rem)] text-center">
          {/* Vercel 로고 (삼각형) + 워드마크 */}
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-bone" fill="currentColor" aria-hidden>
              <path d="M12 3 22 20H2z" />
            </svg>
            <span className="font-display text-[clamp(1rem,1.3vw,1.35rem)] font-black tracking-tight text-bone">
              Vercel
            </span>
          </div>

          <p className="font-display font-black leading-tight text-bone text-[clamp(1.35rem,2.3vw,2.3rem)]">
            계정 만들기
          </p>
          <p className="max-w-[80%] font-body text-[clamp(0.85rem,1vw,1.05rem)] text-bone/50">
            가장 빠른 방법으로 시작하세요
          </p>

          {/* 가입 카드 */}
          <motion.div
            style={{ opacity: cardO }}
            className="mt-1 flex w-[min(380px,86%)] flex-col gap-3 rounded-2xl border border-bone/12 bg-bone/[0.03] p-5"
          >
            {/* Continue with GitHub — 골드 큰 버튼(클릭 타깃) */}
            <span className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-gold to-gold-bright px-6 py-3.5 font-body text-[clamp(0.92rem,1.15vw,1.2rem)] font-bold text-ink shadow-[0_0_40px_rgba(232,181,75,0.4)]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.04 10.04 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
              </svg>
              Continue with GitHub
            </span>

            {/* Continue with Email — 보조 버튼 */}
            <span className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-bone/20 bg-bone/[0.04] px-6 py-3 font-body text-[clamp(0.85rem,1.05vw,1.1rem)] font-semibold text-bone/70">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              Continue with Email
            </span>
          </motion.div>

          {/* GitHub 권한 허용 미니 다이얼로그 (성공 연출) */}
          <motion.div
            style={{ opacity: authO }}
            className="mt-1 flex w-[min(380px,86%)] items-center gap-3 rounded-lg border border-gold/30 bg-gold/[0.06] px-3.5 py-2.5 text-left"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 13l4 4L19 7" />
            </svg>
            <div className="min-w-0">
              <p className="font-body text-[clamp(0.78rem,0.9vw,0.95rem)] font-semibold text-bone/90">
                Authorize Vercel
              </p>
              <p className="font-mono text-[10px] tracking-[0.05em] text-bone/45 md:text-[11px]">
                GitHub 권한 허용 → 로그인 완료
              </p>
            </div>
          </motion.div>
        </div>
      </BrowserMock>
      <ClickRing x={50} y={61} label="여기 클릭" dir="up" o={ringO} />
    </motion.div>
  );
}

export default function D48VercelSignup() {
  return (
    <TutorialScene
      scene="d48"
      act="Vercel · 세상에 공개"
      chapter="Vercel · 세상에 공개"
      step={48}
      total={56}
      title="Vercel 가입"
      goal="이번 단계: Vercel 가입(GitHub 연동)"
      platform="both"
      steps={[
        "주소창에 vercel.com 을 입력하고 우측 위 [Sign Up]을 클릭",
        "'Continue with GitHub'를 클릭한다 (아까 만든 깃허브로)",
        "GitHub 권한 허용 화면에서 'Authorize Vercel'을 클릭",
      ]}
      success="GitHub로 Vercel에 가입·로그인된다"
      Mockup={Mockup}
    />
  );
}
