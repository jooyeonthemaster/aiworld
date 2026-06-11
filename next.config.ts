import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  devIndicators: false,
  webpack: (config) => {
    // @splinetool/react-spline 의 exports 필드가 "import" 조건만 선언해
    // Next 의 일부 해석 패스에서 모듈을 찾지 못한다 → dist 파일로 직접 우회
    config.resolve.alias = {
      ...config.resolve.alias,
      "@splinetool/react-spline$": path.join(
        process.cwd(),
        "node_modules/@splinetool/react-spline/dist/react-spline.js"
      ),
    };
    return config;
  },
};

export default nextConfig;
