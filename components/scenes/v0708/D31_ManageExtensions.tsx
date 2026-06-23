"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D31 — 확장 관리 [VSCodeMock extensions 뷰 — 톱니(⚙) 관리 메뉴 견본]
 * 설치된 확장(Cline·Prettier·Live Server) 목록 → 활성 카드의 톱니 아이콘 클릭 →
 * '사용 안 함 / 제거' 메뉴. ClickRing 으로 톱니 위치 정확히 강조.
 */

/** 활성 확장(Cline) 상세 본문 — props {reveal} 받는 진짜 컴포넌트. */
function ManageDetail({ reveal }: { reveal: MotionValue<number> }) {
  const menuO = useTransform(reveal, [0.6, 0.78], [0, 1]);
  const menuY = useTransform(reveal, [0.6, 0.78], [-6, 0]);
  // 톱니 링: 0.42부터 등장 → 캡처프레임(reveal 1.0)까지 풀밝기 유지(퇴장 없음 = 회귀 방지).
  // 톱니 버튼의 relative 래퍼 안 자식으로 x=50,y=50 앵커 → 항상 톱니 정중앙(% 추정 0).
  const gearRingO = useTransform(reveal, [0.42, 0.54], [0, 1]);

  return (
    <div className="relative flex h-full flex-col p-[clamp(1.1rem,1.6vw,1.8rem)] pr-[clamp(1.8rem,2.6vw,2.8rem)]">
      {/* 헤더: 아이콘 + 이름 + 톱니 */}
      <div className="flex items-start gap-3.5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="4" y="7" width="16" height="11" rx="3" />
            <circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
            <path d="M12 3.5V7" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[clamp(1.15rem,1.6vw,1.6rem)] font-bold text-bone">Cline</h3>
          <p className="mt-0.5 font-mono text-[clamp(0.7rem,0.85vw,0.9rem)] text-bone/70">cline · 자율 코딩 에이전트</p>
          <div className="mt-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-gold md:text-[11px]">
            <span className="inline-flex items-center gap-1.5 rounded border border-gold/40 bg-gold/10 px-2 py-0.5">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 13l4 4L19 7" />
              </svg>
              설치됨 · 사용 중
            </span>
          </div>
        </div>

        {/* 톱니(관리) 버튼 — 우측 패딩으로 창 모서리·플랫폼 배지와 분리.
            relative 래퍼 안에 ClickRing 을 x=50,y=50 자식으로 부착 → 항상 톱니 정중앙. */}
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gold/45 bg-gold/[0.08]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="3.2" />
            <path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M18.4 18.4l-2.1-2.1M7.7 7.7 5.6 5.6" />
          </svg>
          {/* 톱니 정중앙 앵커 ClickRing — 라벨은 빈 공간(왼쪽 헤더) 쪽으로 */}
          <ClickRing x={50} y={50} label="톱니=관리" dir="left" size={34} o={gearRingO} />
        </span>
      </div>

      {/* 드롭다운 전용 여유 공간 — 본문과 충돌하지 않도록 헤더와 본문 사이에 예약 */}
      <div className="relative mt-3 min-h-[104px]">
        <motion.div
          style={{ opacity: menuO, y: menuY }}
          className="absolute right-0 top-0 z-20 w-[150px] overflow-hidden rounded-xl border border-bone/15 bg-[#15131A]/95 py-1.5 shadow-[0_24px_60px_rgba(0,0,0,0.65)] backdrop-blur-md"
        >
          <div className="flex items-center gap-2.5 px-3.5 py-2 text-bone/75">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-bone/45" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
              <rect x="5" y="5" width="14" height="14" rx="3" /><path d="M9 12h6" />
            </svg>
            <span className="whitespace-nowrap font-body text-[clamp(0.82rem,0.95vw,1rem)]">사용 안 함</span>
          </div>
          <div className="my-0.5 h-px bg-bone/10" />
          <div className="flex items-center gap-2.5 bg-ember/10 px-3.5 py-2 text-ember">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 7h16M9 7V5h6v2M6 7l1 12h10l1-12" />
            </svg>
            <span className="whitespace-nowrap font-body text-[clamp(0.82rem,0.95vw,1rem)]">제거</span>
          </div>
        </motion.div>
      </div>

      <p className="mt-1 border-t border-bone/10 pt-4 font-body text-[clamp(0.82rem,0.98vw,1.05rem)] leading-relaxed text-bone/75">
        톱니(⚙)를 누르면 이 확장을 잠시 <span className="whitespace-nowrap text-bone/90">끄거나(사용 안 함)</span>,
        아예 <span className="whitespace-nowrap text-ember/90">지울(제거)</span> 수 있다. 끈 확장은 언제든 다시 켤 수 있다.
      </p>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.2], [0, 1]);
  // 검색을 비워 설치 목록 강조 → 톱니 링(ManageDetail 내부 앵커) → 메뉴 stagger
  const listRingO = useTransform(reveal, [0.24, 0.42, 0.5, 0.58], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[900px]">
      <VSCodeMock
        title="my-ai — VS Code"
        view="extensions"
        activeIcon="extensions"
        search=""
        extResults={[
          { name: "Cline", pub: "cline", installed: true, active: true },
          { name: "Prettier", pub: "Prettier", installed: true },
          { name: "Live Server", pub: "Ritwick Dey", installed: true },
        ]}
      >
        <ManageDetail reveal={reveal} />
      </VSCodeMock>

      {/* 1) 검색을 비우면 설치된 목록이 보인다 (좌측 사이드패널 검색칸 정중앙).
          창 rect(L889,T222,W774,H635) 기준 검색칸 중심(1064,288) = x22.6%,y10.4% (픽셀 측정). */}
      <ClickRing x={22.6} y={10.4} label="검색 비우기 = 설치 목록" dir="down" size={34} o={listRingO} />
    </motion.div>
  );
}

export default function D31ManageExtensions() {
  return (
    <TutorialScene
      scene="d31"
      act="확장 · 도구 장착"
      chapter="확장 · 도구 장착"
      step={31}
      total={56}
      title="확장 관리"
      goal="이번 단계: 설치한 확장 켜고/끄고/지우기"
      platform="both"
      steps={[
        "확장 패널 위쪽 검색을 비우면 설치된 목록이 보인다",
        "확장의 톱니(⚙) 아이콘을 클릭",
        "메뉴에서 '사용 안 함'·'제거'를 고를 수 있다",
      ]}
      success="필요 없는 확장을 정리할 수 있다"
      Mockup={Mockup}
    />
  );
}
