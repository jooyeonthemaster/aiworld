"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Starfield from "@/components/ui/Starfield";

/**
 * I01 — 콜드 오픈 (후크)  [재설계 / 16:9 풀스크린]
 * 칠흑 + Starfield + 하단 골드 글로우. Pin heights=5.
 * 세 비트가 스크롤로 순차 점등되며 각 비트가 1920×1080 가로를 압도하는
 * 메가 세리프로 화면 중앙을 가득 채운다(좌우 여백 호사, 위아래 content-center).
 *   비트1 「"AI가 일자리를 대체한다."」(메가, clamp ~7vw)
 *   비트2 "— 다들, 그렇게 말은 한다."
 *   비트3 "그런데 그걸, 매일 '증명'하며 사는 사람은 드물다." ('증명' 골드+글로우)
 *   마무리 서브 "오늘, 그 증명을 직접 가져왔습니다."
 * 깨지면 안 되는 구절은 whitespace-nowrap 으로 통째 묶는다.
 */
export default function I01ColdOpen() {
  return (
    <section
      data-scene="i01"
      data-act="OPENING — 김주연"
      className="relative bg-ink text-bone"
    >
      <Pin heights={5}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

/* ============================================================
   Stage — 비트가 한 화면씩 무게감 있게 크로스페이드된다
   ============================================================ */
function Stage({ p }: { p: MotionValue<number> }) {
  /* ----- 배경: 별 / 하단 골드 글로우 / 비트3 호흡 ----- */
  const starO = useTransform(p, [0.0, 0.6, 1], [0.42, 0.6, 0.7]);
  const goldFloor = useTransform(p, [0.0, 0.2, 0.62, 1], [0.16, 0.26, 0.5, 0.64]);
  const lift = useTransform(p, [0.56, 0.7, 0.84, 1], [0, 0.18, 0.06, 0.07]);
  const gridShift = useTransform(p, [0, 1], [0, -36]);

  /* ----- 도시에 프레임 / 킥커 ----- */
  const frameO = useTransform(p, [0.0, 0.07], [0, 1]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ===== LAYER 0 — 약한 별 필드 ===== */}
      <motion.div aria-hidden style={{ opacity: starO }} className="absolute inset-0">
        <Starfield density={90} color="232,181,75" opacity={1} drift={0.04} />
      </motion.div>

      {/* ===== LAYER 0.5 — 미세 그리드(도시에 패럴랙스) ===== */}
      <motion.div
        aria-hidden
        style={{ y: gridShift }}
        className="pointer-events-none absolute inset-[-12%] opacity-[0.04]"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,237,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,227,0.5) 1px, transparent 1px)",
            backgroundSize: "84px 84px",
            maskImage: "radial-gradient(78% 78% at 50% 48%, black, transparent 100%)",
          }}
        />
      </motion.div>

      {/* ===== LAYER 1 — 배경 점등(비트3 호흡) ===== */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: lift,
          background:
            "radial-gradient(58% 46% at 50% 46%, rgba(242,237,227,0.10), transparent 72%)",
        }}
      />
      {/* ===== LAYER 1.5 — 하단 골드 글로우(차오름) ===== */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[48vh]"
        style={{
          opacity: goldFloor,
          background:
            "radial-gradient(64% 100% at 50% 100%, rgba(255,211,122,0.16) 0%, rgba(232,181,75,0.06) 44%, transparent 78%)",
        }}
      />
      {/* ===== LAYER 2 — 미세 비네트 ===== */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 94% 94% at 50% 48%, transparent 56%, rgba(7,6,10,0.86) 100%)",
        }}
      />

      {/* ===== 도시에 프레임: 코너 마크 + 킥커 + 라벨 ===== */}
      <motion.div
        aria-hidden
        style={{ opacity: frameO }}
        className="pointer-events-none absolute inset-0 z-20"
      >
        <span className="absolute left-[3.5vw] top-[5vh] h-6 w-6 border-l border-t border-gold/40" />
        <span className="absolute right-[3.5vw] top-[5vh] h-6 w-6 border-r border-t border-gold/40" />
        <span className="absolute bottom-[5vh] left-[3.5vw] h-6 w-6 border-b border-l border-gold/40" />
        <span className="absolute bottom-[5vh] right-[3.5vw] h-6 w-6 border-b border-r border-gold/40" />
        <p className="absolute bottom-[5.6vh] right-[6.5vw] hidden font-mono text-[10px] uppercase tracking-[0.35em] text-bone/20 md:block">
          I.01 — COLD OPEN
        </p>
      </motion.div>

      {/* ===== 킥커 (상단 고정, 모노) ===== */}
      <motion.div
        style={{ opacity: frameO }}
        className="absolute inset-x-0 top-[6.5vh] z-30 flex justify-center"
      >
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.34em] text-gold/90 md:text-[13px]">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/55" />
          <span className="whitespace-nowrap">
            AI WORLD · 2026.06.24 — FOR FUTURE AI MARKETERS
          </span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/55" />
        </div>
      </motion.div>

      {/* ===== 비트 무대 (풀폭, 수직 중앙) ===== */}
      <Beat1 p={p} />
      <Beat2 p={p} />
      <Beat3 p={p} />

      {/* ===== 진행 다이아 3개 ===== */}
      <Dots p={p} />
    </div>
  );
}

/* ============================================================
   공통 — 풀폭 무대 래퍼 (16:9 가로를 시원하게, content-center)
   ============================================================ */
function BeatStage({
  style,
  children,
}: {
  style: React.ComponentProps<typeof motion.div>["style"];
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={style}
      className="absolute inset-0 z-10 grid content-center justify-items-center px-[clamp(2.5rem,6vw,8rem)]"
    >
      <div className="w-full max-w-[1600px] text-center">{children}</div>
    </motion.div>
  );
}

/* ============================================================
   비트 1 — "AI가 일자리를 대체한다." (메가 세리프, 화면 압도)
   ============================================================ */
function Beat1({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [0.03, 0.12, 0.26, 0.34], [0, 1, 1, 0]);
  const y = useTransform(p, [0.03, 0.12, 0.26, 0.34], [56, 0, 0, -70]);
  const blur = useTransform(
    p,
    [0.03, 0.12, 0.26, 0.34],
    ["blur(16px)", "blur(0px)", "blur(0px)", "blur(18px)"],
  );
  const scale = useTransform(p, [0.03, 0.12, 0.26, 0.34], [1.07, 1, 1, 0.97]);

  return (
    <BeatStage style={{ opacity: o, y, filter: blur, scale }}>
      {/* 거대 인덱스 누메랄 (배경 워터마크) */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none font-display font-black leading-none text-bone/[0.035] text-[clamp(20rem,40vw,46rem)]"
      >
        01
      </span>
      <h2 className="font-display font-black leading-[1.06] text-bone text-[clamp(3rem,9vw,9.5rem)] [text-shadow:0_0_80px_rgba(7,6,10,0.7)]">
        <span className="block whitespace-nowrap">&ldquo;AI가 일자리를</span>
        <span className="block whitespace-nowrap">대체한다.&rdquo;</span>
      </h2>
    </BeatStage>
  );
}

/* ============================================================
   비트 2 — — 다들, 그렇게 말은 한다. (작게, 비꼬듯)
   ============================================================ */
function Beat2({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [0.32, 0.41, 0.52, 0.6], [0, 1, 1, 0]);
  const y = useTransform(p, [0.32, 0.41, 0.52, 0.6], [40, 0, 0, -58]);
  const blur = useTransform(
    p,
    [0.32, 0.41, 0.52, 0.6],
    ["blur(12px)", "blur(0px)", "blur(0px)", "blur(14px)"],
  );

  return (
    <BeatStage style={{ opacity: o, y, filter: blur }}>
      <p className="font-display font-medium italic leading-[1.32] text-bone/55 text-[clamp(2rem,5vw,4.4rem)]">
        <span className="block whitespace-nowrap">— 다들, 그렇게</span>
        <span className="block whitespace-nowrap">말은 한다.</span>
      </p>
    </BeatStage>
  );
}

/* ============================================================
   비트 3 — 그런데 그걸, ... 드물다. ('증명' 골드+글로우)
            + 마무리 서브
   ============================================================ */
function Beat3({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [0.58, 0.7], [0, 1]);
  const y = useTransform(p, [0.58, 0.72], [64, 0]);
  const blur = useTransform(p, [0.58, 0.7], ["blur(16px)", "blur(0px)"]);

  const proofGlow = useTransform(p, [0.66, 0.8], [0, 1]);
  const underline = useTransform(p, [0.82, 0.96], [0, 1]);
  const subO = useTransform(p, [0.80, 0.92], [0, 1]);
  const subY = useTransform(p, [0.80, 0.92], [26, 0]);

  return (
    <BeatStage style={{ opacity: o, y, filter: blur }}>
      <div className="relative inline-block">
        {/* '증명' 뒤편 골드 글로우 헤일로 */}
        <motion.span
          aria-hidden
          style={{
            opacity: proofGlow,
            background:
              "radial-gradient(circle, rgba(232,181,75,0.22), transparent 70%)",
          }}
          className="animate-pulse-soft pointer-events-none absolute left-1/2 top-[40%] -z-10 h-[34vh] w-[34vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        />
        <h2 className="mx-auto max-w-[1500px] font-display font-black leading-[1.12] text-bone text-[clamp(2.8rem,7vw,7.4rem)]">
          <span className="block whitespace-nowrap">그런데 그걸,</span>
          <span className="block whitespace-nowrap text-[clamp(2.5rem,6.1vw,6.4rem)]">
            매일{" "}
            <span
              className="relative text-gold"
              style={{
                textShadow:
                  "0 0 72px rgba(232,181,75,0.5), 0 0 26px rgba(255,211,122,0.35)",
              }}
            >
              &lsquo;증명&rsquo;
            </span>
            하며 사는 사람은
          </span>
          <span className="block whitespace-nowrap">드물다.</span>
        </h2>

        {/* 잔상 언더라인 */}
        <motion.span
          aria-hidden
          className="absolute -bottom-[0.5em] left-1/2 h-px w-[min(56vw,760px)] -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-gold/70 to-transparent"
          style={{ scaleX: underline }}
        />
      </div>

      {/* 마무리 서브 — 증명을 직접 가져왔다 */}
      <motion.p
        style={{ opacity: subO, y: subY }}
        className="mx-auto mt-[7vh] font-body leading-relaxed text-bone/70 text-[clamp(1.35rem,2.6vw,2.3rem)]"
      >
        오늘, 그 증명을{" "}
        <span className="whitespace-nowrap text-bone">직접 가져왔습니다.</span>
      </motion.p>
    </BeatStage>
  );
}

/* ============================================================
   진행 다이아 — 비트별 점등
   ============================================================ */
function Dots({ p }: { p: MotionValue<number> }) {
  const d1 = useTransform(p, [0.05, 0.12, 0.28, 0.34], [0.28, 1, 1, 0.28]);
  const d2 = useTransform(p, [0.34, 0.41, 0.54, 0.6], [0.28, 1, 1, 0.28]);
  const d3 = useTransform(p, [0.6, 0.7], [0.28, 1]);
  return (
    <div className="pointer-events-none absolute bottom-[5.5vh] left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
      <motion.span style={{ opacity: d1 }} className="h-1.5 w-1.5 rotate-45 bg-bone/80" />
      <motion.span style={{ opacity: d2 }} className="h-1.5 w-1.5 rotate-45 bg-bone/80" />
      <motion.span style={{ opacity: d3 }} className="h-1.5 w-1.5 rotate-45 bg-gold" />
    </div>
  );
}
