"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import BrowserMock from "@/components/ui/BrowserMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D43 — GitHub 계정 만들기 [BrowserMock 가입 폼 + ClickRing]
 */
type Field = { label: string; value: string; hint?: string; mono?: boolean };
const FIELDS: Field[] = [
  { label: "이메일 주소 (Email)", value: "gildong@example.com" },
  { label: "비밀번호 (Password)", value: "••••••••••", hint: "15자 이상 또는 숫자·소문자 포함 8자 이상" },
  { label: "사용자 이름 (Username)", value: "gildong-kim", hint: "공개됩니다 · 깔끔한 영어로", mono: true },
];

function FieldRow({ field, i, reveal }: { field: Field; i: number; reveal: MotionValue<number> }) {
  const at = 0.18 + i * 0.08;
  const o = useTransform(reveal, [at, at + 0.12], [0, 1]);
  const first = i === 0;
  // 이메일(첫 칸) 골드 강조는 이메일 비트(reveal 0.46~0.62)에서만 살아있고,
  // Continue 비트로 넘어가면 꺼져 골드 신호가 버튼 하나로 수렴한다.
  const goldO = useTransform(reveal, [0.46, 0.62], [1, 0]);
  return (
    <motion.div style={{ opacity: o }} className="flex flex-col gap-1.5">
      <label className="text-balance-k font-body text-[clamp(0.78rem,0.92vw,0.98rem)] font-semibold text-bone/80">
        {field.label}
      </label>
      <div className="relative flex h-[clamp(2.2rem,3vw,2.7rem)] items-center rounded-md border border-bone/15 bg-bone/[0.05] px-3">
        {first ? (
          <motion.span
            style={{ opacity: goldO }}
            className="pointer-events-none absolute inset-0 rounded-md border border-gold/70 shadow-[0_0_22px_rgba(232,181,75,0.25)]"
          />
        ) : null}
        <span
          className={`truncate text-[clamp(0.82rem,0.98vw,1.05rem)] ${field.mono ? "font-mono" : "font-body"} ${
            first ? "text-bone" : "text-bone/60"
          }`}
        >
          {field.value}
        </span>
        {first ? (
          <motion.span style={{ opacity: goldO }} className="ml-0.5 h-[1.1em] w-px animate-pulse-soft bg-gold" />
        ) : null}
      </div>
      {field.hint ? (
        <span className="text-balance-k font-mono text-[10px] tracking-[0.04em] text-bone/60 md:text-[11px]">
          {field.hint}
        </span>
      ) : null}
    </motion.div>
  );
}

function SignupForm({ reveal }: { reveal: MotionValue<number> }) {
  const headO = useTransform(reveal, [0, 0.16], [0, 1]);
  const btnO = useTransform(reveal, [0.46, 0.62], [0, 1]);
  return (
    <div className="flex flex-col gap-[clamp(0.7rem,1.4vh,1.2rem)] px-[clamp(2rem,5vw,4rem)] py-[clamp(1.6rem,4vh,3rem)]">
      <motion.div style={{ opacity: headO }} className="flex flex-col items-center gap-1.5 text-center">
        <svg viewBox="0 0 24 24" className="h-9 w-9 text-bone" fill="currentColor" aria-hidden>
          <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
        </svg>
        <p className="font-display text-[clamp(1.1rem,1.7vw,1.7rem)] font-bold text-bone">
          GitHub에 오신 것을 환영합니다
        </p>
        <p className="font-body text-[clamp(0.78rem,0.95vw,1rem)] text-bone/70">계정을 만들어 보세요 · 무료</p>
      </motion.div>

      <div className="mt-1 flex flex-col gap-[clamp(0.6rem,1.3vh,1rem)]">
        {FIELDS.map((f, i) => (
          <FieldRow key={i} field={f} i={i} reveal={reveal} />
        ))}
      </div>

      <motion.div style={{ opacity: btnO }} className="mt-2">
        <span className="flex h-[clamp(2.4rem,3.3vw,3rem)] w-full items-center justify-center rounded-md bg-gradient-to-r from-gold to-gold-bright font-body text-[clamp(0.92rem,1.15vw,1.2rem)] font-bold text-ink shadow-[0_0_36px_rgba(232,181,75,0.35)]">
          Continue
        </span>
      </motion.div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.2], [0, 1]);
  const ring1O = useTransform(reveal, [0.3, 0.46, 0.62, 0.7], [0, 1, 1, 0]);
  const ring2O = useTransform(reveal, [0.66, 0.84], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[560px]">
      <BrowserMock url="github.com/signup">
        <SignupForm reveal={reveal} />
      </BrowserMock>
      {/* 첫 입력칸(이메일) */}
      <motion.div style={{ opacity: ring1O }}>
        <ClickRing x={80} y={37} label="이메일 입력" dir="left" />
      </motion.div>
      {/* Continue 버튼 — 링 중심점을 버튼 정중앙(y≈90)에 얹고, 라벨은 dir='down'으로 버튼 아래 빈 패딩으로 빼 입력칸과 겹치지 않게 */}
      <motion.div style={{ opacity: ring2O }}>
        <ClickRing x={50} y={90} label="Continue 클릭" dir="down" />
      </motion.div>
    </motion.div>
  );
}

export default function D43GithubAccount() {
  return (
    <TutorialScene
      scene="d43"
      act="Git · 백업과 협업"
      chapter="Git · 백업과 협업"
      step={43}
      total={56}
      title="GitHub 계정 만들기"
      goal="이번 단계: GitHub 가입"
      platform="both"
      steps={[
        "github.com 접속 → [Sign up] 클릭",
        "이메일 입력 → 비밀번호 만들기 → 사용자 이름(username) 정하기",
        "간단한 퍼즐로 사람 인증",
        "이메일로 온 코드를 입력하면 가입 완료",
      ]}
      success="내 GitHub 계정이 생긴다"
      tip="username은 공개되니 깔끔한 영어로(예: gildong-kim)"
      Mockup={Mockup}
    />
  );
}
