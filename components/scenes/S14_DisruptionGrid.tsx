"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

const JOBS = [
  "변호사",
  "의사",
  "기자",
  "개발자",
  "회계사",
  "디자이너",
  "번역가",
  "작곡가",
  "애널리스트",
  "약사",
  "교수",
  "PD",
];

export default function Scene14() {
  return (
    <section
      data-scene="s14"
      data-act="ACT 2 — 다른 종류의 발명"
      className="relative overflow-x-clip bg-ink text-bone"
    >
      <Pin heights={3}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

/* ───────────────────────── 핀 스테이지 ───────────────────────── */

function Stage({ p }: { p: MotionValue<number> }) {
  // 헤더
  const headO = useTransform(p, [0.02, 0.1], [0, 1]);
  const headY = useTransform(p, [0.02, 0.1], [28, 0]);

  // 그리드 진입
  const gridO = useTransform(p, [0.06, 0.16], [0, 1]);
  const gridY = useTransform(p, [0.06, 0.16], [50, 0]);

  // 골드 스캔라인 — 위→아래로 그리드를 쓸고 지나감
  const scanTop = useTransform(p, [0.2, 0.76], ["-6%", "106%"]);
  const scanO = useTransform(p, [0.18, 0.22, 0.74, 0.8], [0, 1, 1, 0]);

  // 교체가 진행될수록 차오르는 골드 앰비언트
  const ambientO = useTransform(p, [0.2, 0.76], [0.03, 0.14]);

  // 마무리 캡션
  const capO = useTransform(p, [0.82, 0.9], [0, 1]);
  const capY = useTransform(p, [0.82, 0.9], [20, 0]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-[6vw]">
      {/* 앰비언트 골드 글로우 */}
      <motion.div
        aria-hidden
        style={{
          opacity: ambientO,
          background:
            "radial-gradient(circle at 50% 45%, rgba(232,181,75,0.4) 0%, rgba(232,181,75,0.08) 45%, transparent 72%)",
        }}
        className="pointer-events-none absolute inset-0"
      />
      {/* 칠흑 비네트 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(7,6,10,0.9) 100%)",
        }}
      />
      {/* 우측 세로 모노 장식 라벨 */}
      <span className="pointer-events-none absolute right-[2vw] top-1/2 hidden -translate-y-1/2 select-none font-mono text-[10px] uppercase tracking-[0.5em] text-bone/20 [writing-mode:vertical-rl] lg:block">
        DISRUPTION GRID — 12 SECTORS
      </span>

      {/* 헤더 */}
      <motion.div
        style={{ opacity: headO, y: headY }}
        className="relative z-10 flex w-full max-w-[1060px] flex-col items-start gap-5 pb-[4vh]"
      >
        <Kicker tone="gold">ACT 2 — 교체의 풍경</Kicker>
        <h2 className="font-display font-bold leading-[1.2] text-bone text-balance-k text-[clamp(1.5rem,3vw,2.7rem)]">
          모든 분야에서, 기존의 플레이어가 조용히 교체되고 있다.
        </h2>
      </motion.div>

      {/* 그리드 + 스캔라인 */}
      <motion.div
        style={{ opacity: gridO, y: gridY }}
        className="relative z-10 w-full max-w-[1060px]"
      >
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {JOBS.map((job, i) => (
            <Tile key={job} p={p} i={i} job={job} />
          ))}
        </div>

        {/* 스캔라인 */}
        <motion.div
          aria-hidden
          style={{ top: scanTop, opacity: scanO }}
          className="pointer-events-none absolute -inset-x-[3%]"
        >
          {/* 트레일 베일 — 지나간 자리의 잔광 */}
          <div
            className="absolute inset-x-0 bottom-0 h-[60px]"
            style={{
              background:
                "linear-gradient(to top, rgba(232,181,75,0.14), transparent)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-[16px] bg-gold/25 blur-md" />
          <div
            className="absolute inset-x-0 bottom-0 h-[2px]"
            style={{
              background:
                "linear-gradient(to right, transparent, #FFD37A 18%, #FFD37A 82%, transparent)",
              boxShadow: "0 0 22px rgba(255,211,122,0.8)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* 마무리 캡션 */}
      <div className="relative z-10 flex w-full max-w-[1060px] justify-center pt-[4.5vh]">
        <motion.p
          style={{ opacity: capO, y: capY }}
          className="text-center font-mono text-[12px] leading-relaxed tracking-[0.06em] text-bone/65 text-balance-k md:text-sm"
        >
          그 &lsquo;한 사람&rsquo;이 당신일 수도, 당신의 경쟁자일 수도 있다.
        </motion.p>
      </div>
    </div>
  );
}

/* ───────────────────────── 플립 타일 ───────────────────────── */

function Tile({
  p,
  i,
  job,
}: {
  p: MotionValue<number>;
  i: number;
  job: string;
}) {
  const row = Math.floor(i / 4);
  const col = i % 4;
  // 스캔라인이 행을 통과하는 타이밍에 맞춰 뒤집힘 (열은 미세 스태거)
  const t0 = 0.24 + row * 0.165 + col * 0.018;
  const rotateY = useTransform(p, [t0, t0 + 0.09], [0, 180]);
  const s = useTransform(p, [t0, t0 + 0.045, t0 + 0.09], [1, 1.06, 1]);
  // 뒤집힌 뒤 골드 글로우가 차오름
  const glowO = useTransform(p, [t0 + 0.05, t0 + 0.12], [0, 1]);

  return (
    <div className="[perspective:1200px]">
      <motion.div
        style={{ rotateY, scale: s, aspectRatio: "16 / 10" }}
        className="relative w-full [transform-style:preserve-3d]"
      >
        {/* 앞면 — 기존의 플레이어 */}
        <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-bone/10 bg-coal [backface-visibility:hidden]">
          <span className="absolute left-3 top-2.5 font-mono text-[9px] tracking-[0.2em] text-bone/25 md:text-[10px]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-display font-bold text-bone/90 text-[clamp(0.95rem,1.7vw,1.45rem)]">
            {job}
          </span>
          {/* 표면 미세 그라디언트 */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(242,237,227,0.05) 0%, transparent 40%)",
            }}
          />
        </div>

        {/* 뒷면 — AI + 한 사람 */}
        <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-gold/70 bg-gold/10 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <motion.span
            aria-hidden
            style={{ opacity: glowO }}
            className="pointer-events-none absolute inset-0 rounded-xl shadow-[0_0_44px_rgba(232,181,75,0.28)]"
          />
          <span className="absolute left-3 top-2.5 font-mono text-[9px] tracking-[0.2em] text-gold/55 md:text-[10px]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            className="font-display font-bold text-gold text-[clamp(0.9rem,1.6vw,1.4rem)]"
            style={{ textShadow: "0 0 24px rgba(232,181,75,0.4)" }}
          >
            AI + 한 사람
          </span>
        </div>
      </motion.div>
    </div>
  );
}
