"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * B02 — 오늘의 약속: "맨손으로, 직접 만든다"  [다리 / RECAP · 다시, 환경]
 * 16:9 풀스크린 + Pin 스크롤 스테이지(순수 타이포 내러티브).
 * beat1(선언) → beat2(메가 골드: 맨손으로, 직접 만든다) → beat3(예고)
 * → 거대 "30" + "가지" 점등(활용 사례 30가지 예고) + 6개 클러스터 점이 가로로 차례 점등.
 * 하단 모노 caption("전부, VS Code 안에서.").
 */

/* 6개 사례 클러스터 (BIBLE 매니페스트 A~F) — 가로로 차례 점등 */
const CLUSTERS: { id: string; label: string }[] = [
  { id: "A", label: "문서" },
  { id: "B", label: "시각화" },
  { id: "C", label: "웹" },
  { id: "D", label: "미디어" },
  { id: "E", label: "데이터" },
  { id: "F", label: "자동화" },
];

export default function B02Promise() {
  return (
    <section
      data-scene="b02"
      data-act="RECAP · 다시, 환경"
      className="relative bg-ink text-bone"
    >
      <Pin heights={3}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.36, 0.52]);
  const glowX = useTransform(p, [0, 1], ["46%", "54%"]);
  const glowBg = useTransform(
    glowX,
    (x) => `radial-gradient(54% 58% at ${x} 42%, rgba(232,181,75,0.13), transparent 72%)`,
  );
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  /* ── beat1: "오늘은 — 말로만 듣던 그 '환경'을," ── */
  const b1O = useTransform(p, [0.04, 0.14, 0.5, 0.6], [0, 1, 1, 0.32]);
  const b1Y = useTransform(p, [0.04, 0.16], [40, 0]);

  /* ── beat2: 메가 골드 "맨손으로, 직접 만든다" ── */
  const b2O = useTransform(p, [0.2, 0.32], [0, 1]);
  const b2Y = useTransform(p, [0.2, 0.34], [46, 0]);
  const b2Glow = useTransform(p, [0.28, 0.44], [0, 1]);

  /* ── beat3: "그리고 보여주겠습니다 — 그 안에서 무엇이 가능한지." ── */
  const b3O = useTransform(p, [0.46, 0.58], [0, 1]);
  const b3Y = useTransform(p, [0.46, 0.6], [30, 0]);

  /* ── 거대 "30" + "가지" 점등 (사례 30가지 예고) ── */
  const numO = useTransform(p, [0.6, 0.72], [0, 1]);
  const numScale = useTransform(p, [0.6, 0.74], [0.82, 1]);
  const numGlow = useTransform(p, [0.68, 0.84], [0, 1]);
  const tagO = useTransform(p, [0.66, 0.78], [0, 1]);
  const tagX = useTransform(p, [0.66, 0.8], [-12, 0]);

  /* ── caption ── */
  const capO = useTransform(p, [0.88, 0.98], [0, 0.85]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <motion.div className="absolute inset-0" style={{ background: glowBg }} />
      </motion.div>
      {/* ── 그리드 패럴랙스 ── */}
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

      {/* ── 콘텐츠 ── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1640px] flex-col content-center items-center justify-center gap-[clamp(1.4rem,3.4vh,3rem)] px-[clamp(2.5rem,5vw,6rem)] py-[clamp(3rem,5vh,5rem)] text-center">
        <Kicker className="justify-center">오늘 — 2강</Kicker>

        {/* ── 3 beats ── */}
        <div className="flex w-full flex-col items-center gap-[clamp(1rem,2.4vh,2.2rem)]">
          {/* beat1 */}
          <motion.p
            style={{ opacity: b1O, y: b1Y }}
            className="font-display font-bold leading-[1.3] text-bone/90 text-[clamp(1.7rem,3.2vw,3.2rem)]"
          >
            <span className="block whitespace-nowrap">
              오늘은 — 말로만 듣던 그{" "}
              <span className="text-bone">&apos;환경&apos;</span>을,
            </span>
          </motion.p>

          {/* beat2 — 메가 골드 (골드 강조 1개 원칙) */}
          <motion.div style={{ opacity: b2O, y: b2Y }} className="relative">
            <motion.div
              aria-hidden
              style={{ opacity: b2Glow }}
              className="pointer-events-none absolute -inset-x-16 -inset-y-10 rounded-[40px]"
            >
              <div
                className="h-full w-full"
                style={{ background: "radial-gradient(58% 70% at 50% 50%, rgba(232,181,75,0.18), transparent 72%)" }}
              />
            </motion.div>
            <h2
              className="relative whitespace-nowrap font-display font-black leading-[1.02] text-gold text-[clamp(3rem,6.6vw,7.6rem)]"
              style={{ textShadow: "0 0 60px rgba(232,181,75,0.5), 0 0 22px rgba(232,181,75,0.32)" }}
            >
              맨손으로, 직접 만든다.
            </h2>
          </motion.div>

          {/* beat3 */}
          <motion.p
            style={{ opacity: b3O, y: b3Y }}
            className="font-display font-bold leading-[1.32] text-bone/85 text-[clamp(1.45rem,2.7vw,2.7rem)]"
          >
            <span className="block whitespace-nowrap">
              그리고 보여주겠습니다 — 그 안에서{" "}
              <span className="text-bone">무엇이 가능한지.</span>
            </span>
          </motion.p>
        </div>

        {/* ── 30가지 예고 + 클러스터 점 ── */}
        <div className="flex w-full flex-col items-center gap-[clamp(1.4rem,3.2vh,2.8rem)]">
          {/* 라벨(킥커) — '30' 위에 분리 배치, 고아 조각 제거 */}
          <motion.span
            style={{ opacity: tagO }}
            className="font-mono text-[11px] uppercase tracking-[0.4em] text-bone/60 md:text-[13px]"
          >
            바로 써먹는 · 실전 사례
          </motion.span>

          {/* 거대 30가지 — baseline 정렬로 락업 통일 */}
          <motion.div
            style={{ opacity: numO }}
            className="flex items-baseline justify-center gap-[clamp(0.6rem,1.2vw,1.2rem)]"
          >
            <motion.span
              style={{ scale: numScale }}
              className="relative inline-block origin-bottom font-display font-black leading-[0.82] tabular-nums text-gold text-[clamp(4.5rem,12vw,12rem)]"
            >
              <motion.span
                aria-hidden
                style={{ opacity: numGlow }}
                className="pointer-events-none absolute -inset-x-8 -inset-y-5 rounded-full"
              >
                <span
                  className="block h-full w-full rounded-full"
                  style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(232,181,75,0.26), transparent 70%)" }}
                />
              </motion.span>
              <span
                className="relative"
                style={{ textShadow: "0 0 70px rgba(232,181,75,0.55), 0 0 26px rgba(232,181,75,0.4)" }}
              >
                30
              </span>
            </motion.span>
            <motion.span
              style={{ opacity: tagO, x: tagX }}
              className="font-display font-black leading-none text-gold-bright text-[clamp(2rem,4.4vw,4.4rem)]"
            >
              가지
            </motion.span>
          </motion.div>

          {/* 6개 클러스터 점 — 화면 폭을 가로지르며 차례 점등 */}
          <div className="grid w-full max-w-[1280px] grid-cols-6 items-start gap-x-[clamp(0.6rem,2vw,2.4rem)] gap-y-3">
            {CLUSTERS.map((c, i) => (
              <ClusterDot key={c.id} cluster={c} index={i} p={p} />
            ))}
          </div>
        </div>

        {/* ── caption (모노) ── */}
        <motion.p
          style={{ opacity: capO }}
          className="font-mono text-[11px] uppercase tracking-[0.34em] text-bone/60 md:text-[13px]"
        >
          전부, VS Code 안에서.
        </motion.p>
      </div>
    </div>
  );
}

/* ───────────────────────── 클러스터 점 (가로 차례 점등) ───────────────────────── */
function ClusterDot({
  cluster,
  index,
  p,
}: {
  cluster: { id: string; label: string };
  index: number;
  p: MotionValue<number>;
}) {
  const at = 0.74 + index * 0.03;
  const o = useTransform(p, [at, at + 0.05], [0.18, 1]);
  const y = useTransform(p, [at, at + 0.06], [10, 0]);
  const dotGlow = useTransform(p, [at, at + 0.06], [0, 1]);

  return (
    <motion.div style={{ opacity: o, y }} className="flex flex-col items-center gap-2.5">
      <span className="relative flex h-[clamp(10px,1.1vw,15px)] w-[clamp(10px,1.1vw,15px)] items-center justify-center">
        <motion.span
          aria-hidden
          style={{ opacity: dotGlow }}
          className="absolute h-[clamp(22px,2.4vw,32px)] w-[clamp(22px,2.4vw,32px)] rounded-full"
        >
          <span
            className="block h-full w-full rounded-full"
            style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(232,181,75,0.5), transparent 70%)" }}
          />
        </motion.span>
        <span className="relative h-full w-full rounded-full bg-gold shadow-[0_0_14px_rgba(232,181,75,0.65)]" />
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/60 md:text-[12px]">
        {cluster.id}
      </span>
      <span className="whitespace-nowrap font-display font-semibold leading-none text-bone/80 text-[clamp(1rem,1.5vw,1.6rem)]">
        {cluster.label}
      </span>
    </motion.div>
  );
}
