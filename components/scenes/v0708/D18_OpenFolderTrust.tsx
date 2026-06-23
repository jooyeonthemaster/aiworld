"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import DesktopMock from "@/components/ui/DesktopMock";
import ContextMenu from "@/components/ui/ContextMenu";
import OsDialog from "@/components/ui/OsDialog";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D18 — 폴더 열기 ② 우클릭 + 신뢰 [DesktopMock + ContextMenu + OsDialog]
 * reveal stagger: 바탕화면/폴더 → 우클릭 메뉴 + 'Code로 열기' 링 → 신뢰 다이얼로그 + '신뢰' 링 → 성공.
 */
function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  // 1) 바탕화면 + my-ai 폴더 등장
  const deskO = useTransform(reveal, [0, 0.16], [0, 1]);
  // 2) 우클릭 메뉴 등장 → (신뢰창 뜰 때) 퇴장
  const menuO = useTransform(reveal, [0.18, 0.34], [0, 1]);
  const menuFade = useTransform(reveal, [0.5, 0.6], [1, 0]);
  // 'Code로 열기' 클릭 링: 메뉴와 함께 점등 → 신뢰창 뜨기 직전 소멸
  const ring1O = useTransform(reveal, [0.3, 0.42, 0.5, 0.58], [0, 1, 1, 0]);
  // 3) 신뢰 다이얼로그 등장 + 살짝 떠오름
  const trustO = useTransform(reveal, [0.52, 0.68], [0, 1]);
  const trustY = useTransform(reveal, [0.52, 0.68], [18, 0]);

  return (
    <motion.div style={{ opacity: deskO }} className="relative w-full max-w-[860px]">
      <DesktopMock os="win">
        {/* my-ai 폴더 아이콘 (우클릭 대상) */}
        <div className="absolute left-[12%] top-[16%] flex w-24 flex-col items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="h-14 w-14 text-bone/60" fill="currentColor" aria-hidden>
            <path
              d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
              opacity="0.9"
            />
          </svg>
          <span className="rounded bg-gold/20 px-2 py-0.5 font-mono text-[11px] text-bone">my-ai</span>
        </div>

        {/* 우클릭 컨텍스트 메뉴 (폴더 위) */}
        <motion.div style={{ opacity: menuFade }} className="absolute left-[28%] top-[20%]">
          <motion.div style={{ opacity: menuO }}>
            <ContextMenu
              className="w-[220px]"
              items={[
                { label: "열기" },
                { label: "Code(으)로 열기", active: true },
                { label: "이름 바꾸기" },
                { label: "삭제" },
              ]}
            />
          </motion.div>
        </motion.div>
      </DesktopMock>

      {/* 신뢰 다이얼로그 — 바탕화면 위 모달처럼 떠오름 */}
      <motion.div
        style={{ opacity: trustO, y: trustY }}
        className="absolute left-1/2 top-1/2 w-[68%] max-w-[420px] -translate-x-1/2 -translate-y-1/2"
      >
        <OsDialog
          title="Visual Studio Code"
          os="win"
          buttons={[
            { label: "예, 작성자를 신뢰합니다", ring: true },
            { label: "아니요" },
          ]}
        >
          <p className="font-body text-[clamp(0.92rem,1.1vw,1.2rem)] font-semibold text-bone/90">
            이 폴더의 파일 작성자를 신뢰하십니까?
          </p>
          <p className="mt-2 font-body text-[clamp(0.78rem,0.92vw,0.98rem)] leading-relaxed text-bone/55">
            코드를 신뢰하면 자동으로 실행될 수 있습니다. 내가 만든 폴더라면
            <span className="text-bone/80"> &lsquo;예&rsquo;</span>를 선택하세요.
          </p>
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-bone/12 bg-bone/[0.04] px-3 py-2 font-mono text-[clamp(0.72rem,0.85vw,0.9rem)] text-bone/60">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-bone/60" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            <span className="truncate">C:\Users\me\Desktop\my-ai</span>
          </div>
        </OsDialog>
      </motion.div>

      {/* 클릭 링 1: 'Code로 열기' */}
      <motion.div style={{ opacity: ring1O }}>
        <ClickRing x={43} y={32} label="Code로 열기" dir="right" />
      </motion.div>
      {/* 신뢰 버튼 클릭 강조는 OsDialog buttons[ring:true] 자체 골드 펄스 글로우가 담당 (이중 링 제거) */}
    </motion.div>
  );
}

export default function D18OpenFolderTrust() {
  return (
    <TutorialScene
      scene="d18"
      act="폴더 · 작업공간"
      chapter="폴더 · 작업공간"
      step={18}
      total={56}
      title="폴더 열기 ② 우클릭 + 신뢰"
      goal="이번 단계: 더 빠른 방법 + 신뢰 다이얼로그"
      platform="win"
      steps={[
        "바탕화면의 my-ai 폴더에서 마우스 오른쪽 클릭",
        "메뉴에서 'Code(으)로 열기'를 클릭",
        "VS Code가 열리며 '이 폴더의 작성자를 신뢰하십니까?'가 뜬다",
        "'예, 작성자를 신뢰합니다'를 클릭",
      ]}
      success="폴더가 열리고 정상 작업 가능 상태가 된다"
      tip="'Code로 열기'는 설치 때 체크박스를 켰기 때문에 보인다 (STEP 08)"
      Mockup={Mockup}
    />
  );
}
