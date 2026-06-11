# 거인의 어깨 위에서 — AI 시대에 살아남기

16:9 인터랙티브 웹 키노트. Next.js 15 / Tailwind CSS v4 / framer-motion / Lenis.

## 실행

```bash
npm install
npm run dev      # http://localhost:3777
```

발표할 때는 브라우저에서 열고 **F** 키로 전체화면 (16:9 모니터/빔 기준 최적화).

## 조작법

| 키 | 동작 |
|---|---|
| 스크롤 / 휠 | 기본 진행 (스크롤 연동 연출 포함) |
| `→` `↓` `Space` `PageDown` | 다음 씬 (긴 씬 안에서는 한 화면씩) |
| `←` `↑` `PageUp` | 이전 씬 |
| `Home` | 처음으로 |
| `F` | 전체화면 토글 |

## 구조

- `docs/STORYBOARD.md` — 29개 씬 전체 연출 대본 (카피 수정은 여기 보고 해당 씬 파일에서)
- `docs/DESIGN.md` — 컬러/타이포/모션 규칙
- `components/scenes/` — S01~S29 씬 컴포넌트 (한 씬 = 한 파일)
- `components/ui/` — Pin(핀 스크롤), TextSplit, Counter, Starfield 등 프리미티브
- `app/page.tsx` — 씬 순서 조립

## 서사 구성

PROLOGUE 두 가지 질문 → ACT 1 3년 전, 우리는 웃었다 → ACT 2 다른 종류의 발명 →
ACT 3 보이지 않는 격차 → ACT 4 어떤 회사 이야기 → ACT 5 올라타는 법 → FINALE
