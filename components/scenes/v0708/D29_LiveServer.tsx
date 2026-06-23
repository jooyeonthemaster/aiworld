"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D29 — Live Server 설치 [VSCodeMock extensions 뷰]
 * 상세 카드(만든이 Ritwick Dey + 설치 버튼) + 하단 'Go Live' 상태바 힌트.
 */
function LiveServerDetail({ reveal }: { reveal: MotionValue<number> }) {
  const installedO = useTransform(reveal, [0.8, 0.94], [0, 1]);
  const installO = useTransform(reveal, [0.8, 0.9], [1, 0]);
  const goLiveO = useTransform(reveal, [0.82, 0.96], [0, 1]);

  return (
    <div className="flex h-full flex-col p-[clamp(1.1rem,1.6vw,1.8rem)]">
      <div className="flex items-start gap-3.5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="8" />
            <path d="M2.8 9.5h18.4M2.8 14.5h18.4M12 3.6c2.4 2.2 3.6 5.2 3.6 8.4S14.4 18.2 12 20.4M12 3.6c-2.4 2.2-3.6 5.2-3.6 8.4S9.6 18.2 12 20.4" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[clamp(1.15rem,1.6vw,1.6rem)] font-bold text-bone">Live Server</h3>
          <p className="mt-0.5 font-mono text-[clamp(0.7rem,0.85vw,0.9rem)] text-bone/45">Ritwick Dey · 실시간 미리보기</p>
          <div className="mt-1.5 flex items-center gap-3 font-mono text-[10px] text-bone/40 md:text-[11px]">
            <span className="text-gold/80">★ 4.5</span>
            <span>50M 설치</span>
          </div>
        </div>
        <div className="relative shrink-0">
          <motion.span style={{ opacity: installO }} className="inline-block rounded-md bg-gold px-4 py-2 font-body text-[clamp(0.8rem,0.95vw,1rem)] font-bold text-ink">
            설치
          </motion.span>
          <motion.span style={{ opacity: installedO }} className="absolute inset-0 flex items-center justify-center gap-1.5 rounded-md border border-gold/40 bg-gold/10 px-3 font-body text-[clamp(0.78rem,0.9vw,0.95rem)] font-bold text-gold">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 13l4 4L19 7" />
            </svg>
            설치됨
          </motion.span>
        </div>
      </div>

      <p className="mt-4 border-t border-bone/10 pt-4 font-body text-[clamp(0.82rem,0.98vw,1.05rem)] leading-relaxed text-bone/75">
        만든 HTML 파일을 작은 로컬 서버로 띄워 브라우저에서 바로 보여준다.
        코드를 저장하면 화면이 자동으로 새로고침 — 만든 즉시 결과를 확인할 수 있다.
      </p>

      {/* 사용법: html 파일 우클릭 → Open with Live Server */}
      <div className="mt-4 flex items-center gap-2.5 rounded-lg border border-bone/12 bg-bone/[0.03] px-3.5 py-2.5">
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-bone/40" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M6 9l6 6 6-6" />
        </svg>
        <p className="font-body text-[clamp(0.76rem,0.9vw,0.98rem)] leading-snug text-bone/75">
          쓰는 법: <span className="font-semibold text-bone/85">index.html</span> 우클릭 →
          <span className="ml-1 whitespace-nowrap font-mono font-semibold text-bone/85">Open with Live Server</span>
        </p>
      </div>

      {/* 하단 'Go Live' 상태바 버튼 힌트 */}
      <motion.div style={{ opacity: goLiveO }} className="relative mt-auto pt-4">
        <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/60 md:text-[11px]">또는 우측 하단 상태바에서</p>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-bone/15 bg-bone/[0.05] px-3 py-1.5 font-body text-[clamp(0.78rem,0.9vw,0.98rem)] font-bold text-bone/85">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5.5 6.5a9 9 0 0 1 12 12M8.5 9.5a5 5 0 0 1 6 6" />
            <circle cx="6.5" cy="17.5" r="1.4" fill="currentColor" stroke="none" />
          </svg>
          Go Live
        </span>
      </motion.div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.2], [0, 1]);
  // 링은 '설치' 버튼이 보이는 구간(installO=1, ~0.8까지)에서만 등장 후 사라져
  // '설치됨'(0.8~) 등장과 겹치지 않게 한다 — 지시/결과 모순 제거.
  const ringO = useTransform(reveal, [0.5, 0.6, 0.72, 0.8], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[880px]">
      <VSCodeMock
        title="my-ai — VS Code"
        view="extensions"
        activeIcon="extensions"
        search="Live Server"
        extResults={[
          { name: "Live Server", pub: "Ritwick Dey", installs: "50M", active: true },
          { name: "Live Preview", pub: "Microsoft" },
          { name: "Live Server (Five)", pub: "Yannick Lung" },
        ]}
      >
        <LiveServerDetail reveal={reveal} />
      </VSCodeMock>
      <ClickRing x={91} y={15} label="설치 클릭" dir="up" o={ringO} />
    </motion.div>
  );
}

export default function D29LiveServer() {
  return (
    <TutorialScene
      scene="d29"
      act="확장 · 도구 장착"
      chapter="확장 · 도구 장착"
      step={29}
      total={56}
      title="Live Server — HTML 미리보기"
      goal="이번 단계: 만든 웹페이지를 브라우저로 바로 보기"
      platform="both"
      steps={[
        "확장 검색창에 'Live Server' 입력",
        "만든이 'Ritwick Dey'인 것을 선택 → [설치]",
        "사용법: html 파일을 열고 우클릭 → 'Open with Live Server' (또는 하단 'Go Live')",
      ]}
      success="Live Server 설치 — 이후 HTML이 브라우저에서 실시간 미리보기된다"
      Mockup={Mockup}
    />
  );
}
