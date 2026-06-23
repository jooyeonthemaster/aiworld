# DESKTOP_BIBLE — 강의안 파일 관리자 (메인 페이지 `/`)

> 이 문서는 `app/page.tsx`(데스크탑 파일 관리자)를 구성하는 모든 컴포넌트의
> **단일 디자인 규칙 + prop 계약**이다. 팬아웃 에이전트는 이 문서 + 견본
> `components/desktop/FileCard.tsx` 를 반드시 먼저 읽고, **자기 파일 1개만** 작성한다.

---

## 0. 컨셉 — "STUDIO OS"

키노트(`/0624`)와 동일한 시네마틱 다크 팔레트 위에 떠 있는,
**macOS Finder 급의 프리미엄 데스크탑 파일 관리자.**
각 강의안 = 파일. 더블클릭하면 그 강의안 라우트로 진입한다.
강의안은 `lib/lectures.ts`의 `LECTURES` 배열에서 100% 자동 생성된다
(새 강의안 = 객체 1개 추가 → 파일이 자동으로 나타남).

핵심 감각: **차분한 권위, 정밀한 여백, 골드 액센트, 유리(backdrop-blur) 패널.**
장난감 같지 않게. "진짜 OS 프로그램"처럼 보여야 한다.

---

## 1. 색·타이포 토큰 (globals.css 재사용)

색: `ink #07060A`(데스크탑 배경) · `coal #100d13`(윈도우/패널) · `bone #F2EDE3`(주 텍스트) ·
`bone-dim #CFC8B8` · `gold #E8B54B`(선택/강조/브랜드) · `gold-bright #FFD37A` ·
`ember #FF4B2E`(닫기 신호) · `haze #8B8494`(음소거 텍스트).

- 패널 배경은 반투명 + `backdrop-blur`: 예) `bg-coal/80 backdrop-blur-xl`.
- 보더는 항상 얇게: `border border-bone/10` (강조 시 `border-gold/40`).
- 텍스트 위계: 파일명 = `font-body`(Pretendard) 중간굵기, 메타데이터/라벨 = `font-mono`(IBM Plex Mono) `tracking`, 큰 브랜드/제목 = `font-display`(Noto Serif).

폰트 클래스: `font-body` / `font-mono` / `font-display` (전역 등록됨).

## 2. 레이아웃 골격 (DesktopShell 가 조립; 1920×1080 우선)

```
┌───────────────────────────────────────────── MenuBar (h~36) ──────────┐  ← 화면 최상단 OS 바
│ ◆ NEANDER STUDIO      강의안 아카이브            14:32  ·  2026.06.24   │
├────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌────────────────────── WindowChrome (rounded, border, shadow) ────┐  │
│   │ ● ● ●   ▸ 강의안                                       ⤢   ─   ✕  │  │ ← TitleBar
│   ├──────────────────────────────────────────────────────────────────┤  │
│   │  ◂ ▸   강의안 / 2026          [▦ ☰]   정렬▾    🔍 검색…           │  │ ← Toolbar
│   ├──────────┬───────────────────────────────────────┬───────────────┤  │
│   │ Sidebar  │  FileGrid  또는  FileList               │  DetailPane   │  │
│   │ (w~248)  │  (flex-1, 내부 스크롤)                   │  (w~320)      │  │
│   │ 즐겨찾기 │   ┌────┐ ┌────┐ ┌────┐                  │ [썸네일]      │  │
│   │  ★인트로 │   │파일│ │파일│ │파일│                  │ 제목/메타/태그│  │
│   │ 라이브러리│  └────┘ └────┘ └────┘                  │ [열기]        │  │
│   ├──────────┴───────────────────────────────────────┴───────────────┤  │
│   │  항목 1개 · 1개 선택됨                          100%  ▢▢▢▢          │  │ ← StatusBar
│   └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────┘  ← ink 데스크탑(라디얼 골드 글로우 + 도트그리드)
```

치수 가이드(고정 아님, 비율 유지): MenuBar h≈36 · TitleBar h≈46 · Toolbar h≈54 ·
Sidebar w≈248 · DetailPane w≈320 · StatusBar h≈34.
윈도우는 데스크탑 중앙, 약 `w≈min(1640px,92vw) × h≈88vh`.

루트는 `h-screen overflow-hidden` (페이지 자체는 스크롤 없음). **내부 스크롤 영역
(FileGrid/FileList의 본문, DetailPane)에는 반드시 `data-lenis-prevent` 를 붙인다**
— 전역 Lenis가 휠을 가로채지 않도록.

## 3. prop 계약 (★ 정확히 이대로. 임의 변경 금지)

공용 타입은 `components/desktop/types.ts` 에 있다:
```ts
import type { Lecture } from "@/lib/lectures";
export type ViewMode = "grid" | "list";
export type { Lecture };
// 카테고리/정렬 타입은 "@/lib/lectures" 에서: LectureCategory, SortKey
```

각 컴포넌트는 **default export**, 첫 줄 `"use client";`, import는
`react`, `framer-motion`, `next/navigation`(필요시), `@/lib/lectures`,
`@/components/desktop/types` 로 제한.

```ts
// MenuBar.tsx        props 없음. 상단 OS 바(브랜드 + 라이브 시계).
//                    시계는 useEffect+setInterval 로만(렌더 중 Date 금지). 초기값은 빈 문자열.
export default function MenuBar(): JSX.Element

// WindowChrome.tsx
export default function WindowChrome(props: {
  title: string;            // 윈도우 타이틀(중앙) 예: "강의안"
  children: React.ReactNode;// 타이틀바 아래 본문 전체(Toolbar+body+StatusBar)
}): JSX.Element
//  - 둥근 윈도우 컨테이너(bg-coal/80 backdrop-blur-xl, border-bone/10, 큰 그림자)
//  - 상단 TitleBar: 좌측 신호등 3개(ember/gold/jade #46B17B, 11px), 중앙 title(작게),
//    우측 창 컨트롤 글리프(장식). children 은 flex-1 로 그 아래를 채운다.

// Sidebar.tsx
import type { LectureCategory } from "@/lib/lectures";
export default function Sidebar(props: {
  category: LectureCategory;                 // 현재 선택
  onCategory: (c: LectureCategory) => void;  // 변경 콜백
  counts: Record<LectureCategory, number>;   // 카테고리별 개수
}): JSX.Element
//  - CATEGORY_META(@/lib/lectures) 로 그룹(즐겨찾기/라이브러리) 렌더.
//  - 선택 항목: 골드 텍스트 + bg-gold/10 + 좌측 골드 인디케이터(layoutId 권장).
//  - 하단에 발표자 미니 명함(김주연 · 네안데르)이 있으면 좋다(선택).

// Toolbar.tsx
import type { ViewMode } from "@/components/desktop/types";
import type { SortKey } from "@/lib/lectures";
export default function Toolbar(props: {
  view: ViewMode; onView: (v: ViewMode) => void;
  sort: SortKey; onSort: (s: SortKey) => void;
  query: string; onQuery: (q: string) => void;
  crumb: string;                 // "강의안 / 2026"
}): JSX.Element
//  - 좌: 뒤/앞 chevron(장식) + 브레드크럼(crumb).
//  - 우: 그리드/리스트 토글(아이콘 2개, 활성=골드), 정렬 드롭다운(이름/날짜/씬),
//        검색 인풋(🔍, focus 시 골드 보더). 인풋은 controlled.

// FileCard.tsx  ← 견본(이미 작성됨). 다른 에이전트는 이 파일을 수정하지 말 것.
import type { Lecture } from "@/lib/lectures";
export default function FileCard(props: {
  lecture: Lecture; selected: boolean; index: number;
  onSelect: (id: string) => void; onOpen: (route: string) => void;
}): JSX.Element

// FileList.tsx
import type { Lecture } from "@/lib/lectures";
import type { SortKey } from "@/lib/lectures";
export default function FileList(props: {
  lectures: Lecture[]; selectedId: string | null;
  onSelect: (id: string) => void; onOpen: (route: string) => void;
  sort: SortKey; onSort: (s: SortKey) => void;  // 헤더 클릭 정렬
}): JSX.Element
//  - 테이블형(헤더: 이름/날짜/종류/씬/크기). 행 hover/선택 하이라이트.
//  - 이름 칸엔 작은 파일 아이콘 + fileName.ext. 더블클릭 onOpen, 클릭 onSelect.
//  - 본문 영역 스크롤 컨테이너에 data-lenis-prevent.

// DetailPane.tsx
import type { Lecture } from "@/lib/lectures";
export default function DetailPane(props: {
  lecture: Lecture | null;            // 선택 없으면 빈 상태(안내)
  onOpen: (route: string) => void;
}): JSX.Element
//  - 상단 큰 썸네일(16:9, thumbnail 없으면 accent 그라디언트 폴백 + 큰 글리프),
//    제목/부제, 메타 테이블(날짜/대상/씬/시간/용량/상태), 태그 칩, "열기" CTA(골드).
//  - AnimatePresence 로 선택 전환 시 부드럽게.

// StatusBar.tsx
export default function StatusBar(props: {
  total: number; selectedName: string | null;
}): JSX.Element
//  - 좌: "항목 N개" (+ 선택 시 "· 〈name〉 선택됨"). 우: 줌 100% + 장식 슬라이더.
```

DesktopShell(통합·본체가 작성)이 상태(category/view/sort/query/selectedId)를 들고
파생 리스트(`inCategory`→`query`필터→`sortLectures`)를 만들어 위 컴포넌트에 내려준다.
열기(onOpen)는 `next/navigation` 의 `useRouter().push(route)`.

## 4. 모션 규칙 (framer-motion v12)

- easing 표준 `[0.16, 1, 0.3, 1]`. 짧고 정밀하게(0.25~0.5s). 과한 바운스 금지.
- 윈도우 마운트: opacity 0→1 + scale 0.985→1 + y 12→0.
- 카드 등장: index 기반 stagger(`delay: index*0.045`), 위로 8px + 페이드.
- 카드 hover: `whileHover={{ y:-4 }}` + 보더 골드 + 은은한 골드 글로우. 선택: 골드 링 + 체크.
- 그리드↔리스트 전환: `AnimatePresence mode="wait"` 로 교차 페이드.
- 사이드바 선택 인디케이터: `layoutId="sidebar-active"`.
- **렌더 중 `Math.random()`/`Date.now()`/인자없는 `new Date()` 금지** — 결정적 값
  (`(i*37)%89` 등) 또는 useEffect 내부에서만.

## 5. 안티패턴 (키노트 작업에서 학습됨 — 반드시 회피)

- 한국어 헤드라인에 `max-w-[NNch]` 금지(ch 부정확 → 세로로 2~3글자씩 깨짐). `whitespace-nowrap` 또는 글자수 기반 폭.
- 구(句) 단위 줄바꿈 깨짐: keep-all 은 단어 내부만 막는다. "AI로 먹고사는" 같은 구는 `whitespace-nowrap` 그룹.
- 모든 것을 `flex-col` 로 쌓아 16:9 우측이 텅 비는 것 금지 — 가로 공간을 채워라.
- `grid h-full` 단일 행은 `align-content:start` 라 위로 쏠림 → 수직 중앙은 `content-center`/`place-content-center`.
- 텍스트가 `text-haze`/저대비로 안 보이는 것 금지. 본문 최소 `text-bone/55`.
- 고정 px 폰트 금지 — `clamp()` 로 16:9 스케일.

## 6. 검수 기준 (적대적 스크린샷 리뷰가 볼 것)

1. 1920×1080에서 윈도우가 잘리지 않고 데스크탑에 균형 있게 안착하는가.
2. 사이드바/툴바/그리드/상세/상태바가 시각적으로 정렬·정합되는가(베이스라인·간격).
3. 파일 카드가 "진짜 OS 파일"처럼 보이는가(썸네일·메타·선택/hover 상태).
4. 그리드↔리스트 전환, 선택→상세 패널 반영, 검색/정렬이 실제로 동작하는가.
5. 텍스트 잘림·줄바꿈 깨짐·저대비·빈 공간 과다 없음.
6. 콘솔 에러 0, tsc 0, build 0.
