"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D38 — Cline에 첫 명령 [VSCodeMock activeIcon='cline' + 채팅 패널 견본]
 * 본문 = Cline 채팅 패널: 입력창에 명령 텍스트가 채워진 모습 + 보내기(↑) 버튼.
 * reveal stagger: 패널 → 입력 텍스트 → ClickRing(입력창·보내기) → 성공(작업 시작).
 */

const COMMAND =
  "안녕? 이 폴더에 hello.txt 만들어서 '첫 성공'이라고 써줘";

function ClinePanel({ reveal }: { reveal: MotionValue<number> }) {
  const headO = useTransform(reveal, [0, 0.16], [0, 1]);
  // 인사말은 전송 직전 퇴장 → 콜아웃/버블과 겹치지 않게
  const greetO = useTransform(reveal, [0.16, 0.3, 0.76, 0.84], [0, 1, 1, 0]);
  const boxO = useTransform(reveal, [0.3, 0.46], [0, 1]);
  const typeO = useTransform(reveal, [0.4, 0.56], [0, 1]);
  const sendO = useTransform(reveal, [0.5, 0.64], [0.4, 1]);
  // 전송 후 채팅 흐름(위→아래): 사용자 버블 → Cline 계획 응답
  const userMsgO = useTransform(reveal, [0.78, 0.88], [0, 1]);
  const planO = useTransform(reveal, [0.86, 0.98], [0, 1]);

  return (
    <div className="flex h-full flex-col bg-[#0B0A0F]">
      {/* 패널 헤더 */}
      <motion.div
        style={{ opacity: headO }}
        className="flex items-center gap-2.5 border-b border-bone/10 px-[clamp(0.9rem,1.3vw,1.4rem)] py-2.5"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-md border border-gold/30 bg-gold/10">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-gold" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="4" y="7" width="16" height="11" rx="3" />
            <circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
            <path d="M12 3.5V7" />
          </svg>
        </span>
        <span className="font-display text-[clamp(0.85rem,1vw,1.05rem)] font-bold text-bone/85">Cline</span>
        <span className="ml-auto rounded-full border border-bone/15 bg-bone/[0.04] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/70 md:text-[10px]">
          Act
        </span>
      </motion.div>

      {/* 대화 영역 — 채팅처럼 위→아래로 메시지가 쌓인다 */}
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-3 px-[clamp(0.9rem,1.3vw,1.4rem)] py-[clamp(0.9rem,1.4vw,1.5rem)]">
        {/* Cline 인사말 (좌측) — 전송 전에만 */}
        <motion.div style={{ opacity: greetO }} className="flex items-start gap-2.5">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-gold" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="4" y="7" width="16" height="11" rx="3" />
              <circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
              <circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
              <path d="M12 3.5V7" />
            </svg>
          </span>
          <p className="max-w-[78%] rounded-2xl rounded-tl-md border border-bone/10 bg-bone/[0.04] px-3.5 py-2.5 font-body text-[clamp(0.82rem,0.98vw,1.05rem)] leading-relaxed text-bone/75">
            무엇을 도와드릴까요? 작업을 한국어로 적어주세요.
          </p>
        </motion.div>

        {/* 전송 후: 사용자 메시지 버블 (우측 정렬) */}
        <motion.div style={{ opacity: userMsgO }} className="flex justify-end">
          <p className="max-w-[78%] rounded-2xl rounded-tr-md border border-bone/15 bg-bone/[0.06] px-3.5 py-2.5 text-right font-body text-[clamp(0.82rem,0.98vw,1.05rem)] leading-relaxed text-bone/85">
            {COMMAND}
          </p>
        </motion.div>

        {/* 전송 후: Cline이 계획을 세우기 시작 (좌측 응답 = 성공 신호, 골드) */}
        <motion.div style={{ opacity: planO }} className="flex items-start gap-2.5">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
            <span className="h-2 w-2 animate-pulse-soft rounded-full bg-gold" />
          </span>
          <p className="max-w-[78%] rounded-2xl rounded-tl-md border border-gold/30 bg-gold/[0.07] px-3.5 py-2.5 font-mono text-[clamp(0.74rem,0.88vw,0.95rem)] leading-relaxed text-gold">
            작업 계획을 세우는 중… hello.txt 생성 준비
          </p>
        </motion.div>
      </div>

      {/* 입력창 + 보내기(↑) — 실제 Cline처럼 단일 전송 아이콘 */}
      <motion.div
        style={{ opacity: boxO }}
        className="relative px-[clamp(0.9rem,1.3vw,1.4rem)] pb-[clamp(0.9rem,1.4vw,1.5rem)]"
      >
        <div className="flex items-end gap-2 rounded-xl border border-bone/20 bg-bone/[0.04] px-3.5 py-3">
          <motion.p
            style={{ opacity: typeO }}
            className="min-w-0 flex-1 font-body text-[clamp(0.82rem,0.98vw,1.05rem)] leading-relaxed text-bone/85"
          >
            {COMMAND}
            <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.15em] bg-gold align-middle" />
          </motion.p>
          <motion.button
            type="button"
            style={{ opacity: sendO }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gold to-gold-bright text-ink shadow-[0_0_22px_rgba(232,181,75,0.45)]"
            aria-label="보내기"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </motion.button>
        </div>
        <p className="mt-1.5 pl-1 font-mono text-[9px] tracking-[0.14em] text-bone/70 md:text-[10px]">
          Enter 로 전송 · Shift+Enter 줄바꿈
        </p>
      </motion.div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.2], [0, 1]);
  const inputRingO = useTransform(reveal, [0.5, 0.62, 0.68, 0.74], [0, 1, 1, 0]);
  // 보내기 링은 클릭 직후(전송) 사라진다 — 성공 응답과 동시노출 금지
  const sendRingO = useTransform(reveal, [0.66, 0.74, 0.78, 0.84], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[880px]">
      <VSCodeMock title="my-ai — VS Code" view="editor" activeIcon="cline">
        <ClinePanel reveal={reveal} />
      </VSCodeMock>
      {/* 1) 입력창 클릭: 텍스트 baseline 중앙. 라벨은 위(빈 공간)로 */}
      <ClickRing x={28} y={85} label="입력창 클릭" dir="up" o={inputRingO} />
      {/* 2) 보내기(↑) 버튼 정중앙(우측 끝). 라벨은 위(빈 공간)로 — 버튼/텍스트 안 덮음 */}
      <ClickRing x={93} y={85} label="보내기" dir="up" o={sendRingO} />
    </motion.div>
  );
}

export default function D38FirstCommand() {
  return (
    <TutorialScene
      scene="d38"
      act="첫 작동 · 테스트"
      chapter="첫 작동 · 테스트"
      step={38}
      total={56}
      title="Cline에 첫 명령"
      goal="이번 단계: AI에게 첫 일을 시킨다"
      platform="both"
      steps={[
        "Cline 패널 아래의 입력창을 클릭한다",
        "이렇게 입력: 안녕? 이 폴더에 hello.txt 만들어서 '첫 성공'이라고 써줘",
        "보내기(↑) 버튼을 누르거나 Enter 로 전송한다",
      ]}
      success="Cline이 작업 계획을 세우고 움직이기 시작한다"
      Mockup={Mockup}
    />
  );
}
