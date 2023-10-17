import { defineConfig } from "tsup";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  entry: ["src/index.ts"],
  target: "es2019",
  minify: isProduction,
  sourcemap: true,
  bundle: true,
  dts: true,
  treeshake: true,
  noExternal: ["@contrak/rest", "@contrak/utils"],
});
