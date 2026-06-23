"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import VSCodeMock from "@/components/ui/VSCodeMock";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D36 — 모델 선택 (Qwen3.7-plus) [VSCodeMock settings 뷰 · Cline 모델 선택 폼]
 * 'Model' 드롭다운 펼침 → 후보 4개 중 Qwen3.7-plus(골드+체크) 선택 → [Done] 저장.
 */

type Model = { name: string; meta: string; pick?: boolean };
// 'Model' 드롭다운을 펼친 상태의 후보 목록(4개) — 본문 높이에 정확히 떨어져 잘림 없음.
const MODELS: Model[] = [
  { name: "anthropic/claude-opus-4.8", meta: "Anthropic · 최상위 추론" },
  { name: "openai/gpt-5.1", meta: "OpenAI · 범용 강자" },
  { name: "google/gemini-3-pro", meta: "Google · 멀티모달" },
  { name: "qwen/qwen3.7-plus", meta: "Alibaba · 가성비 코딩", pick: true },
];

function ModelRow({ m, i, reveal }: { m: Model; i: number; reveal: MotionValue<number> }) {
  const at = 0.26 + i * 0.05;
  const o = useTransform(reveal, [at, at + 0.1], [0, 1]);
  // 선택(골드 강조)은 클릭 링 이후에 점등
  const pickO = useTransform(reveal, [0.7, 0.86], [0, 1]);
  // Done 링 점등 구간(0.78~)에는 '선택됨' 칩 채도를 살짝 낮춰 현재 액션(저장)에 시선 집중
  const pickChipO = useTransform(reveal, [0.7, 0.86, 0.86, 1], [0, 1, 1, 0.78]);
  return (
    <motion.div
      style={{ opacity: o }}
      className="relative flex items-center gap-2.5 rounded-md border border-bone/10 bg-bone/[0.02] px-3 py-2.5"
    >
      {m.pick ? (
        <motion.span
          style={{ opacity: pickO }}
          className="pointer-events-none absolute inset-0 rounded-md border border-gold/55 bg-gold/[0.08] shadow-[0_0_22px_rgba(232,181,75,0.25)]"
        />
      ) : null}
      <span
        className={`relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
          m.pick ? "border-gold bg-gold" : "border-bone/25 bg-transparent"
        }`}
      >
        {m.pick ? (
          <motion.svg
            style={{ opacity: pickO }}
            viewBox="0 0 24 24"
            className="h-2.5 w-2.5 text-ink"
            fill="none"
            stroke="currentColor"
            strokeWidth={3.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 13l4 4L19 7" />
          </motion.svg>
        ) : null}
      </span>
      <span className="relative min-w-0 flex-1">
        <span
          className={`block truncate font-mono text-[clamp(0.8rem,0.95vw,1rem)] font-semibold ${
            m.pick ? "text-gold" : "text-bone/80"
          }`}
        >
          {m.name}
        </span>
        <span className="block truncate font-body text-[clamp(0.66rem,0.78vw,0.82rem)] text-bone/60">
          {m.meta}
        </span>
      </span>
      {m.pick ? (
        <motion.span
          style={{ opacity: pickChipO }}
          className="relative shrink-0 whitespace-nowrap rounded-full border border-gold/45 bg-gold/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-gold"
        >
          선택됨
        </motion.span>
      ) : null}
    </motion.div>
  );
}

function SettingsForm({ reveal }: { reveal: MotionValue<number> }) {
  // 드롭다운이 펼쳐지며 후보 목록이 나타남(검색=필터 사실성 깨짐 방지: 전체 후보를 보여주는 드롭다운 컨셉)
  const openO = useTransform(reveal, [0.14, 0.26], [0, 1]);
  const chevronRot = useTransform(openO, [0, 1], [0, 180]);
  // [Done] 저장 → 모델 칩 준비 완료
  const doneRingO = useTransform(reveal, [0.78, 0.92], [0, 1]);

  return (
    <div className="flex h-full flex-col p-[clamp(1rem,1.7vw,1.9rem)]">
      {/* 폼 헤더 */}
      <div className="flex items-center gap-2.5">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="4" y="7" width="16" height="11" rx="3" />
          <circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
          <path d="M12 3.5V7" />
        </svg>
        <h3 className="font-display text-[clamp(1.05rem,1.5vw,1.5rem)] font-bold text-bone">Cline · API 설정</h3>
        <span className="ml-auto rounded-full border border-bone/15 bg-bone/[0.04] px-2.5 py-0.5 font-mono text-[10px] tracking-[0.12em] text-bone/55">
          Provider: OpenRouter
        </span>
      </div>

      {/* Model 라벨 + 드롭다운(펼침) */}
      <div className="mt-[clamp(0.9rem,1.8vh,1.5rem)]">
        <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/60 md:text-[11px]">Model</label>
        <div className="mt-1.5 flex items-center gap-2 rounded-md border border-gold/35 bg-ink/60 px-3 py-2">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-bone/60" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
            <circle cx="11" cy="11" r="6" />
            <path d="m20 20-4-4" />
          </svg>
          <span className="flex-1 font-mono text-[clamp(0.85rem,1vw,1.1rem)] text-bone/85">모델 선택…</span>
          <motion.svg
            style={{ rotate: chevronRot }}
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0 text-gold"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        </div>
      </div>

      {/* 모델 후보 리스트 (드롭다운 펼침 결과) */}
      <motion.div style={{ opacity: openO }} className="mt-2.5 flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden">
        {MODELS.map((m, i) => (
          <ModelRow key={m.name} m={m} i={i} reveal={reveal} />
        ))}
      </motion.div>

      {/* 하단 저장 버튼 */}
      <div className="mt-[clamp(0.7rem,1.4vh,1.2rem)] flex items-center justify-end gap-2 border-t border-bone/10 pt-3">
        <span className="rounded-md border border-bone/15 px-3.5 py-1.5 font-body text-[clamp(0.78rem,0.9vw,0.95rem)] text-bone/45">취소</span>
        <span className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-gold px-4 py-1.5 font-body text-[clamp(0.8rem,0.95vw,1rem)] font-bold text-ink">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 13l4 4L19 7" />
            </svg>
            Done
          </span>
          <motion.span style={{ opacity: doneRingO }}>
            <ClickRing x={50} y={50} label="Done 클릭" dir="left" />
          </motion.span>
        </span>
      </div>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.2], [0, 1]);
  // Qwen3.7-plus 행(4번째)을 가리키는 링
  const rowRingO = useTransform(reveal, [0.54, 0.72, 0.78, 0.86], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[880px]">
      <VSCodeMock title="my-ai — VS Code · 설정" view="settings" activeIcon="cline">
        <SettingsForm reveal={reveal} />
      </VSCodeMock>
      {/* 모델 후보 마지막 행(Qwen3.7-plus) 라디오 위 */}
      <motion.div style={{ opacity: rowRingO }}>
        <ClickRing x={22} y={68} label="Qwen3.7-plus 선택" dir="right" />
      </motion.div>
    </motion.div>
  );
}

export default function D36PickModel() {
  return (
    <TutorialScene
      scene="d36"
      act="API 키 · AI 연결"
      chapter="API 키 · AI 연결"
      step={36}
      total={56}
      title="모델 선택 (Qwen3.7-plus)"
      goal="이번 단계: 오늘 쓸 AI 두뇌 고르기"
      platform="both"
      steps={[
        "설정의 'Model' 드롭다운을 클릭해 후보를 편다",
        "목록에서 Qwen3.7-plus 를 골라 선택",
        "[Done]/[저장]을 눌러 설정을 닫는다",
      ]}
      success="선택한 모델 칩(Qwen3.7-plus)이 표시되고 사용 준비 완료"
      Mockup={Mockup}
    />
  );
}
