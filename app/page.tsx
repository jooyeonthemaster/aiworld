import ProgressHUD from "@/components/ui/ProgressHUD";

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
import Scene23 from "@/components/scenes/S23_FableDrop";
import Scene24 from "@/components/scenes/S24_PriceOfPower";
import Scene25 from "@/components/scenes/S25_NoEscape";
import Scene26 from "@/components/scenes/S26_Turn";
import Scene27 from "@/components/scenes/S27_Steps";
import Scene28 from "@/components/scenes/S28_Summit";
import Scene29 from "@/components/scenes/S29_Echo";

export default function Page() {
  return (
    <main className="relative">
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
      <Scene24 />
      <Scene25 />

      {/* ACT 5 — 올라타는 법 */}
      <Scene26 />
      <Scene27 />

      {/* FINALE — 거인의 어깨 위에서 */}
      <Scene28 />
      <Scene29 />

      <ProgressHUD />
    </main>
  );
}
