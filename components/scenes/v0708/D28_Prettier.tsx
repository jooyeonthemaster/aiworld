"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D28 — Prettier 설치 [VSCodeMock extensions 뷰]
 * 검색창 'Prettier' → 만든이 Prettier 선택 → 설치. children = 상세 + 설치 버튼.
 */
function PrettierDetail({ reveal }: { reveal: MotionValue<number> }) {
  const installedO = useTransform(reveal, [0.8, 0.95], [0, 1]);
  const installO = useTransform(reveal, [0.8, 0.9], [1, 0]);
  // 클릭 링: 설치 '전' 구간에만 빛나고, 설치되기 전에 사라진다(클릭→설치됨 인과).
  const ringO = useTransform(reveal, [0.55, 0.72, 0.82], [0, 1, 0]);
  // 들쭉날쭉 → 정렬: 좌측 코드는 흐려지되 읽히게, 우측 정렬 코드가 또렷해진다.
  const beforeO = useTransform(reveal, [0.62, 0.84], [1, 0.42]);
  const afterO = useTransform(reveal, [0.66, 0.9], [0.18, 1]);

  return (
    <div className="flex h-full flex-col p-[clamp(1.1rem,1.6vw,1.8rem)]">
      <div className="flex items-start gap-3.5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10">
          {/* Prettier 로고를 연상시키는 정렬된 가로 막대들 */}
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" aria-hidden>
            <path d="M5 7h14M5 12h9M5 17h12" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[clamp(1.15rem,1.6vw,1.6rem)] font-bold text-bone">Prettier - Code formatter</h3>
          <p className="mt-0.5 font-mono text-[clamp(0.7rem,0.85vw,0.9rem)] text-bone/70">Prettier · 코드 자동 정렬기</p>
          <div className="mt-1.5 flex items-center gap-3 font-mono text-[10px] text-bone/70 md:text-[11px]">
            <span className="text-gold/80">★ 4.5</span>
            <span>40M 설치</span>
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
          {/* 클릭 링은 버튼 컨테이너(relative)에 직접 부착 → 좌표 어긋남 원천 차단. 라벨은 위 빈 공간으로. */}
          <ClickRing x={50} y={50} label="설치 클릭" dir="up" o={ringO} />
        </div>
      </div>

      <p className="mt-3.5 border-t border-bone/10 pt-3.5 font-body text-[clamp(0.82rem,0.98vw,1.05rem)] leading-relaxed text-bone/75">
        들쭉날쭉한 코드를 저장 한 번에 가지런히 정리해 주는 정렬 도구. 줄 간격·들여쓰기·따옴표를
        자동으로 통일해 코드가 한눈에 읽힌다.
      </p>

      {/* Before → After 정렬 시연 */}
      <div className="mt-3.5 grid grid-cols-2 gap-2.5 font-mono text-[clamp(0.62rem,0.72vw,0.78rem)] leading-relaxed">
        <motion.div style={{ opacity: beforeO }} className="rounded-md border border-bone/12 bg-bone/[0.04] p-2.5">
          <p className="mb-1.5 font-body text-[10px] uppercase tracking-[0.18em] text-ember/90">정렬 전</p>
          <pre className="whitespace-pre text-bone/75">{`function  hi( ){
console.log(  "hi" )
   return    1}`}</pre>
        </motion.div>
        <motion.div style={{ opacity: afterO }} className="rounded-md border border-gold/30 bg-gold/[0.05] p-2.5">
          <p className="mb-1.5 font-body text-[10px] uppercase tracking-[0.18em] text-gold/80">정렬 후</p>
          <pre className="whitespace-pre">
            <span className="text-[#C792EA]">function</span> <span className="text-[#82AAFF]">hi</span>() {"{"}{"\n"}
            {"  "}console.<span className="text-[#82AAFF]">log</span>(<span className="text-[#C3E88D]">&quot;hi&quot;</span>);{"\n"}
            {"  "}<span className="text-[#C792EA]">return</span> <span className="text-[#F78C6C]">1</span>;{"\n"}
            {"}"}
          </pre>
        </motion.div>
      </div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.2], [0, 1]);
  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[940px]">
      <VSCodeMock
        title="my-ai — VS Code"
        view="extensions"
        activeIcon="extensions"
        search="Prettier"
        extResults={[
          { name: "Prettier - Code formatter", pub: "Prettier", installs: "40M", active: true },
          { name: "Prettier ESLint", pub: "etc" },
        ]}
      >
        <PrettierDetail reveal={reveal} />
      </VSCodeMock>
      {/* ClickRing은 PrettierDetail 내부 설치 버튼 컨테이너에 직접 부착(좌표 어긋남 방지). */}
    </motion.div>
  );
}

export default function D28Prettier() {
  return (
    <TutorialScene
      scene="d28"
      act="확장 · 도구 장착"
      chapter="확장 · 도구 장착"
      step={28}
      total={56}
      title="Prettier — 코드 자동 정렬"
      goal="이번 단계: 코드를 자동으로 예쁘게"
      platform="both"
      steps={[
        "확장 검색창에 'Prettier - Code formatter' 입력",
        "만든이 'Prettier'인 것을 선택 → [설치]",
        "(선택) 저장할 때 자동 정렬되게 설정도 가능",
      ]}
      success="Prettier가 설치된다(들쭉날쭉한 코드가 자동 정렬됨)"
      tip="저장할 때 자동 정렬: 설정에서 'Format On Save'를 켜면 (Ctrl+S) 한 번에 가지런해진다"
      Mockup={Mockup}
    />
  );
}
