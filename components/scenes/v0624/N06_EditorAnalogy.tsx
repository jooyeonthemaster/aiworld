"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * N06 — 그냥 '편집기'다 (문과 안심 비유)  [ACT6 견본 / REFERENCE]
 * 16:9 3열 그리드(문서/디자인/코드 편집기) + Pin 스크롤 점등.
 * 문서·디자인 열은 익숙한 이름으로 안심 → 코드 열이 골드로 점등 = "같은 종류다".
 */

type Col = { kind: string; tools: string[]; desc: string; gold: boolean };
const COLS: Col[] = [
  { kind: "문서 편집기", tools: ["한컴", "MS Word", "구글 독스", "Pages"], desc: "글을 편집하는 툴", gold: false },
  { kind: "디자인 편집기", tools: ["PPT", "캔바", "포토샵", "일러스트", "미리캔버스"], desc: "이미지를 편집하는 툴", gold: false },
  { kind: "코드 편집기", tools: ["VS Code", "Cursor", "…"], desc: "코드를 편집하는 툴", gold: true },
];

export default function N06EditorAnalogy() {
  return (
    <section
      data-scene="n06"
      data-act="ACT 6 — 본질: 코드 에디터"
      className="relative bg-ink text-bone"
    >
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  const glowO = useTransform(p, [0, 0.5, 1], [0.18, 0.4, 0.5]);
  const gridShift = useTransform(p, [0, 1], [0, -36]);

  const leadO = useTransform(p, [0.02, 0.12], [0, 1]);
  const leadY = useTransform(p, [0.02, 0.16], [38, 0]);
  const concO = useTransform(p, [0.74, 0.86], [0, 1]);
  const concY = useTransform(p, [0.74, 0.88], [28, 0]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ── 배경 ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(52% 56% at 50% 44%, rgba(232,181,75,0.10), transparent 72%)" }}
        />
      </motion.div>
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
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col content-center items-center justify-center gap-[clamp(2.5rem,6vh,5.5rem)] px-[clamp(2.5rem,6vw,8rem)] py-[8vh]">
        {/* 리드 */}
        <motion.div style={{ opacity: leadO, y: leadY }} className="text-center">
          <Kicker className="justify-center">ACT 6 — 본질: 코드 에디터</Kicker>
          <p className="mt-7 font-display font-bold leading-[1.32] text-bone text-[clamp(1.5rem,2.9vw,2.9rem)]">
            <span className="block whitespace-nowrap">
              <span className="text-gold">&apos;코드 편집기&apos;</span>만 들으면 속이 안 좋아지는 문과생들 —
            </span>
            <span className="block whitespace-nowrap">그럴 필요, 전혀 없다.</span>
          </p>
        </motion.div>

        {/* 3열 그리드 */}
        <div className="grid w-full grid-cols-1 gap-[clamp(1rem,1.6vw,1.8rem)] md:grid-cols-3">
          {COLS.map((c, i) => (
            <EditorCol key={c.kind} col={c} index={i} p={p} />
          ))}
        </div>

        {/* 결론 */}
        <motion.p
          style={{ opacity: concO, y: concY }}
          className="mt-[clamp(1rem,3vh,2.5rem)] max-w-[1180px] text-balance-k text-center font-display font-bold leading-[1.5] text-bone/85 text-[clamp(1.15rem,2vw,2rem)]"
        >
          글을 편집하는 툴, 이미지를 편집하는 툴이 있듯 —{" "}
          <span className="whitespace-nowrap">
            <span className="text-bone">&apos;코드&apos;</span>를 편집하는 툴을, 우리는{" "}
            <span className="text-gold">코드 에디터</span>라 부른다.
          </span>{" "}
          딱 그뿐이다.
        </motion.p>
      </div>
    </div>
  );
}

function EditorCol({ col, index, p }: { col: Col; index: number; p: MotionValue<number> }) {
  const at = 0.16 + index * 0.14;
  const o = useTransform(p, [at, at + 0.1], [0, 1]);
  const y = useTransform(p, [at, at + 0.12], [40, 0]);
  /* 코드 열은 점등이 한 박자 늦게 골드로 */
  const goldGlow = useTransform(p, [at + 0.06, at + 0.18], [0, 1]);

  return (
    <motion.div
      style={{ opacity: o, y }}
      className={`relative flex flex-col rounded-2xl border bg-coal/70 px-[clamp(1.4rem,1.8vw,2.2rem)] py-[clamp(1.6rem,2.4vh,2.4rem)] backdrop-blur-sm ${
        col.gold ? "border-gold/55" : "border-bone/12"
      }`}
    >
      {col.gold ? (
        <motion.div
          aria-hidden
          style={{
            opacity: goldGlow,
            background: "radial-gradient(60% 70% at 50% 40%, rgba(232,181,75,0.16), transparent 72%)",
          }}
          className="pointer-events-none absolute -inset-4 rounded-3xl"
        />
      ) : null}

      {/* 카테고리명 */}
      <div className="relative flex items-baseline gap-3">
        <span className="font-mono text-[11px] tracking-[0.3em] text-bone/35">{String(index + 1).padStart(2, "0")}</span>
        <h3
          className={`font-display font-black leading-tight text-[clamp(1.5rem,2.2vw,2.3rem)] ${
            col.gold ? "text-gold [text-shadow:0_0_34px_rgba(232,181,75,0.4)]" : "text-bone"
          }`}
        >
          {col.kind}
        </h3>
      </div>

      {/* 구분선 */}
      <span className={`relative mt-5 h-px w-full ${col.gold ? "bg-gold/40" : "bg-bone/12"}`} />

      {/* 툴 칩 */}
      <div className="relative mt-6 flex flex-wrap gap-2.5">
        {col.tools.map((t) => (
          <span
            key={t}
            className={`rounded-full border px-3.5 py-1.5 font-mono text-[clamp(0.8rem,0.95vw,1rem)] tracking-[0.02em] ${
              col.gold ? "border-gold/45 bg-gold/10 text-gold" : "border-bone/15 bg-bone/[0.04] text-bone/70"
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      {/* 설명 */}
      <p className={`relative mt-7 text-[clamp(1rem,1.3vw,1.35rem)] ${col.gold ? "text-bone/85" : "text-bone/55"}`}>
        {col.desc}
      </p>
    </motion.div>
  );
}
