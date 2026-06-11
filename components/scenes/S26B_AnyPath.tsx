"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";
import Counter from "@/components/ui/Counter";

/**
 * S26B — 갈림길의 환상 (핀 5, 4비트)
 * A: 창업/취업 갈림길 → B: 그 선택은 본질이 아니다
 * C: 채용 격변 (조선일보 2026.04.10 — "AI 못 쓰면 탈락")
 * D: 젠슨 황 (NVIDIA GTC 2026 올인 팟캐스트 — 실제 발언)
 */

const HIRING_CASES = [
  {
    company: "무신사",
    title: "‘AI 네이티브’ 공채",
    desc: "이력서 없음. 구독 중인 AI 도구 전부 허용. 정답 없는 문제 하나.",
    stat: "지원 2,000명 → 통과 66명",
  },
  {
    company: "SK AX",
    title: "AI 리터러시 인증 시험",
    desc: "AI와 대화하며 기획·개발·조사 문제를 푸는 과정을 통째로 평가.",
    stat: "그룹 전 계열사로 확대 예정",
  },
  {
    company: "코스맥스",
    title: "자기소개서 문항 신설",
    desc: "“AI 도구로 본인의 한계를 보완한 경험을 쓰시오.”",
    stat: "AI 활용 역량 우수자 우대",
  },
];

export default function Scene26B() {
  return (
    <section
      data-scene="s26b"
      data-act="ACT 5 — 올라타는 법"
      className="relative bg-ink text-bone"
    >
      <Pin heights={5}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  // 비트 A — 갈림길
  const aOpacity = useTransform(p, [0.02, 0.07, 0.2, 0.26], [0, 1, 1, 0]);
  const aY = useTransform(p, [0.02, 0.09], [40, 0]);
  const cardGap = useTransform(p, [0.17, 0.26], [0, 1]);
  const leftX = useTransform(cardGap, [0, 1], ["0%", "46%"]);
  const rightX = useTransform(cardGap, [0, 1], ["0%", "-46%"]);

  // 비트 B — 반전 선언
  const bOpacity = useTransform(p, [0.27, 0.33, 0.43, 0.49], [0, 1, 1, 0]);
  const bScale = useTransform(p, [0.27, 0.36], [0.96, 1]);

  // 비트 C — 채용 격변 (기사)
  const cOpacity = useTransform(p, [0.5, 0.56, 0.69, 0.75], [0, 1, 1, 0]);
  const cY = useTransform(p, [0.5, 0.58], [44, 0]);
  const flipOld = useTransform(p, [0.56, 0.6], [1, 0.3]);
  const flipNew = useTransform(p, [0.58, 0.63], [0, 1]);

  // 비트 D — 젠슨 황
  const dOpacity = useTransform(p, [0.76, 0.82, 1], [0, 1, 1]);
  const dY = useTransform(p, [0.76, 0.84], [44, 0]);
  const punchOpacity = useTransform(p, [0.9, 0.96], [0, 1]);
  const punchY = useTransform(p, [0.9, 0.96], [24, 0]);

  // 배경 — 새벽 골드 잔광
  const glowO = useTransform(p, [0, 0.5, 1], [0.35, 0.2, 0.45]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* ── 배경 레이어 ── */}
      <motion.div
        aria-hidden
        style={{ opacity: glowO }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-x-0 bottom-0 h-[55vh]"
          style={{
            background:
              "radial-gradient(70% 100% at 50% 100%, rgba(232,181,75,0.14), transparent 75%)",
          }}
        />
      </motion.div>

      {/* ── 비트 A — 갈림길 ── */}
      <motion.div
        style={{ opacity: aOpacity, y: aY }}
        className="absolute inset-0 flex flex-col items-center justify-center px-[6vw]"
      >
        <Kicker>ACT 5 — 갈림길의 환상</Kicker>
        <p className="mt-7 text-balance-k text-center font-display text-[clamp(1.6rem,3.2vw,2.9rem)] font-bold leading-[1.3] text-bone">
          이쯤에서, 당신은
          <br />
          갈림길을 그리고 있을 것이다.
        </p>

        <div className="mt-14 flex items-stretch gap-8 md:gap-14">
          <motion.div style={{ x: leftX }}>
            <PathCard path="PATH A" label="창업" sub="나만의 것을 만든다" float={1} />
          </motion.div>
          <motion.div style={{ x: rightX }}>
            <PathCard path="PATH B" label="취업" sub="조직에서 성장한다" float={-1} />
          </motion.div>
        </div>

        <p className="mt-12 font-mono text-[11px] tracking-[0.3em] text-bone/40 md:text-xs">
          “어느 쪽이 정답일까?”
        </p>
      </motion.div>

      {/* ── 비트 B — 반전 선언 ── */}
      <motion.div
        style={{ opacity: bOpacity, scale: bScale }}
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-[8vw] text-center"
      >
        <h2 className="text-balance-k font-display text-[clamp(2.4rem,6.4vw,5.8rem)] font-black leading-[1.18] text-bone">
          어느 쪽이든 —
          <br />그 선택은, <span className="text-gold">본질이 아니다.</span>
        </h2>
        <p className="mt-9 max-w-3xl text-balance-k text-[clamp(1.05rem,1.8vw,1.5rem)] leading-relaxed text-bone/65">
          무엇을 차리든, 어디에 들어가든 — 어차피 당신은 같은 질문 앞에 선다.
        </p>
      </motion.div>

      {/* ── 비트 C — 채용 격변 (조선일보 2026.04.10) ── */}
      <motion.div
        style={{ opacity: cOpacity, y: cY }}
        className="absolute inset-0 flex flex-col items-center justify-center px-[6vw]"
      >
        <Kicker>PRESS — 조선일보 2026.04.10</Kicker>

        {/* 원칙의 180도 반전 */}
        <div className="mt-8 flex flex-col items-center gap-2 text-center md:flex-row md:gap-7">
          <motion.p
            style={{ opacity: flipOld }}
            className="font-display text-[clamp(1.5rem,3.4vw,3rem)] font-bold text-haze line-through decoration-haze/60"
          >
            “AI 쓰면 탈락”
          </motion.p>
          <span className="font-mono text-gold/60 text-[clamp(1rem,2vw,1.6rem)]">
            →
          </span>
          <motion.p
            style={{ opacity: flipNew }}
            className="font-display text-[clamp(1.7rem,3.8vw,3.4rem)] font-black text-gold [text-shadow:0_0_40px_rgba(232,181,75,0.3)]"
          >
            “AI 못 쓰면 탈락”
          </motion.p>
        </div>
        <p className="mt-4 text-balance-k text-center text-[clamp(0.95rem,1.5vw,1.2rem)] text-bone/60">
          단 1년 만에, 채용의 원칙이 180도 뒤집혔다.
        </p>

        {/* 실제 사례 카드 3장 */}
        <div className="mt-10 grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
          {HIRING_CASES.map((c, i) => (
            <CaseCard key={c.company} c={c} p={p} at={0.58 + i * 0.025} />
          ))}
        </div>

        <p className="mt-9 text-balance-k text-center font-display text-[clamp(1.05rem,1.9vw,1.55rem)] leading-relaxed text-bone/80">
          한 대기업 부장의 말 — <span className="text-bone">“이제 위아래로, AI의 압박이 오고 있다.”</span>
        </p>
      </motion.div>

      {/* ── 비트 D — 젠슨 황 (실제 발언) ── */}
      <motion.div
        style={{ opacity: dOpacity, y: dY }}
        className="absolute inset-0 flex flex-col items-center justify-center px-[6vw]"
      >
        <Kicker>ON RECORD — NVIDIA GTC 2026</Kicker>

        <div className="relative mt-9 w-full max-w-4xl rounded-xl border border-gold/35 bg-coal/70 px-8 py-10 backdrop-blur-sm md:px-14 md:py-12">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-10 left-5 font-display text-[7rem] font-black leading-none text-gold/25 md:text-[9rem]"
          >
            “
          </span>

          <p className="relative text-balance-k font-display text-[clamp(1.45rem,2.9vw,2.6rem)] font-bold leading-[1.45] text-bone">
            연봉 <span className="font-mono text-gold">$500,000</span>
            짜리 엔지니어가, 토큰을{" "}
            <span className="font-mono text-gold">
              $<Counter to={250000} duration={2.2} />
            </span>
            어치도 안 썼다면 — 나는 심각하게 경악할 것이다.
          </p>

          <div className="mt-8 flex flex-col gap-3 border-t border-bone/10 pt-6">
            <p className="font-mono text-[11px] tracking-[0.22em] text-gold/80 md:text-xs">
              — 젠슨 황, 엔비디아 CEO · 올인 팟캐스트, GTC 2026
            </p>
            <p className="text-balance-k text-[clamp(0.95rem,1.4vw,1.15rem)] leading-relaxed text-bone/60">
              세계에서 가장 비싼 회사의 기준 — 연봉의 절반을 AI 토큰에 써라.
              그는 이렇게 덧붙였다. “AI 없이 일하겠다는 건, 종이와 연필로
              반도체를 설계하겠다는 소리다.”
            </p>
          </div>
        </div>

        <motion.p
          style={{ opacity: punchOpacity, y: punchY }}
          className="mt-12 max-w-3xl text-balance-k text-center font-display text-[clamp(1.3rem,2.6vw,2.3rem)] font-bold leading-[1.45] text-bone"
        >
          창업을 해도, 취직을 해도 — 결국 같은 이야기다.
          <br />
          <span className="text-gold">토큰 사용량이 곧 능력으로 읽히는 시대</span>
          가, 이미 와 있다.
        </motion.p>
      </motion.div>
    </div>
  );
}

/** 갈림길 문 카드 */
function PathCard({
  path,
  label,
  sub,
  float,
}: {
  path: string;
  label: string;
  sub: string;
  float: 1 | -1;
}) {
  return (
    <motion.div
      animate={{ y: [0, float * -9, 0] }}
      transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
      className="flex w-[34vw] max-w-[330px] flex-col items-center rounded-xl border border-bone/15 bg-coal/80 px-6 py-10 backdrop-blur-sm md:py-12"
    >
      <p className="font-mono text-[10px] tracking-[0.4em] text-bone/40">{path}</p>
      <p className="mt-5 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-black leading-none text-bone">
        {label}
      </p>
      <p className="mt-4 text-[clamp(0.85rem,1.2vw,1rem)] text-bone/50">{sub}</p>
      <span className="mt-7 h-px w-12 bg-gold/50" />
    </motion.div>
  );
}

/** 채용 사례 카드 — progress 연동 스태거 등장 */
function CaseCard({
  c,
  p,
  at,
}: {
  c: (typeof HIRING_CASES)[number];
  p: MotionValue<number>;
  at: number;
}) {
  const o = useTransform(p, [at, at + 0.035], [0, 1]);
  const y = useTransform(p, [at, at + 0.04], [26, 0]);
  return (
    <motion.div
      style={{ opacity: o, y }}
      className="rounded-lg border border-bone/12 bg-coal/75 px-5 py-6 backdrop-blur-sm"
    >
      <p className="font-mono text-[10px] tracking-[0.3em] text-gold/75">
        {c.company}
      </p>
      <p className="mt-2 font-display text-[clamp(1.05rem,1.5vw,1.3rem)] font-bold text-bone">
        {c.title}
      </p>
      <p className="mt-3 text-balance-k text-[13px] leading-relaxed text-bone/60">
        {c.desc}
      </p>
      <p className="mt-4 border-t border-bone/10 pt-3 font-mono text-[10px] tracking-[0.14em] text-bone/45">
        {c.stat}
      </p>
    </motion.div>
  );
}
