"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import OsDialog from "@/components/ui/OsDialog";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D17 — 폴더 열기 ① 파일→폴더 열기→선택 [OsDialog 파일 탐색기 풍 견본]
 * 우측 목업: '폴더 선택' 다이얼로그 — 폴더 리스트(바탕화면 ▸ my-ai 선택 하이라이트) +
 * 하단 '선택됨: my-ai' + [폴더 선택]/[취소] 버튼. ClickRing: my-ai 항목(한 번 클릭) + 폴더 선택 버튼.
 */

type FolderRow = { name: string; selected?: boolean };
const FOLDERS: FolderRow[] = [
  { name: "다운로드" },
  { name: "문서" },
  { name: "사진" },
  { name: "my-ai", selected: true },
  { name: "새 폴더" },
];

function FolderIcon({ active }: { active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 shrink-0 ${active ? "text-gold" : "text-bone/55"}`}
      fill="currentColor"
      aria-hidden
    >
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" opacity="0.9" />
    </svg>
  );
}

function FolderItem({ row, i, reveal }: { row: FolderRow; i: number; reveal: MotionValue<number> }) {
  const at = 0.22 + i * 0.05;
  const o = useTransform(reveal, [at, at + 0.1], [0, 1]);
  return (
    <motion.div
      style={{ opacity: o }}
      className={`flex items-center gap-2.5 rounded-md px-2.5 py-2.5 ${
        row.selected ? "border border-gold/45 bg-gold/15" : "border border-transparent"
      }`}
    >
      <FolderIcon active={row.selected} />
      <span
        className={`text-balance-k text-[clamp(0.82rem,0.96vw,1.02rem)] leading-snug ${
          row.selected ? "font-bold text-bone" : "text-bone/70"
        }`}
      >
        {row.name}
      </span>
      {row.selected ? (
        <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.16em] text-bone/45">선택됨</span>
      ) : null}
    </motion.div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.2], [0, 1]);
  const fieldO = useTransform(reveal, [0.5, 0.66], [0, 1]);
  const itemRingO = useTransform(reveal, [0.52, 0.74], [0, 1]);
  const btnRingO = useTransform(reveal, [0.78, 0.96], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[900px]">
      <OsDialog
        title="폴더 선택"
        os="win"
        buttons={[{ label: "폴더 선택", primary: true }, { label: "취소" }]}
      >
        {/* 주소 경로(브레드크럼) */}
        <div className="flex items-center gap-1.5 rounded-md border border-bone/12 bg-bone/[0.04] px-3 py-2 font-mono text-[clamp(0.72rem,0.88vw,0.92rem)] text-bone/70">
          <span>내 PC</span>
          <span className="text-bone/35">›</span>
          <span>바탕 화면</span>
          <span className="text-bone/35">›</span>
          <span className="font-bold text-bone/70">my-ai</span>
        </div>

        {/* 폴더 리스트 */}
        <div className="mt-3 flex flex-col gap-0.5 rounded-md border border-bone/10 bg-bone/[0.02] p-1.5">
          {FOLDERS.map((row, i) => (
            <FolderItem key={i} row={row} i={i} reveal={reveal} />
          ))}
        </div>

        {/* 선택된 폴더 이름 입력칸 */}
        <motion.div style={{ opacity: fieldO }} className="mt-3 flex items-center gap-2.5">
          <span className="shrink-0 font-body text-[clamp(0.76rem,0.9vw,0.96rem)] text-bone/70">폴더:</span>
          <span className="flex-1 truncate rounded-md border border-bone/12 bg-bone/[0.04] px-3 py-1.5 font-mono text-[clamp(0.78rem,0.92vw,0.98rem)] text-bone">
            my-ai
          </span>
        </motion.div>
      </OsDialog>

      {/* my-ai 항목 — 한 번 클릭(선택): 폴더 아이콘+이름 정중앙 */}
      <motion.div style={{ opacity: itemRingO }}>
        <ClickRing x={11} y={58} label="한 번 클릭" dir="right" />
      </motion.div>
      {/* 폴더 선택 버튼 — 골드 버튼 중심 */}
      <motion.div style={{ opacity: btnRingO }}>
        <ClickRing x={80} y={92} label="폴더 선택" dir="up" />
      </motion.div>
    </motion.div>
  );
}

export default function D17OpenFolderMenu() {
  return (
    <TutorialScene
      scene="d17"
      act="폴더 · 작업공간"
      chapter="폴더 · 작업공간"
      step={17}
      total={56}
      title="폴더 열기 ① 메뉴"
      goal="이번 단계: VS Code에서 만든 폴더 열기"
      platform="both"
      steps={[
        "VS Code 상단 메뉴 [파일] → [폴더 열기...] 클릭",
        "(또는 시작 화면의 [폴더 열기] 버튼)",
        "탐색기 창에서 바탕화면의 my-ai 폴더를 한 번 클릭(선택)",
        "오른쪽 아래 [폴더 선택] 버튼을 클릭",
      ]}
      success="왼쪽 탐색기에 my-ai 폴더가 열린다"
      warn="폴더를 '두 번' 클릭하면 그 안으로 들어가 버린다 — '한 번' 클릭으로 선택만!"
      Mockup={Mockup}
    />
  );
}
