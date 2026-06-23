"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import OsDialog from "@/components/ui/OsDialog";

/**
 * D09 — 설치 완료 + 첫 실행 [OsDialog(win) 완료 페이지 견본]
 * 진행바 100% → 'Visual Studio Code 실행' 체크 확인 → [마침] 클릭.
 */
function FinishBody({ reveal }: { reveal: MotionValue<number> }) {
  // 진행바: 0% → 100% (화면 등장 직후 채워짐)
  const barW = useTransform(reveal, [0.06, 0.34], ["8%", "100%"]);
  const pctO = useTransform(reveal, [0.06, 0.2], [0, 1]);
  // 완료 본문/체크박스 점등
  const bodyO = useTransform(reveal, [0.3, 0.46], [0, 1]);
  const checkO = useTransform(reveal, [0.42, 0.58], [0, 1]);

  return (
    <div className="flex flex-col gap-[clamp(1.3rem,2.4vh,2.2rem)]">
      {/* 상단: 완료 아이콘 + 제목 문구 */}
      <div className="flex items-start gap-3.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold/10">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="font-display text-[clamp(1.05rem,1.4vw,1.5rem)] font-bold text-bone">
            Visual Studio Code 설치 완료
          </p>
          <p className="mt-1 font-body text-[clamp(0.82rem,0.98vw,1.05rem)] text-bone/70">
            설치를 완료했습니다.
          </p>
        </div>
      </div>

      {/* 진행 완료 바 (100%, 골드) */}
      <div>
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.1em] text-bone/70 md:text-[11px]">
          <span>설치 진행률</span>
          <motion.span style={{ opacity: pctO }} className="font-bold text-gold/85">100%</motion.span>
        </div>
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-bone/10">
          <motion.div
            style={{ width: barW }}
            className="h-full rounded-full bg-gradient-to-r from-gold to-gold-bright"
          />
        </div>
      </div>

      {/* 첫 실행 체크박스 (골드 체크, 켜진 상태) */}
      <motion.div
        style={{ opacity: bodyO }}
        className="flex items-center gap-3 rounded-lg border border-gold/30 bg-gold/[0.06] px-3.5 py-3"
      >
        <motion.span
          style={{ opacity: checkO }}
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border border-gold bg-gold"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-ink" fill="none" stroke="currentColor" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 13l4 4L19 7" />
          </svg>
        </motion.span>
        <span className="text-balance-k font-body text-[clamp(0.85rem,1vw,1.1rem)] font-semibold leading-snug text-bone/90">
          Visual Studio Code 실행
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/70 md:text-[10px]">
          <span className="h-1.5 w-1.5 rounded-full bg-gold/80" />
          켜둠
        </span>
      </motion.div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.18], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[860px]">
      <OsDialog
        title="Microsoft Visual Studio Code 설치"
        os="win"
        buttons={[{ label: "마침", ring: true }]}
      >
        <p className="font-body text-[clamp(0.92rem,1.1vw,1.2rem)] font-semibold text-bone/85">설치 완료</p>
        <p className="text-balance-k mt-1 font-body text-[clamp(0.8rem,0.95vw,1rem)] text-bone/70">
          컴퓨터에 Visual Studio Code 설치가 끝났습니다. 설치 마법사를 종료하려면{" "}
          <span className="inline-block whitespace-nowrap text-bone/85">[마침]을 클릭</span>하세요.
        </p>
        <div className="mt-5">
          <FinishBody reveal={reveal} />
        </div>
      </OsDialog>
      {/* 클릭 표지는 OsDialog [마침] 버튼의 ring:true 골드 펄스 하나로 통일
          (외부 ClickRing은 창 밖으로 새고 마커가 이중이라 제거) */}
    </motion.div>
  );
}

export default function D09FirstLaunch() {
  return (
    <TutorialScene
      scene="d09"
      act="설치 · VS CODE"
      chapter="설치 · VS CODE"
      step={9}
      total={56}
      title="설치 완료 + 첫 실행"
      goal="이번 단계: 설치를 끝내고 VS Code를 연다"
      platform="win"
      steps={[
        "[설치] 버튼을 누르고 진행바가 끝날 때까지 기다린다",
        "'Visual Studio Code 실행' 체크를 켠 채로",
        "[마침] 버튼을 클릭",
      ]}
      success="VS Code 창이 처음으로 열린다"
      Mockup={Mockup}
    />
  );
}
