import type { Metadata } from "next";
import ProgressHUD from "@/components/ui/ProgressHUD";

/* ===== 막 0 · OPENING — 김주연 (6/24 신규) ===== */
import I01ColdOpen from "@/components/scenes/v0624/I01_ColdOpen";
import I02Who from "@/components/scenes/v0624/I02_Who";
import I03Neander from "@/components/scenes/v0624/I03_Neander";
import I04PerfumeAI from "@/components/scenes/v0624/I04_PerfumeAI";
import I05HowWeRun from "@/components/scenes/v0624/I05_HowWeRun";
import I06Declare from "@/components/scenes/v0624/I06_Declare";

/* ===== 본론 (기존 씬 재사용) ===== */
import Scene01 from "@/components/scenes/S01_Hero";
import Scene02 from "@/components/scenes/S02_QuestionOne";
import Scene03 from "@/components/scenes/S03_QuestionTwo";
import Scene04 from "@/components/scenes/S04_ChatGPTArrives";
import Scene05 from "@/components/scenes/S05_WeLaughed";
import Scene06 from "@/components/scenes/S06_Acceleration";
import Scene07 from "@/components/scenes/S07_TalentFlow";
import Scene08 from "@/components/scenes/S08_PowerWar";
import Scene09 from "@/components/scenes/S09_FlipAnalogy";
import Scene10 from "@/components/scenes/S10_TestBulb";
import Scene11 from "@/components/scenes/S11_TestInternet";
import Scene12 from "@/components/scenes/S12_TestSmartphone";
import Scene13 from "@/components/scenes/S13_ButAI";
import Scene14 from "@/components/scenes/S14_DisruptionGrid";
import Scene15 from "@/components/scenes/S15_Divergence";
import Scene16 from "@/components/scenes/S16_CompoundGap";
import Scene17 from "@/components/scenes/S17_Dossier";
import Scene18 from "@/components/scenes/S18_Origin";
import Scene19 from "@/components/scenes/S19_Refusal";
import Scene20 from "@/components/scenes/S20_Lawsuit";
import Scene21 from "@/components/scenes/S21_Mythos";
import Scene22 from "@/components/scenes/S22_Vault";
/* S23 은 6/24 시제 조정본, 그리고 그 직후 차단 사건(S23B) 신규 삽입 */
import Scene23 from "@/components/scenes/v0624/S23_FableDrop_0624";
import Scene23B from "@/components/scenes/v0624/S23B_FableBan";
import Scene24 from "@/components/scenes/S24_PriceOfPower";
import Scene25 from "@/components/scenes/S25_NoEscape";
import Scene26 from "@/components/scenes/S26_Turn";
import Scene26B from "@/components/scenes/S26B_AnyPath";
import Scene27 from "@/components/scenes/S27_Steps";
/* ACT 6 — 본질: 코드 에디터 (6/24 신규) */
import N01Compete from "@/components/scenes/v0624/N01_Compete";
import N02ToolDeath from "@/components/scenes/v0624/N02_ToolDeath";
import N03Coding from "@/components/scenes/v0624/N03_Coding";
import N04NotTools from "@/components/scenes/v0624/N04_NotTools";
import N05Environment from "@/components/scenes/v0624/N05_Environment";
import N06EditorAnalogy from "@/components/scenes/v0624/N06_EditorAnalogy";
import N07HundredPercent from "@/components/scenes/v0624/N07_HundredPercent";
import Scene28 from "@/components/scenes/S28_Summit";
/* S29 는 6/24 크레딧 조정본 */
import Scene29 from "@/components/scenes/v0624/S29_Echo_0624";

export const metadata: Metadata = {
  title: "거인의 어깨 위에서 — 취준생 에디션 (2026.06.24)",
  description:
    "AI 마케터를 준비하는 당신에게. 발표자 김주연 — (주)네안데르 · 일해라컴퍼니.",
};

export default function Page0624() {
  return (
    <main className="relative">
      {/* 막 0 — OPENING · 김주연 */}
      <I01ColdOpen />
      <I02Who />
      <I03Neander />
      <I04PerfumeAI />
      <I05HowWeRun />
      <I06Declare />

      {/* PROLOGUE — 두 가지 질문 */}
      <Scene01 />
      <Scene02 />
      <Scene03 />

      {/* ACT 1 — 3년 전, 우리는 웃었다 */}
      <Scene04 />
      <Scene05 />
      <Scene06 />
      <Scene07 />
      <Scene08 />

      {/* ACT 2 — 다른 종류의 발명 */}
      <Scene09 />
      <Scene10 />
      <Scene11 />
      <Scene12 />
      <Scene13 />
      <Scene14 />

      {/* ACT 3 — 보이지 않는 격차 */}
      <Scene15 />
      <Scene16 />

      {/* ACT 4 — 어떤 회사 이야기 */}
      <Scene17 />
      <Scene18 />
      <Scene19 />
      <Scene20 />
      <Scene21 />
      <Scene22 />
      <Scene23 />
      {/* ACT 4 — Fable 차단 사건 (6/24 신규) */}
      <Scene23B />
      <Scene24 />
      <Scene25 />

      {/* ACT 5 — 올라타는 법 */}
      <Scene26 />
      <Scene26B />
      <Scene27 />

      {/* ACT 6 — 본질: 코드 에디터 (6/24 신규) */}
      <N01Compete />
      <N02ToolDeath />
      <N03Coding />
      <N04NotTools />
      <N05Environment />
      <N06EditorAnalogy />
      <N07HundredPercent />

      {/* FINALE — 거인의 어깨 위에서 */}
      <Scene28 />
      <Scene29 />

      <ProgressHUD />
    </main>
  );
}
