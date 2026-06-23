"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import OsDialog from "@/components/ui/OsDialog";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D06 — 받은 파일 찾기 + 실행 [OsDialog(UAC) + 다운로드 파일 더블클릭 견본]
 * 흐름: ① 다운로드한 VSCodeUserSetup.exe 더블클릭 → ② '이 앱이 디바이스를 변경'(UAC) → [예]
 */

/** 다운로드한 설치 파일 아이콘(브라우저 다운로드 칩 느낌) — 더블클릭 타깃 */
function DownloadFile({ reveal }: { reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0.04, 0.2], [0, 1]);
  return (
    <motion.div
      style={{ opacity: o }}
      className="flex w-fit items-center gap-3 rounded-xl border border-bone/15 bg-[#14121A] px-4 py-3 shadow-[0_24px_70px_rgba(0,0,0,0.55)]"
    >
      {/* VS Code 무한 리본 마크 */}
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gold/25 bg-gold/10">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" aria-hidden>
          <path d="M17 3.5 9 12l8 8.5V3.5Z" fill="currentColor" opacity="0.9" stroke="none" />
          <path d="M9 12 4 8v8l5-4Z" fill="currentColor" opacity="0.55" stroke="none" />
        </svg>
      </span>
      <div className="min-w-0">
        <p className="font-body text-[clamp(0.82rem,0.98vw,1.02rem)] font-semibold text-bone">VSCodeUserSetup-x64.exe</p>
        <p className="mt-0.5 font-mono text-[10px] tracking-[0.04em] text-bone/70 md:text-[11px]">다운로드 · 방금 전 · 응용 프로그램</p>
      </div>
    </motion.div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.16], [0, 1]);
  // ① 파일 더블클릭 링: 등장 후 다이얼로그가 뜨면 사라짐
  const fileRingO = useTransform(reveal, [0.2, 0.34, 0.5, 0.58], [0, 1, 1, 0]);
  // 연결선(파일 → 다이얼로그)
  const linkO = useTransform(reveal, [0.36, 0.5], [0, 1]);
  // ② UAC 다이얼로그
  const uacO = useTransform(reveal, [0.5, 0.66], [0, 1]);
  const uacY = useTransform(reveal, [0.5, 0.66], [18, 0]);
  // ③ [예] 버튼 ClickRing은 OsDialog buttons[].ring 으로 버튼 정중앙 자동 앵커링(드리프트 0)

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[940px]">
      {/* 상단: 다운로드한 파일 + 더블클릭 링 */}
      <div className="relative mb-[clamp(3.4rem,7vh,5.4rem)] pl-1">
        <DownloadFile reveal={reveal} />
        <motion.div style={{ opacity: fileRingO }}>
          <ClickRing x={14} y={48} label="더블클릭" dir="up" />
        </motion.div>
        {/* 파일 → 다이얼로그 흐름 화살표 + 마이크로 캡션 (인과 명시) */}
        <motion.div
          style={{ opacity: linkO }}
          className="absolute -bottom-[clamp(2rem,4vh,3.2rem)] left-[14%] flex items-center gap-2.5"
        >
          <svg
            viewBox="0 0 40 60"
            className="h-[clamp(1.8rem,3.6vh,2.8rem)] w-7 shrink-0 text-gold/70"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M20 2v50M8 40l12 12 12-12" />
          </svg>
          <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-bone/70 md:text-[11px]">
            더블클릭 → 이 창이 뜸
          </span>
        </motion.div>
      </div>

      {/* 하단: UAC(Windows 보안) 다이얼로그 */}
      <motion.div style={{ opacity: uacO, y: uacY }} className="relative">
        <OsDialog
          title="Windows 보안 — 사용자 계정 컨트롤"
          os="win"
          buttons={[
            { label: "예", ring: true, ringLabel: "예 클릭", ringDir: "left" },
            { label: "아니요" },
          ]}
        >
          <p className="font-body text-[clamp(0.96rem,1.18vw,1.28rem)] font-semibold text-bone/90">
            이 앱이 디바이스를 변경할 수 있도록 허용하시겠습니까?
          </p>

          {/* 앱 정보 카드 */}
          <div className="mt-5 flex items-start gap-3.5 rounded-lg border border-bone/10 bg-bone/[0.04] px-4 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gold/25 bg-gold/10">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" aria-hidden>
                <path d="M17 3.5 9 12l8 8.5V3.5Z" fill="currentColor" opacity="0.9" stroke="none" />
                <path d="M9 12 4 8v8l5-4Z" fill="currentColor" opacity="0.55" stroke="none" />
              </svg>
            </span>
            <div className="min-w-0">
              <p className="font-body text-[clamp(0.86rem,1.02vw,1.08rem)] font-semibold text-bone/90">Visual Studio Code (User)</p>
              <p className="mt-1 font-body text-[clamp(0.76rem,0.92vw,0.98rem)] text-bone/70">
                확인된 게시자: <span className="text-bone/90">Microsoft Corporation</span>
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.03em] text-bone/70 md:text-[11px]">파일 원본: 이 컴퓨터의 하드 드라이브</p>
            </div>
          </div>

          <p className="mt-4 font-body text-[clamp(0.76rem,0.92vw,0.98rem)] text-bone/70">자세한 내용 표시</p>
        </OsDialog>
        {/* [예] 버튼 ClickRing은 OsDialog buttons[].ring=true 로 버튼 정중앙에 자동 앵커링(드리프트 0) */}
      </motion.div>
    </motion.div>
  );
}

export default function D06RunInstaller() {
  return (
    <TutorialScene
      scene="d06"
      act="설치 · VS CODE"
      chapter="설치 · VS CODE"
      step={6}
      total={56}
      title="받은 파일 찾기 + 실행"
      goal="이번 단계: 다운로드한 설치 파일을 실행한다"
      platform="win"
      steps={[
        "'다운로드' 폴더(또는 브라우저 하단)에서 VSCodeUserSetup 파일을 찾는다",
        "파일을 마우스로 두 번 빠르게 클릭(더블클릭)",
        "'이 앱이 디바이스를 변경할 수 있도록 허용?' 창이 뜨면 [예]를 클릭",
      ]}
      success="설치 마법사 첫 화면이 열린다"
      warn="백신/SmartScreen 경고가 나오면 [추가 정보]→[실행]을 누른다(공식 파일이라 안전)"
      Mockup={Mockup}
    />
  );
}
