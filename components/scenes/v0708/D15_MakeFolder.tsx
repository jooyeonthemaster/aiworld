"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import DesktopMock from "@/components/ui/DesktopMock";
import ContextMenu from "@/components/ui/ContextMenu";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D15 — 바탕화면에 폴더 만들기 [DesktopMock + ContextMenu 견본]
 */
function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.18], [0, 1]);
  const menuO = useTransform(reveal, [0.2, 0.4], [0, 1]);
  const ring1O = useTransform(reveal, [0.34, 0.48, 0.66, 0.72], [0, 1, 1, 0]);
  const subO = useTransform(reveal, [0.46, 0.62], [0, 1]);
  const ring2O = useTransform(reveal, [0.6, 0.7, 0.84, 0.9], [0, 1, 1, 0]);
  // 성공(정착) 비트에서 메뉴/서브메뉴는 완전히 사라지게 한다 — 토스트와 메뉴가 겹쳐 쌓이는 충돌 제거
  const menuFade = useTransform(reveal, [0.84, 0.92], [1, 0]);
  const folderO = useTransform(reveal, [0.84, 0.96], [0, 1]);
  // 폴더 생성 성공 강조(우측 빈 공간 앵커: 토스트 + 폴더→토스트 연결선)
  const successO = useTransform(reveal, [0.86, 0.96], [0, 1]);
  const linkO = useTransform(reveal, [0.88, 0.97], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[820px]">
      <DesktopMock os="win">
        {/* 생성된 폴더 아이콘 + 성공 글로우 펄스 */}
        <motion.div style={{ opacity: folderO }} className="absolute left-[10%] top-[14%] flex w-20 flex-col items-center gap-1.5">
          <span
            aria-hidden
            className="animate-pulse-soft absolute left-1/2 top-6 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(232,181,75,0.45), transparent 70%)" }}
          />
          <svg viewBox="0 0 24 24" className="relative h-12 w-12 text-gold" fill="currentColor" aria-hidden>
            <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" opacity="0.85" />
          </svg>
          <span className="relative rounded bg-gold/20 px-1.5 py-0.5 font-mono text-[10px] text-bone">my-ai</span>
        </motion.div>

        {/* 폴더 → 성공 토스트 연결선 (좌측 폴더에서 우측 빈공간으로 시선 앵커) */}
        <motion.svg
          aria-hidden
          style={{ opacity: linkO }}
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 17 26 L 40 26 L 40 50 L 64 50"
            fill="none"
            stroke="rgba(232,181,75,0.55)"
            strokeWidth={0.5}
            strokeDasharray="2 1.6"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />
          <circle cx="64" cy="50" r="0.9" fill="rgba(232,181,75,0.9)" vectorEffect="non-scaling-stroke" />
        </motion.svg>

        {/* 폴더 생성 완료 성공 토스트 (우측 빈공간을 채워 데드스페이스 해소) */}
        <motion.div
          style={{ opacity: successO }}
          className="absolute right-[6%] top-1/2 flex -translate-y-1/2 items-center gap-3 rounded-xl border border-gold/40 bg-gold/10 px-5 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.6)] backdrop-blur-md"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-ink" fill="none" stroke="currentColor" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span className="whitespace-nowrap">
            <span className="block font-body text-[clamp(0.9rem,1.05vw,1.1rem)] font-semibold text-bone">my-ai 폴더 생성 완료</span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-gold/80">FOLDER CREATED</span>
          </span>
        </motion.div>

        {/* 우클릭 메뉴 (메뉴 컨테이너 기준으로 ClickRing 픽셀 앵커링) */}
        <motion.div style={{ opacity: menuFade }} className="absolute left-[26%] top-[16%]">
          <div className="relative w-[180px]">
            <motion.div style={{ opacity: menuO }}>
              <ContextMenu
                className="w-[180px]"
                items={[
                  { label: "보기" },
                  { label: "정렬 기준" },
                  { label: "새로 고침" },
                  { label: "새로 만들기", active: true, submenu: true },
                  { label: "디스플레이 설정" },
                ]}
              />
            </motion.div>

            {/* 서브메뉴 */}
            <motion.div style={{ opacity: subO }} className="absolute left-[178px] top-[96px] w-[150px]">
              <ContextMenu
                className="w-[150px]"
                items={[
                  { label: "폴더", active: true },
                  { label: "바로 가기" },
                  { label: "텍스트 문서" },
                ]}
              />
              {/* 서브메뉴 '폴더'(1번째 항목) 정중앙 앵커 — 항상 항목 한가운데 */}
              <motion.div style={{ opacity: ring2O }} className="pointer-events-none absolute left-0 right-0 top-[22px] h-0">
                <ClickRing x={50} y={50} label="폴더 클릭" dir="right" />
              </motion.div>
            </motion.div>

            {/* '새로 만들기'(4번째 항목) 정중앙 앵커 — 항상 항목 한가운데 */}
            <motion.div style={{ opacity: ring1O }} className="pointer-events-none absolute left-0 right-0 top-[132px] h-0">
              <ClickRing x={50} y={50} label="새로 만들기" dir="left" />
            </motion.div>
          </div>
        </motion.div>
      </DesktopMock>
    </motion.div>
  );
}

export default function D15MakeFolder() {
  return (
    <TutorialScene
      scene="d15"
      act="폴더 · 작업공간"
      chapter="폴더 · 작업공간"
      step={15}
      title="바탕화면에 폴더 만들기"
      goal="이번 단계: 작업할 '내 폴더'를 하나 만든다"
      platform="win"
      steps={[
        "바탕화면의 빈 곳에서 마우스 오른쪽 버튼을 클릭",
        "메뉴에서 '새로 만들기'에 마우스를 올린다",
        "옆에 나온 '폴더'를 왼쪽 버튼으로 클릭",
        "폴더 이름을 my-ai 로 입력하고 Enter",
      ]}
      success="바탕화면에 'my-ai' 폴더가 생긴다"
      tip="폴더 이름은 영어 소문자 + 하이픈(-)으로. 띄어쓰기·한글은 피하면 나중에 편하다"
      Mockup={Mockup}
    />
  );
}
