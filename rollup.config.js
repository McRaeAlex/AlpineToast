import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";

export default {
  input: "./src/index.ts",
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'default'
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      exports: 'default'
    },
  ],
  plugins: [typescript({ typescript: require('typescript'), tslib: require('tslib') })],
};
