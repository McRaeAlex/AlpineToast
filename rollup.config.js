import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/index.ts",
  output: {
    dir: "./dist/",
    format: "umd",
    name: "AlpineToast",
    exports: "default",
  },
  plugins: [typescript()],
};
