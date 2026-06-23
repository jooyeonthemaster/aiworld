"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import OsDialog from "@/components/ui/OsDialog";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D10 — Mac 분기 · 설치 [OsDialog(os='mac') 견본]
 * 상단: 'Applications로 드래그' 비주얼(앱 아이콘 → 화살표 → 폴더) + ClickRing
 * 하단: Control-클릭 → '열기' 확인 다이얼로그([취소]/[열기] 2버튼, 실제 경로와 일치)
 *       '열기' 버튼 ClickRing은 OsDialog가 버튼 정중앙에 자동 앵커링(ring:true) — 좌표 추정 없음(드리프트 0)
 */

/** VS Code 앱 아이콘(파란 리본) */
function VSCodeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16.5 3.2 21 5.4v13.2l-4.5 2.2-9.8-7.6L4 16.2 3 15.6v-7.2L4 7.8l2.7 1.8 9.8-7.6Z" />
      <path d="M16.5 6.4v11.2L9.4 12l7.1-5.6Z" fill="currentColor" stroke="none" opacity="0.92" />
    </svg>
  );
}

/** macOS 폴더 아이콘 */
function FolderIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" opacity="0.85" />
    </svg>
  );
}

/** 상단 — Applications 드래그 비주얼 */
function DragStage({ reveal }: { reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0.04, 0.2], [0, 1]);
  // 앱 아이콘이 폴더 쪽으로 살짝 이동(드래그 느낌)
  const slideX = useTransform(reveal, [0.18, 0.4], [0, 14]);
  const arrowO = useTransform(reveal, [0.16, 0.3], [0, 1]);
  return (
    <motion.div
      style={{ opacity: o }}
      className="flex items-center justify-center gap-[clamp(1.4rem,3vw,3rem)] rounded-xl border border-bone/12 bg-bone/[0.03] px-[clamp(1.2rem,2vw,2.4rem)] py-[clamp(1rem,1.8vh,1.6rem)]"
    >
      <div className="flex flex-col items-center gap-1.5">
        <motion.span style={{ x: slideX }} className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#3B82F6]/40 bg-[#3B82F6]/12 text-[#82AAFF]">
          <VSCodeIcon className="h-9 w-9" />
        </motion.span>
        <span className="font-mono text-[10px] tracking-[0.04em] text-bone/70 md:text-[11px]">Visual Studio Code</span>
      </div>

      <motion.div style={{ opacity: arrowO }} className="flex flex-col items-center text-gold">
        <svg viewBox="0 0 48 24" className="h-5 w-[clamp(2.4rem,5vw,4.2rem)]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M2 12h40M34 5l8 7-8 7" />
        </svg>
        <span className="mt-1 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-gold/80 md:text-[10px]">드래그</span>
      </motion.div>

      <div className="flex flex-col items-center gap-1.5">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-bone/15 bg-bone/[0.05] text-bone/70">
          <FolderIcon className="h-10 w-10" />
        </span>
        <span className="font-mono text-[10px] tracking-[0.04em] text-bone/70 md:text-[11px]">Applications</span>
      </div>
    </motion.div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.16], [0, 1]);
  const dragRingO = useTransform(reveal, [0.26, 0.42, 0.62, 0.7], [0, 1, 1, 0]);
  const dialogO = useTransform(reveal, [0.5, 0.68], [0, 1]);
  const dialogY = useTransform(reveal, [0.5, 0.68], [18, 0]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[880px]">
      {/* 상단 — Applications로 드래그 */}
      <div className="relative">
        <DragStage reveal={reveal} />
        <motion.div style={{ opacity: dragRingO }}>
          <ClickRing x={50} y={46} label="앱을 폴더로 드래그" dir="up" />
        </motion.div>
      </div>

      {/* 하단 — Control-클릭 → '열기' 확인 다이얼로그(이 창에는 실제로 [열기] 버튼이 있음) */}
      <motion.div style={{ opacity: dialogO, y: dialogY }} className="relative mt-[clamp(1.4rem,3vh,2.6rem)]">
        <OsDialog
          title=""
          os="mac"
          buttons={[{ label: "취소" }, { label: "열기", ring: true, ringLabel: "열기", ringDir: "up" }]}
        >
          <div className="flex items-start gap-4">
            {/* 확인 아이콘 */}
            <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ember/40 bg-ember/12 text-ember">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 3 2 20h20L12 3Z" />
                <path d="M12 10v4" />
                <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <div className="min-w-0">
              <p className="font-body text-[clamp(0.9rem,1.08vw,1.18rem)] font-semibold leading-snug text-bone/90">
                &lsquo;Visual Studio Code&rsquo;을(를) 여시겠습니까?
              </p>
              <p className="mt-2 font-body text-[clamp(0.78rem,0.95vw,1rem)] leading-relaxed text-bone/70">
                확인되지 않은 개발자가 배포한 앱입니다. 직접 받은 신뢰할 수 있는 앱이라면 [열기]를 눌러 한 번만 허용하면 됩니다.
              </p>
            </div>
          </div>
        </OsDialog>
        {/* '열기' 버튼 클릭 표지는 OsDialog가 버튼 정중앙에 자동 앵커링(ring:true) — 외부 추정 좌표 제거(드리프트 0) */}
      </motion.div>
    </motion.div>
  );
}

export default function D10MacInstall() {
  return (
    <TutorialScene
      scene="d10"
      act="설치 · VS CODE"
      chapter="설치 · VS CODE"
      step={10}
      total={56}
      title="Mac 분기 — 설치"
      goal="이번 단계: Mac에서 VS Code 설치(다름)"
      platform="mac"
      steps={[
        "사이트에서 'Download for Mac' 클릭 → 받은 zip이 풀리며 앱이 생긴다",
        "VS Code 앱을 Applications(응용 프로그램) 폴더로 드래그한다",
        "처음엔 그냥 더블클릭하면 '확인되지 않은 개발자' 경고로 막힌다 — 앱을 Control-클릭(또는 우클릭)한 뒤 [열기]를 선택하면 위와 같은 확인창이 뜨고, 여기서 [열기]를 클릭",
      ]}
      success="VS Code가 실행된다(이후 단계는 Windows와 동일)"
      Mockup={Mockup}
    />
  );
}
