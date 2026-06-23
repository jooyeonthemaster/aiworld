"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";
import AppWindow from "@/components/ui/AppWindow";

/**
 * U06 — 공용 수업용 API 키 [SETUP]
 * Cline API Key 설정 목업: 마스킹된 공용 키가 progress 로 타이핑되어 입력칸을 채움 →
 * 자물쇠가 열리고 "연결됨 ✓"(골드) → 토스트 "로그인 불필요 · 수업용 공용 키 1개로 전원 입장".
 * 핵심 메시지 = "로그인 없이". U03 의 패턴(AppWindow 목업 + 스크롤 점등)을 그대로 차용.
 */

const KEY_TEXT = "sk-or-v1-••••••••••••••••";

export default function U06ClassKey() {
  return (
    <section data-scene="u06" data-act="SETUP · 무에서 시작한다" className="relative bg-ink text-bone">
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
      {/* 배경 글로우 */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(48% 56% at 66% 46%, rgba(232,181,75,0.10), transparent 72%)" }} />
      </motion.div>
      {/* 그리드 패럴랙스 */}
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
            <span className="font-mono text-[clamp(0.8rem,1vw,1rem)] tracking-[0.3em] text-gold/70">STEP 05 / 06</span>
            <h2 className="mt-3 font-display font-black leading-[1.14] text-bone text-[clamp(1.9rem,3vw,3.4rem)]">
              열쇠 하나로, 전원 입장
              <br />
              <span className="text-gold [text-shadow:0_0_30px_rgba(232,181,75,0.35)]">로그인, 없다.</span>
            </h2>
          </motion.div>
          <motion.div style={{ opacity: leadO, y: leadY }} className="mt-[clamp(1.6rem,3.4vh,2.6rem)] max-w-[480px]">
            <p className="text-balance-k leading-relaxed text-bone/70 text-[clamp(1rem,1.3vw,1.35rem)]">
              선생님이 발급한 <span className="text-bone/90">&quot;공용 수업용 API 키&quot;</span>를 붙여넣기.{" "}
              <span className="whitespace-nowrap text-gold">회원가입도, 로그인도</span> 필요 없다 — 전원 같은 열쇠로 입장.
            </p>
            <p className="mt-3 text-balance-k leading-relaxed text-bone/45 text-[clamp(0.9rem,1.1vw,1.1rem)]">
              열쇠 = 문을 여는 한 조각. 누가 만들었는지 묻지 않고, <span className="whitespace-nowrap">맞으면 열린다.</span>
            </p>
          </motion.div>
          <motion.p style={{ opacity: noteO, y: noteY }} className="mt-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-gold/75 md:text-[11px]">
            <span className="inline-block h-px w-8 bg-gold/55" />
            회원가입 X · 로그인 X · 붙여넣기 한 번.
          </motion.p>
        </div>

        {/* 우측 API Key 설정 목업 */}
        <div className="flex h-full items-center justify-center">
          <KeyPanel p={p} />
        </div>
      </div>
    </div>
  );
}

function KeyPanel({ p }: { p: MotionValue<number> }) {
  const winO = useTransform(p, [0.04, 0.16], [0, 1]);
  const winY = useTransform(p, [0.04, 0.18], [56, 0]);
  const winS = useTransform(p, [0.04, 0.18], [0.965, 1]);

  /* 키 타이핑 진행(0→길이) + 캐럿 */
  const typed = useTransform(p, [0.2, 0.5], [0, KEY_TEXT.length]);
  const caretO = useTransform(p, [0.2, 0.5, 0.52], [1, 1, 0]);
  const keyText = useTransform(typed, (v: number) => KEY_TEXT.slice(0, Math.round(v)));
  /* 입력 진행바 */
  const fill = useTransform(p, [0.2, 0.5], [0, 100]);
  const fillW = useTransform(fill, (v: number) => `${v}%`);

  /* 자물쇠 잠김 → 열림 */
  const lockedO = useTransform(p, [0.5, 0.58], [1, 0]);
  const unlockO = useTransform(p, [0.52, 0.62], [0, 1]);

  /* 연결됨 + 토스트 */
  const connectO = useTransform(p, [0.56, 0.66], [0, 1]);
  const connectBtnO = useTransform(p, [0.5, 0.56], [1, 0]);
  const toastO = useTransform(p, [0.62, 0.74], [0, 1]);
  const toastY = useTransform(p, [0.62, 0.74], [16, 0]);

  /* 헤더 배지 점등 */
  const badgeO = useTransform(p, [0.04, 0.2], [0.5, 1]);

  return (
    <motion.div style={{ opacity: winO, y: winY, scale: winS }} className="w-full max-w-[860px]">
      <AppWindow title="Cline — API Key" icon="settings" accent rightLabel="VS Code">
        <div className="flex h-[clamp(360px,52vh,540px)] flex-col p-[clamp(1.1rem,1.8vw,2rem)]">
          {/* 헤더 */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10">
              <LockSwap lockedO={lockedO} unlockO={unlockO} />
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-bone text-[clamp(1.05rem,1.4vw,1.4rem)]">API 공급자 연결</h3>
              <p className="mt-0.5 font-mono text-[10px] tracking-[0.04em] text-bone/45 md:text-[11px]">
                OpenRouter · Qwen3.7-plus
              </p>
            </div>
            <motion.span
              style={{ opacity: badgeO }}
              className="ml-auto rounded-full border border-bone/12 bg-bone/[0.04] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-bone/40 md:text-[10px]"
            >
              수업용 공용
            </motion.span>
          </div>

          {/* API Key 입력칸 */}
          <div className="mt-[clamp(1.1rem,2.4vh,1.8rem)]">
            <label className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone/45 md:text-[11px]">API Key</label>
            <div className="mt-2 flex items-center gap-2 rounded-lg border border-gold/35 bg-[#0E0C12] px-3.5 py-3">
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-gold/70" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M14 7a4 4 0 1 0-3 6.9L8 17v3h3l1-1v-2l1.4-1.4A4 4 0 0 0 14 7Z" />
                <circle cx="15.5" cy="8.5" r="0.7" fill="currentColor" stroke="none" />
              </svg>
              <span className="flex min-w-0 flex-1 items-center font-mono text-[clamp(0.85rem,1vw,1.05rem)] tracking-[0.04em] text-bone/85">
                <motion.span className="truncate">{keyText}</motion.span>
                <motion.span style={{ opacity: caretO }} className="ml-px inline-block h-4 w-[1.5px] shrink-0 bg-gold" />
              </span>
            </div>
            {/* 진행바 */}
            <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-bone/[0.06]">
              <motion.div style={{ width: fillW }} className="h-full rounded-full bg-gold/80" />
            </div>
            <p className="mt-1.5 font-mono text-[9px] tracking-[0.04em] text-bone/30 md:text-[10px]">
              붙여넣기 중 — 선생님이 채팅으로 보내준 키 그대로.
            </p>
          </div>

          {/* 로그인 불필요 강조: 회원가입/로그인 칸이 잠겨있음(사용 안함) */}
          <div className="mt-[clamp(1rem,2.2vh,1.6rem)] grid grid-cols-2 gap-2.5">
            <DisabledField label="이메일 / 회원가입" />
            <DisabledField label="비밀번호 / 로그인" />
          </div>

          {/* 하단 — 연결 버튼 → 연결됨 ✓ */}
          <div className="relative mt-auto flex items-center justify-between pt-[clamp(1rem,2vh,1.6rem)]">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/30 md:text-[10px]">
              endpoint · openrouter.ai/api
            </span>
            <div className="grid">
              <motion.span
                style={{ opacity: connectBtnO }}
                className="col-start-1 row-start-1 flex items-center justify-center rounded-md bg-bone/[0.06] px-5 py-2 font-body text-[clamp(0.8rem,0.95vw,1rem)] font-bold text-bone/55"
              >
                연결
              </motion.span>
              <motion.span
                style={{ opacity: connectO }}
                className="col-start-1 row-start-1 flex items-center justify-center gap-1.5 rounded-md border border-gold/45 bg-gold/12 px-3 font-body text-[clamp(0.78rem,0.9vw,0.95rem)] font-bold text-gold [text-shadow:0_0_18px_rgba(232,181,75,0.4)]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span className="whitespace-nowrap">연결됨</span>
              </motion.span>
            </div>
          </div>

          {/* 토스트 */}
          <motion.div
            style={{ opacity: toastO, y: toastY }}
            className="mt-3 flex items-center gap-2.5 self-start rounded-lg border border-gold/30 bg-gold/[0.07] px-3.5 py-2.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-soft" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold md:text-[11px]">
              로그인 불필요 · 수업용 공용 키 1개로 전원 입장
            </span>
          </motion.div>
        </div>
      </AppWindow>
    </motion.div>
  );
}

function LockSwap({ lockedO, unlockO }: { lockedO: MotionValue<number>; unlockO: MotionValue<number> }) {
  return (
    <span className="relative block h-5 w-5">
      {/* 잠김 */}
      <motion.svg
        style={{ opacity: lockedO }}
        viewBox="0 0 24 24" className="absolute inset-0 h-5 w-5 text-bone/50" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden
      >
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </motion.svg>
      {/* 열림 */}
      <motion.svg
        style={{ opacity: unlockO }}
        viewBox="0 0 24 24" className="absolute inset-0 h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden
      >
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 7.5-2" />
      </motion.svg>
    </span>
  );
}

function DisabledField({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-dashed border-bone/15 bg-bone/[0.02] px-3 py-2.5">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-bone/60" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[9px] tracking-[0.04em] text-bone/65 line-through decoration-bone/30 md:text-[10px]">{label}</span>
        <span className="mt-1 block h-1.5 w-full rounded bg-bone/12" />
      </span>
      <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.2em] text-bone/60 md:text-[9px]">사용 안 함</span>
    </div>
  );
}
