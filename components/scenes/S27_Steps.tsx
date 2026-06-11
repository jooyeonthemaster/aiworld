"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";
import TextSplit from "@/components/ui/TextSplit";

type Step = { num: string; title: string; body: string; tip: string };

const STEPS: Step[] = [
  {
    num: "01",
    title: "매일, 만나라",
    body: "검색창 대신 AI에게 먼저 물어라. 궁금한 것, 귀찮은 것, 막힌 것 — 전부.",
    tip: "30일이면 사고방식 자체가 바뀐다. 오늘 밤부터.",
  },
  {
    num: "02",
    title: "소비자가 아니라, 감독이 되라",
    body: "과제도, 보고서도, 코드도, 영상도 — 결과물을 AI와 '함께' 만들어라.",
    tip: "잘 시키는 사람이 결국 잘하는 사람이다. '시키는 기술'이 새로운 문해력이다.",
  },
  {
    num: "03",
    title: "안테나를 세워라",
    body: "새 모델이 나오면 뉴스로 읽지 말고, 직접 만져라. 변화는 기사가 아니라 손끝으로 감지하는 것이다.",
    tip: "모델 출시일이 축제일처럼 느껴지기 시작하면 — 당신은 이미 올라탄 것이다.",
  },
  {
    num: "04",
    title: "너의 분야 × AI",
    body: "모두가 AI 전문가가 될 필요는 없다. '내 분야에서 AI를 가장 잘 쓰는 사람' — 그 자리는 아직, 비어 있다.",
    tip: "간호 × AI, 법 × AI, 농업 × AI, 음악 × AI… 교차점은 무한하고, 경쟁자는 아직 없다.",
  },
  {
    num: "05",
    title: "거인이 못하는 것을 길러라",
    body: "질문하는 힘. 판단하는 눈. 너만의 취향. 결과를 책임지는 어깨.",
    tip: "거인 위에서 어디를 볼지는 — 결국, 네가 정한다.",
  },
];

export default function Scene27() {
  return (
    <section
      data-scene="s27"
      data-act="ACT 5 — 올라타는 법"
      className="relative bg-ink text-bone"
    >
      <Pin heights={6}>{(p) => <StepsTrack p={p} />}</Pin>
    </section>
  );
}

/* Pin render-prop 안에서 hook 금지 → 내부 컴포넌트로 분리 */
function StepsTrack({ p }: { p: MotionValue<number> }) {
  // 가로 트랙: 5패널, x 0% → -80%
  const x = useTransform(p, [0, 1], ["0%", "-80%"]);
  // 여정이 진행될수록 새벽 골드가 차오른다
  const dawn = useTransform(p, [0, 1], [0.06, 0.38]);
  // 현재 패널 인덱스 리드아웃
  const idxLabel = useTransform(p, (v: number) => {
    const i = Math.min(4, Math.max(0, Math.round(v * 4)));
    return `0${i + 1} / 05`;
  });

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* 전역 새벽 레이어 — progress 에 비례해 짙어짐 */}
      <motion.div
        style={{ opacity: dawn }}
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-gold/30 via-transparent to-transparent"
      />
      {/* 상단 비네트 (헤더 가독성) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 bg-gradient-to-b from-ink to-transparent" />

      {/* 헤더 */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-[6vw] pt-9">
        <Kicker>ACT 5 — 올라타는 법</Kicker>
        <motion.span className="font-mono text-xs tabular-nums tracking-[0.4em] text-bone/50">
          {idxLabel}
        </motion.span>
      </div>

      {/* ============ 가로 트랙 ============ */}
      <motion.div style={{ x }} className="relative z-10 flex h-full w-[500vw]">
        {STEPS.map((s, i) => (
          <Panel key={s.num} step={s} i={i} p={p} />
        ))}
      </motion.div>

      {/* 진행 점 5개 + 헤어라인 */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-center gap-4 pb-9">
        <div className="flex items-center gap-3">
          {STEPS.map((s, i) => (
            <Dot key={s.num} i={i} p={p} />
          ))}
        </div>
        <div className="h-px w-44 overflow-hidden bg-bone/10">
          <motion.div style={{ scaleX: p }} className="h-full w-full origin-left bg-gold/70" />
        </div>
      </div>
    </div>
  );
}

/* 풀스크린 패널 1장 */
function Panel({ step, i, p }: { step: Step; i: number; p: MotionValue<number> }) {
  // 패널 i 가 화면 중앙에 오는 progress = i * 0.25
  const c = i * 0.25;

  // 거대 번호 — 텍스트보다 느린 패럴랙스
  const numX = useTransform(p, [c - 0.3, c + 0.3], [150, -150]);
  const numOpacity = useTransform(
    p,
    [c - 0.24, c - 0.07, c + 0.18, c + 0.3],
    [0, 1, 1, 0.25]
  );
  // 본문 블록
  const contentY = useTransform(p, [c - 0.18, c - 0.02], [64, 0]);
  const contentOpacity = useTransform(
    p,
    [c - 0.18, c - 0.04, c + 0.2, c + 0.28],
    [0, 1, 1, 0.2]
  );
  // 팁 캡션은 반 박자 늦게
  const tipY = useTransform(p, [c - 0.13, c + 0.02], [40, 0]);
  const tipOpacity = useTransform(p, [c - 0.13, c - 0.01], [0, 1]);

  // 패널마다 배경 골드 농도가 미세하게 짙어짐 (여정의 진행감)
  const glow = 0.05 + i * 0.045;

  return (
    <div className="relative flex h-full w-screen shrink-0 items-center overflow-hidden px-[9vw]">
      {/* 패널별 골드 앰비언스 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(68% 58% at 50% 104%, rgba(232,181,75,${glow.toFixed(
            3
          )}), transparent 70%)`,
        }}
      />

      {/* 거대 번호 — 모노, 골드 스트로크 */}
      <div className="pointer-events-none absolute -left-[2vw] top-1/2 -translate-y-1/2 select-none">
        <motion.div style={{ x: numX, opacity: numOpacity }}>
          <span
            aria-hidden
            className="text-stroke-gold font-mono text-[clamp(11rem,27vw,24rem)] font-bold leading-none"
            style={{ filter: "drop-shadow(0 0 36px rgba(232,181,75,0.18))" }}
          >
            {step.num}
          </span>
        </motion.div>
      </div>

      {/* 본문 */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 ml-auto w-full max-w-[640px]"
      >
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.45em] text-gold/70 md:text-[11px]">
          <span className="h-px w-8 bg-gold/50" />
          <span>{`STEP ${step.num} OF 05`}</span>
        </div>

        <h3 className="mt-6 text-balance-k font-display text-[clamp(2rem,4.4vw,3.9rem)] font-bold leading-[1.25] text-bone">
          <span className="mr-4 font-mono text-[0.5em] font-normal tracking-[0.15em] text-gold">
            {step.num} /
          </span>
          <TextSplit text={step.title} per="char" stagger={0.035} delay={0.1} />
        </h3>

        <p className="mt-7 max-w-[560px] text-balance-k text-[clamp(1.05rem,1.7vw,1.5rem)] leading-[1.8] text-bone/75">
          {step.body}
        </p>

        <motion.div style={{ y: tipY, opacity: tipOpacity }} className="mt-10 border-l-2 border-gold/50 pl-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.45em] text-gold/60">
            TIP
          </div>
          <p className="mt-2 max-w-[520px] text-balance-k font-mono text-[12px] leading-relaxed text-gold-bright/90 md:text-sm">
            {step.tip}
          </p>
        </motion.div>
      </motion.div>

      {/* 패널 경계 헤어라인 */}
      <div className="absolute right-0 top-1/2 h-[46vh] w-px -translate-y-1/2 bg-bone/10" />
    </div>
  );
}

/* 진행 점 — 현재 패널에서 점등 */
function Dot({ i, p }: { i: number; p: MotionValue<number> }) {
  const c = i * 0.25;
  const opacity = useTransform(p, [c - 0.16, c, c + 0.16], [0.25, 1, 0.25]);
  const scale = useTransform(p, [c - 0.16, c, c + 0.16], [1, 1.7, 1]);
  return (
    <motion.span
      style={{ opacity, scale }}
      className="block h-1.5 w-1.5 rounded-full bg-gold"
    />
  );
}
