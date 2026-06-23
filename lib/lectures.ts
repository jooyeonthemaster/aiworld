/**
 * 강의안 매니페스트 — 단일 진실 공급원(Single Source of Truth)
 * ────────────────────────────────────────────────────────────
 * 새 강의안을 만들면 이 배열에 객체 1개만 추가하면 된다.
 * 데스크탑 파일 관리자(`app/page.tsx` → components/desktop/*)가
 * 이 배열을 읽어 파일 아이콘 / 리스트 / 상세 패널을 전부 자동 생성한다.
 *
 * 라우트(경로)는 각 강의안이 독립적으로 소유한다:
 *   - "인트로"  → /0624  (거인의 어깨 위에서, 2026-06-24)
 * 다음 강의안은 새 라우트(app/<slug>/page.tsx) + 여기 객체 1개.
 */

export type LectureStatus = "published" | "scheduled" | "draft";

export type LectureCategory =
  | "all"
  | "favorites"
  | "y2026"
  | "keynote"
  | "draft";

export interface Lecture {
  /** 안정적 식별자 (선택/정렬 키) */
  id: string;
  /** 파일 관리자에 표시되는 파일명 (확장자 제외) */
  fileName: string;
  /** 의사(疑似) 확장자 — 파일 느낌을 위한 라벨 */
  ext: string;
  /** 강의안 실제 라우트 */
  route: string;
  /** 정식 제목 */
  title: string;
  /** 부제 */
  subtitle: string;
  /** ISO 날짜 (정렬용) */
  date: string;
  /** 사람이 읽는 날짜 라벨 */
  dateLabel: string;
  /** 강의 회차 라벨 (예: "1강 · 인트로") */
  series: string;
  /** 대상 청중 */
  audience: string;
  /** 한 줄 요약 (상세 패널) */
  summary: string;
  /** 검색/필터용 태그 */
  tags: string[];
  /** 씬 개수 (의사 메타데이터) */
  scenes: number;
  /** 예상 상영 시간(분) */
  durationMin: number;
  /** 의사 파일 용량 라벨 */
  sizeLabel: string;
  /** 커버 썸네일 경로 (없으면 그라디언트 폴백) */
  thumbnail: string | null;
  /** 시그니처 강조색 */
  accent: string;
  /** 발행 상태 */
  status: LectureStatus;
  /** 즐겨찾기(★) 여부 */
  pinned: boolean;
}

export const LECTURES: Lecture[] = [
  {
    id: "setup-zero-to-one",
    fileName: "0에서 1까지 — 개발환경 완전정복",
    ext: "keynote",
    route: "/0708",
    title: "0에서 1까지",
    subtitle: "개발환경 완전정복 — 한 단계도 안 빠지고",
    date: "2026-07-08",
    dateLabel: "2026. 07. 08",
    series: "3강 · 실습",
    audience: "완전 초심자",
    summary:
      "VS Code도 없는 0에서 시작해 설치·한국어팩·필수 확장·Node.js·API키·폴더 워크플로우·Git/GitHub·Vercel 배포까지. 클릭 한 번, 체크박스 하나도 빠짐없이 따라 하는 56단계 셋업 가이드.",
    tags: ["키노트", "실습", "VS Code", "셋업", "초심자"],
    scenes: 56,
    durationMin: 90,
    sizeLabel: "71.0 MB",
    thumbnail: null,
    accent: "#E8B54B",
    status: "published",
    pinned: true,
  },
  {
    id: "vscode-ai",
    fileName: "전부 VS Code 안에서",
    ext: "keynote",
    route: "/0701",
    title: "전부, VS Code 안에서",
    subtitle: "SaaS를 삼키는 AI — 실전 30",
    date: "2026-07-01",
    dateLabel: "2026. 07. 01",
    series: "2강 · 실전",
    audience: "AI 마케터 취준생",
    summary:
      "맨손으로 VS Code에 AI(Cline + OpenRouter Qwen)를 심는 전 과정, 그리고 마케터가 바로 써먹는 30가지 실전. 예전엔 돈 내던 프로그램들이 전부 VS Code 채팅 한 줄로.",
    tags: ["키노트", "실전", "VS Code", "Cline", "AI"],
    scenes: 47,
    durationMin: 120,
    sizeLabel: "62.4 MB",
    thumbnail: null,
    accent: "#E8B54B",
    status: "published",
    pinned: true,
  },
  {
    id: "intro",
    fileName: "인트로",
    ext: "keynote",
    route: "/0624",
    title: "거인의 어깨 위에서",
    subtitle: "AI 시대에 살아남기",
    date: "2026-06-24",
    dateLabel: "2026. 06. 24",
    series: "1강 · 인트로",
    audience: "AI 마케터 취준생",
    summary:
      "AI가 일자리를 갈아치우는 시대. '도구'가 아니라 '환경'을 다루는 사람이 살아남는다 — 본질은 코드 에디터다. 발표자 김주연(네안데르·일해라컴퍼니)의 첫 강의.",
    tags: ["키노트", "취업", "AI", "코드 에디터"],
    scenes: 44,
    durationMin: 50,
    sizeLabel: "48.2 MB",
    thumbnail: "/thumbs/intro.jpg",
    accent: "#E8B54B",
    status: "published",
    pinned: true,
  },
];

/* ───────────────────────── 파생 헬퍼 ───────────────────────── */

export const CATEGORY_META: Record<
  LectureCategory,
  { label: string; group: "favorites" | "library"; icon: string }
> = {
  favorites: { label: "즐겨찾기", group: "favorites", icon: "star" },
  all: { label: "전체 강의안", group: "library", icon: "folder" },
  y2026: { label: "2026", group: "library", icon: "calendar" },
  keynote: { label: "키노트", group: "library", icon: "deck" },
  draft: { label: "초안", group: "library", icon: "draft" },
};

export function inCategory(l: Lecture, cat: LectureCategory): boolean {
  switch (cat) {
    case "all":
      return true;
    case "favorites":
      return l.pinned;
    case "y2026":
      return l.date.startsWith("2026");
    case "keynote":
      return l.tags.includes("키노트");
    case "draft":
      return l.status === "draft";
    default:
      return true;
  }
}

export function categoryCounts(): Record<LectureCategory, number> {
  const keys = Object.keys(CATEGORY_META) as LectureCategory[];
  const out = {} as Record<LectureCategory, number>;
  for (const k of keys) out[k] = LECTURES.filter((l) => inCategory(l, k)).length;
  return out;
}

export type SortKey = "name" | "date" | "scenes";

export function sortLectures(list: Lecture[], key: SortKey): Lecture[] {
  const arr = [...list];
  switch (key) {
    case "name":
      return arr.sort((a, b) => a.fileName.localeCompare(b.fileName, "ko"));
    case "date":
      return arr.sort((a, b) => b.date.localeCompare(a.date));
    case "scenes":
      return arr.sort((a, b) => b.scenes - a.scenes);
    default:
      return arr;
  }
}

export const STATUS_META: Record<
  LectureStatus,
  { label: string; tone: "gold" | "haze" | "bone" }
> = {
  published: { label: "발행됨", tone: "gold" },
  scheduled: { label: "예정", tone: "bone" },
  draft: { label: "초안", tone: "haze" },
};
