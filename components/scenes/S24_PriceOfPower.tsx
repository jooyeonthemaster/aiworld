"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Counter from "@/components/ui/Counter";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/ui/Reveal";
import TextSplit from "@/components/ui/TextSplit";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Scene24() {
  return (
    <section
      data-scene="s24"
      data-act="ACT 4 — 어떤 회사 이야기"
      className="relative overflow-hidden bg-ink text-bone"
    >
      {/* ===== 배경 레이어 ===== */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* 초거대 ₩ 워터마크 */}
        <motion.div
          className="absolute -right-[8vw] top-[6vh] select-none font-mono font-bold leading-none text-[42vw] text-bone/[0.025]"
          initial={{ opacity: 0, rotate: 4 }}
          whileInView={{ opacity: 1, rotate: 8 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 2.4, ease: EASE }}
        >
          ₩
        </motion.div>
        {/* 중앙 골드 글로우 */}
        <div
          className="absolute left-1/2 top-[30%] h-[80vh] w-[120vw] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(232,181,75,0.07) 0%, transparent 70%)",
          }}
        />
        {/* 가는 수직 눈금 — 가격표/영수증 느낌 */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(242,237,227,0.03) 1px, transparent 1px)",
            backgroundSize: "120px 100%",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[30vh]"
          style={{ background: "linear-gradient(to top, rgba(7,6,10,0.95), transparent)" }}
        />
      </div>

      {/* 도시에 헤더 스트립 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-[6vw] pt-7 font-mono text-[10px] tracking-[0.3em] text-bone/30 uppercase"
      >
        <span>Price Sheet — Fable Access</span>
        <span className="hidden md:inline">Unit: KRW</span>
      </div>

      {/* ===== 콘텐츠 ===== */}
      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col items-center px-[6vw] py-[18vh] text-center">
        <Reveal>
          <Kicker>ACT 4 — 힘의 가격표</Kicker>
        </Reveal>

        {/* ===== 카운터 1 — 질문 한 번 ===== */}
        <Reveal y={50} blur className="mt-[12vh]">
          <p className="font-mono text-[clamp(0.95rem,1.6vw,1.4rem)] tracking-[0.15em] text-bone/60">
            질문 한 번 ≈
          </p>
          <div className="mt-5 font-mono font-bold leading-none tracking-[-0.03em] text-[clamp(3.2rem,9vw,8rem)] text-bone">
            <Counter to={1000} prefix="₩" duration={1.6} />
          </div>
          <p className="mt-5 font-mono text-[10px] tracking-[0.4em] uppercase text-bone/30">
            Est. Cost — Per Query
          </p>
        </Reveal>

        {/* 구분 눈금 */}
        <TickDivider />

        {/* ===== 카운터 2 — 제대로 쓰는 한 달 (압도) ===== */}
        <Reveal y={60} blur className="relative">
          <p className="font-mono text-[clamp(0.95rem,1.6vw,1.4rem)] tracking-[0.15em] text-bone/60">
            제대로 쓰는 한 달 ≈
          </p>
          <div
            className="mt-6 font-mono font-bold leading-none tracking-[-0.04em] text-[clamp(4rem,14vw,13rem)] text-gold"
            style={{ textShadow: "0 0 70px rgba(232,181,75,0.35), 0 0 24px rgba(232,181,75,0.2)" }}
          >
            <Counter to={1000000} prefix="₩" duration={2.6} />
          </div>
          <p className="mt-6 font-mono text-[10px] tracking-[0.4em] uppercase text-gold/50">
            Est. Cost — Per Month / Full Power
          </p>
        </Reveal>

        {/* ===== 반응 — haze, 비스듬히, 스크롤에 구겨지듯 소멸 ===== */}
        <Crumple className="mt-[20vh]">
          <p className="font-display italic font-semibold leading-[1.4] text-[clamp(1.6rem,4vw,3.4rem)] text-haze text-balance-k">
            &ldquo;미쳤네. 그 돈 주고 누가 써?&rdquo;
          </p>
        </Crumple>

        {/* ===== 반전 ===== */}
        <div className="mt-[18vh] max-w-5xl">
          <h2 className="font-display font-bold leading-[1.3] text-[clamp(1.9rem,4.6vw,4rem)] text-balance-k">
            <TextSplit text="그런데 — 이미 쓰는 사람들은, 가격표를 보지 않는다." per="char" stagger={0.03} />
          </h2>
        </div>

        {/* ===== 핵심 — 골드 강조 ===== */}
        <Reveal y={50} blur delay={0.2} className="mt-[12vh] max-w-5xl">
          <p className="font-display font-black leading-[1.3] text-[clamp(2.2rem,5.5vw,4.8rem)] text-balance-k">
            그들이 사는 건 토큰이 아니라,{" "}
            <span
              className="text-gold"
              style={{ textShadow: "0 0 46px rgba(232,181,75,0.35)" }}
            >
              시간과 격차
            </span>
            다.
          </p>
        </Reveal>

        {/* ===== 마무리 질문 ===== */}
        <Reveal delay={0.3} blur className="mt-[14vh] max-w-3xl">
          <div className="flex flex-col items-center gap-7">
            <span aria-hidden className="h-10 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
            <p className="text-[clamp(1.05rem,1.9vw,1.65rem)] leading-relaxed text-bone/70 text-balance-k">
              월 백만 원으로 변호사·개발자·애널리스트를 동시에 고용할 수 있다면 — 그것이 정말, 비싼가?
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   TickDivider — 두 가격 사이의 영수증 눈금 장식
   ============================================================ */
function TickDivider() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} aria-hidden className="my-[12vh] flex items-center gap-2.5">
      {Array.from({ length: 11 }).map((_, i) => {
        const tall = i % 5 === 0;
        return (
          <motion.span
            key={i}
            className={`w-px bg-bone/25 ${tall ? "h-5" : "h-2.5"}`}
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
          />
        );
      })}
    </div>
  );
}

/* ============================================================
   Crumple — 스크롤 진행에 따라 등장했다가
   구겨지듯(blur + scale + rotate) 사라지는 블록
   ============================================================ */
function Crumple({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.08"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.28, 0.62, 1], [0, 1, 1, 0]);
  const filter = useTransform(
    scrollYProgress,
    [0, 0.28, 0.62, 1],
    ["blur(10px)", "blur(0px)", "blur(0px)", "blur(18px)"]
  );
  const scale = useTransform(scrollYProgress, [0, 0.28, 0.62, 1], [0.95, 1, 1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 0.62, 1], [-2.5, -2.5, -8]);
  const y = useTransform(scrollYProgress, [0, 0.28, 0.62, 1], [36, 0, 0, -44]);

  return (
    <motion.div ref={ref} style={{ opacity, filter, scale, rotate, y }} className={className}>
      {children}
    </motion.div>
  );
}
