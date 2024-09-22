// ./tsup.config.ts
//
// Build/bundle configuration for tsup.

// IMPORTANT!!
// This project is NOT using vanilla TypeScript compiler for building.

import { defineConfig } from "tsup";

export const packageBanner: string = `/*
 * @keminghe/osu: Unofficial data about The Ohio State University.
 * Not affiliated with or endorsed by OSU. Usage indicates agreement
 * with the MIT license. More info at https://mit-license.org/
 */
`;

export default defineConfig(
  // biome-ignore format: added alignment for clarity.
  {
    // Core. -------------------------------------------------------------------

    // Source entrypoint, separated for better tree-shaking.
    entry: [
      "src/index.ts",
      "src/index.async.ts",
    ],

    format: ["cjs", "esm"],   // Output formats: CommonJS and ESM.
    target: "es2017",         // Max browser and node (12+) compatibility.
    outDir: "dist",           // Output directory.

    dts      : true,  // Generate declaration files.
    sourcemap: true,  // Generate source maps, allow reverting to original code.
    minify   : true,  // Minify output, remove unnecessary chars.
    splitting: true,  // Enable code splitting, increase module loading speed.
    treeshake: true,  // Enable tree-shaking, remove unused dependencies.
    clean    : true,  // Clean output directory before building.

    watch    : false,  // Disable watch mode for simplified dev and ci.

    // Personalization. --------------------------------------------------------

    // Add banner to output files.
    banner   : { js: packageBanner },  
  },
);
