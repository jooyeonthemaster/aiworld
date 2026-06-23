"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import OsDialog from "@/components/ui/OsDialog";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D08 — 설치 마법사 ② 추가 작업 체크박스 [OsDialog 견본]
 */
type Box = { label: string; checked: boolean; must?: boolean };
const BOXES: Box[] = [
  { label: "바탕 화면에 바로 가기 만들기", checked: true },
  { label: "'Code(으)로 열기' 작업을 파일 마우스 오른쪽 메뉴에 추가", checked: true, must: true },
  { label: "'Code(으)로 열기' 작업을 폴더 마우스 오른쪽 메뉴에 추가", checked: true, must: true },
  { label: "지원되는 파일 형식의 편집기로 Code 등록", checked: true },
  { label: "PATH에 추가 (다시 시작 후 사용 가능)", checked: true, must: true },
];

function CheckRow({ box, i, reveal }: { box: Box; i: number; reveal: MotionValue<number> }) {
  const at = 0.2 + i * 0.06;
  const o = useTransform(reveal, [at, at + 0.1], [0, 1]);
  return (
    <motion.div style={{ opacity: o }} className="flex items-center gap-2.5 py-1">
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${
          box.checked ? "border-gold bg-gold" : "border-bone/30 bg-transparent"
        }`}
      >
        {box.checked ? (
          <svg viewBox="0 0 24 24" className="h-3 w-3 text-ink" fill="none" stroke="currentColor" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 13l4 4L19 7" />
          </svg>
        ) : null}
      </span>
      <span className={`text-balance-k text-[clamp(0.78rem,0.92vw,0.98rem)] leading-snug ${box.must ? "text-bone/90" : "text-bone/70"}`}>
        {box.label}
        {box.must ? <span className="ml-2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] text-gold">꼭 체크</span> : null}
      </span>
    </motion.div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.2], [0, 1]);
  const ringO = useTransform(reveal, [0.55, 0.8], [0, 1]);
  const btnRingO = useTransform(reveal, [0.82, 1], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[760px]">
      <OsDialog
        title="Microsoft Visual Studio Code 설치"
        os="win"
        buttons={[{ label: "< 뒤로" }, { label: "다음 >", primary: true }, { label: "취소" }]}
      >
        <p className="font-body text-[clamp(0.92rem,1.1vw,1.2rem)] font-semibold text-bone/85">추가 작업 선택</p>
        <p className="mt-1 font-body text-[clamp(0.8rem,0.95vw,1rem)] text-bone/70">설치 중 수행할 추가 작업을 선택한 후 [다음]을 클릭하세요.</p>
        <div className="mt-4 flex flex-col">
          {BOXES.map((b, i) => (
            <CheckRow key={i} box={b} i={i} reveal={reveal} />
          ))}
        </div>
      </OsDialog>
      <ClickRing x={6} y={50} label="이 3개 체크 확인" dir="left" o={ringO} />
      <motion.div style={{ opacity: btnRingO }}>
        <ClickRing x={82} y={91} label="다음" dir="up" />
      </motion.div>
    </motion.div>
  );
}

export default function D08WizardTwo() {
  return (
    <TutorialScene
      scene="d08"
      act="설치 · VS CODE"
      chapter="설치 · VS CODE"
      step={8}
      title="추가 작업 선택 — 체크박스"
      goal="이번 단계: 나중에 편해지는 체크박스를 켠다"
      platform="win"
      steps={[
        "'추가 작업 선택' 화면이 나온다",
        "'Code(으)로 열기' 두 개(파일·폴더)를 꼭 체크한다",
        "'PATH에 추가'도 켜져 있는지 확인한다",
        "[다음 >] 버튼을 클릭한다",
      ]}
      success="체크가 모두 켜진 채 다음 화면(설치)으로 넘어간다"
      tip="'Code로 열기'를 켜두면, 나중에 폴더를 우클릭만 해도 VS Code로 열 수 있다"
      Mockup={Mockup}
    />
  );
}
