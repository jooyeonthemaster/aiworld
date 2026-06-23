"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import OsDialog from "@/components/ui/OsDialog";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D07 — 설치 마법사 ① 라이선스·경로 [OsDialog 라디오 견본]
 */

// 라이선스 텍스트 박스 안의 회색 줄들(결정적 폭) — 실제 약관처럼 보이게.
const LINE_W = [96, 88, 100, 74, 92, 81, 97, 68, 90, 84];

function LicenseLines({ reveal }: { reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0.18, 0.34], [0, 1]);
  return (
    <motion.div
      style={{ opacity: o }}
      className="mt-3 h-[clamp(5.5rem,11vh,8.5rem)] overflow-hidden rounded-md border border-bone/12 bg-bone/[0.03] px-3.5 py-3"
    >
      <p className="mb-2 font-body text-[clamp(0.74rem,0.88vw,0.92rem)] font-semibold text-bone/70">
        Microsoft 소프트웨어 사용권 계약
      </p>
      <div className="flex flex-col gap-[7px]">
        {LINE_W.map((w, i) => (
          <span
            key={i}
            className="block h-[6px] rounded-full bg-bone/12"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function RadioRow({
  label,
  selected,
  reveal,
  at,
  ring,
}: {
  label: string;
  selected: boolean;
  reveal: MotionValue<number>;
  at: number;
  ring?: MotionValue<number>;
}) {
  const o = useTransform(reveal, [at, at + 0.1], [0, 1]);
  return (
    <motion.div style={{ opacity: o }} className="relative flex items-center gap-2.5 py-1.5">
      <span
        className={`relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected ? "border-gold" : "border-bone/30"
        }`}
      >
        {selected ? <span className="h-2.5 w-2.5 rounded-full bg-gold" /> : null}
        {/* 라디오 원 정중앙에 고정 — 다이얼로그 폭이 바뀌어도 안 흔들림 */}
        {ring ? <ClickRing x={50} y={50} label="동의 선택" dir="up" o={ring} /> : null}
      </span>
      <span
        className={`font-body text-[clamp(0.86rem,1.02vw,1.08rem)] leading-snug ${
          selected ? "font-semibold text-bone/90" : "text-bone/55"
        }`}
      >
        {label}
      </span>
    </motion.div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.16], [0, 1]);
  const radioRingO = useTransform(reveal, [0.58, 0.78], [0, 1]);
  const btnRingO = useTransform(reveal, [0.82, 1], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[880px]">
      <OsDialog
        title="Microsoft Visual Studio Code 설치"
        os="win"
        buttons={[{ label: "< 뒤로" }, { label: "다음 >" }, { label: "취소" }]}
      >
        <p className="font-body text-[clamp(0.96rem,1.15vw,1.28rem)] font-semibold text-bone/90">
          사용권 계약
        </p>
        <p className="mt-1 font-body text-[clamp(0.82rem,0.98vw,1.04rem)] text-bone/70">
          계속하기 전에 다음의 중요 정보를 읽어 주십시오.
        </p>

        <LicenseLines reveal={reveal} />

        <div className="mt-5 flex flex-col">
          {/* '동의합니다' 라디오 — 클릭 링은 라디오 원에 직접 고정 */}
          <RadioRow label="동의합니다" selected reveal={reveal} at={0.4} ring={radioRingO} />
          <RadioRow label="동의하지 않습니다" selected={false} reveal={reveal} at={0.48} />
        </div>
      </OsDialog>

      {/* '다음 >' 버튼 클릭 타깃 — OsDialog 내장 halo 끄고 이 링 하나로 단일 강조 */}
      <motion.div style={{ opacity: btnRingO }}>
        <ClickRing x={81} y={92} label="다음" dir="down" />
      </motion.div>
    </motion.div>
  );
}

export default function D07WizardOne() {
  return (
    <TutorialScene
      scene="d07"
      act="설치 · VS CODE"
      chapter="설치 · VS CODE"
      step={7}
      total={56}
      title="설치 마법사 ① 라이선스·경로"
      goal="이번 단계: 라이선스 동의하고 다음으로"
      platform="win"
      steps={[
        "'사용권 계약' 화면에서 '동의합니다'를 선택",
        "[다음 >] 클릭",
        "'설치 위치' 화면은 그대로 두고 [다음 >] 클릭",
      ]}
      success="'추가 작업 선택' 화면으로 넘어간다(다음 단계)"
      Mockup={Mockup}
    />
  );
}
