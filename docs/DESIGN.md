# DESIGN.md — 아트 디렉션 바이블

**작품명**: 거인의 어깨 위에서 — AI 시대에 살아남기 (2026 인터랙티브 키노트)
**무드**: 시네마틱 다큐멘터리 키노트. A24 영화 타이틀 시퀀스 + 애플 키노트 + 탐사보도 다큐.
**타겟 환경**: 16:9 빔프로젝터/모니터 풀스크린 (1920×1080 기준). 데스크톱 최우선.

---

## 1. 컬러 시스템 (globals.css @theme 에 정의됨 — Tailwind 유틸리티로 사용)

| 토큰 | 값 | Tailwind 클래스 | 용도 |
|---|---|---|---|
| ink | #07060A | `bg-ink` `text-ink` | 기본 배경. 웜 언더톤 블랙 |
| coal | #100D13 | `bg-coal` | 카드/패널 표면 |
| bone | #F2EDE3 | `bg-bone` `text-bone` | 기본 텍스트, ACT 2 라이트 씬 배경 |
| bone-dim | #CFC8B8 | `text-bone-dim` | 본 톤 보조 텍스트 |
| gold | #E8B54B | `text-gold` `bg-gold` | **시그니처.** 거인, 강조, 진행바 |
| gold-bright | #FFD37A | `text-gold-bright` | 골드 하이라이트/글로우 중심 |
| ember | #FF4B2E | `text-ember` | 전쟁/위험/경고 (ACT 1 후반, ACT 4) |
| haze | #8B8494 | `text-haze` | 음소거 텍스트, "눈치채지 못한 다수" |

**규율**: 골드가 주인공. ember는 위험·전쟁 씬에서만. 한 씬에 강조색 1개 원칙.
투명도 변형은 `text-bone/60`, `bg-gold/10`, `border-bone/15` 식으로 자유롭게.

## 2. 타이포그래피

| 역할 | 클래스 | 폰트 | 사용처 |
|---|---|---|---|
| Display | `font-display` | Noto Serif KR 600/700/900 | 거대 제목, 선언문. weight 900 위주 |
| Body | `font-body` | Pretendard Variable | 본문, 설명 |
| Data | `font-mono` | IBM Plex Mono | 날짜, 숫자, 킥커, 파일/도큐먼트 연출 |

**스케일 (fluid, 권장값)**:
- 메가 타이틀: `text-[clamp(3.5rem,11vw,11rem)] font-display font-black leading-[1.05]`
- 씬 타이틀: `text-[clamp(2.2rem,6vw,5.5rem)] font-display font-bold leading-[1.15]`
- 서브 카피: `text-[clamp(1.05rem,1.8vw,1.6rem)] text-bone/70 leading-relaxed`
- 캡션/킥커: `font-mono text-[11px] md:text-xs tracking-[0.35em] uppercase`
- 한국어 줄바꿈: 제목·카피에 `text-balance-k` 유틸리티(= text-wrap:balance + word-break:keep-all) 적용 권장.

## 3. 모션 언어

- 기본 이징: `[0.16, 1, 0.3, 1]` (expo-out). 모든 transition 에 이 이징.
- 등장: 마스크 리빌(TextSplit) 또는 y+blur 페이드(Reveal). duration 0.9~1.4s, stagger 0.04~0.09s.
- 스크롤 연동: 핀 고정(Pin) + `useTransform(progress, [...], [...])`. 카메라가 움직이듯.
- 스프링/바운스 금지(데이터 카운터 제외). 무게감 있게.
- 거대 숫자는 반드시 Counter 로 카운트업. `tabular-nums` 자동 적용됨.

## 4. 씬 구성 규칙

- 모든 씬 루트: `<section data-scene="sXX" data-act="(아래 액트 라벨)" className="relative ...">`
- 일반 씬: `min-h-screen` + 내부는 flex 센터 또는 그리드. 콘텐츠 최대폭 `max-w-[1400px] mx-auto px-[6vw]`.
- 핀 씬: Pin 프리미티브 사용 (`heights` = 스크롤 길이 배수, 3~5 권장).
- 가로 오버플로 금지: 움직이는 요소가 있는 씬은 루트나 래퍼에 `overflow-hidden`.
- 씬 간 이음새: 위/아래 씬 배경색이 다르면 그라디언트 브릿지(예: `bg-gradient-to-b from-ink to-bone`)나 명확한 컷 전환을 의도적으로 설계.

**액트 라벨 (data-act 값, 정확히 이대로)**:
- S01–S03: `PROLOGUE — 두 가지 질문`
- S04–S08: `ACT 1 — 3년 전, 우리는 웃었다`
- S09–S14: `ACT 2 — 다른 종류의 발명`
- S15–S16: `ACT 3 — 보이지 않는 격차`
- S17–S25: `ACT 4 — 어떤 회사 이야기`
- S26–S27: `ACT 5 — 올라타는 법`
- S28–S29: `FINALE — 거인의 어깨 위에서`

## 5. 액트별 비주얼 시그니처

- **PROLOGUE**: 칠흑 + 별(Starfield) + 골드 세리프. 호흡 느리게. 거대한 여백.
- **ACT 1**: 다큐멘터리. 모노 날짜 스탬프, 채팅 UI 목업, 가속하는 타임라인. S08만 ember 위험 톤.
- **ACT 2**: **반전 라이트 씬** (bg-bone, text-ink). 에디토리얼 잡지 레이아웃. 거대한 "아니오." 스탬프. S13에서 다시 칠흑으로 컷.
- **ACT 3**: 칠흑 + 데이터 비주얼라이제이션. 골드 곡선 vs haze 곡선.
- **ACT 4**: 기밀문서/도시에 파일 미학. 모노스페이스, REDACTED 바(■■■■), 스탬프, 타자기 리듬. ember 경고.
- **ACT 5**: 어둠→새벽. 골드 그라디언트가 점점 차오름. 희망적이지만 진지하게.
- **FINALE**: 별이 새벽빛으로. 가장 거대한 타이포. 침묵의 여백.

## 6. 금지사항

- 외부 이미지/외부 폰트/추가 npm 패키지 금지. 비주얼은 CSS/SVG/canvas 로만.
- 이모지 금지 (텍스트 타이포로 해결).
- 보라색 그라디언트, 무지개 그라디언트 금지.
- 렌더 중 `Math.random()`/`Date.now()` 금지 (hydration 깨짐) — 의사난수는 인덱스 수식으로: `((i * 37) % 89) / 89`.
- `window`/`document` 접근은 useEffect 안에서만.
