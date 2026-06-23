import type { Metadata } from "next";
import ProgressHUD from "@/components/ui/ProgressHUD";

/* ===== 2강 · 전부, VS Code 안에서 — SaaS를 삼키는 AI (2026.07.01) ===== */

/* 다리 — 다시, 환경 */
import B01Recap from "@/components/scenes/v0701/B01_Recap";
import B02Promise from "@/components/scenes/v0701/B02_Promise";

/* 세팅 — 무에서 시작한다 */
import U01Nothing from "@/components/scenes/v0701/U01_Nothing";
import U02InstallVSCode from "@/components/scenes/v0701/U02_InstallVSCode";
import U03InstallCline from "@/components/scenes/v0701/U03_InstallCline";
import U04OpenRouter from "@/components/scenes/v0701/U04_OpenRouter";
import U05PickQwen from "@/components/scenes/v0701/U05_PickQwen";
import U06ClassKey from "@/components/scenes/v0701/U06_ClassKey";
import U07FirstChat from "@/components/scenes/v0701/U07_FirstChat";

/* 두 개의 무기 */
import W01TwoWeapons from "@/components/scenes/v0701/W01_TwoWeapons";
import W02Terminal from "@/components/scenes/v0701/W02_Terminal";
import W03Context from "@/components/scenes/v0701/W03_Context";
import W04Habit from "@/components/scenes/v0701/W04_Habit";

/* 30 사례 */
import C01ReportSummary from "@/components/scenes/v0701/C01_ReportSummary";
import C02MergePDF from "@/components/scenes/v0701/C02_MergePDF";
import C03CompressPDF from "@/components/scenes/v0701/C03_CompressPDF";
import C04TranslatePDF from "@/components/scenes/v0701/C04_TranslatePDF";
import C05ExcelClean from "@/components/scenes/v0701/C05_ExcelClean";
import C06AutoSort from "@/components/scenes/v0701/C06_AutoSort";
import C07SVGInfographic from "@/components/scenes/v0701/C07_SVGInfographic";
import C08HTMLDashboard from "@/components/scenes/v0701/C08_HTMLDashboard";
import C09Templatize from "@/components/scenes/v0701/C09_Templatize";
import C10Flowchart from "@/components/scenes/v0701/C10_Flowchart";
import C11Portfolio from "@/components/scenes/v0701/C11_Portfolio";
import C12Landing from "@/components/scenes/v0701/C12_Landing";
import C13ProductPage from "@/components/scenes/v0701/C13_ProductPage";
import C14ResumeWeb from "@/components/scenes/v0701/C14_ResumeWeb";
import C15YoutubeDL from "@/components/scenes/v0701/C15_YoutubeDL";
import C16Remotion from "@/components/scenes/v0701/C16_Remotion";
import C17ImageBatch from "@/components/scenes/v0701/C17_ImageBatch";
import C18Subtitle from "@/components/scenes/v0701/C18_Subtitle";
import C19Thumbnail from "@/components/scenes/v0701/C19_Thumbnail";
import C20ProductCrawl from "@/components/scenes/v0701/C20_ProductCrawl";
import C21PriceMonitor from "@/components/scenes/v0701/C21_PriceMonitor";
import C22KeywordScrape from "@/components/scenes/v0701/C22_KeywordScrape";
import C23ReviewSentiment from "@/components/scenes/v0701/C23_ReviewSentiment";
import C24SNSData from "@/components/scenes/v0701/C24_SNSData";
import C25MarketingReport from "@/components/scenes/v0701/C25_MarketingReport";
import C26BatchRename from "@/components/scenes/v0701/C26_BatchRename";
import C27ScriptAutomation from "@/components/scenes/v0701/C27_ScriptAutomation";
import C28AutoDocs from "@/components/scenes/v0701/C28_AutoDocs";
import C29ScreenshotBatch from "@/components/scenes/v0701/C29_ScreenshotBatch";
import C30MiniApp from "@/components/scenes/v0701/C30_MiniApp";

/* SaaS 죽음 종합 */
import T01UsedToPay from "@/components/scenes/v0701/T01_UsedToPay";
import T02Swallow from "@/components/scenes/v0701/T02_Swallow";

/* 마무리 */
import Z01Habit from "@/components/scenes/v0701/Z01_Habit";
import Z02Next from "@/components/scenes/v0701/Z02_Next";

export const metadata: Metadata = {
  title: "전부, VS Code 안에서 — 2강 (2026.07.01)",
  description:
    "맨손으로 VS Code에 AI를 심는 법, 그리고 마케터가 바로 써먹는 30가지 실전. SaaS를 삼키는 AI. 발표자 김주연.",
};

export default function Page0701() {
  return (
    <main className="relative">
      {/* 다리 — 다시, 환경 */}
      <B01Recap />
      <B02Promise />

      {/* 세팅 — 무에서 시작한다 */}
      <U01Nothing />
      <U02InstallVSCode />
      <U03InstallCline />
      <U04OpenRouter />
      <U05PickQwen />
      <U06ClassKey />
      <U07FirstChat />

      {/* 두 개의 무기 */}
      <W01TwoWeapons />
      <W02Terminal />
      <W03Context />
      <W04Habit />

      {/* 30 사례 — A 문서 */}
      <C01ReportSummary />
      <C02MergePDF />
      <C03CompressPDF />
      <C04TranslatePDF />
      <C05ExcelClean />
      <C06AutoSort />
      {/* B 시각화 */}
      <C07SVGInfographic />
      <C08HTMLDashboard />
      <C09Templatize />
      <C10Flowchart />
      {/* C 웹 */}
      <C11Portfolio />
      <C12Landing />
      <C13ProductPage />
      <C14ResumeWeb />
      {/* D 미디어 */}
      <C15YoutubeDL />
      <C16Remotion />
      <C17ImageBatch />
      <C18Subtitle />
      <C19Thumbnail />
      {/* E 데이터·크롤링 */}
      <C20ProductCrawl />
      <C21PriceMonitor />
      <C22KeywordScrape />
      <C23ReviewSentiment />
      <C24SNSData />
      <C25MarketingReport />
      {/* F 자동화 */}
      <C26BatchRename />
      <C27ScriptAutomation />
      <C28AutoDocs />
      <C29ScreenshotBatch />
      <C30MiniApp />

      {/* SaaS 죽음 종합 */}
      <T01UsedToPay />
      <T02Swallow />

      {/* 마무리 */}
      <Z01Habit />
      <Z02Next />

      <ProgressHUD />
    </main>
  );
}
