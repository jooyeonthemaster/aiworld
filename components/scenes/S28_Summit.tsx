"use client";

import { ReactNode } from "react";
import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Starfield from "@/components/ui/Starfield";
import Kicker from "@/components/ui/Kicker";

const ACT = "FINALE — 거인의 어깨 위에서";

/* 메가 선언 — 글자 단위 스크롤 점등 타이밍 */
const MEGA_L1 = Array.from("멀리 보는 자가,");
const MEGA_L2 = Array.from("멀리 간다.");
const MEGA_START = 0.58;
const MEGA_STEP = 0.014;
const MEGA_WIN = 0.12;

export default function Scene28() {
  return (
    <section data-scene="s28" data-act={ACT} className="relative bg-ink">
      <Pin heights={4}>{(p) => <SummitStage p={p} />}</Pin>
    </section>
  );
}

/* ============================================================
   스테이지 — 밤하늘이 새벽 골드로 물들고, 3개의 선언이 점등
   ============================================================ */
function SummitStage({ p }: { p: MotionValue<number> }) {
  /* --- 하늘: 별이 새벽에 삼켜진다 --- */
  const starsO = useTransform(p, [0.28, 0.82], [1, 0.04]);
  const sparksO = useTransform(p, [0.45, 0.85], [0, 0.55]);
  const skyO = useTransform(p, [0.18, 0.8], [0, 1]);

  /* --- 새벽: 하단에서 차오르는 골드 --- */
  const dawnScale = useTransform(p, [0.08, 0.85], [0.05, 1]);
  const dawnO = useTransform(p, [0.08, 0.4], [0, 1]);
  const sunO = useTransform(p, [0.2, 0.8], [0, 0.9]);
  const sunScale = useTransform(p, [0.2, 0.9], [0.7, 1.12]);
  const sunY = useTransform(p, [0.2, 0.9], ["10vh", "0vh"]);

  /* --- 거인의 어깨 (S01 수미상관 — 지평선 너머의 거대한 호) --- */
  const arcY = useTransform(p, [0.05, 0.85], ["-7vh", "-24vh"]);
  const arcO = useTransform(p, [0.02, 0.22], [0, 1]);

  /* --- 빛기둥 --- */
  const shaftsO = useTransform(p, [0.6, 0.9], [0, 0.5]);

  /* --- 메가 선언 컨테이너 --- */
  const megaY = useTransform(p, [0.58, 0.9], [44, 0]);
  const megaGlow = useTransform(p, [0.76, 0.94], [0, 0.45]);
  const ruleX = useTransform(p, [0.8, 0.9], [0, 1]);
  const sealO = useTransform(p, [0.86, 0.94], [0, 1]);

  /* --- HUD --- */
  const hudO = useTransform(p, [0.03, 0.1], [0, 1]);
  const barX = useTransform(p, [0, 1], [0, 1]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* L0 — 밤하늘 (별) */}
      <motion.div style={{ opacity: starsO }} className="absolute inset-0">
        <Starfield density={170} color="232,181,75" opacity={0.85} drift={0.04} />
      </motion.div>

      {/* L1 — 따뜻해지는 하늘 캐스트 */}
      <motion.div
        aria-hidden
        style={{
          opacity: skyO,
          background:
            "linear-gradient(to top, rgba(232,181,75,0.2) 0%, rgba(232,181,75,0.06) 34%, rgba(7,6,10,0) 62%)",
        }}
        className="absolute inset-0"
      />

      {/* L2 — 차오르는 새벽 시트 */}
      <motion.div
        aria-hidden
        style={{
          scaleY: dawnScale,
          opacity: dawnO,
          background:
            "linear-gradient(to top, rgba(255,211,122,0.3) 0%, rgba(232,181,75,0.11) 45%, rgba(7,6,10,0) 78%)",
        }}
        className="absolute inset-x-0 bottom-0 h-[62vh] origin-bottom"
      />

      {/* L3 — 태양 코어 */}
      <motion.div
        aria-hidden
        style={{
          opacity: sunO,
          scale: sunScale,
          y: sunY,
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,211,122,0.55) 0%, rgba(232,181,75,0.22) 38%, rgba(7,6,10,0) 70%)",
        }}
        className="absolute bottom-[-26vw] left-1/2 h-[56vw] w-[56vw] -translate-x-1/2 rounded-full blur-2xl"
      />

      {/* L4 — 빛기둥 (지평선에서 솟는 가는 광선) */}
      <motion.div aria-hidden style={{ opacity: shaftsO }} className="absolute inset-0">
        {Array.from({ length: 7 }, (_, i) => {
          const left = 10 + ((i * 137) % 80);
          const h = 22 + ((i * 29) % 30);
          const o = 0.25 + ((i * 17) % 50) / 100;
          return (
            <div
              key={i}
              style={{
                left: `${left}%`,
                height: `${h}vh`,
                opacity: o,
                background:
                  "linear-gradient(to top, rgba(255,211,122,0.7), rgba(232,181,75,0))",
              }}
              className="absolute bottom-[14vh] w-px"
            />
          );
        })}
      </motion.div>

      {/* L5 — 거인의 어깨 실루엣 (떠오르는 거대한 호) */}
      <motion.div
        aria-hidden
        style={{
          y: arcY,
          opacity: arcO,
          background:
            "radial-gradient(circle at 50% 6%, rgba(232,181,75,0.12) 0%, rgba(10,8,13,0.97) 36%, #07060a 60%)",
          boxShadow:
            "0 -36px 150px 0 rgba(232,181,75,0.26), inset 0 2px 0 rgba(255,211,122,0.45)",
        }}
        className="absolute left-1/2 top-full h-[180vw] w-[180vw] -translate-x-1/2 rounded-full"
      />

      {/* L6 — 떠오르는 골드 스파크 */}
      <motion.div style={{ opacity: sparksO }} className="absolute inset-0">
        <Starfield density={55} color="255,211,122" maxRadius={1.2} drift={-0.4} opacity={0.7} />
      </motion.div>

      {/* ===== 선언 1 ===== */}
      <Beat p={p} range={[0.05, 0.13, 0.28, 0.36]} label="01 / 03">
        <p className="font-display text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.3] text-bone text-balance-k">
          거인은 이미, 어깨를 내어주고 있다.
        </p>
      </Beat>

      {/* ===== 선언 2 ===== */}
      <Beat p={p} range={[0.33, 0.41, 0.53, 0.6]} label="02 / 03">
        <p className="font-display text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.3] text-bone text-balance-k">
          올라탈 것인가 — <span className="text-haze">발밑에 머물 것인가.</span>
        </p>
      </Beat>

      {/* ===== 메가 선언 — 발표 전체에서 가장 큰 타이포 ===== */}
      <motion.div
        style={{ y: megaY }}
        className="absolute inset-0 z-10 flex -translate-y-[4vh] items-center justify-center px-[4vw]"
      >
        <div className="relative text-center">
          {/* 글로우 더블 (뒤에서 숨쉬는 잔광) */}
          <motion.div aria-hidden style={{ opacity: megaGlow }} className="absolute inset-0">
            <div className="animate-pulse-soft blur-2xl">
              <MegaType lit />
            </div>
          </motion.div>

          {/* 본체 — 글자 단위 스크롤 점등 */}
          <h2
            className="relative font-display text-[clamp(3.4rem,12.5vw,13.5rem)] font-black leading-[1.04] tracking-[-0.02em] text-gold"
            style={{ textShadow: "0 0 70px rgba(232,181,75,0.35)" }}
            aria-label="멀리 보는 자가, 멀리 간다."
          >
            <span className="block whitespace-nowrap">
              {MEGA_L1.map((ch, i) => (
                <ScrollChar
                  key={i}
                  p={p}
                  ch={ch}
                  start={MEGA_START + i * MEGA_STEP}
                  end={MEGA_START + i * MEGA_STEP + MEGA_WIN}
                />
              ))}
            </span>
            <span className="block whitespace-nowrap text-gold-bright">
              {MEGA_L2.map((ch, i) => (
                <ScrollChar
                  key={i}
                  p={p}
                  ch={ch}
                  start={MEGA_START + (MEGA_L1.length + i) * MEGA_STEP}
                  end={MEGA_START + (MEGA_L1.length + i) * MEGA_STEP + MEGA_WIN}
                />
              ))}
            </span>
          </h2>

          {/* 마감 헤어라인 + 미세 캡션 */}
          <motion.div
            aria-hidden
            style={{ scaleX: ruleX }}
            className="mx-auto mt-[3.5vh] h-px w-[min(46vw,520px)] origin-center bg-gradient-to-r from-transparent via-gold/70 to-transparent"
          />
          <motion.p
            style={{ opacity: sealO }}
            className="mt-5 font-mono text-[10px] tracking-[0.5em] uppercase text-gold/60"
          >
            Daybreak — 2026.06
          </motion.p>
        </div>
      </motion.div>

      {/* ===== HUD / 프레임 ===== */}
      <motion.div style={{ opacity: hudO }} className="pointer-events-none absolute inset-0 z-20">
        {/* 상단 좌: 킥커 */}
        <div className="absolute left-[6vw] top-[7vh]">
          <Kicker tone="gold">FINALE — 거인의 어깨 위에서</Kicker>
        </div>
        {/* 상단 우 */}
        <p className="absolute right-[6vw] top-[7vh] font-mono text-[10px] tracking-[0.4em] uppercase text-bone/40">
          S28 — Summit
        </p>

        {/* 하단 좌: NIGHT → DAWN 진행 게이지 */}
        <div className="absolute bottom-[6vh] left-[6vw] flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase">
          <span className="text-haze">Night</span>
          <span className="relative h-px w-28 overflow-hidden bg-bone/15">
            <motion.span
              style={{ scaleX: barX }}
              className="absolute inset-0 origin-left bg-gold"
            />
          </span>
          <span className="text-gold">Dawn</span>
        </div>

        {/* 우측 레일: 선언 3개 점등 틱 */}
        <div className="absolute right-[6vw] top-1/2 flex -translate-y-1/2 flex-col items-end gap-5">
          <RailTick p={p} range={[0.06, 0.13]} label="01" />
          <RailTick p={p} range={[0.34, 0.41]} label="02" />
          <RailTick p={p} range={[0.62, 0.78]} label="03" />
        </div>
      </motion.div>
    </div>
  );
}

/* ============================================================
   내부 보조 컴포넌트 (Pin render-prop 밖 — hook 사용 가능)
   ============================================================ */

/** 순차 점등 선언 비트: in → hold → out */
function Beat({
  p,
  range,
  label,
  children,
}: {
  p: MotionValue<number>;
  range: [number, number, number, number];
  label: string;
  children: ReactNode;
}) {
  const [a, b, c, d] = range;
  const opacity = useTransform(p, [a, b, c, d], [0, 1, 1, 0]);
  const y = useTransform(p, [a, b, c, d], [48, 0, 0, -60]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-[8vw] text-center"
    >
      <p className="mb-6 font-mono text-[11px] tracking-[0.45em] uppercase text-gold/60">{label}</p>
      {children}
    </motion.div>
  );
}

/** 스크롤 진행으로 점등되는 글자 (마스크 리빌) */
function ScrollChar({
  p,
  ch,
  start,
  end,
}: {
  p: MotionValue<number>;
  ch: string;
  start: number;
  end: number;
}) {
  const y = useTransform(p, [start, end], ["112%", "0%"]);
  const o = useTransform(p, [start, end], [0, 1]);
  return (
    <span className="inline-block overflow-hidden align-bottom pb-[0.06em] -mb-[0.06em]">
      <motion.span className="inline-block" style={{ y, opacity: o }}>
        {ch === " " ? " " : ch}
      </motion.span>
    </span>
  );
}

/** 글로우 더블용 정적 타이포 */
function MegaType({ lit }: { lit?: boolean }) {
  return (
    <div
      className={`font-display text-[clamp(3.4rem,12.5vw,13.5rem)] font-black leading-[1.04] tracking-[-0.02em] ${
        lit ? "text-gold-bright" : "text-gold"
      }`}
    >
      <span className="block whitespace-nowrap">멀리 보는 자가,</span>
      <span className="block whitespace-nowrap">멀리 간다.</span>
    </div>
  );
}

/** 우측 레일 틱 — 한 번 점등되면 유지 */
function RailTick({
  p,
  range,
  label,
}: {
  p: MotionValue<number>;
  range: [number, number];
  label: string;
}) {
  const o = useTransform(p, range, [0.18, 1]);
  const w = useTransform(p, range, [16, 34]);
  return (
    <motion.div style={{ opacity: o }} className="flex items-center gap-3">
      <span className="font-mono text-[10px] tracking-[0.3em] text-gold">{label}</span>
      <motion.span style={{ width: w }} className="h-px bg-gold" />
    </motion.div>
  );
}
