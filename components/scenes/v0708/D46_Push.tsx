"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D46 — GitHub에 올리기 (Publish Branch) [VSCodeMock source-control 뷰]
 * 본문 = Publish Branch 골드 버튼 + public/private 선택 팝업 + GitHub 인증 안내.
 */
function PublishPanel({ reveal }: { reveal: MotionValue<number> }) {
  // 화면 안 stagger: 안내 → 버튼 → (팝업) → 인증 안내 → 성공 배지
  const headO = useTransform(reveal, [0, 0.16], [0, 1]);
  const btnO = useTransform(reveal, [0.16, 0.32], [0, 1]);
  const authO = useTransform(reveal, [0.5, 0.66], [0, 1]);
  const popO = useTransform(reveal, [0.6, 0.76], [0, 1]);
  const doneO = useTransform(reveal, [0.86, 1], [0, 1]);
  // ClickRing 은 버튼 래퍼의 자식(x=50,y=50)으로 앵커링 → 항상 버튼 정중앙(드리프트 0)
  const ringO = useTransform(reveal, [0.34, 0.5], [0, 1]);

  return (
    <div className="flex h-full flex-col p-[clamp(1.1rem,1.7vw,2rem)]">
      {/* 안내 헤더 */}
      <motion.div style={{ opacity: headO }}>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone/40 md:text-[11px]">
          SOURCE CONTROL · GIT
        </p>
        <p className="mt-2 font-display text-[clamp(1.05rem,1.5vw,1.55rem)] font-bold leading-snug text-bone">
          이제 내 코드를{" "}
          <span className="whitespace-nowrap text-gold">클라우드(GitHub)</span>로 올립니다
        </p>
        <p className="mt-1.5 max-w-[88%] font-body text-[clamp(0.82rem,0.98vw,1.05rem)] leading-relaxed text-bone/72">
          첫 커밋이 끝났으니, 이 저장소를 GitHub에 게시(Publish)하면
          어디서든 안전하게 백업됩니다.
        </p>
      </motion.div>

      {/* Publish Branch 골드 버튼 — relative 래퍼 안에 ClickRing 을 자식(x=50,y=50)으로 두어 항상 버튼 정중앙 */}
      <motion.div style={{ opacity: btnO }} className="mt-7">
        <span className="relative inline-flex items-center gap-2.5 rounded-md bg-gradient-to-r from-gold to-gold-bright px-6 py-3 font-body text-[clamp(0.92rem,1.1vw,1.2rem)] font-bold text-ink shadow-[0_0_38px_rgba(232,181,75,0.38)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 19V6M6 12l6-6 6 6M5 21h14" />
          </svg>
          Publish Branch
          {/* 링: 버튼 정중앙. 라벨은 빈 여백(버튼 우측)으로 빼 골드-온-골드/텍스트 가림 회피 */}
          <ClickRing x={50} y={50} label="Publish Branch" dir="right" o={ringO} />
        </span>
      </motion.div>

      {/* GitHub 인증 안내 */}
      <motion.div
        style={{ opacity: authO }}
        className="mt-5 flex items-center gap-3 rounded-lg border border-bone/15 bg-bone/[0.04] px-4 py-3"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bone/10">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-bone/80" fill="currentColor" aria-hidden>
            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="font-body text-[clamp(0.82rem,0.96vw,1.02rem)] font-semibold text-bone/90">
            GitHub에 인증
          </p>
          <p className="font-body text-[clamp(0.74rem,0.88vw,0.94rem)] text-bone/70">
            로그인 창이 뜨면 <span className="text-gold">Authorize(허용)</span>를 누르세요
          </p>
        </div>
      </motion.div>

      {/* public / private 선택 팝업 */}
      <motion.div
        style={{ opacity: popO }}
        className="mt-4 w-full max-w-[420px] rounded-lg border border-bone/15 bg-[#0E0C13] p-3 shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
      >
        <p className="px-1 pb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/40 md:text-[11px]">
          저장소 공개 범위 선택
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-md border border-bone/12 bg-bone/[0.03] px-3 py-2.5">
            <p className="font-body text-[clamp(0.8rem,0.92vw,1rem)] font-semibold text-bone/85">Publish to public</p>
            <p className="mt-0.5 font-body text-[clamp(0.7rem,0.82vw,0.88rem)] text-bone/70">누구나 볼 수 있음</p>
          </div>
          <div className="rounded-md border border-bone/12 bg-bone/[0.03] px-3 py-2.5">
            <p className="font-body text-[clamp(0.8rem,0.92vw,1rem)] font-semibold text-bone/85">Publish to private</p>
            <p className="mt-0.5 font-body text-[clamp(0.7rem,0.82vw,0.88rem)] text-bone/70">나만 볼 수 있음</p>
          </div>
        </div>
      </motion.div>

      {/* 성공 배지(업로드 완료) */}
      <motion.div
        style={{ opacity: doneO }}
        className="mt-auto flex items-center gap-2 pt-3 font-mono text-[clamp(0.74rem,0.88vw,0.94rem)]"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/15 text-gold">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <span className="text-gold [text-shadow:0_0_16px_rgba(232,181,75,0.35)]">
          github.com/내아이디/my-ai — 업로드 완료
        </span>
      </motion.div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.2], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[880px]">
      <VSCodeMock title="my-ai — VS Code" view="source-control" activeIcon="git">
        <PublishPanel reveal={reveal} />
      </VSCodeMock>
      {/* ClickRing 은 PublishPanel 내부 버튼 래퍼의 자식으로 앵커링(드리프트 0) */}
    </motion.div>
  );
}

export default function D46Push() {
  return (
    <TutorialScene
      scene="d46"
      act="Git · 백업과 협업"
      chapter="Git · 백업과 협업"
      step={46}
      total={56}
      title="GitHub에 올리기"
      goal="이번 단계: 내 작업을 클라우드(GitHub)로"
      platform="both"
      steps={[
        "Source Control에서 [Publish Branch] 버튼 클릭",
        "처음이면 GitHub 로그인 인증 창이 뜬다 → 허용(Authorize)",
        "공개(public)/비공개(private)를 고른다",
        "업로드가 끝나면 GitHub에 저장소가 생긴다",
      ]}
      success="GitHub 내 저장소에 코드가 올라간다"
      Mockup={Mockup}
    />
  );
}
