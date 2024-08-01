// ./vitest.config.ts
//
// Repo-scoped configuration for vitest.

// Vitest essential imports.
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// Custom Vitest config definition.
export default defineConfig({
  plugins: [tsconfigPaths()],

  test: {
    // Specify the test environment to be node, as backend is a node server.
    environment: "node",

    // Setup files to run before all tests.
    setupFiles: ["vitest.setup.ts"],

    // Global test match pattern.
    include: ["src/**/*.test.ts", "scripts/**/*.test.ts"],

    alias:
      // biome-ignore format: added alignment for better readability.
      {
      "@src/"  : new URL("./src/",       import.meta.url).pathname,
      "@data/" : new URL("./data/",      import.meta.url).pathname,
      "@utils/": new URL("./src/utils/", import.meta.url).pathname,
    },

    // Configure coverage and reporters.
    coverage: {
      // Specify reporing coverage for the project src directory.
      include: ["src"],
      reportOnFailure: true,

      // Coverage thresholds for the project.
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },

    // Vitest typecheck config, run with `vitest typecheck`.
    typecheck: {
      enabled: true,
      tsconfig: "tsconfig.json",
    },

    // Vitest benchmark config, run with `vitest benchmark`.
    benchmark: {
      reporters: ["default", "verbose"],
    },
  },
});
