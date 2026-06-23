import type { Metadata } from "next";
import DesktopShell from "@/components/desktop/DesktopShell";

export const metadata: Metadata = {
  title: "강의안 아카이브 — NEANDER STUDIO",
  description:
    "김주연의 강의안 데스크탑. 인터랙티브 키노트 라이브러리. 파일을 더블클릭해 강의를 시작하세요.",
};

export default function Home() {
  return <DesktopShell />;
}
