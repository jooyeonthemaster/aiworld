"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Pin from "@/components/ui/Pin";

/* 본문 아래 위장용 검열 바 너비 (결정적) */
const FILLER_WIDTHS = [82, 64, 91, 58];

/* 우측 단계 인디케이터 — 진행 단계가 점등 */
function PhaseTick({
  p,
  at,
  label,
}: {
  p: MotionValue<number>;
  at: number;
  label: string;
}) {
  const o = useTransform(p, [at, at + 0.04], [0.16, 1]);
  return (
    <motion.div style={{ opacity: o }} className="flex items-center justify-end gap-3">
      <span className="font-mono text-[9px] tracking-[0.35em] text-ember/90">{label}</span>
      <span className="h-[5px] w-[5px] bg-ember/90" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 핀 스테이지 — Pin render-prop 안에서 hook 을 못 쓰므로 분리          */
/* ------------------------------------------------------------------ */
function RefusalStage({ p }: { p: MotionValue<number> }) {
  /* 문서 스캔 인 (종이가 위→아래로 출력되듯) */
  const docO = useTransform(p, [0.0, 0.05], [0, 1]);
  const docClip = useTransform(p, [0.03, 0.16], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]);
  const docScale = useTransform(p, [0.5, 0.7], [1, 0.965]);
  const docDimO = useTransform(p, [0.68, 0.8], [0, 0.45]);
  const scanTop = useTransform(p, [0.03, 0.16], ["0%", "96%"]);
  const scanO = useTransform(p, [0.03, 0.16, 0.19], [0.9, 0.9, 0]);

  /* 본문 라인 */
  const line1O = useTransform(p, [0.18, 0.23], [0, 1]);
  const line2O = useTransform(p, [0.25, 0.3], [0, 1]);
  const fillerO = useTransform(p, [0.2, 0.27], [0, 1]);
  const demandO = useTransform(p, [0.31, 0.34], [0, 1]);
  const barX = useTransform(p, [0.36, 0.46], [1, 0]); // 검열 바가 걷힘
  const emberGlowO = useTransform(p, [0.38, 0.48], [0, 1]);

  /* 회신 비트 */
  const reply1O = useTransform(p, [0.52, 0.58], [0, 1]);
  const reply1Y = useTransform(p, [0.52, 0.58], [22, 0]);
  const reply2O = useTransform(p, [0.6, 0.66], [0, 1]);
  const reply2Y = useTransform(p, [0.6, 0.66], [22, 0]);

  /* 스탬프 임팩트 (S10 과 동일 문법 — 시리즈 연출) */
  const stampO = useTransform(p, [0.73, 0.765], [0, 1]);
  const stampScale = useTransform(p, [0.73, 0.79], [1.9, 1]);
  const flashO = useTransform(p, [0.78, 0.8, 0.88], [0, 0.5, 0]);
  const shakeY = useTransform(p, [0.785, 0.8, 0.815, 0.83, 0.845], [0, -3, 2, -1, 0]);
  const refusedO = useTransform(p, [0.86, 0.92], [0, 1]);
  const refusedY = useTransform(p, [0.86, 0.92], [10, 0]);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-ink text-bone">
      {/* ---------- 배경 ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* 상단에서 내려오는 ember 경고 기운 */}
        <div className="absolute inset-x-0 top-0 h-[42vh] bg-gradient-to-b from-ember/[0.06] to-transparent" />
        <motion.div
          style={{ opacity: emberGlowO }}
          className="absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-ember/[0.13] to-transparent"
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,237,227,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,227,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, #07060a 95%)" }}
        />
      </div>

      {/* 좌측 세로 파일 라벨 */}
      <div
        aria-hidden
        className="absolute left-5 top-1/2 hidden -translate-y-1/2 -rotate-90 whitespace-nowrap font-mono text-[9px] tracking-[0.5em] text-bone/25 md:block"
      >
        FILE 19 — THE REFUSAL // EYES ONLY
      </div>

      {/* 우측 단계 인디케이터 */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-4 md:flex">
        <PhaseTick p={p} at={0.05} label="SCAN" />
        <PhaseTick p={p} at={0.34} label="DEMAND" />
        <PhaseTick p={p} at={0.54} label="REPLY" />
        <PhaseTick p={p} at={0.74} label="STAMP" />
      </div>

      {/* ---------- 본 무대 (셰이크 적용) ---------- */}
      <motion.div
        style={{ y: shakeY }}
        className="relative z-10 flex w-full max-w-[1100px] flex-col items-center gap-9 px-[6vw]"
      >
        {/* 공문서 카드 */}
        <motion.div
          style={{ opacity: docO, clipPath: docClip, scale: docScale }}
          className="relative w-[min(640px,92vw)] rounded-[4px] bg-bone text-ink shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
        >
          <div className="p-6 md:p-9">
            {/* 최상단 보안 등급 */}
            <div className="mb-5 flex items-center justify-between font-mono text-[8px] tracking-[0.3em] text-ink/45 md:text-[9px]">
              <span>MEMORANDUM // PRIORITY: IMMEDIATE</span>
              <span className="border border-ember/70 px-2 py-[2px] font-bold text-ember/90">
                CLASSIFIED
              </span>
            </div>

            {/* 헤더 — 씰 + 부처명 */}
            <div className="flex items-center gap-4 border-b-2 border-ink/70 pb-4">
              <svg viewBox="0 0 48 48" className="h-11 w-11 shrink-0 md:h-12 md:w-12" aria-hidden>
                <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(7,6,10,0.7)" strokeWidth="1.6" />
                <circle cx="24" cy="24" r="17" fill="none" stroke="rgba(7,6,10,0.4)" strokeWidth="1" />
                <path
                  d="M24 12 L27 20.5 L36 20.5 L29 26 L31.5 34.5 L24 29.3 L16.5 34.5 L19 26 L12 20.5 L21 20.5 Z"
                  fill="rgba(7,6,10,0.65)"
                />
              </svg>
              <div className="min-w-0">
                <div className="font-mono text-[11px] font-bold tracking-[0.14em] text-ink md:text-sm">
                  U.S. DEPARTMENT OF DEFENSE — 2026
                </div>
                <div className="mt-1 truncate font-mono text-[10px] tracking-[0.08em] text-ink/65 md:text-xs">
                  RE: 자율 무기 시스템 권한 요청
                </div>
              </div>
            </div>

            {/* 본문 */}
            <div className="mt-6 space-y-4 font-mono text-[12px] leading-relaxed text-ink/85 md:text-[14px]">
              <motion.p style={{ opacity: line1O }}>
                미 국방부는 이미 클로드를 운용 중이었다.
              </motion.p>
              <motion.p style={{ opacity: line2O }}>그리고 요구했다 —</motion.p>

              {/* 요구 문장 — 검열 바가 걷히며 드러남 */}
              <motion.div style={{ opacity: demandO }} className="relative">
                <p
                  className="text-balance-k font-semibold text-ember"
                  style={{ textShadow: "0 0 24px rgba(255,75,46,0.25)" }}
                >
                  &ldquo;인간의 승인 없는, AI 자율 살상 판단을 허용하라.&rdquo;
                </p>
                <motion.div
                  style={{ scaleX: barX }}
                  className="absolute -inset-x-1 -inset-y-1 flex origin-right items-center justify-center bg-ink"
                >
                  <span className="font-mono text-[8px] tracking-[0.5em] text-bone/45">
                    REDACTED
                  </span>
                </motion.div>
              </motion.div>

              {/* 위장 검열 바 — 문서의 나머지는 가려져 있다 */}
              <motion.div style={{ opacity: fillerO }} className="space-y-[7px] pt-2" aria-hidden>
                {FILLER_WIDTHS.map((w, i) => (
                  <div
                    key={i}
                    className="h-[0.85em] rounded-[1px] bg-ink/80"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </motion.div>
            </div>

            {/* 푸터 */}
            <div className="mt-7 flex items-center justify-between border-t border-ink/25 pt-3 font-mono text-[8px] tracking-[0.28em] text-ink/45 md:text-[9px]">
              <span>DOC NO. DOD-26-0119</span>
              <span>PAGE 01 / 01 — DISTRIBUTION: RESTRICTED</span>
            </div>
          </div>

          {/* 문서 디머 (스탬프 국면에서 어두워짐) */}
          <motion.div
            style={{ opacity: docDimO }}
            className="pointer-events-none absolute inset-0 rounded-[4px] bg-ink"
          />
        </motion.div>

        {/* 회신 비트 */}
        <div className="space-y-3 text-center">
          <motion.p
            style={{ opacity: reply1O, y: reply1Y }}
            className="text-balance-k font-display text-[clamp(1.3rem,2.6vw,2.1rem)] font-bold leading-snug text-bone/90"
          >
            수십조 원짜리 계약. 세계 최강대국의 요구.
          </motion.p>
          <motion.p
            style={{ opacity: reply2O, y: reply2Y }}
            className="text-balance-k text-[clamp(1.05rem,1.9vw,1.5rem)] text-bone/60"
          >
            스타트업 앤트로픽의 회신은 —
          </motion.p>
        </div>
      </motion.div>

      {/* ---------- 메가 스탬프 ---------- */}
      <div className="pointer-events-none absolute left-1/2 top-[40%] z-20 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          style={{
            opacity: stampO,
            scale: stampScale,
            rotate: -8,
            boxShadow: "0 0 80px rgba(255,75,46,0.35)",
          }}
          className="border-[6px] border-ember/90 p-[6px] md:p-2"
        >
          <div className="border border-ember/60 px-6 py-2 md:px-10 md:py-4">
            <span
              className="block font-display text-[clamp(3rem,9vw,7.5rem)] font-black leading-none tracking-tight text-ember"
              style={{ textShadow: "0 0 50px rgba(255,75,46,0.45)" }}
            >
              거부한다.
            </span>
          </div>
        </motion.div>
        <motion.div
          style={{ opacity: refusedO, y: refusedY }}
          className="mt-7 text-center font-mono text-[10px] tracking-[0.45em] text-ember/85 md:text-xs"
        >
          REFUSED — ON ETHICAL GROUNDS
        </motion.div>
      </div>

      {/* 스캔 하이라이트 (문서 출력 라인) */}
      <motion.div
        aria-hidden
        style={{ top: scanTop, opacity: scanO }}
        className="pointer-events-none absolute inset-x-[20%] z-30 h-[3px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />

      {/* 스탬프 플래시 */}
      <motion.div
        aria-hidden
        style={{ opacity: flashO }}
        className="pointer-events-none absolute inset-0 z-40 bg-ember/30"
      />
    </div>
  );
}

export default function Scene19() {
  return (
    <section data-scene="s19" data-act="ACT 4 — 어떤 회사 이야기" className="relative bg-ink">
      <Pin heights={4}>{(p) => <RefusalStage p={p} />}</Pin>
    </section>
  );
}
