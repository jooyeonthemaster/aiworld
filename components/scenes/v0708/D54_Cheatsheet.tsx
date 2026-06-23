"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import Pin from "@/components/ui/Pin";
import Kicker from "@/components/ui/Kicker";

/**
 * D54 — 단축키 · 명령어 치트시트  [마무리 · 완성 / 선언형 Pin]
 * 16:9 풀스크린 2단 그리드 + Pin 스크롤 점등.
 * 좌: 단축키 — 골드 키캡 행(VS Code 핵심 4개).
 * 우: 명령어 — 모노 터미널 칩 카드(터미널에서 자주 치는 7개).
 * 골드 강조 = 키캡 1종류. 카드/칩은 스크롤로 순차 점등.
 */

/* ── 좌측: 단축키 (키캡 시퀀스) ── */
type Short = { keys: string[]; what: string };
const SHORTCUTS: Short[] = [
  { keys: ["Ctrl", "`"], what: "터미널 열기 / 닫기" },
  { keys: ["Ctrl", "Shift", "X"], what: "확장(Extensions) 패널" },
  { keys: ["Ctrl", "S"], what: "파일 저장" },
  { keys: ["Ctrl", "Shift", "P"], what: "명령 팔레트 (모든 기능)" },
];

/* ── 우측: 터미널 명령어 (모노 칩) ── */
type Cmd = { cmd: string; what: string };
const COMMANDS: Cmd[] = [
  { cmd: "node -v", what: "Node.js 버전 확인" },
  { cmd: "npm -v", what: "npm 버전 확인" },
  { cmd: "npm i -g <패키지>", what: "도구를 전역(-g) 설치" },
  { cmd: "git --version", what: "Git 설치 확인" },
  { cmd: "git config", what: "이름·이메일 설정" },
  { cmd: "vercel", what: "미리보기 배포 → URL" },
  { cmd: "vercel --prod", what: "정식(프로덕션) 배포" },
];

export default function D54Cheatsheet() {
  return (
    <section data-scene="d54" data-act="마무리 · 완성" className="relative bg-ink text-bone">
      <Pin heights={4}>{(p) => <Stage p={p} />}</Pin>
    </section>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  /* 배경 */
  const glowO = useTransform(p, [0, 0.5, 1], [0.16, 0.36, 0.46]);
  const gridShift = useTransform(p, [0, 1], [0, -40]);

  /* 헤더 */
  const headO = useTransform(p, [0.02, 0.13], [0, 1]);
  const headY = useTransform(p, [0.02, 0.16], [40, 0]);

  /* 두 패널 컬럼 등장 */
  const colAO = useTransform(p, [0.16, 0.26], [0, 1]);
  const colAY = useTransform(p, [0.16, 0.28], [34, 0]);
  const colBO = useTransform(p, [0.24, 0.34], [0, 1]);
  const colBY = useTransform(p, [0.24, 0.36], [34, 0]);

  /* 푸터 한 줄 */
  const footO = useTransform(p, [0.86, 0.96], [0, 1]);
  const footY = useTransform(p, [0.86, 0.98], [22, 0]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* ── 배경 글로우 ── */}
      <motion.div aria-hidden style={{ opacity: glowO }} className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(54% 56% at 50% 42%, rgba(232,181,75,0.11), transparent 72%)" }}
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

      {/* ── 콘텐츠 ── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col justify-between gap-[clamp(1.6rem,3.5vh,3.2rem)] px-[clamp(2.5rem,6vw,8rem)] py-[clamp(4vh,5.5vh,7vh)]">
        {/* 헤더 */}
        <motion.header style={{ opacity: headO, y: headY }} className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Kicker>마무리 · 완성 / CHEATSHEET</Kicker>
            <h2 className="mt-5 font-display font-black leading-[1.1] text-bone text-[clamp(2.4rem,5vw,5rem)]">
              치트시트
            </h2>
          </div>
          <p className="text-balance-k font-display leading-[1.4] text-bone/70 text-[clamp(1.1rem,1.7vw,1.7rem)] md:max-w-[420px] md:text-right">
            <span className="whitespace-nowrap font-semibold text-bone/85">자주 쓰는 것만</span> 모았다.
          </p>
        </motion.header>

        {/* 2단 패널 */}
        <div className="grid flex-1 grid-cols-1 gap-[clamp(1.4rem,2.4vw,2.6rem)] lg:grid-cols-2">
          {/* 좌: 단축키 */}
          <motion.div style={{ opacity: colAO, y: colAY }} className="h-full">
            <Panel index={1} kind="단축키" sub="KEYBOARD SHORTCUTS · VS CODE">
              <div className="flex flex-1 flex-col justify-around gap-[clamp(0.7rem,1.3vh,1.1rem)]">
                {SHORTCUTS.map((s, i) => (
                  <ShortRow key={s.what} s={s} index={i} p={p} base={0.3} />
                ))}
              </div>
            </Panel>
          </motion.div>

          {/* 우: 명령어 */}
          <motion.div style={{ opacity: colBO, y: colBY }} className="h-full">
            <Panel index={2} kind="명령어" sub="TERMINAL COMMANDS">
              <div className="grid flex-1 grid-cols-1 content-around gap-[clamp(0.55rem,1vh,0.9rem)] sm:grid-cols-2">
                {COMMANDS.map((c, i) => (
                  <CmdChip key={c.cmd} c={c} index={i} p={p} base={0.4} />
                ))}
              </div>
            </Panel>
          </motion.div>
        </div>

        {/* 푸터 */}
        <motion.p
          style={{ opacity: footO, y: footY }}
          className="text-balance-k text-center font-display leading-relaxed text-bone/70 text-[clamp(1rem,1.4vw,1.4rem)]"
        >
          막히면 — 여기로 돌아온다. 이 한 장이면,{" "}
          <span className="whitespace-nowrap text-bone/85">처음부터 끝까지 다시 갈 수 있다.</span>
        </motion.p>
      </div>
    </div>
  );
}

/* ───────────────────────── 패널 카드 ───────────────────────── */
function Panel({
  index,
  kind,
  sub,
  children,
}: {
  index: number;
  kind: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-bone/12 bg-coal/70 px-[clamp(1.4rem,2vw,2.4rem)] py-[clamp(1.8rem,3vh,2.8rem)] backdrop-blur-sm">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[11px] tracking-[0.3em] text-bone/30">{String(index).padStart(2, "0")}</span>
        <h3 className="font-display font-black leading-tight text-bone text-[clamp(1.4rem,2vw,2.1rem)]">{kind}</h3>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.24em] text-bone/35 md:text-[11px]">{sub}</span>
      </div>
      <span className="mt-5 mb-6 h-px w-full bg-bone/12" />
      {children}
    </div>
  );
}

/* ───────────────────────── 단축키 행 (골드 키캡) ───────────────────────── */
function ShortRow({ s, index, p, base }: { s: Short; index: number; p: MotionValue<number>; base: number }) {
  const at = base + index * 0.07;
  const o = useTransform(p, [at, at + 0.08], [0, 1]);
  const x = useTransform(p, [at, at + 0.1], [-22, 0]);
  return (
    <motion.div style={{ opacity: o, x }} className="flex items-center gap-[clamp(0.8rem,1.4vw,1.4rem)]">
      <div className="flex shrink-0 items-center gap-1.5">
        {s.keys.map((k, i) => (
          <span key={k} className="flex items-center gap-1.5">
            {i > 0 ? <span className="font-mono text-bone/30 text-[clamp(0.8rem,1vw,1.05rem)]">+</span> : null}
            <Keycap label={k} />
          </span>
        ))}
      </div>
      <span className="text-bone/70 text-[clamp(0.92rem,1.25vw,1.3rem)]">{s.what}</span>
    </motion.div>
  );
}

/* 골드 키캡 */
function Keycap({ label }: { label: string }) {
  return (
    <span
      className="inline-flex min-w-[clamp(2rem,2.4vw,2.8rem)] items-center justify-center rounded-lg border border-gold/45 bg-gold/[0.08] px-[clamp(0.55rem,0.9vw,1rem)] py-[clamp(0.3rem,0.7vh,0.6rem)] font-mono font-bold leading-none text-gold text-[clamp(0.82rem,1.1vw,1.2rem)] shadow-[inset_0_-2px_0_rgba(232,181,75,0.28),0_2px_10px_rgba(232,181,75,0.12)]"
    >
      {label}
    </span>
  );
}

/* ───────────────────────── 명령어 칩 (모노 터미널) ───────────────────────── */
function CmdChip({ c, index, p, base }: { c: Cmd; index: number; p: MotionValue<number>; base: number }) {
  const at = base + index * 0.05;
  const o = useTransform(p, [at, at + 0.07], [0, 1]);
  const y = useTransform(p, [at, at + 0.09], [16, 0]);
  return (
    <motion.div
      style={{ opacity: o, y }}
      className="flex flex-col gap-1.5 rounded-xl border border-bone/12 bg-ink/60 px-[clamp(0.85rem,1.2vw,1.3rem)] py-[clamp(0.6rem,1vh,0.95rem)]"
    >
      <code className="flex items-center gap-2 font-mono leading-none text-[clamp(0.82rem,1.05vw,1.15rem)]">
        <span className="text-[#27C93F]">$</span>
        <span className="truncate text-bone">{c.cmd}</span>
      </code>
      <span className="font-body text-bone/70 text-[clamp(0.72rem,0.92vw,1rem)]">{c.what}</span>
    </motion.div>
  );
}
