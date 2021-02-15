import typescript from "@rollup/plugin-typescript";

export default {
    input: "./src/index.ts",
    output: {
        dir: "./dist/",
        format: "cjs",
        exports: "default"
    }
    , plugins: [typescript()]
}