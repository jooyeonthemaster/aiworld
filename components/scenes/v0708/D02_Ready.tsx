"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * D02 — 준비물 (3강 "0에서 1까지" / 준비 · 시작 전)  [kind=선언/정보 · 독립 선언형 Pin 씬]
 * 16:9 가로 4열 그리드 + Pin 스크롤 점등. (N06/N07 패턴 상속, TutorialScene 미사용)
 *
 * 리드 세리프 "준비물은 딱 네 가지." → 4장의 준비물 카드(아이콘+제목+한줄)가 좌→우로 순차 점등.
 * ① 컴퓨터 ② 인터넷 ③ 약 40분 ④ 마음가짐(골드 강조 1개 원칙) → 마지막에 안심 카피.
 * 클릭 타깃 없는 정보 씬 — 골드는 마음가짐 카드에만.
 */

type Item = {
  no: string;
  title: string;
  line: string;
  sub: string;
  icon: "pc" | "wifi" | "clock" | "heart";
  gold: boolean;
};

const ITEMS: Item[] = [
  { no: "01", title: "컴퓨터", line: "Windows 11 또는 Mac", sub: "DEVICE", icon: "pc", gold: false },
  { no: "02", title: "인터넷 연결", line: "다운로드·설치에 필요", sub: "NETWORK", icon: "wifi", gold: false },
  { no: "03", title: "약 40분", line: "처음부터 끝까지 한 번에", sub: "TIME", icon: "clock", gold: false },
  { no: "04", title: "마음가짐", line: "코딩 몰라도 됨 · 그대로 따라만", sub: "MINDSET", icon: "heart", gold: true },
];

export default function D02Ready() {
  return (
    <section data-scene="d02" data-act="준비 · 시작 전" className="relative bg-ink text-bone">
      <Pin heights={3}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.36, 0.48]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  /* ── 리드 (세리프) ── */
  const kickO = useTransform(p, [0.02, 0.12], [0, 1]);
  const leadO = useTransform(p, [0.05, 0.18], [0, 1]);
  const leadY = useTransform(p, [0.05, 0.2], [42, 0]);

  /* ── 마무리 안심 카피 (하단 빈 띠 자리에 일찍 점등시켜 수직 균형추로) ── */
  const endO = useTransform(p, [0.6, 0.75], [0, 1]);
  const endY = useTransform(p, [0.6, 0.78], [26, 0]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(54% 58% at 50% 42%, rgba(232,181,75,0.10), transparent 72%)" }}
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

      {/* ── 콘텐츠 (content-center 로 단일 stack 수직 중앙) ── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col content-center items-center justify-center gap-[clamp(3rem,7.5vh,6.5rem)] px-[clamp(2.5rem,6vw,8rem)] py-[5vh]">
        {/* 리드 */}
        <div className="text-center">
          <motion.div style={{ opacity: kickO }}>
            <Kicker className="justify-center">준비 · 시작 전 / READY</Kicker>
          </motion.div>
          <motion.h2
            style={{ opacity: leadO, y: leadY }}
            className="mt-7 font-display font-bold leading-[1.3] text-bone text-[clamp(1.9rem,4vw,4.2rem)]"
          >
            준비물은 딱 <span className="whitespace-nowrap text-gold [text-shadow:0_0_38px_rgba(232,181,75,0.42)]">네 가지</span>.
          </motion.h2>
          <motion.p
            style={{ opacity: leadO }}
            className="mt-5 text-balance-k leading-relaxed text-bone/55 text-[clamp(1.05rem,1.5vw,1.55rem)]"
          >
            거창한 건 하나도 없다 — 지금 가진 것이면 충분하다.
          </motion.p>
        </div>

        {/* 4열 카드 그리드 (16:9 가로 적극 활용) */}
        <div className="grid w-full grid-cols-1 gap-[clamp(1rem,1.6vw,1.8rem)] sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it, i) => (
            <ReadyCard key={it.no} item={it} index={i} p={p} />
          ))}
        </div>

        {/* 마무리 안심 카피 */}
        <motion.p
          style={{ opacity: endO, y: endY }}
          className="max-w-[1080px] text-balance-k text-center font-display font-bold leading-[1.48] text-bone/85 text-[clamp(1.15rem,2vw,2.1rem)]"
        >
          준비됐으면 — <span className="whitespace-nowrap text-gold">그대로 따라만</span> 오면 된다.
        </motion.p>
      </div>
    </div>
  );
}

function ReadyCard({ item, index, p }: { item: Item; index: number; p: MotionValue<number> }) {
  /* 좌→우 순차 점등 (마지막 골드 카드는 한 박자 늦게 글로우) */
  const at = 0.24 + index * 0.12;
  const o = useTransform(p, [at, at + 0.1], [0, 1]);
  const y = useTransform(p, [at, at + 0.12], [44, 0]);
  const goldGlow = useTransform(p, [at + 0.06, at + 0.2], [0, 1]);

  return (
    <motion.div
      style={{ opacity: o, y }}
      className={`relative flex min-h-[clamp(20rem,30vh,24rem)] flex-col overflow-hidden rounded-2xl border bg-coal/70 px-[clamp(1.5rem,1.9vw,2.3rem)] py-[clamp(2rem,3vh,3rem)] backdrop-blur-sm ${
        item.gold ? "border-gold/55" : "border-bone/12"
      }`}
    >
      {item.gold ? (
        <motion.div
          aria-hidden
          style={{
            opacity: goldGlow,
            background: "radial-gradient(55% 55% at 50% 38%, rgba(232,181,75,0.18), transparent 70%)",
          }}
          className="pointer-events-none absolute inset-0 rounded-2xl"
        />
      ) : null}

      {/* 번호 + 영문 라벨 */}
      <div className="relative flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.3em] text-bone/35">{item.no}</span>
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.26em] md:text-[12px] ${
            item.gold ? "text-gold/70" : "text-bone/30"
          }`}
        >
          {item.sub}
        </span>
      </div>

      {/* 아이콘 */}
      <div
        className={`relative mt-6 flex h-[clamp(56px,4vw,72px)] w-[clamp(56px,4vw,72px)] items-center justify-center rounded-2xl border ${
          item.gold ? "border-gold/45 bg-gold/10" : "border-bone/12 bg-bone/[0.04]"
        }`}
      >
        <ReadyIcon icon={item.icon} gold={item.gold} />
      </div>

      {/* 제목 */}
      <h3
        className={`relative mt-7 font-display font-black leading-tight text-[clamp(1.5rem,2.2vw,2.3rem)] ${
          item.gold ? "text-gold [text-shadow:0_0_34px_rgba(232,181,75,0.4)]" : "text-bone"
        }`}
      >
        {item.title}
      </h3>

      {/* 스페이서: 구분선+본문을 카드 바닥에 고정 → 1줄/2줄 카드 바닥 정렬 균일 */}
      <div className="flex-1" />

      {/* 구분선 */}
      <span className={`relative mt-5 h-px w-full ${item.gold ? "bg-gold/40" : "bg-bone/12"}`} />

      {/* 한 줄 설명 */}
      <p className={`relative mt-5 leading-relaxed text-[clamp(1rem,1.3vw,1.35rem)] ${item.gold ? "text-bone/90" : "text-bone/60"}`}>
        {item.line}
      </p>
    </motion.div>
  );
}

/* 결정적 SVG 아이콘 (Math.random 없음) */
function ReadyIcon({ icon, gold }: { icon: Item["icon"]; gold: boolean }) {
  const stroke = gold ? "#e8b54b" : "#f2ede3";
  const op = gold ? 1 : 0.78;
  const common = {
    width: "58%",
    height: "58%",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    style: { opacity: op },
  };
  if (icon === "pc") {
    return (
      <svg {...common} aria-hidden>
        <rect x="3" y="4" width="18" height="12" rx="1.5" />
        <path d="M8 20h8M12 16v4" />
      </svg>
    );
  }
  if (icon === "wifi") {
    return (
      <svg {...common} aria-hidden>
        <path d="M2 8.5a16 16 0 0 1 20 0" />
        <path d="M5 12a11 11 0 0 1 14 0" />
        <path d="M8.5 15.5a6 6 0 0 1 7 0" />
        <circle cx="12" cy="19" r="0.6" fill={stroke} />
      </svg>
    );
  }
  if (icon === "clock") {
    return (
      <svg {...common} aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    );
  }
  return (
    <svg {...common} aria-hidden>
      <path d="M12 20.5C5 16 3 11.5 3 8.5A4 4 0 0 1 12 6a4 4 0 0 1 9 2.5c0 3-2 7.5-9 12z" />
    </svg>
  );
}
