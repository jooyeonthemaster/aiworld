"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D45 — 첫 커밋 [VSCodeMock source-control 뷰]
 * 본문(children)에 실제 Source Control 패널을 조립:
 *   1) Initialize Repository 버튼 → 2) 변경 파일 옆 [+] 스테이지 →
 *   3) 메시지칸 'first commit' → 4) ✓ Commit 버튼.
 * reveal 하위구간: 화면 → Initialize 링 → (저장소 시작·변경 등장) → 메시지/Commit 링 → 완료.
 */

type ChangeFile = { name: string; mark: string };
const CHANGES: ChangeFile[] = [
  { name: "index.html", mark: "U" },
  { name: "style.css", mark: "U" },
];
// 사이드패널(VSCodeMock source-control)이 index.html/style.css 2개를 표시하므로 본문도 동일하게 2개로 맞춰 목업 일관성 확보.

function StagedRow({ file, i, reveal }: { file: ChangeFile; i: number; reveal: MotionValue<number> }) {
  const at = 0.46 + i * 0.04;
  const o = useTransform(reveal, [at, at + 0.08], [0, 1]);
  return (
    <motion.div
      style={{ opacity: o }}
      className="flex items-center justify-between rounded-md border border-bone/8 bg-bone/[0.02] px-2.5 py-1.5"
    >
      <span className="flex min-w-0 items-center gap-2 font-mono text-[clamp(0.72rem,0.86vw,0.92rem)] text-bone/75">
        <span className="h-2 w-2 shrink-0 rounded-[2px] bg-[#82AAFF]/70" />
        <span className="truncate">{file.name}</span>
      </span>
      <span className="flex shrink-0 items-center gap-2">
        <span className="font-mono text-[clamp(0.7rem,0.82vw,0.9rem)] text-[#C3E88D]">{file.mark}</span>
        <span className="flex h-5 w-5 items-center justify-center rounded border border-bone/20 text-bone/55">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </span>
    </motion.div>
  );
}

function ScmBody({ reveal }: { reveal: MotionValue<number> }) {
  // 1단계: Initialize Repository (저장소 시작) — 클릭 후 사라짐(흐름에서 완전 제거: 오버레이)
  const initO = useTransform(reveal, [0.06, 0.2], [0, 1]);
  const initFade = useTransform(reveal, [0.4, 0.46], [1, 0]);
  // 2단계: 변경 사항 영역(저장소 시작 후 등장)
  const changesO = useTransform(reveal, [0.44, 0.56], [0, 1]);
  // 3단계: 메시지 + Commit 버튼 (완료되면 fade out)
  const commitO = useTransform(reveal, [0.66, 0.78, 0.9, 0.96], [0, 1, 1, 0]);
  // 4단계: 완료 상태(커밋됨) — commit 블록 자리에 크로스페이드로 겹쳐 표시(세로 누적 방지)
  const doneO = useTransform(reveal, [0.9, 0.98], [0, 1]);

  // 클릭 링은 타깃 버튼의 relative 래퍼 안에 x=50,y=50 자식으로 앵커 → 드리프트 0(정중앙 보장).
  // Initialize Repository 링: 카드 등장 후~클릭 직전.
  const initRingO = useTransform(reveal, [0.22, 0.34, 0.42, 0.46], [0, 1, 1, 0]);
  // Commit 버튼 링: 등장 후~커밋 완료(doneO) 직전 fade-out.
  const commitRingO = useTransform(reveal, [0.72, 0.82, 0.88, 0.92], [0, 1, 1, 0]);

  return (
    <div className="relative flex h-full flex-col gap-3 p-[clamp(1.1rem,1.6vw,1.7rem)]">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[clamp(0.72rem,0.86vw,0.92rem)] uppercase tracking-[0.22em] text-bone/40">
          소스 제어
        </p>
        <span className="font-mono text-[10px] tracking-[0.14em] text-bone/45 md:text-[11px]">main</span>
      </div>

      {/* 2단계 — 변경 사항(스테이지). 상단 void 제거: 헤더 바로 아래에 붙임 */}
      <motion.div style={{ opacity: changesO }} className="flex flex-col gap-2">
        <p className="font-mono text-[clamp(0.68rem,0.8vw,0.88rem)] uppercase tracking-[0.2em] text-bone/55">
          변경 사항 · 2
        </p>
        <div className="flex flex-col gap-1.5">
          {CHANGES.map((f, i) => (
            <StagedRow key={f.name} file={f} i={i} reveal={reveal} />
          ))}
        </div>
        <p className="font-mono text-[clamp(0.66rem,0.78vw,0.86rem)] text-bone/55">
          [+]로 담기(스테이지) — 이번 저장에 포함할 파일
        </p>
      </motion.div>

      {/* 3·4단계 — 커밋 메시지+Commit 와 완료 스트립을 같은 칸에 겹쳐 크로스페이드(세로 누적·overflow 방지) */}
      <div className="relative mt-auto">
        {/* 3단계 — 커밋 메시지 + Commit */}
        <motion.div style={{ opacity: commitO }} className="flex flex-col gap-2">
          <div className="rounded-md border border-gold/45 bg-bone/[0.04] px-3 py-2.5">
            <span className="font-mono text-[clamp(0.8rem,0.96vw,1.02rem)] text-bone/90">first commit</span>
            <span className="ml-1 inline-block h-[1.1em] w-[2px] translate-y-[2px] animate-pulse-soft bg-gold" />
          </div>
          <div className="flex items-center justify-between gap-3 pb-7">
            <span className="font-mono text-[10px] tracking-[0.12em] text-bone/55 md:text-[11px]">Ctrl+Enter</span>
            {/* Commit 버튼 + 링: 버튼을 relative 래퍼로 감싸고 ClickRing을 x=50,y=50 자식으로 두어 항상 버튼 정중앙(드리프트 0). 라벨은 버튼 아래 빈 행으로(dir='down'). */}
            <span className="relative inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2 font-body text-[clamp(0.85rem,1.02vw,1.12rem)] font-bold text-ink shadow-[0_0_30px_rgba(232,181,75,0.3)]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 13l4 4L19 7" />
              </svg>
              Commit
              <ClickRing x={50} y={50} label="Commit" dir="down" o={commitRingO} />
            </span>
          </div>
        </motion.div>

        {/* 4단계 — 커밋 완료(commit 블록을 덮는 오버레이) */}
        <motion.div
          style={{ opacity: doneO }}
          className="absolute inset-x-0 top-0 flex items-center gap-2 rounded-md border border-gold/30 bg-gold/[0.06] px-3 py-2.5 font-mono text-[clamp(0.72rem,0.86vw,0.92rem)] text-gold"
        >
          <span className="text-[#27C93F]">✓</span>
          <span className="whitespace-nowrap">커밋됨 · 2개 변경 · 첫 저장점 기록</span>
        </motion.div>
      </div>

      {/* 1단계 — Initialize Repository (오버레이: 흐름에서 빠져 완료 시 자리 차지 안 함) */}
      <motion.div style={{ opacity: initFade }} className="pointer-events-none absolute inset-0 flex items-center justify-center p-[clamp(1.1rem,1.6vw,1.7rem)]">
        <motion.div style={{ opacity: initO }} className="flex w-full max-w-[420px] flex-col items-center gap-2 rounded-lg border border-bone/10 bg-[#0B0A0F] px-[clamp(1rem,1.4vw,1.6rem)] pb-[clamp(2.4rem,3.4vw,3.4rem)] pt-[clamp(1rem,1.4vw,1.6rem)] text-center shadow-[0_0_60px_rgba(0,0,0,0.6)]">
          <p className="font-body text-[clamp(0.82rem,1vw,1.08rem)] text-bone/70">
            이 폴더는 아직 Git 저장소가 아닙니다.
          </p>
          {/* Initialize 버튼 + 링: 버튼 relative 래퍼 안에 ClickRing x=50,y=50 자식 → 항상 버튼 정중앙. 라벨 '저장소 시작'은 버튼 아래 빈 공간(dir='down')으로 위 설명문장과 비충돌. */}
          <span className="relative mt-1 inline-flex items-center gap-2 rounded-md bg-gold px-5 py-2.5 font-body text-[clamp(0.85rem,1.05vw,1.15rem)] font-bold text-ink shadow-[0_0_36px_rgba(232,181,75,0.35)]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 3v12a3 3 0 0 0 3 3M6 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4M18 9a6 6 0 0 1-6 6" />
            </svg>
            Initialize Repository
            <ClickRing x={50} y={50} label="저장소 시작" dir="down" o={initRingO} />
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.18], [0, 1]);
  // 활동바 Source Control(가지 모양·골드 활성) 아이콘 클릭 링.
  // 활동바는 공유 컴포넌트(VSCodeMock) 내부라 자식 앵커 불가 → 측정 기반 % 보정.
  // 창 기하: 타이틀바 44px + 활동바 py-4(16) + (explorer→search→git) = 16+10+2*(20gap+20icon)=106 → git 중심 = 44+106 = 150px,
  // 루트 전체 높이 ≈ 628px → 계산 ~24%, 스크린샷 실측 git 아이콘 중심 y≈22%(372px)와 일치 → y=22.
  // x: 활동바 w-11(44px) 중앙 = 22/880 ≈ 2.5% → 3.
  const gitRingO = useTransform(reveal, [0.02, 0.16, 0.3, 0.36], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[880px]">
      <VSCodeMock title="my-ai — VS Code" view="source-control" activeIcon="git">
        <ScmBody reveal={reveal} />
      </VSCodeMock>

      {/* 활동바의 Source Control(가지 모양) 아이콘 — 좌측 끝. (Initialize·Commit 링은 ScmBody 내부 버튼에 자식 앵커.) */}
      <motion.div style={{ opacity: gitRingO }}>
        <ClickRing x={3} y={22} label="Source Control" dir="right" />
      </motion.div>
    </motion.div>
  );
}

export default function D45FirstCommit() {
  return (
    <TutorialScene
      scene="d45"
      act="Git · 백업과 협업"
      chapter="Git · 백업과 협업"
      step={45}
      total={56}
      title="첫 커밋"
      goal="이번 단계: 작업을 첫 저장(커밋)"
      platform="both"
      steps={[
        "왼쪽 활동바의 Source Control(가지 모양) 아이콘 클릭",
        "[Initialize Repository] 버튼 클릭(저장소 시작)",
        "변경된 파일 옆 [+]로 스테이지(담기)",
        "메시지칸에 'first commit' 입력 → [✓ Commit] (Ctrl+Enter)",
      ]}
      success="첫 커밋이 기록된다(되돌릴 수 있는 첫 저장점)"
      Mockup={Mockup}
    />
  );
}
