"use client";

import { useState } from "react";
import {
  motion,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

const QUERY = "변호사 이기는 법";

export default function Scene11() {
  return (
    <section
      data-scene="s11"
      data-act="ACT 2 — 다른 종류의 발명"
      className="relative overflow-x-clip bg-bone text-ink"
    >
      <Pin heights={3}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

/* ───────────────────────── 핀 스테이지 ───────────────────────── */

function Stage({ p }: { p: MotionValue<number> }) {
  // 킥커
  const kickerO = useTransform(p, [0.01, 0.06], [0, 1]);
  const kickerY = useTransform(p, [0.01, 0.06], [16, 0]);

  // 브라우저 — 등장 → 질문 등장 시 뒤로 물러남
  const winO = useTransform(p, [0.03, 0.12, 0.42, 0.5], [0, 1, 1, 0.18]);
  const winY = useTransform(p, [0.03, 0.12], [70, 0]);
  const winS = useTransform(p, [0.42, 0.5], [1, 0.96]);

  // 검색어 타이핑 — progress 직결 글자 수
  const charCount = useTransform(p, [0.1, 0.26], [0, QUERY.length]);
  const [typed, setTyped] = useState(0);
  useMotionValueEvent(charCount, "change", (v: number) => {
    setTyped(Math.max(0, Math.min(QUERY.length, Math.round(v))));
  });

  // 질문 두 줄 — 스탬프 임팩트 순간 뒤로 물러남
  const q1o = useTransform(p, [0.42, 0.49, 0.65, 0.71], [0, 1, 1, 0.2]);
  const q1y = useTransform(p, [0.42, 0.49], [30, 0]);
  const q2o = useTransform(p, [0.5, 0.57, 0.65, 0.71], [0, 1, 1, 0.2]);
  const q2y = useTransform(p, [0.5, 0.57], [30, 0]);

  // 비꼬는 비트
  const snarkO = useTransform(p, [0.58, 0.63, 0.65, 0.71], [0, 1, 1, 0.12]);
  const snarkY = useTransform(p, [0.58, 0.63], [16, 0]);

  // 스탬프 임팩트
  const shakeY = useTransform(p, [0.66, 0.68, 0.7, 0.72, 0.74], [0, -3, 2, -1, 0]);
  const flashO = useTransform(p, [0.66, 0.685, 0.74], [0, 0.13, 0]);

  // 캡션
  const capO = useTransform(p, [0.8, 0.89], [0, 1]);
  const capY = useTransform(p, [0.8, 0.89], [22, 0]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* 종이 결 텍스처 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(7,6,10,0.02) 0px, rgba(7,6,10,0.02) 1px, transparent 1px, transparent 10px)",
        }}
      />

      {/* 스탬프 플래시 */}
      <motion.div
        aria-hidden
        style={{ opacity: flashO }}
        className="pointer-events-none absolute inset-0 z-30 bg-ember"
      />

      {/* 킥커 */}
      <div className="absolute inset-x-0 top-[7vh] z-20 flex justify-center">
        <motion.div style={{ opacity: kickerO, y: kickerY }}>
          <Kicker tone="ink">위대한 발명 No.2 — 인터넷 (1991)</Kicker>
        </motion.div>
      </div>

      {/* 쉐이크 컨테이너 */}
      <motion.div
        style={{ y: shakeY }}
        className="absolute inset-0 flex items-center justify-center px-[6vw]"
      >
        {/* 브라우저 창 목업 */}
        <motion.div
          style={{ opacity: winO, y: winY, scale: winS }}
          className="w-full max-w-[720px] -translate-y-[3vh] overflow-hidden rounded-2xl border border-ink/15 bg-[#FAF6EC] shadow-[0_36px_90px_rgba(7,6,10,0.14)]"
        >
          {/* 창 헤더 */}
          <div className="flex h-11 items-center gap-2 border-b border-ink/10 px-4">
            <span className="h-3 w-3 rounded-full bg-ink/15" />
            <span className="h-3 w-3 rounded-full bg-ink/15" />
            <span className="h-3 w-3 rounded-full bg-ink/15" />
            <div className="ml-3 flex h-7 flex-1 items-center justify-center rounded-full bg-ink/[0.06] px-4">
              <span className="font-mono text-[11px] tracking-[0.08em] text-ink/40">
                https://www.search.com
              </span>
            </div>
          </div>

          {/* 검색창 + 타이핑 */}
          <div className="p-6 md:p-8">
            <div className="flex h-12 items-center gap-3 rounded-full border-2 border-ink/25 px-5 md:h-14">
              {/* 돋보기 */}
              <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="none" aria-hidden>
                <circle cx="9" cy="9" r="6" stroke="rgba(7,6,10,0.5)" strokeWidth="2" />
                <path d="M 13.5 13.5 L 18 18" stroke="rgba(7,6,10,0.5)" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="font-mono text-sm tracking-[0.02em] text-ink md:text-base">
                {QUERY.slice(0, typed)}
              </span>
              <span className="h-5 w-[2px] bg-ink animate-blink-caret" />
            </div>

            {/* 검색 결과 — 스켈레톤이 솟아남 */}
            <div className="mt-7 space-y-5">
              {[0, 1, 2, 3].map((i) => (
                <ResultRow key={i} p={p} i={i} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* 질문 오버레이 */}
        <div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-3 px-[6vw] text-center">
          <motion.p
            style={{ opacity: q1o, y: q1y }}
            className="font-display font-bold leading-[1.3] text-balance-k text-[clamp(1.5rem,3.2vw,2.8rem)]"
          >
            그럼 &lsquo;인터넷&rsquo;을 잘 쓰면 어떨까.
          </motion.p>
          <motion.p
            style={{ opacity: q2o, y: q2y }}
            className="font-display font-black leading-[1.3] text-balance-k text-[clamp(1.7rem,3.8vw,3.4rem)]"
          >
            판례도, 법령도, 전부 검색할 수 있는데.
          </motion.p>
          <motion.p
            style={{ opacity: snarkO, y: snarkY, rotate: -1.5 }}
            className="mt-4 font-display text-[clamp(1rem,1.7vw,1.4rem)] italic text-ink/55"
          >
            …검색이야 하겠지.
          </motion.p>
        </div>
      </motion.div>

      {/* 거대 스탬프 — 그래도, 아니오. */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <StampVerdict
          p={p}
          appear={0.66}
          settle={0.73}
          windup={1.6}
          rotate={-5}
          text="그래도, 아니오."
          textClass="text-[clamp(2.6rem,6.8vw,6rem)]"
          sub="VERDICT — STILL NO."
          serial="EXHIBIT 02"
        />
      </div>

      {/* 캡션 */}
      <div className="absolute inset-x-0 bottom-[6vh] flex justify-center px-[6vw]">
        <motion.p
          style={{ opacity: capO, y: capY }}
          className="max-w-[920px] text-center font-mono text-[12px] leading-relaxed tracking-[0.04em] text-ink/60 text-balance-k md:text-sm"
        >
          인터넷은 정보를 줬다. 그러나 정보는 전문성이 아니다. 판례를 &lsquo;읽는
          것&rsquo;과 법정에서 &lsquo;이기는 것&rsquo;은 다른 세계다.
        </motion.p>
      </div>
    </div>
  );
}

/* ───────────────────────── 검색 결과 스켈레톤 행 ───────────────────────── */

function ResultRow({ p, i }: { p: MotionValue<number>; i: number }) {
  const t0 = 0.27 + i * 0.038;
  const o = useTransform(p, [t0, t0 + 0.05], [0, 1]);
  const y = useTransform(p, [t0, t0 + 0.05], [28, 0]);

  // 결정적 의사난수 폭 (%)
  const titleW = 44 + ((i * 37) % 34);
  const lineW = 68 + ((i * 53) % 26);

  return (
    <motion.div style={{ opacity: o, y }} className="relative pl-5">
      {/* 좌측 인덱스 틱 */}
      <span className="absolute left-0 top-0 font-mono text-[9px] tracking-[0.2em] text-ink/35">
        {String(i + 1).padStart(2, "0")}
      </span>
      {/* 링크 URL 라인 */}
      <div className="h-2 rounded-sm bg-ink/15" style={{ width: `${28 + ((i * 19) % 14)}%` }} />
      {/* 타이틀 바 */}
      <div className="mt-2 h-3.5 rounded-sm bg-ink/60" style={{ width: `${titleW}%` }} />
      {/* 스니펫 두 줄 */}
      <div className="mt-2.5 h-2.5 rounded-sm bg-ink/20" style={{ width: `${lineW}%` }} />
      <div className="mt-1.5 h-2.5 rounded-sm bg-ink/15" style={{ width: `${lineW - 17}%` }} />
    </motion.div>
  );
}

/* ───────────────────────── 도장 스탬프 (시리즈 공통 문법) ───────────────────────── */

function StampVerdict({
  p,
  appear,
  settle,
  text,
  sub,
  serial,
  textClass,
  rotate = -6,
  windup = 1.7,
}: {
  p: MotionValue<number>;
  appear: number;
  settle: number;
  text: string;
  sub: string;
  serial: string;
  textClass: string;
  rotate?: number;
  windup?: number;
}) {
  const o = useTransform(p, [appear, appear + 0.02], [0, 1]);
  const s = useTransform(p, [appear, settle], [windup, 1]);

  return (
    <motion.div style={{ opacity: o, scale: s, rotate }} className="relative">
      <div className="relative border-[6px] border-ember px-[clamp(2rem,5vw,4.5rem)] py-[clamp(1rem,2.4vw,2.2rem)]">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[7px] border-2 border-ember/55"
        />
        <span
          className={`block font-display font-black leading-none text-ember text-balance-k ${textClass}`}
        >
          {text}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-ember/75 md:text-[11px]">
        <span>{sub}</span>
        <span className="h-px w-6 bg-ember/50" />
        <span>{serial}</span>
      </div>
    </motion.div>
  );
}
