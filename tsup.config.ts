import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/test.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  format: "esm",
});
