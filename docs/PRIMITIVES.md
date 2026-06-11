# PRIMITIVES.md — 코어 컴포넌트 API + 구현 규칙

스택: Next.js 15 (App Router) / React 19 / TypeScript strict / Tailwind CSS v4 / framer-motion v12 / lenis.
Lenis 스무스 스크롤이 전역 적용되어 있고, framer-motion `useScroll` 은 그대로 호환된다.
경로 별칭: `@/*` = 프로젝트 루트.

---

## 사용 가능한 프리미티브 (`@/components/ui/*`)

### `<Pin heights={4}>{(progress) => ...}</Pin>`
핀 고정 스크롤 스테이지. `heights × 100vh` 스크롤 동안 내부가 화면에 고정되고 `progress: MotionValue<number>` 가 0→1.
```tsx
import Pin from "@/components/ui/Pin";
import { useTransform, motion } from "framer-motion";

<section data-scene="s06" data-act="ACT 1 — 3년 전, 우리는 웃었다" className="relative">
  <Pin heights={4}>
    {(p) => {
      // 주의: render-prop 내부는 컴포넌트가 아니므로 hook 호출 금지!
      // hook 이 필요하면 별도 내부 컴포넌트로 분리해서 <Inner p={p} /> 형태로.
      return <Inner p={p} />;
    }}
  </Pin>
</section>

function Inner({ p }: { p: MotionValue<number> }) {
  const x = useTransform(p, [0, 1], ["0%", "-70%"]);
  const o = useTransform(p, [0, 0.15], [0, 1]);
  return <motion.div style={{ x, opacity: o }} className="flex h-full items-center">...</motion.div>;
}
```

### `<Reveal delay={0.2} y={36} blur once className="">`
뷰포트 진입 시 페이드+슬라이드(+블러) 등장 래퍼.

### `<TextSplit text="거인의 어깨 위에서" per="char" stagger={0.05} delay={0.3} className="..." />`
단어(`per="word"`)/글자(`per="char"`) 마스크 리빌. 거대 타이틀에 사용. 한국어는 `per="char"` 가 멋지다.

### `<Counter to={500} prefix="$" suffix="B" duration={2} decimals={0} className="..." />`
뷰포트 진입 시 카운트업. 천단위 콤마 자동.

### `<Kicker tone="gold|bone|ember|ink">ACT 1 — THE LAUGH</Kicker>`
씬 상단 모노 라벨 (라인 + 트래킹 넓은 대문자).

### `<Starfield density={130} color="232,181,75" opacity={0.8} className="" />`
캔버스 별 필드. **부모가 `relative` 필수**, absolute 로 부모를 채운다. color 는 `"r,g,b"` 문자열.

---

## 구현 하드 룰 (위반 시 빌드 실패/시각 붕괴)

1. 모든 씬 파일 첫 줄 `"use client";`
2. default export 함수명은 `Scene01`, `Scene02`, … (파일명과 매칭).
3. 루트 엘리먼트: `<section data-scene="sXX" data-act="..." className="relative ...">` — data 속성은 HUD/키보드 내비가 읽는다. **씬당 정확히 1개의 `data-scene`**.
4. import 허용 범위: `react`, `framer-motion`, `@/components/ui/*` 만. 추가 패키지/외부 URL 금지.
5. framer-motion v12 import 예: `import { motion, useTransform, useScroll, useInView, useMotionValue, useSpring, animate, AnimatePresence, MotionValue } from "framer-motion";`
6. **Pin 의 render-prop 내부에서 hook 직접 호출 금지** → 내부 보조 컴포넌트로 분리 (같은 파일 안에 작성, export 안 함).
7. 렌더 경로에서 `Math.random()`/`Date.now()` 금지. 장식용 난수는 결정적 수식(`(i * 37) % 89` 등) 또는 useEffect 내부에서.
8. `useTransform` 출력은 `motion.*` 의 `style` 로만 연결. (`x`, `y`, `opacity`, `scale`, `rotate`, `clipPath`, `backgroundColor` 등)
9. TypeScript strict 통과 필수: 콜백 파라미터에 타입 명시, null 가드. `as any` 남발 금지(불가피하면 1~2회 허용).
10. 긴 씬 내부에서 가로로 움직이는 요소가 있으면 반드시 조상에 `overflow-hidden`.
11. 텍스트는 스토리보드의 카피를 **그대로** 사용(오타·임의 요약 금지). 다만 줄바꿈 위치는 타이포그래피에 맞게 자유.
12. 각 파일 끝에 default export. 파일당 200~400줄 권장, 부족한 것보다 풍부한 디테일이 낫다.
13. SVG 차트/도형은 viewBox 기반으로 직접 그려라. `pathLength` + `useTransform` 으로 선 그리기 애니메이션 가능: `<motion.path style={{ pathLength: p }} ... />`
14. hover 인터랙션도 환영 (`whileHover`), 단 발표 환경이 스크롤 중심임을 잊지 말 것.

## 완성도 기준

"있어 보이는" 수준이 아니라 **어워드 수상급**: 배경에 미세한 그라디언트/글로우 레이어, 전경에 거대 타이포, 모노 캡션으로 디테일 마감. 모든 등장 요소에 모션. 정적인 div 덩어리는 실패작이다.
