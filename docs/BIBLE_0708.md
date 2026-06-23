# BIBLE_0708.md — 3강 "0에서 1까지 — 개발환경 완전정복" 제작 바이블 (절대 기준)

완전 초심자(영유아·할배 할매도 따라 할 수준)가 **이 화면 하나만 보고** VS Code 설치부터
개발환경 세팅·첫 배포까지 전부 할 수 있게 만드는 강박적 튜토리얼 덱.
모든 팬아웃 에이전트는 이 문서 + 견본 파일을 먼저 정독하고 **자기 씬 1개만** 작성한다.
`docs/LAYOUT_BIBLE_0624.md`(16:9 레이아웃·모션)와 `docs/DESKTOP_BIBLE.md`(토큰)를 상속. 어기면 재작업.

---

## 0. 컨셉 — "0에서 1까지"

`/0624`(1강 인트로)·`/0701`(2강 실전 30)에 이은 **3강 = 실습 워크숍**. 라우트 `/0708`.
대상: VS Code가 뭔지도 모르는 완전 초심자. **OS = Windows 11 메인 + Mac은 다른 단계만 분기 카드.**
**API 키 = 선생님이 준 공용 수업용 키(sk-or-...) 붙여넣기 중심.**
범위 = 군더더기 없이 **필요한 전부**: VS Code · 한국어팩 · 필수 확장 전부(여는 법·검색어·설치) ·
Node.js · API 키 · 폴더 워크플로우 · 터미널 · 첫 작동 · **Git/GitHub(계정·커밋·푸시)** · **Vercel CLI 배포** · 트러블슈팅.

핵심 교육법(이게 이 덱의 정체성):
1. **실제 OS/앱 목업** — 다운로드 페이지·설치 마법사·OS 다이얼로그·우클릭 메뉴·VS Code 화면을 진짜처럼.
2. **정확한 클릭 지점에 빛나는 링(ClickRing)** — "여기를 누르세요"를 픽셀 단위로 가리킴.
3. **번호 매긴 마이크로 스텝** — 1·2·3… 그대로 따라만 하면 됨.
4. **"이렇게 보이면 성공"** 확인 + 막혔을 때 처방.
5. **빈틈 0** — 클릭/더블클릭 구분, 체크박스 하나, 다이얼로그 하나도 빠뜨리지 않는다.

톤: `/0624`·`/0701`과 100% 동일한 시네마틱 다크 + 골드. 한 씬 강조색 1개(클릭 타깃·성공만 골드).

---

## 1. 기술 규칙 (절대)
- 첫 줄 `"use client";`. 씬 루트는 `<section data-scene data-act>`(TutorialScene 엔진이 자동 처리).
- import 허용: `react`, `framer-motion`, `@/components/ui/*` **만**.
- Pin render-prop 내부 hook 직접 호출 금지 → 보조 컴포넌트(Stage/Mockup)로 분리.
- 렌더 중 `Math.random()`/`Date.now()`/인자없는 `new Date()` 금지 → 결정적 수식.
- TypeScript strict 통과. export 함수명·data-scene·data-act는 §매니페스트 정확히 그대로.
- 색 토큰만(text-bone/text-gold/bg-coal/border-bone/10/text-ember/text-haze 등). 터미널 초록 `#27C93F`, 신택스색은 BIBLE_0701과 동일.
- 한국어 헤드라인 max-w에 `ch` 금지(px/vw). 깨지면 안되는 구절 `whitespace-nowrap`. clamp() 타이포.
- 16:9 풀스크린 시원하게(중앙 쪼그라듦/한쪽 텅 빔 금지). 배경 글로우+그리드 패럴랙스 필수.
- 파일당 100~280줄.

---

## 2. 공유 컴포넌트 계약 (이미 구축됨 — 씬은 이걸 조립한다)

### `@/components/ui/TutorialScene.tsx` — 튜토리얼 씬 엔진 (씬은 이것만 렌더)
```ts
import type { MotionValue } from "framer-motion";
export type MockupRenderer = React.ComponentType<{ p: MotionValue<number>; reveal: MotionValue<number> }>;
export default function TutorialScene(props: {
  scene: string;                 // data-scene (예: "d08")
  act: string;                   // data-act (챕터 라벨, §매니페스트)
  chapter: string;               // 좌측 킥커(예: "설치 · VS CODE")
  step: number;                  // 전역 스텝 번호(1~56) — 크게 표시
  total?: number;                // 기본 56
  title: string;                 // 이번 단계 제목
  goal: string;                  // 한 줄 목표("이번 단계: …")
  steps: string[];               // 번호 매긴 마이크로 스텝(스크롤로 순차 점등)
  platform?: "win" | "mac" | "both"; // 우상단 배지(생략 가능)
  success?: string;              // "이렇게 보이면 성공" (골드)
  tip?: string;                  // 파란 팁 콜아웃(선택)
  warn?: string;                 // ember 경고 콜아웃(선택)
  Mockup: MockupRenderer;        // 우측 화면 목업
  heights?: number;              // Pin heights(기본 4)
}): JSX.Element
// 렌더: <section data-scene data-act> + Pin + 배경(글로우+그리드) + 2단 그리드 [좌 내러티브 | 우 Mockup].
// 좌: 챕터 킥커 → "STEP NN / 56"(골드 모노) → title(거대) → goal → 번호 스텝 리스트(각 골드 번호배지, reveal stagger)
//     → success(체크+골드) / tip(파랑) / warn(ember) 콜아웃.
// 우: <Mockup p reveal/>. (platform 배지는 Mockup 위.)
```

### `@/components/ui/ClickRing.tsx` — 클릭 지점 강조 (이 덱의 핵심)
```ts
import type { MotionValue } from "framer-motion";
export default function ClickRing(props: {
  x: number; y: number;          // 부모(relative) 기준 % 위치 (중심점)
  label?: string;                // "여기 클릭" 등 작은 라벨
  dir?: "up" | "down" | "left" | "right"; // 라벨/화살표 방향(기본 right)
  tone?: "gold" | "ember";       // 기본 gold
  size?: number;                 // 링 지름 px(기본 40)
  o?: MotionValue<number>;       // 등장 opacity(스크롤 동기, 생략 시 항상 보임)
}): JSX.Element
// 펄스하는 골드 링(animate-pulse-soft) + 손가락/커서 점 + 라벨 칩 + 가는 화살표. 부모는 relative 여야 함.
```

### 목업 툴킷 (전부 `@/components/ui/*`)
```ts
// BrowserMock.tsx — 브라우저 창(주소창 + 페이지 본문 슬롯). 다운로드 페이지·GitHub·Vercel·OpenRouter.
export default function BrowserMock(props: { url: string; children: React.ReactNode; className?: string }): JSX.Element
//   상단: 신호등 + 주소창(자물쇠+url) + 탭/북마크 느낌. 본문 = children.

// OsDialog.tsx — OS 모달 다이얼로그/설치 마법사 한 페이지. (UAC·신뢰·라이선스·마법사 단계)
export default function OsDialog(props: {
  title: string; os?: "win" | "mac";
  children: React.ReactNode;     // 본문(설명/체크박스 목록 등)
  buttons?: { label: string; primary?: boolean; ring?: boolean }[]; // 하단 버튼(ring=true면 ClickRing 표시는 씬이 부착)
  className?: string;
}): JSX.Element

// ContextMenu.tsx — 우클릭 메뉴(항목 리스트, 특정 항목 강조).
export default function ContextMenu(props: { items: { label: string; sub?: string; active?: boolean }[]; className?: string }): JSX.Element

// DesktopMock.tsx — 바탕화면(월페이퍼 라디얼 + 하단 작업표시줄/독). 폴더 생성·아이콘 배치용 children 슬롯.
export default function DesktopMock(props: { os?: "win" | "mac"; children?: React.ReactNode; className?: string }): JSX.Element

// VSCodeMock.tsx — VS Code 창(워크호스). view 로 어떤 화면인지 선택.
export type VSCodeView = "welcome" | "explorer" | "extensions" | "settings" | "source-control" | "editor";
export default function VSCodeMock(props: {
  title?: string;                // 타이틀바(예: "my-ai — VS Code")
  view: VSCodeView;
  activeIcon?: "explorer" | "search" | "git" | "run" | "extensions" | "cline"; // 활동바 강조 아이콘
  // view 별 데이터(옵셔널, 필요한 것만):
  tree?: { name: string; depth: number; active?: boolean; kind?: "folder" | "file" }[]; // explorer
  search?: string;               // extensions 검색어
  extResults?: { name: string; pub: string; installs?: string; rating?: string; installed?: boolean; active?: boolean }[]; // extensions 카드들
  terminalLines?: { p?: string; t: string; gold?: boolean }[]; // 하단 터미널(있으면 표시)
  children?: React.ReactNode;    // editor/settings/welcome 본문 커스텀
  className?: string;
}): JSX.Element
//   AppWindow 기반. 좌측 활동바(아이콘들, activeIcon 골드) + 사이드패널(view) + 본문/터미널. relative 컨테이너(ClickRing 부착 가능).
```

**씬 작성법(이게 전부다):**
```tsx
"use client";
import { MotionValue, motion, useTransform } from "framer-motion";
import TutorialScene from "@/components/ui/TutorialScene";
import BrowserMock from "@/components/ui/BrowserMock";
import ClickRing from "@/components/ui/ClickRing";

function Mockup({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 1], [0, 1]);
  const ringO = useTransform(reveal, [0.4, 0.7], [0, 1]);
  return (
    <motion.div style={{ opacity: o }} className="relative w-full max-w-[860px]">
      <BrowserMock url="code.visualstudio.com">{/* 페이지 목업 */}</BrowserMock>
      <ClickRing x={50} y={62} label="여기 클릭" o={ringO} />
    </motion.div>
  );
}
export default function D05DownloadPage() {
  return (
    <TutorialScene scene="d05" act="설치 · VS CODE" chapter="설치 · VS CODE" step={5}
      title="다운로드 페이지로" goal="공식 사이트에서 VS Code 받기"
      platform="both"
      steps={["주소창에 code.visualstudio.com 입력 후 Enter", "파란 'Download for Windows' 버튼을 한 번 클릭", "다운로드가 시작되면 잠시 기다린다"]}
      success="브라우저 하단/다운로드 폴더에 설치 파일이 생긴다"
      tip="Mac이면 버튼이 자동으로 'Download for Mac'으로 바뀐다"
      Mockup={Mockup} />
  );
}
```
- Mockup 컨테이너는 반드시 `relative`(ClickRing은 absolute). reveal 하위구간으로 화면→링→성공 순 stagger.
- 클릭 타깃은 **정확한 위치**에 ClickRing. 화면 안에 가두고 창 밖으로 삐지지 않게.

---

## 3. 목업 레시피 (씬마다 다른 화면 — 정확하고 사실적으로)
- **다운로드 페이지**: BrowserMock + 큰 파란/골드 다운로드 버튼 + 제품명. (VS Code/Node/Git/Vercel/GitHub)
- **설치 마법사**: OsDialog(win) 제목 "Visual Studio Code 설치" 등 + 본문(라이선스 라디오 / 경로 / **체크박스 목록**) + Back·Next·Install 버튼 + ClickRing.
- **UAC/신뢰**: OsDialog 작은 모달 + "예 / 아니오" 또는 "예, 작성자를 신뢰합니다".
- **우클릭 메뉴**: DesktopMock 또는 VSCodeMock 위에 ContextMenu(새로 만들기▸폴더 / Code로 열기 강조).
- **VS Code 화면**: VSCodeMock view 선택 — welcome(첫 실행), explorer(폴더 트리), extensions(검색+카드+Install), settings(Cline API), source-control(커밋), editor.
- **터미널**: VSCodeMock terminalLines (`$ node -v` → `v20.x.x` 골드 등). 명령은 정확하게.
- **체크리스트/표/치트시트**: 카드/표 그리드(클릭 타깃 없음).
- 텍스트 대비 text-bone/70+. 클릭 타깃·성공만 골드, 나머지 절제.

---

## 4. 매니페스트 (파일·data-scene·data-act·export·제목 — 정확히 이대로)
폴더: `components/scenes/v0708/`. 페이지: `app/0708/page.tsx`. 전역 step 번호 = 표의 순번.

### 준비 (data-act = `준비 · 시작 전`)
| # | 파일 | scene | export | 제목 |
|--|--|--|--|--|
|1|`D01_Cover.tsx`|d01|`D01Cover`|0에서 1까지 — 개발환경 완전정복 (표지/약속)|
|2|`D02_Ready.tsx`|d02|`D02Ready`|준비물 — 컴퓨터·인터넷·40분·마음가짐|
|3|`D03_Roadmap.tsx`|d03|`D03Roadmap`|오늘의 로드맵 — 설치할 8가지 한눈에|

### 설치 · VS CODE (data-act = `설치 · VS CODE`)
|4|`D04_WhatIsVSCode.tsx`|d04|`D04WhatIsVSCode`|VS Code가 뭔가 + 브라우저 열기|
|5|`D05_DownloadPage.tsx`|d05|`D05DownloadPage`|다운로드 페이지로 (Download 버튼)|
|6|`D06_RunInstaller.tsx`|d06|`D06RunInstaller`|받은 파일 찾기 + 실행|
|7|`D07_WizardOne.tsx`|d07|`D07WizardOne`|설치 마법사 ① UAC·라이선스·경로|
|8|`D08_WizardTwo.tsx`|d08|`D08WizardTwo`|설치 마법사 ② 추가 작업 체크박스(PATH·Code로 열기)|
|9|`D09_FirstLaunch.tsx`|d09|`D09FirstLaunch`|설치 완료 + 첫 실행|
|10|`D10_MacInstall.tsx`|d10|`D10MacInstall`|Mac 분기 — dmg→Applications→첫 실행|

### 첫 화면 · 한국어 (data-act = `첫 화면 · 한국어`)
|11|`D11_Tour.tsx`|d11|`D11Tour`|첫 화면 둘러보기 — 영역 이름표|
|12|`D12_OpenExtensions.tsx`|d12|`D12OpenExtensions`|확장 패널 여는 법|
|13|`D13_KoreanPack.tsx`|d13|`D13KoreanPack`|한국어 언어팩 설치|

### 폴더 · 작업공간 (data-act = `폴더 · 작업공간`)
|14|`D14_WhyFolder.tsx`|d14|`D14WhyFolder`|왜 폴더가 필요한가|
|15|`D15_MakeFolder.tsx`|d15|`D15MakeFolder`|바탕화면에 폴더 만들기 (우클릭→새폴더)|
|16|`D16_ClickVsDouble.tsx`|d16|`D16ClickVsDouble`|클릭 vs 더블클릭 — 완전 구분|
|17|`D17_OpenFolderMenu.tsx`|d17|`D17OpenFolderMenu`|폴더 열기 ① 파일→폴더 열기→선택|
|18|`D18_OpenFolderTrust.tsx`|d18|`D18OpenFolderTrust`|폴더 열기 ② 우클릭 Code로 + 신뢰 다이얼로그|
|19|`D19_ExplorerFile.tsx`|d19|`D19ExplorerFile`|탐색기 + 첫 파일 만들기 (파일/폴더 구분)|

### Node.js · 엔진 (data-act = `Node.js · 엔진`)
|20|`D20_WhatIsNode.tsx`|d20|`D20WhatIsNode`|Node.js가 뭔가 + 왜 필요|
|21|`D21_NodeDownload.tsx`|d21|`D21NodeDownload`|nodejs.org → LTS 다운로드|
|22|`D22_NodeWizard.tsx`|d22|`D22NodeWizard`|Node 설치 마법사 (PATH·Tools 체크박스)|
|23|`D23_OpenTerminal.tsx`|d23|`D23OpenTerminal`|터미널 여는 법 (Ctrl+\` / 메뉴)|
|24|`D24_VerifyNode.tsx`|d24|`D24VerifyNode`|node -v / npm -v 검증 + 안될 때|
|25|`D25_NodeMac.tsx`|d25|`D25NodeMac`|Mac 분기 — Node 설치(.pkg)|

### 확장 · 도구 장착 (data-act = `확장 · 도구 장착`)
|26|`D26_PickExtension.tsx`|d26|`D26PickExtension`|좋은 확장 고르는 법|
|27|`D27_InstallCline.tsx`|d27|`D27InstallCline`|Cline 설치|
|28|`D28_Prettier.tsx`|d28|`D28Prettier`|Prettier — 코드 자동 정렬|
|29|`D29_LiveServer.tsx`|d29|`D29LiveServer`|Live Server — HTML 미리보기|
|30|`D30_MoreExtensions.tsx`|d30|`D30MoreExtensions`|추천 확장 모음 (아이콘·Error Lens·Spell·Path)|
|31|`D31_ManageExtensions.tsx`|d31|`D31ManageExtensions`|확장 관리 — 사용/해제/제거|

### API 키 · AI 연결 (data-act = `API 키 · AI 연결`)
|32|`D32_WhatIsKey.tsx`|d32|`D32WhatIsKey`|API 키가 뭔가|
|33|`D33_CopyKey.tsx`|d33|`D33CopyKey`|공용 수업용 키 복사 (전체선택·복사)|
|34|`D34_OpenClineSettings.tsx`|d34|`D34OpenClineSettings`|Cline 설정 열기|
|35|`D35_PasteKey.tsx`|d35|`D35PasteKey`|Provider=OpenRouter + 키 붙여넣기|
|36|`D36_PickModel.tsx`|d36|`D36PickModel`|모델 선택 (Qwen3.7-plus)|
|37|`D37_OwnKey.tsx`|d37|`D37OwnKey`|각자 발급 경로(보조) + 키 보안|

### 첫 작동 · 테스트 (data-act = `첫 작동 · 테스트`)
|38|`D38_FirstCommand.tsx`|d38|`D38FirstCommand`|Cline에 첫 명령 입력|
|39|`D39_Approve.tsx`|d39|`D39Approve`|Cline 동작 이해 — Plan/Act·승인 버튼|
|40|`D40_Success.tsx`|d40|`D40Success`|성공 확인 — 파일 등장|

### Git · 백업과 협업 (data-act = `Git · 백업과 협업`)
|41|`D41_WhatIsGit.tsx`|d41|`D41WhatIsGit`|Git/GitHub가 뭔가|
|42|`D42_InstallGit.tsx`|d42|`D42InstallGit`|Git 설치 (git-scm.com) + git --version|
|43|`D43_GithubAccount.tsx`|d43|`D43GithubAccount`|GitHub 계정 만들기|
|44|`D44_GitConfig.tsx`|d44|`D44GitConfig`|git config (이름·이메일)|
|45|`D45_FirstCommit.tsx`|d45|`D45FirstCommit`|첫 커밋 (Source Control)|
|46|`D46_Push.tsx`|d46|`D46Push`|GitHub에 올리기 (Publish/Push)|

### Vercel · 세상에 공개 (data-act = `Vercel · 세상에 공개`)
|47|`D47_WhatIsVercel.tsx`|d47|`D47WhatIsVercel`|Vercel이 뭔가|
|48|`D48_VercelSignup.tsx`|d48|`D48VercelSignup`|Vercel 가입 (Continue with GitHub)|
|49|`D49_VercelCLI.tsx`|d49|`D49VercelCLI`|Vercel CLI 설치 (npm i -g vercel)|
|50|`D50_VercelLogin.tsx`|d50|`D50VercelLogin`|vercel login|
|51|`D51_Deploy.tsx`|d51|`D51Deploy`|배포 (vercel → URL → --prod)|

### 마무리 · 완성 (data-act = `마무리 · 완성`)
|52|`D52_Troubleshoot.tsx`|d52|`D52Troubleshoot`|자주 막히는 곳 — 트러블슈팅|
|53|`D53_WinMac.tsx`|d53|`D53WinMac`|Windows vs Mac 차이 요약|
|54|`D54_Cheatsheet.tsx`|d54|`D54Cheatsheet`|단축키·명령어 치트시트|
|55|`D55_Checklist.tsx`|d55|`D55Checklist`|최종 체크리스트 (8항목)|
|56|`D56_Finish.tsx`|d56|`D56Finish`|마무리 + 다음 예고 (FIN)|

(D01 표지·D56 피날레는 TutorialScene 대신 자체 선언형 Pin 씬으로 만들어도 됨 — N06/N07 패턴.)

---

## 5. EXEMPLAR (필독 견본)
- `components/scenes/v0708/D05_DownloadPage.tsx` (BrowserMock + ClickRing 정석)
- `components/scenes/v0708/D08_WizardTwo.tsx` (OsDialog 체크박스 마법사 + ClickRing)
- `components/scenes/v0708/D15_MakeFolder.tsx` (DesktopMock + ContextMenu + ClickRing)
- `components/scenes/v0708/D27_InstallCline.tsx` (VSCodeMock extensions view + ClickRing)
- 선언형(D01/D56 등)은 `components/scenes/v0624/N06_EditorAnalogy.tsx`·`N07_HundredPercent.tsx` 패턴.

---

## 6. 검수 통과 기준 (적대적 스크린샷 리뷰)
1. 1920×1080 16:9를 시원하게 채우는가(중앙 쪼그라듦/한쪽 텅 빔 = FAIL).
2. **초심자가 이 한 화면만 보고 그 단계를 실제로 따라 할 수 있는가** — 클릭 타깃이 정확한 위치에 ClickRing으로 강조됐는가, 번호 스텝이 명확한가.
3. 목업이 진짜 OS/앱처럼 보이는가. 텍스트/버튼/체크박스가 창 밖으로 삐지거나 잘리지 않는가.
4. 한국어 줄바꿈 안전, 저대비 없음(text-bone/70+), 골드 강조 1개 원칙(클릭/성공만).
5. 스크롤하면 화면→클릭링→성공 순으로 연출되는가(정적이면 FAIL). 콘솔 에러 0, tsc 0.
6. 단계 내용이 **정확**한가(실제 버튼명/메뉴명/명령어). 빈틈(빠진 클릭·다이얼로그) 없는가.
