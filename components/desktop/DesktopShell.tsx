"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  LECTURES,
  CATEGORY_META,
  categoryCounts,
  inCategory,
  sortLectures,
  type LectureCategory,
  type SortKey,
} from "@/lib/lectures";
import type { ViewMode } from "@/components/desktop/types";

import MenuBar from "./MenuBar";
import WindowChrome from "./WindowChrome";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import FileGrid from "./FileGrid";
import FileList from "./FileList";
import DetailPane from "./DetailPane";
import StatusBar from "./StatusBar";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * DesktopShell — 강의안 파일 관리자 본체(통합기).
 * 상태를 들고 파생 리스트를 만들어 위성 컴포넌트에 props 로 분배한다.
 * 강의안은 lib/lectures.ts 의 LECTURES 에서 100% 자동 생성된다.
 */
export default function DesktopShell() {
  const router = useRouter();

  const [category, setCategory] = useState<LectureCategory>("all");
  const [view, setView] = useState<ViewMode>("grid");
  const [sort, setSort] = useState<SortKey>("date");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>("intro");

  const counts = useMemo(() => categoryCounts(), []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = LECTURES.filter((l) => inCategory(l, category)).filter((l) => {
      if (!q) return true;
      return [l.fileName, l.title, l.subtitle, l.audience, l.series, ...l.tags]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
    return sortLectures(filtered, sort);
  }, [category, query, sort]);

  const selected = useMemo(
    () => LECTURES.find((l) => l.id === selectedId) ?? null,
    [selectedId]
  );

  const crumb =
    category === "all" ? "강의안" : `강의안 / ${CATEGORY_META[category].label}`;

  const onOpen = (route: string) => router.push(route);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-ink">
      <DesktopBackdrop />

      <div className="relative z-10 flex h-full flex-col">
        <MenuBar />

        <div className="min-h-0 flex-1 px-[clamp(1rem,3vw,3.5rem)] pb-[clamp(1rem,2.5vh,2.5rem)] pt-[clamp(0.5rem,1.6vh,1.5rem)]">
          <div className="mx-auto h-full w-full max-w-[1680px]">
            <WindowChrome title="강의안">
              <Toolbar
                view={view}
                onView={setView}
                sort={sort}
                onSort={setSort}
                query={query}
                onQuery={setQuery}
                crumb={crumb}
              />

              <div className="flex min-h-0 flex-1">
                <Sidebar category={category} onCategory={setCategory} counts={counts} />

                <main className="relative min-h-0 flex-1">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={view}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22, ease: EASE }}
                      className="absolute inset-0"
                    >
                      {view === "grid" ? (
                        <FileGrid
                          lectures={visible}
                          selectedId={selectedId}
                          onSelect={setSelectedId}
                          onOpen={onOpen}
                        />
                      ) : (
                        <FileList
                          lectures={visible}
                          selectedId={selectedId}
                          onSelect={setSelectedId}
                          onOpen={onOpen}
                          sort={sort}
                          onSort={setSort}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </main>

                <DetailPane lecture={selected} onOpen={onOpen} />
              </div>

              <StatusBar total={visible.length} selectedName={selected?.fileName ?? null} />
            </WindowChrome>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 데스크탑 배경 — 라디얼 골드 글로우 + 도트 그리드 */
function DesktopBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 0%, rgba(232,181,75,0.10), transparent 60%), radial-gradient(50% 50% at 85% 90%, rgba(232,181,75,0.05), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(242,237,227,0.7) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(80% 80% at 50% 40%, black, transparent 100%)",
        }}
      />
    </div>
  );
}
