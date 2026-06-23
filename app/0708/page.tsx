import type { Metadata } from "next";
import ProgressHUD from "@/components/ui/ProgressHUD";

/* ===== 3강 · 0에서 1까지 — 개발환경 완전정복 (2026.07.08) ===== */
import D01Cover from "@/components/scenes/v0708/D01_Cover";
import D02Ready from "@/components/scenes/v0708/D02_Ready";
import D03Roadmap from "@/components/scenes/v0708/D03_Roadmap";
import D04WhatIsVSCode from "@/components/scenes/v0708/D04_WhatIsVSCode";
import D05DownloadPage from "@/components/scenes/v0708/D05_DownloadPage";
import D06RunInstaller from "@/components/scenes/v0708/D06_RunInstaller";
import D07WizardOne from "@/components/scenes/v0708/D07_WizardOne";
import D08WizardTwo from "@/components/scenes/v0708/D08_WizardTwo";
import D09FirstLaunch from "@/components/scenes/v0708/D09_FirstLaunch";
import D10MacInstall from "@/components/scenes/v0708/D10_MacInstall";
import D11Tour from "@/components/scenes/v0708/D11_Tour";
import D12OpenExtensions from "@/components/scenes/v0708/D12_OpenExtensions";
import D13KoreanPack from "@/components/scenes/v0708/D13_KoreanPack";
import D14WhyFolder from "@/components/scenes/v0708/D14_WhyFolder";
import D15MakeFolder from "@/components/scenes/v0708/D15_MakeFolder";
import D16ClickVsDouble from "@/components/scenes/v0708/D16_ClickVsDouble";
import D17OpenFolderMenu from "@/components/scenes/v0708/D17_OpenFolderMenu";
import D18OpenFolderTrust from "@/components/scenes/v0708/D18_OpenFolderTrust";
import D19ExplorerFile from "@/components/scenes/v0708/D19_ExplorerFile";
import D20WhatIsNode from "@/components/scenes/v0708/D20_WhatIsNode";
import D21NodeDownload from "@/components/scenes/v0708/D21_NodeDownload";
import D22NodeWizard from "@/components/scenes/v0708/D22_NodeWizard";
import D23OpenTerminal from "@/components/scenes/v0708/D23_OpenTerminal";
import D24VerifyNode from "@/components/scenes/v0708/D24_VerifyNode";
import D25NodeMac from "@/components/scenes/v0708/D25_NodeMac";
import D26PickExtension from "@/components/scenes/v0708/D26_PickExtension";
import D27InstallCline from "@/components/scenes/v0708/D27_InstallCline";
import D28Prettier from "@/components/scenes/v0708/D28_Prettier";
import D29LiveServer from "@/components/scenes/v0708/D29_LiveServer";
import D30MoreExtensions from "@/components/scenes/v0708/D30_MoreExtensions";
import D31ManageExtensions from "@/components/scenes/v0708/D31_ManageExtensions";
import D32WhatIsKey from "@/components/scenes/v0708/D32_WhatIsKey";
import D33CopyKey from "@/components/scenes/v0708/D33_CopyKey";
import D34OpenClineSettings from "@/components/scenes/v0708/D34_OpenClineSettings";
import D35PasteKey from "@/components/scenes/v0708/D35_PasteKey";
import D36PickModel from "@/components/scenes/v0708/D36_PickModel";
import D37OwnKey from "@/components/scenes/v0708/D37_OwnKey";
import D38FirstCommand from "@/components/scenes/v0708/D38_FirstCommand";
import D39Approve from "@/components/scenes/v0708/D39_Approve";
import D40Success from "@/components/scenes/v0708/D40_Success";
import D41WhatIsGit from "@/components/scenes/v0708/D41_WhatIsGit";
import D42InstallGit from "@/components/scenes/v0708/D42_InstallGit";
import D43GithubAccount from "@/components/scenes/v0708/D43_GithubAccount";
import D44GitConfig from "@/components/scenes/v0708/D44_GitConfig";
import D45FirstCommit from "@/components/scenes/v0708/D45_FirstCommit";
import D46Push from "@/components/scenes/v0708/D46_Push";
import D47WhatIsVercel from "@/components/scenes/v0708/D47_WhatIsVercel";
import D48VercelSignup from "@/components/scenes/v0708/D48_VercelSignup";
import D49VercelCLI from "@/components/scenes/v0708/D49_VercelCLI";
import D50VercelLogin from "@/components/scenes/v0708/D50_VercelLogin";
import D51Deploy from "@/components/scenes/v0708/D51_Deploy";
import D52Troubleshoot from "@/components/scenes/v0708/D52_Troubleshoot";
import D53WinMac from "@/components/scenes/v0708/D53_WinMac";
import D54Cheatsheet from "@/components/scenes/v0708/D54_Cheatsheet";
import D55Checklist from "@/components/scenes/v0708/D55_Checklist";
import D56Finish from "@/components/scenes/v0708/D56_Finish";

export const metadata: Metadata = {
  title: "0에서 1까지 — 개발환경 완전정복 · 3강 (2026.07.08)",
  description:
    "VS Code 설치부터 확장·Node.js·API키·폴더·Git·Vercel 배포까지, 완전 초심자용 한 단계도 빠짐없는 셋업 가이드.",
};

export default function Page0708() {
  return (
    <main className="relative">
      {/* 준비 */}
      <D01Cover />
      <D02Ready />
      <D03Roadmap />
      {/* 설치 · VS CODE */}
      <D04WhatIsVSCode />
      <D05DownloadPage />
      <D06RunInstaller />
      <D07WizardOne />
      <D08WizardTwo />
      <D09FirstLaunch />
      <D10MacInstall />
      {/* 첫 화면 · 한국어 */}
      <D11Tour />
      <D12OpenExtensions />
      <D13KoreanPack />
      {/* 폴더 */}
      <D14WhyFolder />
      <D15MakeFolder />
      <D16ClickVsDouble />
      <D17OpenFolderMenu />
      <D18OpenFolderTrust />
      <D19ExplorerFile />
      {/* Node.js */}
      <D20WhatIsNode />
      <D21NodeDownload />
      <D22NodeWizard />
      <D23OpenTerminal />
      <D24VerifyNode />
      <D25NodeMac />
      {/* 확장 */}
      <D26PickExtension />
      <D27InstallCline />
      <D28Prettier />
      <D29LiveServer />
      <D30MoreExtensions />
      <D31ManageExtensions />
      {/* API 키 */}
      <D32WhatIsKey />
      <D33CopyKey />
      <D34OpenClineSettings />
      <D35PasteKey />
      <D36PickModel />
      <D37OwnKey />
      {/* 첫 작동 */}
      <D38FirstCommand />
      <D39Approve />
      <D40Success />
      {/* Git */}
      <D41WhatIsGit />
      <D42InstallGit />
      <D43GithubAccount />
      <D44GitConfig />
      <D45FirstCommit />
      <D46Push />
      {/* Vercel */}
      <D47WhatIsVercel />
      <D48VercelSignup />
      <D49VercelCLI />
      <D50VercelLogin />
      <D51Deploy />
      {/* 마무리 */}
      <D52Troubleshoot />
      <D53WinMac />
      <D54Cheatsheet />
      <D55Checklist />
      <D56Finish />

      <ProgressHUD />
    </main>
  );
}
