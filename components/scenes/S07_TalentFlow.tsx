"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Counter from "@/components/ui/Counter";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import TextSplit from "@/components/ui/TextSplit";

const EASE = [0.16, 1, 0.3, 1] as const;

/** 출발점 — 좌측에서 우측 골드 노드(AI LABS)로 수렴 */
const SOURCES: { label: string; y: number }[] = [
  { label: "물리학", y: 90 },
  { label: "수학", y: 195 },
  { label: "의학", y: 300 },
  { label: "금융", y: 405 },
  { label: "대학", y: 510 },
];

const NODE = { x: 742, y: 300 };

const pathFor = (y: number) =>
  `M 128 ${y} C 360 ${y}, 520 ${NODE.y}, ${NODE.x - 16} ${NODE.y}`;

export default function Scene07() {
  return (
    <section
      data-scene="s07"
      data-act="ACT 1 — 3년 전, 우리는 웃었다"
      className="relative min-h-screen overflow-hidden bg-ink text-bone"
    >
      {/* ── 배경: 우측 수렴점의 골드 글로우 + 좌측의 흩어진 잔광 ── */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(34% 48% at 76% 52%, rgba(232,181,75,0.10), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(30% 50% at 8% 40%, rgba(242,237,227,0.035), transparent 75%)",
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1400px] items-center gap-x-16 gap-y-14 px-[6vw] py-[12vh] lg:grid-cols-[1.05fr_1fr]">
        {/* ── 좌측: 텍스트 칼럼 ── */}
        <div>
          <Reveal y={20}>
            <Kicker>ACT 1 — 두뇌의 이동</Kicker>
          </Reveal>

          <h2 className="mt-7 text-balance-k font-display font-bold leading-[1.2] text-bone">
            <TextSplit
              text="지금, 전 세계의 천재들은"
              per="char"
              stagger={0.028}
              delay={0.25}
              className="block text-[clamp(1.9rem,4.2vw,3.6rem)]"
            />
            <TextSplit
              text="한 방향으로 움직인다."
              per="char"
              stagger={0.028}
              delay={0.75}
              className="block text-[clamp(1.9rem,4.2vw,3.6rem)]"
            />
          </h2>

          {/* 스탯 카드 3 */}
          <div className="mt-12 space-y-0">
            <StatRow
              delay={0.2}
              value={
                <Counter
                  to={100000000}
                  prefix="$"
                  duration={2.4}
                  className="font-mono text-[clamp(1.9rem,3.3vw,3rem)] font-bold text-gold"
                />
              }
              desc="메타가 연구자 단 한 명에게 제시한 영입 패키지"
              note="한 24세 연구자의 계약은 4년 2.5억 달러 — 사람 한 명에 20조 원을 쓴 회사도 있다"
            />
            <StatRow
              delay={0.4}
              value={
                <span className="font-display text-[clamp(1.9rem,3.3vw,3rem)] font-black text-bone">
                  수십만 명
                </span>
              }
              desc="같은 시각, AI 로 향하는 최상위권 인재의 행렬"
            />
            <StatRow
              delay={0.6}
              value={
                <span className="font-mono text-[clamp(1.9rem,3.3vw,3rem)] font-bold text-gold">
                  No.1
                </span>
              }
              desc="전 세계 시가총액 정점에 선 것은 AI 칩 회사다"
              note="엔비디아 시가총액 약 5조 달러 — 코스피 전체의 2배"
            />
          </div>
        </div>

        {/* ── 우측: SVG 플로우 비주얼 ── */}
        <Reveal delay={0.3} y={40} blur>
          <FlowChart />
        </Reveal>

        {/* ── 마무리 선언 (풀폭) ── */}
        <div className="lg:col-span-2">
          <Reveal delay={0.2} y={32} blur>
            <p className="mt-2 text-balance-k text-center font-display text-[clamp(1.4rem,2.8vw,2.4rem)] font-bold leading-[1.5] text-bone/90">
              인류 역사상, 이런 규모의{" "}
              <span className="text-gold">두뇌 이동</span>은 없었다.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StatRow({
  value,
  desc,
  note,
  delay,
}: {
  value: ReactNode;
  desc: string;
  note?: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} y={26} className="border-t border-bone/10 py-5 first:border-t-0">
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1.5">
        <span className="tabular-nums leading-none">{value}</span>
        <span className="text-balance-k text-[15px] leading-relaxed text-bone/60">
          {desc}
        </span>
      </div>
      {note ? (
        <p className="mt-2 font-mono text-[10px] tracking-[0.08em] text-bone/35">
          — {note}
        </p>
      ) : null}
    </Reveal>
  );
}

/** 수렴 플로우 — 경로는 pathLength 로 그려지고, 점들은 SMIL animateMotion 으로 흐른다 */
function FlowChart() {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 900 600"
        className="h-auto w-full"
        role="img"
        aria-label="물리학·수학·의학·금융·대학에서 AI LABS 로 수렴하는 인재 흐름"
      >
        {/* 경로 */}
        {SOURCES.map((s, i) => (
          <motion.path
            key={s.label}
            d={pathFor(s.y)}
            fill="none"
            stroke="rgba(232,181,75,0.32)"
            strokeWidth={1.4}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.8, delay: 0.3 + i * 0.14, ease: EASE }}
          />
        ))}

        {/* 흐르는 점들 — 결정적 타이밍 (index 수식) */}
        {SOURCES.map((s, i) => (
          <g key={`dots-${s.label}`}>
            <circle r={3.2} fill="#FFD37A" opacity={0.95}>
              <animateMotion
                dur={`${3.4 + (i % 3) * 0.7}s`}
                begin={`${-(i * 1.15)}s`}
                repeatCount="indefinite"
                path={pathFor(s.y)}
              />
            </circle>
            <circle r={2} fill="#E8B54B" opacity={0.5}>
              <animateMotion
                dur={`${4.2 + ((i * 2) % 4) * 0.5}s`}
                begin={`${-(i * 1.9 + 1.1)}s`}
                repeatCount="indefinite"
                path={pathFor(s.y)}
              />
            </circle>
          </g>
        ))}

        {/* 출발점 + 라벨 */}
        {SOURCES.map((s, i) => (
          <motion.g
            key={`src-${s.label}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.9, delay: 0.25 + i * 0.14, ease: EASE }}
          >
            <circle cx={128} cy={s.y} r={4} fill="rgba(242,237,227,0.55)" />
            <circle cx={128} cy={s.y} r={9} fill="none" stroke="rgba(242,237,227,0.18)" />
            <text
              x={108}
              y={s.y + 6}
              textAnchor="end"
              fill="rgba(242,237,227,0.78)"
              fontSize={19}
              className="font-body"
            >
              {s.label}
            </text>
          </motion.g>
        ))}

        {/* 수렴 노드 — AI LABS */}
        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.2, delay: 1.0, ease: EASE }}
          style={{ transformOrigin: `${NODE.x}px ${NODE.y}px` }}
        >
          <circle cx={NODE.x} cy={NODE.y} r={62} fill="rgba(232,181,75,0.07)" />
          <circle cx={NODE.x} cy={NODE.y} r={36} fill="rgba(232,181,75,0.14)" />
          <circle cx={NODE.x} cy={NODE.y} r={14} fill="#E8B54B" />
          {/* SMIL 펄스 링 */}
          <circle cx={NODE.x} cy={NODE.y} r={18} fill="none" stroke="#E8B54B">
            <animate attributeName="r" values="18;56" dur="2.8s" repeatCount="indefinite" />
            <animate
              attributeName="stroke-opacity"
              values="0.55;0"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </circle>
          <text
            x={NODE.x}
            y={NODE.y + 96}
            textAnchor="middle"
            fill="#E8B54B"
            fontSize={15}
            letterSpacing={7}
            className="font-mono"
          >
            AI LABS
          </text>
        </motion.g>
      </svg>

      {/* 차트 모노 캡션 */}
      <Reveal delay={1.4} y={10}>
        <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-bone/30">
          the great brain migration — one direction
        </p>
      </Reveal>
    </div>
  );
}
