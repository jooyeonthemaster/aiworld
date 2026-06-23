"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D51 — 배포 (vercel → 미리보기 URL → vercel --prod) [VSCodeMock editor + terminal 견본 수준]
 * EditorBody: 무엇을/왜 하는지 한 화면 안내(클릭 타깃은 아래 터미널). reveal 하위구간으로 stagger.
 * Mockup: 화면 등장 → 터미널 입력 ClickRing → 성공(URL) ClickRing 순.
 */

/** 에디터 본문 — 두 줄 명령(미리보기 vercel / 진짜 공개 vercel --prod)을 한 화면으로 안내. */
function EditorBody({ reveal }: { reveal: MotionValue<number> }) {
  const headO = useTransform(reveal, [0.05, 0.22], [0, 1]);
  const cmdO = useTransform(reveal, [0.22, 0.4], [0, 1]);
  const prodO = useTransform(reveal, [0.58, 0.76], [0, 1]);

  return (
    <div className="flex h-full flex-col gap-[clamp(0.7rem,1.4vh,1.3rem)] p-[clamp(1.1rem,2vw,2rem)]">
      <motion.div style={{ opacity: headO }} className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-bone/15 bg-bone/[0.05]">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-bone/70" fill="currentColor" aria-hidden>
            <path d="M12 3 22 20H2z" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="font-display text-[clamp(1.05rem,1.5vw,1.55rem)] font-bold leading-tight text-bone">
            내 폴더를 인터넷에 올리기
          </p>
          <p className="font-mono text-[clamp(0.68rem,0.82vw,0.88rem)] text-bone/60">
            명령 한 줄이면 전 세계 공개
          </p>
        </div>
      </motion.div>

      {/* 명령 1: 미리보기 배포 */}
      <motion.div
        style={{ opacity: cmdO }}
        className="rounded-lg border border-bone/12 bg-bone/[0.03] p-[clamp(0.8rem,1.3vw,1.2rem)]"
      >
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/35 md:text-[11px]">
          1. 내 폴더에서 터미널에 입력
        </p>
        <pre className="overflow-x-auto whitespace-pre font-mono text-[clamp(0.9rem,1.25vw,1.35rem)] leading-relaxed">
          <span className="text-[#82AAFF]">vercel</span>
        </pre>
        <p className="mt-2 font-body text-[clamp(0.78rem,0.95vw,1rem)] text-bone/75">
          질문이 나오면 대부분 <span className="font-semibold text-bone">Enter</span>(기본값)로 진행 →{" "}
          <span className="whitespace-nowrap font-mono text-bone/90">...vercel.app</span> 미리보기 주소
        </p>
      </motion.div>

      {/* 명령 2: 진짜 공개 */}
      <motion.div
        style={{ opacity: prodO }}
        className="rounded-lg border border-bone/12 bg-bone/[0.03] p-[clamp(0.8rem,1.3vw,1.2rem)]"
      >
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45 md:text-[11px]">
          2. 진짜 공개(최종 주소)
        </p>
        <pre className="overflow-x-auto whitespace-pre font-mono text-[clamp(0.9rem,1.25vw,1.35rem)] leading-relaxed">
          <span className="text-[#82AAFF]">vercel</span>{" "}
          <span className="text-[#C792EA]">--prod</span>
        </pre>
        <p className="mt-2 font-body text-[clamp(0.78rem,0.95vw,1rem)] text-bone/75">
          <span className="font-mono text-bone/90">--prod</span> 를 붙이면 정식{" "}
          <span className="font-semibold text-bone/85">Production</span> 주소가 생긴다
        </p>
      </motion.div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.18], [0, 1]);
  // 입력 지점(터미널 첫 줄) — 잠깐 보였다 사라짐
  const ringO = useTransform(reveal, [0.4, 0.58, 0.74, 0.84], [0, 1, 1, 0]);
  // 성공: 골드 Production URL 위로 마지막에 등장
  const ring2O = useTransform(reveal, [0.8, 0.96], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[900px]">
      <VSCodeMock
        title="my-ai — VS Code"
        view="editor"
        activeIcon="explorer"
        terminalLines={[
          { p: ">", t: "vercel" },
          { p: "?", t: "Set up and deploy? [Y/n] y" },
          { p: "", t: "Deploying… building" },
          { p: "", t: "✔ Production: https://my-ai.vercel.app", gold: true },
        ]}
      >
        <EditorBody reveal={reveal} />
      </VSCodeMock>

      {/* 첫 명령 입력 지점(터미널 첫 줄 ' > vercel') */}
      <ClickRing x={26} y={78} label="여기에 vercel 입력" dir="up" o={ringO} />
      {/* 성공: 받은 주소(https://my-ai.vercel.app) — 링 중심을 URL 글자 중앙에, 라벨은 빈 우상단으로 */}
      <ClickRing x={46} y={93} label="이 주소가 공개됨" dir="up" tone="gold" o={ring2O} />
    </motion.div>
  );
}

export default function D51Deploy() {
  return (
    <TutorialScene
      scene="d51"
      act="Vercel · 세상에 공개"
      chapter="Vercel · 세상에 공개"
      step={51}
      total={56}
      title="배포 — vercel"
      goal="이번 단계: 내 폴더를 인터넷에 올린다"
      platform="both"
      steps={[
        "내 폴더가 열린 상태에서 터미널에 입력: vercel",
        "질문이 나오면 대부분 Enter(기본값)로 진행",
        "잠시 뒤 미리보기 주소(...vercel.app)가 나온다",
        "진짜 공개는: vercel --prod → 최종 주소 생성",
      ]}
      success="받은 주소를 브라우저에 넣으면 내 페이지가 전 세계에 보인다"
      Mockup={Mockup}
    />
  );
}
