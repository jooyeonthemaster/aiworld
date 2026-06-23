"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";
import AppWindow from "@/components/ui/AppWindow";

/**
 * U04 — OpenRouter 연결 [SETUP]
 * Cline 설정 목업: 'API Provider' 드롭다운이 스크롤로 열림 → 'OpenRouter' 행 골드 하이라이트
 * → 선택됨(체크) → 아래 'API Key' 입력칸이 흐리게 등장(다음 스텝 예고).
 * 컨셉: 열쇠 하나로, 모든 두뇌(Qwen·Claude·GPT)에 접속.
 */

const PROVIDERS: { name: string; sub: string }[] = [
  { name: "Anthropic", sub: "Claude 전용" },
  { name: "OpenAI", sub: "GPT 전용" },
  { name: "OpenRouter", sub: "Qwen · Claude · GPT 전부" },
  { name: "Google Gemini", sub: "Gemini 전용" },
];

export default function U04OpenRouter() {
  return (
    <section data-scene="u04" data-act="SETUP · 무에서 시작한다" className="relative bg-ink text-bone">
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  const glowO = useTransform(p, [0, 0.5, 1], [0.14, 0.32, 0.46]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  const kickO = useTransform(p, [0.02, 0.1], [0, 1]);
  const kickY = useTransform(p, [0.02, 0.12], [26, 0]);
  const titleO = useTransform(p, [0.06, 0.18], [0, 1]);
  const titleY = useTransform(p, [0.06, 0.2], [34, 0]);
  const leadO = useTransform(p, [0.24, 0.36], [0, 1]);
  const leadY = useTransform(p, [0.24, 0.36], [20, 0]);
  const noteO = useTransform(p, [0.66, 0.8], [0, 1]);
  const noteY = useTransform(p, [0.66, 0.8], [18, 0]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* 배경 */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(48% 56% at 66% 46%, rgba(232,181,75,0.10), transparent 72%)" }} />
      </motion.div>
      <motion.div aria-hidden style={{ y: gridShift }} className="pointer-events-none absolute inset-[-10%] opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,237,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,227,0.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(78% 78% at 50% 50%, black, transparent 100%)",
          }}
        />
      </motion.div>

      {/* 콘텐츠 */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 content-center items-center gap-[clamp(2rem,4vw,4.5rem)] px-[clamp(2rem,5vw,7rem)] py-[6vh] lg:grid-cols-[0.82fr_1.18fr]">
        {/* 좌측 내러티브 */}
        <div className="flex flex-col justify-center">
          <motion.div style={{ opacity: kickO, y: kickY }}>
            <Kicker>SETUP · 무에서 시작한다</Kicker>
          </motion.div>
          <motion.div style={{ opacity: titleO, y: titleY }} className="mt-7">
            <span className="font-mono text-[clamp(0.8rem,1vw,1rem)] tracking-[0.3em] text-gold/70">STEP 03 / 06</span>
            <h2 className="mt-3 font-display font-black leading-[1.14] text-bone text-[clamp(1.9rem,3vw,3.4rem)]">
              한 곳에서, 모든 모델을
              <br />
              <span className="text-gold [text-shadow:0_0_30px_rgba(232,181,75,0.35)]">OpenRouter.</span>
            </h2>
          </motion.div>
          <motion.div style={{ opacity: leadO, y: leadY }} className="mt-[clamp(1.6rem,3.4vh,2.6rem)] max-w-[480px]">
            <p className="text-balance-k leading-relaxed text-bone/70 text-[clamp(1rem,1.3vw,1.35rem)]">
              OpenRouter = <span className="text-bone/90">모델 백화점.</span>{" "}
              <span className="whitespace-nowrap">API 키 하나로</span>{" "}
              <span className="whitespace-nowrap text-bone/90">Qwen·Claude·GPT</span>를 전부 쓴다.
            </p>
            <p className="mt-3 text-balance-k leading-relaxed text-bone/45 text-[clamp(0.9rem,1.1vw,1.1rem)]">
              API 키 = <span className="whitespace-nowrap text-gold/85">출입증 하나.</span> 골라야 할 건
              <span className="whitespace-nowrap"> 딱 한 줄,</span> Provider 뿐이다.
            </p>
          </motion.div>
          <motion.p style={{ opacity: noteO, y: noteY }} className="mt-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-gold/75 md:text-[11px]">
            <span className="inline-block h-px w-8 bg-gold/55" />
            열쇠 하나로, 모든 두뇌에 접속.
          </motion.p>
        </div>

        {/* 우측 Cline 설정 목업 */}
        <div className="flex h-full items-center justify-center">
          <SettingsPanel p={p} />
        </div>
      </div>
    </div>
  );
}

function SettingsPanel({ p }: { p: MotionValue<number> }) {
  const winO = useTransform(p, [0.04, 0.16], [0, 1]);
  const winY = useTransform(p, [0.04, 0.18], [56, 0]);
  const winS = useTransform(p, [0.04, 0.18], [0.965, 1]);

  /* 드롭다운: 닫힘(트리거) → 열림(리스트) */
  const triggerO = useTransform(p, [0.18, 0.28], [1, 0]);
  const caretRot = useTransform(p, [0.18, 0.3], [0, 180]);
  const listH = useTransform(p, [0.26, 0.38], [0, 1]);
  const listO = useTransform(p, [0.26, 0.36], [0, 1]);

  /* 선택 확정 → 트리거에 OpenRouter 표시 + 체크 */
  const chosenO = useTransform(p, [0.6, 0.7], [0, 1]);
  const checkO = useTransform(p, [0.62, 0.72], [0, 1]);

  /* API Key 입력칸: 다음 스텝 예고로 흐리게 등장 */
  const keyO = useTransform(p, [0.74, 0.86], [0, 1]);
  const keyY = useTransform(p, [0.74, 0.86], [16, 0]);

  return (
    <motion.div style={{ opacity: winO, y: winY, scale: winS }} className="w-full max-w-[860px]">
      <AppWindow title="Cline — 설정" icon="settings" accent rightLabel="Settings">
        <div className="flex h-[clamp(360px,52vh,540px)] flex-col p-[clamp(1.2rem,2vw,2.2rem)]">
          {/* 섹션 헤더 */}
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-bone/45 md:text-[11px]">
              API Configuration
            </span>
          </div>

          {/* API Provider 필드 */}
          <label className="mt-5 block font-body text-[clamp(0.85rem,1vw,1.05rem)] font-semibold text-bone/85">
            API Provider
          </label>
          <p className="mt-1 font-mono text-[10px] text-bone/55 md:text-[11px]">
            어떤 관문으로 모델에 접속할지 고른다
          </p>

          {/* 드롭다운 */}
          <div className="relative mt-2.5">
            {/* 트리거(닫힘 상태) — 선택 전엔 placeholder, 선택 후엔 OpenRouter */}
            <div className="relative flex items-center justify-between rounded-lg border border-gold/40 bg-[#0E0C12] px-4 py-3">
              <span className="flex items-center gap-2.5">
                <KeyGlyph className="h-4 w-4 text-gold/70" />
                <motion.span style={{ opacity: triggerO }} className="absolute font-body text-[clamp(0.85rem,1vw,1.05rem)] text-bone/35">
                  Provider 선택…
                </motion.span>
                <motion.span style={{ opacity: chosenO }} className="font-body text-[clamp(0.9rem,1.05vw,1.15rem)] font-bold text-gold">
                  OpenRouter
                </motion.span>
              </span>
              <span className="flex items-center gap-3">
                <motion.svg style={{ opacity: checkO }} viewBox="0 0 24 24" className="h-4 w-4 text-gold" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 13l4 4L19 7" />
                </motion.svg>
                <motion.svg style={{ rotate: caretRot }} viewBox="0 0 24 24" className="h-4 w-4 text-bone/50" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M6 9l6 6 6-6" />
                </motion.svg>
              </span>
            </div>

            {/* 펼쳐진 리스트 */}
            <motion.div
              style={{ opacity: listO, scaleY: listH, transformOrigin: "top" }}
              className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-lg border border-bone/15 bg-[#0C0A11] p-1.5 shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
            >
              {PROVIDERS.map((prov, i) => (
                <ProviderRow key={prov.name} p={p} name={prov.name} sub={prov.sub} index={i} highlight={prov.name === "OpenRouter"} />
              ))}
            </motion.div>
          </div>

          {/* API Key 필드(다음 스텝 예고 — 흐리게) */}
          <motion.div style={{ opacity: keyO, y: keyY }} className="mt-auto">
            <label className="block font-body text-[clamp(0.85rem,1vw,1.05rem)] font-semibold text-bone/45">
              API Key
            </label>
            <div className="mt-2 flex items-center gap-2.5 rounded-lg border border-dashed border-bone/15 bg-bone/[0.015] px-4 py-3">
              <KeyGlyph className="h-4 w-4 text-bone/25" />
              <span className="font-mono text-[clamp(0.8rem,0.95vw,1rem)] tracking-[0.18em] text-bone/20">
                sk-or-············
              </span>
              <span className="ml-auto rounded bg-bone/[0.05] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-bone/30 md:text-[10px]">
                STEP 04 →
              </span>
            </div>
            <p className="mt-2.5 flex items-center gap-2 font-mono text-[10px] text-gold/70 md:text-[11px]">
              <span className="inline-block h-px w-5 bg-gold/45" />
              열쇠 하나면, 안의 모든 두뇌가 네 것이 된다.
            </p>
          </motion.div>
        </div>
      </AppWindow>
    </motion.div>
  );
}

function ProviderRow({
  p,
  name,
  sub,
  index,
  highlight,
}: {
  p: MotionValue<number>;
  name: string;
  sub: string;
  index: number;
  highlight: boolean;
}) {
  /* 행이 위에서부터 순차 등장 */
  const start = 0.3 + index * 0.04;
  const rowO = useTransform(p, [start, start + 0.06], [0, 1]);
  const rowX = useTransform(p, [start, start + 0.06], [-12, 0]);
  /* OpenRouter 행만 골드 하이라이트로 점등 */
  const hlO = useTransform(p, highlight ? [0.5, 0.6] : [0, 1], highlight ? [0, 1] : [0, 0]);

  return (
    <motion.div style={{ opacity: rowO, x: rowX }} className="relative rounded-md">
      <motion.span
        aria-hidden
        style={{ opacity: hlO }}
        className="absolute inset-0 rounded-md border border-gold/45 bg-gold/[0.09]"
      />
      <div className="relative flex items-center gap-3 px-3 py-2.5">
        <span className={`h-2 w-2 shrink-0 rounded-full ${highlight ? "bg-gold" : "bg-bone/25"}`} />
        <span className="min-w-0 flex-1">
          <span
            className={`block truncate font-body text-[clamp(0.85rem,1vw,1.05rem)] ${highlight ? "font-bold text-gold" : "font-medium text-bone/75"}`}
          >
            {name}
          </span>
          <span className={`block truncate font-mono text-[10px] md:text-[11px] ${highlight ? "text-gold/65" : "text-bone/55"}`}>
            {sub}
          </span>
        </span>
        {highlight ? (
          <motion.svg style={{ opacity: hlO }} viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 13l4 4L19 7" />
          </motion.svg>
        ) : null}
      </div>
    </motion.div>
  );
}

function KeyGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="8" cy="8" r="4" />
      <path d="M11 11l8 8M16 16l2-2M18 18l2-2" />
    </svg>
  );
}
