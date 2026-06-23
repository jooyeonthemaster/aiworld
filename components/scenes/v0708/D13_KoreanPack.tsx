"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D13 — 한국어 언어팩 설치 [VSCodeMock extensions 뷰 + 상세 children + ClickRing]
 */
function KoreanDetail({ reveal }: { reveal: MotionValue<number> }) {
  const installO = useTransform(reveal, [0.62, 0.72], [1, 0]);
  const installedO = useTransform(reveal, [0.66, 0.8], [0, 1]);
  const restartO = useTransform(reveal, [0.82, 0.96], [0, 1]);
  // ClickRing 등장(요소 앵커링: 버튼 정중앙에 고정)
  const ring1O = useTransform(reveal, [0.42, 0.6, 0.64, 0.72], [0, 1, 1, 0]);
  const ring2O = useTransform(reveal, [0.84, 0.98], [0, 1]);

  return (
    <div className="flex h-full flex-col p-[clamp(1.1rem,1.6vw,1.8rem)]">
      {/* 헤더: 아이콘 + 이름 + 만든이 + 설치 버튼 */}
      <div className="flex items-start gap-3.5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-bone/15 bg-bone/[0.05]">
          <span className="font-display text-[clamp(1.1rem,1.5vw,1.5rem)] font-black text-bone/75">한</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[clamp(1.05rem,1.5vw,1.5rem)] font-bold leading-tight text-bone">
            Korean Language Pack for Visual Studio Code
          </h3>
          <p className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[clamp(0.7rem,0.85vw,0.9rem)] text-bone/70">
            <span className="rounded border border-bone/20 bg-bone/[0.05] px-1.5 py-0.5 text-bone/70">Microsoft</span>
            <span>VS Code 한국어 언어팩</span>
          </p>
          <div className="mt-1.5 flex items-center gap-3 font-mono text-[10px] text-bone/70 md:text-[11px]">
            <span className="text-bone/70">★ 4.6</span>
            <span>20M 설치</span>
          </div>
        </div>
        <div className="relative shrink-0">
          <motion.span style={{ opacity: installO }} className="inline-block rounded-md bg-gold px-4 py-2 font-body text-[clamp(0.8rem,0.95vw,1rem)] font-bold text-ink">
            설치
          </motion.span>
          <motion.span style={{ opacity: installedO }} className="absolute inset-0 flex items-center justify-center gap-1.5 rounded-md border border-bone/20 bg-bone/[0.06] px-3 font-body text-[clamp(0.78rem,0.9vw,0.95rem)] font-bold text-bone/70">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 13l4 4L19 7" />
            </svg>
            설치됨
          </motion.span>
          {/* 설치 버튼 정중앙 앵커링(드리프트 0) */}
          <ClickRing x={50} y={50} label="설치 클릭" dir="down" o={ring1O} />
        </div>
      </div>

      {/* 설명 */}
      <p className="mt-4 border-t border-bone/10 pt-4 font-body text-[clamp(0.82rem,0.98vw,1.05rem)] leading-relaxed text-bone/75">
        VS Code의 모든 메뉴·버튼·설정 문구를 한국어로 보여 주는 공식 언어팩.
        설치한 뒤 한 번만 다시 켜면 화면 전체가 한국어로 바뀐다.
      </p>

      {/* 주요 기능 — 중앙 공백을 채우는 불릿 */}
      <ul className="mt-5 flex flex-col gap-2.5 font-body text-[clamp(0.8rem,0.95vw,1rem)] text-bone/70">
        {["메뉴·명령 팔레트가 한국어로 표시", "설정 화면 문구까지 한국어화", "재시작 한 번이면 전체 적용"].map((t) => (
          <li key={t} className="flex items-center gap-2.5">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-bone/45" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span className="whitespace-nowrap">{t}</span>
          </li>
        ))}
      </ul>

      {/* 설치 직후 하단에 뜨는 안내 막대 + 다시 시작 버튼 (세로 배치로 문구·버튼 폭 확보) */}
      <motion.div
        style={{ opacity: restartO }}
        className="mt-auto flex flex-col gap-2.5 rounded-lg border border-gold/30 bg-gold/[0.07] px-3.5 py-3"
      >
        <span className="font-body text-[clamp(0.74rem,0.9vw,0.95rem)] leading-snug text-bone/75">
          표시 언어를 변경하려면 다시 시작해야 합니다.
        </span>
        <div className="flex justify-end">
          {/* 버튼 정중앙 앵커링: ClickRing 을 버튼 래퍼 자식으로 배치(드리프트 0) */}
          <span className="relative inline-flex shrink-0 items-center gap-1.5 rounded-md bg-gold px-3 py-1.5 font-body text-[clamp(0.72rem,0.85vw,0.9rem)] font-bold text-ink">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 12a8 8 0 1 0 2.3-5.6M5 4v3h3" />
            </svg>
            Change Language and Restart
            <ClickRing x={50} y={50} label="여기 클릭" dir="up" o={ring2O} />
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.2], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[880px]">
      <VSCodeMock
        title="my-ai — VS Code"
        view="extensions"
        activeIcon="extensions"
        search="Korean Language Pack"
        extResults={[
          { name: "Korean Language Pack", pub: "Microsoft", installs: "20M", active: true },
          { name: "Korean Word Tools", pub: "etc" },
          { name: "Hangul Helper", pub: "etc" },
        ]}
      >
        {/* ClickRing 은 KoreanDetail 안에서 설치/재시작 버튼 정중앙에 앵커링됨 */}
        <KoreanDetail reveal={reveal} />
      </VSCodeMock>
    </motion.div>
  );
}

export default function D13KoreanPack() {
  return (
    <TutorialScene
      scene="d13"
      act="첫 화면 · 한국어"
      chapter="첫 화면 · 한국어"
      step={13}
      total={56}
      title="한국어 언어팩 설치"
      goal="이번 단계: VS Code를 한국어로"
      platform="both"
      steps={[
        "확장 검색창에 'Korean Language Pack' 입력",
        "만든이가 'Microsoft'인 'Korean Language Pack for Visual Studio Code' 선택",
        "[설치] 클릭",
        "오른쪽 아래 'Change Language and Restart' 버튼을 클릭",
      ]}
      success="VS Code가 다시 켜지며 메뉴가 한국어로 바뀐다"
      Mockup={Mockup}
    />
  );
}
