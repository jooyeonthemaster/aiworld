"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * N05 — 모델이 아니라 '환경'  [ACT6]
 * 16:9 2단 레이아웃 + Pin 스크롤 연동.
 * 좌: 리드·대비(모델 취소선→환경 골드)·선언·친절 설명.
 * 우: 다크 코드 에디터 창 목업(윈도우바·파일트리·코드·터미널) — S11 목업 문법 차용(다크 버전).
 * 연출: '모델' 칩이 흐려지고, '환경' = 코드 에디터 창 프레임이 골드로 점등.
 */

const MODELS = ["Claude", "GPT", "Gemini"] as const;

/* 파일트리 — 결정적 데이터 */
type Leaf = { name: string; depth: number; active: boolean };
const TREE: Leaf[] = [
  { name: "src", depth: 0, active: false },
  { name: "app.py", depth: 1, active: true },
  { name: "utils.py", depth: 1, active: false },
  { name: "data", depth: 0, active: false },
  { name: "README.md", depth: 0, active: false },
];

/* 가짜 코드 라인 — [들여쓰기 단계, [색토큰, 텍스트]...] */
type Tok = { c: string; t: string };
type Line = { ind: number; toks: Tok[] };
const C = {
  key: "text-[#C792EA]", // 키워드
  fn: "text-[#82AAFF]", // 함수/식별자
  str: "text-[#C3E88D]", // 문자열
  num: "text-[#F78C6C]", // 숫자
  cmt: "text-bone/30", // 주석
  pl: "text-bone/75", // 일반
};
const CODE: Line[] = [
  { ind: 0, toks: [{ c: C.cmt, t: "# AI가 '네 컴퓨터'에서 직접 일한다" }] },
  { ind: 0, toks: [{ c: C.key, t: "import" }, { c: C.pl, t: " os, " }, { c: C.fn, t: "ai" }] },
  { ind: 0, toks: [] },
  { ind: 0, toks: [{ c: C.key, t: "def" }, { c: C.pl, t: " " }, { c: C.fn, t: "build" }, { c: C.pl, t: "(idea):" }] },
  { ind: 1, toks: [{ c: C.fn, t: "files" }, { c: C.pl, t: " = ai." }, { c: C.fn, t: "write" }, { c: C.pl, t: "(idea, n=" }, { c: C.num, t: "100" }, { c: C.pl, t: ")" }] },
  { ind: 1, toks: [{ c: C.key, t: "for" }, { c: C.pl, t: " f " }, { c: C.key, t: "in" }, { c: C.pl, t: " files:" }] },
  { ind: 2, toks: [{ c: C.fn, t: "os" }, { c: C.pl, t: ".save(f, " }, { c: C.str, t: '"./my_app"' }, { c: C.pl, t: ")" }] },
  { ind: 1, toks: [{ c: C.key, t: "return" }, { c: C.pl, t: " " }, { c: C.str, t: '"done ✦"' }] },
];

const TERMINAL = [
  { p: "$", t: "ai run build.py", gold: false },
  { p: ">", t: "writing 100 files · connecting to your machine…", gold: false },
  { p: ">", t: "환경 연결됨 — 활용 가능성: 무한", gold: true },
];

export default function N05Environment() {
  return (
    <section
      data-scene="n05"
      data-act="ACT 6 — 본질: 코드 에디터"
      className="relative bg-ink text-bone"
    >
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

/* ───────────────────────── 핀 스테이지 ───────────────────────── */

function Stage({ p }: { p: MotionValue<number> }) {
  /* 배경 — 스크롤에 미세 반응 */
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.36, 0.5]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  /* 좌측 카피 비트 */
  const leadO = useTransform(p, [0.02, 0.12], [0, 1]);
  const leadY = useTransform(p, [0.02, 0.16], [40, 0]);

  /* 대비: '모델' 흐려짐 → '환경' 점등 */
  const contrastO = useTransform(p, [0.1, 0.2], [0, 1]);
  const contrastY = useTransform(p, [0.1, 0.22], [34, 0]);
  const modelDim = useTransform(p, [0.34, 0.5], [1, 0.26]);
  const envGold = useTransform(p, [0.42, 0.56], [0, 1]);

  /* 선언(세리프) */
  const declO = useTransform(p, [0.62, 0.74], [0, 1]);
  const declY = useTransform(p, [0.62, 0.76], [28, 0]);

  /* 친절 설명 */
  const defO = useTransform(p, [0.8, 0.9], [0, 1]);
  const defY = useTransform(p, [0.8, 0.92], [22, 0]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ── 배경 레이어 ── */}
      <motion.div
        aria-hidden
        style={{ opacity: glowO }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 58% at 70% 52%, rgba(232,181,75,0.12), transparent 72%)",
          }}
        />
        <div
          className="animate-pulse-soft absolute right-[16%] top-[48%] h-[44vh] w-[44vh] -translate-y-1/2 rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(255,211,122,0.09), transparent 70%)" }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: gridShift }}
        className="pointer-events-none absolute inset-[-10%] opacity-[0.05]"
      >
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

      {/* ── 콘텐츠: 2단 (content-center 로 단일 row 수직 중앙) ── */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 content-center items-center gap-[clamp(2rem,5vw,5.5rem)] px-[clamp(2.5rem,6vw,8rem)] py-[7vh] lg:grid-cols-[0.92fr_1.08fr]">
        {/* 좌측 — 카피 */}
        <div className="flex flex-col justify-center">
          {/* 리드 */}
          <motion.div style={{ opacity: leadO, y: leadY }}>
            <Kicker>ACT 6 — 모델이 아니라 환경</Kicker>
            <p className="mt-8 font-display font-bold leading-[1.2] text-bone text-[clamp(1.6rem,2.6vw,2.6rem)]">
              본질은 명확하다.
            </p>
          </motion.div>

          {/* 대비: 무슨 '모델' → 무슨 '환경' */}
          <motion.div
            style={{ opacity: contrastO, y: contrastY }}
            className="mt-[clamp(2rem,5vh,3.4rem)]"
          >
            {/* 모델 — 취소선 + 흐림 */}
            <motion.p
              style={{ opacity: modelDim }}
              className="relative inline-block font-display font-bold leading-[1.22] text-bone/55 text-[clamp(1.8rem,3.2vw,3.4rem)]"
            >
              <span className="relative whitespace-nowrap">
                무슨 <span className="text-bone/65">&apos;모델&apos;</span>을 쓰는가
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-bone/45"
                />
              </span>
            </motion.p>

            {/* 모델 칩 — 흐려짐 */}
            <motion.div style={{ opacity: modelDim }} className="mt-5 flex flex-wrap gap-2.5">
              {MODELS.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-bone/15 bg-bone/[0.04] px-3.5 py-1.5 font-mono text-[clamp(0.78rem,0.95vw,1rem)] tracking-[0.02em] text-bone/45"
                >
                  {m}
                </span>
              ))}
            </motion.div>

            {/* 화살표 전환 */}
            <div className="mt-7 flex items-center gap-3 text-bone/30">
              <span className="font-mono text-[clamp(1.4rem,2vw,2rem)] leading-none">↓</span>
              <span className="h-px flex-1 bg-bone/12" />
            </div>

            {/* 환경 — 골드 점등 ('에서 쓰는가.'가 통째로 한 줄에 오도록 nowrap 보호) */}
            <p className="mt-6 font-display font-black leading-[1.18] text-[clamp(2.1rem,3.8vw,4rem)]">
              <span className="whitespace-nowrap">
                <span className="text-bone/80">무슨 </span>
                <EnvWord envGold={envGold} />
                <span className="text-bone/80">에서 쓰는가.</span>
              </span>
            </p>
          </motion.div>

          {/* 선언(세리프) */}
          <motion.p
            style={{ opacity: declO, y: declY }}
            className="mt-[clamp(2.2rem,5vh,3.6rem)] font-display font-bold leading-[1.42] text-bone/90 text-[clamp(1.25rem,1.85vw,2rem)]"
          >
            <span className="whitespace-nowrap">
              <span className="text-gold">&apos;코드 편집기&apos;</span>를 다룰 수 있는 사람만이
            </span>
            <br />— AI 시대에 적응한다.
          </motion.p>

          {/* 친절 설명(용어 풀기) */}
          <motion.div
            style={{ opacity: defO, y: defY }}
            className="mt-[clamp(1.6rem,3.6vh,2.6rem)] max-w-[640px] rounded-2xl border border-bone/12 bg-coal/55 px-[clamp(1.3rem,1.7vw,2rem)] py-[clamp(1.1rem,1.8vh,1.7rem)] backdrop-blur-sm"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold/70">
              용어 풀기
            </p>
            <p className="mt-3 leading-relaxed text-bone/70 text-[clamp(1rem,1.3vw,1.35rem)]">
              <span className="font-semibold text-bone">코드 편집기(코드 에디터)란?</span>{" "}
              개발자가 코드를 작성하는 툴이다.{" "}
              <span className="whitespace-nowrap text-bone/90">VS Code 같은</span> — 흔히{" "}
              <span className="font-mono text-gold">IDE</span>라고 부르는 프로그램.
            </p>
          </motion.div>
        </div>

        {/* 우측 — 다크 코드 에디터 창 목업 */}
        <div className="flex h-full items-center justify-center">
          <EditorMock p={p} />
        </div>
      </div>
    </div>
  );
}

/* '환경' 단어 — bone→gold 크로스페이드 + 글로우 점등 */
function EnvWord({ envGold }: { envGold: MotionValue<number> }) {
  const glowO = useTransform(envGold, [0, 1], [0, 1]);
  const textShadow = useTransform(
    envGold,
    [0, 1],
    ["0 0 0px rgba(232,181,75,0)", "0 0 40px rgba(232,181,75,0.5)"],
  );
  const baseO = useTransform(envGold, [0, 1], [1, 0]);
  return (
    <span className="relative inline-block whitespace-nowrap align-baseline">
      <motion.span
        aria-hidden
        style={{ opacity: glowO }}
        className="animate-pulse-soft pointer-events-none absolute -inset-x-6 -inset-y-3 rounded-full"
      >
        <span
          className="block h-full w-full"
          style={{ background: "radial-gradient(50% 60% at 50% 50%, rgba(232,181,75,0.22), transparent 72%)" }}
        />
      </motion.span>
      {/* 베이스(본) → 골드 크로스페이드 */}
      <span className="relative">
        <motion.span style={{ opacity: baseO }} className="text-bone">
          &apos;환경&apos;
        </motion.span>
        <motion.span
          style={{ opacity: glowO, textShadow }}
          className="absolute inset-0 text-gold"
        >
          &apos;환경&apos;
        </motion.span>
      </span>
    </span>
  );
}

/* ───────────────────────── 코드 에디터 창 목업 ───────────────────────── */

function EditorMock({ p }: { p: MotionValue<number> }) {
  /* 창 등장 */
  const winO = useTransform(p, [0.06, 0.18], [0, 1]);
  const winY = useTransform(p, [0.06, 0.2], [64, 0]);
  const winS = useTransform(p, [0.06, 0.2], [0.96, 1]);

  /* '환경' 프레임 골드 점등 — 모델→환경 전환 구간에 동기 */
  const frameGold = useTransform(p, [0.42, 0.6], [0, 1]);
  const borderColor = useTransform(
    frameGold,
    [0, 1],
    ["rgba(242,237,227,0.12)", "rgba(232,181,75,0.55)"],
  );
  const frameGlowO = useTransform(frameGold, [0, 1], [0, 1]);
  const labelO = useTransform(p, [0.5, 0.62], [0, 1]);
  const labelY = useTransform(p, [0.5, 0.62], [14, 0]);

  return (
    <motion.div style={{ opacity: winO, y: winY, scale: winS }} className="relative w-full max-w-[860px]">
      {/* '환경' 프레임 골드 글로우 */}
      <motion.div
        aria-hidden
        style={{ opacity: frameGlowO }}
        className="pointer-events-none absolute -inset-6 rounded-[2rem]"
      >
        <div
          className="h-full w-full"
          style={{ background: "radial-gradient(58% 62% at 50% 46%, rgba(232,181,75,0.16), transparent 74%)" }}
        />
      </motion.div>

      {/* '환경' 라벨 태그 */}
      <motion.div
        style={{ opacity: labelO, y: labelY }}
        className="absolute -top-9 right-2 z-20 flex items-center gap-2 rounded-full border border-gold/45 bg-gold/10 px-4 py-1.5 backdrop-blur-sm"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-soft" />
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold md:text-[11px]">
          환경 = 코드 에디터
        </span>
      </motion.div>

      {/* 창 본체 */}
      <motion.div
        style={{ borderColor }}
        className="relative overflow-hidden rounded-2xl border bg-[#0B0A0F] shadow-[0_40px_100px_rgba(0,0,0,0.55)]"
      >
        {/* 창 헤더 — 점 3개 + 타이틀 */}
        <div className="flex h-11 items-center gap-2 border-b border-bone/10 bg-[#100D13] px-4">
          <span className="h-3 w-3 rounded-full bg-[#FF5F56]/80" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E]/80" />
          <span className="h-3 w-3 rounded-full bg-[#27C93F]/80" />
          <div className="ml-4 flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-bone/40">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden>
              <path d="M9 7 4 12l5 5M15 7l5 5-5 5" stroke="rgba(232,181,75,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>my_app — Code Editor</span>
          </div>
        </div>

        {/* 본문 — 파일트리 + 코드 */}
        <div className="grid grid-cols-[140px_1fr] md:grid-cols-[180px_1fr]">
          {/* 좌측 파일트리 */}
          <div className="border-r border-bone/10 bg-[#0E0C12] py-3">
            <p className="px-4 pb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-bone/30 md:text-[11px]">
              Explorer
            </p>
            <div className="flex flex-col">
              {TREE.map((leaf, i) => (
                <TreeRow key={leaf.name} leaf={leaf} i={i} p={p} />
              ))}
            </div>
          </div>

          {/* 중앙 코드 */}
          <div className="bg-[#0B0A0F]">
            {/* 탭 바 */}
            <div className="flex h-9 items-center border-b border-bone/10 bg-[#0E0C12] px-3">
              <span className="flex items-center gap-2 rounded-t-md border-b-2 border-gold/70 bg-[#0B0A0F] px-3 py-1.5 font-mono text-[11px] text-bone/80">
                <span className="h-2 w-2 rounded-[2px] bg-[#82AAFF]/80" />
                app.py
              </span>
            </div>
            {/* 코드 라인 */}
            <div className="px-1 py-3 font-mono text-[clamp(0.9rem,1vw,1.05rem)] leading-[1.85]">
              {CODE.map((line, i) => (
                <CodeRow key={i} line={line} i={i} p={p} />
              ))}
            </div>
          </div>
        </div>

        {/* 하단 터미널 */}
        <div className="border-t border-bone/10 bg-[#08070B] px-4 py-3">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#27C93F]/80" />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone/35 md:text-[11px]">
              Terminal
            </span>
          </div>
          <div className="flex flex-col gap-1 font-mono text-[clamp(0.85rem,0.95vw,1rem)] leading-relaxed">
            {TERMINAL.map((row, i) => (
              <TermRow key={i} row={row} i={i} p={p} />
            ))}
          </div>
        </div>

        {/* 상태바 */}
        <div className="flex items-center justify-between border-t border-bone/10 bg-gold/[0.06] px-4 py-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/70 md:text-[11px]">
            ✦ AI CONNECTED
          </span>
          <span className="font-mono text-[10px] tracking-[0.14em] text-bone/35 md:text-[11px]">
            UTF-8 · Python · Ln 8
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* 파일트리 행 — 순차 등장 */
function TreeRow({ leaf, i, p }: { leaf: Leaf; i: number; p: MotionValue<number> }) {
  const t0 = 0.2 + i * 0.022;
  const o = useTransform(p, [t0, t0 + 0.05], [0, 1]);
  const x = useTransform(p, [t0, t0 + 0.05], [-12, 0]);
  return (
    <motion.div
      style={{ opacity: o, x, paddingLeft: `${16 + leaf.depth * 14}px` }}
      className={`flex items-center gap-2 py-1.5 pr-3 font-mono text-[11px] md:text-xs ${
        leaf.active ? "bg-gold/[0.08] text-gold" : "text-bone/45"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-[2px] ${
          leaf.active ? "bg-gold/80" : leaf.depth === 0 ? "bg-bone/30" : "bg-[#82AAFF]/60"
        }`}
      />
      {leaf.name}
    </motion.div>
  );
}

/* 코드 라인 — progress 직결 타이핑 등장 */
function CodeRow({ line, i, p }: { line: Line; i: number; p: MotionValue<number> }) {
  const t0 = 0.22 + i * 0.026;
  const o = useTransform(p, [t0, t0 + 0.05], [0, 1]);
  const x = useTransform(p, [t0, t0 + 0.05], [16, 0]);
  return (
    <motion.div style={{ opacity: o, x }} className="flex">
      <span className="w-9 shrink-0 select-none pr-3 text-right text-bone/20">{i + 1}</span>
      <span className="whitespace-pre" style={{ paddingLeft: `${line.ind * 1.4}rem` }}>
        {line.toks.length === 0 ? (
          <span>&nbsp;</span>
        ) : (
          line.toks.map((tok, j) => (
            <span key={j} className={tok.c}>
              {tok.t}
            </span>
          ))
        )}
      </span>
    </motion.div>
  );
}

/* 터미널 행 — 마지막 골드 줄이 점등 */
function TermRow({ row, i, p }: { row: (typeof TERMINAL)[number]; i: number; p: MotionValue<number> }) {
  const t0 = 0.5 + i * 0.07;
  const o = useTransform(p, [t0, t0 + 0.06], [0, 1]);
  const y = useTransform(p, [t0, t0 + 0.06], [10, 0]);
  return (
    <motion.div style={{ opacity: o, y }} className="flex gap-2">
      <span className={row.gold ? "text-gold" : "text-[#27C93F]/80"}>{row.p}</span>
      <span
        className={row.gold ? "text-gold [text-shadow:0_0_22px_rgba(232,181,75,0.4)]" : "text-bone/55"}
      >
        {row.t}
      </span>
    </motion.div>
  );
}
