"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D44 — git config (이름·이메일) [VSCodeMock editor + 터미널 + ClickRing 견본 수준]
 * Mockup(p,reveal): 화면(에디터+터미널) → 입력 안내 점등 → 성공(메시지 없음) ClickRing 순 stagger.
 * 완전 초심자가 이 한 화면만 보고 터미널에 두 줄을 그대로 따라 칠 수 있게 만든다.
 */

/** 신택스 컬러 토큰(키워드/함수/문자열/숫자) — BIBLE 고정값. */
type Tok = { t: string; c?: "kw" | "fn" | "str" | "num" | "dim" };
const COLOR: Record<NonNullable<Tok["c"]>, string> = {
  kw: "text-[#C792EA]",
  fn: "text-[#82AAFF]",
  str: "text-[#C3E88D]",
  num: "text-[#F78C6C]",
  dim: "text-bone/35",
};

/** 에디터 본문 — "이건 단 한 번만 하는 등록" 메모지(view='editor' children 슬롯). */
function EditorBody({ reveal }: { reveal: MotionValue<number> }) {
  const noteO = useTransform(reveal, [0.06, 0.24], [0, 1]);
  // 두 줄 명령은 카드로 또박또박 — 따라치는 손이 길을 잃지 않게.
  const lines: { label: string; cmd: Tok[] }[] = [
    {
      label: "내 이름",
      cmd: [
        { t: "git ", c: "fn" },
        { t: "config --global ", c: "dim" },
        { t: "user.name ", c: "kw" },
        { t: '"홍길동"', c: "str" },
      ],
    },
    {
      label: "내 이메일",
      cmd: [
        { t: "git ", c: "fn" },
        { t: "config --global ", c: "dim" },
        { t: "user.email ", c: "kw" },
        { t: '"you@email.com"', c: "str" },
      ],
    },
  ];

  return (
    <div className="flex h-full flex-col">
      {/* 탭바 */}
      <div className="flex items-center gap-0 border-b border-bone/10 bg-[#0A090E] px-1">
        <span className="flex items-center gap-2 border-r border-bone/10 border-t-2 border-t-gold bg-[#0B0A0F] px-3.5 py-2 font-mono text-[11px] text-bone/80 md:text-xs">
          <span className="h-2 w-2 rounded-[2px] bg-gold/70" />
          내-정보-등록.md
        </span>
      </div>

      {/* 안내 메모 + 두 줄 명령 카드 */}
      <motion.div style={{ opacity: noteO }} className="flex flex-1 flex-col gap-3 px-[clamp(1rem,1.6vw,1.8rem)] py-[clamp(0.9rem,1.6vh,1.6rem)]">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold/70 md:text-[11px]">단 한 번만</span>
          <span className="font-body text-[clamp(0.82rem,1vw,1.08rem)] text-bone/55">아래 두 줄을 터미널에 그대로 입력</span>
        </div>

        {lines.map((ln, i) => (
          <div key={i} className="rounded-lg border border-bone/12 bg-bone/[0.03] px-3.5 py-2.5">
            <p className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/40 md:text-[11px]">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold/15 text-[10px] font-bold text-gold">{i + 1}</span>
              {ln.label}
            </p>
            <code className="block whitespace-nowrap font-mono text-[clamp(0.78rem,0.92vw,1rem)] leading-relaxed">
              {ln.cmd.map((tk, ti) => (
                <span key={ti} className={tk.c ? COLOR[tk.c] : "text-bone/70"}>
                  {tk.t}
                </span>
              ))}
            </code>
          </div>
        ))}

        <p className="mt-auto font-body text-[clamp(0.74rem,0.88vw,0.95rem)] text-bone/35">
          {"↓"} 큰따옴표 안만 내 것으로 바꿔서, 아래 터미널에 한 줄씩 Enter
        </p>
      </motion.div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  // 화면(에디터+터미널) 등장 → (EditorBody 내부 안내 점등) → 성공 ClickRing 순 stagger.
  const o = useTransform(reveal, [0, 0.18], [0, 1]);
  // 성공 강조: 터미널의 "(메시지 없음 = 성공)" 골드 줄을 마지막에 가리킴.
  const ringO = useTransform(reveal, [0.6, 0.82], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[880px]">
      <VSCodeMock
        title="my-ai — VS Code"
        view="editor"
        activeIcon="explorer"
        terminalLines={[
          { p: ">", t: 'git config --global user.name "홍길동"' },
          { p: ">", t: 'git config --global user.email "you@email.com"' },
          { p: "", t: "(메시지 없음 = 성공)", gold: true },
        ]}
      >
        <EditorBody reveal={reveal} />
      </VSCodeMock>

      {/* 성공 강조: 마지막 터미널 줄 '(메시지 없음 = 성공)' 골드 텍스트 정중앙에 링 dot.
          픽셀 측정(1920×1080): 골드 줄 글자 중앙 x≈1054·y≈800, 창 래퍼 x[889..1663]/y[217..857] → x≈21.3%·y≈91.1%.
          y는 골드 줄 위에 얹되 하단 상태바(y≈827~) 클리핑을 피하도록 살짝 올림. 라벨은 같은 줄 우측 빈 공간으로(어느 명령줄 글자도 안 덮음). */}
      <ClickRing x={21.3} y={91.1} label="조용하면 성공!" dir="right" tone="gold" o={ringO} />
    </motion.div>
  );
}

export default function D44GitConfig() {
  return (
    <TutorialScene
      scene="d44"
      act="Git · 백업과 협업"
      chapter="Git · 백업과 협업"
      step={44}
      total={56}
      title="git config (이름·이메일)"
      goal="이번 단계: Git에 내 이름·이메일 등록(1회)"
      platform="both"
      steps={[
        '터미널에 입력: git config --global user.name "홍길동"',
        '입력: git config --global user.email "you@email.com"',
        "각 줄 끝에 Enter — 아무 메시지 안 나오면 정상",
      ]}
      success="커밋에 내 이름이 찍힐 준비가 된다"
      warn="이름/이메일은 GitHub 가입한 것과 같게 쓰면 편하다"
      Mockup={Mockup}
    />
  );
}
