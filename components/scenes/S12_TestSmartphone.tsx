"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

export default function Scene12() {
  return (
    <section
      data-scene="s12"
      data-act="ACT 2 — 다른 종류의 발명"
      className="relative overflow-x-clip bg-bone text-ink"
    >
      <Pin heights={3}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

/* ───────────────────────── 핀 스테이지 ───────────────────────── */

function Stage({ p }: { p: MotionValue<number> }) {
  // 킥커 — 결론부에서 함께 퇴장
  const kickerO = useTransform(p, [0.01, 0.06, 0.48, 0.56], [0, 1, 1, 0]);
  const kickerY = useTransform(p, [0.01, 0.06], [16, 0]);

  // 스마트폰 — 등장 → 질문 시 디밍 → 결론부 퇴장
  const phoneO = useTransform(p, [0.03, 0.12, 0.16, 0.24, 0.48, 0.56], [0, 1, 1, 0.28, 0.28, 0]);
  const phoneY = useTransform(p, [0.03, 0.12, 0.48, 0.56], [80, 0, 0, -50]);
  const phoneS = useTransform(p, [0.48, 0.56], [1, 0.94]);

  // 질문 두 줄 — 스탬프 임팩트에 디밍, 결론부 퇴장
  const q1o = useTransform(p, [0.15, 0.22, 0.36, 0.41, 0.48, 0.55], [0, 1, 1, 0.22, 0.22, 0]);
  const q1y = useTransform(p, [0.15, 0.22], [30, 0]);
  const q2o = useTransform(p, [0.23, 0.3, 0.36, 0.41, 0.48, 0.55], [0, 1, 1, 0.22, 0.22, 0]);
  const q2y = useTransform(p, [0.23, 0.3], [30, 0]);
  const qExitY = useTransform(p, [0.48, 0.56], [0, -40]);

  // 세 번째 스탬프 — 더 빠르고 건조하게, 결론부에서 퇴장
  const stampO = useTransform(p, [0.36, 0.372, 0.48, 0.55], [0, 1, 1, 0]);
  const stampS = useTransform(p, [0.36, 0.39], [1.3, 1]);
  const shakeY = useTransform(p, [0.36, 0.375, 0.39, 0.405], [0, -2, 1, 0]);
  const flashO = useTransform(p, [0.36, 0.375, 0.42], [0, 0.1, 0]);

  // 정리 선언 — 화면을 가득 채우는 타이포
  const c1o = useTransform(p, [0.58, 0.66], [0, 1]);
  const c1y = useTransform(p, [0.58, 0.66], [44, 0]);
  const c2o = useTransform(p, [0.68, 0.78], [0, 1]);
  const c2y = useTransform(p, [0.68, 0.78], [44, 0]);

  // 결론부 무게 — 화면 가장자리가 미세하게 어두워짐
  const vignetteO = useTransform(p, [0.56, 0.74], [0, 0.07]);

  // 마감 모노 태그
  const tagO = useTransform(p, [0.82, 0.9], [0, 1]);

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
      {/* 결론부 비네트 */}
      <motion.div
        aria-hidden
        style={{
          opacity: vignetteO,
          background:
            "radial-gradient(ellipse at center, transparent 48%, rgba(7,6,10,0.9) 100%)",
        }}
        className="pointer-events-none absolute inset-0"
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
          <Kicker tone="ink">위대한 발명 No.3 — 스마트폰 (2007)</Kicker>
        </motion.div>
      </div>

      {/* 쉐이크 컨테이너 — 폰 + 질문 + 스탬프 */}
      <motion.div
        style={{ y: shakeY }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* CSS 스마트폰 */}
        <motion.div style={{ opacity: phoneO, y: phoneY, scale: phoneS }}>
          <Phone />
        </motion.div>

        {/* 질문 오버레이 */}
        <motion.div
          style={{ y: qExitY }}
          className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-3 px-[6vw] text-center"
        >
          <motion.p
            style={{ opacity: q1o, y: q1y }}
            className="font-display font-bold leading-[1.3] text-balance-k text-[clamp(1.5rem,3.2vw,2.8rem)]"
          >
            &lsquo;스마트폰&rsquo;을 잘 쓰면,
          </motion.p>
          <motion.p
            style={{ opacity: q2o, y: q2y }}
            className="font-display font-black leading-[1.3] text-balance-k text-[clamp(1.7rem,3.8vw,3.4rem)]"
          >
            외과의사보다 수술을 잘할 수 있을까?
          </motion.p>
        </motion.div>

        {/* 거대 스탬프 — 이미 답을 아는 리듬 */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <motion.div style={{ opacity: stampO, scale: stampS, rotate: -4 }}>
            <div className="relative border-[6px] border-ember px-[clamp(2rem,5vw,4.5rem)] py-[clamp(1rem,2.4vw,2.2rem)]">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-[7px] border-2 border-ember/55"
              />
              <span className="block font-display font-black leading-none text-ember text-balance-k text-[clamp(3.4rem,9vw,8rem)]">
                아니오.
              </span>
            </div>
            <div className="mt-4 flex items-center justify-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-ember/75 md:text-[11px]">
              <span>VERDICT — NO. AGAIN.</span>
              <span className="h-px w-6 bg-ember/50" />
              <span>EXHIBIT 03</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 정리 선언 — 이 액트의 중간 결론 */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-[5vh] px-[6vw] text-center">
        <motion.h2
          style={{ opacity: c1o, y: c1y }}
          className="font-display font-black leading-[1.15] text-balance-k text-[clamp(2rem,5.4vw,4.8rem)]"
        >
          지금까지 모든 위대한 발명이 그랬다.
        </motion.h2>
        <motion.p
          style={{ opacity: c2o, y: c2y }}
          className="max-w-[1100px] font-display font-bold leading-[1.35] text-balance-k text-[clamp(1.5rem,3.4vw,3.2rem)]"
        >
          세상을 바꿨지만 — 당신이라는 인간의{" "}
          <span className="relative inline-block text-ember">
            &lsquo;능력&rsquo;
            <span aria-hidden className="absolute -bottom-[0.08em] left-0 h-[3px] w-full bg-ember/60" />
          </span>{" "}
          그 자체는, 결코 건드리지 못했다.
        </motion.p>
      </div>

      {/* 마감 모노 태그 */}
      <div className="absolute inset-x-0 bottom-[6vh] flex justify-center">
        <motion.span
          style={{ opacity: tagO }}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/40 md:text-[11px]"
        >
          EXHIBITS CLOSED — 3 OF 3
        </motion.span>
      </div>
    </div>
  );
}

/* ───────────────────────── CSS 스마트폰 ───────────────────────── */

function Phone() {
  return (
    <div className="relative w-[clamp(210px,23vmin,270px)] -translate-y-[2vh] rounded-[2.8rem] border-[6px] border-ink bg-gradient-to-b from-[#1B1722] to-[#0C0A10] p-4 pt-9 shadow-[0_40px_90px_rgba(7,6,10,0.3)]"
      style={{ aspectRatio: "9 / 19" }}
    >
      {/* 노치 */}
      <span className="absolute left-1/2 top-2.5 h-[18px] w-[88px] -translate-x-1/2 rounded-full bg-ink" />

      {/* 상태 바 */}
      <div className="flex items-center justify-between px-1.5 font-mono text-[9px] tracking-[0.12em] text-bone/45">
        <span>9:41</span>
        <span className="flex items-end gap-[2px]">
          <span className="h-[4px] w-[2.5px] bg-bone/45" />
          <span className="h-[6px] w-[2.5px] bg-bone/45" />
          <span className="h-[8px] w-[2.5px] bg-bone/45" />
          <span className="h-[10px] w-[2.5px] bg-bone/25" />
        </span>
      </div>

      {/* 앱 그리드 — 결정적 의사난수 컬러 */}
      <div className="mt-4 grid grid-cols-4 gap-2.5 px-1">
        {Array.from({ length: 20 }, (_, i) => {
          const h = (i * 37) % 89;
          const tone =
            h < 16
              ? "bg-gold/75"
              : h < 42
                ? "bg-bone/25"
                : "bg-bone/10";
          return (
            <span
              key={i}
              className={`aspect-square rounded-[0.7rem] ${tone}`}
            />
          );
        })}
      </div>

      {/* 독 */}
      <div className="absolute inset-x-3 bottom-3 rounded-[1.4rem] bg-bone/[0.07] p-2.5">
        <div className="grid grid-cols-4 gap-2.5">
          {Array.from({ length: 4 }, (_, i) => (
            <span
              key={i}
              className={`aspect-square rounded-[0.7rem] ${i === 2 ? "bg-gold/70" : "bg-bone/20"}`}
            />
          ))}
        </div>
      </div>

      {/* 화면 반사 하이라이트 */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[2.4rem]"
        style={{
          background:
            "linear-gradient(118deg, rgba(242,237,227,0.1) 0%, transparent 28%)",
        }}
      />
    </div>
  );
}
