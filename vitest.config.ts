import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest-setup.ts",
    include: ["./src/component/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,postcss,tailwind}.config.*",
    ],
    coverage: {
      exclude: [
        "./**.config.*",
        "./src/vite-env.d.ts",
        "./src/App.tsx",
        "./src/main.tsx",
      ],
    },
  },
});
