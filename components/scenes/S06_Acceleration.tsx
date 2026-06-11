"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * S06 — 가속하는 타임라인 (핀 5)
 * 출시 연월·간격은 검증된 팩트 기준 (2022.11.30 ChatGPT → 2026.06.09 Fable 5, 총 1,287일).
 * 카드 간격 = 실제 경과일에 비례 → 간격이 좁아지는 것 자체가 가속의 시각화.
 */

type ModelDrop = {
  date: string;
  name: string;
  day: number; // ChatGPT(2022-11-30) 기준 경과일 — 검증 팩트의 실제 날짜
  note?: string;
  gold?: boolean;
};

const TRACK_DAYS = 1287;
const DAY_PX = 2.2; // 1일 = 2.2px
const P_START = 0.06;
const P_END = 0.8;

const MODELS: ModelDrop[] = [
  { date: "2022.11", name: "ChatGPT", day: 0, note: "모든 것의 시작" },
  { date: "2023.03", name: "GPT-4", day: 104 },
  { date: "2023.07", name: "Claude 2", day: 223 },
  { date: "2023.12", name: "Gemini 1.0", day: 371 },
  { date: "2024.03", name: "Claude 3", day: 460 },
  { date: "2024.05", name: "GPT-4o", day: 530 },
  { date: "2024.09", name: "o1", day: 652 },
  { date: "2024.12", name: "Gemini 2.0", day: 742 },
  { date: "2025.03", name: "Gemini 2.5", day: 846 },
  { date: "2025.05", name: "Claude 4", day: 904 },
  { date: "2025.08", name: "GPT-5", day: 981 },
  { date: "2025.11", name: "GPT-5.1", day: 1078, note: "12일 새 3연타" },
  { date: "2025.11", name: "Gemini 3", day: 1084 },
  { date: "2025.11", name: "Opus 4.5", day: 1090 },
  { date: "2026.02", name: "Opus 4.6", day: 1163 },
  { date: "2026.04", name: "GPT-5.5", day: 1240 },
  { date: "2026.06", name: "FABLE 5", day: 1287, note: "그리고 — 지금", gold: true },
];

const YEARS: { label: string; day: number }[] = [
  { label: "2023", day: 32 },
  { label: "2024", day: 397 },
  { label: "2025", day: 763 },
  { label: "2026", day: 1128 },
];

const SPEED_TOPS = [11, 19, 28, 38, 62, 71, 81, 90];

export default function Scene06() {
  return (
    <section
      data-scene="s06"
      data-act="ACT 1 — 3년 전, 우리는 웃었다"
      className="relative overflow-x-clip bg-ink text-bone"
    >
      <Pin heights={5}>
        {(p) => (
          /* render-prop 내부 hook 금지 → 전부 Stage 내부 컴포넌트에서 처리 */
          <Stage p={p} />
        )}
      </Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  // 트랙 이동 — ease 없이 progress 직결 (질주감)
  const trackX = useTransform(p, [P_START, P_END], [0, -(TRACK_DAYS * DAY_PX)]);
  const trackOpacity = useTransform(p, [0, 0.05, 0.81, 0.88], [0, 1, 1, 0]);
  const hudOpacity = useTransform(p, [0.02, 0.08, 0.81, 0.87], [0, 1, 1, 0]);
  const baseFill = useTransform(p, [P_START, P_END], [0.001, 1]);

  // 속도선 — progress 에 비례해 길어진다
  const speedScale = useTransform(p, [0.05, 0.85], [0.04, 1]);
  const speedOpacity = useTransform(p, [0.04, 0.25, 0.8, 0.88], [0, 1, 1, 0]);

  // 거대 카운터 — 프론티어 모델 출시 간격 중앙값 (검증 팩트: 170.5일 → 49일)
  const daysVal = useTransform(p, [0.1, 0.32, 0.52, 0.68, 0.8], [170, 105, 84, 58, 49]);
  const daysText = useTransform(daysVal, (v: number) => `${Math.round(v)}`);

  // 엔딩 비트
  const endOpacity = useTransform(p, [0.87, 0.95], [0, 1]);
  const endY = useTransform(p, [0.87, 0.95], [48, 0]);
  const endGlow = useTransform(p, [0.86, 0.96], [0, 0.6]);

  return (
    <div className="relative h-full w-full">
      {/* ── 배경: 중앙 골드 잔광 + 속도선 ── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(232,181,75,0.05), transparent 75%)",
        }}
      />
      <motion.div aria-hidden style={{ opacity: speedOpacity }} className="absolute inset-0">
        {SPEED_TOPS.map((top, i) => (
          <motion.div
            key={top}
            className="absolute left-0 h-px w-full origin-left bg-gradient-to-r from-bone/0 via-bone/15 to-bone/0"
            style={{
              top: `${top}%`,
              scaleX: speedScale,
              opacity: 0.2 + ((i * 37) % 53) / 120,
            }}
          />
        ))}
      </motion.div>

      {/* ── HUD 좌: 킥커 + 고정 헤드라인 ── */}
      <motion.div
        style={{ opacity: hudOpacity }}
        className="absolute left-[6vw] top-[9vh] z-20 max-w-[44vw]"
      >
        <Kicker>ACT 1 — 속도의 기록</Kicker>
        <h2 className="mt-5 text-balance-k font-display text-[clamp(1.5rem,2.9vw,2.6rem)] font-bold leading-[1.25] text-bone">
          새 모델이 나오는 간격을 세어 보았다.
        </h2>
      </motion.div>

      {/* ── HUD 우: 줄어드는 거대 카운터 ── */}
      <motion.div
        style={{ opacity: hudOpacity }}
        className="absolute right-[6vw] top-[9vh] z-20 text-right"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-bone/45 md:text-[11px]">
          다음 모델까지 —
        </p>
        <p className="mt-1 font-mono font-bold leading-none text-gold">
          <motion.span className="text-[clamp(3rem,7vw,6.4rem)] tabular-nums">
            {daysText}
          </motion.span>
          <span className="ml-2 text-[clamp(1.1rem,2.2vw,1.9rem)] text-gold/80">일</span>
        </p>
        <p className="mt-3 font-mono text-[10px] tracking-[0.18em] text-bone/35">
          출시 간격 중앙값 — 170일(2023) → 49일(2026)
        </p>
      </motion.div>

      {/* ── 타임라인 트랙 ── */}
      <motion.div style={{ opacity: trackOpacity }} className="absolute inset-0 z-10">
        {/* 기준 수평선 + 골드 충전 라인 */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-bone/10" />
        <motion.div
          className="absolute inset-x-0 top-1/2 h-px origin-left bg-gold/45"
          style={{ scaleX: baseFill }}
        />
        {/* 현재 위치(화면 중앙) 인디케이터 */}
        <div aria-hidden className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <span className="block h-4 w-4 rounded-full border border-gold/60" />
          <span className="animate-pulse-soft absolute inset-0 m-auto block h-1.5 w-1.5 rounded-full bg-gold" />
        </div>

        {/* 움직이는 트랙 (좌측 기준점 = 화면 중앙) */}
        <motion.div style={{ x: trackX }} className="absolute inset-y-0 left-1/2 w-0">
          {/* 연도 눈금 */}
          {YEARS.map((y) => (
            <div key={y.label} className="absolute top-1/2" style={{ left: y.day * DAY_PX }}>
              <span className="absolute -translate-x-1/2 -translate-y-1/2 block h-5 w-px bg-bone/25" />
              <span className="absolute top-[164px] -translate-x-1/2 font-mono text-xs tracking-[0.4em] text-bone/30">
                {y.label}
              </span>
            </div>
          ))}
          {/* 모델 카드 */}
          {MODELS.map((m, i) => (
            <TimelineCard
              key={`${m.name}-${i}`}
              p={p}
              m={m}
              t={P_START + (m.day / TRACK_DAYS) * (P_END - P_START)}
              flip={i % 2 === 1}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* ── 엔딩 비트 ── */}
      <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-[8vw]">
        <motion.div
          aria-hidden
          style={{ opacity: endGlow }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(46% 38% at 50% 50%, rgba(232,181,75,0.10), transparent 72%)",
            }}
          />
        </motion.div>
        <motion.p
          style={{ opacity: endOpacity, y: endY }}
          className="relative max-w-4xl text-balance-k text-center font-display text-[clamp(1.7rem,3.6vw,3.2rem)] font-bold leading-[1.4] text-bone"
        >
          초기부터 이 속도를 지켜본 사람에게,
          <br />
          경이는 어느 순간 <span className="text-gold">공포</span>로 바뀐다.
        </motion.p>
      </div>
    </div>
  );
}

/** 트랙 위 모델 카드 — 중앙 통과 시 스케일업 + 골드 글로우 */
function TimelineCard({
  p,
  m,
  t,
  flip,
}: {
  p: MotionValue<number>;
  m: ModelDrop;
  t: number;
  flip: boolean;
}) {
  const scale = useTransform(p, [t - 0.07, t, t + 0.07], [0.9, 1.12, 0.94]);
  const opacity = useTransform(p, [t - 0.1, t - 0.02, t + 0.1], [0.38, 1, 0.5]);
  const boxShadow = useTransform(
    p,
    [t - 0.05, t, t + 0.05],
    [
      "0 0 0px rgba(232,181,75,0)",
      m.gold ? "0 0 52px rgba(232,181,75,0.45)" : "0 0 34px rgba(232,181,75,0.22)",
      "0 0 0px rgba(232,181,75,0)",
    ],
  );

  return (
    <div className="absolute top-1/2" style={{ left: m.day * DAY_PX }}>
      {/* 기준선 위의 점 */}
      <span
        className={`absolute block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
          m.gold ? "bg-gold" : "bg-bone/45"
        }`}
      />
      {/* 스템 */}
      <span
        className="absolute block w-px -translate-x-1/2 bg-bone/15"
        style={flip ? { bottom: 6, height: 42 } : { top: 6, height: 42 }}
      />
      {/* 카드 */}
      <motion.div
        style={{
          x: "-50%",
          scale,
          opacity,
          boxShadow,
          ...(flip ? { bottom: 56 } : { top: 56 }),
        }}
        className={`absolute w-[172px] rounded-lg border px-4 py-3 backdrop-blur-sm ${
          m.gold ? "border-gold/60 bg-gold/10" : "border-bone/10 bg-coal/85"
        }`}
      >
        <p
          className={`font-mono text-[10px] tracking-[0.25em] ${
            m.gold ? "text-gold/80" : "text-bone/40"
          }`}
        >
          {m.date}
        </p>
        <p
          className={`mt-1 font-display text-lg font-bold leading-tight ${
            m.gold ? "text-gold" : "text-bone/90"
          }`}
        >
          {m.name}
        </p>
        {m.note ? (
          <p
            className={`mt-1.5 font-mono text-[9px] tracking-[0.12em] ${
              m.gold ? "text-gold-bright/80" : "text-bone/35"
            }`}
          >
            {m.note}
          </p>
        ) : null}
      </motion.div>
    </div>
  );
}
