"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * N01 — 내가 직원에게 하는 말 (경쟁)  [ACT 6 · 본질 — 코드 에디터]
 * 인용형 선언. 김주연이 직원에게 하는 실제 멘트.
 * 16:9 중앙 압도 메가 세리프. [개발] 자리의 직군 단어가 스크롤 연동으로 슬롯 교체
 * (개발→마케팅→기획→디자인→…) → 골드 반전("AI를 가장 잘 다루는 사람") → 모노 마무리.
 */

/* [개발] 슬롯에 차례로 박히는 직군 단어 (개발→마케팅→기획→디자인→…). 슬롯 폭은 스페이서로 확보 */
const ROLES = ["개발", "마케팅", "기획", "디자인", "영업", "무엇이든"];

export default function N01Compete() {
  return (
    <section
      data-scene="n01"
      data-act="ACT 6 — 본질: 코드 에디터"
      className="relative bg-ink text-bone"
    >
      <Pin heights={5}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 — 스크롤에 미세 반응 ── */
  const glowO = useTransform(p, [0, 0.5, 0.78, 1], [0.16, 0.34, 0.6, 0.66]);
  const gridShift = useTransform(p, [0, 1], [0, -44]);
  const markO = useTransform(p, [0, 0.6, 1], [0.04, 0.055, 0.07]);

  /* 비트 1 — 킥커 + 인용 1행("난 네가 대한민국에서 [슬롯]을…") */
  const headO = useTransform(p, [0.02, 0.12], [0, 1]);
  const headY = useTransform(p, [0.02, 0.16], [40, 0]);

  /* 비트 2 — "그렇게 될 거라고도 생각 안 해." */
  const line2O = useTransform(p, [0.4, 0.5], [0, 1]);
  const line2Y = useTransform(p, [0.4, 0.52], [26, 0]);

  /* 비트 3 — 골드 반전 */
  const turnO = useTransform(p, [0.54, 0.66], [0, 1]);
  const turnY = useTransform(p, [0.54, 0.68], [34, 0]);

  /* 인용 1행은 반전이 떠오를 때 살짝 물러난다(카메라 포커스 이동) */
  const quoteDim = useTransform(p, [0.54, 0.66], [1, 0.32]);
  const quoteScale = useTransform(p, [0.54, 0.66], [1, 0.965]);

  /* 비트 4 — 보조(모든 분야 동일) */
  const subO = useTransform(p, [0.78, 0.87], [0, 1]);
  const subY = useTransform(p, [0.78, 0.89], [22, 0]);

  /* 비트 5 — 모노 마무리 */
  const footO = useTransform(p, [0.9, 0.97], [0, 1]);
  const footY = useTransform(p, [0.9, 0.99], [18, 0]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ── 배경 레이어 ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(54% 60% at 50% 48%, rgba(232,181,75,0.12), transparent 72%)" }}
        />
        <div
          className="animate-pulse-soft absolute left-1/2 top-1/2 h-[58vh] w-[58vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
          style={{ background: "radial-gradient(circle, rgba(255,211,122,0.09), transparent 70%)" }}
        />
      </motion.div>
      <motion.div aria-hidden style={{ y: gridShift }} className="pointer-events-none absolute inset-[-10%] opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,237,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,227,0.5) 1px, transparent 1px)",
            backgroundSize: "76px 76px",
            maskImage: "radial-gradient(78% 78% at 50% 50%, black, transparent 100%)",
          }}
        />
      </motion.div>
      {/* 거대 인용부호 워터마크 */}
      <motion.div
        aria-hidden
        style={{ opacity: markO }}
        className="pointer-events-none absolute -left-[1vw] top-[1vh] select-none font-display font-black leading-none text-gold text-[clamp(14rem,30vw,32rem)]"
      >
        &ldquo;
      </motion.div>

      {/* ── 콘텐츠 — 선언형, 단일 컬럼 수직 중앙 압도 ── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col content-center items-center justify-center gap-[clamp(2rem,5.5vh,5rem)] px-[clamp(2.5rem,6vw,8rem)] py-[4vh] text-center">
        {/* 킥커 */}
        <motion.div style={{ opacity: headO, y: headY }}>
          <Kicker className="justify-center">ACT 6 — 본질 / 내가 직원들에게 하는 말</Kicker>
        </motion.div>

        {/* 인용 1행 + 2행 (슬롯 교체) */}
        <motion.div style={{ opacity: quoteDim, scale: quoteScale }} className="flex flex-col items-center gap-[clamp(0.6rem,1.4vh,1.4rem)]">
          <motion.div
            style={{ opacity: headO, y: headY }}
            className="font-display font-bold leading-[1.28] text-bone text-[clamp(1.9rem,4.3vw,4.6rem)]"
          >
            <p className="whitespace-nowrap">
              난 네가 대한민국에서{" "}
              <RoleSlot p={p} />{" "}
              <span>가장 잘하는 사람이라고</span>
            </p>
            <p className="whitespace-nowrap">생각하지 않아.</p>
          </motion.div>

          <motion.p
            style={{ opacity: line2O, y: line2Y }}
            className="whitespace-nowrap font-display font-bold leading-[1.3] text-bone/80 text-[clamp(1.4rem,2.9vw,3rem)]"
          >
            그렇게 될 거라고도 생각 안 해.
          </motion.p>
        </motion.div>

        {/* 골드 반전 */}
        <motion.div
          style={{ opacity: turnO, y: turnY }}
          className="relative max-w-[1320px] font-display font-bold leading-[1.26] text-bone text-[clamp(2.2rem,4.6vw,4.9rem)]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(50% 60% at 50% 50%, rgba(232,181,75,0.14), transparent 72%)" }}
          />
          <p>
            <span className="text-bone/55 text-[0.82em]">그런데 — 나랑 일하면,</span>
          </p>
          <p className="mt-[0.5em] whitespace-nowrap">너는 대한민국에서</p>
          <p className="mt-[0.34em] whitespace-nowrap">
            <span className="relative text-gold [text-shadow:0_0_46px_rgba(232,181,75,0.5)]">
              &apos;AI를 가장 잘 다루는 사람&apos;은
            </span>{" "}
            <span className="text-bone">될 수 있어.</span>
          </p>
        </motion.div>

        {/* 보조 — 모든 분야 동일 */}
        <motion.p
          style={{ opacity: subO, y: subY }}
          className="max-w-[1180px] text-balance-k font-body leading-[1.55] text-bone/65 text-[clamp(1.05rem,1.7vw,1.7rem)]"
        >
          <span className="whitespace-nowrap">개발자에게도, 마케터에게도, 기획자에게도 —</span>{" "}
          <span className="whitespace-nowrap text-bone/85">모든 분야에서, 똑같이 말한다.</span>
        </motion.p>

        {/* 모노 마무리 */}
        <motion.div
          style={{ opacity: footO, y: footY }}
          className="mt-[clamp(0.4rem,1.6vh,1.4rem)] flex flex-col items-center gap-3"
        >
          <span className="h-px w-[clamp(80px,12vw,180px)] bg-gradient-to-r from-transparent via-gold/45 to-transparent" />
          <p className="font-mono leading-[1.55] tracking-[0.06em] text-bone/55 text-[clamp(0.95rem,1.5vw,1.5rem)]">
            <span className="text-bone/80">{"// "}결국, 경쟁 사회다.</span>{" "}
            <span className="whitespace-nowrap">남들이 다 쓰는 걸 똑같이 써서는 —</span>{" "}
            <span className="whitespace-nowrap text-gold/90">이길 수 없다.</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ───────────────────────── [개발] 슬롯 — 스크롤 연동 직군 교체 ───────────────────────── */
function RoleSlot({ p }: { p: MotionValue<number> }) {
  return (
    <span className="relative inline-block whitespace-nowrap align-baseline text-center">
      {/* 베이스라인/높이 확보용 투명 스페이서 (슬롯이 본문 줄에 정렬되도록) */}
      <span aria-hidden className="invisible font-display font-black">[무엇이든]을</span>
      {/* 슬롯 밑줄 강조 — 활성 단어(중앙 정렬) 폭에 맞춰 좁게 */}
      <span
        aria-hidden
        className="absolute inset-x-[18%] bottom-[0.06em] h-[3px] rounded-full bg-gold/35"
      />
      {ROLES.map((role, i) => (
        <RoleWord key={role} p={p} index={i} role={role} />
      ))}
    </span>
  );
}

function RoleWord({ p, index, role }: { p: MotionValue<number>; index: number; role: string }) {
  /* 슬롯 교체는 비트1 구간(0.12~0.40) 안에서 순차로 — 마지막 직군이 골드로 고정 */
  const span = 0.28;
  const start = 0.12;
  const isLast = index === ROLES.length - 1;
  const step = span / ROLES.length;
  const a = start + index * step;
  /* 등장 → 다음 단어가 들어올 때 퇴장. 단 마지막 단어는 퇴장 구간을 1을 넘겨 잡아 영구 고정 */
  const inEnd = a + step * 0.45;
  const outStart = isLast ? 1.6 : a + step * 0.85;
  const outEnd = isLast ? 1.9 : a + step * 1.25;

  /* hook 은 분기 없이 항상 동일 형태로 호출(조건부 hook 금지) */
  const o = useTransform(p, [a, inEnd, outStart, outEnd], [0, 1, 1, 0]);
  const y = useTransform(p, [a, inEnd, outStart, outEnd], [16, 0, 0, -14]);

  return (
    <motion.span
      style={{ opacity: o, y }}
      className={`absolute inset-0 flex items-baseline justify-center whitespace-nowrap font-display font-black ${
        isLast ? "text-gold [text-shadow:0_0_40px_rgba(232,181,75,0.5)]" : "text-bone"
      }`}
    >
      <span className="text-[0.62em] font-bold text-bone/40">{"["}</span>
      <span className="px-[0.12em]">{role}</span>
      <span className="text-[0.62em] font-bold text-bone/40">{"]"}</span>
      <span className="ml-[0.06em] font-bold text-bone/70 text-[0.7em]">을</span>
    </motion.span>
  );
}
