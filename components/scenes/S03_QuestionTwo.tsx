"use client";

import { motion } from "framer-motion";
import Starfield from "@/components/ui/Starfield";
import TextSplit from "@/components/ui/TextSplit";
import Reveal from "@/components/ui/Reveal";
import Kicker from "@/components/ui/Kicker";

/**
 * S03 — 두 번째 질문
 * 좌측 정렬 에디토리얼. 질문 등장과 함께 골드 수직선이 위→아래로 그어진다.
 * 프롤로그의 별빛이 낮은 밀도로 이어지고, 우측엔 거대한 물음표 고스트.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Scene03() {
  return (
    <section
      data-scene="s03"
      data-act="PROLOGUE — 두 가지 질문"
      className="relative min-h-screen overflow-hidden bg-ink text-bone"
    >
      {/* ---------- 배경: 잦아드는 별 + 좌측 골드 기운 ---------- */}
      <Starfield density={70} color="232,181,75" opacity={0.4} drift={0.04} />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[18vw] top-1/2 h-[80vh] w-[46vw] -translate-y-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(232,181,75,0.10), transparent 70%)",
        }}
      />

      {/* ---------- 우측 고스트 글리프: 거대한 물음표 ---------- */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 2.2, delay: 0.8, ease: EASE }}
        className="pointer-events-none absolute right-[2vw] top-1/2 -translate-y-1/2 select-none"
      >
        <motion.span
          animate={{ y: [0, -22, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="text-stroke-gold block font-display font-black leading-none opacity-[0.07] text-[clamp(16rem,36vw,40rem)]"
        >
          ?
        </motion.span>
      </motion.div>

      {/* ---------- 본문: 좌측 정렬 에디토리얼 ---------- */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] items-center px-[6vw] py-[16vh]">
        <div className="flex items-stretch gap-[clamp(1.6rem,4vw,3.6rem)]">
          {/* 골드 수직선 — 위에서 아래로 (scaleY) */}
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-25% 0px" }}
            transition={{ duration: 1.7, delay: 0.55, ease: EASE }}
            className="w-px origin-top self-stretch bg-gradient-to-b from-gold via-gold/55 to-gold/0"
            style={{ boxShadow: "0 0 24px rgba(232,181,75,0.35)" }}
          />

          <div className="max-w-[1100px]">
            <Reveal delay={0.05} y={16} duration={1}>
              <Kicker tone="gold" className="mb-[4vh]">
                Prologue — Question 02
              </Kicker>
            </Reveal>

            {/* 리드 */}
            <Reveal delay={0.2} y={24} blur duration={1.2}>
              <p className="text-balance-k leading-relaxed text-bone/60 text-[clamp(1.05rem,1.8vw,1.6rem)]">
                그 질문에 잠시 머뭇거렸다면 —
              </p>
            </Reveal>

            {/* 씬 타이틀 — 글자별 마스크 리빌, 2행 */}
            <h2 className="mt-[3.5vh] font-display font-bold leading-[1.18] text-[clamp(2.2rem,6vw,5.5rem)]">
              <SplitLine words={["AI가", "일으키는", "변화에,"]} base={0.55} />
              <SplitLine
                words={["얼마나", "민감하게", "반응하고", "있습니까."]}
                base={1.2}
                goldWord={1}
                className="mt-[0.18em]"
              />
            </h2>

            {/* 마무리 모노 캡션 */}
            <Reveal delay={2.3} y={20} duration={1.1}>
              <p className="text-balance-k mt-[7vh] flex max-w-[760px] items-start gap-4 font-mono text-xs leading-relaxed tracking-[0.08em] text-bone/45 md:text-[13px]">
                <span className="mt-2 h-px w-10 shrink-0 bg-gold/50" />
                <span>
                  오늘, 이 두 가지 질문을 계속해서 던질 겁니다. 끝까지 자신에게
                  물으며 내려가십시오.
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ---------- 우하단 마이크로 라벨 ---------- */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 1.6, ease: EASE }}
        className="absolute bottom-7 right-[6vw] z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/30"
      >
        S.03 — Two Questions / End of Prologue
      </motion.p>

      {/* ---------- 하단 미세 그라디언트 — 다음 액트(다큐)로 가라앉음 ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[18vh] bg-gradient-to-b from-transparent to-ink"
      />
    </section>
  );
}

/* ====================================================================== */
/* 한 행을 단어 단위 TextSplit 으로 조립 — 글자 수 누적으로 딜레이 연결        */
/* (TextSplit 내부 공백 폭 붕괴를 피하기 위해 단어별로 분리하고 gap 으로 띄움) */
/* ====================================================================== */
function SplitLine({
  words,
  base,
  stagger = 0.05,
  gap = 0.06,
  goldWord,
  className = "",
}: {
  words: string[];
  base: number;
  stagger?: number;
  gap?: number;
  goldWord?: number;
  className?: string;
}) {
  let acc = base;
  return (
    <span className={`flex flex-wrap gap-x-[0.26em] ${className}`}>
      {words.map((w, i) => {
        const delay = acc;
        acc += Array.from(w).length * stagger + gap;
        return (
          <TextSplit
            key={i}
            text={w}
            per="char"
            stagger={stagger}
            delay={delay}
            duration={1.1}
            className={
              goldWord === i
                ? "text-gold [text-shadow:0_0_36px_rgba(232,181,75,0.35)]"
                : undefined
            }
          />
        );
      })}
    </span>
  );
}
