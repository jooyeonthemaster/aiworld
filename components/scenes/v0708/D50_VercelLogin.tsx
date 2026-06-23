"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D50 — vercel login [VSCodeMock editor + 터미널 + ClickRing]
 * 터미널에 `vercel login` 입력 → 방향키로 'Continue with GitHub' 선택 → 브라우저 허용 → Success!
 */

/** 에디터 본문: 로그인 안내 카드(터미널 위 빈 에디터 영역을 채움) */
function EditorBody({ reveal }: { reveal: MotionValue<number> }) {
  const browserO = useTransform(reveal, [0.46, 0.64], [0, 1]);
  const okO = useTransform(reveal, [0.62, 0.76], [0, 1]);
  // '허용함' 버튼 위 ClickRing — 버튼이 뜬 뒤(0.64~) 점등, 성공 직전(0.86) 퇴장
  const okRingO = useTransform(reveal, [0.64, 0.72, 0.82, 0.86], [0, 1, 1, 0]);
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-[clamp(1.2rem,2vw,2.2rem)] text-center">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold/70 md:text-[11px]">
        ▲ VERCEL CLI
      </span>
      <p className="font-display text-[clamp(1.05rem,1.6vw,1.7rem)] font-bold leading-tight text-bone/85">
        터미널에서 Vercel에 로그인
      </p>

      {/* 브라우저 인증 창(자동으로 열림) */}
      <motion.div
        style={{ opacity: browserO }}
        className="relative w-[78%] max-w-[420px] overflow-hidden rounded-lg border border-bone/15 bg-bone/[0.04]"
      >
        <div className="flex items-center gap-1.5 border-b border-bone/10 bg-bone/[0.05] px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-bone/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-bone/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-bone/25" />
          <span className="ml-1.5 truncate font-mono text-[9px] text-bone/40 md:text-[10px]">
            vercel.com/login/cli
          </span>
        </div>
        <div className="relative flex flex-col items-center gap-2 px-4 py-4">
          <p className="font-body text-[clamp(0.78rem,0.9vw,0.95rem)] text-bone/70">
            CLI 로그인을 허용할까요?
          </p>
          <motion.span
            style={{ opacity: okO }}
            className="inline-flex items-center gap-1.5 rounded-md bg-gold px-4 py-1.5 font-body text-[clamp(0.76rem,0.88vw,0.92rem)] font-bold text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 13l4 4L19 7" />
            </svg>
            허용함
          </motion.span>
          {/* 링 중심 = '허용함' 버튼 정중앙, 라벨은 우측 빈 여백으로 */}
          <ClickRing x={50} y={72} label="허용 클릭" dir="right" o={okRingO} />
        </div>
      </motion.div>

      <p className="font-mono text-[clamp(0.66rem,0.8vw,0.86rem)] text-bone/70">
        허용하면 터미널로 자동 복귀합니다
      </p>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.2], [0, 1]);
  // 비트: ① cmd 입력 → ② GitHub 선택 → ③ 허용함 버튼(EditorBody 내부) → 성공
  const cmdRingO = useTransform(reveal, [0.22, 0.32, 0.4, 0.46], [0, 1, 1, 0]);
  // GitHub 선택 링은 '허용함' 링 등장(0.6) 전에 퇴장 — 동시 점등 방지
  const ghRingO = useTransform(reveal, [0.44, 0.5, 0.56, 0.6], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[900px]">
      <VSCodeMock
        title="my-ai — VS Code"
        view="editor"
        activeIcon="explorer"
        terminalLines={[
          { p: ">", t: "vercel login" },
          { p: "?", t: "Log in to Vercel  > Continue with GitHub" },
          { p: "", t: "✔ Success! 로그인됨 (you@email.com)", gold: true },
        ]}
      >
        <EditorBody reveal={reveal} />
      </VSCodeMock>

      {/* ① vercel login 입력 줄 — 링 중심을 'vercel login' 줄 정중앙(px≈1020,750)에 픽셀 정렬.
          컨테이너(L889,T222,W774,H634) 기준 x=17(px≈1020), y=83(px≈748). 라벨은 위 빈 본문 쪽. */}
      <ClickRing x={17} y={83} label="입력 후 Enter" dir="up" o={cmdRingO} />
      {/* ② Continue with GitHub 선택 줄 — 링 중심을 'Continue with GitHub' 단어 중심(px≈1251,777)에 정렬.
          x=47(px≈1253), y=87(px≈774). 라벨은 위 빈 본문 쪽. */}
      <ClickRing x={47} y={87} label="GitHub 선택" dir="up" o={ghRingO} />
      {/* ③ '허용함' 버튼 ring은 EditorBody 내부(브라우저 다이얼로그)에 부착됨.
          Success! 줄은 클릭 대상이 아닌 출력 결과 → ClickRing 없이 골드 텍스트 자체로 강조. */}
    </motion.div>
  );
}

export default function D50VercelLogin() {
  return (
    <TutorialScene
      scene="d50"
      act="Vercel · 세상에 공개"
      chapter="Vercel · 세상에 공개"
      step={50}
      total={56}
      title="vercel login"
      goal="이번 단계: Vercel 로그인"
      platform="both"
      steps={[
        "터미널에 입력: vercel login",
        "방향키로 'Continue with GitHub' 선택 후 Enter",
        "브라우저가 열리면 허용 → 터미널에 Success! 가 뜬다",
      ]}
      success="터미널에 Success! 와 이메일이 표시된다"
      Mockup={Mockup}
    />
  );
}
