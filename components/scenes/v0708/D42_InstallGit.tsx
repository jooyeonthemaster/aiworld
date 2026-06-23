"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import OsDialog from "@/components/ui/OsDialog";
import ClickRing from "@/components/ui/ClickRing";

/**
 * D42 — Git 설치 [OsDialog(win) 기본 에디터 선택 드롭다운 견본]
 * 본문: 'Choosing the default editor used by Git' + 드롭다운(VS Code, 골드).
 * 클릭 타깃 = 드롭다운(에디터 선택), 마무리 = [Next].
 */

/** 설치 마법사 '기본 에디터 선택' 페이지 본문 — props {reveal} 로 stagger */
function EditorStep({ reveal }: { reveal: MotionValue<number> }) {
  const headO = useTransform(reveal, [0.05, 0.22], [0, 1]);
  const descO = useTransform(reveal, [0.14, 0.3], [0, 1]);
  const selectO = useTransform(reveal, [0.26, 0.44], [0, 1]);
  const noteO = useTransform(reveal, [0.44, 0.6], [0, 1]);

  return (
    <div className="flex flex-col">
      <motion.p
        style={{ opacity: headO }}
        className="font-body text-[clamp(0.92rem,1.1vw,1.2rem)] font-semibold text-bone/85"
      >
        Choosing the default editor used by Git
      </motion.p>
      <motion.p
        style={{ opacity: descO }}
        className="mt-1 font-body text-[clamp(0.78rem,0.95vw,1rem)] leading-snug text-bone/70"
      >
        Which editor would you like Git to use?
      </motion.p>

      {/* 에디터 선택 드롭다운 (선택값 = VS Code, 골드 강조) */}
      <motion.div style={{ opacity: selectO }} className="mt-4">
        <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-bone/40 md:text-[11px]">
          Default editor
        </span>
        <div className="mt-1.5 flex items-center justify-between gap-3 rounded-md border border-gold/60 bg-gold/10 px-3.5 py-2.5 shadow-[0_0_22px_rgba(232,181,75,0.22)]">
          <span className="flex min-w-0 items-center gap-2.5">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 text-gold"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M16 3l4 2v14l-4 2-9-7 9-11z" />
              <path d="M16 3v18M7 12l9 7M7 12l9-7" />
            </svg>
            <span className="truncate font-body text-[clamp(0.82rem,0.98vw,1.05rem)] font-semibold text-gold">
              Use Visual Studio Code as Git&apos;s default editor
            </span>
          </span>
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0 text-gold/80"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </motion.div>

      <motion.p
        style={{ opacity: noteO }}
        className="mt-3 font-body text-[clamp(0.74rem,0.9vw,0.95rem)] leading-snug text-bone/65"
      >
        목록에서{" "}
        <span className="whitespace-nowrap font-semibold text-bone/70">
          &apos;Use Visual Studio Code as Git&apos;s default editor&apos;
        </span>
        {" "}를 고른다. (기본값은 Vim 이므로 꼭 바꿔주세요.)
      </motion.p>
    </div>
  );
}

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 0.18], [0, 1]);
  const ringO = useTransform(reveal, [0.5, 0.72], [0, 1]);

  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[820px]">
      <OsDialog
        title="Git Setup"
        os="win"
        buttons={[{ label: "Back" }, { label: "Next", ring: true }, { label: "Cancel" }]}
      >
        <EditorStep reveal={reveal} />
      </OsDialog>

      {/* 클릭 타깃 = 에디터 선택 드롭다운. 중심점은 셀 좌측 빈 영역에 두어 글자를 안 가림.
          Next 버튼은 OsDialog의 ring:true 자체 골드 글로우로 단일 강조(중복 ClickRing 제거). */}
      <ClickRing x={45} y={58} label="VS Code 선택" dir="up" o={ringO} />
    </motion.div>
  );
}

export default function D42InstallGit() {
  return (
    <TutorialScene
      scene="d42"
      act="Git · 백업과 협업"
      chapter="Git · 백업과 협업"
      step={42}
      total={56}
      title="Git 설치"
      goal="이번 단계: Git을 깐다"
      platform="win"
      steps={[
        "git-scm.com 접속 → Download for Windows",
        "설치 마법사는 대부분 [Next] 기본값으로 진행",
        "단, 기본 에디터 화면에선 'Use Visual Studio Code as Git's default editor' 선택",
        "[Install] → [Finish], 그리고 터미널에서 git --version 으로 확인",
      ]}
      success="git version 2.x.x 가 나오면 성공"
      Mockup={Mockup}
    />
  );
}
