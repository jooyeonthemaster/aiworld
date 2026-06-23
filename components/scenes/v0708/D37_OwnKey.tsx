"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import BrowserMock from "@/components/ui/BrowserMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D37 — 각자 발급 (보조) [BrowserMock + ClickRing 견본 / OpenRouter Keys]
 * 화면 → ClickRing('Create Key') → 생성된 키 카드(sk-or-v1-••••)+Copy 순 stagger.
 */

const NAV: { label: string; active?: boolean }[] = [
  { label: "Models" },
  { label: "Chat" },
  { label: "Keys", active: true },
  { label: "Credits" },
  { label: "Settings" },
];

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.22], [0, 1]);
  const ringO = useTransform(reveal, [0.4, 0.62], [0, 1]);
  const cardO = useTransform(reveal, [0.66, 0.88], [0, 1]);
  const cardY = useTransform(reveal, [0.66, 0.88], [14, 0]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[880px]">
      <BrowserMock url="openrouter.ai/keys">
        <div className="flex min-h-[clamp(17rem,34vh,24rem)]">
          {/* 좌측 사이드바 내비 */}
          <div className="hidden w-[clamp(8rem,12vw,11rem)] shrink-0 flex-col gap-1 border-r border-bone/10 bg-bone/[0.02] p-3 sm:flex">
            <div className="mb-2 flex items-center gap-2 px-1">
              <span className="flex h-6 w-6 items-center justify-center rounded-md border border-gold/30 bg-gold/10 font-display text-[12px] font-black text-gold">
                OR
              </span>
              <span className="font-display text-[13px] font-bold text-bone/80">OpenRouter</span>
            </div>
            {NAV.map((n) => (
              <span
                key={n.label}
                className={`rounded-md px-2.5 py-1.5 font-body text-[clamp(0.78rem,0.9vw,0.95rem)] ${
                  n.active
                    ? "border border-gold/30 bg-gold/10 font-semibold text-gold"
                    : "text-bone/60"
                }`}
              >
                {n.label}
              </span>
            ))}
          </div>

          {/* 본문 — Keys 페이지 */}
          <div className="flex flex-1 flex-col p-[clamp(1.1rem,1.8vw,1.9rem)]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-display text-[clamp(1.15rem,1.7vw,1.7rem)] font-bold text-bone">API Keys</h3>
                <p className="mt-1 font-body text-[clamp(0.78rem,0.95vw,1rem)] text-bone/65">
                  키 하나로 수백 개 모델에 연결됩니다.
                </p>
              </div>
              {/* 클릭 타깃: Create Key 버튼 — relative 래퍼로 감싸 ClickRing을 버튼 정중앙(x=50,y=50)에 자식 앵커링(드리프트 0) */}
              <span className="relative inline-flex shrink-0 items-center gap-2 rounded-lg bg-gradient-to-r from-gold to-gold-bright px-4 py-2.5 font-body text-[clamp(0.82rem,1vw,1.05rem)] font-bold text-ink shadow-[0_0_34px_rgba(232,181,75,0.35)]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Create Key
                {/* 링 중심점 = 버튼 정중앙. dir='up'으로 라벨칩이 버튼 위 빈 공간(주소창 아래)으로 빠져 버튼 글자/좌우와 겹치지 않음 */}
                <ClickRing x={50} y={50} label="여기 클릭" dir="up" size={34} o={ringO} />
              </span>
            </div>

            {/* 생성된 키 카드 */}
            <motion.div
              style={{ opacity: cardO, y: cardY }}
              className="mt-5 rounded-xl border border-bone/12 bg-bone/[0.03] p-[clamp(0.9rem,1.3vw,1.3rem)]"
            >
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="8" cy="15" r="4" />
                  <path d="m10.85 12.15 7.65-7.65M16 6l2 2M14 8l1.5 1.5" />
                </svg>
                <span className="font-display text-[clamp(0.9rem,1.1vw,1.1rem)] font-bold text-bone">my-class-key</span>
                <span className="ml-auto rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-gold">
                  생성됨
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-bone/12 bg-coal/60 px-3 py-2.5">
                <span className="truncate font-mono text-[clamp(0.82rem,1vw,1.05rem)] tracking-[0.06em] text-bone/80">
                  sk-or-v1-••••••••••••••••••••••••
                </span>
                <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-md border border-bone/15 bg-bone/[0.06] px-2.5 py-1.5 font-body text-[clamp(0.74rem,0.85vw,0.9rem)] font-semibold text-bone/80">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                  </svg>
                  Copy
                </span>
              </div>
              <p className="mt-2.5 flex items-center gap-1.5 font-body text-[clamp(0.74rem,0.88vw,0.92rem)] text-ember/90">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                </svg>
                이 키는 지금만 전체가 보입니다 — 바로 복사해서 안전한 곳에 저장하세요.
              </p>
            </motion.div>
          </div>
        </div>
      </BrowserMock>
    </motion.div>
  );
}

export default function D37OwnKey() {
  return (
    <TutorialScene
      scene="d37"
      act="API 키 · AI 연결"
      chapter="API 키 · AI 연결"
      step={37}
      total={56}
      title="각자 발급 (보조)"
      goal="이번 단계: 내 키를 직접 만들고 싶다면"
      platform="both"
      steps={[
        "openrouter.ai 접속 → 로그인(Google/GitHub)",
        "왼쪽 메뉴 'Keys' → 'Create Key' → 이름 입력 → 생성",
        "생성된 키를 복사(다시 못 보니 바로 저장)",
        "쓰려면 Settings → Credits 에서 약간의 크레딧 충전",
      ]}
      success="나만의 API 키가 생긴다(공용키 대신 사용 가능)"
      tip="수업 중엔 공용 키로 충분 — 이건 끝나고 각자 해도 된다"
      Mockup={Mockup}
    />
  );
}
