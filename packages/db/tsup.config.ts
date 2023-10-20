import { defineConfig } from "tsup";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  entry: ["src/postgres/index.ts", "src/sqlite/index.ts"],
  target: "es2019",
  minify: isProduction,
  sourcemap: true,
  bundle: true,
  dts: true,
  treeshake: true,
  clean: true,
});
