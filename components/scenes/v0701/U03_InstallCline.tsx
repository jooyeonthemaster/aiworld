"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";
import AppWindow from "@/components/ui/AppWindow";

/**
 * U03 — Cline 확장 설치 [SETUP 견본 / REFERENCE]
 * VS Code 확장 마켓플레이스 목업: "Cline" 검색 → 카드 등장 → 설치 버튼 점등 → "설치됨 ✓".
 * 세팅 씬(U01~U07)은 이 패턴(AppWindow 목업 + 스크롤 점등)을 그대로 차용.
 */

export default function U03InstallCline() {
  return (
    <section data-scene="u03" data-act="SETUP · 무에서 시작한다" className="relative bg-ink text-bone">
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
            <span className="font-mono text-[clamp(0.8rem,1vw,1rem)] tracking-[0.3em] text-gold/70">STEP 02 / 06</span>
            <h2 className="mt-3 font-display font-black leading-[1.14] text-bone text-[clamp(1.9rem,3vw,3.4rem)]">
              확장 하나로,
              <br />
              <span className="text-gold [text-shadow:0_0_30px_rgba(232,181,75,0.35)]">AI를 심는다.</span>
            </h2>
          </motion.div>
          <motion.div style={{ opacity: leadO, y: leadY }} className="mt-[clamp(1.6rem,3.4vh,2.6rem)] max-w-[460px]">
            <p className="text-balance-k leading-relaxed text-bone/70 text-[clamp(1rem,1.3vw,1.35rem)]">
              VS Code 왼쪽 <span className="text-bone/90">확장(Extensions)</span> 아이콘을 누르고 —{" "}
              <span className="whitespace-nowrap text-gold">&apos;Cline&apos;</span>을 검색해 <span className="text-bone/90">설치</span>.
            </p>
            <p className="mt-3 text-balance-k leading-relaxed text-bone/45 text-[clamp(0.9rem,1.1vw,1.1rem)]">
              확장 = 프로그램에 기능을 더하는 <span className="whitespace-nowrap">부품 하나.</span> 딱 그뿐이다.
            </p>
          </motion.div>
          <motion.p style={{ opacity: noteO, y: noteY }} className="mt-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-gold/75 md:text-[11px]">
            <span className="inline-block h-px w-8 bg-gold/55" />
            클릭 한 번. 이제 VS Code 안에 AI가 산다.
          </motion.p>
        </div>

        {/* 우측 마켓플레이스 목업 */}
        <div className="flex h-full items-center justify-center">
          <Marketplace p={p} />
        </div>
      </div>
    </div>
  );
}

function Marketplace({ p }: { p: MotionValue<number> }) {
  const winO = useTransform(p, [0.04, 0.16], [0, 1]);
  const winY = useTransform(p, [0.04, 0.18], [56, 0]);
  const winS = useTransform(p, [0.04, 0.18], [0.965, 1]);

  /* 검색어 타이핑 */
  const typed = useTransform(p, [0.16, 0.28], [0, 5]);
  const caretO = useTransform(p, [0.16, 0.28, 0.3], [1, 1, 0]);

  /* Cline 카드 등장 */
  const cardO = useTransform(p, [0.3, 0.42], [0, 1]);
  const cardY = useTransform(p, [0.3, 0.42], [22, 0]);

  /* 설치 → 설치됨 */
  const installPulse = useTransform(p, [0.46, 0.54], [0, 1]);
  const installedO = useTransform(p, [0.56, 0.66], [0, 1]);
  const installBtnO = useTransform(p, [0.56, 0.62], [1, 0]);

  return (
    <motion.div style={{ opacity: winO, y: winY, scale: winS }} className="w-full max-w-[860px]">
      <AppWindow title="확장 — Extensions Marketplace" icon="vscode" accent rightLabel="VS Code">
        <div className="flex h-[clamp(360px,52vh,540px)]">
          {/* 좌측 확장 리스트(흐림) */}
          <div className="hidden w-[200px] shrink-0 flex-col gap-2 border-r border-bone/10 bg-[#0C0A11] p-3 md:flex">
            <SearchBox typed={typed} caretO={caretO} />
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2 rounded-md border border-bone/8 bg-bone/[0.02] p-2 opacity-40">
                <span className="h-7 w-7 shrink-0 rounded bg-bone/10" />
                <div className="flex-1">
                  <span className="block h-2 w-16 rounded bg-bone/15" />
                  <span className="mt-1.5 block h-1.5 w-10 rounded bg-bone/10" />
                </div>
              </div>
            ))}
          </div>

          {/* 메인 — Cline 카드 */}
          <div className="flex min-w-0 flex-1 flex-col p-[clamp(1rem,1.6vw,1.8rem)]">
            <div className="md:hidden">
              <SearchBox typed={typed} caretO={caretO} />
            </div>
            <motion.div
              style={{ opacity: cardO, y: cardY }}
              className="mt-3 rounded-xl border border-gold/35 bg-[#0E0C12] p-[clamp(1rem,1.6vw,1.6rem)]"
            >
              <div className="flex items-start gap-3.5">
                {/* 로봇 아이콘 타일 */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="4" y="7" width="16" height="11" rx="3" />
                    <circle cx="9.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
                    <circle cx="14.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
                    <path d="M12 3.5V7" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-bone text-[clamp(1.15rem,1.6vw,1.6rem)]">Cline</h3>
                    <span className="rounded bg-bone/[0.06] px-1.5 py-0.5 font-mono text-[9px] text-bone/40 md:text-[10px]">v3.x</span>
                  </div>
                  <p className="mt-0.5 font-mono text-[10px] tracking-[0.04em] text-bone/45 md:text-[11px]">
                    cline · 자율 코딩 에이전트
                  </p>
                  <div className="mt-1.5 flex items-center gap-3 font-mono text-[10px] text-bone/40 md:text-[11px]">
                    <span className="text-gold/80">★ 4.9</span>
                    <span>1.4M 설치</span>
                  </div>
                </div>

                {/* 설치 버튼 / 설치됨 */}
                <div className="relative shrink-0">
                  <motion.button
                    style={{ opacity: installBtnO }}
                    className="relative rounded-md bg-gold px-4 py-2 font-body text-[clamp(0.8rem,0.95vw,1rem)] font-bold text-ink"
                  >
                    <motion.span
                      aria-hidden
                      style={{ opacity: installPulse }}
                      className="animate-pulse-soft absolute -inset-1.5 rounded-lg"
                    >
                      <span className="block h-full w-full rounded-lg" style={{ boxShadow: "0 0 26px rgba(232,181,75,0.6)" }} />
                    </motion.span>
                    설치
                  </motion.button>
                  <motion.span
                    style={{ opacity: installedO }}
                    className="absolute inset-0 flex items-center justify-center gap-1.5 rounded-md border border-gold/40 bg-gold/10 px-3 font-body text-[clamp(0.78rem,0.9vw,0.95rem)] font-bold text-gold"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    설치됨
                  </motion.span>
                </div>
              </div>

              <p className="mt-4 border-t border-bone/10 pt-4 font-body text-[clamp(0.85rem,1vw,1.05rem)] leading-relaxed text-bone/60">
                파일을 읽고, 코드를 쓰고, 터미널 명령을 직접 실행하는 — VS Code 안의 자율 AI 에이전트.
                OpenRouter·Claude·Qwen 등 원하는 모델을 연결해 쓴다.
              </p>
            </motion.div>

            {/* 설치 완료 토스트 */}
            <motion.div
              style={{ opacity: installedO }}
              className="mt-4 flex items-center gap-2.5 self-start rounded-lg border border-gold/30 bg-gold/[0.07] px-3.5 py-2.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-soft" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold md:text-[11px]">Cline 설치됨 — 좌측에 로봇 아이콘 등장</span>
            </motion.div>
          </div>
        </div>
      </AppWindow>
    </motion.div>
  );
}

function SearchBox({ typed, caretO }: { typed: MotionValue<number>; caretO: MotionValue<number> }) {
  const text = useTransform(typed, (v: number) => "Cline".slice(0, Math.round(v)));
  return (
    <div className="flex items-center gap-2 rounded-md border border-bone/15 bg-bone/[0.04] px-3 py-2">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-bone/40" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
        <circle cx="11" cy="11" r="6" />
        <path d="m20 20-4-4" />
      </svg>
      <span className="flex items-center font-mono text-[clamp(0.8rem,0.95vw,1rem)] text-bone/80">
        <motion.span>{text}</motion.span>
        <motion.span style={{ opacity: caretO }} className="ml-px inline-block h-3.5 w-[1.5px] bg-gold" />
      </span>
    </div>
  );
}
