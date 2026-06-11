"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Pin from "@/components/ui/Pin";

export default function Scene25() {
  return (
    <section
      data-scene="s25"
      data-act="ACT 4 — 어떤 회사 이야기"
      className="relative bg-ink text-bone"
    >
      <Pin heights={3}>
        {(p) => {
          // 주의: render-prop 내부에서는 hook 금지 → 내부 컴포넌트로 위임
          return <Stage p={p} />;
        }}
      </Pin>
    </section>
  );
}

/* ============================================================
   Stage — 세 줄이 한 줄씩 크로스페이드로 점등되는 핀 스테이지
   ============================================================ */
function Stage({ p }: { p: MotionValue<number> }) {
  /* ----- 줄 1: 그러니, 분명히 말해두겠다. ----- */
  const o1 = useTransform(p, [0.02, 0.11, 0.26, 0.36], [0, 1, 1, 0]);
  const y1 = useTransform(p, [0.02, 0.11, 0.26, 0.36], [56, 0, 0, -88]);
  const b1 = useTransform(
    p,
    [0.02, 0.11, 0.26, 0.36],
    ["blur(12px)", "blur(0px)", "blur(0px)", "blur(16px)"]
  );

  /* ----- 줄 2: "난 AI 몰라도 돼" 하고 살 수 있는 세상은 ----- */
  const o2 = useTransform(p, [0.3, 0.4, 0.55, 0.66], [0, 1, 1, 0]);
  const y2 = useTransform(p, [0.3, 0.4, 0.55, 0.66], [64, 0, 0, -92]);
  const b2 = useTransform(
    p,
    [0.3, 0.4, 0.55, 0.66],
    ["blur(12px)", "blur(0px)", "blur(0px)", "blur(16px)"]
  );

  /* ----- 줄 3: 생각보다 훨씬 빨리 끝난다. — 잔상처럼 남는다 ----- */
  const o3 = useTransform(p, [0.6, 0.73], [0, 1]);
  const y3 = useTransform(p, [0.6, 0.75], [72, 0]);
  const b3 = useTransform(p, [0.6, 0.73], ["blur(14px)", "blur(0px)"]);
  const underline = useTransform(p, [0.76, 0.92], [0, 1]);

  /* ----- 배경: 마지막 비트에서 아주 미세하게 붉어졌다 돌아옴 ----- */
  const emberO = useTransform(p, [0.58, 0.74, 0.94, 1], [0, 0.16, 0.05, 0.05]);
  /* 골드 잔광 — 마지막 줄과 함께 숨 쉬듯 */
  const goldO = useTransform(p, [0.62, 0.8], [0, 0.1]);

  /* ----- 도시에 캡션 / 진행 점 ----- */
  const capO = useTransform(p, [0.0, 0.07], [0, 1]);
  const d1 = useTransform(p, [0.02, 0.09, 0.28, 0.36], [0.2, 1, 1, 0.2]);
  const d2 = useTransform(p, [0.3, 0.38, 0.57, 0.66], [0.2, 1, 1, 0.2]);
  const d3 = useTransform(p, [0.6, 0.72], [0.2, 1]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ===== 배경 레이어 ===== */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: emberO,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(255,75,46,0.5) 0%, rgba(255,75,46,0.12) 45%, transparent 75%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: goldO,
          background:
            "radial-gradient(ellipse 45% 35% at 50% 50%, rgba(232,181,75,0.6) 0%, transparent 70%)",
        }}
      />
      {/* 미세 비네트 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 55%, rgba(7,6,10,0.8) 100%)",
        }}
      />

      {/* ===== 도시에 장식: 코너 레지스트레이션 마크 ===== */}
      <motion.div aria-hidden style={{ opacity: capO }} className="pointer-events-none absolute inset-0">
        <span className="absolute left-[4vw] top-[5vh] h-5 w-5 border-l border-t border-bone/20" />
        <span className="absolute right-[4vw] top-[5vh] h-5 w-5 border-r border-t border-bone/20" />
        <span className="absolute bottom-[5vh] left-[4vw] h-5 w-5 border-b border-l border-bone/20" />
        <span className="absolute bottom-[5vh] right-[4vw] h-5 w-5 border-b border-r border-bone/20" />
        <p className="absolute left-1/2 top-[5.5vh] -translate-x-1/2 font-mono text-[10px] tracking-[0.45em] uppercase text-bone/30">
          Act 4 — Closing Statement
        </p>
        <p className="absolute bottom-[5.8vh] right-[7vw] hidden font-mono text-[10px] tracking-[0.35em] uppercase text-bone/20 md:block">
          S25 / No Escape
        </p>
      </motion.div>

      {/* ===== 줄 1 ===== */}
      <motion.div
        style={{ opacity: o1, y: y1, filter: b1 }}
        className="absolute inset-0 flex items-center justify-center px-[8vw]"
      >
        <p className="text-center font-display font-bold leading-[1.3] text-[clamp(1.9rem,4.8vw,4rem)] text-bone/90 text-balance-k">
          그러니, 분명히 말해두겠다.
        </p>
      </motion.div>

      {/* ===== 줄 2 ===== */}
      <motion.div
        style={{ opacity: o2, y: y2, filter: b2 }}
        className="absolute inset-0 flex items-center justify-center px-[8vw]"
      >
        <p className="max-w-6xl text-center font-display font-bold leading-[1.3] text-[clamp(2.1rem,5.6vw,4.8rem)] text-bone text-balance-k">
          &ldquo;난 AI 몰라도 돼&rdquo; 하고 살 수 있는 세상은
        </p>
      </motion.div>

      {/* ===== 줄 3 — 남는다 ===== */}
      <motion.div
        style={{ opacity: o3, y: y3, filter: b3 }}
        className="absolute inset-0 flex items-center justify-center px-[8vw]"
      >
        <div className="relative text-center">
          <p className="font-display font-black leading-[1.25] text-[clamp(2.6rem,7vw,6.4rem)] text-bone text-balance-k">
            생각보다{" "}
            <span
              className="text-gold"
              style={{ textShadow: "0 0 56px rgba(232,181,75,0.4), 0 0 18px rgba(232,181,75,0.25)" }}
            >
              훨씬 빨리
            </span>{" "}
            끝난다.
          </p>
          {/* 잔상 언더라인 */}
          <motion.span
            aria-hidden
            className="absolute -bottom-[0.5em] left-1/2 h-px w-[min(60vw,560px)] -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-gold/70 to-transparent"
            style={{ scaleX: underline }}
          />
        </div>
      </motion.div>

      {/* ===== 진행 점 3개 ===== */}
      <div className="pointer-events-none absolute bottom-[5.5vh] left-1/2 flex -translate-x-1/2 items-center gap-3">
        <motion.span style={{ opacity: d1 }} className="h-1.5 w-1.5 rotate-45 bg-bone/80" />
        <motion.span style={{ opacity: d2 }} className="h-1.5 w-1.5 rotate-45 bg-bone/80" />
        <motion.span style={{ opacity: d3 }} className="h-1.5 w-1.5 rotate-45 bg-gold" />
      </div>
    </div>
  );
}
