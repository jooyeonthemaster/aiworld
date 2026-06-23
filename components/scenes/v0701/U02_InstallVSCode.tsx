"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";
import AppWindow from "@/components/ui/AppWindow";

/**
 * U02 — VS Code 설치 [SETUP / STEP 01]
 * 다운로드 페이지 목업: code.visualstudio.com → 골드 'Download for Windows' 버튼 펄스
 * → 하단 다운로드 진행바(0→100%, progress 연동) → '설치 완료 ✓'. '무료 · 5분' 배지.
 * U03 와 동일 구조(AppWindow 목업 + 스크롤 점등)를 그대로 차용.
 */

export default function U02InstallVSCode() {
  return (
    <section data-scene="u02" data-act="SETUP · 무에서 시작한다" className="relative bg-ink text-bone">
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
            <span className="font-mono text-[clamp(0.8rem,1vw,1rem)] tracking-[0.3em] text-gold/70">STEP 01 / 06</span>
            <h2 className="mt-3 font-display font-black leading-[1.14] text-bone text-[clamp(1.9rem,3vw,3.4rem)]">
              먼저, VS Code를 깐다
              <br />
              <span className="text-gold [text-shadow:0_0_30px_rgba(232,181,75,0.35)]">무료 · 5분.</span>
            </h2>
          </motion.div>
          <motion.div style={{ opacity: leadO, y: leadY }} className="mt-[clamp(1.6rem,3.4vh,2.6rem)] max-w-[470px]">
            <p className="text-balance-k leading-relaxed text-bone/70 text-[clamp(1rem,1.3vw,1.35rem)]">
              마이크로소프트가 만든 <span className="text-bone/90">무료 코드 에디터.</span>{" "}
              <span className="whitespace-nowrap text-gold">code.visualstudio.com</span> 에서 받아 5분이면 끝.
            </p>
            <p className="mt-3 text-balance-k leading-relaxed text-bone/45 text-[clamp(0.9rem,1.1vw,1.1rem)]">
              내 운영체제는 사이트가 알아서 <span className="whitespace-nowrap">감지한다.</span> 누를 건 단 하나.
            </p>
          </motion.div>
          <motion.p style={{ opacity: noteO, y: noteY }} className="mt-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-gold/75 md:text-[11px]">
            <span className="inline-block h-px w-8 bg-gold/55" />
            딱 한 번. 그러면 평생 쓴다.
          </motion.p>
        </div>

        {/* 우측 다운로드 페이지 목업 */}
        <div className="flex h-full items-center justify-center">
          <DownloadPage p={p} />
        </div>
      </div>
    </div>
  );
}

function DownloadPage({ p }: { p: MotionValue<number> }) {
  const winO = useTransform(p, [0.04, 0.16], [0, 1]);
  const winY = useTransform(p, [0.04, 0.18], [56, 0]);
  const winS = useTransform(p, [0.04, 0.18], [0.965, 1]);

  /* 큰 골드 버튼 펄스(스크롤로 클릭 연출) */
  const btnPulse = useTransform(p, [0.3, 0.4], [0, 1]);
  const btnPress = useTransform(p, [0.38, 0.44, 0.5], [1, 0.965, 1]);

  /* 다운로드 진행바 0→100% */
  const barW = useTransform(p, [0.44, 0.72], ["0%", "100%"]);
  const pctV = useTransform(p, [0.44, 0.72], [0, 100]);
  const pctText = useTransform(pctV, (v: number) => `${Math.round(v)}%`);
  const barTrackO = useTransform(p, [0.42, 0.5], [0, 1]);

  /* 설치 완료 */
  const doneO = useTransform(p, [0.78, 0.88], [0, 1]);
  const doneY = useTransform(p, [0.78, 0.88], [14, 0]);

  return (
    <motion.div style={{ opacity: winO, y: winY, scale: winS }} className="w-full max-w-[860px]">
      <AppWindow title="code.visualstudio.com" icon="browser" accent rightLabel="Download">
        <div className="flex h-[clamp(360px,52vh,540px)] flex-col">
          {/* 브라우저 주소창 */}
          <div className="flex items-center gap-2.5 border-b border-bone/10 bg-[#0C0A11] px-4 py-2.5">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-gold/70" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            <div className="flex flex-1 items-center rounded-md border border-bone/10 bg-bone/[0.04] px-3 py-1.5 font-mono text-[11px] tracking-[0.02em] text-bone/55 md:text-[12px]">
              <span className="text-bone/35">https://</span>code.visualstudio.com<span className="text-bone/35">/download</span>
            </div>
            <span className="rounded bg-gold/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/80 md:text-[10px]">공식</span>
          </div>

          {/* 다운로드 히어로 */}
          <div className="flex min-w-0 flex-1 flex-col items-center justify-center px-[clamp(1.2rem,2.4vw,2.6rem)] py-[clamp(1rem,2vh,1.8rem)] text-center">
            {/* 로고 타일 */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10">
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-gold" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 7 4 12l5 5M15 7l5 5-5 5" />
              </svg>
            </div>
            <h3 className="mt-4 font-display font-bold text-bone text-[clamp(1.2rem,1.9vw,1.85rem)]">
              Visual Studio Code
            </h3>
            <p className="mt-1 font-mono text-[10px] tracking-[0.04em] text-bone/45 md:text-[11px]">
              무료 · 오픈소스 · Microsoft
            </p>

            {/* 큰 골드 다운로드 버튼 */}
            <div className="relative mt-5">
              <motion.button
                style={{ scale: btnPress }}
                className="relative flex items-center gap-2.5 rounded-xl bg-gold px-[clamp(1.4rem,2vw,2.2rem)] py-[clamp(0.7rem,1vw,1rem)] font-body text-[clamp(0.95rem,1.15vw,1.25rem)] font-bold text-ink"
              >
                <motion.span
                  aria-hidden
                  style={{ opacity: btnPulse }}
                  className="animate-pulse-soft absolute -inset-2 rounded-2xl"
                >
                  <span className="block h-full w-full rounded-2xl" style={{ boxShadow: "0 0 36px rgba(232,181,75,0.65)" }} />
                </motion.span>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 20h14" />
                </svg>
                Download for Windows
              </motion.button>
            </div>
            <p className="mt-2.5 font-mono text-[10px] tracking-[0.04em] text-bone/35 md:text-[11px]">
              Stable Build · .exe (64-bit)
            </p>

            {/* 다운로드 진행바 */}
            <motion.div style={{ opacity: barTrackO }} className="mt-5 w-full max-w-[420px]">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-bone/45 md:text-[11px]">
                <span>VSCode-Setup.exe</span>
                <motion.span className="text-gold/85">{pctText}</motion.span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full border border-bone/10 bg-bone/[0.05]">
                <motion.div
                  style={{ width: barW }}
                  className="h-full rounded-full bg-gold"
                />
              </div>
            </motion.div>

            {/* 설치 완료 */}
            <motion.div
              style={{ opacity: doneO, y: doneY }}
              className="mt-4 flex items-center gap-2 rounded-lg border border-gold/40 bg-gold/[0.08] px-4 py-2"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-body text-[clamp(0.82rem,0.95vw,1rem)] font-bold text-gold">설치 완료 ✓</span>
            </motion.div>
          </div>

          {/* 하단 '무료 · 5분' 배지 스트립 */}
          <div className="flex items-center justify-center gap-3 border-t border-bone/10 bg-[#0C0A11] px-4 py-2.5">
            <span className="flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/[0.07] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-gold md:text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-soft" />
              무료 · 5분
            </span>
            <span className="font-mono text-[10px] tracking-[0.04em] text-bone/35 md:text-[11px]">
              결제 없음 · 로그인 없음 · 바로 실행
            </span>
          </div>
        </div>
      </AppWindow>
    </motion.div>
  );
}
