"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * D14 — 왜 폴더가 필요한가  [폴더 · 작업공간 / 선언·정보형]
 * 16:9 2단 + Pin 스크롤 스테이지(클릭 타깃 없음, 개념 안심 비유).
 * 좌: 작업 책상 위 '서류함(폴더)' 일러스트 — 흩어진 파일들이 하나의 폴더로 빨려 들어감.
 *     이어 AI(Cline)가 그 폴더를 통째로 들여다보는 연결선 점등.
 * 우: 리드 → 비유 카피 → 보조(AI) 카피 → 골드 결론 배너 '폴더 = 작업공간'.
 */

type Doc = { id: string; label: string; x: number; y: number; tx: number; ty: number; at: number };
/* 흩어진 파일들 (폴더 밖 → 폴더 탭 라인을 따라 분산 수렴 → 폴더 안으로 빨려 사라짐) */
/* x/y = 시작 위치(%), tx/ty = 수렴 목표(%) — 4장이 한 점에 겹치지 않게 탭 라인을 따라 벌림 */
const DOCS: Doc[] = [
  { id: "html", label: "index.html", x: 8, y: 12, tx: 40, ty: 48, at: 0.32 },
  { id: "css", label: "style.css", x: 70, y: 8, tx: 50, ty: 50, at: 0.37 },
  { id: "js", label: "app.js", x: 4, y: 50, tx: 47, ty: 52, at: 0.42 },
  { id: "img", label: "logo.png", x: 74, y: 48, tx: 57, ty: 50, at: 0.47 },
];

export default function D14WhyFolder() {
  return (
    <section data-scene="d14" data-act="폴더 · 작업공간" className="relative bg-ink text-bone">
      <Pin heights={3}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.36, 0.5]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  /* ── 좌측 비주얼 컨테이너 ── */
  const stageO = useTransform(p, [0.1, 0.24], [0, 1]);
  const stageY = useTransform(p, [0.1, 0.26], [40, 0]);

  /* ── 우측 카피 비트 ── */
  const leadO = useTransform(p, [0.02, 0.13], [0, 1]);
  const leadY = useTransform(p, [0.02, 0.16], [38, 0]);

  const anaO = useTransform(p, [0.3, 0.42], [0, 1]);
  const anaY = useTransform(p, [0.3, 0.44], [30, 0]);

  const aiO = useTransform(p, [0.56, 0.68], [0, 1]);
  const aiY = useTransform(p, [0.56, 0.7], [26, 0]);

  const bannerO = useTransform(p, [0.78, 0.9], [0, 1]);
  const bannerY = useTransform(p, [0.78, 0.92], [28, 0]);
  const bannerGlow = useTransform(p, [0.84, 0.98], [0, 0.55]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(52% 56% at 36% 46%, rgba(232,181,75,0.11), transparent 72%)" }}
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
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 content-center items-center gap-[clamp(2.5rem,5.5vw,6rem)] px-[clamp(2.5rem,6vw,8rem)] py-[8vh] lg:grid-cols-[1.04fr_0.96fr]">
        {/* ── 좌측: 책상 위 서류함 일러스트 ── */}
        <motion.div style={{ opacity: stageO, y: stageY }} className="order-2 lg:order-1">
          <DeskFiler p={p} />
        </motion.div>

        {/* ── 우측: 카피 ── */}
        <div className="order-1 flex flex-col justify-center lg:order-2">
          <motion.div style={{ opacity: leadO, y: leadY }}>
            <Kicker>폴더 · 작업공간</Kicker>
            <h2 className="mt-8 font-display font-black leading-[1.22] text-bone text-[clamp(2rem,4vw,4.2rem)]">
              왜 <span className="whitespace-nowrap">폴더가</span> 필요한가
            </h2>
            <p className="mt-6 text-balance-k leading-relaxed text-bone/70 text-[clamp(1.1rem,1.6vw,1.65rem)]">
              본격적으로 일하기 전 —{" "}
              <span className="whitespace-nowrap text-bone/90">폴더 하나가 필요하다.</span>
            </p>
          </motion.div>

          {/* 비유 */}
          <motion.div
            style={{ opacity: anaO, y: anaY }}
            className="mt-[clamp(2rem,4.5vh,3.4rem)] rounded-2xl border border-bone/12 bg-coal/60 px-[clamp(1.5rem,2vw,2.4rem)] py-[clamp(1.5rem,2.6vh,2.4rem)] backdrop-blur-sm"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/40 md:text-xs">비유</span>
            <p className="mt-4 font-display font-bold leading-[1.4] text-bone text-[clamp(1.35rem,2.3vw,2.3rem)]">
              <span className="whitespace-nowrap">폴더 = 작업 책상 위 서류함.</span>
            </p>
            <p className="mt-3 text-balance-k leading-relaxed text-bone/65 text-[clamp(1.02rem,1.4vw,1.45rem)]">
              한 프로젝트의 모든 파일을 — <span className="whitespace-nowrap text-bone/85">한 곳에.</span>
            </p>
          </motion.div>

          {/* 보조 (AI) */}
          <motion.p
            style={{ opacity: aiO, y: aiY }}
            className="mt-[clamp(1.6rem,3.5vh,2.6rem)] flex items-start gap-3 text-balance-k leading-relaxed text-bone/65 text-[clamp(1.02rem,1.45vw,1.5rem)]"
          >
            <span aria-hidden className="mt-[0.55em] inline-block h-px w-7 shrink-0 bg-gold/55" />
            <span>
              AI(<span className="text-bone/90">Cline</span>)도 이 폴더를{" "}
              <span className="whitespace-nowrap text-bone/90">통째로 보고</span> 일한다. 그래서{" "}
              <span className="whitespace-nowrap text-bone/90">폴더부터 만든다.</span>
            </span>
          </motion.p>

          {/* 골드 결론 배너 */}
          <motion.div style={{ opacity: bannerO, y: bannerY }} className="relative mt-[clamp(1.8rem,4vh,3rem)]">
            <motion.div
              aria-hidden
              style={{ opacity: bannerGlow }}
              className="pointer-events-none absolute -inset-x-6 -inset-y-4 rounded-3xl"
            >
              <div
                className="h-full w-full"
                style={{ background: "radial-gradient(60% 70% at 28% 50%, rgba(232,181,75,0.16), transparent 72%)" }}
              />
            </motion.div>
            <div className="relative inline-flex items-center gap-4 rounded-2xl border border-gold/55 bg-gold/[0.07] px-[clamp(1.4rem,2vw,2.4rem)] py-[clamp(1rem,1.8vh,1.6rem)]">
              <span aria-hidden className="text-[clamp(1.6rem,2.4vw,2.4rem)] leading-none">📁</span>
              <p
                className="font-display font-black leading-none text-gold text-[clamp(1.6rem,3vw,3rem)]"
                style={{ textShadow: "0 0 38px rgba(232,181,75,0.4)" }}
              >
                <span className="whitespace-nowrap">폴더 = 작업공간</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── 책상 위 서류함(폴더) 일러스트 ───────────────────────── */
function DeskFiler({ p }: { p: MotionValue<number> }) {
  /* 폴더 강조 점등 */
  const folderGlow = useTransform(p, [0.5, 0.66], [0.15, 0.55]);
  /* AI 시선 연결선(폴더를 통째로 본다) */
  const aiLen = useTransform(p, [0.6, 0.78], [0, 1]);
  const aiNodeO = useTransform(p, [0.72, 0.84], [0, 1]);
  const aiNodeS = useTransform(p, [0.72, 0.86], [0.82, 1]);

  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[800px]">
      {/* 폴더 후광 */}
      <motion.div
        aria-hidden
        style={{ opacity: folderGlow }}
        className="pointer-events-none absolute left-1/2 top-[58%] h-[46%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
      >
        <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, rgba(232,181,75,0.4), transparent 70%)" }} />
      </motion.div>

      {/* 책상 면 — 우드톤 미세 그라데이션 + 결 라인으로 '빈 사각형'이 아니라 실제 책상처럼 */}
      <div
        className="absolute inset-x-0 bottom-0 h-[38%] overflow-hidden rounded-2xl border border-bone/12"
        style={{ background: "linear-gradient(180deg, rgba(28,26,22,0.92) 0%, rgba(18,16,13,0.95) 100%)" }}
      >
        {/* 책상 표면 결(우드 톤 라인) */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(232,181,75,0.05) 0px, rgba(232,181,75,0.05) 1px, transparent 1px, transparent 46px)",
          }}
        />
        {/* 표면 하이라이트 */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[40%]"
          style={{ background: "linear-gradient(180deg, rgba(242,237,227,0.06), transparent)" }}
        />
        {/* 폴더가 책상에 드리우는 그림자(두 요소 연결) */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[14%] h-[26%] w-[56%] -translate-x-1/2 rounded-[50%] blur-[26px]"
          style={{ background: "radial-gradient(closest-side, rgba(0,0,0,0.6), transparent)" }}
        />
        {/* 데스크 소품 — 머그 실루엣(좌) */}
        <div aria-hidden className="absolute bottom-[26%] left-[8%] h-[clamp(20px,3vw,30px)] w-[clamp(20px,3vw,30px)] rounded-b-md rounded-t-sm border border-bone/15 bg-coal/80">
          <span className="absolute right-[-32%] top-[24%] h-[44%] w-[38%] rounded-r-full border border-l-0 border-bone/15" />
        </div>
        {/* 데스크 소품 — 노트/펜(우) */}
        <div aria-hidden className="absolute bottom-[24%] right-[9%] h-[clamp(16px,2.4vw,24px)] w-[clamp(34px,5vw,52px)] -rotate-6 rounded-sm border border-bone/12 bg-coal/70">
          <span className="absolute left-[12%] top-1/2 h-px w-[76%] -translate-y-1/2 bg-bone/12" />
          <span className="absolute left-[-18%] top-[10%] h-[120%] w-[12%] rotate-[28deg] rounded-full bg-bone/25" />
        </div>
      </div>
      <div className="absolute inset-x-[6%] bottom-[34%] h-px bg-bone/10" />

      {/* 흩어진 파일들 → 폴더로 모임 */}
      {DOCS.map((d) => (
        <FileCard key={d.id} p={p} doc={d} />
      ))}

      {/* 중앙 폴더(서류함) */}
      <div className="absolute left-1/2 top-[58%] w-[52%] -translate-x-1/2 -translate-y-1/2">
        <Folder p={p} />
      </div>

      {/* AI(Cline) 시선 — 폴더 통째로 봄 */}
      <svg viewBox="0 0 500 400" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="d14ai" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(232,181,75,0.85)" />
            <stop offset="100%" stopColor="rgba(255,211,122,0.5)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 446 56 C 384 110, 330 168, 262 220"
          fill="none"
          stroke="url(#d14ai)"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeDasharray="0.5 0.06"
          style={{ pathLength: aiLen, filter: "drop-shadow(0 0 6px rgba(232,181,75,0.45))" }}
        />
      </svg>

      {/* 좌상단 보조 라벨 — 비유 보강 + 상단 공백 채움 */}
      <div className="absolute left-[1%] top-[3%] inline-flex items-center gap-2 rounded-full border border-bone/12 bg-coal/70 px-[clamp(0.7rem,1.1vw,1.05rem)] py-[clamp(0.3rem,0.7vh,0.55rem)] backdrop-blur-sm">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold/70" />
        <span className="whitespace-nowrap font-mono text-[clamp(0.6rem,0.85vw,0.85rem)] uppercase tracking-[0.18em] text-bone/70">
          한 곳에 모음
        </span>
      </div>

      {/* AI 노드 카드 — 골드 절제(보더/라벨을 bone 톤으로), 연결선만 골드 유지 */}
      <motion.div
        style={{ opacity: aiNodeO, scale: aiNodeS }}
        className="absolute right-[2%] top-[5%] flex items-center gap-2.5 rounded-xl border border-bone/15 bg-coal/85 px-[clamp(0.8rem,1.4vw,1.3rem)] py-[clamp(0.5rem,1vh,0.85rem)] backdrop-blur-sm"
      >
        <span aria-hidden className="text-[clamp(0.95rem,1.4vw,1.4rem)] leading-none">🤖</span>
        <div className="leading-tight">
          <p className="font-display font-bold text-bone text-[clamp(0.85rem,1.15vw,1.2rem)]">AI · Cline</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone/55 md:text-[11px]">reads folder</p>
        </div>
      </motion.div>
    </div>
  );
}

/* 흩어진 파일 카드 → 폴더 탭 라인을 따라 분산 수렴 → 폴더 안으로 빨려 사라짐 */
function FileCard({ p, doc }: { p: MotionValue<number>; doc: Doc }) {
  const o = useTransform(p, [doc.at, doc.at + 0.08], [0, 1]);
  /* 등장 후 카드별 분산 목표점(tx/ty)으로 수렴 */
  const left = useTransform(
    p,
    [doc.at, doc.at + 0.06, doc.at + 0.2],
    [`${doc.x}%`, `${doc.x}%`, `${doc.tx}%`],
  );
  const top = useTransform(
    p,
    [doc.at, doc.at + 0.06, doc.at + 0.2],
    [`${doc.y}%`, `${doc.y}%`, `${doc.ty}%`],
  );
  /* 정착(폴더 도착) 시 0으로 fade-out → '폴더 안으로 빨려들어가 사라짐' (라벨 오버프린트 제거) */
  const settle = useTransform(p, [doc.at + 0.16, doc.at + 0.24], [1, 0]);
  const settleScale = useTransform(p, [doc.at + 0.16, doc.at + 0.24], [1, 0.62]);
  const opacity = useTransform([o, settle], ([x, y]: number[]) => x * y);

  /* 바깥: left/top 위치만(transform 미사용) → 안쪽: 정착 scale.
     (centering 은 안쪽 wrapper 의 -translate-1/2 로, motion scale 과 transform 충돌 방지) */
  return (
    <motion.div style={{ opacity, left, top }} className="absolute z-[5]">
      {/* 중간 wrapper: -translate-1/2 로 좌표 중심 정렬(순수 CSS, motion transform 미사용) */}
      <div className="-translate-x-1/2 -translate-y-1/2">
        {/* 안쪽: 정착 scale 만(transform 충돌 없음) */}
        <motion.div
          style={{ scale: settleScale }}
          className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-bone/15 bg-coal/90 px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm"
        >
          <span aria-hidden className="text-[clamp(0.8rem,1.1vw,1.1rem)] leading-none">📄</span>
          <span className="font-mono text-[clamp(0.66rem,0.85vw,0.92rem)] tracking-[0.02em] text-bone/75">{doc.label}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* 중앙 폴더(서류함) */
function Folder({ p }: { p: MotionValue<number> }) {
  const lidLift = useTransform(p, [0.5, 0.62], [0, -6]);
  const stuffed = useTransform(p, [0.52, 0.66], [0, 1]);
  return (
    <div className="relative w-full" style={{ aspectRatio: "1.5 / 1" }}>
      {/* 탭 */}
      <div className="absolute left-[8%] top-0 h-[22%] w-[40%] rounded-t-lg border border-b-0 border-gold/45 bg-gold/15" />
      {/* 몸체 */}
      <div className="absolute inset-x-0 bottom-0 top-[16%] rounded-xl rounded-tl-none border border-gold/55 bg-gradient-to-b from-gold/20 to-gold/[0.08] shadow-[0_0_40px_rgba(232,181,75,0.22)]">
        {/* 안에 모인 파일 더미(점등) */}
        <motion.div style={{ opacity: stuffed, y: lidLift }} className="absolute inset-x-[14%] top-[-10%] flex justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-[clamp(20px,3.4vw,34px)] w-[clamp(16px,2.4vw,24px)] rounded-sm border border-bone/25 bg-coal/95"
              style={{ transform: `translateY(${i % 2 === 0 ? 0 : 4}px) rotate(${(i - 1) * 4}deg)` }}
            />
          ))}
        </motion.div>
        <span className="absolute bottom-[12%] left-1/2 -translate-x-1/2 font-mono text-[clamp(0.66rem,0.95vw,1rem)] uppercase tracking-[0.2em] text-gold/85">
          my-ai
        </span>
      </div>
    </div>
  );
}
