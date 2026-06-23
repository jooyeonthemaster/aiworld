"use client";

import { CSSProperties } from "react";
import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * N03 — 그래서 본질은? 코딩. (문과 충격 반전)  [ACT6]
 * 16:9 풀스크린 Pin 스테이지. 5비트 스크롤 연출.
 *   B0 리드 "자, 그래서 — 본질은 뭐냐?" 등장
 *   B1 메가 골드 "코딩." 글로우와 함께 쾅 → 리드는 위로 작아져 자막화
 *   B2 문과생 반응 말풍선(haze)이 결정적 좌표로 떠올라 부유 (공감 비트)
 *   B3 반전 진입 — 말풍선이 싹 걷히고(흩어짐) 세리프 반전 문장 점등
 *   B4 골드 펀치 "나도 — 법학을 전공했다." 점화
 * Pin render-prop 내부 hook 금지 → Stage/Bubble 보조 컴포넌트로 분리.
 */

/* ── 문과생 반응 말풍선: 결정적 좌표/타이밍 ((i*37)%89 류) ── */
type Bubble = {
  text: string;
  pos: CSSProperties;
  appear: number; // 등장 progress 지점
  drift: number; // 부유 진폭(px)
  rot: number; // 기울기(deg)
  scatterX: number; // 반전 시 흩어지는 방향(px)
  scatterY: number;
};

function pseudo(i: number, salt: number) {
  // 결정적 의사난수 0~1
  return (((i * 37 + salt * 53) % 89) / 89);
}

const RAW_BUBBLES: { text: string; pos: CSSProperties }[] = [
  { text: "ㅅㅂ 뭔 코딩이야?", pos: { left: "7vw", top: "20%" } },
  { text: "여기 마케터 양성 과정인데?", pos: { right: "6vw", top: "24%" } },
  { text: "난 문과라고!", pos: { left: "11vw", top: "70%" } },
  { text: "코딩은 이과나 하는 거 아냐?", pos: { right: "8vw", top: "72%" } },
];

const BUBBLES: Bubble[] = RAW_BUBBLES.map((b, i) => {
  const onRight = "right" in b.pos;
  const r1 = pseudo(i, 1); // drift
  const r2 = pseudo(i, 2); // rot 부호
  const r3 = pseudo(i, 3); // scatter 세기
  return {
    text: b.text,
    pos: b.pos,
    appear: 0.18 + i * 0.06,
    drift: 9 + Math.round(r1 * 9), // 9~18px
    rot: (r2 < 0.5 ? -1 : 1) * (1.6 + r2 * 2.4), // ±1.6~4.0deg
    scatterX: (onRight ? 1 : -1) * (40 + Math.round(r3 * 70)), // 바깥으로 흩어짐
    scatterY: -30 - Math.round(pseudo(i, 4) * 50),
  };
});

export default function N03Coding() {
  return (
    <section
      data-scene="n03"
      data-act="ACT 6 — 본질: 코드 에디터"
      className="relative bg-ink text-bone"
    >
      <Pin heights={5}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경: '코딩.' 점등에 맞춰 글로우가 차오름, 반전 비트에 한 번 더 ── */
  const glowO = useTransform(p, [0, 0.16, 0.34, 0.62, 1], [0.12, 0.5, 0.34, 0.46, 0.55]);
  const glowScale = useTransform(p, [0.12, 0.2], [0.7, 1]);
  const gridShift = useTransform(p, [0, 1], [0, -44]);

  /* ── B0 리드 ── */
  const leadO = useTransform(p, [0.02, 0.1], [0, 1]);
  const leadY = useTransform(p, [0.02, 0.12], [40, 0]);
  /* 리드는 '코딩.' 등장 후 위로 작아져 자막화 → 반전 진입 시 완전 퇴장(0) */
  const leadScale = useTransform(p, [0.12, 0.2], [1, 0.74]);
  const leadShift = useTransform(p, [0.12, 0.2], [0, -14]);
  /* leadDim 제거: 잔존 막던 0.5 영구 디밍 → 0까지 완전 퇴장 */
  const leadDim = useTransform(p, [0.02, 0.1, 0.56, 0.62], [0, 1, 1, 0]);

  /* ── B1 메가 '코딩.' — 쾅 등장 후 반전 비트에서 완전 퇴장(축소·상승·소멸) ── */
  const codeO = useTransform(p, [0.12, 0.18, 0.58, 0.64], [0, 1, 1, 0]);
  const codeScale = useTransform(p, [0.12, 0.19, 0.58, 0.66], [1.34, 1, 1, 0.66]);
  const codeY = useTransform(p, [0.12, 0.19, 0.58, 0.66], [22, 0, 0, -150]);
  const codeBlur = useTransform(p, [0.12, 0.18], [16, 0]);
  const codeFilter = useTransform(codeBlur, (b: number) => `blur(${b}px)`);
  const codeGlowO = useTransform(p, [0.12, 0.2, 0.58, 0.64], [0, 1, 1, 0]);
  const codeGlowScale = useTransform(p, [0.12, 0.2], [0.6, 1]);

  /* ── B3 반전 세리프 ── */
  const turnO = useTransform(p, [0.62, 0.72], [0, 1]);
  const turnY = useTransform(p, [0.62, 0.74], [34, 0]);
  /* 반전 문장은 펀치 점등 시 살짝 위로/디밍 */
  const turnShift = useTransform(p, [0.82, 0.9], [0, -10]);
  const turnDim = useTransform(p, [0.82, 0.9], [1, 0.7]);

  /* ── B4 골드 펀치 ── */
  const punchO = useTransform(p, [0.84, 0.92], [0, 1]);
  const punchY = useTransform(p, [0.84, 0.94], [30, 0]);
  const punchGlowO = useTransform(p, [0.84, 0.94], [0, 1]);

  /* 풋라인 */
  const footO = useTransform(p, [0.92, 0.98], [0, 1]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ── 배경 레이어 ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ scale: glowScale }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(50% 56% at 50% 46%, rgba(232,181,75,0.14), transparent 72%)" }}
          />
        </motion.div>
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
      {/* { } 워터마크 — 코드 모티프 */}
      <div
        aria-hidden
        className="text-stroke-gold pointer-events-none absolute -right-[2vw] bottom-[2vh] select-none font-mono text-[clamp(8rem,22vw,20rem)] font-bold leading-none opacity-[0.04]"
      >
        {"{ }"}
      </div>

      {/* ── 떠다니는 문과생 반응 말풍선 (B2 공감 비트) ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-20 hidden md:block">
        {BUBBLES.map((b, i) => (
          <ReactionBubble key={i} b={b} p={p} />
        ))}
      </div>

      {/* ── 콘텐츠: 중앙 압도 (content-center 로 단일 row 수직 중앙) ── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col content-center items-center justify-center px-[clamp(2.5rem,6vw,8rem)] py-[8vh] text-center">
        {/* 리드 */}
        <motion.div style={{ opacity: leadO, y: leadY, scale: leadScale }} className="origin-bottom">
          <Kicker className="justify-center">ACT 6 — 본질: 코드 에디터</Kicker>
          <motion.p
            style={{ y: leadShift, opacity: leadDim }}
            className="mt-7 font-display font-bold leading-[1.28] text-bone text-[clamp(1.6rem,3vw,3.1rem)]"
          >
            <span className="whitespace-nowrap">자, 그래서 — 본질은 뭐냐?</span>
          </motion.p>
        </motion.div>

        {/* 메가 '코딩.' */}
        <div className="relative mt-[clamp(1.5rem,4vh,3.5rem)] flex items-center justify-center">
          <motion.div
            aria-hidden
            style={{ opacity: codeGlowO, scale: codeGlowScale }}
            className="pointer-events-none absolute -inset-x-[18vw] -inset-y-[10vh] rounded-full"
          >
            <div
              className="h-full w-full"
              style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(232,181,75,0.28), transparent 70%)" }}
            />
          </motion.div>
          <motion.h2
            style={{ opacity: codeO, scale: codeScale, y: codeY, filter: codeFilter }}
            className="relative font-display font-black leading-[0.95] tracking-tight text-gold text-[clamp(5rem,17vw,17rem)] [text-shadow:0_0_70px_rgba(232,181,75,0.55),0_0_28px_rgba(255,211,122,0.4)]"
          >
            코딩.
          </motion.h2>
        </div>

        {/* 반전 세리프 — absolute inset-0 flex 로 독립 좌표계, 내부 gap 으로 간격(top-1/2+mt 충돌 제거) */}
        <motion.div
          style={{ opacity: turnO }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-[clamp(2rem,6vh,4.5rem)] px-[clamp(2.5rem,6vw,8rem)] text-center"
        >
          {/* 선행 요소 잔상을 확실히 가리는 ink 레이어 (부모 opacity:turnO 상속, 배경 글로우는 미세 투과) */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-ink/95" />

          <motion.p
            style={{ y: turnY }}
            className="mx-auto max-w-[1120px] font-display font-bold italic leading-[1.34] text-bone text-[clamp(2rem,4vw,4.2rem)]"
          >
            <motion.span style={{ y: turnShift, opacity: turnDim }} className="inline-block">
              <span className="whitespace-nowrap">코딩은, 더 이상</span>{" "}
              <span className="whitespace-nowrap">
                <span className="text-gold [text-shadow:0_0_34px_rgba(232,181,75,0.4)]">이과의 전유물</span>이 아니다.
              </span>
            </motion.span>
          </motion.p>

          {/* 골드 펀치 — 세리프 반전보다 한 단계 크게(위계차) */}
          <div className="relative flex items-center justify-center">
            <motion.div
              aria-hidden
              style={{ opacity: punchGlowO }}
              className="pointer-events-none absolute -inset-x-[14vw] -inset-y-[6vh] rounded-full"
            >
              <div
                className="animate-pulse-soft h-full w-full"
                style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(232,181,75,0.2), transparent 70%)" }}
              />
            </motion.div>
            <motion.p
              style={{ opacity: punchO, y: punchY }}
              className="relative font-display font-black leading-[1.16] text-gold text-[clamp(3rem,6.4vw,6.8rem)] [text-shadow:0_0_60px_rgba(232,181,75,0.5),0_0_22px_rgba(255,211,122,0.42)]"
            >
              <span className="whitespace-nowrap">나도 — 법학을 전공했다.</span>
            </motion.p>
          </div>
        </motion.div>

        {/* 풋라인 — 반전 ink 레이어(z-30) 위로 */}
        <motion.p
          style={{ opacity: footO }}
          className="absolute bottom-[7vh] left-1/2 z-40 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.3em] text-bone/40 md:text-[12px]"
        >
          {"// THE ESSENCE — CODING IS NO LONGER FOR ENGINEERS ONLY"}
        </motion.p>
      </div>
    </div>
  );
}

/* ───────────────────────── 반응 말풍선 (등장→부유→반전 시 흩어짐) ───────────────────────── */
function ReactionBubble({ b, p }: { b: Bubble; p: MotionValue<number> }) {
  /* 등장(B1 후반~B2) → 반전 진입(0.6~0.68)에 싹 걷힘 */
  const o = useTransform(p, [b.appear, b.appear + 0.06, 0.6, 0.67], [0, 1, 1, 0]);
  const enterY = useTransform(p, [b.appear, b.appear + 0.08], [26, 0]);
  /* 부유: progress 기반 결정적 사인 흔들림 (Math.random 금지) */
  const floatY = useTransform(p, (v: number) => {
    const t = (v - b.appear) * Math.PI * 4;
    return Math.sin(t) * b.drift;
  });
  const y = useTransform([enterY, floatY], ([e, f]: number[]) => e + f);
  /* 반전 시 바깥으로 흩어지며 사라짐 */
  const scatterX = useTransform(p, [0.6, 0.68], [0, b.scatterX]);
  const scatterY = useTransform(p, [0.6, 0.68], [0, b.scatterY]);
  const x = scatterX;
  const yWithScatter = useTransform([y, scatterY], ([yy, sc]: number[]) => yy + sc);
  const scale = useTransform(p, [b.appear, b.appear + 0.06, 0.6, 0.68], [0.84, 1, 1, 0.82]);

  return (
    <motion.div className="absolute" style={{ ...b.pos, opacity: o, x, y: yWithScatter, scale }}>
      <div
        style={{ rotate: `${b.rot}deg` }}
        className="relative rounded-2xl border border-haze/20 bg-coal/90 px-[clamp(1rem,1.3vw,1.5rem)] py-[clamp(0.6rem,0.9vw,1rem)] text-[clamp(0.95rem,1.25vw,1.4rem)] leading-relaxed text-haze shadow-[0_10px_36px_rgba(0,0,0,0.5)] backdrop-blur-sm"
      >
        {b.text}
        <span className="absolute -bottom-1.5 left-7 h-3 w-3 rotate-45 border-b border-r border-haze/20 bg-coal/90" />
      </div>
    </motion.div>
  );
}
