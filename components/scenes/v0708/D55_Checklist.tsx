"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * D55 — 최종 체크리스트 (8항목)  [마무리 · 완성]
 * kind=선언/정보 → TutorialScene 미사용. 독립 선언형 Pin 씬(N06/N07 패턴).
 * 16:9 2단: 좌측 메가 카피("여기까지 다 켜졌다면 — 완성.") + 우측 2열 체크리스트 그리드.
 * 스크롤하면 8개 항목의 골드 체크가 순차 점등 → 마지막에 '완성' 도장이 차오른다.
 */

type Item = { no: string; label: string; detail: string };
const ITEMS: Item[] = [
  { no: "01", label: "VS Code 설치", detail: "code.visualstudio.com" },
  { no: "02", label: "한국어 언어팩", detail: "Korean Language Pack" },
  { no: "03", label: "폴더 열기", detail: "파일 → 폴더 열기" },
  { no: "04", label: "Node.js 설치", detail: "node -v 로 버전 확인" },
  { no: "05", label: "Cline + 필수 확장", detail: "Prettier · Live Server" },
  { no: "06", label: "API 키 입력", detail: "Cline 설정에 붙여넣기" },
  { no: "07", label: "Git / GitHub", detail: "커밋 → 푸시 연결" },
  { no: "08", label: "Vercel 첫 배포", detail: "vercel --prod" },
];

export default function D55Checklist() {
  return (
    <section data-scene="d55" data-act="마무리 · 완성" className="relative bg-ink text-bone">
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.36, 0.52]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  /* ── 좌측 카피 ── */
  const kickO = useTransform(p, [0.02, 0.1], [0, 1]);
  const leadO = useTransform(p, [0.05, 0.16], [0, 1]);
  const leadY = useTransform(p, [0.05, 0.18], [42, 0]);

  /* ── 진행 카운터 (0 → 8, 체크 점등에 맞춤) ── */
  const countN = useTransform(p, [0.2, 0.78], [0, 8]);
  const countT = useTransform(countN, (n: number) => Math.min(8, Math.round(n)).toString());
  const barW = useTransform(p, [0.2, 0.78], ["0%", "100%"]);
  const barGlow = useTransform(p, [0.68, 0.82], [0, 1]);

  /* ── 완성 도장 ── (8/8 캡처 프레임에서 보이도록 진행바 직후로 당김) */
  const doneO = useTransform(p, [0.7, 0.8], [0, 1]);
  const doneY = useTransform(p, [0.7, 0.82], [30, 0]);
  const doneGlow = useTransform(p, [0.76, 0.92], [0, 0.5]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(54% 58% at 38% 44%, rgba(232,181,75,0.12), transparent 72%)" }}
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

      {/* ── 콘텐츠: 2단 (content-center 로 단일 row 수직 중앙) ── */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 content-center items-center gap-[clamp(2rem,5vw,5.5rem)] px-[clamp(2.5rem,6vw,8rem)] py-[7vh] lg:grid-cols-[0.86fr_1.14fr]">
        {/* ── 좌측: 메가 카피 + 진행 게이지 (우측 그리드 높이와 균형 — 풀높이 분산) ── */}
        <div className="flex h-full flex-col justify-between py-[clamp(1rem,2.5vh,3rem)]">
          {/* 상단 블록: 킥커 + 메가 헤드라인 */}
          <div>
            <motion.div style={{ opacity: kickO }}>
              <Kicker>마무리 · 완성 / FINAL CHECK</Kicker>
            </motion.div>

            <motion.h2
              style={{ opacity: leadO, y: leadY }}
              className="mt-9 font-display font-black leading-[1.22] text-bone text-[clamp(2rem,4vw,4.2rem)]"
            >
              여기까지 다 켜졌다면
              <br />
              <span className="whitespace-nowrap">
                — <span className="text-gold [text-shadow:0_0_38px_rgba(232,181,75,0.45)]">완성.</span>
              </span>
            </motion.h2>
          </div>

          {/* 하단 블록: 진행 게이지 + 완성 도장 (좌측 컬럼 하단까지 채움) */}
          <div className="mt-[clamp(2.4rem,6vh,4.4rem)]">
          {/* 진행 게이지 — 8개 중 몇 개 켜졌나 */}
          <motion.div style={{ opacity: leadO }} className="w-full max-w-[460px]">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/60 md:text-xs">완료한 항목</span>
              <span className="flex items-baseline gap-1">
                <motion.span
                  className="font-display font-black leading-none tabular-nums text-gold text-[clamp(2.2rem,3.8vw,3.4rem)]"
                  style={{ textShadow: "0 0 40px rgba(232,181,75,0.45)" }}
                >
                  {countT}
                </motion.span>
                <span className="font-display font-bold leading-none text-bone/50 text-[clamp(1.2rem,1.8vw,1.6rem)]">/ 8</span>
              </span>
            </div>
            <div className="relative mt-4 h-[clamp(10px,1.1vw,15px)] w-full overflow-hidden rounded-full border border-bone/12 bg-bone/[0.04]">
              <motion.div
                style={{ width: barW }}
                className="relative h-full rounded-full bg-gradient-to-r from-gold/55 via-gold to-gold-bright"
              >
                <motion.div aria-hidden style={{ opacity: barGlow }} className="absolute inset-0 rounded-full">
                  <div className="h-full w-full rounded-full" style={{ boxShadow: "0 0 26px rgba(232,181,75,0.65)" }} />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* 완성 도장 — 마지막에 차오름 */}
          <motion.div style={{ opacity: doneO, y: doneY }} className="relative mt-[clamp(2.2rem,5vh,3.6rem)]">
            <motion.div
              aria-hidden
              style={{ opacity: doneGlow }}
              className="pointer-events-none absolute -inset-x-7 -inset-y-5 rounded-3xl"
            >
              <div
                className="h-full w-full"
                style={{ background: "radial-gradient(60% 70% at 26% 50%, rgba(232,181,75,0.16), transparent 72%)" }}
              />
            </motion.div>
            <p className="relative flex items-center gap-3.5 font-display font-bold leading-tight text-bone text-[clamp(1.3rem,2.1vw,2rem)]">
              <span className="flex h-[clamp(2.2rem,2.8vw,3rem)] w-[clamp(2.2rem,2.8vw,3rem)] shrink-0 items-center justify-center rounded-full border border-gold/55 bg-gold/12 text-gold [text-shadow:0_0_22px_rgba(232,181,75,0.5)]">
                <CheckMark className="h-[52%] w-[52%]" />
              </span>
              <span>
                8가지, 전부 <span className="text-gold">초록불.</span>
              </span>
            </p>
          </motion.div>
          </div>
        </div>

        {/* ── 우측: 2열 체크리스트 그리드 ── */}
        <div className="grid w-full grid-cols-1 gap-[clamp(0.7rem,1vw,1.1rem)] sm:grid-cols-2">
          {ITEMS.map((it, i) => (
            <CheckRow key={it.no} item={it} index={i} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── 체크 항목 행 (순차 점등) ───────────────────────── */
function CheckRow({ item, index, p }: { item: Item; index: number; p: MotionValue<number> }) {
  /* 8개를 0.2~0.78 구간에 고르게 분배 */
  const at = 0.2 + index * 0.072;
  const o = useTransform(p, [at, at + 0.06], [0, 1]);
  const x = useTransform(p, [at, at + 0.08], [26, 0]);
  /* 체크 자체는 한 박자 늦게 골드로 '딸깍' */
  const checkO = useTransform(p, [at + 0.03, at + 0.1], [0, 1]);
  const checkScale = useTransform(p, [at + 0.03, at + 0.1, at + 0.14], [0.4, 1.18, 1]);
  const ringGlow = useTransform(p, [at + 0.05, at + 0.13], [0, 1]);

  return (
    <motion.div
      style={{ opacity: o, x }}
      className="relative flex items-center gap-[clamp(0.9rem,1.2vw,1.4rem)] rounded-2xl border border-gold/30 bg-coal/70 px-[clamp(1.1rem,1.6vw,1.8rem)] py-[clamp(1rem,1.6vh,1.5rem)] backdrop-blur-sm"
    >
      {/* 골드 체크 (강조) */}
      <motion.span
        style={{ scale: checkScale }}
        className="relative flex h-[clamp(2.5rem,3vw,3.4rem)] w-[clamp(2.5rem,3vw,3.4rem)] shrink-0 items-center justify-center rounded-xl border border-gold/55 bg-gold/12"
      >
        <motion.span
          aria-hidden
          style={{ opacity: ringGlow }}
          className="pointer-events-none absolute -inset-1.5 rounded-2xl"
        >
          <span
            className="block h-full w-full rounded-2xl"
            style={{ boxShadow: "0 0 22px rgba(232,181,75,0.5)" }}
          />
        </motion.span>
        <motion.span style={{ opacity: checkO }} className="text-gold [filter:drop-shadow(0_0_10px_rgba(232,181,75,0.55))]">
          <CheckMark className="h-[clamp(1.1rem,1.4vw,1.6rem)] w-[clamp(1.1rem,1.4vw,1.6rem)]" />
        </motion.span>
      </motion.span>

      {/* 라벨 + 상세 */}
      <div className="flex min-w-0 flex-col">
        <span className="flex items-baseline gap-2.5">
          <span className="font-mono text-[10px] tracking-[0.28em] text-gold/55 md:text-[12px]">{item.no}</span>
          <span className="whitespace-nowrap font-display font-bold leading-tight text-bone text-[clamp(1rem,1.4vw,1.55rem)] [word-break:keep-all]">
            {item.label}
          </span>
        </span>
        <span className="mt-1 truncate font-mono text-[clamp(0.72rem,0.95vw,1rem)] tracking-[0.02em] text-bone/65">
          {item.detail}
        </span>
      </div>
    </motion.div>
  );
}

/* 골드 체크마크 SVG (currentColor) */
function CheckMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 12.5 L9.5 18 L20 6"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
