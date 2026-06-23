# BIBLE_0701.md — 2강 "전부, VS Code 안에서" 제작 바이블 (절대 기준)

이 문서는 `/0701` (2강) 신규 씬 제작의 **단일 진실 공급원**이다. 모든 팬아웃 에이전트는
이 문서 + 견본 파일(아래 §EXEMPLAR)을 먼저 읽고 **자기 씬 1개만** 작성한다.
`docs/LAYOUT_BIBLE_0624.md`(16:9 레이아웃·스크롤 모션 규칙)와 `docs/DESKTOP_BIBLE.md`의
디자인 토큰 규칙을 **그대로 상속**한다. 어기면 재작업 대상이다.

---

## 0. 컨셉 — "전부, VS Code 안에서 — SaaS를 삼키는 AI"

`/0624`(1강)는 *"무슨 모델이 좋은지가 아니라 이 '환경'을 다루는 법. 지금부터, 본격적으로
시작한다"* 로 끝났다. **2강은 그 약속의 실현이다.** 비개발자(문과 마케터)에게:
1. **무(無)에서** VS Code에 AI(Cline + OpenRouter Qwen3.7-plus, 공용 수업용 API키, 로그인 없이)를 심는 전 과정
2. **두 개의 무기**: ① 터미널(AI가 네 컴퓨터에서 직접 실행) ② 폴더 전체 맥락(30p PDF가 안 잘린다)
3. **30가지 실전 사례** — 마케터가 바로 써먹는 것들

**관통하는 한 줄기(THESIS)**: 모든 사례는 *"예전엔 돈 내던 별도 프로그램(SaaS) → 이제 VS Code
채팅 한 줄"*. AI가 SaaS를 통째로 VS Code 안으로 빨아들이고 있다. 이 대비를 **모든 사례 씬에서**
보여준다(`oldTool` = 예전에 쓰던 유료 프로그램/외주 비용).

톤: `/0624`와 100% 동일한 시네마틱 다크 + 골드. 한 씬 강조색 1개. 어워드급.

---

## 1. 기술 규칙 (절대)

- 첫 줄 `"use client";`
- 씬 루트는 `<section data-scene="..." data-act="...">` (data-scene 씬당 정확히 1개). **CaseScene/SetupScene 엔진이 자동 처리** — 사례 씬은 직접 안 씀.
- import 허용: `react`, `framer-motion`, `@/components/ui/*` **만**. (그 외 패키지·로컬경로 금지)
- Pin render-prop 내부에서 **hook 직접 호출 금지** → 내부 보조 컴포넌트(`Stage`/`Result`)로 분리.
- 렌더 중 `Math.random()`/`Date.now()`/인자없는 `new Date()` **금지** → 결정적 수식(`(i*37)%89` 등).
- TypeScript **strict 통과**. `any` 지양, 모든 props 타입 명시.
- 파일당 80~260줄 권장. export 함수명·data-scene·data-act는 아래 §매니페스트 **정확히 그대로**.
- 카피는 한국어. 깨지면 안 되는 구절은 `whitespace-nowrap`. 헤드라인 `max-w`에 `ch` 금지(→ px/vw).
- 색: 토큰만 사용(`text-bone`, `text-gold`, `bg-coal`, `border-bone/10`, `text-ember` …). 코드 신택스 색:
  키워드 `#C792EA`, 함수 `#82AAFF`, 문자열 `#C3E88D`, 숫자 `#F78C6C`, 주석 `text-bone/30`.

---

## 2. 공유 컴포넌트 계약 (이미 구축됨 — 사례 씬은 이걸 쓴다)

### `@/components/ui/AppWindow.tsx` — 범용 창 크롬
```ts
export default function AppWindow(props: {
  title: string;                 // 창 타이틀(예: "neander-campaign — VS Code")
  icon?: "vscode" | "cline" | "browser" | "folder" | "settings" | "terminal";
  accent?: boolean;              // true면 보더 골드 강조
  rightLabel?: string;          // 우상단 작은 라벨(선택)
  className?: string;
  children: React.ReactNode;     // 창 본문
}): JSX.Element
// 신호등(ember/gold/jade) 3개 + 타이틀바 + 둥근 보더 + 큰 그림자. 본문은 children.
```

### `@/components/ui/ClineStudio.tsx` — VS Code + Cline 스튜디오 (사례의 심장)
```ts
import type { MotionValue } from "framer-motion";
export type ClineStep = {
  kind: "read" | "search" | "edit" | "create" | "run" | "web" | "think" | "done";
  label: string;                 // 예: "report_q3.pdf 읽는 중", "landing.html 생성"
  detail?: string;               // 보조 한 줄(예: "1,240 lines · 8 pages")
};
export type ClineScript = {
  project: string;               // 창 타이틀에 쓰는 프로젝트명
  userPrompt: string;            // 사용자가 Cline 채팅에 친 명령(한국어)
  steps: ClineStep[];            // 에이전트 작업 단계(3~6개). 스크롤로 하나씩 점등
  terminal?: { p: string; t: string; gold?: boolean }[]; // 하단 터미널(선택)
};
export type ResultRenderer = React.ComponentType<{
  p: MotionValue<number>;        // 씬 전체 progress
  reveal: MotionValue<number>;   // 0→1, 결과가 드러나는 구간(ClineStudio가 계산해 전달)
}>;
export default function ClineStudio(props: {
  p: MotionValue<number>;
  script: ClineScript;
  Result: ResultRenderer;        // 우측 결과 패널 내부(케이스별 프리뷰)
  resultTab?: string;            // 결과 패널 헤더 탭명(예: "미리보기 — index.html")
}): JSX.Element
// 레이아웃: AppWindow(아이콘 vscode) > [활동바 44px][Cline 채팅 ~42%][결과 패널 ~58%] + (terminal 있으면 하단 스트립).
// Cline 채팅: 사용자 프롬프트 버블(골드 틴트) → steps 순차 점등(kind별 아이콘/색) → "✓ 완료" 펄스.
// 결과 패널: 헤더 탭(resultTab) + <Result p reveal/>. reveal 구간에 맞춰 패널이 차오른다.
// progress 타임라인(내부): 0.04~0.14 창 마운트 / 0.12~0.22 프롬프트 / 0.22~0.56 steps /
//   0.46~0.66 terminal / 0.56~0.82 result(reveal) / 0.82~1 완료 점등.
```

### `@/components/ui/CaseScene.tsx` — 사례 씬 엔진 (사례 씬은 이것만 렌더)
```ts
import type { ResultRenderer } from "@/components/ui/ClineStudio";
import type { ClineScript } from "@/components/ui/ClineStudio";
export default function CaseScene(props: {
  scene: string;                 // data-scene 값(예: "c12")
  act: string;                   // data-act 값(클러스터 라벨, §매니페스트 참조)
  cluster: string;               // 좌측 킥커(예: "C · 웹을 짓다")
  num: number;                   // 사례 번호(1~30)
  title: string;                 // 사례 제목(예: "회사 광고 랜딩페이지")
  oldTool: string;               // 예전에 쓰던 유료 SaaS/외주(예: "웹 외주 300만원 · 윅스 구독")
  lead: string;                  // 한 줄 설명(이 사례가 뭘 하는지)
  caption?: string;              // 하단 모노 캡션(선택, 기본 "— 전부, VS Code 안에서.")
  script: ClineScript;
  Result: ResultRenderer;
  resultTab?: string;
  heights?: number;              // Pin heights(기본 4)
}): JSX.Element
// 자동 렌더: <section data-scene data-act> + Pin + 배경(글로우+그리드 패럴랙스) +
//   2단 그리드 [좌 내러티브 | 우 ClineStudio]. 좌측 내러티브(스크롤 점등):
//   킥커(cluster) → "CASE NN" + title → oldTool(취소선/ember, "예전") → "→ 이제, 채팅 한 줄"(골드) → lead → caption.
```

**사례 씬 작성법(이게 전부다):**
```tsx
"use client";
import { MotionValue, motion, useTransform } from "framer-motion";
import CaseScene from "@/components/ui/CaseScene";
import type { ClineScript } from "@/components/ui/ClineStudio";

const SCRIPT: ClineScript = { project: "...", userPrompt: "...", steps: [...], terminal: [...] };

function Result({ reveal }: { p: MotionValue<number>; reveal: MotionValue<number> }) {
  const o = useTransform(reveal, [0, 1], [0, 1]);
  const y = useTransform(reveal, [0, 1], [24, 0]);
  return <motion.div style={{ opacity: o, y }} className="...">/* 케이스별 프리뷰 */</motion.div>;
}

export default function C12Landing() {
  return (
    <CaseScene
      scene="c12" act="CASE · 웹을 짓다" cluster="C · 웹을 짓다" num={12}
      title="회사 광고 랜딩페이지" oldTool="웹 외주 300만원 · 윅스/노션 구독"
      lead="회사 소개·CTA·문의폼까지 한 페이지. 명령 한 줄로 만들고, 그 자리에서 고친다."
      script={SCRIPT} Result={Result} resultTab="미리보기 — index.html"
    />
  );
}
```
**Result 컴포넌트는 반드시 `p`/`reveal` props를 받는 진짜 컴포넌트**여야 한다(hook 안전).
`reveal`(0→1)로 페이드/슬라이드, 내부 생동감은 CSS(`animate-pulse-soft`) 또는 자체 `useInView`로.

---

## 3. 결과 프리뷰 레시피 (Result 컴포넌트 — 케이스마다 다르게, 다양성이 생명)

30개가 똑같아 보이면 실패. 창 크롬·채팅은 통일, **결과 패널 내부는 케이스마다 확연히 다르게**.
아래는 권장 형태(자유롭게 변형):
- **web/랜딩**: 미니 브라우저 주소창 + 렌더된 웹페이지 목업(히어로/버튼/섹션 블록). 골드 CTA 버튼.
- **doc/요약**: 마크다운 문서 카드(제목·불릿·인용박스). 핵심 줄 골드.
- **chart/대시보드**: 막대/도넛/라인 차트(SVG, scaleY/strokeDasharray). 카드형 KPI 숫자.
- **table/데이터**: 표(헤더+행). 가격·옵션·리뷰수 칼럼. 행 stagger.
- **media/영상**: 영상 플레이어 목업 + 타임라인 트랙(클립 블록) + 재생바. mp4/mp3 칩.
- **files/파일**: 파일 리스트(아이콘+이름+용량). 합쳐진 PDF/이름변경된 목록. before→after.
- **image/이미지**: 썸네일 그리드(3×N). 워터마크/리사이즈 라벨.
- **code/SVG**: 코드 또는 렌더된 SVG 인포그래픽.
모든 프리뷰: 토큰 색만, 가독성 우선, `reveal`로 등장. 텍스트는 작아도 `text-bone/70` 이상 대비.

---

## 4. 매니페스트 (파일·data-scene·data-act·export — 정확히 이대로)

폴더: `components/scenes/v0701/`. 페이지: `app/0701/page.tsx`(순서대로 import).

### 다리 (data-act = `RECAP · 다시, 환경`)
| 파일 | data-scene | export | 내용 |
|---|---|---|---|
| `B01_Recap.tsx` | b01 | `B01Recap` | 지난 시간 리캡: "환경이 본질이라 했다"(/0624 핵심 압축, 칠흑+골드 선언형) |
| `B02_Promise.tsx` | b02 | `B02Promise` | "오늘 — 맨손으로, 전부 VS Code 안에서 만든다" 약속(메가 골드 선언) |

### 세팅 (data-act = `SETUP · 무에서 시작한다`) — SetupScene/AppWindow 목업, 강박적 시각화
| 파일 | data-scene | export | 내용(각 단계 = 한 씬, 해당 화면 목업) |
|---|---|---|---|
| `U01_Nothing.tsx` | u01 | `U01Nothing` | 무(無): 텅 빈 VS Code 창(환영 화면) — "여기서 시작한다. 0에서." |
| `U02_InstallVSCode.tsx` | u02 | `U02InstallVSCode` | VS Code 설치(다운로드 버튼 목업) — "무료. 5분." |
| `U03_InstallCline.tsx` | u03 | `U03InstallCline` | 확장 마켓플레이스에서 **Cline** 검색→설치(목업) — 견본 |
| `U04_OpenRouter.tsx` | u04 | `U04OpenRouter` | OpenRouter 연결: API 키 개념 설명(열쇠 비유) + 설정 화면 목업 |
| `U05_PickQwen.tsx` | u05 | `U05PickQwen` | 모델 드롭다운에서 **Qwen3.7-plus** 선택(목업) — "두뇌를 고른다" |
| `U06_ClassKey.tsx` | u06 | `U06ClassKey` | **공용 수업용 API 키** 붙여넣기, 로그인 없이 — "선생님이 준 열쇠 하나로 전원 입장" |
| `U07_FirstChat.tsx` | u07 | `U07FirstChat` | 첫 채팅: "안녕? 이 폴더 좀 봐줘" → Cline 응답(ClineStudio 미니) — "연결됨" |

### 두 무기 (data-act = `WHY · 두 개의 무기`)
| 파일 | data-scene | export | 내용 |
|---|---|---|---|
| `W01_TwoWeapons.tsx` | w01 | `W01TwoWeapons` | 왜 VS Code+AI가 차원이 다른가 — 무기 2개 인트로(대비) |
| `W02_Terminal.tsx` | w02 | `W02Terminal` | 무기①: 터미널 — "AI가 네 컴퓨터에서 직접 명령을 실행한다"(터미널 목업 연출) |
| `W03_Context.tsx` | w03 | `W03Context` | 무기②: 폴더 전체 맥락 — "30p PDF가 안 잘린다. 에이전틱하게 나눠 읽고 요약·정리"(파일트리→요약 다이어그램) |
| `W04_Habit.tsx` | w04 | `W04Habit` | 습관: "VS Code에서 채팅하라" — 이게 진짜 제대로 된 작업의 시작(다리→30사례 예고) |

### 30 사례 (CaseScene 엔진) — data-act = 클러스터 라벨
- **A 문서**(`CASE · 문서를 다루다`): C01~C06
- **B 시각화**(`CASE · 눈에 보이게`): C07~C10
- **C 웹**(`CASE · 웹을 짓다`): C11~C14
- **D 미디어**(`CASE · 미디어를 만들다`): C15~C19
- **E 데이터·크롤링**(`CASE · 데이터를 캐다`): C20~C25
- **F 자동화**(`CASE · 전부 자동으로`): C26~C30

| 파일 | scene | export | 제목 | 클러스터 |
|---|---|---|---|---|
| `C01_ReportSummary.tsx` | c01 | `C01ReportSummary` | 30p+ 보고서 통째 분석→요약 | A |
| `C02_MergePDF.tsx` | c02 | `C02MergePDF` | 여러 PDF 합치기(무료·무제한) | A |
| `C03_CompressPDF.tsx` | c03 | `C03CompressPDF` | PDF 용량 줄이기 | A |
| `C04_TranslatePDF.tsx` | c04 | `C04TranslatePDF` | PDF 번역본 생성 | A |
| `C05_ExcelClean.tsx` | c05 | `C05ExcelClean` | 지저분한 엑셀 정리+자동 차트 | A |
| `C06_AutoSort.tsx` | c06 | `C06AutoSort` | 자료 폴더 자동 분류·정리 | A |
| `C07_SVGInfographic.tsx` | c07 | `C07SVGInfographic` | SVG 인포그래픽 제작 | B |
| `C08_HTMLDashboard.tsx` | c08 | `C08HTMLDashboard` | HTML 대시보드 시각화 | B |
| `C09_Templatize.tsx` | c09 | `C09Templatize` | 템플릿화→다른 프로젝트 이식 | B |
| `C10_Flowchart.tsx` | c10 | `C10Flowchart` | 플로우차트 자동 생성 | B |
| `C11_Portfolio.tsx` | c11 | `C11Portfolio` | 개인 포트폴리오 웹사이트 | C |
| `C12_Landing.tsx` | c12 | `C12Landing` | 회사 광고 랜딩페이지 | C (견본) |
| `C13_ProductPage.tsx` | c13 | `C13ProductPage` | 제품 원페이지+신청폼 | C |
| `C14_ResumeWeb.tsx` | c14 | `C14ResumeWeb` | 인터랙티브 이력서 | C |
| `C15_YoutubeDL.tsx` | c15 | `C15YoutubeDL` | 유튜브 링크→mp4/mp3 | D |
| `C16_Remotion.tsx` | c16 | `C16Remotion` | Remotion 코드 기반 영상 | D |
| `C17_ImageBatch.tsx` | c17 | `C17ImageBatch` | 이미지 일괄 변환·워터마크 | D |
| `C18_Subtitle.tsx` | c18 | `C18Subtitle` | 영상 자막(SRT) 추출+번역 | D |
| `C19_Thumbnail.tsx` | c19 | `C19Thumbnail` | 썸네일/GIF 자동 생성 | D |
| `C20_ProductCrawl.tsx` | c20 | `C20ProductCrawl` | 상품 크롤링(가격·옵션·리뷰) | E |
| `C21_PriceMonitor.tsx` | c21 | `C21PriceMonitor` | 경쟁사 가격 모니터링 | E |
| `C22_KeywordScrape.tsx` | c22 | `C22KeywordScrape` | 검색결과·키워드 수집 | E |
| `C23_ReviewSentiment.tsx` | c23 | `C23ReviewSentiment` | 리뷰 스크래핑→감성요약 | E |
| `C24_SNSData.tsx` | c24 | `C24SNSData` | SNS 공개데이터 수집·정리 | E |
| `C25_MarketingReport.tsx` | c25 | `C25MarketingReport` | 수집데이터→마케팅 리포트 | E |
| `C26_BatchRename.tsx` | c26 | `C26BatchRename` | 파일 수백개 일괄 이름변경 | F |
| `C27_ScriptAutomation.tsx` | c27 | `C27ScriptAutomation` | 반복작업 스크립트화 | F |
| `C28_AutoDocs.tsx` | c28 | `C28AutoDocs` | 메일/문서 자동 생성 | F |
| `C29_ScreenshotBatch.tsx` | c29 | `C29ScreenshotBatch` | 캡처 일괄 처리 | F |
| `C30_MiniApp.tsx` | c30 | `C30MiniApp` | 나만의 미니 프로그램 제작 | F |

### SaaS 죽음 종합 (data-act = `THESIS · SaaS를 삼키다`)
| 파일 | data-scene | export | 내용 |
|---|---|---|---|
| `T01_UsedToPay.tsx` | t01 | `T01UsedToPay` | "방금 본 전부 — 예전엔 돈 내던 별도 프로그램이었다"(SaaS 로고/비용 그리드가 사라짐) |
| `T02_Swallow.tsx` | t02 | `T02Swallow` | "AI가 전부 VS Code 안으로 빨아들인다" — 충격 종합(수십 SaaS→하나의 창) |

### 마무리 (data-act = `CLOSE · 습관이 전부다`)
| 파일 | data-scene | export | 내용 |
|---|---|---|---|
| `Z01_Habit.tsx` | z01 | `Z01Habit` | "도구를 외우지 마라. 습관을 만들어라 — 매일 VS Code에서 채팅하라" |
| `Z02_Next.tsx` | z02 | `Z02Next` | 시리즈 연결 + 골드 새벽빛 FIN ("다음 시간 — 직접 만든다") |

---

## 5. EXEMPLAR (필독 견본 — 이 수준/구조를 그대로)
- 사례 씬 견본: `components/scenes/v0701/C12_Landing.tsx` (CaseScene + Result 레시피의 정석)
- 세팅 씬 견본: `components/scenes/v0701/U03_InstallCline.tsx` (AppWindow 목업 + 스크롤 점등)
- 순수 타이포 내러티브(B/W/T/Z)는 `components/scenes/v0624/N06_EditorAnalogy.tsx`,
  `N07_HundredPercent.tsx` 의 Pin/Stage/배경/타이포 패턴을 그대로 차용.

---

## 6. 검수 통과 기준 (적대적 스크린샷 리뷰가 본다)
1. 1920×1080 16:9를 시원하게 채우는가(중앙 쪼그라듦/한쪽 텅 빔 = FAIL).
2. 헤드라인/구절이 세로로 쌓이거나 단어·구절 중간에서 깨지지 않는가(= FAIL).
3. 골드 강조 1개 원칙, 여백 호사, 배경 글로우/그리드 레이어 존재.
4. (사례) ClineStudio가 진짜 VS Code+Cline처럼 보이는가 — 채팅 단계 점등 + 결과 패널이 케이스마다 확연히 다른가.
5. (사례) `oldTool`(예전 SaaS) → "이제 채팅 한 줄" 대비가 명확한가.
6. 스크롤하면 카메라처럼 연출되는가(정적이면 FAIL). 콘솔 에러 0, tsc 0.
