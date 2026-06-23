"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";
import AppWindow from "@/components/ui/AppWindow";

/**
 * U01 — 무(無)에서 시작한다 [SETUP]
 * 텅 빈 VS Code 환영 화면 목업: 환영 영역이 고요히 떠오르고 커서가 깜빡인다.
 * 강조는 거의 없다 — 누구나 똑같은 출발선. 골드는 깜빡이는 커서 하나뿐.
 * 구조/모션은 U03(SETUP 견본)을 그대로 차용한다.
 */

export default function U01Nothing() {
  return (
    <section data-scene="u01" data-act="SETUP · 무에서 시작한다" className="relative bg-ink text-bone">
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  const glowO = useTransform(p, [0, 0.5, 1], [0.08, 0.16, 0.22]);
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
      {/* 배경 — 고요한 글로우(약하게) */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(50% 58% at 64% 48%, rgba(232,181,75,0.08), transparent 72%)" }} />
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
            <span className="font-mono text-[clamp(0.8rem,1vw,1rem)] tracking-[0.3em] text-gold/70">STEP 00 / 06</span>
            <h2 className="mt-3 font-display font-black leading-[1.14] text-bone text-[clamp(1.9rem,3vw,3.4rem)]">
              0에서 시작한다
              <br />
              <span className="text-gold [text-shadow:0_0_30px_rgba(232,181,75,0.35)]">무(無)에서.</span>
            </h2>
          </motion.div>
          <motion.div style={{ opacity: leadO, y: leadY }} className="mt-[clamp(1.6rem,3.4vh,2.6rem)] max-w-[480px]">
            <p className="text-balance-k leading-relaxed text-bone/70 text-[clamp(1rem,1.3vw,1.35rem)]">
              지금 네 화면엔 <span className="text-bone/90">아무것도 없다.</span> 좋다 — 우리는{" "}
              <span className="whitespace-nowrap text-gold">무(無)에서</span> 출발한다.{" "}
              <span className="text-bone/90">누구나 똑같은 출발선.</span>
            </p>
            <p className="mt-3 text-balance-k leading-relaxed text-bone/45 text-[clamp(0.9rem,1.1vw,1.1rem)]">
              빈 창 하나. 그게 전부다. <span className="whitespace-nowrap">여기서부터다.</span>
            </p>
          </motion.div>
          <motion.p style={{ opacity: noteO, y: noteY }} className="mt-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-gold/75 md:text-[11px]">
            <span className="inline-block h-px w-8 bg-gold/55" />
            누구나, 여기서 시작했다.
          </motion.p>
        </div>

        {/* 우측 — 텅 빈 VS Code 환영 화면 목업 */}
        <div className="flex h-full items-center justify-center">
          <WelcomeWindow p={p} />
        </div>
      </div>
    </div>
  );
}

function WelcomeWindow({ p }: { p: MotionValue<number> }) {
  const winO = useTransform(p, [0.04, 0.16], [0, 1]);
  const winY = useTransform(p, [0.04, 0.18], [56, 0]);
  const winS = useTransform(p, [0.04, 0.18], [0.965, 1]);

  /* 환영 영역이 고요히 떠오른다 */
  const welcomeO = useTransform(p, [0.3, 0.5], [0, 1]);
  const welcomeY = useTransform(p, [0.3, 0.5], [22, 0]);

  /* "열린 폴더 없음" 상태 라벨 점등 */
  const emptyO = useTransform(p, [0.2, 0.34], [0.25, 0.6]);

  /* 폴더 열기 안내가 자리 잡는다 */
  const hintO = useTransform(p, [0.56, 0.74], [0, 1]);

  return (
    <motion.div style={{ opacity: winO, y: winY, scale: winS }} className="w-full max-w-[860px]">
      <AppWindow title="시작하기 — Welcome" icon="vscode" rightLabel="VS Code">
        <div className="flex h-[clamp(360px,52vh,540px)]">
          {/* 좌측 EXPLORER — 열린 폴더 없음 */}
          <div className="hidden w-[210px] shrink-0 flex-col border-r border-bone/10 bg-[#0C0A11] md:flex">
            <div className="flex items-center gap-2 px-3.5 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-bone/40">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              <span>탐색기</span>
            </div>
            <motion.div style={{ opacity: emptyO }} className="flex flex-1 flex-col items-center justify-center gap-3 px-5 text-center">
              <svg viewBox="0 0 24 24" className="h-9 w-9 text-bone/20" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              <span className="font-mono text-[10px] leading-relaxed tracking-[0.04em] text-bone/35">
                열린 폴더 없음
              </span>
            </motion.div>
          </div>

          {/* 메인 — 빈 에디터 위 환영 영역 */}
          <div className="relative flex min-w-0 flex-1 flex-col bg-[#0A0810]">
            {/* 탭 바(빈 상태) */}
            <div className="flex h-9 shrink-0 items-center border-b border-bone/8 px-4">
              <span className="font-mono text-[10px] tracking-[0.06em] text-bone/25">시작하기</span>
            </div>

            {/* 중앙 환영 영역 */}
            <motion.div
              style={{ opacity: welcomeO, y: welcomeY }}
              className="flex flex-1 flex-col items-center justify-center gap-[clamp(1rem,2.2vh,1.8rem)] px-[clamp(1.5rem,3vw,3rem)] text-center"
            >
              {/* 워드마크 */}
              <div className="flex flex-col items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-12 w-12 text-bone/30" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M9 7 4 12l5 5M15 7l5 5-5 5" />
                </svg>
                <span className="font-display text-[clamp(1.3rem,2vw,2rem)] font-bold text-bone/55">
                  Visual Studio Code
                </span>
                <span className="font-mono text-[10px] tracking-[0.28em] text-bone/25 md:text-[11px]">
                  편집기로 코드를 다듬어 보세요
                </span>
              </div>

              {/* 폴더 열기 안내 + 깜빡이는 커서 */}
              <motion.div style={{ opacity: hintO }} className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2.5 rounded-md border border-bone/12 bg-bone/[0.03] px-4 py-2.5">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-bone/45" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                  <span className="font-body text-[clamp(0.85rem,1vw,1.05rem)] text-bone/60">폴더 열기</span>
                  <span className="ml-1 inline-block h-4 w-[2px] animate-blink-caret bg-gold" />
                </div>
                <span className="font-mono text-[10px] leading-relaxed tracking-[0.04em] text-bone/30 md:text-[11px]">
                  아직 아무것도 없습니다 — 빈 캔버스
                </span>
              </motion.div>
            </motion.div>

            {/* 하단 상태바(차분) */}
            <div className="flex h-7 shrink-0 items-center justify-between border-t border-bone/8 px-4 font-mono text-[10px] tracking-[0.06em] text-bone/25">
              <span>준비됨</span>
              <span>UTF-8 · 일반 텍스트</span>
            </div>
          </div>
        </div>
      </AppWindow>
    </motion.div>
  );
}
