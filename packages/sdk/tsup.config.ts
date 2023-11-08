import { defineConfig } from "tsup";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  name: "sdk",
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  minify: isProduction,
  sourcemap: true,
  bundle: true,
  dts: true,
  treeshake: true,
  noExternal: ["@contrak/rest", "@contrak/utils"],
});
