# LAYOUT_BIBLE_0624.md — 16:9 풀스크린 레이아웃 & 스크롤 모션 바이블

이 문서는 6/24 에디션 신규 씬 **재설계**의 절대 기준이다. 기존 `DESIGN.md`/`PRIMITIVES.md`/`STORYBOARD_0624.md`를 보강·상위한다. **이 규칙을 어기면 재작업 대상이다.**

## 0. 1순위 — 타깃은 1920×1080 데스크톱 풀스크린 (빔프로젝터)
모든 씬은 **16:9 가로 화면을 시원하게 꽉 채워야** 한다. 콘텐츠가 화면 중앙에 쪼그라들거나, 한쪽이 텅 비거나, 좁은 세로 컬럼에 갇히면 **실패작**이다. "노트북 좁은 창" 기준으로 만들지 말 것 — 1920 폭에서 어떻게 보이는지가 전부다.

---

## 1. 이번에 실제로 터진 안티패턴 (똑같이 하면 즉시 반려)

### ❌ A. 좁은 ch 폭 + 거대 폰트 → 한글이 2~3자씩 세로로 쌓임
```tsx
// 터진 코드 (I03): 헤드라인이 "다양한/산업에/AI를/접목해," 처럼 세로로 쌓임
<h2 className="max-w-[24ch] text-[clamp(1.9rem,4.6vw,4rem)]">
```
- 한국어에서 `ch` 단위는 신뢰 불가(0 문자 기준이라 한글 폭과 안 맞음). **헤드라인 max-width에 `ch` 쓰지 마라.**
- 거대 폰트(`clamp(...,4rem)`)를 좁은 컬럼에 넣지 마라. **폰트가 크면 컬럼도 넓게**(최소 700px, 보통 한 줄에 의미 단위가 통째로 들어갈 폭).
- ✅ 처방: `max-w-[18ch]` 대신 `max-w-[60vw]`/`max-w-[820px]` 등 넉넉한 px/vw. 또는 줄바꿈을 `<br/>`로 의미 단위 명시.

### ❌ B. 전부 `flex-col` 세로 stack → 16:9 우측이 텅 빔
- 헤드라인 → 차트 → 선언을 그냥 위→아래로만 쌓으면 가로 화면이 휑하다.
- ✅ 처방: **2단(또는 3단) 그리드로 가로를 쓴다.** 텍스트 블록 + 비주얼 블록을 좌우로. 한쪽을 비우지 마라.
  ```tsx
  <div className="grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-[clamp(2rem,5vw,6rem)]">
  ```

### ❌ C. 강조 구절이 단어 사이에서 줄바꿈 ("AI로" / "먹고사는")
```tsx
// 터진 코드 (I02): 'AI로 먹고사는 사람' 이 "AI로" 뒤에서 꺾임
<span className="text-bone">'AI로 먹고사는 사람'</span>
```
- `word-break: keep-all`은 **단어 내부**만 막는다. 단어 **사이**(AI로 / 먹고사는 / 사람)는 그대로 꺾인다.
- ✅ 처방: 절대 깨지면 안 되는 구절은 `whitespace-nowrap`(또는 `inline-block`)으로 통째 묶는다.
  ```tsx
  <span className="whitespace-nowrap text-gold">&apos;AI로 먹고사는 사람&apos;</span>
  ```
  단, nowrap 구절이 화면폭을 넘기면 안 되니 폰트/폭을 함께 조정. 의미 단위 줄바꿈은 `<br/>`로 명시(반응형은 `<br className="hidden md:block"/>`).

### ❌ D. 타이포가 거대 화면 대비 작음 / 위계 흐림
- ✅ 처방: 아래 §3 스케일을 1920 기준으로 시원하게.

### ❌ E. `grid h-full` 인데 콘텐츠가 상단에 쏠림 (하단 텅 빔)
- `grid h-full` 의 단일 auto-row 는 기본 `align-content: start` 라 화면 상단에 붙는다. `items-center` 만으론 부족.
- ✅ 처방: 그리드에 **`content-center`**(= align-content: center) 추가. 한 줄짜리 풀높이 무대는 `content-center items-center`(또는 `place-content-center`)로 수직 중앙. flex 컨테이너면 `justify-center`.

### ❌ F. 스크롤 모션이 "그냥 페이드 인"뿐
- 단순 `Reveal`/in-view 나열은 키노트가 아니라 블로그다.
- ✅ 처방: §4 스크롤 모션 — Pin 스테이지 + `useTransform(progress,...)`로 카메라가 움직이듯.

---

## 2. 레이아웃 골격 (씬 유형별 처방)

공통 컨테이너:
```tsx
<div className="relative z-10 mx-auto w-full max-w-[1600px] px-[clamp(2.5rem,6vw,8rem)]">
```

- **선언형(한 문장이 주인공)**: 화면 중앙, 메가 타이포가 가로로 시원하게 펼쳐짐. 좌우 여백 호사. (예: I01, I06, S23B 일부 비트)
- **텍스트 + 비주얼(2단)**: `lg:grid-cols-[...]` 2단. 좌측 카피, 우측 비주얼(차트/카드/QR). 세로 중앙 정렬. (예: I02, I03, I04)
- **카드 시퀀스(도미노/리스트)**: 카드를 **가로로 배치**하거나, 세로 배치 시 카드 폭을 화면 가로의 60%+로 크게. (예: I05 도미노 — 3카드를 가로 또는 큼직하게)
- **문서/도시에**: 카드를 화면의 한 축으로 크게(좁고 작은 카드 금지), 반대편에 거대 타이포.

여백·정렬:
- 세로: 섹션은 `min-h-screen`(일반) 또는 Pin. 콘텐츠는 `justify-center`로 수직 중앙, 단 화면을 채울 만큼 충분히 크게.
- 가로: 콘텐츠가 `max-w-[1600px]` 안에서 가로를 적극 활용. 좌측 정렬 헤드라인은 우측에 비주얼/여백을 의도적으로.

---

## 3. 타이포 스케일 (1920 기준, clamp 권장값)

| 역할 | clamp | 비고 |
|---|---|---|
| 메가 선언 | `text-[clamp(3rem,7vw,7.5rem)]` | 화면 압도. font-display font-black |
| 씬 헤드라인 | `text-[clamp(2rem,4.2vw,4.4rem)]` | **max-w 넉넉히**(820px+ 또는 컬럼 전체) |
| 서브 헤드라인 | `text-[clamp(1.5rem,2.6vw,2.6rem)]` | |
| 본문/서브카피 | `text-[clamp(1.05rem,1.5vw,1.7rem)]` | leading-relaxed |
| 킥커/캡션/모노 | `text-[11px] md:text-[13px]` | tracking-[0.3em] uppercase |
| 거대 숫자(Counter) | `text-[clamp(3rem,8vw,8rem)]` | tabular-nums |

- 줄 간격: 헤드라인 `leading-[1.18~1.3]`, 본문 `leading-relaxed`.
- 한국어: `text-balance-k` 기본 + 깨지면 안 되는 구절 `whitespace-nowrap`.

---

## 4. 스크롤 모션 (필살기 — 각 씬을 스크롤 스테이지로)

**원칙: 정적 in-view 나열 금지. 각 씬은 스크롤 progress로 연출되는 카메라 무대다.**

- 다비트/연출형 씬은 **`Pin heights={3~5}`** 로 핀 고정 후 `useTransform(progress, [...], [...])`로:
  - 요소 등장/퇴장: opacity·y·x 크로스페이드 (비트별 구간 분할)
  - 강조 점등: 색/글로우/scale 가 progress 구간에서 변화
  - 비주얼 그리기: SVG `pathLength`, 막대 `scaleY`, clip-path 가 progress 직결
  - 거대 숫자: `useTransform(p,[a,b],[0,N])` → `Math.round` 로 스크롤 연동 카운트(또는 비트 진입 시 Counter)
  - 배경 레이어(글로우/그리드/별)도 progress 에 미세 반응 (시차 패럴랙스)
- **Pin 하드룰**: render-prop 내부에서 hook 직접 호출 금지 → 내부 보조 컴포넌트(`Stage`/`Inner`)로 분리. (PRIMITIVES.md 참조)
- 단순 한 화면 씬도 최소한 다층 패럴랙스 + 강조 점등 + 배경 반응은 넣는다.
- 이징 `[0.16,1,0.3,1]`. 스프링/바운스 금지(Counter 제외). 무게감.
- 씬 끝↔다음 씬 톤 연결(색/글로우 브릿지) 고려.

---

## 5. 보존 규칙
- 카피는 `STORYBOARD_0624.md` 그대로(오타·요약 금지). 줄바꿈 위치만 타이포에 맞게.
- 컬러 토큰/폰트/data-scene·data-act/import 허용범위(react·framer-motion·@/components/ui/*, QR img 예외)는 기존 규칙 동일.
- `Math.random()`/`Date.now()` 렌더 금지(결정적 수식). TypeScript strict 통과.
- export 함수명·data-scene·data-act 는 기존 파일 것을 **유지**(재설계지 이름변경 아님).

---

## 6. 검수 통과 기준 (스크린샷으로 판정)
1. **16:9 풀스크린을 시원하게 채우는가?** (중앙 쪼그라듦/한쪽 텅 빔 = FAIL)
2. **헤드라인/구절이 세로로 어색하게 쌓이거나 단어 중간/구절 중간에서 깨지지 않는가?** (= FAIL)
3. 타이포 위계가 명확하고 거대 화면에서 충분히 큰가?
4. 골드 강조 1개 원칙, 여백 호사, 배경 글로우/그리드 레이어 존재.
5. 스크롤하면 카메라처럼 연출되는가? (정적이면 FAIL)
6. 콘솔 에러 0.
