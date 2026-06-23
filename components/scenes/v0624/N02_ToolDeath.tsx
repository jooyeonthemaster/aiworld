"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * N02 — 도구를 쫓지 마라 (도구의 수명)  [ACT6]
 * 16:9 풀스크린 2단 + Pin 스크롤 스테이지.
 * 좌: 비트별 카피 크로스페이드(리드 → 옛 세계 → 새 세계 → 사례 → 결론 골드).
 * 우: 도구 이름 칩이 떠올랐다 흐려지며 교체되는 무한 churn 필드.
 *     젠스파크가 크게 떴다가 묻히고, Windsurf는 '이름이 바뀐' 흔적으로 남는다.
 * 옛↔새 대비 = "내 속도 > 도구 수명" 이 "도구 churn 속도 > 내 속도" 로 뒤집힘.
 */

/* ── 도구 churn 칩 (배경 안개처럼 떠다니는 작은 이름들) ── */
type Chip = { name: string; x: number; y: number; size: number; phase: number; dur: number };

/* 결정적 의사난수: 인덱스 수식만 사용 (Math.random 금지) */
const TOOLS = [
  "Genspark", "Windsurf", "Cursor", "Lovable", "Devin", "Bolt", "v0",
  "Replit", "Cline", "Manus", "Perplexity", "Gamma", "Suno", "Runway",
  "Midjourney", "Higgsfield", "Claude Code", "Codex", "Trae", "Pika",
  "Kling", "Veo", "Flux", "Ideogram", "Heygen", "Synthesia", "Operator",
  "Aider", "Continue", "Tabnine", "Copilot", "Phind",
];

const CHIPS: Chip[] = TOOLS.map((name, i) => ({
  name,
  /* 컬럼 전체(4~96%)로 펼쳐 빈 마진 최소화 */
  x: 4 + (((i * 53) % 97) / 97) * 92,
  y: 4 + (((i * 71) % 89) / 89) * 92,
  size: 0.78 + (((i * 37) % 7) / 7) * 0.5,
  phase: ((i * 29) % 100) / 100,
  dur: 5.5 + (((i * 17) % 9) / 9) * 4.5,
}));

export default function N02ToolDeath() {
  return (
    <section
      data-scene="n02"
      data-act="ACT 6 — 본질: 코드 에디터"
      className="relative bg-ink text-bone"
    >
      <Pin heights={5}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* ── 배경 (스크롤 미세 반응) ── */
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.34, 0.5]);
  const gridShift = useTransform(p, [0, 1], [0, -44]);
  /* 결론 비트에서 골드 글로우가 차오름 */
  const goldRise = useTransform(p, [0.78, 1], [0, 0.55]);

  /* ── 좌측 카피 비트 (크로스페이드) ──
     b1 리드 / b2 옛 세계 / b3 새 세계 / b4 사례 / b5 결론 */
  const leadO = useTransform(p, [0.02, 0.1, 0.2, 0.28], [0, 1, 1, 0]);
  const leadY = useTransform(p, [0.02, 0.1], [40, 0]);

  const oldO = useTransform(p, [0.22, 0.3, 0.42, 0.5], [0, 1, 1, 0]);
  const oldY = useTransform(p, [0.22, 0.3], [40, 0]);

  const newO = useTransform(p, [0.44, 0.52, 0.62, 0.7], [0, 1, 1, 0]);
  const newY = useTransform(p, [0.44, 0.52], [40, 0]);

  const caseO = useTransform(p, [0.62, 0.7, 0.78, 0.84], [0, 1, 1, 0]);
  const caseY = useTransform(p, [0.62, 0.7], [40, 0]);

  const concO = useTransform(p, [0.82, 0.9], [0, 1]);
  const concY = useTransform(p, [0.82, 0.9], [40, 0]);

  /* 우측 churn 필드 — 결론 비트에서도 '묻힌 도구들의 무덤' 잔상으로 남는다 */
  const fieldO = useTransform(p, [0.04, 0.12, 0.82, 0.98], [0, 1, 1, 0.62]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ── 배경 레이어 ── */}
      <motion.div
        aria-hidden
        style={{ opacity: glowO }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(46% 58% at 72% 50%, rgba(232,181,75,0.10), transparent 72%)",
          }}
        />
      </motion.div>
      {/* 결론 골드 차오름 */}
      <motion.div
        aria-hidden
        style={{ opacity: goldRise }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 90% at 28% 70%, rgba(232,181,75,0.16), transparent 70%)",
          }}
        />
      </motion.div>
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
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(78% 78% at 50% 50%, black, transparent 100%)",
          }}
        />
      </motion.div>
      {/* churn 워터마크 */}
      <div
        aria-hidden
        className="text-stroke-gold pointer-events-none absolute -right-[1vw] bottom-[2vh] select-none font-mono text-[clamp(6rem,16vw,15rem)] font-bold leading-none opacity-[0.04]"
      >
        churn
      </div>

      {/* ── 콘텐츠: 2단 (content-center 로 수직 중앙) ── */}
      <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-1 content-center items-center gap-[clamp(2rem,4.5vw,5rem)] px-[clamp(2.5rem,6vw,8rem)] lg:grid-cols-[1.02fr_0.98fr]">
        {/* 좌측 — 비트별 카피 (겹쳐 두고 크로스페이드) */}
        <div className="relative flex min-h-[58vh] flex-col justify-center">
          <Kicker>ACT 6 — 도구의 수명</Kicker>

          {/* 비트 무대: 절대배치 겹침 */}
          <div className="relative mt-7 min-h-[42vh]">
            {/* b1 — 리드 */}
            <motion.p
              style={{ opacity: leadO, y: leadY }}
              className="absolute inset-x-0 top-0 font-display font-bold leading-[1.4] text-bone text-[clamp(1.5rem,2.5vw,2.6rem)]"
            >
              남보다 빠르게 정보를 받고,
              <br />
              빠르게 익숙해지는 것 —{" "}
              <span className="whitespace-nowrap text-gold [text-shadow:0_0_34px_rgba(232,181,75,0.4)]">
                그것만으로 엄청난 성장
              </span>
              이 가능하다.
            </motion.p>

            {/* b2 — 옛 세계 */}
            <motion.div
              style={{ opacity: oldO, y: oldY }}
              className="absolute inset-x-0 top-0"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/40 md:text-xs">
                {"// OLD WORLD"}
              </span>
              <p className="mt-6 font-display font-bold leading-[1.4] text-bone text-[clamp(1.5rem,2.5vw,2.6rem)]">
                예전엔,{" "}
                <span className="whitespace-nowrap text-gold">&apos;어도비&apos;</span>를
                마스터하면 됐다.
              </p>
              <p className="mt-6 leading-relaxed text-bone/65 text-[clamp(1.05rem,1.5vw,1.6rem)]">
                도구를 익히는 <span className="text-bone">내 속도</span>가,{" "}
                <span className="whitespace-nowrap">도구의 수명보다 빨랐으니까.</span>
              </p>
              <SpeedBar p={p} variant="old" />
            </motion.div>

            {/* b3 — 새 세계 (세리프 핵심) */}
            <motion.div
              style={{ opacity: newO, y: newY }}
              className="absolute inset-x-0 top-0"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ember/70 md:text-xs">
                {"// NOW — 반대다"}
              </span>
              <p className="mt-6 font-display font-bold leading-[1.36] text-bone text-[clamp(1.55rem,2.6vw,2.8rem)]">
                그런데 지금은 반대다. —
                <br />
                내가 도구 하나를 익히는 속도보다,
                <br />
                <span className="whitespace-nowrap text-gold [text-shadow:0_0_36px_rgba(232,181,75,0.42)]">
                  AI가 그 도구를 갈아치우는 속도
                </span>
                가 더 빠르다.
              </p>
              <SpeedBar p={p} variant="new" />
            </motion.div>

            {/* b4 — 사례 (젠스파크 / Windsurf) */}
            <motion.div
              style={{ opacity: caseO, y: caseY }}
              className="absolute inset-x-0 top-0"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/40 md:text-xs">
                {"// CASE STUDY"}
              </span>
              <p className="mt-6 leading-[1.46] text-bone/90 text-[clamp(1.2rem,1.85vw,1.95rem)]">
                불과 몇 달 전, 모두가{" "}
                <span className="whitespace-nowrap font-display font-bold text-gold">
                  &apos;젠스파크&apos;
                </span>
                를 외쳤다.
                <br />
                역사상 가장 빠르게 떠오른 도구.
              </p>
              <p className="mt-6 leading-relaxed text-bone/65 text-[clamp(1.05rem,1.5vw,1.6rem)]">
                그사이 또 수십 개의 이름이 쏟아졌고,{" "}
                <span className="whitespace-nowrap text-bone">스포트라이트는 이미 옮겨갔다.</span>
              </p>
              <p className="mt-5 font-mono text-[clamp(0.85rem,1.05vw,1.05rem)] leading-relaxed text-bone/45">
                (인기 도구{" "}
                <span className="text-bone/70 line-through decoration-ember/60 decoration-2">
                  &apos;Windsurf&apos;
                </span>
                는 이름조차 바뀌어 사라졌다.)
              </p>
            </motion.div>

            {/* b5 — 결론 (골드) — 무대 중앙 정렬로 상단 쏠림 방지 */}
            <motion.div
              style={{ opacity: concO, y: concY }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <p className="font-display font-black leading-[1.22] text-bone text-[clamp(2.8rem,5.2vw,5.6rem)]">
                그러니 —<br />
                <span className="whitespace-nowrap text-bone/70">도구를 쫓지 마라.</span>
                <br />
                <span className="relative inline-block whitespace-nowrap text-gold [text-shadow:0_0_46px_rgba(232,181,75,0.5)]">
                  본질을 잡아라.
                  <span
                    aria-hidden
                    className="animate-pulse-soft absolute -inset-x-8 -inset-y-5 -z-10 rounded-full"
                    style={{
                      background:
                        "radial-gradient(50% 50% at 50% 50%, rgba(232,181,75,0.2), transparent 70%)",
                    }}
                  />
                </span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* 우측 — 도구 churn 필드 */}
        <motion.div
          style={{ opacity: fieldO }}
          className="relative flex h-full items-center justify-center"
        >
          <ChurnField p={p} />
        </motion.div>
      </div>
    </div>
  );
}

/* ───────────── 속도 비교 바 (옛 세계 vs 새 세계) ───────────── */
function SpeedBar({ p, variant }: { p: MotionValue<number>; variant: "old" | "new" }) {
  const isOld = variant === "old";
  /* 등장 구간을 각 비트에 맞춤 */
  const start = isOld ? 0.32 : 0.54;
  /* 옛 세계: 내 속도(긺) > 도구 수명(짧음) → 내가 이김
     새 세계: 내 속도(짧음) < churn 속도(긺) → 도구가 이김 */
  const meW = useTransform(p, [start, start + 0.08], ["0%", isOld ? "92%" : "44%"]);
  const toolW = useTransform(p, [start + 0.04, start + 0.12], ["0%", isOld ? "48%" : "96%"]);

  return (
    <div className="mt-9 flex w-full max-w-[520px] flex-col gap-4">
      <Bar
        label="내가 익히는 속도"
        w={meW}
        gold={isOld}
        muted={!isOld}
      />
      <Bar
        label={isOld ? "도구의 수명" : "AI가 갈아치우는 속도"}
        w={toolW}
        gold={!isOld}
        muted={isOld}
        ember={!isOld}
      />
    </div>
  );
}

function Bar({
  label,
  w,
  gold,
  muted,
  ember,
}: {
  label: string;
  w: MotionValue<string>;
  gold: boolean;
  muted: boolean;
  ember?: boolean;
}) {
  const fill = ember
    ? "from-ember/35 to-ember"
    : gold
      ? "from-gold/30 to-gold"
      : "from-bone/10 to-bone/45";
  return (
    <div className="flex flex-col gap-2">
      <span
        className={`font-mono text-[clamp(0.72rem,0.95vw,0.95rem)] tracking-[0.08em] ${
          ember ? "text-ember/85" : gold ? "text-gold/90" : "text-bone/45"
        }`}
      >
        {label}
      </span>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-bone/[0.06]">
        <motion.div
          style={{ width: w }}
          className={`h-full rounded-full bg-gradient-to-r ${fill} ${
            muted ? "opacity-70" : ""
          }`}
        />
      </div>
    </div>
  );
}

/* ───────────── 도구 churn 필드 ───────────── */
function ChurnField({ p }: { p: MotionValue<number> }) {
  /* 안개 칩들은 사례 비트 전후로 가장 활발 → 결론에서도 '무덤' 잔상으로 남는다 */
  const fogO = useTransform(p, [0.1, 0.18, 0.8, 0.96], [0, 0.85, 0.85, 0.5]);

  return (
    <div className="relative h-full w-full max-w-[760px]">
      {/* 가장자리 비네팅 (필드가 무대 안에 떠 있는 느낌, 약하게) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[2rem]"
        style={{
          background:
            "radial-gradient(72% 72% at 50% 50%, rgba(232,181,75,0.05), transparent 72%)",
          boxShadow: "inset 0 0 60px rgba(7,6,10,0.55)",
        }}
      />

      {/* 떠다니는 안개 칩 (무한 churn) */}
      <motion.div style={{ opacity: fogO }} className="absolute inset-0">
        {CHIPS.map((c) => (
          <FogChip key={c.name} chip={c} />
        ))}
      </motion.div>

      {/* 주인공: 젠스파크 — 크게 떴다가 묻힘 */}
      <Genspark p={p} />
    </div>
  );
}

function FogChip({ chip }: { chip: Chip }) {
  /* 결정적 파라미터로 떠올랐다 흐려지는 무한 루프 (위치는 고정, 부유만) */
  const drift = 12 + ((chip.phase * 100) % 10);
  return (
    <motion.span
      className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono tracking-[0.04em] text-bone/55"
      style={{
        left: `${chip.x}%`,
        top: `${chip.y}%`,
        fontSize: `${chip.size}rem`,
      }}
      initial={{ opacity: 0, y: drift }}
      animate={{ opacity: [0, 0.7, 0.7, 0], y: [drift, -drift] }}
      transition={{
        duration: chip.dur,
        delay: chip.phase * chip.dur,
        repeat: Infinity,
        repeatDelay: 0.6,
        ease: "easeInOut",
      }}
    >
      {chip.name}
    </motion.span>
  );
}

/* 젠스파크: 사례 비트(0.62~0.84)에서 거대하게 솟구쳤다가 묻힌다(잔상은 남긴다) */
function Genspark({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [0.6, 0.66, 0.74, 0.82], [0, 1, 1, 0.45]);
  const scale = useTransform(p, [0.6, 0.68, 0.82], [0.6, 1, 0.74]);
  const y = useTransform(p, [0.6, 0.68, 0.82], [70, 0, 64]);
  const glow = useTransform(p, [0.62, 0.7, 0.82], [0, 1, 0.1]);
  const ringScale = useTransform(p, [0.62, 0.84], [0.7, 1.5]);
  const ringO = useTransform(p, [0.62, 0.7, 0.84], [0, 0.5, 0]);

  return (
    <motion.div
      style={{ opacity: o, scale, y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* 글로우 */}
      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="absolute h-[60%] w-[60%] rounded-full"
      >
        <div
          className="h-full w-full rounded-full blur-[80px]"
          style={{ background: "radial-gradient(circle, rgba(255,211,122,0.4), transparent 70%)" }}
        />
      </motion.div>
      {/* 퍼지는 링 (가장 빠르게 떠오른 도구의 충격파) */}
      <motion.div
        aria-hidden
        style={{ scale: ringScale, opacity: ringO }}
        className="absolute h-[44%] w-[44%] rounded-full border border-gold/50"
      />

      <div className="relative flex flex-col items-center text-center">
        <span className="font-display font-black leading-none text-gold [text-shadow:0_0_60px_rgba(232,181,75,0.6)] text-[clamp(2.6rem,5.6vw,5.4rem)]">
          Genspark
        </span>
        <span className="mt-4 rounded-full border border-gold/45 bg-gold/10 px-4 py-1.5 font-mono text-[clamp(0.72rem,1vw,1rem)] tracking-[0.12em] text-gold">
          출시 9일 · $10M ARR
        </span>
        <span className="mt-3 font-mono text-[11px] uppercase tracking-[0.28em] text-bone/40 md:text-xs">
          역사상 가장 빠르게 떠오른 도구
        </span>
      </div>
    </motion.div>
  );
}
