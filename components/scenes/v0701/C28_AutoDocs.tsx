"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

/**
 * C28 — 메일/문서 자동 생성 [CASE · 전부 자동으로]
 * Result: 메일 템플릿 카드({이름}/{플랜} 골드 변수) → 화살표 → 샘플 메일 3개(다른 이름/플랜) + "× 80".
 * doc 레시피지만 "1 템플릿 → N 산출물" 팬아웃 구조로 다른 사례와 확연히 구별.
 */

const SCRIPT: ClineScript = {
  project: "mailmerge",
  userPrompt:
    "이 고객 명단 80명한테 이름·플랜 넣은 맞춤 안내메일 초안 80개 만들어줘.",
  steps: [
    { kind: "read", label: "customers.csv (80)", detail: "name · plan · email" },
    { kind: "create", label: "mails/ 80개 .txt", detail: "{이름}·{플랜} 치환" },
  ],
  terminal: [
    { p: "$", t: "python merge_mail.py" },
    { p: ">", t: "✔ 80 personalized drafts", gold: true },
  ],
};

/* 샘플 메일 — 결정적 데이터(렌더 중 random 금지) */
const SAMPLES: { name: string; plan: string; tone: string }[] = [
  { name: "김서연", plan: "프리미엄", tone: "border-bone/10 bg-bone/[0.03]" },
  { name: "이도현", plan: "스탠다드", tone: "border-bone/10 bg-bone/[0.03]" },
  { name: "박하늘", plan: "엔터프라이즈", tone: "border-gold/25 bg-gold/[0.05]" },
];

/* 샘플 메일 카드 — hook 안전을 위해 별도 컴포넌트로 분리(map 내 hook 금지) */
function SampleCard({
  reveal,
  sample,
  index,
}: {
  reveal: MotionValue<number>;
  sample: { name: string; plan: string; tone: string };
  index: number;
}) {
  const start = 0.5 + index * 0.09;
  const cardO = useTransform(reveal, [start, start + 0.2], [0, 1]);
  const cardX = useTransform(reveal, [start, start + 0.2], [18, 0]);
  return (
    <motion.div
      style={{ opacity: cardO, x: cardX }}
      className={`flex flex-1 flex-col justify-center gap-1 rounded-lg border px-3 py-2 ${sample.tone}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-body text-[10px] font-semibold text-bone/85 md:text-[12px]">
          {sample.name} 님께
        </span>
        <span className="font-mono text-[8px] text-bone/35 md:text-[9px]">
          draft_{String(index + 1).padStart(2, "0")}.txt
        </span>
      </div>
      <p className="truncate font-body text-[9px] text-bone/60 md:text-[11px]">
        선택하신 <span className="font-semibold text-gold">{sample.plan}</span> 플랜 안내드립니다.
      </p>
    </motion.div>
  );
}

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const frameO = useTransform(reveal, [0, 0.18], [0, 1]);
  const tplO = useTransform(reveal, [0.12, 0.4], [0, 1]);
  const tplY = useTransform(reveal, [0.12, 0.4], [16, 0]);
  const arrowO = useTransform(reveal, [0.38, 0.55], [0, 1]);
  const arrowX = useTransform(reveal, [0.38, 0.55], [-8, 0]);
  const fanO = useTransform(reveal, [0.5, 0.82], [0, 1]);
  const badgeO = useTransform(reveal, [0.78, 1], [0, 1]);
  const badgeS = useTransform(reveal, [0.78, 1], [0.86, 1]);

  return (
    <motion.div
      style={{ opacity: frameO }}
      className="absolute inset-0 flex items-stretch gap-3 p-3.5"
    >
      {/* ── 좌: 메일 템플릿 카드 ── */}
      <motion.div
        style={{ opacity: tplO, y: tplY }}
        className="flex w-[42%] flex-col overflow-hidden rounded-lg border border-bone/10 bg-[#15121A]"
      >
        <div className="flex items-center gap-1.5 border-b border-bone/10 px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone/55 md:text-[10px]">
            template.txt
          </span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-2 px-3 py-3 font-body text-[10px] leading-relaxed text-bone/70 md:text-[11px]">
          <p>
            <span className="text-bone/45">To:</span>{" "}
            <span className="rounded bg-gold/15 px-1 font-mono text-[9px] text-gold md:text-[10px]">{"{이름}"}</span>{" "}
            님께
          </p>
          <p className="text-bone/75">
            안녕하세요, 선택하신{" "}
            <span className="rounded bg-gold/15 px-1 font-mono text-[9px] text-gold md:text-[10px]">{"{플랜}"}</span>{" "}
            플랜 안내드립니다.
          </p>
          <div className="space-y-1 pt-0.5">
            <span className="block h-1.5 w-[90%] rounded-full bg-bone/[0.08]" />
            <span className="block h-1.5 w-[78%] rounded-full bg-bone/[0.08]" />
            <span className="block h-1.5 w-[84%] rounded-full bg-bone/[0.08]" />
          </div>
          <p className="mt-auto text-bone/45">— 네안데르 고객센터 드림</p>
        </div>
      </motion.div>

      {/* ── 중: 화살표 (팬아웃 기호) ── */}
      <motion.div
        style={{ opacity: arrowO, x: arrowX }}
        className="flex shrink-0 flex-col items-center justify-center gap-1 px-1.5"
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-bone/40">merge</span>
        <span className="text-[clamp(1rem,1.8vw,1.6rem)] leading-none text-gold">→</span>
      </motion.div>

      {/* ── 우: 샘플 메일 3개 + ×80 ── */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {SAMPLES.map((s, i) => (
          <SampleCard key={s.name} reveal={reveal} sample={s} index={i} />
        ))}

        {/* ×80 배지 + 나머지 흔적 */}
        <div className="relative flex flex-1 items-center justify-center">
          <motion.div
            style={{ opacity: fanO }}
            aria-hidden
            className="absolute inset-x-6 inset-y-2 rounded-lg border border-bone/[0.06] bg-bone/[0.015]"
          />
          <motion.div
            style={{ opacity: fanO }}
            aria-hidden
            className="absolute inset-x-3 inset-y-1 rounded-lg border border-bone/[0.08] bg-bone/[0.02]"
          />
          <motion.div
            style={{ opacity: badgeO, scale: badgeS }}
            className="relative flex items-baseline gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5"
          >
            <span className="font-display text-[clamp(1.1rem,2vw,1.7rem)] font-black leading-none text-gold">
              <span className="mr-0.5 tracking-tight">×</span>
              <span className="tabular-nums">80</span>
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold/70 md:text-[9px]">
              drafts
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function C28AutoDocs() {
  return (
    <CaseScene
      scene="c28"
      act="CASE · 전부 자동으로"
      cluster="F · 전부 자동으로"
      num={28}
      title="메일/문서 자동 생성"
      oldTool="문서 템플릿 SaaS · 메일머지 유료"
      lead="명단 한 장이면 맞춤 메일·계약서 수백 통을 자동으로."
      script={SCRIPT}
      Result={Result}
      resultTab="mails/"
    />
  );
}
