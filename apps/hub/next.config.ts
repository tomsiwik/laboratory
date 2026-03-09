import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@dexters-lab/dexter",
    "@dexters-lab/deedee",
    "@dexters-lab/mandark",
    "@dexters-lab/dad",
    "@dexters-lab/mom",
    "@dexters-lab/computress",
  ],
  outputFileTracingIncludes: {
    "/api/**": [
      "../../packages/*/workflow.md",
      "../../packages/*/doc.md",
    ],
  },
};

export default nextConfig;
