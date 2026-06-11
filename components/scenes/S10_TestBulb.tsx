"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

export default function Scene10() {
  return (
    <section
      data-scene="s10"
      data-act="ACT 2 — 다른 종류의 발명"
      className="relative overflow-x-clip bg-bone text-ink"
    >
      <Pin heights={3}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

/* ───────────────────────── 핀 스테이지 ───────────────────────── */

function Stage({ p }: { p: MotionValue<number> }) {
  // 킥커
  const kickerO = useTransform(p, [0.01, 0.07], [0, 1]);
  const kickerY = useTransform(p, [0.01, 0.07], [16, 0]);

  // 전구 등장 → 스탬프 순간 살짝 뒤로 물러남
  const bulbO = useTransform(p, [0.02, 0.1, 0.56, 0.66], [0, 1, 1, 0.42]);
  const bulbY = useTransform(p, [0.02, 0.12], [70, 0]);

  // 점등 — 에디슨식 플리커 온
  const litO = useTransform(
    p,
    [0.13, 0.16, 0.18, 0.21, 0.24, 0.3, 0.56, 0.66],
    [0, 0.55, 0.12, 0.78, 0.4, 1, 1, 0.45]
  );
  const filament = useTransform(p, [0.13, 0.3], [0, 1]);

  // 질문 두 줄
  const q1o = useTransform(p, [0.32, 0.39], [0, 1]);
  const q1y = useTransform(p, [0.32, 0.39], [30, 0]);
  const q2o = useTransform(p, [0.41, 0.48], [0, 1]);
  const q2y = useTransform(p, [0.41, 0.48], [30, 0]);

  // 스탬프 임팩트 — 쉐이크 + 엠버 플래시
  const shakeY = useTransform(
    p,
    [0.56, 0.58, 0.6, 0.62, 0.64],
    [0, -3, 2, -1, 0]
  );
  const flashO = useTransform(p, [0.56, 0.585, 0.64], [0, 0.13, 0]);

  // 캡션
  const capO = useTransform(p, [0.72, 0.82], [0, 1]);
  const capY = useTransform(p, [0.72, 0.82], [22, 0]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* 종이 결 텍스처 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(7,6,10,0.02) 0px, rgba(7,6,10,0.02) 1px, transparent 1px, transparent 10px)",
        }}
      />

      {/* 스탬프 순간 엠버 플래시 */}
      <motion.div
        aria-hidden
        style={{ opacity: flashO }}
        className="pointer-events-none absolute inset-0 z-30 bg-ember"
      />

      {/* 킥커 */}
      <div className="absolute inset-x-0 top-[7vh] z-20 flex justify-center">
        <motion.div style={{ opacity: kickerO, y: kickerY }}>
          <Kicker tone="ink">위대한 발명 No.1 — 전구 (1879)</Kicker>
        </motion.div>
      </div>

      {/* 쉐이크 컨테이너 — 전구 + 글로우 + 질문 */}
      <motion.div
        style={{ y: shakeY }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* DOM 글로우 레이어 ×2 */}
        <motion.div
          aria-hidden
          style={{
            opacity: litO,
            background:
              "radial-gradient(circle at center, rgba(255,211,122,0.5) 0%, rgba(232,181,75,0.22) 38%, transparent 68%)",
          }}
          className="pointer-events-none absolute left-1/2 top-[40%] h-[88vmin] w-[88vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
        <motion.div
          aria-hidden
          style={{
            opacity: litO,
            background:
              "radial-gradient(circle at center, rgba(255,235,180,0.75) 0%, rgba(255,211,122,0.3) 45%, transparent 70%)",
          }}
          className="pointer-events-none absolute left-1/2 top-[40%] h-[40vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        />

        {/* CSS/SVG 전구 */}
        <motion.div
          style={{ opacity: bulbO, y: bulbY }}
          className="relative -translate-y-[6vh]"
        >
          <Bulb litO={litO} filament={filament} />
        </motion.div>

        {/* 질문 — 하단 1/3 */}
        <div className="absolute inset-x-0 bottom-[16vh] z-10 flex flex-col items-center gap-3 px-[6vw] text-center">
          <motion.p
            style={{ opacity: q1o, y: q1y }}
            className="font-display font-bold leading-[1.3] text-balance-k text-[clamp(1.5rem,3.2vw,2.8rem)]"
          >
            &lsquo;전구&rsquo;를 누구보다 잘 쓰는 사람이 있다.
          </motion.p>
          <motion.p
            style={{ opacity: q2o, y: q2y }}
            className="font-display font-black leading-[1.3] text-balance-k text-[clamp(1.7rem,3.8vw,3.4rem)]"
          >
            그가 변호사보다 변론을 잘할 수 있을까?
          </motion.p>
        </div>
      </motion.div>

      {/* 거대 스탬프 — 아니오. */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <StampVerdict
          p={p}
          appear={0.56}
          settle={0.63}
          windup={1.7}
          rotate={-6}
          text="아니오."
          textClass="text-[clamp(3.4rem,9vw,8rem)]"
          sub="VERDICT — NO."
          serial="EXHIBIT 01"
        />
      </div>

      {/* 캡션 */}
      <div className="absolute inset-x-0 bottom-[6vh] flex justify-center px-[6vw]">
        <motion.p
          style={{ opacity: capO, y: capY }}
          className="max-w-[860px] text-center font-mono text-[12px] leading-relaxed tracking-[0.04em] text-ink/60 text-balance-k md:text-sm"
        >
          전구는 인류의 밤을 바꿨다. 그러나 당신의 능력은, 단 하나도 바꾸지
          못했다.
        </motion.p>
      </div>
    </div>
  );
}

/* ───────────────────────── 전구 드로잉 ───────────────────────── */

function Bulb({
  litO,
  filament,
}: {
  litO: MotionValue<number>;
  filament: MotionValue<number>;
}) {
  return (
    <svg
      viewBox="0 0 360 560"
      className="h-auto w-[clamp(240px,36vmin,400px)]"
      fill="none"
      aria-hidden
    >
      <defs>
        <radialGradient id="s10-glass" cx="50%" cy="36%" r="68%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="100%" stopColor="rgba(7,6,10,0.05)" />
        </radialGradient>
        <radialGradient id="s10-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,235,180,0.95)" />
          <stop offset="45%" stopColor="rgba(232,181,75,0.5)" />
          <stop offset="100%" stopColor="rgba(232,181,75,0)" />
        </radialGradient>
      </defs>

      {/* 유리구 */}
      <circle
        cx="180"
        cy="210"
        r="145"
        fill="url(#s10-glass)"
        stroke="rgba(7,6,10,0.32)"
        strokeWidth="2.5"
      />
      {/* 점등 코어 */}
      <motion.circle
        cx="180"
        cy="240"
        r="118"
        fill="url(#s10-core)"
        style={{ opacity: litO }}
      />
      {/* 유리 하이라이트 */}
      <path
        d="M 92 144 A 116 116 0 0 1 172 70"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* 넥(유리 목) */}
      <path
        d="M 146 343 C 146 366 138 374 138 390 L 222 390 C 222 374 214 366 214 343"
        fill="rgba(7,6,10,0.06)"
        stroke="rgba(7,6,10,0.28)"
        strokeWidth="2.5"
      />

      {/* 필라멘트 스템 + 코일 — 잉크 베이스 */}
      <path
        d="M 162 388 L 162 262 M 198 388 L 198 262 M 162 262 L 171 236 L 180 262 L 189 236 L 198 262"
        stroke="rgba(7,6,10,0.45)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* 필라멘트 — 골드 점화 (와이드 글로우 + 코어) */}
      <motion.path
        d="M 162 262 L 171 236 L 180 262 L 189 236 L 198 262"
        stroke="rgba(232,181,75,0.45)"
        strokeWidth="9"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{ pathLength: filament, opacity: litO }}
      />
      <motion.path
        d="M 162 262 L 171 236 L 180 262 L 189 236 L 198 262"
        stroke="#FFD37A"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{ pathLength: filament, opacity: litO }}
      />

      {/* 스크류 캡 — 나사산 3단 */}
      <rect x="138" y="390" width="84" height="14" rx="7" fill="rgba(7,6,10,0.82)" />
      <rect x="142" y="408" width="76" height="14" rx="7" fill="rgba(7,6,10,0.74)" />
      <rect x="146" y="426" width="68" height="14" rx="7" fill="rgba(7,6,10,0.82)" />
      <path
        d="M 152 444 L 208 444 L 192 466 L 168 466 Z"
        fill="rgba(7,6,10,0.7)"
      />
      {/* 접점 팁 */}
      <circle cx="180" cy="472" r="9" fill="rgba(7,6,10,0.88)" />
    </svg>
  );
}

/* ───────────────────────── 도장 스탬프 (시리즈 공통 문법) ───────────────────────── */

function StampVerdict({
  p,
  appear,
  settle,
  text,
  sub,
  serial,
  textClass,
  rotate = -6,
  windup = 1.7,
  exit,
}: {
  p: MotionValue<number>;
  appear: number;
  settle: number;
  text: string;
  sub: string;
  serial: string;
  textClass: string;
  rotate?: number;
  windup?: number;
  exit?: [number, number];
}) {
  const oKeys = exit
    ? [appear, appear + 0.02, exit[0], exit[1]]
    : [appear, appear + 0.02];
  const oVals = exit ? [0, 1, 1, 0] : [0, 1];
  const o = useTransform(p, oKeys, oVals);
  const s = useTransform(p, [appear, settle], [windup, 1]);

  return (
    <motion.div style={{ opacity: o, scale: s, rotate }} className="relative">
      <div className="relative border-[6px] border-ember px-[clamp(2rem,5vw,4.5rem)] py-[clamp(1rem,2.4vw,2.2rem)]">
        {/* 이중 보더 — 도장 내곽 */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[7px] border-2 border-ember/55"
        />
        <span
          className={`block font-display font-black leading-none text-ember text-balance-k ${textClass}`}
        >
          {text}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-ember/75 md:text-[11px]">
        <span>{sub}</span>
        <span className="h-px w-6 bg-ember/50" />
        <span>{serial}</span>
      </div>
    </motion.div>
  );
}
