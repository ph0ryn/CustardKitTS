import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  dts: true,
  entry: [
    "src/*.ts",
    "src/Actions/index.ts",
    "src/Labels/index.ts",
    "src/Keys/index.ts",
    "src/Layout/index.ts",
    "src/Custard/index.ts",
  ],
  format: ["esm"],
});
