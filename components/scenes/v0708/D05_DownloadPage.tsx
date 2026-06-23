"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import BrowserMock from "@/components/ui/BrowserMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D05 — 다운로드 페이지로 [BrowserMock + ClickRing 견본]
 */
function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.25], [0, 1]);
  const btnO = useTransform(reveal, [0.25, 0.5], [0, 1]);
  const ringO = useTransform(reveal, [0.5, 0.75], [0, 1]);
  const dlO = useTransform(reveal, [0.78, 1], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[980px]">
      <BrowserMock url="code.visualstudio.com/download">
        <div className="flex flex-col items-center gap-5 px-6 py-[clamp(3rem,7vh,5.5rem)] text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold/70 md:text-[11px]">VISUAL STUDIO CODE</span>
          <p className="font-display font-black leading-tight text-bone text-[clamp(1.4rem,2.4vw,2.4rem)]">
            코드 에디터, 재정의하다
          </p>
          <p className="max-w-[80%] font-body text-[clamp(0.85rem,1vw,1.05rem)] text-bone/70">
            무료 · 오픈소스 · Microsoft
          </p>

          <motion.div style={{ opacity: btnO }} className="relative mt-3">
            <span className="inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-gold to-gold-bright px-7 py-3.5 font-body text-[clamp(0.95rem,1.2vw,1.25rem)] font-bold text-ink shadow-[0_0_40px_rgba(232,181,75,0.4)]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 4v12M7 11l5 5 5-5M5 20h14" />
              </svg>
              Download for Windows
            </span>
            <span className="mt-2 block font-mono text-[10px] tracking-[0.1em] text-bone/70 md:text-[11px]">Stable Build · .exe (64-bit)</span>
          </motion.div>

          {/* 다운로드 진행 표시(브라우저 하단) */}
          <motion.div style={{ opacity: dlO }} className="mt-5 w-[78%] rounded-lg border border-bone/12 bg-bone/[0.04] px-3 py-2">
            <div className="flex items-center justify-between font-mono text-[10px] text-bone/55 md:text-[11px]">
              <span className="truncate">VSCodeUserSetup-x64.exe</span>
              <span className="text-gold">받는 중…</span>
            </div>
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-bone/10">
              <div className="h-full w-2/3 rounded-full bg-bone/40" />
            </div>
          </motion.div>
        </div>
      </BrowserMock>
      <ClickRing x={50} y={63} label="여기 클릭" dir="up" o={ringO} />
    </motion.div>
  );
}

export default function D05DownloadPage() {
  return (
    <TutorialScene
      scene="d05"
      act="설치 · VS CODE"
      chapter="설치 · VS CODE"
      step={5}
      title="다운로드 페이지로"
      goal="이번 단계: 공식 사이트에서 VS Code 설치 파일 받기"
      platform="both"
      steps={[
        "브라우저(크롬·엣지) 주소창을 클릭한다",
        "code.visualstudio.com 을 입력하고 Enter",
        "'Download for Windows' 버튼을 한 번 클릭",
      ]}
      success="브라우저 하단(또는 '다운로드' 폴더)에 설치 파일이 생긴다"
      tip="Mac이면 버튼이 자동으로 'Download for Mac'으로 바뀐다 — 그걸 누르면 된다"
      Mockup={Mockup}
    />
  );
}
