"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * I02 — 나는 누구인가 (프로필)  [재설계 / 견본 I03 기준]
 * 16:9 풀스크린 2단 레이아웃 + Pin 스크롤 연동 모션.
 * 좌: 모노 도시에 카드(타자기 리듬으로 항목 차오름) / 우: 거대 골드 이름 "김주연" + 서브.
 * 카드 항목·이름 글자·서브카피가 스크롤 progress 에 직결되어 카메라처럼 점등.
 */

/* 도시에 카드 항목 — 각자 progress 구간에 등장 */
type Field = { no: string; label: string; value: string; gold?: boolean };
const FIELDS: Field[] = [
  { no: "01", label: "이름 — ", value: "김주연" },
  { no: "02", label: "직함 — ", value: "(주)네안데르 Co-founder" },
  { no: "　", label: "       ", value: "일해라컴퍼니 대표" },
  { no: "03", label: "창업 — ", value: "2023, 만 24세", gold: true },
];

export default function I02Who() {
  return (
    <section
      data-scene="i02"
      data-act="OPENING — 김주연"
      className="relative bg-ink text-bone"
    >
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 — 스크롤 패럴랙스/점등 ── */
  const glowO = useTransform(p, [0, 0.45, 1], [0.16, 0.4, 0.52]);
  const gridShift = useTransform(p, [0, 1], [0, -46]);
  const wmX = useTransform(p, [0, 1], [0, -60]);

  /* ── 좌측 카드 진입(패럴랙스 리빌) ── */
  const cardO = useTransform(p, [0.02, 0.16], [0, 1]);
  const cardY = useTransform(p, [0.02, 0.2], [70, 0]);
  const cardX = useTransform(p, [0.02, 0.2], [-40, 0]);
  const cardRot = useTransform(p, [0.02, 0.2], [-5, -1.6]);

  /* ── 우측 거대 이름 ── */
  const nameLabelO = useTransform(p, [0.34, 0.42], [0, 1]);
  /* 골드 수직선 grow */
  const railH = useTransform(p, [0.34, 0.56], [0, 1]);

  /* ── 서브 카피 ── */
  const subO = useTransform(p, [0.8, 0.9], [0, 1]);
  const subY = useTransform(p, [0.8, 0.92], [30, 0]);

  /* ── 하단 마감 ── */
  const footO = useTransform(p, [0.9, 0.98], [0, 1]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ───────────────── 배경 레이어 ───────────────── */}
      <motion.div
        aria-hidden
        style={{ opacity: glowO }}
        className="pointer-events-none absolute inset-0"
      >
        {/* 우측 이름 쪽 골드 글로우 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(46% 60% at 76% 48%, rgba(232,181,75,0.13), transparent 72%)",
          }}
        />
        <div
          className="animate-pulse-soft absolute right-[10%] top-[44%] h-[46vh] w-[46vh] -translate-y-1/2 rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, rgba(255,211,122,0.10), transparent 70%)" }}
        />
        {/* 비네트 — 시선을 중앙으로 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 94% 78% at 50% 48%, transparent 30%, #07060a 94%)",
          }}
        />
      </motion.div>

      {/* 수사 보드 그리드 — 시차 패럴랙스 */}
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
            backgroundSize: "76px 76px",
            maskImage: "radial-gradient(78% 78% at 50% 50%, black, transparent 100%)",
          }}
        />
      </motion.div>

      {/* WHO 워터마크 — 미세 패럴랙스 */}
      <motion.div
        aria-hidden
        style={{ x: wmX }}
        className="text-stroke-gold pointer-events-none absolute -left-[1vw] bottom-[8vh] rotate-[-9deg] select-none whitespace-nowrap font-mono text-[clamp(7rem,19vw,19rem)] font-black leading-none tracking-tight opacity-[0.04]"
      >
        WHO
      </motion.div>

      {/* ───────────────── 콘텐츠: 2단 (content-center 수직 중앙) ───────────────── */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 content-center items-center gap-[clamp(2.5rem,5vw,6rem)] px-[clamp(2.5rem,6vw,8rem)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* ── 좌측 — 도시에 카드 ── */}
        <motion.div
          style={{ opacity: cardO, y: cardY, x: cardX, rotate: cardRot }}
          className="flex justify-center lg:justify-start"
        >
          <DossierCard p={p} />
        </motion.div>

        {/* ── 우측 — 거대 골드 이름 + 서브 ── */}
        <div className="relative">
          {/* 골드 수직선 — 위→아래 grow */}
          <motion.span
            aria-hidden
            style={{ scaleY: railH }}
            className="absolute -left-[clamp(1.2rem,2.2vw,2.4rem)] top-[4%] hidden h-[78%] w-px origin-top bg-gradient-to-b from-gold via-gold/50 to-gold/0 lg:block"
          />

          {/* 라벨 */}
          <motion.div style={{ opacity: nameLabelO }}>
            <Kicker tone="gold">WHO — 발표자</Kicker>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.4em] text-bone/35 md:text-[12px]">
              Subject — Name
            </p>
          </motion.div>

          {/* 거대 이름 — 글자별 스크롤 리빌 */}
          <h2 className="mt-6 font-display font-black leading-[0.98] text-gold text-[clamp(5rem,15vw,13rem)] [text-shadow:0_0_70px_rgba(232,181,75,0.3)]">
            <NameReveal p={p} text="김주연" />
          </h2>

          {/* 서브 카피 — 'AI로 먹고사는 사람' 통째 nowrap */}
          <motion.p
            style={{ opacity: subO, y: subY }}
            className="text-balance-k mt-[clamp(2rem,4vh,3.5rem)] max-w-[760px] text-[clamp(1.15rem,1.7vw,1.85rem)] leading-relaxed text-bone/70"
          >
            AI 마케터를 준비하는 여러분께 —{" "}
            <span className="whitespace-nowrap font-display font-semibold text-bone [text-shadow:0_0_30px_rgba(242,237,227,0.18)]">
              &apos;AI로 먹고사는 사람&apos;
            </span>
            의 이야기를 하려 합니다.
          </motion.p>

          {/* 하단 모노 마감 */}
          <motion.div
            style={{ opacity: footO }}
            className="mt-[clamp(2rem,4vh,3rem)] flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-bone/30 md:text-[11px]"
          >
            <span className="h-px w-10 bg-bone/20" />
            <span>I.02 — IDENTITY CONFIRMED · EST. 2023</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── 거대 이름 — 글자별 스크롤 리빌 ───────────────────────── */
function NameReveal({ p, text }: { p: MotionValue<number>; text: string }) {
  const chars = Array.from(text);
  return (
    <span className="inline-flex">
      {chars.map((c, i) => (
        <NameChar key={i} p={p} ch={c} i={i} n={chars.length} />
      ))}
    </span>
  );
}

function NameChar({
  p,
  ch,
  i,
  n,
}: {
  p: MotionValue<number>;
  ch: string;
  i: number;
  n: number;
}) {
  const a = 0.42 + (i / n) * 0.22; // 0.42 → ~0.64 사이로 글자 stagger
  const o = useTransform(p, [a, a + 0.08], [0, 1]);
  const y = useTransform(p, [a, a + 0.12], ["38%", "0%"]);
  const blur = useTransform(p, [a, a + 0.1], [14, 0]);
  const filter = useTransform(blur, (b: number) => `blur(${b}px)`);
  return (
    <span className="relative inline-block overflow-hidden pb-[0.06em]">
      <motion.span style={{ opacity: o, y, filter }} className="inline-block">
        {ch}
      </motion.span>
    </span>
  );
}

/* ───────────────────────── 도시에 카드 (스크롤 연동 타자기) ───────────────────────── */
function DossierCard({ p }: { p: MotionValue<number> }) {
  /* 스캔라인 위치 — progress 에 직결되어 카드를 위→아래로 훑음 */
  const scanTop = useTransform(p, [0.04, 0.34], ["-18%", "112%"]);
  const scanO = useTransform(p, [0.04, 0.1, 0.34, 0.4], [0, 1, 1, 0]);

  return (
    <div className="relative w-[min(560px,90vw)] rounded-md border border-bone/15 bg-coal p-8 shadow-[0_38px_90px_rgba(0,0,0,0.62)] md:p-10">
      {/* 폴더 탭 */}
      <div className="absolute -top-[28px] left-7 rounded-t-md border border-b-0 border-bone/15 bg-coal px-4 py-1.5 font-mono text-[12px] tracking-[0.32em] text-bone/45 md:text-[13px]">
        FILE — SUBJECT 001
      </div>

      {/* 클립 장식 */}
      <div aria-hidden className="absolute -top-5 right-12">
        <div className="h-12 w-5 rounded-full border-2 border-bone/35" />
        <div className="absolute left-1/2 top-[11px] h-9 w-[9px] -translate-x-1/2 rounded-full border-2 border-bone/25" />
      </div>

      {/* 코너 틱 */}
      <span aria-hidden className="absolute left-2 top-2 h-5 w-5 border-l border-t border-bone/20" />
      <span aria-hidden className="absolute right-2 top-2 h-5 w-5 border-r border-t border-bone/20" />
      <span aria-hidden className="absolute bottom-2 left-2 h-5 w-5 border-b border-l border-bone/20" />
      <span aria-hidden className="absolute bottom-2 right-2 h-5 w-5 border-b border-r border-bone/20" />

      {/* 스캔라인 — 스크롤 직결 스윕 */}
      <motion.div
        aria-hidden
        style={{ top: scanTop, opacity: scanO }}
        className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-gold/[0.09] to-transparent"
      />

      {/* 메타 헤더 */}
      <div className="mb-6 flex items-center justify-between border-b border-bone/10 pb-4 font-mono text-[12px] tracking-[0.3em] text-bone/40 md:text-[13px]">
        <span>PRESENTER PROFILE</span>
        <span className="text-gold/60">2026.06.24</span>
      </div>

      {/* 타자기 본문 — 각 줄 progress 구간에 차오름 */}
      <div className="space-y-[18px] text-[clamp(0.95rem,1.15vw,1.35rem)] leading-relaxed tracking-wider md:space-y-[22px]">
        {FIELDS.map((f, i) => (
          <FieldRow key={i} p={p} field={f} index={i} />
        ))}
      </div>

      {/* 바코드 푸터 */}
      <div className="mt-9 flex items-end justify-between border-t border-bone/10 pt-5">
        <div className="flex h-8 items-end gap-[2px]" aria-hidden>
          {Array.from({ length: 26 }).map((_, i: number) => {
            const v = ((i * 37) % 89) / 89;
            return (
              <span
                key={i}
                className="inline-block bg-bone/55"
                style={{ width: `${1 + Math.round(v * 3)}px`, height: `${58 + v * 42}%` }}
              />
            );
          })}
        </div>
        <FooterStamp p={p} />
      </div>
    </div>
  );
}

/* 카드 한 줄 — 라벨(haze) + 값. 타자기처럼 글자 폭이 좌→우로 열림 */
function FieldRow({
  p,
  field,
  index,
}: {
  p: MotionValue<number>;
  field: Field;
  index: number;
}) {
  /* 0.06 → 0.30 구간에서 4줄이 순차 등장 */
  const a = 0.06 + index * 0.058;
  const rowO = useTransform(p, [a, a + 0.04], [0, 1]);
  const rowX = useTransform(p, [a, a + 0.06], [-14, 0]);
  /* 값 글자 reveal — clip 으로 좌→우 타이핑 느낌 */
  const clipW = useTransform(p, [a + 0.02, a + 0.05], [0, 1]);
  const clip = useTransform(clipW, (w: number) => `inset(0 ${(1 - w) * 100}% 0 0)`);
  /* caret — 진행 중에만 표시 */
  const caretO = useTransform(p, [a + 0.015, a + 0.025, a + 0.05, a + 0.06], [0, 1, 1, 0]);

  return (
    <motion.div style={{ opacity: rowO, x: rowX }} className="flex items-baseline gap-3.5">
      <span className="font-mono text-[12px] text-bone/25 md:text-[13px]">{field.no}</span>
      <span className="relative inline-flex items-baseline whitespace-pre font-mono">
        <span className="text-bone/55">{field.label}</span>
        <span className="relative inline-block">
          <motion.span
            style={{ clipPath: clip }}
            className={`relative inline-block whitespace-pre ${field.gold ? "text-gold" : "text-bone"}`}
          >
            {field.value}
          </motion.span>
          {/* 골드 밑줄 — '2023, 만 24세' 강조 */}
          {field.gold ? (
            <motion.span
              aria-hidden
              style={{ scaleX: clipW }}
              className="absolute -bottom-[3px] left-0 h-[2px] w-full origin-left bg-gold"
            />
          ) : null}
        </span>
        {/* caret */}
        <motion.span
          aria-hidden
          style={{ opacity: caretO }}
          className="ml-[3px] inline-block h-[1em] w-[0.5em] translate-y-[0.12em] bg-gold/90"
        />
      </span>
    </motion.div>
  );
}

/* VERIFIED 스탬프 — 카드가 다 채워진 뒤 도장 찍히듯 */
function FooterStamp({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [0.32, 0.4], [0, 1]);
  const sc = useTransform(p, [0.32, 0.4], [1.5, 1]);
  return (
    <motion.span
      style={{ opacity: o, scale: sc }}
      className="rounded-sm border border-bone/20 px-2.5 py-1 font-mono text-[12px] tracking-[0.3em] text-bone/45 md:text-[13px]"
    >
      VERIFIED
    </motion.span>
  );
}
